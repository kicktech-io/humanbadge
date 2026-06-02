# KickTech HumanBadge — Technical Instruction

> Companion document to the [README](../README.md). Covers registration flow, verification flow, anti-spoof use-cases, privacy details, and the KTOR ecosystem.

---

## 1. Introduction

KickTech HumanBadge (HB) is a browser extension that lets you — as an ordinary social-media user, blogger, or message author — attach a verifiable proof of authorship to specific posts, messages, and emails you publish. Readers running the extension see a 👤 badge next to content that matches a published registration. If the content is altered after registration, the badge disappears.

This document describes how it works in practice and how to use it. For the high-level overview, see the [README](../README.md).

**Important framing — HB is the lightweight, popular-use tier of KickTech's origin-registry family.** It is designed for everyday content authenticity between people on social platforms and messengers. HB does **not perform identity verification of registrants** — anyone can install HB and register anything on their own account. For authentication that requires verified-issuer identity (banks, public institutions, critical infrastructure), KickTech provides the full KTOR ecosystem (see §12). The two systems coexist without conflict — a user with both extensions installed will, in certain cases, see two different attestations from two different verification scopes.

---

## 2. The principle: proof of action

### What HB actually proves

HB attests to a **deliberate publishing action** at a specific moment by a specific account holder. The chain of evidence is:

1. The publisher installs HB and is issued a per-installation cryptographic seed (stored locally, never transmitted).
2. Every 10 minutes, HB derives a fresh short token (`KT-XXXXXX` format) from the seed and the current time window. The token rotates automatically.
3. To register a piece of content, the publisher must paste **the current token** into the content and publish it on their channel.
4. The publisher then opens HB and registers the published content — this hashes the visible text and writes the hash to the public registry on the Base Sepolia blockchain.
5. Readers visiting that content see HB cross-reference the visible KT-token + content hash + publishing-channel context against the on-chain registry. A match produces the 👤 badge.

### Why this is hard for bots and adversaries

The principle is **proof of action**, not "proof of human". An attacker would need to do all of the following, in real time, to forge a registration:

- **Control the publisher's account credentials** — to publish content on the authorized channel.
- **Hold a currently-valid KT-token** — which rotates every 10 minutes; harvested tokens expire fast.
- **Be at the keyboard during the action** — the registration is a UI-driven action triggered from the popup, not a passive API call discoverable from outside.
- **Not race the rotation** — by the time a scraped token reaches an attacker, it may already be stale.

The registration is tied to **the publisher's account on their channel** (e.g., your specific Twitter handle, your LinkedIn profile). An attacker impersonating you on a different account cannot produce a matching registration, because the channel-account itself is part of the implicit context that HB checks.

### What HB is NOT

It is essential to be clear about what HB does **not** do:

- **NOT "proof of human"** — HB does not verify that the publisher is a biological person.
- **NOT a digital identity scheme** — HB does not establish, verify, or attest to a user's legal identity.
- **NOT a KYC mechanism** — no personal data, no document verification, no biometrics.
- **NOT subject to eIDAS, GDPR Article 9, or other regulated-identity frameworks** — because no personal-data attestation is performed.
- **NOT an "officialness" certification** — HB has zero identity verification of registrants. The 👤 badge confirms that a particular account holder deliberately registered content — it does NOT confirm that the account holder is who they claim to be in a legal or institutional sense. For institutional-trust certification, see §12 (KTOR Premium).

HB authenticates **a specific publishing act at a specific moment**, performed by whoever held the relevant publishing-channel credentials and the rotating token at that moment.

---

## 3. Registration flow (publisher workflow)

This is the workflow for someone publishing content they want to authenticate.

### Step-by-step

1. **Install HB** — see the Install section in the [README](../README.md). HB works identically on Chrome, Edge, Opera, Brave, and other Chromium-based browsers.

2. **Open the popup** — click the HB icon in the toolbar. The popup shows your current 10-minute token (e.g., `KT-A4F7B2`) and a countdown to the next rotation.

