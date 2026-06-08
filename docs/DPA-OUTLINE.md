# KickTech — Data Processing Agreement (DPA) Outline

**Version:** 0.1 (OUTLINE — not a template)
**Audience:** Legal counsel; future KTOR Premium / KTOOR customer engagements

> **OUTLINE FOR LEGAL COUNSEL**
> This document is engineering scaffolding — it lists the sections a full DPA must contain when KickTech enters its first contractual relationship as a *data processor*. It is intentionally NOT a finished template. The expansion into a full template should be done at the point of the first KTOR Premium or KTOOR customer engagement, against the specific commercial relationship.
>
> **Scope of this document (Context A — KickTech as processor):** KickTech processes data on behalf of an institutional customer; the customer is the controller; this is the DPA KickTech offers to that customer.
>
> **NOT the scope of this document (Context B — KickTech as controller, using its own sub-processors):** KickTech itself processes minimal data for HumanBadge as controller and uses sub-processors like Vercel, Cloudflare, and Upstash to do so. The DPAs with those sub-processors are vendor-standard contracts that KickTech signs; their operational register is at [`SUB-PROCESSORS.md`](SUB-PROCESSORS.md). Do not conflate the two contexts.

---

## Why an outline, not a full template, at this stage

- **HB beta launch does not require a DPA between KickTech and end-users.** During HB beta, KickTech acts as the *data controller* for the minimal data described in `PRIVACY.md`. End-users are data subjects, not controllers; no controller-processor relationship exists.
- **A DPA becomes necessary when KickTech acts as a processor** on behalf of an institutional customer — e.g., a Premium client whose institutional registrations are made on their behalf, with the institutional customer as controller and KickTech as processor.
- **Drafting a full template before the first Premium contract** risks generic clauses that don't match the specific commercial relationship, and gives the false impression that the agreement is fixed. Better to expand at the moment of engagement, when the actual data flows and customer obligations are known.

---

## Sections a full DPA must contain (per GDPR Article 28)

### 1. Parties

- **Controller** — the institutional customer (e.g., a bank, a public agency, a news organization).
- **Processor** — KickTech (FAPL Sp. z o.o.).

### 2. Subject matter, duration, nature and purpose of processing

- Reference: the KTOR Premium / KTOOR service description and the master service agreement.
- Duration: term of the underlying service agreement.

### 3. Categories of personal data and data subjects

- Specified in **Annex I** per relationship.
- For HB-derived flows, categories are minimal (hashes, publishing-channel identifiers); for Premium flows, may include institutional editorial-system metadata depending on the integration.

### 4. Obligations of the Processor (GDPR Art. 28(3))

- Process only on documented instructions from the Controller.
- Ensure confidentiality of authorized personnel.
- Implement Article 32 security measures (see **Annex II**).
- Engage sub-processors only with prior specific or general written authorization.
- Assist the Controller with Articles 32–36 obligations.
- Assist the Controller with data-subject requests (Chapter III).
- At the choice of the Controller, delete or return all personal data at the end of service, except where retention is required by law.
- Make available all information necessary to demonstrate compliance and allow audits.

### 5. Sub-processors

- Authorized initial list: Vercel, Cloudflare, Upstash, Base / Coinbase Technologies (public blockchain) — see `PRIVACY.md` §5.
- Change procedure: 30-day prior written notice of intended changes; Controller's right to object.
- Liability flow-through: Processor remains responsible for sub-processor compliance.

### 6. International transfers

- Standard Contractual Clauses (Commission Decision 2021/914) where personal data is transferred outside the EEA without an adequacy decision.
- EU-US Data Privacy Framework certification where applicable.
- Supplementary measures as described in `PRIVACY.md` §6.

### 7. Security measures (Annex II)

- **Technical**: encryption in transit (TLS); encryption at rest for the author-handle HMAC keys (`K`, AES-256-GCM, under a key held separately from the key store); architectural data minimization (zero-IP at application level — independently verifiable from the published HumanBadge extension artifact and the public audit references); hashing before transmission; sliding 30-day retention with auto-deletion for `K`; access controls.
- **Organizational**: documented access policies; periodic access reviews; security training for personnel with system access; incident-response procedures.
- Cross-reference: `PRIVACY.md` §11.

### 8. Breach notification

- Processor notifies Controller without undue delay (target: within 24 hours of becoming aware) of a personal-data breach affecting Controller's data.
- Information provided to Controller: nature of breach; categories and approximate numbers of data subjects affected; likely consequences; measures taken or proposed.
- Cross-reference: `PRIVACY.md` §12.

### 9. Data-subject rights assistance

- Processor assists Controller in responding to data-subject requests within GDPR timelines, including providing access to relevant systems and data on reasonable notice.

### 10. Audit and inspection

- Annual audit right with reasonable prior notice (typically 30 days), conducted during business hours, subject to confidentiality protections.
- Third-party certifications (ISO 27001, SOC 2 Type II) accepted as alternative evidence where available.

### 11. Termination and data return/deletion

- End-of-service procedures: return or deletion of Controller data within 30 days of termination.
- **On-chain data caveat**: registrations written to the public blockchain cannot be deleted by either party. This limitation must be disclosed to Controller before service commencement and acknowledged in the agreement. Cross-reference: `PRIVACY.md` §8.

### 12. Governing law

- Aligned with the master service agreement; for Polish entity, default to Polish law and jurisdiction unless otherwise agreed.

---

## Annexes (to be drafted at engagement)

- **Annex I** — description of processing: parties, data categories, data subjects, processing purposes, retention.
- **Annex II** — technical and organizational security measures.
- **Annex III** — list of approved sub-processors at signing.
- **Annex IV** — Standard Contractual Clauses / international-transfer mechanism (where applicable).

---

## Notes for counsel when expanding this outline

Align the full DPA with:

- **GDPR** Articles 24–28, 32–36.
- **Standard Contractual Clauses** — Commission Implementing Decision (EU) 2021/914 of 4 June 2021.
- **EDPB guidelines** on Article 28 (Guidelines 07/2020 on the concepts of controller and processor under the GDPR).
- **Sector-specific requirements** as applicable (e.g., supervisory expectations of banking regulators for institutional Premium customers in financial services; rules for public-administration customers).
- **`PRIVACY.md`** — for the description of architectural measures (zero-IP, hashing) that are already in place and constitute baseline `Annex II` content.

---

© KickTech. Outline document — to be expanded into a full Data Processing Agreement at the first Premium / KTOOR engagement, against the specific commercial relationship.
