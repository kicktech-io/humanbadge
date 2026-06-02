# KickTech HumanBadge — Security Policy

This document is the responsible-disclosure policy for the KickTech HumanBadge extension and its Backend service at `verify.kicktech.io`. It explains how to privately report a security vulnerability, what to expect from us in return, and what is and is not in scope.

If you are unsure whether something is a vulnerability — report it anyway. We would rather triage a false positive than miss a real issue.

---

## 1. Reporting a security vulnerability

**Do not open a public GitHub issue for a suspected vulnerability.** Public exposure of an unpatched issue puts beta users at risk before we can ship a fix.

Use one of the following private channels (in order of preference):

1. **GitHub Security Advisories** — once this repository is public, the "Security → Report a vulnerability" tab provides a private channel hosted by GitHub. This is our preferred channel because it lets us triage, discuss, and coordinate disclosure in one place with clear audit trail.
2. **Email** — `security@kicktech.io`. Always available, including before the public-repo creation. If you prefer encrypted email, see §1.1.
3. **General contact** — if the above are not reachable, contact us through [www.kicktech.io](https://www.kicktech.io) and ask to be routed to the security team.

### 1.1 PGP-encrypted email (optional)

A PGP key for `security@kicktech.io` will be published here once it is in production use. Fingerprint: **TBD — to be added when the key is generated and signed**. Until then, please use the channels above; for highly sensitive reports you may also encrypt to a personal PGP key on request.

### 1.2 What to include in the report

Helpful (not all required, but the more we have, the faster we can act):

- **Affected component** — the extension, the Backend, a specific endpoint, or both.
- **Version or commit** — the published version you tested against (see `manifest.json` for the extension; the `verify.kicktech.io` Backend version is communicated in our release notes).
- **Steps to reproduce** — minimal reproduction, ideally with example inputs and expected vs observed behaviour.
- **Impact assessment** — what an attacker could achieve. Be honest about prerequisites and constraints (does this need a compromised machine? prior phishing? specific user actions?).
- **Suggested mitigation** — if you have ideas, share them; we will credit you for them where appropriate.
- **Your contact details** — so we can ask follow-up questions.
- **Disclosure preferences** — whether you wish to be credited publicly after disclosure, and under what name; whether you have a personal disclosure deadline in mind.

---

## 2. What we ask of you

To remain within our responsible-disclosure framework, please:

- **Do not access, modify, or delete data belonging to other users.** Test against your own accounts and data.
- **Do not run automated scans or load tests** against production infrastructure. Use a local clone of the Backend if you want to test endpoints under load.
- **Do not exfiltrate** more data than is strictly necessary to demonstrate the issue.
- **Do not disrupt the service** for other users — no volumetric DoS, no abuse of rate-limit thresholds beyond what is needed to demonstrate a flaw.
- **Give us reasonable time to remediate before public disclosure** — see §6 below for the default timing.

Researchers who operate in good faith within these constraints are protected by our safe-harbor commitment in §3.4.

---

## 3. Our commitments to you

### 3.1 Acknowledgement

We will acknowledge receipt of your report within **72 business hours**. If you do not hear back within that window, please use a different channel from §1 (e.g., resend by email if you reported via GitHub) — it usually means your initial message did not reach the right person.

### 3.2 Triage

We will provide an initial triage assessment within **7 days** of acknowledgement: whether we have confirmed the issue, the rough severity we assign to it, and the next steps. If we cannot reproduce, we will tell you what we tried and ask for more information.

### 3.3 Status updates

We will update you on remediation progress **at least every 30 days** until the issue is resolved or we mutually agree to close it.

### 3.4 Safe harbour for good-faith researchers

KickTech commits not to pursue legal action — civil or criminal — against researchers who operate in good faith within this policy. Specifically: if you follow §1 (private reporting), §2 (constraints on what to do), and §6 (disclosure timing), we will treat your research as authorised activity, even though our terms of service do not generally authorise unsolicited testing.

This safe harbour applies to researchers reporting in good faith. It does not protect:

- Actions outside the scope of §4 (e.g., attacks on third-party platforms HB connects to, or on KickTech staff).
- Actions inconsistent with §2 (e.g., accessing other users' data, running disruptive automated scans, or publishing before coordinated disclosure).
- Activity that would be unlawful regardless of authorisation (e.g., extortion, blackmail, theft of funds).

---

## 4. Scope

### 4.1 In scope

The following are valid targets for vulnerability research under this policy:

**HumanBadge extension** (this repository, source-available under [LICENSE](LICENSE)):

- Cryptographic bugs — KT-token derivation and rotation, HMAC computation and verification, hash function usage, randomness sources, key material handling.
- Privacy bypasses — any way for the extension to leak data inconsistent with the commitments in [PRIVACY.md](PRIVACY.md) (e.g., transmitting plaintext content, leaking handles outside the documented verify-HMAC flow, persisting data labelled as transient).
- Anti-spoof bypasses — any way to obtain a 👤 badge on content the legitimate publisher did not register, or to evade the warning badge in an unauthorized-copy scenario where the keyed-HMAC author check should have caught it (see PRIVACY.md §10.2).
- Local privilege issues — anything that elevates the extension's privileges beyond its declared manifest permissions, or that lets a malicious web page tamper with extension state.
- Supply-chain — concerns about packages declared in `package.json` or about the build pipeline in `scripts/`.

**HumanBadge Backend** (`verify.kicktech.io`):

- Authentication and authorization issues — including any bypass of rate-limiting that does not require volumetric load (i.e., logic bypasses, not flood attacks).
- Injection — SQL/NoSQL injection (we don't run a SQL DB, but any storage abstraction), command injection, header injection, server-side template injection, deserialization issues.
- Data exposure — IDOR (insecure direct object references), information leakage in error messages, exposure of HMAC keys, exposure of any data that should be in-memory only per PRIVACY.md.
- Cryptographic mishandling — verify-HMAC endpoint not honouring the in-memory-only commitment (e.g., logging candidate handles, persisting them, leaking via timing or error path).
- Misconfiguration — TLS issues, missing security headers, exposed admin endpoints.

### 4.2 Out of scope

Reports about the following are out of scope for this policy and we will close them without remediation:

- **Issues on third-party platforms** that HB merely observes — X / Twitter, LinkedIn, Facebook, Gmail, Telegram, WhatsApp, Messenger, etc. HB does not influence those platforms; please report to them.
- **Issues in the underlying public blockchain** (Base, Ethereum, Optimism) — these are out of our control and have their own security processes.
- **Vulnerabilities requiring already-compromised devices** — if the attacker has filesystem-level access to the user's browser profile, they already have full control; we don't claim to defend against this.
- **Self-XSS** — vulnerabilities that require the victim to manually paste attacker-controlled content into a sensitive context.
- **Social engineering** of KickTech staff, beta users, or anyone else.
- **Volumetric DoS** — rate-limiting is by design and runs at the network edge; volume floods are not vulnerabilities, they are noise.
- **Findings already published** — if the issue is already in a public CVE database, security advisory, or blog post, please tell us — we will check whether we have already remediated, but no new credit applies.
- **"Best-practice" recommendations without a demonstrable exploit** — e.g., "you should use HTTP header X" is feedback, not a vulnerability, unless you can show the absence of header X enables a concrete attack.
- **Theoretical cryptographic concerns** — e.g., "you use SHA-256 and someday quantum computers might…" are interesting research topics but not actionable vulnerabilities under this policy.

Out of scope does not mean "we don't care" — it means we will not run the responsible-disclosure timeline for it. You are welcome to mention these as suggestions; we may engage with them outside this policy.

---

## 5. Supported versions

| Version branch | Status |
|---|---|
| Latest published version of HB | ✅ supported for security fixes |
| Latest published version of HB Backend (`verify.kicktech.io`) | ✅ supported for security fixes |
| Any earlier beta version | ❌ not supported — please upgrade |
| Forks or modifications of HB | ❌ not supported — fix in your fork |

During the Phase 0 beta we maintain only the latest version. Once HB exits beta, this policy will be updated to commit to supporting at least the latest released version plus the previous version for an explicit transition window.

---

## 6. Coordinated disclosure timing

Our default coordinated-disclosure window is **90 days from acknowledgement** of the report. Within that window we commit to:

- Triage and prioritise the issue.
- Develop, test, and release a fix.
- Coordinate with you on public-disclosure wording and timing.

The window may be **extended** by mutual agreement for complex issues (e.g., where a fix requires coordinated changes across the extension, the Backend, and a sub-processor) — but never silently. If we need more time, we will tell you why and propose a new date.

The window may be **shortened** if:

- We learn the issue is actively exploited in the wild;
- The fix is straightforward and we can ship it within days.

After the disclosure window, you are free to publish your findings. We ask only that you give us a final opportunity to coordinate the public messaging so users get the patched version before exploit details circulate.

### 6.1 Out-of-band escalation

If you do not receive an acknowledgement within 7 days of your initial report — across at least two of the channels in §1 — you may consider your responsible-disclosure obligations under this policy met. Please use this clause only as a last resort; we maintain the channels in §1 specifically to avoid it.

---

## 7. Recognition

During the Phase 0 beta we do not operate a monetary bug-bounty program. We do offer:

- **Credit** — with your consent, your name (or chosen alias) is recorded in the changelog of this document under §9, and mentioned in the release notes of the version that fixes the issue.
- **Acknowledgement** — a private thank-you message and, where appropriate, the opportunity to review the public disclosure wording before it is published.

We may introduce a formal bug-bounty program after Phase 0; this section will be updated if and when that happens.

---

## 8. Out of scope is not "we don't care"

We recognize that security research effort spent on out-of-scope items is still effort. If you find something that does not strictly meet the §4.1 criteria but you believe is worth our attention, mention it briefly in your report or via the channels in §1. We will engage with it outside this policy as time permits, and we will be honest about what we can and cannot promise.

---

## 9. Document history

| Version | Date | Change |
|---|---|---|
| 1.0 | 2 June 2026 | Initial version of this Security Policy. |

---

© KickTech. This Security Policy is licensed for transparency reference under the same terms as the Software (see [LICENSE](LICENSE)). Operational commitments in this document apply to the KickTech HumanBadge extension and the `verify.kicktech.io` Backend as published at the time of disclosure.