3. **Copy the current token** — one click on the token field.

4. **Paste the token into your content** — place the token somewhere visible in the post, message, or email. Common patterns:
   - At the end of a post: *"... full text of the post. KT-A4F7B2"*
   - In an email signature for a one-off authenticated message
   - As a hashtag-style suffix on social posts

5. **Publish on your channel** — post on X, LinkedIn, Telegram, send the email, etc. The content must be visible (not in a password-protected area, not behind a paywall HB cannot read).

6. **Return to HB and register** — open the popup and click "Register" (or use Harvest for batch registration — see §6). HB will compute the hash of the visible text and submit a registration to the public registry.

7. **Wait for on-chain confirmation** — during beta, expect 5 to 50 minutes between registration and visible badge across all readers' extensions (gateway snapshot refresh). The popup shows status as it progresses.

8. **Confirm visibility** — visit the published content as a logged-out user or use a separate browser to confirm the 👤 badge appears.

### Important notes

- **Token must be current at the moment of publishing** — copy → paste → publish should happen within the same 10-minute window. If you wait too long, the token will have rotated.
- **Hash is computed on visible text** — formatting, hidden metadata, and tracking parameters do not affect the hash. Two visually-identical posts produce the same hash regardless of underlying markup.
- **Edits invalidate** — if you edit the post after registration, the new hash no longer matches the registered hash, and the badge disappears for new readers. You'd need to re-register the new version.

### Smartphone publishing

> **HB does not run on smartphone apps** (see §7). If you want to register content while on a smartphone, open the relevant platform's website in a desktop/laptop Chromium browser with HB installed, log in there, and use the web version to register.

---

## 4. Verification flow (reader workflow)

This is what happens automatically when a reader running HB visits a page.

### What HB does in the background

1. HB scans visible text on the current page for `KT-XXXXXX`-format tokens.
2. For each token found, HB computes a local hash of the surrounding content.
3. HB queries the on-chain registry (via the gateway) to check whether a matching registration exists.
4. If a match is found, HB **additionally verifies that the page's publishing context (account, channel) matches the registered publisher**.
5. HB inserts a badge based on the combined result:
   - **👤 badge** — content registered, hash matches, and publishing context matches. For person-publication surfaces (X timeline, LinkedIn personal feed / profile, Facebook wall), this includes confirming the author handle against the registration's keyed-HMAC marker.
   - **No badge** — no KT-token on the page, no match in the registry, or hash mismatch (content edited after registration).
   - **Warning badge** — hash matches the registration record, but the publishing context cannot be confirmed as the registered publisher. This covers two cases: (a) the content is on a different account or surface from the registered publisher (the unauthorized-copy scenario), or (b) the registered author has exercised the right to erasure of their handle marker, after which the author can no longer be confirmed by anyone.

### Recognizing an unauthorized copy of a registered post

When someone copies a registered post to another account (with or without modification), HB detects this in one of several ways:

