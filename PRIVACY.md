# KickTech HumanBadge — Privacy Policy

**Effective date:** 8th June 2026
**Version:** 1.1

> **What changed in 1.1 (8 June 2026):** Author-handle HMAC keys (`K`) now carry
> a sliding 30-day retention (refreshed on each verification, then auto-deleted)
> and are encrypted at rest. See the retention tables and §9.2a (storage
> limitation). No change to what data is collected or to your rights.

---

## 1. Introduction & scope

This Privacy Policy describes how KickTech ("we", "us", "our") handles data in connection with:

- The **KickTech HumanBadge** browser extension ("HB" or "the Extension").
- The Backend service at `verify.kicktech.io` that HB connects to for registry verification and registration ("the Backend").

This policy does **NOT** cover:

- The third-party platforms you visit while using HB (X, Facebook, LinkedIn, Gmail, Telegram, WhatsApp, Messenger, etc.). Those platforms have their own privacy policies; HB does not influence or extend them.
- The KickTech main website at [www.kicktech.io](https://www.kicktech.io), which has its own privacy notice.
- The Forward-to-Verify email service operated separately by KickTech at `verify@kicktech.io`. That service is not part of HB's processing scope (it is a server-side mailbox you reach with your own email client), and is governed by its own notice on [www.kicktech.io](https://www.kicktech.io).
- Future KickTech products (KTOR Premium, KTOOR) operated under separate agreements.

## 2. Data controller

For the purposes of the General Data Protection Regulation (EU) 2016/679 ("GDPR"), the controller of personal data processed through HB is:

> **FAPL Sp. z o.o.** (KRS 0000696416)
> ul. Adama Mickiewicza 37/58, 01-625 Warsaw, Poland
> contact@kicktech.io

If a Data Protection Officer is appointed, contact information will be provided here.

## 3. What we collect — and what we deliberately do NOT collect

HB is designed for **data minimization**. The architecture of HB and its Backend implements this principle at the code level, not only at the policy level. The built extension artifact published in this repository (`dist/`), together with the backend cryptographic core published as a public audit reference at [`audit-references/backend/hmac.ts`](audit-references/backend/hmac.ts), allows independent verification of the key architectural claims in this section.

### 3.1 What we do NOT collect

We do **not**:

- **Read or store the original text** of content you view, register, or verify. The original content text never leaves your browser — only one-way cryptographic hashes of it are transmitted, and a hash cannot be reversed to reconstruct the source text. (For person-publication anti-spoofing, an author handle visible in the page is also processed — never the content text; see §3.2(b), §9.1, and §10.2.)
- **Read or store email addresses** you correspond with. HB checks sender domains in Gmail for the authorization check, but does not transmit or store any email address.
- **Track your browsing history.** HB has no concept of "history". It scans only the currently-visible page on demand.
- **Collect IP-derived data at the application level.** Rate-limiting is performed at the network edge (Vercel Firewall). The HB Backend application reads zero request IPs; this is enforced at the architectural level. Qualified third-party auditors can review the relevant Backend code under NDA; the published audit reference at [`audit-references/backend/hmac.ts`](audit-references/backend/hmac.ts) documents the cryptographic primitives used for the §10.2 keyed-HMAC mechanism.

### 3.2 What we do process

The following data is processed during normal use of HB:

a) **Verification queries** — for each KT-token HB finds on a page, a short cryptographic hash is sent to the Backend to check the on-chain registry. These queries pass through the network edge (which inspects the IP for abuse detection but does not retain it beyond the rate-limit window) and the application receives only the hash.

