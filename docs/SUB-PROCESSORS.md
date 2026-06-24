# KickTech HumanBadge — Sub-Processor Register & DPA Status

**Version:** 1.2 (operational record, not a legal document)
**Last reviewed:** 24 June 2026

> **What this document is — and is not**
>
> This is an **operational record** of the sub-processors KickTech uses in connection with the HumanBadge extension and Backend, together with the status of the Data Processing Agreement (DPA) with each of them under GDPR Article 28.
>
> Each DPA listed below is a standard contract drafted and provided by the vendor; KickTech signs the vendor's terms. None of these documents are KickTech-drafted, and they do not need to be reviewed by KickTech's counsel beyond accepting vendor terms (subject to ordinary due-diligence on the vendor itself).
>
> This document does NOT cover the situation where KickTech acts as *processor* on behalf of an institutional customer (e.g., a Premium / KTOOR client). That separate context — where KickTech is the processor and the customer is the controller — is addressed in [`DPA-OUTLINE.md`](DPA-OUTLINE.md).

---

## 1. The two DPA contexts at KickTech

To prevent the recurring confusion between two distinct relationships:

| | **Context A** (separate doc) | **Context B** (this doc) |
|---|---|---|
| **KickTech's role** | Processor | **Controller** |
| **Counterparty** | Institutional customer (Premium / KTOOR) | KickTech's own technical sub-processors (Vercel, Cloudflare, Upstash, …) |
| **Counterparty's role** | Controller | Processor |
| **Who drafts the DPA** | KickTech (against the customer's specific commercial relationship) | Vendor (standard terms) |
| **Document** | [`DPA-OUTLINE.md`](DPA-OUTLINE.md) | This document |
| **Pilness** | When first Premium engagement is concluded | **Before HB beta launches publicly** |

---

## 2. Sub-processor register

The table below lists every third party that processes data on KickTech's behalf in connection with HumanBadge.

For each sub-processor, the columns capture:
- **Service** — what they do for us.
- **Personal data processed** — what categories pass through them (may be `none` if processing is technical only).
- **Location / jurisdiction** — primary processing region.
- **DPA terms** — link to the vendor's standard DPA document.
- **Status** — whether KickTech has signed the DPA with this vendor.
- **Transfer mechanism** — for transfers outside the EEA, the legal basis (SCCs, adequacy, DPF).

| Sub-processor | Service | Personal data processed | Location / jurisdiction | DPA terms | Status | Transfer mechanism |
|---|---|---|---|---|---|---|
| **Vercel Inc.** | Backend hosting; network-edge rate-limiting (Vercel Firewall) | IP addresses at the edge level only (read for rate-limiting, not retained beyond rate-limit window; **never passed to the HumanBadge application**) | USA; EU regions where available | https://vercel.com/legal/dpa | In place (auto-accepted at account signup per vendor's standard terms) | SCCs + EU-US DPF where applicable |
| **Cloudflare, Inc.** | DNS resolution for our domains; Turnstile (bot-detection challenge for beta access) | Standard DNS queries; Turnstile challenge tokens. **No payload data passes through Cloudflare beyond DNS.** | USA / global | https://www.cloudflare.com/cloudflare-customer-dpa/ | In place (auto-accepted at account signup per vendor's standard terms) | SCCs + EU-US DPF where applicable |
| **Upstash Inc.** | Rate-limiting Redis backend (counters keyed by hashed identifiers); server-side store for per-registration author-handle HMAC keys (`K`, Path C); HB PLUS single-use nonces and PLUS attestations | Short-lived rate-limit counters (**no PII**); per-registration HMAC keys `K` — random keys, **not handles**, encrypted at rest (AES-256-GCM) and retained a sliding 30 days then auto-deleted; HB PLUS single-use nonces (short-lived, ≤15 min); HB PLUS attestations — an Issuer's EIP-712 signature + signed message (the message contains the Issuer wallet address and content hashes, **no content text**), retained for the life of the registration and deleted on erasure request (see [`../PRIVACY.md`](../PRIVACY.md) §9.1, §9.2a, §9.2b, §10.2, §10.2a) | USA / EU regions | https://upstash.com/legal | In place (auto-accepted at account signup per vendor's standard terms) | SCCs where data leaves EEA |
| **Coinbase Technologies, Inc. / Base / Optimism Collective** | Public blockchain (Base Sepolia during beta; Base mainnet later) | Content hashes; publishing-channel identifiers; timestamps; transaction signatures — written to a **public, immutable** ledger | Global (decentralized) | [Not applicable in the conventional GDPR sub-processor sense — see Note 2.1] | N/A | N/A (public ledger) |