- **Text modified** — even minor edits (changed numbers, added phrases, removed disclaimers) produce a different hash. **No badge on the copy.** The original (on the correctly-registered publisher's account) still shows the 👤 badge.
- **Text exact + KT-token exact, but different account** — the hash matches the registration record, but the publishing context differs from the registered publisher. For person-publication surfaces (X timeline, LinkedIn personal feed / profile, Facebook wall), HB performs a keyed-HMAC author-handle check against the registration — the impersonator's handle does not match, and HB shows a **warning badge** on the copy. For other surfaces (DMs, group / channel / conversation IDs, organization slugs, provider domains), a structurally simpler identifier-match handles the same role.
- **Text exact + malicious image/link overlay** — the visible text still hashes to the registered value, but the post now contains an additional element (e.g., a phishing-image clicking to a malicious URL). In this case the publishing-context check is what protects the reader: a copy on a different account triggers the warning regardless of any added overlay.
- **Author has exercised the right to erasure of their handle marker** (see PRIVACY.md §9.2a) — the server-side key that lets anyone confirm the author HMAC has been permanently deleted, so HB can no longer attest to the author of that registration. If the content text is still byte-identical to what was registered, HB still recognizes the content hash but cannot confirm the author, so it shows a **warning badge** rather than the 👤 badge — the content is recognized but the page is not an authorized author of it (treated as a possible copy).

In all four cases, **the original — on the correctly-registered publisher's account — continues to show the 👤 badge normally**, except in the erasure case where the original publisher has chosen to remove their author attestation. The detection otherwise applies to the copy, not the original.

### Smartphone reading

> **HB does not run on smartphone apps.** If you want to verify content while on a smartphone, open the relevant platform's website in a Chromium-based browser with HB installed. The badge does not appear in mobile native apps.

### Edge cases

- **Dynamic content (X, LinkedIn feeds)** — HB re-scans when the page changes (new posts loaded, scrolling, expand/collapse). Some lazy-loaded content may take a moment to badge after scrolling.
- **Gmail special handling** — HB additionally verifies sender-domain authorization and surfaces a warning banner if email contains suspicious links (relay services hiding destination, links to unregistered domains).
- **Edited content** — if a publisher edits content after registering, readers visiting the updated version see no badge. This is deliberate — HB attests to the exact text that was registered.

---

## 5. The Refresh tip — important

> **After installing HB, after a service restart, or any time HB seems to not see content you expect it to verify: reload the open tab and press the popup's "↺ Refresh" button.**

This is the single most useful operational tip for HB:

- HB's on-chain registry snapshot refreshes periodically. After certain events (extension reload, browser restart, registry resync), the snapshot in HB's local cache may briefly lag behind the current on-chain state.
- The "↺ Refresh" button in the popup forces a fresh snapshot pull and a full re-scan of the current tab.
- If you've just registered a piece of content and want to confirm it's visible — wait the typical 5-50 min beta latency, then **reload the tab + Refresh** to see the result immediately.

This is **not** a bug — it's a deliberate consequence of operating on a public blockchain with snapshot-based caching for performance.

---

## 6. Harvest mode (advanced — publisher batch tool)

For publishers who post multiple items in a session (e.g., a content creator publishing a series of posts on a topic), Harvest collects candidate content from the current tab for batch registration.

### How to use

1. Publish your content on the channel (with KT-tokens embedded as in §3).
2. Open the HB popup → click "⛏ Harvest".
3. HB scans the current tab and lists candidate items with visible KT-tokens.
4. Select the items you want to register.
5. Register the batch — HB processes each in sequence and reports per-item status.

Harvest is especially useful for:

- Multi-tweet threads
- Sequential LinkedIn posts
- Bulk-publishing content creators
- Coordinated multi-item publishing sessions

---

## 7. Supported platforms

### Web-only — important

> **HB works only on the WEB versions of the platforms listed below — these apps when accessed through a desktop or laptop browser. HB does NOT work on mobile smartphone apps. This is by technical and security design.**

The golden rule for smartphone users:

> **If you want to verify or register content while using a smartphone, switch to a desktop or laptop, open the relevant platform's website in a Chromium-based browser (Chrome, Edge, Opera, Brave, etc.) with HB installed, log in there, and use the web version.**

The native mobile apps of these platforms (the X app, the Facebook app, the WhatsApp / Telegram / Messenger phone apps, the Gmail mobile app, etc.) are not covered and will not be covered by HB — mobile browsers on phones currently have limited or no compatible extension support, and native mobile apps are not Chromium browsers.

### Browser support

HB is a Chromium browser extension and works identically across all Chromium-based desktop/laptop browsers, including:

- Google Chrome
- Microsoft Edge
- Opera
- Brave
- Vivaldi
- …and other Chromium-based browsers

You can install HB from the corresponding browser store (Chrome Web Store, Edge Add-ons, Opera Add-ons, etc.) when listed there, or — if not yet listed for your browser — as an unpacked extension from the GitHub repository (see Install in the [README](../README.md)).

### Platform table

HB scans visible text on **any** web page for KickTech tokens. The table below details the special handling for each major web platform.

| Platform (web) | Scanning | Special handling | Beta limitations |
|---|---|---|---|
| **Gmail (web)** | Sender + body text + links | Sender-domain authorization check; suspicious-link banners; Forward-to-Verify CTA | Personal Gmail; Workspace policies may interact |
| **X / Twitter (web)** | Posts, replies, quote-tweets | Token recognition; keyed-HMAC author anti-spoof on timeline posts (handle never on-chain in clear — see PRIVACY.md §10.2) | Lazy-loaded threads may take a moment to badge after scroll |
| **LinkedIn (web)** | Feed posts, articles, comments | Token recognition; keyed-HMAC author anti-spoof on personal feed / profile posts (handle never on-chain in clear) | Articles render slightly differently — may require Refresh |
| **Facebook (web)** | Public posts, comments | Token recognition; keyed-HMAC author anti-spoof on wall / profile posts (handle never on-chain in clear) | Pages with heavy lazy-loading may need scroll + Refresh |
| **Telegram (web)** | Posts, channels, direct messages | Token recognition in chat history | Telegram Desktop and mobile apps not covered (web only) |
| **WhatsApp (web)** | Direct messages, group chats | Token recognition in messages | WhatsApp mobile app not covered (web only) |
| **Messenger (web)** | Direct messages | Token recognition | Limited to web client |
| **Generic web pages** | Any visible text on the page | Token recognition only — no platform-specific anti-spoof | Works on blogs, news sites, government pages, any HTTP/HTTPS content |

### How per-platform anti-spoofing works

The core text-based verification works on all listed platforms. For **person-publication surfaces** — X timeline posts, LinkedIn personal feed and profile posts, Facebook wall and profile posts — HB performs a keyed-HMAC check that binds the registration to the post's author. The author handle is never written to the chain in clear: only a server-keyed HMAC is on-chain, and the verifying handle is sent in the verification request body only (over TLS, not logged, not stored). See PRIVACY.md §10.2 for the full mechanism, including how cryptographic erasure of an author marker works.

For **non-person surfaces** (DMs, group / channel / conversation IDs, organization slugs, provider-domain patterns), no author handle is involved; a structurally simpler identifier-match handles the same anti-spoof role.

Additional DOM-structure heuristics that detect subtler kinds of impersonation continue to be added incrementally over the beta period.

---

## 8. Anti-spoof use-cases — real benefits

Concrete scenarios where HB provides a useful signal that wasn't previously available — framed around **ordinary people on social media and messengers**, which is the natural HB use-case. For institutional / high-trust scenarios, see §9 and §12.

### 8.1 Your post copied to an impersonator account with a malicious image

**The scenario** — You publish a popular post on X or Facebook (a tutorial, an opinion piece, a recipe). You include a KT-token; you registered it via HB. An attacker copies your text VERBATIM, *including the KT-token*, to their lookalike account (or a fresh new account that scrapes your photo as the avatar). The text alone hashes identically to yours. To monetize the impersonation, the attacker drops in an additional element — for example, a thumbnail image that, when clicked, leads to a phishing site.

**Without HB** — Readers may encounter the impersonator's post first (it's a different account, but with a similar handle and your photo). They trust the content because the text is identical to yours, click the image, get phished.

