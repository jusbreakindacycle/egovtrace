# Philippine State Control & Assurance Universe — v2

**Status:** Research / Architecture Discovery — not a product specification

**Consolidates:** `Philippine_Government_Digital_Ecosystem_AIEIP_Handoff.md`, `Philippine_Government_Digital_Ecosystem_Gap_Map.md`, `Philippine_Government_Gap_Analysis.pdf` (Comprehensive Systems Audit and Strategic Framework), and `Philippine_Government_Digital_Ecosystem_Cont.md`
**As of:** August 30, 2026

> This document does not choose a final name, does not choose "platform" as a final category, and does not produce a product specification. It exists to give the four prior research passes one index and one outline, using the same evidence discipline they used: **CONFIRMED** (documented by a primary/official source) · **PARTIAL/PILOT** · **PLANNED** · **PROPOSED** · **INFERRED** · **UNCERTAIN** (flagged rather than guessed).

---

## 0. How this document was assembled

Four prior passes built on each other:

1. **Handoff** — the original hypothesis: the Philippine government is not short of digital projects, it is short of a cross-system *reasoning* capability. Explicitly falsifiable. Explicitly not a name, not a platform, not a database choice.
2. **Gap Map** — stress-tested that hypothesis against two live 2025–2026 events (the DPWH flood-control scandal, the April 2026 DICT cloud outage). Narrowed the answer to a thin, read-mostly, provenance-strict layer that *feeds* existing oversight bodies — never replaces them.
3. **Comprehensive Systems Audit (PDF)** — re-verified the statutory foundation underneath that answer (RA 12254, RA 12009, RA 11055, EO 29, EO 58, JMC 003 s.2026) and extended the same failure pattern into agriculture/rural infrastructure.
4. **Continuation** — the sharpest correction: the first three passes are digital-systems-centric. The Philippine state runs on land, roads, geography, and physical assets as much as on software. Farm-to-Market Roads (FMR) is proposed as the sharpest available proof-of-concept, because a monitoring system (FMR Watch) for it *already exists* — which reframes the missing capability as **reconciliation between administrative truth and physical truth**, not another dashboard.

This document keeps all four evidence trails intact and does not resolve disagreements between them by picking one side silently — where the passes disagree or one supersedes another, that is noted explicitly.

---

## 1. Government Context

### 1.1 The institutional universe

CONFIRMED as a legal structure, but no single public, machine-readable registry of "every government institution and its current digital footprint" exists:

- **Executive Branch** — President, Cabinet departments, attached agencies/bureaus, GOCCs, GFIs, SUCs — under the Administrative Code of 1987.
- **Legislative Branch** — Senate and House, each with independent administrative/ICT systems, structurally *outside* DICT's e-governance mandate (RA 12254 explicitly preserves their fiscal/administrative autonomy).
- **Judiciary** — Supreme Court, Sandiganbayan, Court of Appeals, Court of Tax Appeals, trial courts — running its own digitalization track (eCourt PH / PJP) independent of DICT.
- **Constitutional Commissions** — COA, CSC, COMELEC — each independent, each running separate systems.
- **Independent/statutory bodies** — Ombudsman, Commission on Human Rights, and ad hoc bodies such as the Independent Commission for Infrastructure (ICI, created 2025 by executive order — PROPOSED/temporary, not a standing office).
- **LGUs** — provinces, cities, municipalities, barangays — under the Local Government Code and GOCC Governance Act.

**Finding (CONFIRMED gap):** DICT's own eGovDX reporting (75 national agencies + 927 LGU systems integrated, 2025 citation) is the closest thing to a partial census currently public — and even that describes *systems connected to one data-exchange layer*, not a full institutional inventory. The DBM does publish a 2026 Philippine Government Directory, which corrects an earlier assumption that no public institutional list exists at all — but a directory is not the same as a machine-readable, continuously updated institutional + digital-capability + asset/dependency registry, which still does not exist.

### 1.2 The geographic spine

As of June 30, 2026, the Philippines has **18 regions, 82 provinces, 149 cities, 1,493 municipalities, and 42,010 barangays** (PSA PSGC). This is not a minor detail — any future capability needs to understand Philippine geography as jurisdiction + boundary + administrative history + PSGC code + physical location, not as a free-text string.

### 1.3 The revised conceptual model: five interconnected universes

The Continuation research proposes replacing a single "institutional universe" with five:

| Universe | Answers | Existing foundation to build on |
|---|---|---|
| **Authority** | Who has legal authority? | Administrative Code, RA 12254, Local Government Code |
| **Geography** | Where does government operate? | PSA PSGC (region → barangay → parcel) |
| **Money** | Where does public money come from and go? | UACS (harmonized budget/treasury/accounting classification) |
| **Asset / Infrastructure** | What physically exists because government funded, built, owns, or depends on it? | No single existing registry — roads, bridges, irrigation, schools, hospitals, ports, utilities, land, etc. |
| **Evidence / Event** | What proves what happened? | No confirmed government-operated evidence graph — currently reconstructed manually by CSOs/journalists |

Time, identity, authorization, and provenance cut across all five. This is the model carried through the rest of this document.

---

## 2. Policy & Governance

### 2.1 Statutory foundation (verified)