### 2.1 Note on the public blockchain

The public blockchain is **not a sub-processor** in the conventional GDPR Article 28 sense. There is no contractual relationship between KickTech and "the blockchain"; the chain is a decentralized, public, immutable infrastructure to which we write data. Data subjects are informed of this in [`PRIVACY.md`](../PRIVACY.md) §8, with the implications for the right of erasure clearly stated. The transparency of writing to a public chain is the basis of HumanBadge's trust model, not a privacy concern in the traditional processor-sense.

### 2.2 Why each sub-processor exists at all (architectural data minimization)

KickTech's architectural commitment is that **the HumanBadge application reads zero request IPs**. This is documented in [`PRIVACY.md`](../PRIVACY.md) §3.1; qualified third-party auditors can review the relevant Backend code under NDA, and the published audit reference at [`../audit-references/backend/hmac.ts`](../audit-references/backend/hmac.ts) documents the cryptographic primitives used for the keyed-HMAC mechanism described in PRIVACY.md §10.2.

However, **rate-limiting at the network edge** is operationally necessary (to prevent abuse during beta and beyond), and this rate-limiting does inspect IPs at the edge level. The architectural choice is to:

- **Push IP processing to the edge layer** (Vercel Firewall, ~milliseconds, not retained beyond the rate-limit window)
- **Never pass IP-derived data to the application layer**

This means: from a "purist GDPR" perspective, the only direct processing of IP-class personal data in HumanBadge's stack happens **at Vercel's edge**, under **Vercel's standard DPA** that KickTech has signed. KickTech's own application code never sees an IP.

This architectural choice is a substantive privacy property of HumanBadge, not just a policy claim — and the sub-processor register above is the operational evidence chain that backs it up.

### 2.3 Note on HB PLUS

The HB PLUS verified-issuer layer (introduced for the beta) **added no new sub-processor**. The PLUS single-use nonces and attestations reuse the existing Upstash store (augmented row above); the EIP-712 signature is verified by the Backend application itself; the wallet connection happens directly between the user's wallet and our own connector page (no third party intermediates the signature). The Issuer wallet address and signature recorded in an attestation are covered by the existing Upstash DPA. See [`../PRIVACY.md`](../PRIVACY.md) §9.2b and §10.2a.

---

## 3. Adding a new sub-processor

If KickTech adds a new sub-processor in the course of operating HumanBadge:

1. **Before sending production data to the new sub-processor**, KickTech must sign their standard DPA (or, if they don't offer a standard DPA, decline to use them).
2. Add a row to the table above with the relevant details.
3. Update [`PRIVACY.md`](../PRIVACY.md) §5 if the addition is material to the categories of data processed.
4. Communicate material changes to end-users via [`PRIVACY.md`](../PRIVACY.md) §15 (release notes + updated effective date).
5. Where applicable for Premium / KTOOR customers, give the contractual prior notice under their DPA (typically 30 days).

---

## 4. Cross-references

- [`../PRIVACY.md`](../PRIVACY.md) — Privacy Policy, §5 (third-party processors), §6 (international transfers).
- [`DPA-OUTLINE.md`](DPA-OUTLINE.md) — Outline of the DPA KickTech will sign **as a processor**, on first Premium / KTOOR engagement (the inverse context to this document).
- [`../LICENSE`](../LICENSE) — License of the published HumanBadge extension artifact and the public audit references in this repository (relevant when an audit relies on architectural claims that the published code verifies).

---

## 5. Review cadence

This register is reviewed:

- On each material change to the sub-processor list (immediately).
- On each material change to a sub-processor's DPA terms (immediately upon notification by the vendor).
- At minimum **annually**, even if no changes occurred.

---

© KickTech. Operational document; not a contract.