**With HB** — On your original post (on your correctly-registered account), readers see the 👤 badge. On the impersonator's copy, the text-hash matches the registration record, but the publishing context differs. On X timeline, LinkedIn personal, and Facebook wall — where this use-case actually lives — HB checks the impersonator's visible handle against the registration's keyed-HMAC author marker; it does not match, and HB shows a **warning badge** ("content registered, but publication location does not match the registered publisher"). The author handle stays off the chain in clear; only an HMAC is on-chain, and the verifying handle is never logged or stored. The reader gets a clear signal that this isn't the original publisher's post.

**Real benefit** — Defends against "verbatim copy + malicious overlay" — a phishing pattern that exploits the reader's habit of recognizing familiar text.

### 8.2 Your content reposted with tampered details

**The scenario** — You publish a thoughtful post on social with specific details (a recipe, the steps of a tutorial, a how-to article, a personal experience description). Someone copies your text but subtly alters key details — changes a step in the recipe, swaps a number in your figures, modifies an attribution.

**Without HB** — Followers seeing the altered version don't realize it differs from your original. The modified version spreads, sometimes faster than your original.

**With HB** — Your original shows the 👤 badge. The altered repost shows **no badge** — the modified text produces a different hash. The mismatch is a clear visual signal that this isn't your original published version.

