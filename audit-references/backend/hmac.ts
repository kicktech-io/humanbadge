/**
 * HMAC author-pattern layer — Path C (cryptographic erasure) for HB.
 * ------------------------------------------------------------------
 * GDPR remediation for person-publication patterns (PRIVACY.md §10.2): instead
 * of writing a plaintext handle into on-chain `authorizedDomains`
 * (x.com/<handle>/*), we write an HMAC of the handle (x.com/hmac.<h>/*) and keep
 * the per-registration key K server-side. Erasure = delete K → the on-chain `h`
 * becomes an irreversible 32-byte string (cryptographic erasure, Art. 17).
 *
 * Design decisions (rationale captured in DG1/DG2/DG5 notes inline below):
 *  - DG1: per-registration K (NOT one global key) → erasing one subject never
 *    affects others. K lives in the existing Upstash Redis (no new infra) and
 *    is stored ENCRYPTED at rest (AES-256-GCM under HB_HMAC_K_ENC, a key kept
 *    outside Redis) so a leaked Redis token alone cannot recover any handle.
 *  - DG2: marker shape `hmac.<base64url-h>` — hostname-grammar friendly, no `#`.
 *  - Key addressing: K is keyed by `h` itself (`hb:hmac:k:<h>`). `h` is the
 *    on-chain marker, so it is the natural lookup id and avoids the timing issue
 *    that assetId is only known AFTER registerAsset (pattern is composed before).
 *    `h` is public (on-chain) but reveals nothing without K; verify returns only
 *    a boolean for a supplied candidate, never the handle.
 *
 * This module is the SINGLE crypto point. The register path calls
 * `composeHmacAuthorSegment()`; verification (separate endpoint) calls
 * `verifyHandleAgainstMarker()`. Erasure calls `eraseKey()`.
 */

import { createHmac, randomBytes, timingSafeEqual, createCipheriv, createDecipheriv, createHash } from "node:crypto";
import { Redis } from "@upstash/redis";

// Redis namespace for HMAC keys. Separate prefix from locks/dedup/ratelimit.
const K_PREFIX = "hb:hmac:k:";

// K size — 256-bit, per CNIL/EDPB guidance for blockchain pseudonymization.
const K_BYTES = 32;

// ── At-rest encryption of K (defense in depth) ─────────────────────────
// K is the ONLY thing standing between the on-chain hmac.<h> markers and the
// real handles, so it must be the best-protected secret we hold. Upstash's
// provider-side encryption-at-rest does NOT protect against a leaked REST API
// token (the token decrypts transparently), and the Redis instance is SHARED
// with console-ui (namespace separation only, not access isolation) — so any
// component holding the Redis token could read K.
//
// We therefore encrypt K with AES-256-GCM under K_ENC, a key kept in an env
// var SEPARATE from the Upstash token. Compromising Redis (the token) now
// yields only ciphertext; an attacker also needs K_ENC, which lives in a
// different system (Vercel env / KMS), never in Redis. This directly addresses
// the "what if the DB is breached" question: K is no longer plaintext-behind-
// one-token.
//
// Stored format (string): "v1:" + base64url(iv ‖ authTag ‖ ciphertext)
//   iv = 12 bytes (GCM standard), authTag = 16 bytes, ciphertext = 32 bytes (K)
// Legacy values (pre-encryption) are bare base64url of K with no "v1:" prefix;
// readKey() detects and still accepts them (and callers may rewrite-on-read),
// so the change is backward compatible with already-stored keys.
const ENC_PREFIX = "v1:";
const GCM_IV_BYTES = 12;
const GCM_TAG_BYTES = 16;

// AAD binds the ciphertext to its purpose so a K blob can't be lifted and
// reused as some other AES-GCM payload that happens to share K_ENC.
const ENC_AAD = Buffer.from("hb:hmac:k:v1");

let _encKey: Buffer | null = null;
/**
 * Resolve K_ENC from env. Accepts 64-hex (32 bytes) or base64; if it isn't
 * exactly 32 bytes we SHA-256 it to derive a stable 32-byte key, so any
 * sufficiently-long random string in the env works. Throws if unset — we must
 * never silently fall back to storing K in plaintext.
 */