b) **Registration requests** — when you click "Register" in the popup, HB sends a registration payload to the Backend, which writes the result to the public on-chain registry. **The on-chain registry is by definition public; see §8.** The payload contains:

  - a one-way **content hash** (never the content text itself);
  - your current **KT-token** (the rotating, short-lived registration token);
  - your **publishing-channel context** — for person-publication surfaces this is your author identifier (e.g. your X handle or LinkedIn profile identifier), which is written on-chain **only as a keyed HMAC, never in clear** (see §9.1 and §10.2); for other surfaces it is a non-personal identifier (a conversation ID, an organization slug, a provider domain);
  - a **platform identifier** (e.g. "x", "linkedin") — not personal data;
  - a **per-installation session identifier** (`sessionId`): a UUID generated locally in your browser on first use and stored in your browser's local extension storage. It is transmitted with each registration and is used **solely for operational integrity** — binding the anti-bot challenge token (HART) to your installation so a stolen challenge cannot be reused, and per-installation rate-limiting to prevent abuse. It is **not linked to any personal data** we hold and is not used for advertising, profiling, or cross-site tracking. You can reset it at any time by clearing the extension's local storage (see §3.3);
  - optional metadata where applicable (e.g. a display name or author-domain hint resolved from the page, and the HART anti-bot token).

  Of these fields, only the author identifier is personal data, and it never reaches the chain in recoverable form (§10.2). The `sessionId` is a pseudonymous operational identifier, disclosed here for completeness and transparency.

c) **Health-check heartbeats** — the extension sends a periodic heartbeat to the Backend to detect service outages and display a status indicator. No content data is transmitted in the heartbeat.

### 3.3 What stays locally in your browser

Stored in your browser's local extension storage:

- Your per-installation cryptographic seed, used to derive the rotating KT-tokens. Created at install time, **never transmitted** to us or anyone else.
- The per-installation `sessionId` (see §3.2(b)). It is stored locally and, unlike the seed, **is transmitted with registration requests** for the operational-integrity purposes described there. Clearing local storage resets it.
- UI preferences (theme, layout settings) — never transmitted.
- A short-lived verification cache (to avoid re-querying the registry for the same content during a browsing session) — never transmitted.

These items sit in your browser's extension-storage sandbox, on your own device. KickTech has no access — and cannot obtain access — to that storage. This category is therefore outside the scope of GDPR data-subject rights as they apply to KickTech (we cannot grant or refuse access to data we do not hold). Managing this data is fully under your control: open `chrome://extensions` (or the equivalent in your Chromium-based browser), find HumanBadge, open its details, and clear its site data; uninstalling the extension has the same effect.

## 4. Lawful basis for processing

We process the data described in §3.2 under the following GDPR lawful bases:

- **Performance of a contract** — when you use HB to verify or register content, processing is necessary to deliver the service you have requested.

- **Legitimate interests** — for security measures, including the network-edge rate-limiting described in §3.1, we rely on our legitimate interest in preventing abuse of the service. We have assessed that this interest is not overridden by your fundamental rights, given the minimal and transient nature of the data processed (IP at the edge, not stored beyond the rate-limit window; no IP-derived data at the application level).

- **Consent** — for any future processing requiring consent (e.g., optional analytics, marketing communications, beta-feedback questionnaires), we will obtain explicit, granular consent and provide a clear opt-out. We do not currently rely on consent for any operational processing.

## 5. Third-party processors

We use the following third parties as data processors:

| Processor                                              | Purpose                                                                                | What is processed                                                                                                           | Where                                 |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **Vercel Inc.**                                        | Hosts the Backend application; provides network-edge rate-limiting (Vercel Firewall)   | Hashes (application level); IP addresses (edge level, not retained beyond rate-limit window; not passed to the application) | USA (with EU regions where available) |
| **Cloudflare, Inc.**                                   | DNS resolution for our domains; Turnstile (privacy-respecting bot-detection challenge) | Standard DNS queries; Turnstile challenge tokens. Payload data does not pass through Cloudflare beyond DNS                  | USA / global                          |
| **Upstash Inc.**                                       | Rate-limiting Redis backend (counters keyed by hashed identifiers); server-side store for per-registration author-handle HMAC keys (§9.1, §10.2) | Short-lived rate-limit counters (no personal data); random HMAC keys `K` (not handles) — the keys whose deletion cryptographically erases on-chain handle markers | USA / EU regions                      |
| **Base / Coinbase Technologies / Optimism Collective** | Public blockchain (Base Sepolia during beta, Base mainnet in production)               | Content hashes, publishing-channel identifiers, timestamps — written to a public, immutable ledger                          | Global (public blockchain)            |

A Data Processing Agreement under GDPR Article 28 is in place with each processor where required. The operational register of these sub-processor DPAs — including links to each vendor's standard DPA terms, signature status, and applicable international-transfer mechanism — is maintained at [`docs/SUB-PROCESSORS.md`](docs/SUB-PROCESSORS.md). We may add or change sub-processors over time; material changes will be reflected in updates to this Privacy Policy.