**Real benefit** — Defends against "tactical misquoting" — a common form of misinformation, harder to detect than outright fabrication.

### 8.3 Phishing email defense (Gmail-specific)

**The scenario** — You receive an email purportedly from a service you use (an online shop, a subscription site, a payment service) with a link to "update your details" or "confirm your account". The sender address looks legitimate; the formatting is right; there's a sense of urgency.

**Without HB** — You inspect the sender address, hover over links, may or may not notice the underlying domain is suspicious.

**With HB** — HB checks: is the sender domain authorized? Are the links in this email going to known-authorized destinations? If suspicious links are detected, HB displays an in-Gmail warning banner. You can then forward the email (unchanged) to `verify@kicktech.io` for human review, and receive an automated reply indicating whether the destination domain belongs to the sender's authorized list.

**Real benefit** — Replaces the unreliable hover-and-inspect habit with a deterministic check.

### 8.4 Marketplace / classifieds listing fraud

**The scenario** — You list an item for sale on a social marketplace (e.g., Facebook Marketplace) with photos and a description. You include a KT-token and register the listing. Someone copies your listing verbatim — same item, same description, same KT-token — to their account, changing only the contact details to direct buyers to their phishing/scam channel.

**Without HB** — Buyers seeing the copy can't easily tell whose listing is the real one. The visible text is identical to yours.

**With HB** — Your original shows the 👤 badge. The copy shows a **warning badge** (on Facebook wall the keyed-HMAC author check is implemented) or no badge on simpler surfaces, because the publishing context doesn't match your registered identity. Buyers have a clear signal of which listing is the genuine one.

**Real benefit** — Adds an authentication signal to peer-to-peer commerce, where impersonation is a common fraud vector.

---

## 9. HB vs the full KTOR ecosystem — what HB does NOT do

HB is the lightweight, popular-use tier of KickTech's origin-registry family. There are deliberate limits to what HB does, and where it ends, the broader KTOR ecosystem (see §12) takes over.

### What HB does not do

- **No identity verification of registrants.** HB does not verify who you are when you register. Anyone with the extension installed can register any text on their own account. The 👤 badge confirms that *a particular account holder* deliberately registered content via HB — it does NOT confirm that the account holder is who they claim to be in a legal, institutional, or organizational sense.
- **No image-content registration.** HB registers text hashes only. If a post contains an image important to the content authenticity (a logo, a signed document, a chart), the image is not part of HB's authentication.
- **No signature/footer-block hashing.** HB does not register or check structured signature blocks (e.g., an institutional email footer with letterhead and contact details).
- **No issuer authentication for institutional accounts.** HB does not have a process where institutions (banks, government agencies, news organizations) can prove they are who they claim to be.

### Implications — and why we deliberately keep HB this way

- HB is excellent for **ordinary social-media and messenger use**. Your friends, followers, and contacts trust the 👤 badge on your posts as a signal that the post is genuinely yours, on your account, unedited.
- HB is **deliberately NOT suitable as an "officialness" certification** for institutional communications. A user who creates a fake account named "Bank XYZ" and uses HB on that fake account to register a fake announcement would technically produce a 👤 badge on their fake post — because HB has no way to verify they aren't actually Bank XYZ. **This is precisely why HB is not positioned for, and should not be used as, institutional authentication.** Doing so would create a misleading trust signal exploitable for discrediting genuine institutions.

