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
 *    affects others. K lives in the existing Upstash Redis (no new infra).
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

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { Redis } from "@upstash/redis";

// Redis namespace for HMAC keys. Separate prefix from locks/dedup/ratelimit.
const K_PREFIX = "hb:hmac:k:";

// K size — 256-bit, per CNIL/EDPB guidance for blockchain pseudonymization.
const K_BYTES = 32;

// Default TTL for K: none (persist while the asset is meant to be verifiable).
// Erasure is explicit (eraseKey). A TTL would silently break verification, so
// we do NOT expire K automatically. Kept here as a documented choice.
// (If a future retention policy wants auto-expiry, set seconds and pass to set.)
const K_TTL_SECONDS: number | null = null;

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
  // Store K as base64url. If two registrations of the same handle ever collide
  // on h (different K → astronomically unlikely), last-write-wins would break
  // the earlier asset's verification; we guard by only setting if absent (NX),
  // and on the (vanishingly rare) clash, retry with a new K.
  const kStr = b64url(kBuf);
  const ok = await redis().set(redisKey, kStr, K_TTL_SECONDS ? { nx: true, ex: K_TTL_SECONDS } : { nx: true });
  if (ok === null) {
    // Collision on h (NX failed) — regenerate once with a fresh K.
    const kBuf2 = randomBytes(K_BYTES);
    const h2 = computeH(kBuf2, handle);
    await redis().set(K_PREFIX + h2, b64url(kBuf2), K_TTL_SECONDS ? { ex: K_TTL_SECONDS } : {});
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
  const kStr = await redis().get<string>(K_PREFIX + markerH);
  if (!kStr) return false; // erased or unknown → fail-closed (no badge)
  const kBuf = b64urlToBuf(kStr);
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