function encKey(): Buffer {
  if (_encKey) return _encKey;
  const raw = process.env.HB_HMAC_K_ENC;
  if (!raw || raw.length < 16) {
    throw new Error("HB_HMAC_K_ENC not configured (>=16 chars required) — refusing to store K");
  }
  let buf: Buffer | null = null;
  if (/^[0-9a-fA-F]{64}$/.test(raw)) buf = Buffer.from(raw, "hex");
  else {
    try { const b = Buffer.from(raw, "base64"); if (b.length === 32) buf = b; } catch { /* fall through */ }
  }
  if (!buf || buf.length !== 32) buf = createHash("sha256").update(raw, "utf8").digest();
  _encKey = buf;
  return _encKey;
}

/** Encrypt K (raw bytes) → "v1:" + base64url(iv ‖ tag ‖ ct). */
function encryptK(kBuf: Buffer): string {
  const iv = randomBytes(GCM_IV_BYTES);
  const cipher = createCipheriv("aes-256-gcm", encKey(), iv);
  cipher.setAAD(ENC_AAD);
  const ct = Buffer.concat([cipher.update(kBuf), cipher.final()]);
  const tag = cipher.getAuthTag();
  return ENC_PREFIX + b64url(Buffer.concat([iv, tag, ct]));
}

/**
 * Decrypt a stored value back to K (raw bytes). Handles both the encrypted
 * "v1:" format and legacy bare-base64url plaintext (returns those as-is).
 * Returns null if an encrypted value fails auth (tampered / wrong key).
 */
function decryptK(stored: string): Buffer | null {
  if (!stored) return null;
  if (!stored.startsWith(ENC_PREFIX)) {
    // Legacy plaintext K (pre-encryption). Accept for backward compatibility.
    return b64urlToBuf(stored);
  }
  try {
    const blob = b64urlToBuf(stored.slice(ENC_PREFIX.length));
    const iv = blob.subarray(0, GCM_IV_BYTES);
    const tag = blob.subarray(GCM_IV_BYTES, GCM_IV_BYTES + GCM_TAG_BYTES);
    const ct = blob.subarray(GCM_IV_BYTES + GCM_TAG_BYTES);
    const decipher = createDecipheriv("aes-256-gcm", encKey(), iv);
    decipher.setAAD(ENC_AAD);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(ct), decipher.final()]);
  } catch {
    return null; // auth failure → treat as unrecoverable (fail-closed upstream)
  }
}

/** True if a stored value is legacy (unencrypted) — used to rewrite-on-read. */
function isLegacyPlaintext(stored: string): boolean {
  return !!stored && !stored.startsWith(ENC_PREFIX);
}

// TTL for K: 30 days, REFRESHED on every successful verification (sliding
// expiration — see verifyHandleAgainstMarker). Rationale (deliberate data-
// minimization choice, GDPR Art. 5(1)(e), documented in PRIVACY.md §9.2a):
//   - On social/messaging platforms human readers overwhelmingly view CURRENT
//     content; older posts are rarely revisited by people (mostly by bots,
//     e.g. background candidate screening), and the badge exists for human
//     readers. So a live, still-viewed asset is re-verified well within 30 days
//     and its K is continually refreshed — it never expires while in use.
//   - A "dead" K (the previous version's key after an edit + re-registration)
//     is never verified again (the old content no longer exists, so its hash is
//     never looked up), so its TTL lapses and K self-deletes within 30 days.
//     This sweeps abandoned keys automatically — no tracking, no extra PII.
//   - Trade-off (accepted): an asset that NO human views for 30 days will have
//     its K expire and its badge stop verifying until re-registered. Given the
//     above usage pattern this is acceptable and favors minimization.
const K_TTL_SECONDS: number | null = 30 * 24 * 60 * 60;

let _redis: Redis | null = null;
function redis(): Redis {
  if (!_redis) _redis = Redis.fromEnv();
  return _redis;
}

/** base64url (no padding) — safe inside an authorizedDomains path segment. */
function b64url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Compute HMAC-SHA256(K, handle) → base64url. Lowercases handle for stability
 *  (X/LinkedIn handles are case-insensitive in URLs; verification must agree). */
function computeH(kBuf: Buffer, handle: string): string {
  const norm = handle.trim().toLowerCase();
  const mac = createHmac("sha256", kBuf).update(norm, "utf8").digest();
  return b64url(mac);
}

