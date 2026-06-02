# Contributing to KickTech HumanBadge

KickTech HumanBadge is a **published source-available product**, not a community development project. This document explains how to interact with the repository as a user, researcher, or auditor — and why the model differs from typical open-source projects.

## TL;DR

| What | Status |
|---|---|
| Reading the source, auditing, learning from it | ✅ Encouraged — that's why we publish |
| Installing for your own beta use | ✅ Encouraged (see [README](README.md)) |
| Reporting bugs | ✅ Open an issue |
| Reporting security vulnerabilities | ✅ Follow [SECURITY.md](SECURITY.md) — private disclosure |
| Suggesting features | ✅ Open an issue tagged "enhancement" |
| Asking questions | ✅ Open an issue |
| **Pull requests** | ❌ **Disabled on this repository** (PR tab not visible — see below) |
| Forking and modifying for redistribution | ❌ Not permitted under the [LICENSE](LICENSE) |
| Commercial use, partnerships, integration | ⏩ Contact [www.kicktech.io](https://www.kicktech.io) |

## Why no pull requests?

**Pull requests are disabled at the repository level via GitHub's "Pull requests" feature toggle** (Settings → General → Features). The Pull requests tab is not visible on this repository, and the platform does not allow opening a PR here. This is by design — and it's a friendlier design for everyone:

- **You are spared** the experience of writing a thoughtful PR only to have it closed with a "no thanks" message.
- **We are spared** the moderation overhead of repeatedly explaining the model.
- **The contribution intent** is redirected up front to the channel that actually works: the issue tracker.

We chose to disable PRs at the platform level (rather than leaving them open and rejecting them case by case) for two underlying reasons.

### Structural

This repository is a **one-way published mirror** of the build artifact produced from KickTech's private development repository. Source development happens internally, on internal review processes. Releases land here as single clean commits via an automated publish workflow. There is no "merge from contributor" path in this model.

### Legal

The Software is licensed under the **PolyForm Strict License 1.0.0**, which explicitly **does not permit making changes or new works based on the Software** (see the `Copyright License` section in [LICENSE](LICENSE)). When you interact with this repository, you accept those terms.

A pull request is, by definition, a proposed modification by a contributor. Even if a contributor opened one, they would have made a change/new work — putting them in conflict with the license they accepted by using the repository. The clean way out — used by many community projects — is a **Contributor License Agreement (CLA)** where contributors assign or sub-license their work to the project owner. We have **deliberately chosen not to build this path** for KickTech HumanBadge, because the moat of HB depends on a single, authoritative, KickTech-controlled artifact (see *Why this model?* below).

Together, the GitHub PR-tab being disabled + the legal framework express the same intent from two angles: this is a published artifact, not a community-development repository.

## What you CAN do

### 🐛 Report a bug

Open an issue. Include:

- Browser + version (Chrome 130, Edge 128, Opera 115, …)
- HumanBadge extension version (from `chrome://extensions` → details)
- Operating system
- Steps to reproduce
- Expected behaviour vs. actual behaviour
- Console output if relevant (please redact any personal content)

### 🔒 Report a security vulnerability

**Do NOT open a public issue for security vulnerabilities.** Use the private disclosure procedure described in [SECURITY.md](SECURITY.md). Public disclosure of unpatched issues puts users at risk; we ask responsible-disclosure timing in return for prompt acknowledgement and remediation.

### 💡 Suggest a feature

Open an issue and describe:

- The problem you're trying to solve as a user
- How you'd expect HumanBadge to address it
- Whether the suggestion is already covered by the roadmap in [`docs/INSTRUCTION.md` §11](docs/INSTRUCTION.md)

We review feature suggestions periodically. We cannot commit to any specific suggestion making it into the product, and reserve the right to reject suggestions that conflict with the product's design principles (zero-PII, proof-of-action scope, popular-tier positioning — see [`docs/INSTRUCTION.md` §9](docs/INSTRUCTION.md)).

### ❓ Ask a question

Open an issue using a "question" label. We try to respond within a reasonable time during beta. Common questions are folded back into [`docs/INSTRUCTION.md`](docs/INSTRUCTION.md).

### 🔍 Audit the source

**Yes — please.** This is precisely why the source is published. Security researchers, privacy auditors, and curious developers are explicitly invited to verify our claims about how HumanBadge works, including:

- The privacy claims in [PRIVACY.md](PRIVACY.md) — the "what does NOT leave your browser" list is verifiable in the source.
- The architectural claim of zero-IP at the application level — verifiable in the Backend code.
- The proof-of-action mechanism described in [`docs/INSTRUCTION.md` §2](docs/INSTRUCTION.md).

If your audit yields findings, you can:

- Open an issue (for non-security findings).
- Follow [SECURITY.md](SECURITY.md) (for security findings).
- Publish your audit independently — the LICENSE explicitly permits noncommercial study and audit, and we welcome public scrutiny.

## Forking — important nuance

GitHub allows anyone to fork a public repository at the platform level. A GitHub fork is a copy on GitHub; what you can **do** with that fork is governed by the [LICENSE](LICENSE), not by the fork action itself.

Under PolyForm Strict 1.0.0, in your fork you **may**:

- Read, study, and audit the code.
- Install it for your own personal noncommercial use.

In your fork you **may not**:

- Distribute the fork to others.
- Modify the fork and publish modifications.
- Use the fork — or any version — for commercial purposes.

The legal effect of the LICENSE follows the code wherever it goes; forking does not remove or relax these restrictions.

If you want rights beyond the LICENSE — commercial use, integration, derivative-work licensing, or use of any KickTech trademark — contact [www.kicktech.io](https://www.kicktech.io) for separate licensing arrangements.

## Why this model?

KickTech HumanBadge is a security and authentication product. The value of HumanBadge depends on it being a **single, authoritative, KickTech-controlled artifact**:

- **Predictability for users** — anyone who installs HumanBadge knows the binary came from KickTech. There is no "KickTech HumanBadge Community Edition" or unofficial fork that might subtly behave differently.
- **Security posture** — a single trusted source for the authentication code reduces the attack surface compared to a forkable, community-developable artifact where malicious forks could impersonate the official product.
- **Service coherence** — HumanBadge interacts with KickTech's gateway and registry. Supporting unofficial forks would mean supporting unauthorized clients of our infrastructure, which we explicitly do not do (see [LICENSE](LICENSE), Supplementary Notice 3).

This model is different from typical open-source, where distributed development and community forks are part of the value proposition. KickTech HumanBadge's value proposition is the opposite: trust derives from there being **one canonical thing**.

## Contact

For partnership and commercial-licensing inquiries — including KTOR Premium, KTOOR participation, integration agreements, and commercial use beyond the scope of the LICENSE — contact us via [www.kicktech.io](https://www.kicktech.io).

For everything else (bugs, suggestions, audit findings, questions): **the issue tracker is the right place**.

Thanks for reading, and welcome to the HumanBadge beta.