| Law / Issuance | Date | What it does | Status |
|---|---|---|---|
| **RA 12254** (E-Governance Act) | Signed Sept 5, 2025; IRR finalized 2025–2026 | Institutionalizes e-governance across all branches/LGUs/GOCCs; mandates an E-Government Master Plan; **explicitly preserves fiscal/administrative autonomy** of covered entities | CONFIRMED (law), PARTIAL (implementation) |
| **RA 12009** (New Government Procurement Act) | Effective Aug 2024; IRR Feb 2025 | Replaces RA 9184; empowers GPPB to mandate cross-platform database interoperability | CONFIRMED, PARTIAL transition (PhilGEPS 1.5 → mPhilGEPS) |
| **RA 11055** (PhilSys Act) | 2018 | National ID; ~90M+ registrations | CONFIRMED, large-scale but tiered — **Tier 3 interoperability not yet live** |
| **EO 29, s.2023** | 2023 | Establishes IFMIS; BTMS core module | PARTIAL rollout — 7 agencies (2025) → 155 agencies (2026) |
| **EO 58, s.2024** | 2024 | Adopts NCSP 2023–2028 | CONFIRMED as policy, PARTIAL as capability |
| **NAIS-PH** (National AI Strategy) | Approved May 2025 | Whole-of-government AI framework through 2028 | CONFIRMED as strategy, very early implementation |
| **DICT–CSC JMC No. 003, s.2026** | Issued June 9, 2026 | Ethical AI use in government, model registries, third-party vendor accountability | CONFIRMED, very new — implementation maturity unverified |
| **RA 10173** (Data Privacy Act, 2012) | 2012 | Governs personal data handling | CONFIRMED — also documented as a vector for **selective transparency** (agencies citing it to deny legitimate SALN/records requests) |
| **RA 6713** | — | Requires SALN disclosure | CONFIRMED law, but enforcement/access has eroded in practice |

### 2.2 The transparency-law gap — this section was independently re-verified for this document

Both the Handoff and the Gap Map treated national FOI/RTI legislation as the single highest-leverage, still-open legal gap. **Status confirmed via direct search on the date of this document (August 30, 2026):**

- **Senate:** passed SB 1432, the People's FOI Act, on third and final reading — **May 4, 2026**.
- **House:** passed HB 9397, the Right to Information (RTI) Act of 2026, on third and final reading — **284–0, June 2, 2026**.
- **Current status (confirmed via a UNODC bulletin dated mid-August 2026):** both chambers have passed their respective versions on third reading, but **the bicameral conference committee has not yet reconciled and ratified a single version, and the measure has not yet been transmitted to the President.** It is not yet law. If and when it is signed — or the President takes no action within 30 days of transmittal — it becomes law, after which an independent oversight body and implementing rules still need to be established.
- **A live sticking point reported going into bicam:** which authority should oversee implementation. The House public-information committee chair has been quoted saying DICT's mandate is broad and enforcing a right like this does not appear to be its primary function — meaning the eventual law may create a *new* oversight body this research has not yet accounted for.

**Practical implication for this document:** every place in the four source documents that says "there is no national FOI law" is still accurate as of today, but the margin is now measured in a pending bicameral conference, not in years. **Re-verify this specific fact before it goes into any client-facing material** — it is the single fastest-moving legal input to this entire research line.

### 2.3 Governance principle carried forward

The Handoff's separation of authority types remains the operating principle for anything eventually built:

- **Technical authority** (DICT-led): interoperability, standards, shared infrastructure.
- **Independent oversight**: COA, Ombudsman, and other statutorily independent bodies.
- **Operational authority**: stays with the domain-owning agency.
- **Investigation authority**: restricted by law, role, purpose, case, and need.

The architecture must prevent both `technical administration = unrestricted intelligence access` and `access to the platform = authority to decide`.

---

## 3. Stakeholders

| Category | Entities | Role in this research |
|---|---|---|
| **Technical/interoperability authority** | DICT (eGovDX, eGovPH, NCSP, PNPKI [uncertain]) | Coordinates, does not centrally control |
| **Fiscal** | DBM, BTr, DOF, BIR, BOC | Own IFMIS/BTMS, UACS |
| **Procurement** | PS-DBM, GPPB | Own PhilGEPS/mPhilGEPS, OCDS |
| **Independent oversight (plural by design)** | COA, Ombudsman, Sandiganbayan, PCC, AMLC, NPC, CSC, Congress | Must be *fed* evidence, never replaced or bypassed |
| **Judiciary/Justice** | Supreme Court, DOJ, BJMP, BuCor, JSCC | Own eCourt PH/PJP, NJIS |
| **Agriculture/rural infrastructure** | DA-BAFE, NIA, PhilSA, DAR, DILG, DTI, DOT | Own GeoAgri, FMR Watch, ABEMIS, i-ROAD, WebFGIS/FGIS |
| **Identity** | PSA | Owns PhilSys/NIDAS |
| **LGUs** | 82 provinces, 149 cities, 1,493 municipalities, 42,010 barangays | Own SubayBAYAN entries, LGUSS, local ERPs |
| **Non-government (currently doing the reasoning work manually)** | R2KRN, PCIJ, other CSOs and media | Assemble relationship intelligence government systems don't |
| **Ad hoc** | ICI | Reactive, executive-order-created, not statutorily permanent |
| **External/regulated ecosystem** | Contractors, PPP concessionaires, banks, telcos, cloud providers | Government's operational dependency boundary extends here even though they are not government |

**Finding (CONFIRMED):** Oversight capacity is plural and independent *by design* — a constitutional strength. The gap is that these bodies correlate across each other's domains manually, slowly, and mostly after a scandal is already public.

