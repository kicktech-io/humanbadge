# Audit references — public reference snapshots of backend code

This directory contains **selected backend source files** published as **manually-maintained audit references** for the privacy and security claims in [`PRIVACY.md`](../PRIVACY.md) and [`SECURITY.md`](../SECURITY.md).

These files are **not** part of the extension build artifact (`../dist/`). They are reference material that allows independent auditors to verify the cryptographic primitives KickTech describes in the documentation.

---

## What is here

Currently:

```
audit-references/
├── README.md                        (this file)
└── backend/
    └── hmac.ts                      Keyed-HMAC author marker (Path C, GDPR Art. 17)
```

### `backend/hmac.ts`

The cryptographic core of the keyed-HMAC author-marker mechanism described in [PRIVACY.md §10.2](../PRIVACY.md). Implements:

- Per-registration key generation (`crypto.randomBytes(32)`) — DG1.
- HMAC-SHA256 computation over a normalized handle — single crypto point.
- Constant-time verification (`crypto.timingSafeEqual`) — DG5.
- Cryptographic erasure (key deletion → marker becomes irreversible) — Art. 17.

The inline design notes (DG1/DG2/DG5) document the rationale for the architectural choices.

---

## Scope of publication

| Aspect | Status |
|---|---|
| Cryptographic primitives for §10.2 mechanism | ✅ Published here |
| Full Backend application source | ❌ Not published (private dev repo) |
| Vercel Firewall configuration (zero-IP-at-edge claim per §3.1) | ❌ Not published; reviewable under NDA |
| Backend deployment / infra-as-code | ❌ Not published |

The full Backend code can be reviewed by **qualified third-party auditors under NDA**. To arrange such a review, contact the channels documented in [SECURITY.md §1](../SECURITY.md).

---

## Maintenance model

Unlike the extension artifact in [`../dist/`](../dist/), the files in this directory are **manually synced** to this public mirror after material changes to the corresponding internal code:

- Updates land in this repository as separate commits when the published reference no longer reflects the deployed mechanism.
- Each release of the extension that touches the §10.2 mechanism will be accompanied by a refresh of the relevant audit reference here.
- Between such refreshes, the HEAD of this directory reflects a **snapshot** of the published mechanism as of the most recent extension release.

A future audit-references update may include additional reference files (e.g., rate-limit middleware, registry write path) as the privacy and security narrative is extended.

---

## What you can do with this code

The audit-reference code is licensed under the same terms as the rest of this repository (see [`../LICENSE`](../LICENSE)): PolyForm Strict 1.0.0, with KickTech supplementary notices.

In short: read, study, and audit. Do not redistribute, fork-for-commercial-use, or build derivative works outside the official KickTech channel. For licensing arrangements beyond these terms, contact [www.kicktech.io](https://www.kicktech.io).

---

## Reporting issues with audit references

If you find:

- A discrepancy between this reference and the deployed Backend behavior;
- A cryptographic concern in the published code;
- A documentation inconsistency between this reference and [`PRIVACY.md`](../PRIVACY.md) / [`SECURITY.md`](../SECURITY.md);

please report via the channels in [SECURITY.md §1](../SECURITY.md). Discrepancies between published references and deployed behavior are explicitly in-scope under SECURITY.md §4.1.
