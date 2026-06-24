# KickTech HumanBadge

> Active proof of authorship for online posts and emails. The browser extension shows a 👤 badge next to content the publisher has registered as authentic — and detects when that content has been altered.

KickTech HumanBadge (HB) is the consumer-facing component of [KickTech Origin Registry (KTOR)](https://www.kicktech.io). It is currently in **beta**.

## What it does

When you visit X (web), LinkedIn (web), Facebook (web), Telegram Web, WhatsApp Web, Messenger (web), Gmail (web), or any other web page in a desktop or laptop Chromium browser, HB scans visible text for KickTech tokens registered on a public blockchain. If the content matches a registration, you see a 👤 badge confirming the publisher stands behind that exact version. **If the text is edited after registration, the badge disappears** — this is the difference from passive "verified once" stamps.

The principle is **proof of action**, not "proof of human". An attestation is a deliberate publishing act tied to a short-lived 10-minute rotating token: the publisher had to be at the keyboard, holding their account credentials, at the moment of registration. This is hard for bots to fake at scale. HB is **not a digital identity scheme** and does not fall under regulated digital-ID frameworks.

A registered **Issuer** can additionally sign authorship cryptographically, so verified content appears under their organization tag — see [HB PLUS](#hb-plus--verified-issuer-attestations-beta).

## Beta notice

HB is in beta on the Base Sepolia test blockchain. Expect:

- **Access limits and rate-limiting** as we scale infrastructure.
- **Occasional "service busy" messages** during traffic spikes.
- **Rapid iteration** — copy and UI may change between versions.

We are actively expanding gateway capacity, on-chain registration throughput, and platform coverage.

## Supported surfaces

HB works on any web page that contains visible KickTech tokens in text. Major platforms with special handling:

| Surface (web only) | Coverage |
|---|---|
| Gmail (web) | Sender-domain verification + suspicious-link analysis + KT-token recognition |
| Telegram (web), WhatsApp (web), Messenger (web) | KT-token recognition in posts and direct messages |
| X / Twitter (web), LinkedIn (web), Facebook (web) | KT-token recognition in posts and replies |
| Generic web pages | KT-token recognition in any visible text |

> **HB does NOT work on smartphone apps.** This applies to the native mobile apps of all platforms above (X app, Facebook app, WhatsApp / Telegram / Messenger phone apps, Gmail mobile app, etc.). If you want to verify or register content from a smartphone, switch to a desktop or laptop and open the platform's website in a Chromium browser with HB installed — see Install below.

Keyed-HMAC author anti-spoofing for X timeline, LinkedIn personal feed / profile, and Facebook wall is implemented — the author handle is bound to each registration via a server-keyed HMAC and is **never written to the chain in clear** (see [PRIVACY.md](PRIVACY.md) §10.2). Further DOM-structure heuristics for edge cases continue to be added incrementally over beta.

The complete flow per platform — registration, verification, and anti-spoof use-cases — is described in the [technical instruction](docs/INSTRUCTION.md).

## HB PLUS — verified-issuer attestations (beta)

HB PLUS is a **separate sub-tier** of HumanBadge and an **MVP bridge toward KTOR Premium**. A registered **Issuer** can cryptographically sign authorship of exact content with their wallet (an EIP-712 signature, re-verified server-side against the on-chain issuer registry). When verified, the content carries the Issuer's **organization tag** instead of the generic badge — e.g. `👤 FAPL TEST` — and the on-chain label reads `[HUMAN] [FAPL TEST] …`. Editing the content still invalidates the badge, exactly as in regular HB.

**What PLUS is — and is not:**

- It is a **limited** form of verified-issuer attestation: cryptographic proof that the signer controls a wallet enrolled as an Issuer. It is the beta MVP of the issuer layer.
- It is **not** the full KTOR Premium offering — no institutional vetting of the organization, no image-content or signature/footer-block registration, no editorial workflows, no SLAs. Those remain Premium (see [the bigger picture](#the-bigger-picture--hb-and-the-ktor-ecosystem)).
- Regular (non-Issuer) **HB is unchanged**: account-level proof-of-action, with no registrant identity verification. PLUS adds an optional issuer layer on top.

**Using PLUS (Issuers):** connect a wallet in the popup, then click Register on your content. The popup runs the normal anti-bot check, the wallet prompts for an EIP-712 signature (switching to Base Sepolia if needed), and the backend records the attestation under your org tag. Beta runs on Base Sepolia.

**For everyone else:** nothing to do — you simply see the organization tag on content an Issuer has signed.

## Install

**Browser support** — HB is a Chromium browser extension and works identically across all Chromium-based desktop/laptop browsers: Google Chrome, Microsoft Edge, Opera, Brave, Vivaldi, and others.

**From a browser store** — listing in preparation for the Chrome Web Store, Microsoft Edge Add-ons, and Opera Add-ons. Beta access is distributed via direct link in KickTech announcements. When the listing is available for your browser, install via the corresponding store; if not yet available there, install manually from this repository (see below).

**Manual install (technical users)** — clone or download this repository, then in your Chromium-based browser:

1. Open `chrome://extensions` (or equivalent: `edge://extensions`, `opera://extensions`, `brave://extensions`)
2. Enable Developer Mode (top right)
3. Click "Load unpacked" → select this folder
4. Pin the extension icon to the toolbar

> **For the verification state to display correctly after installation, reload the open tab and press the popup's "↺ Refresh" button.** This is also useful any time HB seems to not see content you expect it to verify.

## Verification & transparency

Every registration is recorded on a public blockchain (Base Sepolia during beta). There is **no private KickTech database** holding the truth — the truth is on-chain and anyone can audit it via the public block explorer. KT-tokens you see in this extension can be cross-checked against on-chain records independently. For HB PLUS, the on-chain label carries the Issuer's organization tag, and the exact-content SHA-256 is recorded in the asset's on-chain metadata.

This repository is a **one-way published mirror** of the build artifact produced from KickTech's private development repository. Each release is published as a single clean commit with the corresponding tag.

## Privacy

HB does **not** collect or process personal data. Specifically:

- No email addresses are read, stored, or transmitted.
- No browsing history is recorded.
- No page content is sent to KickTech servers without your explicit action.
- The only outbound calls are: hash lookups to verify content against the public on-chain registry, and — when you click "Register" — the publishing action you authorize. For HB PLUS that action additionally carries the content's SHA-256 (a hash, never the text) and your EIP-712 signature; the Issuer wallet address is a public on-chain identifier.

Full policy: [www.kicktech.io/privacy](https://www.kicktech.io/privacy).

## The bigger picture — HB and the KTOR ecosystem

HumanBadge is the **lightweight, popular-use tier** of the broader **KickTech Origin Registry (KTOR)** ecosystem. The full family has three components, structured by audience and capability:

- **HumanBadge (HB)** — this extension. For individual social-media and messenger users. Free for consumer use during beta; registration packages may become paid as infrastructure scales. **Base HB has no identity verification of registrants** — anyone can install HB and register anything on their own account. The 👤 badge confirms that a particular account holder deliberately registered the content; it does NOT confirm that the account holder is who they claim to be in a legal or institutional sense. Base HB is therefore deliberately not positioned for, and not suitable as, authentication of institutional, banking, government, or critical-infrastructure communications.

  **HB PLUS** (beta) sits on top as an optional sub-tier and an MVP bridge to Premium: a registered Issuer cryptographically signs content, which then displays under an organization tag. This is *limited* issuer verification — proof of control over an enrolled Issuer wallet — and is explicitly **not** the full institutional vetting of KTOR Premium.

- **KTOR Premium** — the full-featured tier for companies, public institutions, and government agencies. Designed for organizational-scale registration workflows. It provides the **complete** version of the issuer layer that HB PLUS only previews: vetted-issuer authentication (so a Premium-attested post from "Bank X" reflects that Bank X has been vetted, not merely that someone controls a wallet labelled "Bank X"), image-content and signature/footer-block hash registration, editorial workflows, integration with content-management systems and institutional security policies, SLAs. Covered by contractual arrangements.

- **KTOOR** — KickTech Origin Open Registry. A subset of KTOR offered **pro bono in narrow scope** by KickTech invitation to selected large state institutions, banks, and critical-infrastructure operators — for testing the use-case of protecting their clients and citizens from fraud that currently slips through existing state-run reporting systems.

**Coexistence**: HB and the full KTOR ecosystem run side by side without conflict. A user with both extensions installed will, in certain cases, see two different attestations on the same content simultaneously — one from HB (popular-tier, text, account-level or PLUS issuer-tagged) and one from KTOR (full institutional, including vetted issuer verification and image/signature blocks). The attestations cover different verification scopes and complement each other.

KTOR is designed to **complement** existing state-run reporting and alert systems — for example, CERT Polska and the 8080 anti-fraud SMS line in Poland — by providing a publisher-anchored, on-chain authentication signal that fits into existing fraud-prevention workflows.

Details and contact: [www.kicktech.io](https://www.kicktech.io).

## License

Source-available built artifact. The compiled extension code (`dist/`) is published in this repository — readable JavaScript, not minified, identical to what your browser runs. The original source files (with debug paths, internal comments, and experimental flags) are maintained in a private development repository and do not ship here. The GDPR-critical backend cryptographic core — the keyed-HMAC author marker mechanism documented in [PRIVACY.md](PRIVACY.md) §10.2 — is published as a public audit reference at [`audit-references/backend/hmac.ts`](audit-references/backend/hmac.ts), complementing the extension artifact for end-to-end audit of the privacy claims. This is **not** open-source: reuse, redistribution, and derivative works outside the official KickTech channel are not permitted. See [LICENSE](LICENSE).

"KickTech HumanBadge" is a trademark of KickTech.

## Contributing & questions

This repository is a **one-way publish mirror** of KickTech's private development repository — a published artifact, not a community development project. **Pull requests are disabled at the repository level** (the GitHub "Pull requests" tab is not visible). This is deliberate — see [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full reasoning (both structural and legal, tied to the [LICENSE](LICENSE) which does not permit modifications or new works based on the Software). Disabling PRs at the platform level spares well-meaning contributors the experience of writing a PR only to have it closed.

What **is** welcome and how to do it is documented in [`CONTRIBUTING.md`](CONTRIBUTING.md). Short version:

- 🐛 **Bug reports, feature suggestions, questions** — [open an issue](../../issues).
- 🔒 **Security vulnerabilities** — follow [`SECURITY.md`](SECURITY.md) for private disclosure.
- 🔍 **Source audits** — please, that's exactly why we publish. The LICENSE explicitly permits noncommercial study and audit.
- ⏩ **Partnership, Premium, KTOOR, commercial licensing** — [www.kicktech.io](https://www.kicktech.io).

## Security

If you discover a vulnerability, please **do not** open a public issue. See [SECURITY.md](SECURITY.md) for responsible-disclosure procedures.

---

© KickTech. All rights reserved beyond the source-available license terms.
