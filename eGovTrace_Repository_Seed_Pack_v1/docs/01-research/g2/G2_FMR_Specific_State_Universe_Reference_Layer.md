# G2 — FMR-Specific State Universe Reference Layer

**Program:** eGovTrace / Philippine State Control & Assurance Research  
**Research Track:** FMR Reconciliation Experiment  
**Gate:** G2 — FMR-Specific State Universe Reference Layer  
**Status:** FROZEN / COMPLETE  
**Population date:** 2026-09-02

---

# 1. Purpose

G2 converts the broader Philippine State Universe into a **minimum, FMR-specific reference layer** for the next stages of the experiment.

The governing principle is:

> **Reference the State Universe; do not rebuild it.**

The broader research specification explicitly directs Phase 1 to use the DBM 2026 Government Directory, PSA PSGC, and the scope of RA 12254 as authoritative starting points, and to map:

```text
institution → office → jurisdiction → mandate → systems → programs → assets
```

rather than creating a new national registry.

For the FMR experiment, G2 therefore creates a **scoped reference layer**, not a new institutional master database.

---

# 2. G2 Research Question

> What minimum set of authoritative state-universe entities, jurisdictions, mandates, systems, programs, financial domains, infrastructure representations, and evidence sources must be referenced to trace an FMR intervention across its institutional lifecycle?

The answer must be:

- small enough for one researcher;
- sufficient for the selected FMR experiment;
- source-backed;
- time-aware;
- authority-aware;
- identity-aware;
- and expandable only when the experiment demonstrates a real need.

---

# 3. Governing Basis

G2 derives its structure from the following frozen research materials:

1. `FMR_Minimum_Ontology.md`
2. `FMR_Data_Access_Matrix.md`
3. `G1_Populated_Source_Registry_and_Field_Access_Matrix.md`
4. `Philippine_State_Control_and_Assurance_Universe_v2.md`
5. Frozen G1.1–G1.3c empirical gate records

The governing State Universe identifies five interconnected universes:

```text
AUTHORITY
GEOGRAPHY
MONEY
ASSET / INFRASTRUCTURE
EVIDENCE / EVENT
```

with:

```text
TIME
IDENTITY
AUTHORIZATION
PROVENANCE
```

cutting across all five.

---

# 4. Scope Rule

G2 does **not** attempt to enumerate every Philippine government institution, program, system, asset, or legal relationship.

An entity enters the FMR-specific reference layer only when at least one of the following is true:

1. it has direct authority over the selected FMR intervention;
2. it owns or operates a source required for reconciliation;
3. it controls a relevant financial, procurement, geographic, infrastructure, inspection, or oversight representation;
4. it is the jurisdiction in which the selected intervention exists or is claimed to exist;
5. it is required to interpret an evidence relationship;
6. the experiment encounters a record that cannot otherwise be represented.

Everything else remains outside the current reference layer.

---

# 5. FMR-Specific Reference Architecture

The minimum G2 layer is:

```text
STATE UNIVERSE REFERENCE
│
├── AUTHORITY
│   ├── institutions
│   ├── offices / operating units
│   ├── mandates / roles
│   └── temporal authority
│
├── GEOGRAPHY
│   ├── region
│   ├── province
│   ├── municipality
│   ├── barangay
│   └── physical/project geography
│
├── MONEY
│   ├── program / PAP
│   ├── appropriation
│   ├── allotment
│   ├── obligation
│   ├── disbursement
│   └── payment/accounting representation
│
├── ASSET / INFRASTRUCTURE
│   ├── FMR program
│   ├── project representation
│   ├── intervention
│   └── physical road segment
│
└── EVIDENCE / EVENT
    ├── source records
    ├── procurement events
    ├── contract events
    ├── inspection
    ├── completion / acceptance
    ├── physical observations
    └── analytical observations
```

This remains a reference model over authoritative systems, not a replacement registry.

---

# 6. Authority Universe — FMR Scope