---

## 4. Citizen Analysis

### 4.1 Approved transparency direction (from the Handoff)

- Citizen-facing transparency should expose as much as is legally releasable, through a simplified, readable public experience.
- Potential public views: government performance, project spending, procurement relationships, audit findings, agency risk indicators, system outages, AI-generated observations where appropriate, legally releasable investigative information.
- **Public transparency is not the same as unrestricted investigative intelligence** — this distinction is load-bearing throughout every other section.

### 4.2 Current transparency landscape (fragmented, three owners)

| Portal | Owner | Scope | Limitation |
|---|---|---|---|
| eFOI | Presidential Communications Office | Executive branch only | No independent enforcement; a sitting president withheld his own SALN for most of a term using this same framework |
| Open Data Philippines | Multiple, PCOO/DICT-coordinated | General open data | Coverage/currency not independently verified |
| PhilGEPS Open Data / OCDS | PS-DBM/GPPB | Procurement specifically | Internationally recognized (OGP 2025 anti-corruption award) — the genuine bright spot |

A citizen currently has to know which of three differently-scoped, differently-owned portals to use for which kind of request. **No amount of software substitutes for the missing statute** (see §2.2) — a capability built today is still legally constrained to what the executive branch chooses to disclose.

### 4.3 Person-level investigation principle

Approved direction from the Handoff: different investigative access and power depending on **who is asking, why, under what authority, for what case, and what data they may access.** Technical privilege must never automatically equal investigative authority. This becomes the "Decision & Access Ledger" concept in §7.3.

---

## 5. Current-State Assessment

### 5.1 Digital-system inventory (verified)

| System | Owner | Legal basis | Status | What it actually does |
|---|---|---|---|---|
| eGovPH Super App | DICT | RA 12254/10844 | CONFIRMED, ~7.2M users, suffered April 2026 outage | Citizen-facing bundle of ~24+ services on shared backend |
| eGovDX | DICT | RA 12254 | CONFIRMED, growing (75 NGAs + 927 LGUs, 440M+ transactions Jan 2025) | Standardized API data-exchange layer; agencies keep custody of their own data |
| PeGIF | DICT/DOST-ASTI | Legacy 2013 | UNCERTAIN relationship to eGovDX — possible duplication, flag for direct DICT clarification |
| IFMIS / BTMS | DBM/BTr/DOF | EO 29 | PARTIAL, 155 agencies (2026) | Real-time obligation/disbursement tracking — not physical verification |
| PhilGEPS / mPhilGEPS | PS-DBM/GPPB | RA 12009 | PARTIAL transition | Cannot detect corporate masking, cartels, or ghost projects automatically |
| COA e-audit / Digital Audit Mgmt System | COA | Art. IX-D | PLANNED (2023–2030 roadmap) | AI-assisted anomaly detection planned, not yet live government-wide |
| NJIS | DOJ/JSCC | MOA Sept 2024 | Early PARTIAL | Courts Cluster (Supreme Court) still being formally brought in |
| eCourt PH / PJP | Supreme Court | SPJI 2022–2027 | PARTIAL PILOT | **Trial courts nationwide — where most sentencing originates — not expected until mid-2026** |
| PhilSys / NIDAS | PSA/DICT | RA 11055 | CONFIRMED, tiered | Tier 3 (cross-party interoperability) not yet live; card backlog 34–40M units |
| PNPKI, HCMIS, GEA-Phils | DICT/CSC | Referenced in planning | **UNCERTAIN maturity** — no recent primary-source evidence found; flagged for direct verification, not assumed dormant or thriving |
| NCSP 2023–2028 | DICT | EO 58 | CONFIRMED as policy, PARTIAL as capability | NSOC (planned) is the natural home for cross-agency security observability |

### 5.2 Physical/sectoral-layer inventory (added by the Audit PDF and Continuation)

| System | Owner | What it does | Key limitation |
|---|---|---|---|
| GeoAgri | DA-BAFE | Spatial intersection queries on uploaded FMR shapefiles/KML to detect road duplication | No API link to BTMS disbursements or PhilGEPS awards |
| **FMR Watch** | DA-BAFE | Tracks FMR projects from proposal to completion; integrates budget data, construction milestones, geotagged photos, citizen feedback. **4,810 projects 2021–2025, ₱76.52B, ~2,400 km, 3,135 completed** | Not reconciled against PIPOL/UACS/PhilGEPS/contractor identity |
| DigitalAgri (DA-BAFE + PhilSA) | DA-BAFE/PhilSA | Sentinel-1/2 satellite remote sensing of crop cycles and road condition (turned over Nov 2025) | Isolated from financial/procurement systems |
| SubayBAYAN / PIME | DILG | Tracks LGSF-funded local projects (₱57.87B FY2026 GAA); geotagged photos, physical-vs-financial progress | Manual encoding by municipal/barangay staff; no automated cross-check with SEC registries or DPWH blacklists |
| WebFGIS / FGIS | NIA | Maps irrigable areas, canals, dams, construction progress | Not integrated with DA's GeoAgri or DPWH flood-control modeling — same river basin, no shared hydrological model |
| CBMS | PSA | Geotagging of service institutions, infrastructure, projects | Supports mapping/real-time progress checking, but not fused with financial systems |
| PIPOL (Public Investment Program Online) | DEPDev | Agency submission/validation/reporting of the rolling PIP. FY2026 PIP: **5,538 priority PAPs, ~₱19.7 trillion indicative cost, 55 parent + 225 attached agencies** | Upstream of budget/UACS; largely disconnected from downstream procurement/physical verification |
| UACS | DBM | Government-wide harmonized budget/treasury/accounting classification | Existing foundation — should be connected to, not reinvented |
| LGUSS (Barangay/City-Muni Info Mgmt) | DILG | Resident profiling, issuance management, Katarungang Pambarangay, document management | **19,879 active users, 27,415 of 42,010 barangays oriented (65.26%) as of July 1, 2026** — a live example of "system exists ≠ system is adopted" |
| PPP Center database | PPP Center | Interactive map of PPP projects: roads, rail, airports, ports, water, hospitals, education, ICT, energy, LGU projects | Extends the dependency graph beyond pure-government actors (concessionaires, private operators, financiers) |