For institutional, banking, public-administration, news-organization, and critical-infrastructure use, see §12 (KTOR Premium and KTOOR), which add the missing layers — issuer authentication, image-content and signature-block hashing, organizational workflows — that HB intentionally omits.

### Coexistence with the full KTOR ecosystem

HB and the full KTOR ecosystem coexist without conflict. A user with both HB and a KTOR extension installed will, in certain cases, see **two different attestations** on the same content simultaneously — one from HB (popular-tier text authentication, account-level) and one from KTOR (full institutional authentication, including issuer verification and possibly image/signature blocks). The two attestations cover different verification scopes and complement each other rather than competing.

---

## 10. Privacy in depth

This section explains exactly what data leaves your browser, when, and why.

### Local-only data

Stored in your browser, never transmitted:

- **Per-installation cryptographic seed** — created locally on first install; used to derive your rotating KT-tokens. Never sent to KickTech or anyone else.
- **Recent verification cache** — to avoid re-querying the registry for the same content during a browsing session.
- **UI preferences** — theme, layout settings.

### What leaves your browser (and when)

| Direction | When | What | Why |
|---|---|---|---|
| Outbound — verify | On every page scan that finds a KT-token | A short hash of the content + the token | To check the on-chain registry for a match |
| Outbound — register | Only when you click "Register" in the popup | A hash of the content + your token + your publisher-channel context (either a non-personal identifier — group / conversation / organization / provider — or, for person-publication surfaces, a keyed HMAC of your author handle from which the handle cannot be recovered; see PRIVACY.md §10.2) | To create the on-chain registration |
| Outbound — verify-HMAC | Only on person-publication surfaces with a registered HMAC marker, after the content hash has already matched | The candidate author handle visible in the page URL | To check whether the page's author matches the registration. Sent in the request body only (never URL/query) over TLS; the endpoint does not log or store the handle and returns only a yes/no answer |
| Outbound — health | Every 60 seconds | A heartbeat to the gateway | To detect service outages and show a status indicator |

### What does NOT leave your browser

- **Original text** — only one-way hashes are transmitted, never the source text. A hash cannot be reversed to reconstruct the text.
- **Email addresses** — HB reads sender addresses in Gmail for the authorization check, but does not store or transmit them.
- **Browsing history** — HB has no concept of "history". It scans only the currently-visible page on demand.
- **IP-derived data on the application side** — the HB backend application reads zero request IPs. Rate-limiting is performed at the network edge (Vercel Firewall) without storing IP-derived data in HB systems.

### Why we can make these claims

The built extension code (`dist/`) is published in this repository for independent audit — readable JavaScript identical to what your browser runs. The GDPR-critical cryptographic core of the backend (keyed-HMAC author marker per [PRIVACY.md](../PRIVACY.md) §10.2) is published as a public audit reference at `audit-references/backend/hmac.ts`. The full Backend behavior — particularly the zero-IP-on-application-side guarantee — is documented in the architecture notes available on request and can be reviewed by qualified third-party auditors under NDA. The on-chain registry is by definition public and auditable.