## 6. International transfers

Some processors listed in §5 are based in the United States or operate globally. Where personal data is transferred outside the European Economic Area, we rely on:

- **Standard Contractual Clauses (SCCs)** as approved by the European Commission, where applicable;
- **Adequacy decisions** where applicable (e.g., the EU-US Data Privacy Framework when our processor is certified under it);
- **Supplementary technical measures** — encryption in transit (TLS); architectural separation of IP data from application data; processing of hashed identifiers rather than direct identifiers where feasible.

## 7. Retention

| Category                                 | Retention period                                       |
| ---------------------------------------- | ------------------------------------------------------ |
| Verification queries (application level) | Not retained beyond the response cycle                 |
| Verify-HMAC candidate handle             | Not logged or stored; used in memory for the comparison only (§10.2) |
| Network-edge rate-limit counters         | Up to 1 hour (the longest rate-limit window)           |
| Author-handle HMAC keys (`K`)            | **Sliding 30 days**, refreshed on each successful verification; auto-deleted 30 days after the last verification, or immediately on erasure request (§9.2a). Deleting `K` cryptographically erases the on-chain marker (§10.2) |
| Registration requests (on-chain)         | **Permanent** — written to a public blockchain; see §8 |
| Local browser data (seed, prefs, cache)  | Until you uninstall HB or clear your browser data      |
| Service logs (anonymized, no IP)         | 90 days for operational and security troubleshooting |

---

## 8. Public blockchain — important notice

Registrations made through HB are written to a public blockchain (Base Sepolia during beta, Base mainnet in production). On-chain data is, by the inherent design of public blockchains:

- **Public** — anyone can read it.
- **Immutable** — once written, it cannot be deleted, modified, or recalled, including by us.

The data written on-chain consists of:

- A cryptographic hash of the registered content (not the content itself; see §10.1 on why a hash is not personal data).
- A publication pattern that identifies the scope of publication. For group, conversation, organization, and provider surfaces this is a non-personal identifier (a conversation ID, a company slug, a provider domain). For person-publication surfaces (where anti-spoofing must reference the author) the pattern contains a **keyed HMAC of the author handle** (`hmac.<h>`), **never the handle in clear** — see §10.2.
- A timestamp.
- The KickTech transaction signature.

We do not write any directly identifying personal data to the chain in clear — no names, email addresses, IPs, plaintext handles, or profile URLs. Where an author handle must be referenced for anti-spoofing, only its keyed HMAC is written; the handle cannot be recovered from it without the server-side key.

**Implication for your right to erasure (§9)**: the chain entry itself is immutable and cannot be deleted by anyone. However, for the one category of personal data that appears on-chain in derived form — the author-handle HMAC — erasure is nonetheless **effective**, because the handle is recoverable only via a server-side key that KickTech can delete. Deleting that key renders the on-chain HMAC permanently irreversible (**cryptographic erasure**; see §9.2a and §10.2). For all other on-chain data (hashes, conversation/organization/provider identifiers), there is no personal data to erase. The detailed reasoning is in §9 (GDPR statutory analysis) and §10 (privacy-architecture rationale).

## 9. Your rights under GDPR

This section covers your rights under the GDPR. It is deliberately narrow: it discusses **only** the data that meets the GDPR definition of personal data under Art. 4(1). Categories of data that HumanBadge processes but that are not personal data under GDPR (content hashes, group/channel identifiers, provider-domain patterns) are documented separately in §10 for transparency, but are not within the scope of statutory data-subject rights.

### 9.1 Categories of personal data in HB's processing flow

Two categories of data in the HumanBadge processing flow meet the GDPR definition of personal data:

| Category                                                      | Where it sits                  | Held by                                  | Retention                                                                                                    |
| ------------------------------------------------------------- | ------------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **IP addresses** (used for rate-limiting at the network edge) | Vercel Firewall (network edge) | **Vercel** (as KickTech's sub-processor) | Rate-limit window only (up to 1 hour for the longest window); **never passed to the HumanBadge application** |
| **Author handle** (for person-publication anti-spoofing) | Server-side as the per-registration HMAC key `K` (never the handle itself); on-chain only as `HMAC(K, handle)` | **KickTech** (key store) / **Upstash** (sub-processor hosting the store) | A sliding 30 days, refreshed on each successful verification, then auto-deleted; or immediately on erasure request. Erasing `K` renders the on-chain HMAC permanently irreversible (cryptographic erasure — see §10.2) |

The author handle is processed only for person-publication surfaces (X timeline, LinkedIn profile/feed, Facebook wall/profile) where binding a registration to its author is necessary to prevent third parties from spoofing authorship. It is **never written to the chain in clear** — only as a keyed HMAC — and the handle itself is **not stored**; only the key `K` is held, so that the HMAC can be verified and, on request, cryptographically erased. The full mechanism, including the minimized verification data-flow, is documented in §10.2.

Everything else processed by HB is either:

- Not personal data under GDPR (see §10 for the architectural reasoning on hashes, group/conversation identifiers, organization identifiers, and provider-domain patterns), or
- On the user's own device under the user's direct control (see §3.3), in which case KickTech is not the data holder and has no GDPR obligations toward that data.

The per-installation `sessionId` (§3.2(b)) is a pseudonymous operational identifier — a locally-generated UUID used for anti-bot challenge binding and per-installation rate-limiting. On its own a random UUID does not identify a natural person, so it is not personal data under Art. 4(1); we disclose and document it here for transparency, and you can reset it at any time by clearing local storage.

### 9.2 Each GDPR right, in the concrete context of IP-at-edge

The rights below are framed for the first category in §9.1: IP addresses processed at the Vercel network edge for rate-limiting. The author-handle category is addressed separately in §9.2a.

- **Right of access (Art. 15)** — IP addresses are processed transiently by Vercel's edge firewall for rate-limit decisions and are not retained beyond the rate-limit window (up to 1 hour). KickTech itself holds no copy. On request we will confirm in writing what KickTech holds (typically: nothing); for the Vercel-held data, see §9.3 on exercising rights with Vercel directly.

- **Right to rectification (Art. 16)** — Not meaningfully applicable: the IP recorded at the edge is the IP that originated the request at the moment of the request. There is no inaccurate stored value to correct.

- **Right to erasure (Art. 17)** — Not meaningfully exercisable against KickTech: the data is already auto-evicted at the edge within the rate-limit window. KickTech cannot erase what does not persist. For the Vercel-held data while it is still within the window, see §9.3.

- **Right to restriction of processing (Art. 18)** — Restriction of edge-level rate-limiting would, in practice, mean we cannot rate-limit you — which is part of how the service is protected against abuse for all users. We will engage with such requests case-by-case, balancing your right against the security and availability of the service for everyone.

- **Right to data portability (Art. 20)** — Not meaningfully applicable to IP-at-edge: the data is transient and exists in no portable form.

- **Right to object (Art. 21)** — You can object to processing based on legitimate interests. The edge-level rate-limiting in §9.1 relies on legitimate interests under Art. 6(1)(f) (see §4). We will engage with such objections; depending on their nature, our ability to continue serving you safely may be affected (rate-limiting is an abuse-prevention measure).

- **Right to withdraw consent** — Not applicable: KickTech does not rely on consent as the legal basis for any operational processing (see §4). If consent-based processing is introduced in the future, withdrawal channels will be added at the same time.

- **Right to lodge a complaint** — See §16.

### 9.2a Each GDPR right, in the concrete context of the author handle

These rights concern the second category in §9.1: an author handle processed for person-publication anti-spoofing, held only as the per-registration HMAC key `K` (the handle itself is not stored) and written on-chain only as `HMAC(K, handle)`.

- **Right of access (Art. 15)** — On request we will confirm whether a given registration's HMAC corresponds to your handle (we can verify a handle you supply against a marker) and explain the processing. We do not hold a list of handles — only keys — so we cannot enumerate handles, but we can confirm a specific one on request.

- **Right to rectification (Art. 16)** — If a registration bound the wrong author, the remedy is erasure of that registration's key (below) and, if desired, re-registration with the correct author. The on-chain HMAC cannot be edited in place (immutable ledger), but it can be neutralized by key erasure.

- **Right to erasure (Art. 17)** — **Exercisable and effective.** Erasing the per-registration key `K` renders the on-chain `HMAC(K, handle)` permanently irreversible — no party, including KickTech, can thereafter derive or confirm the handle from it. This is **cryptographic erasure** (see §10.2) and is the mechanism by which the immutability of the underlying blockchain is reconciled with the right to erasure, consistent with CNIL/EDPB guidance. Each registration has its own key, so erasure is granular to the individual registration.

- **Right to restriction (Art. 18)** — Pending resolution of a dispute, we can suspend verification for a marker (so no badge is served) without erasing the key, then erase or restore as the matter is resolved.

- **Right to data portability (Art. 20)** — Not meaningfully applicable: the stored item is a random key, not portable personal data authored by the data subject.

- **Right to object (Art. 21)** — You may object to the anti-spoofing processing of your handle; the remedy is key erasure (Art. 17), after which no on-chain marker referencing you remains recoverable.

- **Storage limitation (Art. 5(1)(e)) — automatic minimization.** Beyond on-request erasure, each key `K` carries a **sliding 30-day time-to-live**: it is automatically deleted 30 days after the last successful verification, and every verification refreshes the window. This is a deliberate minimization choice grounded in how the platforms are actually used: on social and messaging surfaces, human readers overwhelmingly engage with current content, and older items are rarely revisited by people (automated revisits, e.g. background screening, are not the audience the badge serves). A registration that is still being viewed is therefore re-verified well within 30 days and its key persists for as long as it is in use; a key that nobody verifies for 30 days — including the superseded key left behind when an author edits and re-registers content — is deleted automatically. The accepted trade-off is that an asset which no human views for 30 days will need re-registration to restore its badge. The net effect is that recoverable author-handle data is retained only while it is actively serving its purpose, and abandoned keys are swept without any additional tracking of who registered what.

### 9.3 Rights vis-à-vis Vercel as sub-processor

Because the IP-at-edge category is held by Vercel under their standard DPA with KickTech (see §5 and [`docs/SUB-PROCESSORS.md`](docs/SUB-PROCESSORS.md)), your GDPR rights apply equally to Vercel as the entity actually holding the data. Vercel publishes its own privacy notice and rights-exercise channels at:

- [https://vercel.com/legal/privacy-policy](https://vercel.com/legal/privacy-policy)

Where you exercise a right with KickTech that touches Vercel-held data, we will coordinate with Vercel on your behalf. You may also contact Vercel directly using the channels published in their privacy notice. Coordination via KickTech does not extend the statutory response time that each entity is independently required to meet.

(Cloudflare is listed in §5 as a sub-processor of KickTech but its processing in connection with HumanBadge does not involve personal data within the scope of GDPR rights as discussed here — see §10.4 for the architectural detail. **Upstash** hosts the server-side key store for the author-handle HMAC keys (§9.1, §10.2); it stores random keys, not handles, but because those keys are the means by which the on-chain handle markers are protected and erased, erasure requests under §9.2a are executed against the Upstash-hosted store. Upstash acts under its DPA with KickTech; see [`docs/SUB-PROCESSORS.md`](docs/SUB-PROCESSORS.md).)

### 9.4 Response time

We respond to rights requests within **one month** of receipt, extendable by two further months for complex or numerous requests; we will inform you of any extension and its reasons within the initial month, as required by Art. 12(3).

To exercise your rights, contact us via the channels in §16.

---

## 10. Additional privacy architecture (not GDPR statutory obligations)

This section documents privacy properties of HumanBadge that go beyond what GDPR requires. They are voluntary architectural commitments by KickTech. They are not data-subject rights and are not enforceable as statutory obligations against KickTech — but they are verifiable from the published built artifact (`dist/`) together with the backend audit reference at [`audit-references/backend/hmac.ts`](audit-references/backend/hmac.ts), and they explain why §9 is as narrow as it is.

### 10.1 Why content hashes are not personal data

When HumanBadge sends a hash of a piece of content to the Backend or writes a hash to the public blockchain, the hash is computed using a one-way cryptographic hash function with the **preimage-resistance** property: given a hash output H, it is computationally infeasible to find any content C such that hash(C) = H.

In GDPR terms (Recital 26), personal data must be data that can identify a natural person by "means reasonably likely to be used". A preimage-resistant hash of content — without an external rainbow table or known-content side channel — is not such a means. The hash leaks no information about the underlying content beyond exact-equality with another hash.

This is different from pseudonymization (Art. 4(5)), where data remains personal data because re-identification is possible by reversing the pseudonymization mapping. There is no mapping for a cryptographic hash to reverse: the operation is one-way at the mathematical level.

### 10.2 Publication patterns: what HB writes on-chain, and how author handles are protected

When HumanBadge writes a registration to the chain, it includes a **publication pattern** describing the scope of publication, alongside the content hash. This section documents exactly what that pattern contains and how any author identifier in it is protected.

**Patterns that contain no personal data (written in clear):**

- **Group / channel / conversation identifiers** — for example a Telegram channel ID, a WhatsApp group UUID, an X direct-message conversation ID (`x.com/i/chat/<convId>*`), a LinkedIn message-thread URN (`linkedin.com/messaging/thread/<urn>/*`), a Messenger thread ID. These refer to a collective or conversational space, not to a specific natural person.
- **Organization identifiers** — for example a LinkedIn company-page slug (`linkedin.com/company/<slug>/*`). A company slug identifies an organization, not a natural person, and is a public organizational identifier.
- **Provider-domain patterns** — for example a sender-domain pattern for the Gmail flow. A domain such as a sender's organizational domain is a characteristic of the email provider or organization, shared by all users on it — not a personal identifier.

**Author handles (personal data) — written only as a keyed HMAC, never in clear:**

For person-publication surfaces where anti-spoofing requires binding the registration to the post's **author** — an X timeline post, a LinkedIn personal profile or feed post, a Facebook wall/profile post — the pattern must reference the author. An author handle (e.g. an X handle, a LinkedIn vanity identifier) **is personal data** under GDPR: it identifies a natural person even when publicly chosen.

HumanBadge does **not** write such a handle in clear on-chain. Instead it writes a **keyed HMAC** of the handle (`x.com/hmac.<h>/*`, `linkedin.com/in/hmac.<h>/*`, etc.), where:

- `<h>` is `HMAC-SHA256(K, handle)` — a 256-bit value from which the handle cannot be recovered or guessed without the key `K`;
- `K` is a **fresh per-registration key** generated server-side and held only in KickTech's server-side store (the existing Upstash sub-processor — no new sub-processor is introduced). `K` is **encrypted at rest** (AES-256-GCM) under a key held separately from the store, so access to the store alone does not expose `K`. It is retained for a sliding 30 days, refreshed on each verification, then auto-deleted (see the retention tables and §9.2a);
- the handle itself is **never** written to the chain.

**Why this matters for erasure (Art. 17).** Because the on-chain value is a keyed HMAC and the key `K` lives off-chain under KickTech's control, erasing `K` renders `<h>` permanently irreversible — an opaque 32-byte string from which no handle can ever be derived, by anyone, including KickTech. This is **cryptographic erasure**: although the blockchain entry is immutable, deleting the key achieves the *effect* of erasure required by Art. 17. This approach follows guidance from CNIL and the EDPB on reconciling immutable ledgers with the right to erasure. A data subject exercising erasure of their author handle therefore has an effective remedy, despite the immutability of the underlying chain.

Each registration uses a distinct `K`, so erasing one data subject's key never affects any other registration.

This is **an architectural commitment**, not merely a policy statement: it is enforced in the registration code path, and the relevant source is published under the LICENSE (which permits noncommercial study and audit). Anyone can verify it.

**Verification data-flow (what leaves your browser when a badge is checked).** To display a badge on a person-publication surface, the extension must check whether the author of the page you are viewing matches the on-chain HMAC marker. Because the key `K` is server-side (and must remain so for the erasure guarantee to hold), the extension sends the **candidate handle visible in the page URL** to a dedicated verification endpoint, which recomputes the HMAC and returns only a yes/no answer. This flow is minimized as follows:

- it occurs **only** for person-publication surfaces carrying an HMAC marker, and **only** after the page content already matches a registered hash — not for arbitrary pages or people you browse;
- the candidate handle is sent **in the request body only** (never in the URL or query string, so it cannot appear in transport logs), over TLS (so a network observer sees only the hostname, not the handle);
- the endpoint **does not log or store** the candidate handle; it computes the comparison in memory and returns only `{match: true|false}` — it never echoes the handle back;
- if the verification service is unreachable, the extension fails closed (no badge is shown) rather than guessing.

**What happens to the badge after erasure.** Once the key `K` is erased, the verification endpoint can no longer confirm the handle, so it returns `match:false` for that marker — permanently. The visible effect depends on the content:

- if the registered content has since changed, it no longer matches the on-chain hash at all, so nothing is recognized — no badge;
- if the content is still byte-identical to what was registered, the extension still recognizes the *content hash*, but because the author can no longer be confirmed it does **not** show the "verified human author" badge. Instead it shows a neutral/cautionary indicator that the content is recognized but the page is **not** an authorized author of it (i.e. it is treated as a possible copy).

In other words, erasure removes the author attestation everywhere it is surfaced: the affirmative "this author stands behind this content" signal disappears and cannot be restored without a new registration by the author. This is the user-visible consequence of exercising the right to erasure under §9.2a, and it takes effect across the whole system (chain marker → verification endpoint → extension badge) the moment the key is deleted.

Before this design, KickTech avoided writing handles at all and accepted weaker anti-spoofing on person-publication surfaces. The keyed-HMAC approach lets HumanBadge provide proper per-author anti-spoofing **and** keep the handle off-chain in any recoverable form — a stronger privacy posture, not a weaker one.

**Technical reference — which surfaces involve an author handle (and therefore an HMAC), and which do not.** This determines when the registration notice (shown in the extension at the moment of registration) appears:

| Surface | On-chain pattern | Author handle (HMAC)? |
| --- | --- | --- |
| X timeline post | `x.com/hmac.<h>/*` | **Yes** — handle as HMAC |
| LinkedIn personal feed / profile / single post | `linkedin.com/in/hmac.<h>/*` | **Yes** — handle as HMAC |
| Facebook wall / profile post | `facebook.com/...hmac.<h>...` | **Yes** — handle as HMAC |
| X direct message | `x.com/i/chat/<convId>*` | No — conversation ID |
| LinkedIn message thread | `linkedin.com/messaging/thread/<urn>/*` | No — thread URN |
| LinkedIn company page | `linkedin.com/company/<slug>/*` | No — organization slug |
| Telegram / Messenger / WhatsApp | channel / thread / group ID | No — conversational identifier |
| Gmail (sender domain) | provider/organization domain | No — provider domain |
| Generic web text | content-hash only (no author pattern) | No |

Only the first three rows reference a natural person's handle; only there does the keyed-HMAC mechanism (and the registration-time notice) apply. All other surfaces carry non-personal identifiers and need no HMAC.

### 10.3 Why writing hashes to the chain does not violate platform terms of service

A reasonable question is whether registering content from X, LinkedIn, Facebook, Gmail, Telegram, WhatsApp, Messenger, etc., on a public blockchain violates those platforms' terms of service against scraping or unauthorized redistribution. HumanBadge's design addresses this in four ways:

1. **Only the user's own content** — HumanBadge registers content the user has authored or co-authored on the user's own account. It does not register or process other users' content.
2. **No scraping** — HumanBadge operates locally in the user's browser session on a page the user is already viewing as an authenticated participant. It does not crawl, harvest, or extract content the user does not already have access to.
3. **Only hashes and minimized metadata are transmitted off-device** — the original content text never leaves the user's browser. The chain receives only a preimage-resistant hash (see §10.1), a publication pattern (a non-PII identifier, or — for person-publication surfaces — a keyed HMAC of the author handle from which the handle cannot be recovered; see §10.2), a timestamp, and a transaction signature.
4. **Explicit user action per registration** — HumanBadge does not auto-register in the background. Every on-chain write requires the user to click "Register" in the popup, which is the user's own act of publication-authentication.

Together, these four properties mean that HumanBadge does not extract, redistribute, or facilitate unauthorized use of platform content — it provides an authentication signal for the user's own original publication.

### 10.4 Architectural data minimization at the application code level

KickTech has chosen to enforce data minimization at the code level, beyond what GDPR strictly requires:

- **Zero-IP at application level** — the HumanBadge Backend application does not read, log, or store IP addresses. IP-class data is contained entirely at the network edge (Vercel Firewall) for rate-limiting and is not passed to the application. This is enforced architecturally and is independently verifiable in the published Backend source.
- **Local seed never transmitted** — the per-installation cryptographic seed that derives rotating KT-tokens is created locally on first install and is never sent to KickTech or any sub-processor.
- **Hashing before transmission** — content is hashed in the browser before transmission; the original content never leaves the user's browser.

### 10.5 Why these voluntary commitments

HumanBadge is positioned as the popular-tier authentication product of the broader KickTech Origin Registry ecosystem (see the technical instruction in `docs/INSTRUCTION.md`, §1 and §9). The trust value of the product depends on architectural minimum-data, not just policy statements. KickTech voluntarily exceeds GDPR minima in the ways described in §10.1–§10.4 because that architectural minimum-data is what makes HumanBadge worth trusting.

These commitments are not statutory data-subject rights. They are documented here to give users, auditors, and reviewers a complete picture of the privacy posture of HumanBadge — and to make explicit which properties are GDPR-required (§9) and which are KickTech-chosen (§10).

---

## 11. Security measures

We implement technical and organizational measures to protect data:

- **Encryption in transit** — all Backend communication uses TLS.
- **Architectural data minimization** — the application does not store or process IP addresses; IP-derived data is contained at the network edge and not passed to the application. This is enforced in code, not only in policy.
- **Hashing of identifying data** — content is hashed locally before transmission; original text never leaves the browser.
- **Browser sandboxing** — local browser data is sandboxed by the browser's extension model.
- **Access controls** — access to administrative systems is restricted to authorized personnel, logged, and reviewed periodically.
- **Vulnerability management** — see [SECURITY.md](SECURITY.md) for the responsible-disclosure process. We address reported vulnerabilities promptly.

## 12. Personal-data breach notification

In the event of a personal-data breach that is likely to result in a risk to the rights and freedoms of natural persons, we will:

- **Notify the competent supervisory authority** within 72 hours of becoming aware of the breach, in accordance with GDPR Article 33.
- **Notify affected individuals** without undue delay where the breach is likely to result in a high risk to their rights and freedoms, in accordance with GDPR Article 34.

## 13. Children

HB is not directed at, designed for, or knowingly used by children under the age of 13 (or 16 in jurisdictions where that is the applicable threshold for data-protection consent without parental authorization). We do not knowingly process the personal data of children. If you become aware that a child has used HB and provided personal data, please contact us so we can address the situation.

## 14. Cookies and local storage

HB uses browser local storage (`chrome.storage.local`) to maintain:

- The per-installation seed (necessary for the rotating KT-token).
- UI preferences (theme, layout).
- A short-lived verification cache.

This is **strictly necessary** for the Extension to function and is not used for tracking, profiling, or advertising. **Cookies are not used by the Extension.**

The `www.kicktech.io` website may use cookies — see the separate cookie / privacy notice for that property at [www.kicktech.io](https://www.kicktech.io).

## 15. Changes to this Privacy Policy

We may update this Privacy Policy from time to time. Material changes will be:

- Announced in the Extension's release notes.
- Reflected in an updated effective date and version number at the top of this policy.
- For significant changes affecting your rights, communicated through the Extension UI.

We will retain a version history of this policy at [www.kicktech.io/privacy](https://www.kicktech.io/privacy) so you can review prior versions.

## 16. Contact and supervisory authority

For privacy questions, exercise of your rights, or complaints:

> **KickTech Privacy** — FAPL Sp. z o.o.
> privacy@kicktech.io
> ul. Adama Mickiewicza 37/58, 01-625 Warsaw, Poland

If you believe we have not handled your concerns adequately, you may lodge a complaint with the supervisory authority in your EEA country of residence. For Poland, the supervisory authority is:

> **Urząd Ochrony Danych Osobowych (UODO)**
> ul. Stawki 2, 00-193 Warszawa, Poland
> [www.uodo.gov.pl](https://www.uodo.gov.pl)

---

© KickTech. This Privacy Policy is licensed for transparency reference under the same terms as the Software (see [LICENSE](LICENSE)), but its legal effect derives from the canonical version published at [www.kicktech.io](https://www.kicktech.io).