### 5.3 Two empirical stress tests

**A. The 2025–2026 DPWH flood-control corruption scandal**
- **Scale:** ~₱545 billion in flood-control projects under scrutiny; 421 confirmed ghost projects out of ~8,000 audited units.
- **Detection mechanism — the single clearest finding in this whole research line:** the ghost projects were found through **physical, multi-agency site inspection** (DPWH + AFP + DND + DEPDev), **not** by PhilGEPS, IFMIS/BTMS, or COA's digital tooling.
- **Structural capture signal:** a sitting COA Commissioner's household held a financial stake (~₱326M in flood-control contracts) in the very sector COA audits.
- **Concentration/conflict patterns:** 15 firms captured ~20% of the flood-control budget; 67 members of Congress reportedly held public-works contracting interests (2022 data).
- **Response:** the government stood up ICI — an ad hoc, executive-order body — rather than activating a pre-existing standing capability, because none existed.
- **Enforcement (once evidence existed):** Ombudsman filed charges; AMLC froze ~₱5B in assets; PCC referrals pending. The back half of the pipeline works once fed evidence — the front half (surfacing the anomaly before a crisis) is the actual gap.

**B. The April 2026 DICT cloud outage**
- 12 government systems (including National ID e-Verify) went offline simultaneously.
- Root cause: a legitimate traffic surge (new e-wallet + e-Verify launches) hit a single shared cloud environment, compounded by a **budget-appropriation timing dispute between DICT and DBM** — institutional/financial failure, not a hack.
- No confirmed evidence that any standing capability — inside or outside DICT — modeled "which citizen-critical services share this infrastructure" in advance.

**A March 2026 FMR-specific echo of the same pattern:** DA physically inspected a suspected ghost FMR project in Lower Binogsacan, Guinobatan, Albay, and found the road had not been built at the approved site; the same pass flagged a separately overpriced FMR project in Camarines Sur. Same failure mode as the DPWH case — administrative record said one thing, physical inspection said another — just at smaller scale and already caught by DA itself.

### 5.4 Missing Capability Map

Six capabilities do not appear to exist anywhere in the current ecosystem, per the Gap Map:

1. A cross-domain, evidence-graded relationship/graph capability spanning money, procurement, corporate registration, campaign finance, and officeholding — today done manually by CSOs/journalists.
2. A standing (non-ad-hoc) cross-agency anomaly-detection or risk-prioritization function.
3. A shared-infrastructure/dependency map across government digital platforms.
4. A time-versioned record of legal/policy rule changes linked to the records they govern (e.g., GCTA eligibility).
5. A unified authorization/investigative-access model ("who may see or act on what, under what authority, for what case").
6. An AI-system registry and agentic-tool authorization ledger for government AI use (JMC 003 gestures toward this but does not yet operationalize it).

### 5.5 The Continuation's correction to this section

The Gap Map's inventory is strong on digital systems, procurement, oversight, cybersecurity, and evidence — and comparatively weak on **physical assets, geography, project portfolios, local implementation, and outcomes.** The Continuation's re-framing: the deepest problem is not a missing relationship graph — it's that government maintains multiple, unreconciled *representations of the same reality* (budget reality, procurement reality, administrative reality, legal reality, digital-system reality, geographic reality, physical reality, operational reality, citizen-reported reality). The central research question becomes: **can the state continuously answer whether all these representations still describe the same reality?**

---

## 6. Proposed Digital Solution

### 6.1 Naming and scope discipline (carried forward, unchanged)

Per the Handoff's own rules, still binding: do not lock a final name, do not assume "platform" is the final category, do not write a product specification yet, do not declare a database architecture prematurely, do not assume DICT alone should control everything, do not create a static "Top 10 corrupt agencies" list.

### 6.2 The narrowed verdict (Gap Map, reaffirmed by the Audit PDF)

> A thin, read-mostly, provenance-strict cross-system reasoning layer — never a replacement database, never a decision-maker — sitting above existing authoritative systems, synthesizing relationships and risk signals to inform authorized human decision-makers and independent oversight bodies.

### 6.3 The Continuation's reframing (proposed evolution, not yet adopted as final)

Working name offered, explicitly not locked: **Federated Government Assurance.** Six core functions:

1. **Discover** — know the institutional, technical, financial, geographic, and physical universe.
2. **Observe** — continuously ingest events from systems, people, and physical evidence.
3. **Reconcile** — compare different representations of the same entity, project, payment, asset, or legal state.
4. **Reason** — detect dependencies, anomalies, missing events, conflicts, risks, consequences.
5. **Assure** — route evidence to the institution that actually has authority to act.
6. **Learn** — feed resolved findings back into future design, procurement, operations, policy.