The full Privacy Policy is at [www.kicktech.io/privacy](https://www.kicktech.io/privacy).

---

## 11. Beta program

### Current state

- **Test blockchain** — registrations are made on Base Sepolia (Base's test network), not Base mainnet. This is honest beta: real cryptography, real network behavior, real on-chain transactions, but on a test chain so no real-money exposure.
- **Free** — registrations cost nothing during beta. As infrastructure scales and we move to mainnet, registration packages will be available (a free tier for individuals is expected to remain).
- **Throughput limits** — the gateway and registration endpoint are rate-limited to protect against abuse:
  - Per-session: ~5 registrations per 5-minute window, ~15 per hour.
  - Per-IP (network edge): 10 registrations per 5-minute window.
- **Congestion handling** — during traffic spikes, you may see "service busy, try again in a moment" responses. This is expected; retry after a few seconds.
- **Snapshot latency** — 5 to 50 minutes between successful registration and visible badge for all readers.

### Roadmap

- **Mainnet migration** — planned after Phase 0 stability is demonstrated.
- **Special beta-testing focus: Facebook, Messenger, and X.** These platforms are already listed as supported (see §7), but their dynamic content patterns and DOM-structure variability mean a substantially larger volume of real-world coverage data than current beta has produced is needed before they can be considered fully battle-tested. **Reports from beta testers using these platforms at scale are particularly valuable.** Keyed-HMAC author anti-spoofing for X timeline, LinkedIn personal, and Facebook wall is implemented; further DOM-structure heuristics for edge cases continue to be added as data comes in.
- **Mobile apps** — out of scope. The technical and security reasons for the desktop-Chromium-only design are described in §7.

### Reporting issues

- **Beta feedback, bug reports, questions** — [open an issue](../../issues) on this repository.
- **Privacy / security concerns** — see [SECURITY.md](../SECURITY.md) for responsible-disclosure procedures.
- **General contact** — [www.kicktech.io](https://www.kicktech.io).

---

## 12. The KTOR ecosystem

HumanBadge is one component of the broader **KickTech Origin Registry (KTOR)** family — specifically, its consumer / popular tier. The full family has three components, structured by audience and capability.

### Components

- **HumanBadge (HB)** — this extension. The lightweight, popular-use tier for individual social-media and messenger users. Free during beta. No identity verification of registrants (see §9). Text hashing only.

- **KTOR Premium** — the full-featured registry infrastructure for companies, public institutions, and government agencies. Designed for organizational-scale registration workflows. KTOR Premium adds, on top of HB's capabilities:
  - **Issuer authentication.** Institutions go through a verified-identity process before their registrations carry the institutional-trust signal — so a Premium-attested post from "Bank X" actually reflects that Bank X has been vetted, not just that someone holds an account named "Bank X".
  - **Image-content hash registration.** Logos, official imagery, and identifying visual elements are hashed alongside text — authenticating not just the body of a post but also its visual identity.
  - **Signature/footer-block hashing.** Institutional letterheads and signature blocks are hashed as separate elements, so even a partial copy that preserves the body but tampers with the signature is detected.
  - Per-publisher anti-spoof tuning, editorial and compliance workflows, integration with content-management systems and institutional security policies, service-level agreements for snapshot latency and availability, integration support.
  - Covered by contractual arrangements (not consumer self-service).

- **KTOOR — KickTech Origin Open Registry.** A subset of KTOR offered **pro bono in narrow scope** to selected large state institutions, banks, and critical-infrastructure operators — by KickTech invitation, with bounded scope — for the purpose of testing the use-case of protecting their clients and citizens from fraud that currently slips through existing state-run reporting systems (such as Polish CERT and the 8080 anti-fraud SMS line). KTOOR participation is governed by a specific agreement covering scope, duration, and reporting.

### Image- and signature-block hashing — a KTOR/KTOOR feature, not HB

A distinguishing feature of the full KTOR ecosystem (Premium and KTOOR) is the registration of **image-content hashes** and **signature/footer-block hashes** alongside text. HB intentionally does not include these — HB is the text-focused popular tier. It is possible that future HB versions may add a simplified form of image-block recognition; this is **not** in the current beta roadmap.

### Complementing state-run systems

KTOR is designed to **complement**, not replace, existing state-run reporting and alert systems. Examples for Poland:

- **CERT Polska** — the national CERT for cyber threats.
- **8080 (anti-fraud SMS line)** — citizens forward suspicious SMS to 8080 for analysis.

These systems excel at threat reporting and post-incident response. KTOR adds the **inverse** signal: a publisher-anchored, on-chain authentication that lets citizens see *"this is the genuine version"* rather than only *"this is suspicious"*. The intent is to slot into existing fraud-prevention workflows, not to compete with them.

### Coexistence with HB

HB and the full KTOR ecosystem run side by side. A user with both extensions installed will, in certain cases, see **two different attestations** on the same content — one from HB (popular-tier, text, account-level) and one from KTOR (full institutional, including issuer verification and image/signature blocks). The attestations cover different verification scopes and complement each other.

### Inquiries

- **Institutional partnerships, KTOR Premium services, KTOOR pro-bono inquiries** — [www.kicktech.io](https://www.kicktech.io).
- **Consumer questions** — see beta feedback channels in §11.

---

## 13. Glossary

| Term | Meaning |
|---|---|
| **KT-token** | A short authentication token of the form `KT-XXXXXX`, derived from a per-installation seed and the current 10-minute time window. Rotates automatically. |
| **KTOR** | KickTech Origin Registry — the umbrella family of services for content authenticity, comprising HB, KTOR Premium, and KTOOR. |
| **HB** | HumanBadge, this extension. The lightweight, popular-use tier of KTOR. No identity verification of registrants; text hashing only. |
| **KTOR Premium** | The full-featured institutional tier of KTOR. Includes verified-issuer authentication, image-content and signature-block hash registration, organizational workflows, SLAs, integration support. For companies, public institutions, and government agencies. Contractual. |
| **KTOOR** | KickTech Origin Open Registry. A subset of KTOR offered pro bono in narrow scope to selected large state institutions, banks, and critical-infrastructure operators by KickTech invitation, for testing protection use-cases against fraud passing through existing state-run reporting systems. |
| **Issuer authentication** | A process (specific to KTOR Premium and KTOOR, not present in HB) where institutional registrants prove verified identity before their registrations carry the institutional-trust signal. |
| **Hash** | A one-way cryptographic fingerprint. Two identical inputs produce the same hash; any change produces a completely different hash. Cannot be reversed to reconstruct the original. |
| **On-chain** | Recorded on a public blockchain (Base Sepolia during beta). Anyone can audit on-chain data. |
| **SimHash** | A similarity-preserving hashing scheme used to fingerprint visible text in a way that is robust to minor formatting differences but sensitive to content edits. |
| **Snapshot** | The gateway's locally-cached view of the on-chain registry, refreshed periodically. Trades a small amount of latency for substantial performance gains. |
| **Proof of action** | The principle that HB attests to a specific publishing act by a specific account holder at a specific moment — not to the publisher's identity, humanity, or institutional officialness. |
| **Keyed HMAC** | A one-way function `HMAC-SHA256(K, value)` that produces a 256-bit fingerprint from which the original `value` cannot be recovered without the secret key `K`. HB uses a keyed HMAC of the author handle, with a fresh per-registration `K` held server-side, to bind person-publication registrations to their author without writing the handle on-chain in clear. See PRIVACY.md §10.2. |
| **Cryptographic erasure** | A way of honoring the GDPR right to erasure (Art. 17) in systems where the underlying storage is immutable (like a public blockchain). Instead of deleting the on-chain entry — which is impossible — the secret key that makes the on-chain value meaningful is deleted, rendering the on-chain value permanently irreversible. HB uses this to erase author-handle HMAC markers on request. See PRIVACY.md §9.2a and §10.2. |

---

## 14. Where to learn more

- **README** — [`README.md`](../README.md) — high-level overview, install, browser support.
- **License** — [`LICENSE`](../LICENSE) — source-available terms.
- **Security disclosure** — [`SECURITY.md`](../SECURITY.md) — responsible-disclosure procedures.
- **Privacy policy** — [www.kicktech.io/privacy](https://www.kicktech.io/privacy) — full legal text.
- **KickTech main site** — [www.kicktech.io](https://www.kicktech.io) — KTOR ecosystem, Premium and KTOOR inquiries, contact.

---

© KickTech. All rights reserved beyond the source-available license terms.