## 6.1 Primary actors

| Reference ID | Institution / Unit | FMR relevance | Reference role | Status |
|---|---|---|---|---|
| G2-AUTH-0001 | Department of Agriculture (DA) | National agriculture / FMR policy and program context | Program / sector authority | CONFIRMED |
| G2-AUTH-0002 | DA — Bureau of Agricultural and Fisheries Engineering (BAFE) | FMR project/system ownership context; FMR Watch | Program / technical / source owner | CONFIRMED |
| G2-AUTH-0003 | DA Regional Field Office XI | Regional execution / reporting context | Regional operating unit | CONFIRMED as relevant to Region XI anchor |
| G2-AUTH-0004 | Department of Public Works and Highways (DPWH) | FMR implementation / technical infrastructure context, including historical and transition-dependent roles | Infrastructure / technical institution | CONFIRMED as relevant; exact current role is time-sensitive |
| G2-AUTH-0005 | DPWH Davao del Norte 2nd District Engineering Office | Identified in DA anchor reporting as technical/supervision context | District-level technical representation | CONFIRMED for anchor context |
| G2-AUTH-0006 | Department of Budget and Management (DBM) | NEP, GAA, UACS, allotment/release, SARO/NCA, SAOB | Fiscal / budget authority | CONFIRMED |
| G2-AUTH-0007 | Philippine Government Electronic Procurement System / PS-DBM / GPPB ecosystem | Procurement discovery and procurement transparency | Procurement representation | CONFIRMED |
| G2-AUTH-0008 | Commission on Audit (COA) | Audit / assurance / evidence destination | Independent oversight | CONFIRMED |
| G2-AUTH-0009 | Department of Economy, Planning, and Development (DEPDev) | PIP / PIPOL upstream public-investment representation | Investment planning | CONFIRMED as relevant system owner in the State Universe |
| G2-AUTH-0010 | Philippine Statistics Authority (PSA) | PSGC geographic reference | Geographic authority | CONFIRMED |
| G2-AUTH-0011 | Municipality of Braulio E. Dujali | Local jurisdiction of anchor | Local government jurisdiction | CONFIRMED |
| G2-AUTH-0012 | Barangay New Casay | Claimed project barangay | Local geographic jurisdiction | CONFIRMED |

### Authority caution

The existence of an institution in the reference layer does **not** mean it has authority over every downstream decision or data record.

The research must distinguish:

```text
DATA CUSTODY
TECHNICAL ACCESS
OPERATIONAL AUTHORITY
INVESTIGATIVE AUTHORITY
DECISION AUTHORITY
```

A system owner is therefore not automatically an investigative authority.

---

# 7. FMR Governance Is Time-Bounded

The Phase 0 verification record confirms DA Administrative Order No. 4, Series of 2026 as a real institutional change assigning a stronger DA-BAFE role in FMR implementation.

However, the reported August 2026 amendment remains unconfirmed.

Therefore G2 must represent institutional responsibility temporally:

```text
FMR governance relationship
        =
role + source + effective date + end date / unresolved end
```

The G2 reference layer must not freeze a historical “DA identifies, DPWH implements” model as an unconditional current truth.

**Current unresolved item:**

```text
August 2026 FMR governance amendment
= UNRESOLVED
```

This is a temporal-reference issue, not a reason to block the FMR experiment itself.

---

# 8. Geography Universe

## 8.1 National geographic authority

The PSA PSGC is the authoritative geographic reference selected by the broader State Universe.

As of **30 June 2026**, PSA reports:

- 18 regions
- 82 provinces
- 149 cities
  - 33 highly urbanized cities
  - 116 other cities
- 1,493 municipalities
- 42,010 barangays

PSA's current PSGC publication is the geographic reference for the experiment.

## 8.2 Anchor geography

### Municipality

**Braulio E. Dujali**

PSGC 10-digit code:

`1102323000`

### Barangay

**New Casay**

PSGC 10-digit code:

`1102323004`

Correspondence code:

`112323004`

The PSA current record identifies New Casay as a barangay of Braulio E. Dujali.

## 8.3 Geographic representation classes

G2 must keep separate:

```text
ADMINISTRATIVE GEOGRAPHY
        ↓
CLAIMED PROJECT GEOGRAPHY
        ↓
OBSERVED PHYSICAL GEOGRAPHY
```

A barangay code proves administrative geography.

It does not by itself prove that the road project physically exists at a specific point inside the barangay.

---

# 9. Money Universe

The money universe for the FMR experiment references:

```text
PIP / PIPOL
      ↓
NEP
      ↓
GAA
      ↓
Allotment / Sub-Allotment
      ↓
SARO / NCA where applicable
      ↓
ORS / Obligation
      ↓
DV
      ↓
LDDAP-ADA / ADA / Payment
      ↓
JEV / Accounting
```

G2 does not replace DBM or agency financial systems.

It records the existence and role of the relevant financial representations so that later reconciliation can connect them.

## Core money references

| Reference ID | Representation / source | Role | Status |
|---|---|---|---|
| G2-MNY-0001 | PIP / PIPOL | Upstream investment-program representation | RELEVANT |
| G2-MNY-0002 | NEP | Proposed/programmed national budget representation | CONFIRMED |
| G2-MNY-0003 | GAA | Appropriation representation | CONFIRMED |
| G2-MNY-0004 | Allocation / Allotment | Distribution of spending authority | CONFIRMED as a representation class |
| G2-MNY-0005 | SARO | Obligational authority | CONFIRMED as authority class |
| G2-MNY-0006 | NCA | Cash authority | CONFIRMED as authority class |
| G2-MNY-0007 | Sub-ARO / Sub-Allotment | Operating-unit allocation bridge | CONFIRMED as representation class |
| G2-MNY-0008 | ORS | Obligation transaction | CONFIRMED as transaction class |
| G2-MNY-0009 | DV | Disbursement transaction | CONFIRMED as transaction class |
| G2-MNY-0010 | LDDAP-ADA / ADA | Payment execution trail | CONFIRMED as transaction class |
| G2-MNY-0011 | JEV | Accounting record | CONFIRMED as accounting class |

---

# 10. Anchor Financial Representation

The New Casay candidate has a confirmed FY2025 DBM budget representation:

```text
Project:
Concreting of Brgy. New Casay FMR

Location:
Brgy. New Casay
Braulio E. Dujali
Davao del Norte

NEP/PAP:
310203212106000

Amount:
₱15,000,000
```

The same project description and amount appear in the FY2025 GAA representation.

A later budget-adjustment representation contains:

```text
310203212279000
Concreting of Brgy. New Casay FMR
₱15,000,000 shown parenthesized
```

This does **not** establish positive allotment by itself.

It also demonstrates:

```text
native financial code
≠ automatically persistent real-world project identity
```

That finding is carried directly from G1.

---

# 11. Asset / Infrastructure Universe

The G2 FMR infrastructure universe contains three different levels:

```text
FMR PROGRAM / NETWORK
        ↓
PROJECT REPRESENTATION
        ↓
FMR INTERVENTION
        ↓
PHYSICAL ROAD SEGMENT
```

These must not be collapsed.

## FMR Intervention

The real-world intervention is the primary analytical reconciliation subject.

## Project Representation

A government system's description of a project.

## Physical Road Segment

The physical road that may persist through time and may be affected by multiple interventions.

Example:

```text
Road Segment A
├── construction intervention
├── rehabilitation intervention
├── improvement intervention
└── maintenance intervention
```

This temporal distinction is required by G0.

---

# 12. FMR Anchor Project Representation

The anchor representation contains:

| Attribute | Representation |
|---|---|
| Project | New Casay / New Casayuran FMR |
| Road length | ~800 m |
| Width | ~5 m |
| Thickness | ~0.23 m |
| FY | 2025 |
| Reported contract cost | ₱14.92M |
| Contractor | Ruplino Seismundo Construction Corp. |
| Start | March 2025 |
| Completion | around July 2025 |
| Technical context | DPWH Davao del Norte 2nd District Engineering Office |
| FMR Watch locator | UUID-like public project locator |

These are institutional representations.

They are not automatically equivalent to independent physical proof.

---

# 13. Evidence / Event Universe

G2 references the following evidence/event classes:

| Reference ID | Evidence / event class | Purpose |
|---|---|---|
| G2-EVT-0001 | Project proposal / prioritization | Establish upstream project history |
| G2-EVT-0002 | Budget representation | Establish fiscal programming |
| G2-EVT-0003 | Procurement event | Establish procurement lifecycle |
| G2-EVT-0004 | Award / contract event | Establish contracted relationship |
| G2-EVT-0005 | Contract modification | Track scope/value/time changes |
| G2-EVT-0006 | Inspection event | Establish administrative inspection representation |
| G2-EVT-0007 | Completion / acceptance event | Establish administrative completion representation |
| G2-EVT-0008 | Obligation event | Establish financial execution |
| G2-EVT-0009 | Disbursement / payment event | Establish payment execution |
| G2-EVT-0010 | Physical observation | Establish observed physical condition |
| G2-EVT-0011 | Citizen evidence | Corroborating or challenging observation |
| G2-EVT-0012 | Audit / oversight event | Establish independent oversight representation |
| G2-EVT-0013 | Source-record acquisition | Preserve research provenance |
| G2-EVT-0014 | Analytical observation | Record patterns or unresolved issues |

---

# 14. System / Capability Reference Layer

G2 references systems by **capability**, not merely by system name.

| Capability | Relevant system/source | Current FMR relevance |
|---|---|---|
| FMR project monitoring | FMR Watch | PRIMARY |
| FMR geospatial representation | GeoAgri / geospatial sources | HIGH |
| Investment programming | PIPOL | MEDIUM/HIGH |
| Budget classification / fiscal representation | UACS / DBM budget publications | HIGH |
| Procurement transparency | PhilGEPS / OCDS | HIGH |
| Financial authority | DBM SARO / NCA | HIGH |
| Financial execution reporting | DBM SAOB / DA FAR | HIGH |
| Obligation / payment transaction | ORS / DV / LDDAP-ADA / JEV | HIGH |
| Government financial integration | BTMS / IFMIS | CONTEXT / EVOLVING |
| Geographic reference | PSA PSGC | PRIMARY |
| Infrastructure technical representation | DPWH systems / records | HIGH |
| Independent audit | COA systems / records | HIGH |
| Physical remote sensing / road condition | DigitalAgri / PhilSA | POTENTIALLY HIGH |
| Local project monitoring | SubayBAYAN / PIME | CONDITIONAL / LGSF-focused, not automatically the same FMR funding stream |

A system being listed does not establish that its data are publicly accessible or directly joinable to the anchor.

---

# 15. Existing-System Reuse Rule

G2 explicitly rejects rebuilding the following as new master registries:

```text
PSGC
government directory
UACS
PhilGEPS
FMR Watch
existing financial systems
existing audit systems
existing procurement systems
```

eGovTrace should reference their authoritative representations and preserve:

```text
source
native identifier
source record
timestamp
authority
relationship
provenance
```

This is consistent with the approved architectural posture:

> Agency systems remain authoritative; derived intelligence, relationships, evidence references, and metadata are preferred.

---

# 16. Cross-Universe Reference Relationships

The minimum G2 relationship model is:

```text
AUTHORITY
   ↕
GEOGRAPHY
   ↕
PROGRAM / PROJECT
   ↕
MONEY
   ↕
PROCUREMENT / CONTRACT
   ↕
PHYSICAL INFRASTRUCTURE
   ↕
EVENT / EVIDENCE
```

with:

```text
TIME
IDENTITY
AUTHORIZATION
PROVENANCE
```

attached to every meaningful relationship.

---

# 17. Anchor Reference Graph

The current New Casay reference layer is:

```text
DA / BAFE
   │
   ├── FMR Program
   │       │
   │       └── FMR Watch
   │               │
   │               └── Project Representation
   │
   └── DA Regional / project records

DPWH
   │
   └── Davao del Norte 2nd DEO
           │
           └── technical / supervision context

DBM
   │
   ├── NEP
   ├── GAA
   ├── budget adjustment/release records
   ├── SARO
   ├── NCA
   └── financial execution references

PhilGEPS / GPPB
   │
   └── Procurement representation

PSA
   │
   └── PSGC
       ├── Braulio E. Dujali
       └── New Casay

COA
   │
   └── Oversight / audit representation

REAL-WORLD
   │
   └── FMR Intervention
           │
           └── Physical Road Segment
```

This is a reference graph, not a claim that every edge is currently confirmed.

---

# 18. Confirmed vs Unresolved Edges

## Confirmed / strong

- New Casay is a real PSGC-recognized barangay within Braulio E. Dujali.
- The FMR Watch anchor is publicly observable.
- DA is materially relevant to the anchor's FMR representation.
- DBM has project-level FY2025 budget representations for New Casay FMR.
- Procurement systems contain searchable procurement representations.
- Financial authority and transaction-key classes exist.
- COA is an independent oversight institution relevant to assurance.
- Existing government systems should remain authoritative.

## Unresolved

- FMR Watch project locator as a persistent cross-system identifier.
- Exact FMR Watch → PhilGEPS join.
- Exact FMR Watch → contract-number join.
- Exact FMR Watch → SARO join.
- Exact FMR Watch → NCA join.
- Exact FMR Watch → Sub-ARO join.
- Exact FMR Watch → ORS join.
- Exact FMR Watch → DV/payment join.
- Exact physical road geometry.
- Independent physical observation dataset.
- August 2026 FMR governance amendment.

---

# 19. Adversarial G2 Challenge

Before freezing G2, the following failure modes were tested conceptually.

## Challenge 1 — Is G2 secretly rebuilding a government directory?

**Risk:** The reference layer could become an unofficial duplicate master registry.

**Disposition:** REJECTED.

G2 remains narrowly scoped to entities needed for the selected FMR experiment and references authoritative registries rather than replacing them.

---

## Challenge 2 — Does an institution's participation prove current authority?

**Risk:** Historical FMR roles could be mistaken for current roles.

**Disposition:** REJECTED.

Institutional relationships are time-bounded. Current FMR governance changes must carry effective dates and unresolved end dates where necessary.

---

## Challenge 3 — Does PSGC prove physical project location?

**Risk:** Administrative geography could be confused with physical geography.

**Disposition:** REJECTED.

PSGC establishes administrative jurisdiction. Physical road location requires separate claimed/observed geographic evidence.

---

## Challenge 4 — Does a budget representation prove project execution?

**Risk:** NEP/GAA entries could be interpreted as construction or payment evidence.

**Disposition:** REJECTED.

Budget representations are not obligation, payment, or physical-execution evidence.

---

## Challenge 5 — Does an existing system imply available data?

**Risk:** Naming a system could create false confidence that its records are public or machine-accessible.

**Disposition:** REJECTED.

G1 controls access separately through field-level status.

---

## Challenge 6 — Does a graph edge imply wrongdoing?

**Risk:** FMR relationships could become accusations.

**Disposition:** REJECTED.

The foundational rule remains:

```text
CONNECTION IS NOT CORRUPTION
```

---

## Challenge 7 — Is the FMR reference layer too broad?

**Risk:** G2 could recreate the full national five-universe architecture before the experiment needs it.

**Disposition:** REJECTED.

Only FMR-relevant nodes are included. Expansion requires a demonstrated experimental need.

---

# 20. G2 Acceptance Criteria