Underneath all six: identity + geography + time + evidence + authorization.

### 6.4 Four proposed intelligence domains (to prevent one monolithic system)

| Domain | Focus | Strongest existing proof-of-concept |
|---|---|---|
| **A — Government Engineering Assurance** | Software, systems, cloud, networks, cybersecurity, reliability, vendors | April 2026 DICT outage |
| **B — Public Investment & Infrastructure Assurance** | Programs, projects, roads, bridges, irrigation, physical assets, geospatial truth, contractor performance | **Farm-to-Market Roads (§11)** |
| **C — Public Money & Integrity Intelligence** | Budget, procurement, contractors, ownership, payments, audit, conflicts, campaign finance | DPWH flood-control scandal — the single best-evidenced case in the entire research line |
| **D — Government Service / Outcome Intelligence** | Education, health, social protection, agriculture, local services, citizen outcomes | Not yet stress-tested against a live case in this research |

They share a common identity + geography + time + evidence + authorization layer without becoming one monolith.

---

## 7. Data Governance

### 7.1 Data architecture posture (approved, unchanged across all four documents)

> **F → eventually E, with D as the default architectural principle.**

Meaning: the capability does not automatically own or duplicate authoritative government source data. Derived intelligence, relationships, evidence references, and metadata are preferred. Agency systems remain authoritative while being interoperated with. "One giant government database" is explicitly rejected as an assumption.

### 7.2 Connection is not corruption (foundational, non-negotiable)

A relationship between a person, company, agency, project, contract, payment, political organization, or official does **not** by itself establish corruption. The system must distinguish, at minimum: Fact → Claim → Evidence → Inference → Hypothesis → Risk Signal → Anomaly → Investigation → Audit Finding → Formal Finding → Decision → Conviction/adjudicated result. A graph relationship must never automatically become an accusation.

### 7.3 Evidence-first provenance

Every important output must be traceable through: **CLAIM → EVIDENCE → SOURCE → TIMESTAMP → TRANSFORMATION → ANALYSIS → HUMAN REVIEW → FINDING/DECISION.**

