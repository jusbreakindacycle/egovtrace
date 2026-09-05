# PHILOS — STAGE 5: ENTERPRISE ARCHITECTURE

## Attachment Review Confirmation

Two inputs were reviewed in full before any design work began:

1. **Stage 4 Program Blueprint & Scope Freeze** (uploaded file, 209 lines) — all 10 Deliverables read: Mission/Non-Mission, Final Scope Matrix, Frozen Governance Decisions Register (10 decisions), Preconditions Baseline Register (5 preconditions), Capability Development Baseline, Architecture Constraints Register (10 constraints), Success/Failure Framework, Approved Implementation Sequence, Consolidated Blueprint, Final Decision.
2. **Stage 5 instructions** (this conversation's task brief).

No attachment was left unreviewed. No content below contradicts, narrows, or reinterprets a Frozen Decision or Architecture Constraint — each design choice below is traced back to the specific Stage 4 item it implements.

---

## A. Architecture Validation Review

**Status carried forward from Stage 4, unchanged:** all five Preconditions remain at design stage; none has entered execution. This means Enterprise Architecture is being designed for an entity that does not yet have statutory existence. That single fact drives most of the architecture below.

**Unresolved risks identified before design proceeds:**

| Risk | Why it survives into Stage 5 | Architectural response required |
|---|---|---|
| "Identifier reconciliation complete" has no acceptance criteria | Frozen Decision #6 / Constraint #6 make this a hard go/no-go gate, but Stage 4 never defines "complete" | Architecture must define a measurable completion criterion (Section E) |
| "Custodianship, not ownership" is currently a policy statement, not an enforced technical control | Constraint #1 will fail in practice if the Delivery Authority's platform can technically write to or hold a canonical copy of agency data | Architecture must make custodianship a structural property of the data plane, not a governance promise (Section C) |
| Vendor-neutrality (Constraint #5) is easy to violate invisibly through a single proprietary crypto/credential standard | No named vendor, but a *standard* can still create lock-in | Technology Architecture must specify open, multiply-implemented standards only (Section G) |
| No statute has passed (Constraint #10), but most named governance bodies (Security Risk Committee, Data Stewardship Committee, oversight board) require *some* legal seat to issue binding instructions | Architecture cannot assume these bodies have enforcement power they don't yet have | Architecture must route enforcement through existing MOU/administrative authority, not assumed future statute (Section H) |
| LGU participation is opt-in only (Constraint #7) | A platform default that quietly assumes universal onboarding (e.g., a single shared schema with no fallback) would violate this | Business Registration Services architecture must support partial, asymmetric LGU coverage indefinitely (Sections D, E) |

No contradiction was found between the Stage 4 Blueprint and the Stage 5 brief's Phase 1 scope (Digital Trust Infrastructure, National Data Exchange, Business Registration Services, Procurement Transparency Platform) — this matches the Final Scope Matrix exactly. The deferred list (Audit Platform, Anomaly Detection, Economic Intelligence, Citizen Experience/super-app) also matches the Future Phase Candidate / Permanently Excluded lists. Verdict: **no scope conflict; proceed.**

---

## B. Business Architecture

| Capability | Owner | Key Stakeholders | Inputs | Outputs | Dependencies |
|---|---|---|---|---|---|
| Digital Trust Infrastructure | Delivery Authority (technical platform only — decision rights per Frozen Decision #4) | DICT (policy), PhilSys Registry, Security Risk Committee | PhilSys identity records, agency credential requests | Verified identity assertions, agency/staff credentials | None upstream; everything else depends on it |
| National Data Exchange (3–5 agency pilot) | Delivery Authority (technical platform); Data Owners retain statutory authority | BIR, BOC, pilot LGUs, Data Stewardship Committee | Agency-held source data (never copied centrally) | Brokered query responses, audit-logged transactions | Digital Trust Infrastructure; identifier reconciliation (gate) |
| Business Registration Services | Delivery Authority (platform); LGUs (process authority retained) | DTI, LGUs, League of Cities/Municipalities | Applicant data, LGU permitting rules | Registration records, status to applicant and LGU | Digital Trust Infrastructure; partial NDE for once-only lookups |
| Procurement Transparency Platform | Delivery Authority (platform); procuring entities retain authority | GPPB, COA, procuring agencies, Ombudsman (pilot MOU) | Bid/award data from procuring entities | Public transparency views; non-automated flags for human review | Digital Trust Infrastructure; no dependency on NDE for MVP |
| Data Stewardship (governance capability, not Phase 1 product) | Data Stewardship Committee, technically supported by Delivery Authority | All Data Owner agencies | Disputed-field cases, custodian-model exceptions | Stewardship rulings, default-to-exclusion actions | Runs alongside NDE from Phase 0 |
| Independent Security Gate (governance capability) | Security Risk Committee, reporting around the Program Executive | Security Risk Committee, independent auditors | Architecture and code under review | Go/no-go sign-off | Mandatory before any production go-live |

Service and governance boundaries follow Frozen Decision #4 exactly: the Delivery Authority's decision rights stop at the two infrastructure components plus the *technical platform underlying* Business Registration and Procurement Transparency — it has no policy authority over LGU permitting rules, BIR/BOC statutory data, or COA findings.

---

## C. Information Architecture

**Authoritative sources (no architecture component is permitted to become a competing source of truth):**
- Identity: PhilSys Registry (PSA)
- Tax/Customs: BIR, BOC systems of record
- Business registration: DTI / SEC / LGU permitting systems, per registration type
- Procurement: individual procuring entities' existing bid/award records
- LGU permits: each LGU's own permitting system

**Custodian model — made structural, not just promised:**
- The National Data Exchange is architected as a **broker/gateway with no canonical data store**. It resolves a query at request time, retrieves from the Data Owner's system, logs the transaction, and returns the result. It does not persist a queryable copy beyond a short-lived cache governed by a expiry policy set by the Data Owner.
- Any field a Data Owner disputes is **excluded from the exchange by default** (per Frozen Decision #2) — the architecture implements this as a per-field allowlist maintained by the Data Stewardship Committee, not a blocklist, so an unresolved dispute fails safe.
- Data domains are scoped to the agency that legally holds them; the Delivery Authority's metadata layer stores only *schema and access-policy metadata*, never the underlying records.

**Metadata strategy:** a shared data dictionary (field names, formats, legal basis citation, custodian contact) maintained centrally for discoverability, but every entry points back to the owning agency's system — this is metadata-about-data, not data.

**Data lifecycle:** collect (at Data Owner) → register in catalog (metadata only) → broker on request (NDE) → log (immutable, COA-visible) → expire cache → no central retention beyond audit logs.

---

## D. Application Architecture

**Platform domains (architecture-level only — no code, frameworks, or vendors named):**

- **Digital Trust Infrastructure domain:** identity verification service, credential issuance/management for agency users, authentication broker (issues short-lived tokens, not raw identity data).
- **National Data Exchange domain:** query broker/gateway, agency adapter layer (one adapter per participating agency, isolating their internal systems from the shared layer), transaction logging service.
- **Business Registration Services domain:** application intake, workflow/status engine, once-only lookup connector (queries NDE for previously-submitted data instead of re-asking applicants), LGU adapter layer (supports partial/asymmetric LGU onboarding).
- **Procurement Transparency Platform domain:** bid/award data intake, public transparency view, non-automated flagging engine (produces a flag for human reviewer queue only — no downstream automated action).

**Shared services used across all four:** authentication broker, API gateway, consent/authorization service (purpose-limited per MOU scope), immutable audit-logging service (architecturally separable — see Security Architecture), notification service.

**Interoperability layer:** a single shared data-exchange layer (NDE) that Business Registration and Procurement Transparency consume as clients rather than each building their own integration logic — this avoids duplicating brokering logic per platform.

---

## E. Integration Architecture

**National Data Exchange pattern:** federated query-broker (X-Road-style "ask, don't store") — each agency keeps its data; the exchange layer authenticates the request, checks the Stewardship Committee's allowlist, retrieves at request time, and logs the transaction. This is the only pattern compatible with Frozen Decision #2 (no ownership transfer).

**API governance model:** every agency-facing API is registered in a central registry maintained by the Delivery Authority's *technical* role; each contract is reviewed by the Architecture Review Board for standards compliance, but the data-sharing terms themselves are set by the Data Owner and Stewardship Committee, not unilaterally by the Delivery Authority.

**Event governance:** kept deliberately minimal in Phase 1 — asynchronous events are limited to status notifications (e.g., "registration approved") rather than data-replication events, to avoid accidentally creating a shadow copy of agency data through an event stream.

**Identifier reconciliation:** implemented as a per-agency-pair crosswalk table, not a forced migration to a single master identifier beyond PhilSys. **Completion criterion (the missing definition flagged in Section A):** reconciliation is "complete" for a pilot agency only when (1) ≥95% of active records have a verified PhilSys-linked identifier or a documented exception path, and (2) the crosswalk has passed an independent data-quality audit. This becomes the literal go/no-go gate referenced in Stage 4's Phase 1 sequencing.

**Agency autonomy:** each agency's adapter is built and operated with the agency, not imposed on it — the adapter exposes only the fields the agency has allowlisted, preserving statutory data authority.

**LGU participation:** architected as opt-in, asymmetric, and indefinitely partial. There is no "final" LGU onboarding state assumed anywhere in the design — the adapter layer is built to support a rolling, uneven set of participating LGUs without redesign, consistent with Constraint #7.

---

## F. Security Architecture

**Zero Trust principles:** no implicit trust between agency systems or between Delivery Authority components; every request is authenticated and authorized independently of network location.

- **Identity security:** PhilSys-anchored identity for citizens/businesses; a separate, MFA-backed credentialing system for agency staff and LGU staff.
- **Access control:** attribute-based access control scoped per data domain and per MOU purpose — a credential valid for Business Registration lookups cannot be reused for Procurement data by architecture, not just by policy.
- **Security governance:** the Security Risk Committee's sign-off authority is wired into the deployment pipeline as a literal gate — production deployment of the National Data Exchange is technically blocked pending a recorded sign-off, implementing Frozen Decision #3's "bypasses the Program Executive" requirement as an access-control fact, not a process note.
- **Audit logging:** a separate, append-only logging service with its own administrative control plane, accessible to COA's independent audit layer by read-only interface — the Delivery Authority cannot alter or delete log entries. This is the technical implementation of Frozen Decision #1 and Constraint #3 (audit systems not dependent on delivery-team integrity).
- **Incident management / SecOps:** a defined incident-response path that escalates to the Security Risk Committee directly, mirroring the sign-off escalation path, addressing Stage 2's flagged pilot-risk findings around breach exposure across previously siloed agencies.

---

## G. Technology Architecture

- **Hosting principles:** hybrid by design — government data center capacity and commercial cloud are both permitted options per workload, with no architectural assumption that cloud-only is achievable or desirable (per Constraint #10's "do not assume legislation has passed" and the brief's explicit "do not assume cloud-only").
- **Infrastructure principles:** loosely-coupled, adapter-based services so that any single agency's hosting choice doesn't dictate the exchange's architecture; open, multiply-implemented standards only (e.g., standard credential and signing formats with more than one available implementation) to satisfy vendor-neutrality (Constraint #5) at the standards level, not just the procurement level.
- **Resilience/scalability:** multi-site resilience for the Digital Trust Infrastructure and NDE broker (single points of failure here block everything downstream); Business Registration and Procurement Transparency can tolerate higher latency and a simpler resilience tier given lower criticality.
- **Disaster recovery:** defined recovery time/point objectives per domain, with the audit-logging service held to the strictest DR tier since its records are the evidentiary backbone for COA.

---

## H. Transition Architecture

| Phase | Architecture maturity | Interim-authority handling |
|---|---|---|
| **Phase 0 (Yr 1)** | Design only — reference architecture and data standards piloted on paper/sandbox; no production build (matches Stage 4 Deliverable 9) | Runs entirely under existing executive authority; nothing requires the Charter Act |
| **Phase 1 (Yrs 1–2)** | Still no production technical build; identifier reconciliation and custodian-model activation completed and gate-checked | Governance processes formalized but still administrative, not statutory |
| **Phase 2 (Yrs 2–3)** | Production build and pilot of Digital Trust Infrastructure and NDE (3–5 agencies), gated on independent security audit; Business Registration and Procurement Transparency piloted | Operates under interim Program Executive / MOUs; architecture is written so it converts to statutory operation without redesign once the Charter Act passes |
| **Phase 3 (Yrs 3–5)** | Controlled expansion beyond pilot agencies/LGUs, contingent on pilot success metrics | Interim structures transition into statutory form as the Charter Act takes effect — the architecture's adapter-based, federated design means this is a governance conversion, not a re-platforming |

**Post-charter conversion path:** because no component assumes statutory authority to function (consistent with Constraint #10), the only changes required once the Charter Act passes are *governance* changes — who can issue binding instructions through the same technical sign-off gates that already exist. No data model, API, or integration pattern needs to change.

---

## I. Architecture Governance

- **Architecture Review Board (ARB):** reviews every agency adapter and API contract for standards compliance and Constraint adherence before it is allowed into the registry; cannot itself approve a Constraint exception (see below).
- **Change control:** any change to a shared schema, the identifier-reconciliation criterion, or the security gate requires ARB review plus the Security Risk Committee where security-relevant.
- **Exception process:** any proposed exception to a Frozen Decision or Architecture Constraint must be escalated to the Stage 4 board itself — the ARB has no authority to waive these, matching the Stage 4 instruction that "any future stage that finds reason to revisit a Frozen Decision or Architecture Constraint must do so explicitly and through this board."
- **Risk escalation:** mirrors the security sign-off path — escalation routes around the Program Executive for security and audit-related risks, preserving Frozen Decisions #1 and #3.

---

## J. Red-Team Review

Acting as hostile auditors, cybersecurity reviewers, public finance reviewers, and political-economy reviewers, the following weaknesses were identified in the first-pass design above:

1. **"Custodianship" was a promise, not a control, in the first draft.** A broker architecture that *could* cache indefinitely or log full record contents (not just transaction metadata) would functionally recreate centralized ownership. *Fix applied above:* short-lived cache expiry and transaction-only logging (Section C) — this is now reflected in the design as written, not added after the fact.
2. **Identifier reconciliation had no finish line**, which a future administration under budget pressure could exploit to declare "good enough" prematurely and force a go-live. *Fix applied above:* the 95%-plus-audited-exception criterion (Section E) gives COA and the Stewardship Committee something concrete to hold the program to.
3. **A single proprietary credential standard could quietly violate vendor-neutrality** even with no vendor named in the architecture document itself, simply by virtue of being patumented or single-source. *Fix applied above:* the explicit "open, multiply-implemented standards only" rule (Section G).
4. **The non-automated-consequence flag in Procurement Transparency is a thin line** — a human reviewer queue that always rubber-stamps the system's flag is automation in practice. This is a residual risk the architecture cannot fully close technically; it requires the Stewardship/oversight bodies to monitor reviewer override rates as an operational metric, not an architectural one. Flagged here as an **open risk carried into Stage 6**, not resolved.
5. **Administration-transition risk:** because Phase 2–3 still runs on MOUs and interim authority, a new administration could defund or redirect the program without touching any statute. The architecture cannot solve this — but the adapter-based, no-central-copy design at least means a defunded program leaves agencies' own systems untouched, which is the architecturally achievable floor.
6. **COA read-only audit access depends on COA actually being resourced to use it.** The architecture provides the access; it cannot provide COA's staffing capacity. This is a known limitation inherited from Stage 0's findings on prosecutorial/audit bottlenecks, not a flaw the architecture introduces.

---

## Revised Enterprise Architecture (Summary of Changes)

The sections above (B–I) already incorporate the red-team fixes for items 1–3 directly into the design rather than as an addendum, per the brief's instruction to revise the architecture, not just list findings. Items 4–6 are **not architecturally closeable** and are carried forward explicitly as open risks for governance attention in Stage 6, rather than papered over.

---

## Architecture Readiness Assessment

| Dimension | Status |
|---|---|
| Alignment with Stage 4 Frozen Decisions (all 10) | Implemented structurally, not just referenced |
| Alignment with Architecture Constraints (all 10) | Implemented; Constraint #6 (no automated-consequence anomaly logic) — fully respected, no anomaly detection architected at all, only flagging |
| Identifier reconciliation gate | Now has a measurable completion criterion |
| Vendor neutrality | Enforced at the standards layer, not just procurement layer |
| Statutory-independence (no legislation assumed) | Confirmed throughout; conversion path defined |
| Residual risks requiring governance (not architecture) attention | 3 identified (reviewer rubber-stamping, administration-transition resilience, COA capacity) |

---

## Final Verdict

**ARCHITECTURE APPROVED WITH CONDITIONS**

**Justification:** The architecture is internally consistent with every Frozen Decision and Architecture Constraint in the Stage 4 Blueprint, does not architect any deferred or excluded component, and survives its own red-team review without requiring a single Frozen Decision to be reinterpreted. It does not assume statutory passage, cloud-only hosting, universal LGU participation, or vendor lock-in. It closes the one constraint that was previously enforced only by policy (data custodianship) at the structural level.

**Conditions to be completed before Stage 6:**
1. Ratify the identifier-reconciliation completion criterion (95% verified-linkage threshold plus audited exceptions) with the Data Stewardship Committee — it is proposed here, not yet adopted by that body.
2. Define and fund the operational monitoring metric for non-automated-consequence flag override rates in Procurement Transparency, so the "human decision" line does not erode silently in practice.
3. Confirm COA's resourcing plan to actually exercise its read-only audit-log access — an unused access right is not a functioning control.
4. Carry the administration-transition risk (Phase 2–3 operating on MOUs, not statute) forward explicitly into Stage 6 as a program-continuity risk, not an architecture risk, since architecture has no further lever to pull on it.