/**
 * Registration side: given a handle, generate a fresh per-registration K, store
 * it, and return the marker segment `hmac.<h>` to embed in the on-chain pattern.
 *
 * Returns the SEGMENT only (e.g. "hmac.AbC123"); the caller assembles the full
 * pattern (`x.com/<segment>/*`, `linkedin.com/in/<segment>/*`, etc.) so platform
 * shape stays in composeAuthorizedDomain.
 *
 * NOTE: async (Redis write). The register path is already async inside the
 * tx-lock, so this fits the existing flow.
 */
export async function composeHmacAuthorSegment(handle: string): Promise<string> {
  const kBuf = randomBytes(K_BYTES);
  const h = computeH(kBuf, handle);
  const redisKey = K_PREFIX + h;
  // Store K ENCRYPTED (AES-256-GCM under K_ENC). If two registrations of the
  // same handle ever collide on h (different K → astronomically unlikely),
  // last-write-wins would break the earlier asset's verification; we guard by
  // only setting if absent (NX), and on the (vanishingly rare) clash, retry
  // with a new K.
  const kStr = encryptK(kBuf);
  const ok = await redis().set(redisKey, kStr, K_TTL_SECONDS ? { nx: true, ex: K_TTL_SECONDS } : { nx: true });
  if (ok === null) {
    // Collision on h (NX failed) — regenerate once with a fresh K.
    const kBuf2 = randomBytes(K_BYTES);
    const h2 = computeH(kBuf2, handle);
    await redis().set(K_PREFIX + h2, encryptK(kBuf2), K_TTL_SECONDS ? { ex: K_TTL_SECONDS } : {});
    return "hmac." + h2;
  }
  return "hmac." + h;
}

/**
 * Verification side: does `candidate` (handle from the page URL the consumer is
 * viewing) match the on-chain marker `h`? Looks up K by h, recomputes
 * HMAC_K(candidate), constant-time compares.
 *
 * Privacy (DG5 Option 4): callers MUST NOT log `candidate`. This function does
 * not persist anything; it only reads K and returns a boolean.
 *
 * Returns false if K is absent (erased OR never existed) → fail-closed.
 */
export async function verifyHandleAgainstMarker(markerH: string, candidate: string): Promise<boolean> {
  if (!markerH || !candidate) return false;
  const stored = await redis().get<string>(K_PREFIX + markerH);
  if (!stored) return false; // erased, expired, or unknown → fail-closed (no badge)
  const kBuf = decryptK(stored);
  if (!kBuf) return false; // tampered / undecryptable → fail-closed
  // Sliding expiration: this asset is being verified (i.e. viewed), so it is
  // "live" — refresh K's TTL so in-use keys never expire. A dead K (old version
  // after an edit) is never verified, so it is NOT refreshed here and lapses.
  // Legacy plaintext K are migrated to encrypted in the same write.
  try {
    if (isLegacyPlaintext(stored)) {
      await redis().set(K_PREFIX + markerH, encryptK(kBuf),
        K_TTL_SECONDS ? { ex: K_TTL_SECONDS } : {});
    } else if (K_TTL_SECONDS) {
      await redis().expire(K_PREFIX + markerH, K_TTL_SECONDS);
    }
  } catch { /* best-effort; never block verification */ }
  const hCand = computeH(kBuf, candidate);
  // constant-time compare of equal-length base64url strings
  const a = Buffer.from(hCand);
  const b = Buffer.from(markerH);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Erasure (GDPR Art. 17): delete K for a marker. After this, the on-chain `h`
 * is unrecoverable (no key to recompute or reverse) → cryptographic erasure.
 * Idempotent; returns true if a key was deleted.
 */
export async function eraseKey(markerH: string): Promise<boolean> {
  if (!markerH) return false;
  const n = await redis().del(K_PREFIX + markerH);
  return n > 0;
}

/** Extract the `<h>` from a marker segment "hmac.<h>" (or full pattern). */
export function extractMarkerH(segmentOrPattern: string): string | null {
  const m = String(segmentOrPattern || "").match(/hmac\.([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
}

function b64urlToBuf(s: string): Buffer {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return Buffer.from(b64, "base64");
}