**Decision & Access Ledger** (Continuation's operationalization of "technical privilege ≠ investigative authority") — for every sensitive access, log: WHO, WHY, under what AUTHORITY, for which CASE/PURPOSE, WHAT DATA, WHICH FIELDS, WHEN, APPROVED BY WHOM, WHAT WAS RETURNED, WHAT WAS EXPORTED, WHERE IT WENT, RETENTION PERIOD, SUBSEQUENT USE.

### 7.4 Temporal intelligence

Government facts change: who held which position when, when a contract existed, how corporate ownership changed, which policy version was active, when a system was deployed/deprecated. The desired question is "who was connected to whom, when, under what authority, according to which evidence?" — not merely "who is connected to whom?" GCTA eligibility rules (revised multiple times by IRR and Supreme Court rulings) are the concrete example already documented of a moving legal target that any reconciliation logic must version, not just look up.

---

## 8. System Architecture

### 8.1 Not one database, not necessarily one graph

The desired foundation, per the Continuation, is broader than graph engineering alone:

**Entity + Relationship + Geography + Event + State + Evidence** — a graph answers "what is connected?"; a temporal model answers "what was true?"; a geospatial model answers "where?"; an event model answers "what happened?"; an evidence model answers "how do we know?"; an authorization model answers "who is allowed to know or act?"; a state model answers "what is the current condition?"

### 8.2 The five-universe cross-reference (from §1.3), expressed as an architecture

```
AUTHORITY ↕ GEOGRAPHY ↕ MONEY ↕ PROGRAMS/PROJECTS ↕ PROCUREMENT/CONTRACTS ↕
SYSTEMS ↕ PEOPLE/ORGANIZATIONS ↕ PHYSICAL ASSETS/INFRASTRUCTURE ↕
OPERATIONS/SERVICES ↕ EVENTS ↕ EVIDENCE ↕ OUTCOMES ↕ AUDIT/OVERSIGHT ↕
LEARNING/IMPROVEMENT
```
— with TIME, IDENTITY, AUTHORIZATION, and PROVENANCE cutting across every layer.

### 8.3 Capability, not system, as the unit of analysis

A profound distinction proposed by the Continuation: model the state around what it is **responsible for**, not only the systems it operates. Not "FMR Watch" but "farm-road capability, implemented by multiple systems and institutions." Not "eGovPH" but "citizen identity/service access capability." Not "PhilGEPS" but "public procurement capability." This moves the model from a System Map to a Government Capability Map, and from there to a State-of-the-World Map.

### 8.4 Adoption-state and automation-level as first-class fields

"System exists" ≠ "system is deployed." The full state chain: **Designed → Developed → Piloted → Rolled out → Oriented → Configured → Adopted → Actively used → Producing quality data → Integrated.** LGUSS demonstrates this concretely (65.26% of barangays oriented, not 100% adopted, as of July 2026).

Every capability record should also carry an **Automation Level**: fully automated → human-in-the-loop → manually initiated → semi-digital → paper-assisted → paper-primary → undocumented/shadow. This is especially load-bearing for corrections, LGUs, and field infrastructure, where systems can look digital while the real workflow is `System → print → sign → Excel → encode again → scan → upload`.

### 8.5 Gap taxonomy — three kinds, not one

| Type | Definition | Example |
|---|---|---|
| **A — Missing Capability** | Genuinely does not exist anywhere | Cross-agency infrastructure dependency graph |
| **B — Existing Capability, Poor Integration** | Exists, but not reconciled with adjacent systems | FMR Watch, PIPOL, UACS, PhilGEPS all exist; not continuously cross-checked |
| **C — Existing Capability, Poor Institutionalization** | Exists, but adoption/staffing/governance is incomplete | LGUSS (system built; rollout still 65% oriented) |

This distinction prevents proposing software for something that actually needs policy, funding, staffing, or enforcement.

---

## 9. Privacy & Security

### 9.1 Human decision authority (approved, unchanged)

Human approval is required for consequential decisions, combined with machine-enforced policy gates. The system may output "**DO NOT PROCEED**" only under defined rules/policies or controlled decision gates — never because an LLM personally judges a proposal unfavorably. Preferred model: **AI analysis/recommendation + machine-enforced policy + human decision authority.**

This is particularly binding for: criminal justice, custody/release, law enforcement, sanctions, procurement disqualification, financial actions, personnel actions, public benefits, investigations, national security, privacy-sensitive data.

### 9.2 Adversarial loophole taxonomy

| Class | PH evidence status |
|---|---|
| Ghost/nonexistent projects passing procurement and payment | Observed at scale (421 confirmed, DPWH/AFP/DND joint audit) |
| Bid-rigging / contractor cartels | Observed (PCC referrals; 15 firms/~20% of budget) |
| License-renting schemes | Observed in case reporting, not independently quantified |
| Oversight-body conflict of interest | Observed (COA Commissioner case) |
| Campaign-finance-to-procurement pipeline | Observed via secondary reporting |
| Legislator-as-contractor conflict | Observed (67 members, 2022 data) |
| Record-tampering for early release (GCTA-for-sale) | Observed historically |
| Audit-log tampering, credential sharing, shadow IT | Structurally possible, not independently confirmed — flag for direct technical audit |
| AI hallucination / prompt injection / agent misuse | Theoretical in PH context specifically (JMC 003 is weeks old); real global risk class |
| Automation bias | Theoretical but explicitly anticipated — this is why "AI output is not legal fact" is a standing principle |

**Reading of this table:** the financial/procurement capture patterns are extensively evidence-backed today. The AI-specific patterns are real but not yet locally evidenced — appropriately so, since the governance policy layer is only months old. The more urgent, better-evidenced problem right now is procurement/financial control, not AI safety per se.

### 9.3 Vendor and supply-chain intelligence (added scope)

Any future capability under Domain A should be able to answer: which critical systems share the same vendor, subcontractor, or cloud provider? Who holds source-code escrow or deployment credentials? Can the government exit the contract? Is data export guaranteed? This directly connects the April 2026 outage to procurement and engineering rather than treating it as a one-off IT incident.

### 9.4 "Silence detection" (added scope)

Beyond "what happened," ask "what should have happened but didn't": a required inspection missing, expected budget execution missing, a permit expired but operation continuing, a contract milestone overdue, a court ruling not reflected downstream, a project completed but with no evidence of actual operation. Often more powerful than anomaly detection on events that did occur.

---

## 10. Implementation

### 10.1 What is genuinely worth building now, ranked by evidence strength

1. **A thin, provenance-strict, cross-domain relationship layer for public money** (budget → procurement → contractor → corporate ownership → campaign finance → audit → enforcement), built to feed COA/Ombudsman/PCC/AMLC — the single best-evidenced case in this entire research line.
2. **A lightweight, standing shared-infrastructure/dependency map** across government digital platforms — closer to an SRE/observability function than a general intelligence platform, aimed at preventing another April-2026-style concentrated failure.
3. **Structured digitization support for BJMP/BuCor/trial-court status records** — not a reasoning layer yet, because the records themselves are not yet reliable enough to reason over. The honest, humbler version of the corrections proof-of-concept.
4. **Continued, non-competing support for PhilGEPS Open Data/OCDS and for FOI/RTI passage** — the latter is a legislative push, not a build, but it remains the single highest-leverage transparency intervention available.

### 10.2 What should be fixed inside existing institutions, not by building something new

- COA's own conflict-of-interest vetting for commissioners — a governance/appointments reform.
- ICI's institutional permanence — a legislative/executive design question.
- Cartel/bid-rigging enforcement capacity at PCC/GPPB — needs enforcement resourcing, not a dashboard.
- Whistleblower protection and SALN access enforcement — legal reform.
- Campaign-finance regulation — a COMELEC/legislative matter.
- BJMP/BuCor record standardization — an operational directive executed through NJIS as it matures.
- PeGIF vs. eGovDX role clarity — an internal DICT architecture-governance decision.

### 10.3 What existing systems already do better than a new build would

PhilGEPS/OCDS already does procurement transparency at internationally recognized standard (OGP 2025 award) — rebuilding this would duplicate, not complement. eGovDX is already the interoperability substrate — the correct posture is to consume it, not build a parallel one. NJIS already has the correct statutory ownership (JSCC) for justice-sector data sharing. COA is constitutionally the auditor and already plans AI-assisted anomaly detection inside its own mandate. AMLC and PCC already move reasonably quickly once handed credible evidence — the bottleneck is upstream of enforcement, not enforcement capacity.

---

## 11. Farm-to-Market Roads — Primary Proof-of-Concept

*(This section directly answers the "use FMR" instruction — it is the case study the rest of this document's Implementation and Roadmap sections point to.)*

### 11.1 Why FMR, and not corrections or the broad corruption graph

FMR is the smallest, most concrete, already-instrumented available test of "does the state's paperwork match physical reality," and it simultaneously touches national government, LGUs, barangays, public investment programming, budget, procurement, contractors, physical assets, geospatial data, field inspection, citizen reporting, evidence, payments, maintenance, and outcomes — the full stack this document is trying to model, at a tractable scale.

### 11.2 The existing chain

```
Agricultural need → farm production area → barangay/municipality/province
→ National FMR Network Plan (FMRNP 2023–2028, under JAO No. 1 s.2023:
   DA + DPWH + DTI + DOT + DILG, with DAR recognized as a co-funder)
→ project proposal → project prioritization → PIP/PIPOL
→ budget (GAA) → UACS
→ procurement (PhilGEPS/GPPB, RA 12009) → contractor
→ design → construction
→ inspection → acceptance → payment
→ physical road
→ agricultural logistics → travel time → post-harvest losses
→ farmgate prices → farmer income → market access
```

### 11.3 What already exists (do not rebuild this)

- **FMR Watch**, managed by DA-BAFE: tracks projects from proposal through completion; integrates official project records, budget data, construction milestones, geotagged photos, and citizen feedback. **4,810 projects reported 2021–2025, representing ₱76.52 billion and ~2,400 km of road, with 3,135 completed.**
- **GeoAgri**: requires LGUs/project planners to upload vector shapefiles/KML; runs spatial-intersection queries to detect road duplication/overlap.
- **DigitalAgri** (DA-BAFE + PhilSA, turned over November 2025): integrates Sentinel-1/2 satellite data into the GeoAgri dashboard for crop-cycle and road-condition monitoring.
- **Institutional governance shift, 2026 (UNCERTAIN — see §11.6):** per the Continuation's secondary synthesis, the FMR program was returned to DA in 2026, with BAFE leading nationwide implementation under a new DA Administrative Order, with a further amendment reported in August 2026. **This specific claim was not independently re-verified in this document and should be confirmed directly with DA-BAFE before being treated as settled** — it matters because it means the older "DA identifies, DPWH implements" division of labor may no longer be accurate.

### 11.4 What already fails — proven, not hypothetical

In March 2026, DA physically inspected a suspected ghost FMR project in **Lower Binogsacan, Guinobatan, Albay**; initial validation found the road had not been built at the approved site. The same inspection pass flagged a separate, notably overpriced FMR project in **Camarines Sur**. This is the DPWH flood-control pattern reproduced at smaller scale — and, notably, **DA caught it with its own physical inspection process**, not through GeoAgri, FMR Watch, or any automated cross-system check.

### 11.5 The corrected thesis

The government does **not** need "software that tracks farm-to-market roads" — that already exists and is reasonably mature. The actual open question is:

> **Why can't the government automatically reconcile FMR Watch + PIPOL + budget/UACS + procurement (PhilGEPS) + contractor identity (SEC) + LGU geography (PSGC) + land + physical verification (GeoAgri/DigitalAgri) + payments + audit + outcomes — for the same project, continuously, rather than only when a physical inspection happens to be scheduled?**

This is a direct instance of the "Administrative Truth vs. Physical Truth" model (§8, extended): the administrative record can say "1 km completed"; the physical question is "is there actually 1 km of road at the approved coordinates, at the required specification." The FMR case is where this distinction is already documented as having failed once, concretely, in 2026.

### 11.6 Recommended pilot scope (do this before writing any code)

1. Take **one completed FMR project and one flagged-ghost FMR project** (the Guinobatan case is a candidate, subject to data access).
2. Manually trace each one across: PIPOL → UACS → PhilGEPS → FMR Watch → PSGC coordinates → GeoAgri/DigitalAgri satellite pass → payment record.
3. Record, for each hop: whether the same project can even be identified across systems (no shared ID today), what data is missing, what data conflicts, and whether the conflict would have been visible without a physical site visit.
4. Only after this manual trace is complete should a decision be made about whether an automated reconciliation layer (Domain B) is technically and legally feasible — this pilot is a feasibility test, not a build commitment.
5. Independently verify the 2026 DA Administrative Order and its August 2026 amendment (§11.3) with DA-BAFE directly, since the current institutional responsibility model depends on it.

### 11.7 Adversarial test questions for the pilot

Was the project approved? Was it funded? Was it procured? Who won? Who owns the contractor (SEC beneficial ownership)? Where was it supposed to be (PSGC coordinates)? Where was it actually built (GeoAgri/DigitalAgri)? When? For how much? What evidence proves completion? Who inspected it? Who paid? What asset now exists? Who maintains it? Did the intended agricultural outcome occur (travel time, post-harvest losses, farmgate prices)? Were there contradictory records across any of the systems above?

---

## 12. Operations

### 12.1 Observability gap

No confirmed SLOs/SLIs, published incident postmortems, or error-budget practices were found publicly documented for eGovPH, eGovDX, or BTMS. The April 2026 outage is the closest thing to a public postmortem, and it surfaced through **Senate questioning**, not DICT's own proactive incident-transparency process.

### 12.2 Vendor concentration as an engineering-delivery risk, independent of corruption

At least 15 firms reportedly cornered roughly a fifth of DPWH's flood-control budget — a concentration pattern that is also a schedule/quality/single-supplier-dependency risk that current project-management tooling does not appear to flag as such, separate from any question of wrongdoing.

### 12.3 NSOC as the natural home for security observability

DICT's National Cybersecurity Plan already includes a planned National Security Operations Center tasked with continuous monitoring/VAPT across agencies. Any future Domain A capability should assume NSOC as this home, not attempt to duplicate it.

---

## 13. Sustainability

### 13.1 Legislative/institutional prerequisites no software can substitute for

- A national FOI/RTI law (status: pending bicameral conference committee as of this document — §2.2).
- Whistleblower protection and SALN access enforcement.
- Campaign-finance regulation (COMELEC/legislative).
- Oversight-appointment reform (the COA Commissioner conflict-of-interest case).
- PhilSys Tier 3 completion (cross-party relying verification).
- NJIS Courts Cluster integration (trial-court digitization, targeted mid-2026, status not independently re-verified in this document).

### 13.2 Calibration against international benchmarks

- **OECD 2025 Digital Government Index:** Philippines scored **0.28/1.00** — third-lowest of the 8 Southeast Asian countries assessed, below the regional average of 0.37. Useful check against any narrative that the ecosystem is already saturated with high-maturity capability — it is expanding fast, from a comparatively low base, unevenly.
- **IMF AI Preparedness Index:** Philippines scored below 0.11 — implementation capacity to operationalize a brand-new AI governance circular (JMC 003) should not be assumed strong yet, even though the policy intent is now genuinely real.

### 13.3 What sustains the narrow version of this concept over the expansive one

The expansive, all-domain version of the original concept is not sustainable *yet* because several of its prerequisites (digitized trial courts, PhilSys Tier 3, a national FOI law, PeGIF/eGovDX clarity) do not exist. Building it now would mean reasoning over records and legal-access rights that are neither reliable nor legally available. The narrow version — feeding existing, constitutionally independent oversight bodies rather than replacing them — does not depend on any of these prerequisites being resolved first.

---

## 14. Roadmap

Adapted and scoped down from the Continuation's six-phase proposal, sequenced by dependency rather than by ambition:

**Phase 0 — Direct verification (before any build commitment)**
- Confirm PNPKI, HCMIS, and any published GEA-Phils artifact status directly with DICT (all UNCERTAIN in this document).
- Re-verify the FOI/RTI Act's bicameral-conference and presidential-signature status (§2.2 — moving fast).
- Confirm the NJIS Courts Cluster integration timeline directly with the JSCC (Supreme Court + DOJ + DILG).
- Confirm eGovDX's and PhilSys's authorization/consent model directly, since any future "technical privilege ≠ investigative authority" principle must be built on whatever access-control primitives these systems actually expose today.
- Independently confirm the 2026 DA Administrative Order (and its reported August 2026 amendment) governing FMR institutional responsibility, directly with DA-BAFE.

**Phase 1 — Reference the State Universe, don't rebuild it**
Use the DBM 2026 Government Directory + PSGC + RA 12254's defined scope as the authoritative starting inventory. Map institution → office → jurisdiction → mandate → systems → programs → assets, rather than building a new registry from scratch.

**Phase 2 — FMR manual pilot (§11.6)**
One completed project, one flagged-ghost project, traced by hand across every existing system that touches it. This is a feasibility test for reconciliation, not a build.

**Phase 3 — If Phase 2 succeeds: scope the first buildable increment to Domain C (Public Money & Integrity Intelligence)**
The single best-evidenced case in the entire research line. Thin, provenance-strict, feeds COA/Ombudsman/PCC/AMLC only.

**Phase 4 — Second increment: Domain A (shared-infrastructure/dependency mapping)**
SRE-style, coordinated with DICT's planned NSOC — not a general intelligence platform.

**Phase 5 — Everything else deferred**
Corrections reconciliation (Domain gap tied to trial-court digitization), Domain D (service/outcome intelligence), and the full five-universe model stay deferred until their specific prerequisites (§13.1) actually exist. All outcomes remain acceptable, including that only part of this concept is ever built.

---

## 15. Open Questions / Flagged for Direct Verification

| Item | Status in this document | Why it matters |
|---|---|---|
| PNPKI, HCMIS, GEA-Phils operational maturity | UNCERTAIN | Named repeatedly in planning documents; no independent 2025–2026 evidence found |
| PeGIF vs. eGovDX division of labor | UNCERTAIN | Possible duplication or unclear standards-vs-platform split |
| FOI/RTI Act — bicam ratification and presidential action | Confirmed pending as of mid-August 2026 (§2.2) | Fastest-moving legal input to this entire research line — re-check before citing later |
| NJIS Courts Cluster integration timeline | PARTIAL/early, targeted mid-2026 | Gates the corrections use case entirely |
| 2026 DA Administrative Order + August 2026 amendment on FMR governance | Sourced from secondary synthesis in the Continuation document, not independently re-verified here | Determines whether "DA identifies, DPWH implements" is still an accurate institutional model |
| eGovDX / PhilSys authorization and consent model | Not confirmed from public documentation | Needed before any "technical privilege ≠ investigative authority" principle can be built on real primitives |

---

*This document reflects a consolidation of four prior research passes plus one independently re-verified fact (§2.2) as of August 30, 2026. It intentionally does not name a final architecture, does not choose a final name or category, and does not produce a product specification. Per the original Handoff's own instruction, all outcomes remain on the table — including that only part of this concept is worth pursuing.*