G2 is complete when the selected FMR experiment has a documented reference layer that:

- identifies the authoritative geographic spine;
- identifies the institutions and operating units materially relevant to the anchor;
- identifies the money-system representations required by the FMR lifecycle;
- identifies procurement and contract capability references;
- identifies infrastructure and physical-reality representations;
- identifies evidence/event classes needed for reconciliation;
- preserves temporal uncertainty;
- distinguishes administrative, institutional, and physical representations;
- does not recreate authoritative government registries;
- does not convert an institutional relationship into an authority claim;
- and preserves unresolved edges explicitly.

---

# 21. G2 Completion Check

| Criterion | Result |
|---|---|
| Authority universe scoped | PASS |
| Geographic universe referenced to PSA PSGC | PASS |
| Anchor municipality identified | PASS |
| Anchor barangay identified | PASS |
| Money universe scoped | PASS |
| Procurement universe scoped | PASS |
| Infrastructure universe scoped | PASS |
| Evidence/event universe scoped | PASS |
| Existing systems treated as authoritative references | PASS |
| Temporal authority changes preserved | PASS |
| Current unresolved governance amendment preserved | PASS |
| Physical geography separated from administrative geography | PASS |
| Institution participation separated from decision authority | PASS |
| No new national registry created | PASS |
| FMR-specific relationship graph defined | PASS |
| Adversarial challenge completed | PASS |

---

# 22. G2 Final Disposition

## STATUS: COMPLETE / FROZEN

G2 establishes the minimum FMR-specific State Universe Reference Layer required for the next gate.

It is intentionally not a comprehensive Philippine State registry.

The reference layer is sufficient to support the next formal question:

```text
Which candidate FMR interventions can be selected
without introducing selection bias or outcome leakage?
```

That is the purpose of **G3 — Neutral Candidate Selection**.

---

# 23. G2 Stop Rule

No additional State Universe population should occur merely because another institution, system, program, or relationship exists nationally.

Expansion is justified only when:

1. the FMR experiment encounters a record that cannot be represented;
2. a new authority relationship materially affects interpretation;
3. a geographic relationship materially affects identity;
4. a financial/procurement/physical/evidence relationship is necessary to reconcile the selected subject;
5. or a source change alters an already-recorded relationship.

Otherwise the formal process advances to:

```text
G2 — COMPLETE
      ↓
G3 — Neutral Candidate Selection
```

---

# 24. Primary References

### Governing project files

- `FMR_Minimum_Ontology.md`
- `FMR_Data_Access_Matrix.md`
- `G1_Populated_Source_Registry_and_Field_Access_Matrix.md`
- `Philippine_State_Control_and_Assurance_Universe_v2.md`

### Government references

- DBM 2026 Philippine Government Directory
- PSA Philippine Standard Geographic Code
- Republic Act No. 12254 / E-Governance Act
- DBM UACS / budget and financial-reporting structures
- PhilGEPS / GPPB procurement environment
- DA FMR Watch and official DA project reporting
- DPWH official infrastructure/procurement representations
- COA oversight environment

### Current geographic verification

PSA current PSGC data confirms that **New Casay** is barangay code `1102323004` within **Braulio E. Dujali**, municipality code `1102323000`. The PSA 30 June 2026 PSGC release reports 18 regions, 82 provinces, 149 cities, 1,493 municipalities, and 42,010 barangays.

### Temporal verification note

The 2026 DA FMR governance change reflected in the project research is represented as time-sensitive. The base Administrative Order No. 4 was independently confirmed in the Phase 0 verification record; the reported August 2026 amendment remains unresolved.

---

# 25. Core G2 Principle

The purpose of the reference layer is not to answer:

> “What is the Philippine government?”

It is to answer:

> **“What part of the Philippine State Universe must be referenced to determine whether this FMR intervention is represented consistently across authority, geography, money, infrastructure, procurement, and evidence?”**

That narrower question is the correct boundary for the FMR experiment.
