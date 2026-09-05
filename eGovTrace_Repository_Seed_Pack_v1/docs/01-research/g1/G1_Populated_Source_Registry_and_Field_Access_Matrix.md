# G1 — Populated Source Registry & Field Access Matrix

**Program:** eGovTrace / Philippine State Control & Assurance Research  
**Research Track:** FMR Reconciliation Experiment  
**Gate:** G1 — Field-by-Field Data Access Matrix  
**Status:** POPULATED FROM FROZEN G1.1–G1.3c EVIDENCE  
**Population date:** 2026-09-02  
**Purpose:** Formal G1 closure population using the evidence already accumulated in the frozen empirical sub-tests.

---

# 1. Population Basis

This matrix is populated from the frozen G1 empirical records:

- G1.1 — FMR Watch Public Observability
- G1.2 — PhilGEPS Procurement Discovery
- G1.2a — Expanded Procurement Identity Test
- G1.3 — DBM Financial Discovery & Join Test
- G1.3a — Financial Lifecycle Expansion
- G1.3b — Obligation & Disbursement Join Test
- G1.3c — Financial Authority & Transaction-Key Discovery

The governing G1 rule is preserved:

> Every mandatory field required for the selected FMR experiment must have a documented status, including when the status is UNKNOWN, UNRESOLVED, KNOWN_UNAVAILABLE, ACCESS_RESTRICTED, or PARTIALLY_AVAILABLE.

This document therefore does **not** attempt to make every field fully observable. It records what has actually been established.

---

# 2. Selected Experiment Scope

## Anchor

**FMR Watch project:** Barangay New Casayuran / New Casay area, Braulio E. Dujali, Davao del Norte.

Observed anchor attributes:

- 800 m concrete road
- approximately 5 m width
- approximately 0.23 m thickness
- FY2025 DA FMR context
- reported contract cost: ₱14.92M
- construction reported beginning March 2025
- completion reported around July 2025
- contractor reported as Ruplino Seismundo Construction Corp.
- DPWH Davao del Norte 2nd District Engineering Office reported as providing supervision / technical oversight
- FMR Watch UUID-like project locator

**Identity caution:** FMR Watch uses “New Casayuran” in the anchor context, while DBM uses “New Casay.” This relationship remains PROBABLE/POSSIBLE rather than automatically confirmed.

---

# 3. Source Registry

| Source ID | Source / System | Owning institution | Official locator / access route | Data domain | Authority | Grain | Access actor | Visibility | Access method | Access basis | Viewable | Downloadable | Machine-extractable | API accessible | Repeatably retrievable | Stable locator | Verification date | Verification evidence | Initial status |
|---|---|---|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---|
| G1-SRC-0001 | FMR Watch | DA-BAFE | https://fmrwatch.bafe.gov.ph/projects/f73b2243-e804-46bf-92b4-428a92b476eb | FMR project / physical infrastructure | PRIMARY_AUTHORITATIVE | PROJECT | ANONYMOUS_PUBLIC | PUBLIC_FIELD | PORTAL | PUBLICATION | YES | UNKNOWN | UNKNOWN | UNKNOWN | YES | YES | PARTIALLY_AVAILABLE | 2026-09-02 | Frozen G1.1, §§2–7 | PARTIALLY_AVAILABLE |
| G1-SRC-0002 | DA official project reporting | Department of Agriculture | https://www.da.gov.ph/tiu-laurel-dizon-inspect-davao-farm-road-project-amid-infrastructure-audit/ | Project / lifecycle / contractor context | PRIMARY_AUTHORITATIVE | PROJECT / DOCUMENT | ANONYMOUS_PUBLIC | PUBLIC_FIELD | PORTAL | PUBLICATION | YES | YES | YES | UNKNOWN | YES | YES | AVAILABLE | 2026-09-02 | Frozen G1.1, §7 | AVAILABLE |
| G1-SRC-0003 | PhilGEPS public procurement search | PS-DBM / GPPB | https://philgeps.gov.ph/ | Procurement | PRIMARY_AUTHORITATIVE | PROCUREMENT_PACKAGE / EVENT | ANONYMOUS_PUBLIC | PUBLIC_FIELD | PORTAL | PUBLICATION | YES | UNKNOWN | UNKNOWN | UNKNOWN | YES | YES | PARTIALLY_AVAILABLE | 2026-09-02 | Frozen G1.2, §7 | PARTIALLY_AVAILABLE |
| G1-SRC-0004 | DPWH official procurement surface | DPWH | https://www.dpwh.gov.ph/ | Procurement / contract | PRIMARY_AUTHORITATIVE | PROCUREMENT_PACKAGE / CONTRACT | ANONYMOUS_PUBLIC | PUBLIC_FIELD | PORTAL / DOWNLOAD | PUBLICATION | YES | YES | YES | UNKNOWN | YES | YES | AVAILABLE | 2026-09-02 | Frozen G1.2a procurement test evidence | AVAILABLE |
| G1-SRC-0005 | DBM FY2025 NEP, DA | DBM | https://www.dbm.gov.ph/wp-content/uploads/NEP2025/DA/A.pdf | Funding / budget | PRIMARY_AUTHORITATIVE | PROJECT / PAP | ANONYMOUS_PUBLIC | PUBLIC_FIELD | DOWNLOAD | PUBLICATION | YES | YES | YES | NO | YES | YES | AVAILABLE | 2026-09-02 | Frozen G1.3/G1.3a DBM NEP evidence | AVAILABLE |
| G1-SRC-0006 | DBM FY2025 GAA FMR annex | DBM | https://www.dbm.gov.ph/wp-content/uploads/GAA/GAA2025/VolumeIB/FMR/FMR.pdf | Appropriation | PRIMARY_AUTHORITATIVE | PROJECT / PAP | ANONYMOUS_PUBLIC | PUBLIC_FIELD | DOWNLOAD | PUBLICATION | YES | YES | YES | NO | YES | YES | AVAILABLE | 2026-09-02 | Frozen G1.3/G1.3a DBM GAA evidence | AVAILABLE |
| G1-SRC-0007 | DBM FY2025 NBC 595 Annex A-1 | DBM | https://www.dbm.gov.ph/wp-content/uploads/Issuances/2025/National-Budget-Circular/NBC-595/4.%20ANNEX%20A-1.pdf | Budget adjustment / release representation | PRIMARY_AUTHORITATIVE | PROJECT / PAP | ANONYMOUS_PUBLIC | PUBLIC_FIELD | DOWNLOAD | PUBLICATION | YES | YES | YES | NO | YES | YES | AVAILABLE | 2026-09-02 | Frozen G1.3/G1.3a NBC 595 evidence | AVAILABLE |
| G1-SRC-0008 | DBM SAOB reporting index / FY2025 reports | DBM | https://www.dbm.gov.ph/index.php/statement-of-appropriations-allotments-obligations-disbursements-and-balances | Financial execution | PRIMARY_AUTHORITATIVE | AGENCY / REPORT | ANONYMOUS_PUBLIC | PUBLIC_FIELD | PORTAL / DOWNLOAD | PUBLICATION | YES | YES | UNKNOWN | UNKNOWN | YES | YES | PARTIALLY_AVAILABLE | 2026-09-02 | Frozen G1.3a/G1.3b DBM SAOB evidence | PARTIALLY_AVAILABLE |
| G1-SRC-0009 | DA FAR No. 1 / financial reports | Department of Agriculture | https://www.da.gov.ph/transparency/ | Allotment / obligation / disbursement | PRIMARY_AUTHORITATIVE | AGENCY / REPORT | ANONYMOUS_PUBLIC | PUBLIC_FIELD | PORTAL / DOWNLOAD | PUBLICATION | YES | YES | UNKNOWN | UNKNOWN | YES | YES | PARTIALLY_AVAILABLE | 2026-09-02 | Frozen G1.3a/G1.3b DA FAR evidence | PARTIALLY_AVAILABLE |
| G1-SRC-0010 | DBM FY2025 SARO dataset | DBM | https://www.dbm.gov.ph/wp-content/uploads/SARO/2025/SARO_2025.pdf | Financial authority | PRIMARY_AUTHORITATIVE | SARO / AUTHORITY | ANONYMOUS_PUBLIC | PUBLIC_FIELD | DOWNLOAD | PUBLICATION | YES | YES | YES | NO | YES | YES | AVAILABLE | 2026-09-02 | Frozen G1.3c §3 | AVAILABLE |
| G1-SRC-0011 | DBM FY2025 NCA dataset | DBM | https://www.dbm.gov.ph/wp-content/uploads/NCA/2025/NCA_2025.pdf | Cash authority | PRIMARY_AUTHORITATIVE | NCA / AUTHORITY | ANONYMOUS_PUBLIC | PUBLIC_FIELD | DOWNLOAD | PUBLICATION | YES | YES | YES | NO | YES | YES | AVAILABLE | 2026-09-02 | Frozen G1.3c §4 | AVAILABLE |
| G1-SRC-0012 | DBM Sub-ARO / Sub-allotment / FAR 1B documentation | DBM | https://www.dbm.gov.ph/index.php/regional-offices/services-for-client-agencies/3932-release-of-funds | Allocation / sub-allotment | PRIMARY_AUTHORITATIVE | ALLOTMENT / SUB-ALLOTMENT | ANONYMOUS_PUBLIC | PUBLIC_FIELD / PUBLIC_DERIVED | PORTAL / DOWNLOAD | PUBLICATION | YES | YES | UNKNOWN | UNKNOWN | YES | YES | PARTIALLY_AVAILABLE | 2026-09-02 | Frozen G1.3c §6 | PARTIALLY_AVAILABLE |
| G1-SRC-0013 | Official transaction/payment process exemplars | DBM | https://www.dbm.gov.ph/index.php/central-office/services-for-the-bureau-service-office-employee/3310-processing-of-claims-of-suppliers-service-providers-and-agency-officials-and-employees-for-payment-through-list-of-due-and-demandable-accounts-payable-advice-to-debit-account-lddap-ada | ORS / DV / LDDAP-ADA / accounting | PRIMARY_AUTHORITATIVE | DOCUMENT / TRANSACTION | ANONYMOUS_PUBLIC | PUBLIC_DERIVED | PORTAL / DOWNLOAD | PUBLICATION | YES | YES | YES | NO | YES | YES | AVAILABLE | 2026-09-02 | Frozen G1.3c §§7–10 | AVAILABLE |
| G1-SRC-0014 | BTMS / IFMIS official architecture material | DBM / BTr / DOF | https://www.dbm.gov.ph/index.php/the-secretary-2/speeches/3833-strengthening-public-trust-through-fiscal-integrity-accountability-and-reforms | Financial systems | PRIMARY_AUTHORITATIVE | SYSTEM | ANONYMOUS_PUBLIC | PUBLIC_DERIVED | PORTAL | PUBLICATION | YES | UNKNOWN | YES | UNKNOWN | YES | YES | PARTIALLY_AVAILABLE | 2026-09-02 | Frozen G1.3c §12 | PARTIALLY_AVAILABLE |
| G1-SRC-0015 | DBM ADRS documentation | DBM | https://www.dbm.gov.ph/ | Budget document authenticity / integrity | PRIMARY_AUTHORITATIVE | DOCUMENT / VERIFICATION | ANONYMOUS_PUBLIC | PUBLIC_FIELD | PORTAL | PUBLICATION | YES | UNKNOWN | UNKNOWN | UNKNOWN | YES | YES | PARTIALLY_AVAILABLE | 2026-09-02 | Frozen G1.3c §13 | PARTIALLY_AVAILABLE |

### Source Registry notes

All Source Registry records now explicitly include the governing mandatory locator/access route and verification metadata.

1. “Available” means the source/access surface and required evidence class were observably reachable in the research.
2. It does **not** mean every field inside the source is available.
3. `PARTIALLY_AVAILABLE` is used where the source exists but the experiment established important limitations at field, grain, automation, or project-join level.
4. Machine/API/bulk details remain UNKNOWN where they were not actually established.

---

# 4. Mandatory Field-Record Metadata Coverage

For every populated Field Access record, the following mandatory metadata dimensions are treated as present even when the value is `UNKNOWN`, `UNRESOLVED`, or another permitted non-availability state:

- Matrix ID
- G0 object / representation
- Required field
- Analytical purpose
- Candidate source
- Native field name or `UNKNOWN`
- Data grain
- Native identifier status
- Access actor
- Visibility
- Access method
- Lawful access basis
- Source authority level
- Search status
- Final access status
- Reconciliation utility classification
- Research usability
- Verification date
- Verification evidence
- Notes / limitations

Where a detailed value is not reproduced in the compact tables below, it is governed by the corresponding source record, frozen G1 sub-test, and explicit status/notes in this matrix. No unverified value is treated as established merely because the source type normally contains it.

---

# 4. Core Field Access Population

## 4.1 Intervention and Project Identity

| Matrix ID | G0 object / representation | Required field | Candidate source | Data grain | Native identifier status | Search status | Final access | Join capability | Identity utility | Research usability | Evidence / limitation |
|---|---|---|---|---|---|---|---|---|---|---|---|
| G1-FLD-0001 | FMR Intervention / Project Representation | Project name / description | FMR Watch + DA | PROJECT | UNKNOWN | AVAILABLE | AVAILABLE | COMMON_ATTRIBUTE | HIGH | USABLE | Public project representation established |
| G1-FLD-0002 | FMR Intervention / Project Representation | Native project locator | FMR Watch | PROJECT | EXISTS, persistence UNKNOWN | AVAILABLE | PARTIALLY_AVAILABLE | SHARED_IDENTIFIER / UNKNOWN | HIGH | CONDITIONALLY_USABLE | UUID-like locator visible; native primary-key/API persistence not established |
| G1-FLD-0003 | FMR Intervention / Project Representation | Identity basis | FMR Watch + DA | PROJECT | N/A | AVAILABLE | AVAILABLE | COMMON_ATTRIBUTE | HIGH | USABLE | Place, scope, program, timing and contractor context available |
| G1-FLD-0004 | FMR Intervention / Project Representation | Project-to-source cross-reference | FMR Watch + other sources | PROJECT | NOT ESTABLISHED | SEARCHED_NOT_FOUND | UNRESOLVED | UNKNOWN | HIGH | LIMITED | No confirmed PhilGEPS/DBM/DPWH/payment cross-reference found |
| G1-FLD-0005 | Organization / Contractor | Contractor legal name | DA / procurement candidates | LEGAL_ENTITY / PROCUREMENT | EXISTS | AVAILABLE | AVAILABLE | COMMON_ATTRIBUTE / SEMANTIC_MATCH_REQUIRED | HIGH | USABLE | Ruplino name observable; contractor identity kept separate from project identity |
| G1-FLD-0006 | FMR Intervention / Project Representation | Administrative location | FMR Watch + DBM + procurement | ADMINISTRATIVE_UNIT / PROJECT | NATIVE IDENTIFIER VARIES | AVAILABLE | AVAILABLE | COMMON_ATTRIBUTE | HIGH | USABLE | Braulio E. Dujali / Davao del Norte repeatedly observable |
| G1-FLD-0007 | Location | Claimed project location | FMR Watch + DA + DBM | PROJECT | VARIES | AVAILABLE | AVAILABLE | COMMON_ATTRIBUTE | HIGH | USABLE | New Casayuran vs New Casay naming discrepancy remains unresolved |
| G1-FLD-0008 | Project Representation | Stated scope / dimensions | FMR Watch + DA | PROJECT | N/A | AVAILABLE | AVAILABLE | COMMON_ATTRIBUTE | HIGH | USABLE | 800 m; ~5 m; ~0.23 m |
| G1-FLD-0009 | Project Representation | Program / fiscal-year context | DA + DBM | PROJECT / PROGRAM | VARIES | AVAILABLE | AVAILABLE | TEMPORAL_JOIN / COMMON_ATTRIBUTE | HIGH | USABLE | FY2025 FMR context |
| G1-FLD-0010 | Project Representation | Contractor relationship | DA | PROJECT | N/A | AVAILABLE | AVAILABLE | COMMON_ATTRIBUTE | HIGH | USABLE | Administrative assertion only; procurement match not yet established |

---

# 5. Lifecycle Date Fields

| Matrix ID | Required field | Candidate source | Final access | Temporal utility | Research usability | Notes |
|---|---|---|---|---|---|---|
| G1-FLD-0011 | Construction start date | DA / FMR Watch | AVAILABLE | HIGH | USABLE | March 2025 reported |
| G1-FLD-0012 | Completion date | DA / FMR Watch | AVAILABLE | HIGH | USABLE | Completion around July 2025 reported |
| G1-FLD-0013 | Publication date | DA / DBM | AVAILABLE | HIGH | USABLE | Publication dates available on source documents/pages |
| G1-FLD-0014 | Observation date for physical evidence | FMR Watch / DA inspection reporting | PARTIALLY_AVAILABLE | HIGH | CONDITIONALLY_USABLE | Administrative inspection dates exist; independent physical-observation dataset not yet demonstrated |
| G1-FLD-0015 | Historical/version date | FMR Watch | UNRESOLVED | HIGH | LIMITED | Version history not independently established |
| G1-FLD-0016 | Acquisition/retrieval date | Research record | AVAILABLE | HIGH | USABLE | Research-side acquisition date can be recorded |

---

# 6. Procurement Fields

| Matrix ID | Required field | Candidate source | Native identifier | Final access | Procurement utility | Join capability | Research usability |
|---|---|---|---|---|---|---|---|
| G1-FLD-0017 | Procurement package/reference | PhilGEPS / DPWH | EXISTS | PARTIALLY_AVAILABLE | HIGH | SEMANTIC_MATCH_REQUIRED | CONDITIONALLY_USABLE |
| G1-FLD-0018 | Procurement event | PhilGEPS / DPWH | EXISTS | AVAILABLE | HIGH | COMMON_ATTRIBUTE | USABLE |
| G1-FLD-0019 | Procurement identifier for target project | PhilGEPS / DPWH | NOT RECOVERED | UNRESOLVED | HIGH | UNKNOWN | LIMITED |
| G1-FLD-0020 | Contractor on procurement record | PhilGEPS / DPWH | EXISTS | AVAILABLE | HIGH | COMMON_ATTRIBUTE / SEMANTIC_MATCH_REQUIRED | USABLE |
| G1-FLD-0021 | Procurement amount | PhilGEPS / DPWH | EXISTS | PARTIALLY_AVAILABLE | HIGH | COMMON_ATTRIBUTE | CONDITIONALLY_USABLE |
| G1-FLD-0022 | Contract reference | DPWH / procurement record | EXISTS | UNRESOLVED FOR TARGET | HIGH | REFERENCED_IDENTIFIER | LIMITED |
| G1-FLD-0023 | Procurement-to-project join | FMR Watch + procurement | NOT ESTABLISHED | UNRESOLVED | HIGH | SEMANTIC_MATCH_REQUIRED | LIMITED |

### Procurement finding

A real DPWH/PhilGEPS-linked procurement was discovered during the expanded test, but it was for a different contractor/project context and was **not merged** with the FMR Watch anchor.

Therefore the matrix explicitly records the join as unresolved/rejected where evidence requires it.

---

# 7. Financial Chain Fields

| Matrix ID | Required field | Candidate source | Native identifier | Final access | Financial utility | Join capability | Research usability |
|---|---|---|---|---|---|---|---|
| G1-FLD-0024 | Appropriation / funding reference | DBM NEP / GAA | YES | AVAILABLE | HIGH | COMMON_ATTRIBUTE | USABLE |
| G1-FLD-0025 | Appropriation amount | DBM NEP / GAA | YES | AVAILABLE | HIGH | COMMON_ATTRIBUTE | USABLE |
| G1-FLD-0026 | NEP project/PAP code | DBM NEP | `310203212106000` | AVAILABLE | HIGH | SHARED_IDENTIFIER within source context | USABLE |
| G1-FLD-0027 | GAA project representation | DBM GAA | CODE NOT SHOWN AS PERSISTENT CROSS-STAGE KEY | AVAILABLE | HIGH | COMMON_ATTRIBUTE | USABLE |
| G1-FLD-0028 | Allocation/allotment representation | DBM adjustment/release docs | YES / VARIES | PARTIALLY_AVAILABLE | HIGH | COMMON_ATTRIBUTE / SEMANTIC_MATCH_REQUIRED | CONDITIONALLY_USABLE |
| G1-FLD-0029 | Positive allotment amount | DBM / agency execution records | NOT ESTABLISHED FOR TARGET | UNRESOLVED | HIGH | UNKNOWN | LIMITED |
| G1-FLD-0030 | Obligation reference | FAR / ORS | EXISTS AS CLASS | UNRESOLVED FOR TARGET | HIGH | REFERENCED_IDENTIFIER | LIMITED |
| G1-FLD-0031 | Obligation amount | FAR / ORS | EXISTS AS CLASS | UNRESOLVED FOR TARGET | HIGH | REFERENCED_IDENTIFIER | LIMITED |
| G1-FLD-0032 | Disbursement reference | FAR No. 4 / DV | EXISTS AS CLASS | UNRESOLVED FOR TARGET | HIGH | REFERENCED_IDENTIFIER | LIMITED |
| G1-FLD-0033 | Disbursement amount | FAR No. 4 / DV | EXISTS AS CLASS | UNRESOLVED FOR TARGET | HIGH | REFERENCED_IDENTIFIER | LIMITED |
| G1-FLD-0034 | Payment reference | LDDAP-ADA / ADA | EXISTS AS CLASS | UNRESOLVED FOR TARGET | HIGH | REFERENCED_IDENTIFIER | LIMITED |
| G1-FLD-0035 | Accounting reference | JEV | EXISTS AS CLASS | UNRESOLVED FOR TARGET | MEDIUM/HIGH | REFERENCED_IDENTIFIER | LIMITED |
| G1-FLD-0036 | Financial authority reference | SARO | EXISTS | UNRESOLVED FOR TARGET | HIGH | REFERENCED_IDENTIFIER | LIMITED |
| G1-FLD-0037 | Cash authority reference | NCA | EXISTS | UNRESOLVED FOR TARGET | MEDIUM/HIGH | REFERENCED_IDENTIFIER | LIMITED |
| G1-FLD-0038 | Sub-ARO / sub-allotment reference | DBM / agency | EXISTS AS CLASS | UNRESOLVED FOR TARGET | HIGH | REFERENCED_IDENTIFIER | LIMITED |
| G1-FLD-0039 | DMS reference | DBM DMS process | EXISTS AS CLASS | UNRESOLVED FOR TARGET | HIGH | REFERENCED_IDENTIFIER | LIMITED |
| G1-FLD-0040 | Contract-to-finance reference | Procurement + financial records | EXISTS AS CLASS | UNRESOLVED FOR TARGET | HIGH | REFERENCED_IDENTIFIER | LIMITED |

---

# 8. Identifier Persistence Findings

The experiment establishes that identifier continuity cannot be assumed.

Observed:

```text
NEP project/PAP:
310203212106000

Later budget-adjustment representation:
310203212279000
```

Therefore:

```text
native budget identifier
≠ automatically persistent real-world project identity
```

The matrix records identifier fields with separate:

- native identifier status;
- uniqueness;
- stability;
- persistence;
- public visibility;
- cross-reference status.

Where persistence was not demonstrated, the field is not upgraded to YES merely because the value looks code-like.

---

# 9. Physical / Geospatial Fields

| Matrix ID | Required field | Candidate source | Final access | Physical evidence utility | Geographic utility | Notes |
|---|---|---|---|---|---|---|
| G1-FLD-0041 | Claimed road length | FMR Watch / DA | AVAILABLE | MEDIUM | MEDIUM | ~800 m |
| G1-FLD-0042 | Claimed road width | FMR Watch / DA | AVAILABLE | MEDIUM | MEDIUM | ~5 m |
| G1-FLD-0043 | Claimed road thickness | FMR Watch / DA | AVAILABLE | MEDIUM | MEDIUM | ~0.23 m |
| G1-FLD-0044 | Claimed project location | FMR Watch / DA / DBM | AVAILABLE | MEDIUM | HIGH | Name normalization unresolved |
| G1-FLD-0045 | Coordinates / geometry | FMR Watch / geospatial sources | UNKNOWN | HIGH | HIGH | Not sufficiently established in frozen G1 evidence |
| G1-FLD-0046 | Independent physical observation | Inspection / imagery | PARTIALLY_AVAILABLE | HIGH | HIGH | Administrative inspection evidence exists; independent physical dataset not yet established |
| G1-FLD-0047 | Observation date | DA inspection / physical evidence | PARTIALLY_AVAILABLE | HIGH | HIGH | Source-specific dates available where reported |
| G1-FLD-0048 | Road-segment identity | Physical observation / geospatial | UNRESOLVED | HIGH | HIGH | G0 requires road segment as a distinct real-world object |

---

# 10. Evidence and Oversight Fields

| Matrix ID | Required field | Candidate source | Final access | Auditing utility | Research usability | Notes |
|---|---|---|---|---|---|---|
| G1-FLD-0049 | Source record locator | All tested sources | AVAILABLE | HIGH | USABLE | Native URL/document locator recorded where observable |
| G1-FLD-0050 | Publication date | Official source records | AVAILABLE | HIGH | USABLE | Available for major documents/pages |
| G1-FLD-0051 | Evidence artifact | DA / DBM / procurement records | AVAILABLE | HIGH | USABLE | Official documents retained as evidence references |
| G1-FLD-0052 | Provenance | Research record | AVAILABLE | HIGH | USABLE | Source-level provenance can be recorded |
| G1-FLD-0053 | Inspection representation | DA reporting | AVAILABLE | HIGH | CONDITIONALLY_USABLE | Administrative inspection representation exists |
| G1-FLD-0054 | Completion/acceptance representation | DA / FMR Watch | AVAILABLE | HIGH | CONDITIONALLY_USABLE | Administrative completion representation is not physical proof |
| G1-FLD-0055 | Audit representation | Public audit-related material | PARTIALLY_AVAILABLE | HIGH | LIMITED | Audit trail for this specific anchor not independently established |
| G1-FLD-0056 | Missing / expected observation state | Research matrix | AVAILABLE | HIGH | USABLE | Explicit non-observation state used throughout G1 |
| G1-FLD-0057 | Explanation for non-observation | Research matrix | AVAILABLE | HIGH | USABLE | Distinguishes not found, unavailable, restricted, extraction failure, alternate identifier, etc. |

---

# 11. Access-State Findings

## Confirmed public access

The following classes were directly observed as publicly reachable:

- FMR Watch project page
- official DA reporting
- PhilGEPS public procurement surface
- DPWH official procurement materials
- DBM NEP
- DBM GAA
- DBM budget-adjustment documentation
- DBM SARO dataset
- DBM NCA dataset
- DBM SAOB reporting surface
- DA financial reporting surface

## Unresolved public field access

The following remain unresolved at project-specific level:

- FMR Watch machine/API schema
- exact target PhilGEPS procurement identifier
- target contract number
- target Sub-ARO
- target SARO
- target NCA
- target ORS
- target DV
- target LDDAP-ADA / payment reference
- target JEV
- target BTMS transaction record
- stable cross-system identity linking all representations

These are documented as unresolved rather than assumed absent.

---

# 12. Reconciliation Utility Matrix

| Domain | Utility | Current evidence |
|---|---|---|
| Identity | HIGH | Project/location/scope can establish candidate identity, but cross-system identity remains incomplete |
| Time | HIGH | FY2025 context and lifecycle/report publication dates are observable |
| Geography | HIGH | Administrative and claimed geography observable; exact physical geometry unresolved |
| Funding | HIGH | NEP/GAA project-level representation confirmed |
| Procurement | HIGH | Procurement surface usable; target procurement join unresolved |
| Contract | HIGH | Contract identifiers exist as a class; target contract not recovered |
| Payment | HIGH | Payment transaction-key classes exist; target payment not recovered |
| Organization | HIGH | Contractor and institutions observable; project-specific procurement identity unresolved |
| Physical evidence | MEDIUM/HIGH | Administrative inspection and project measurements observable; independent physical data not fully established |
| Lifecycle | HIGH | Administrative lifecycle stages visible; financial execution joins incomplete |
| Audit/oversight | MEDIUM | Oversight structures observable; target-specific audit chain not established |
| Outcome | LOW | Outcome evidence is outside current G1 closure needs |

---

# 13. Search-State Discipline

G1 applies the following distinctions:

```text
NOT OBSERVED ≠ ABSENT
ABSENT ≠ MISCONDUCT
UNAVAILABLE ≠ FALSE
```

For this experiment:

### `SEARCHED_NOT_FOUND`
Used where an explicit search produced no confidently matching record.

### `UNRESOLVED`
Used where a relationship or field could plausibly exist but the evidence does not establish it.

### `KNOWN_UNAVAILABLE`
Not assigned unless the source/access conditions actually establish unavailability.

### `ACCESS_RESTRICTED`
Not assigned without an established restriction.

### `PARTIALLY_AVAILABLE`
Used where the source is observable but required fields, grain, automation, or project-level joins remain incomplete.

---

# 14. G1 Completion Check

The governing completion rule requires every mandatory field required for the selected experiment to have a documented status.

## Completion results

| Requirement | Status |
|---|---|
| Source Registry records created for principal tested sources | PASS |
| Core FMR identity fields populated | PASS |
| Administrative geography fields populated | PASS |
| Stated scope fields populated | PASS |
| Lifecycle date fields populated with source-specific limitations | PASS |
| Procurement identity fields populated | PASS |
| Contractor/legal-entity identity fields populated | PASS |
| Physical/geospatial fields populated with explicit unknowns where necessary | PASS |
| Appropriation/funding fields populated | PASS |
| Allocation/allotment fields populated | PASS |
| Obligation fields populated with unresolved target status | PASS |
| Procurement value fields populated | PASS |
| Contract fields populated | PASS |
| Contract modification status documented | PASS / NOT YET APPLICABLE TO CONFIRMED TARGET CONTRACT |
| Payment/disbursement fields populated | PASS |
| Inspection/completion fields populated | PASS |
| Evidence/provenance fields populated | PASS |
| Missing/expected observations represented | PASS |
| Reconciliation utility classifications recorded | PASS |
| Every mandatory field has an explicit status | PASS |
| Optional-field overreach avoided | PASS |

---

# 15. G1 Closure Decision

## STATUS: COMPLETE — CONDITIONAL ON NO NEW REQUIRED FIELD EMERGING

The matrix now satisfies the governing G1 stopping rule:

> Every mandatory field required for the selected FMR experiment has a documented status.

Important:

**G1 completion does not mean that every data field is available.**

It means that the access/evidence state of every mandatory field is known enough to proceed, including explicit UNKNOWN, UNRESOLVED, or PARTIALLY_AVAILABLE states.

---

# 16. What G1 Has Proven

G1 has established that:

1. a real FMR project representation can be publicly observed;
2. procurement discovery is possible but identity matching requires stronger evidence than similarity;
3. project-level budget representations exist;
4. the financial lifecycle is represented across multiple official reporting layers;
5. transaction-key classes exist between budget, obligation, payment, and accounting layers;
6. identifier persistence cannot be assumed;
7. public project-level reconciliation becomes materially weaker as the lifecycle moves into transaction-level financial records;
8. unresolved joins can be represented without converting them into accusations;
9. a thin reconciliation layer can therefore be tested without rebuilding authoritative government systems.

---

# 17. What G1 Has Not Proven

G1 has **not** proven:

- that New Casay had no procurement record;
- that New Casay had no obligation;
- that New Casay had no payment;
- that money is missing;
- that the ₱80,000 difference between ₱15M and ₱14.92M is anomalous;
- that the New Casayuran and New Casay naming difference represents different physical projects;
- that FMR Watch data is physically verified merely because it is publicly available;
- that a government identifier is a persistent real-world project identifier;
- that BTMS already provides universal public transaction access.

These remain explicitly unresolved where applicable.

---

# 18. Frozen G1 Architecture Implication

The experiment supports the following model:

```text
REAL-WORLD FMR INTERVENTION
        │
        ├── Project Representation
        │
        ├── Funding / Budget Representation
        │
        ├── Allocation / Allotment Representation
        │
        ├── Procurement Representation
        │
        ├── Contract Representation
        │
        ├── Obligation Representation
        │
        ├── Payment Representation
        │
        ├── Physical / Geospatial Representation
        │
        └── Evidence / Source Records
```

with explicit representation-to-representation relationships and evidence.

The correct role of eGovTrace is:

```text
preserve native identities
        ↓
preserve source records
        ↓
map representations
        ↓
preserve time
        ↓
classify joins
        ↓
surface contradictions / gaps
```

not:

```text
unresolved join
        ↓
accusation
```

---

# 19. Formal G1 Disposition

**G1 — FIELD-BY-FIELD DATA ACCESS MATRIX**

**STATUS: COMPLETE**

**COMPLETION BASIS:**

All mandatory fields required for the selected FMR experiment have a documented status. Where evidence does not establish availability or a join, the matrix preserves the appropriate unresolved state.

**G2 may now begin**, subject to the existing research rule that G2 must be treated as the next formal Phase 1A gate and not as a continuation of open-ended G1 discovery.

---

# 20. Evidence Base

### Frozen G1 empirical records

- `G1.1_FMR_Watch_Public_Observability.md`
- `G1.2_PhilGEPS_Procurement_Discovery.md`
- `G1.2a_Expanded_Procurement_Identity_Test.md`
- `G1.3_DBM_Financial_Discovery_Join_Test.md`
- `G1.3a_Financial_Lifecycle_Expansion.md`
- `G1.3b_Obligation_Disbursement_Join_Test.md`
- `G1.3c_Financial_Authority_Transaction_Key_Discovery.md`

### Governing documents

- `FMR_Minimum_Ontology.md`
- `FMR_Data_Access_Matrix.md`

---

# 21. Final Stop Rule

No additional G1 research should be initiated merely because an unresolved field remains.

Additional G1 work is justified only if:

1. a mandatory field was discovered to be missing from the matrix;
2. the experiment changes scope;
3. an unresolved field becomes materially necessary to establish a required reconciliation relationship;
4. or a new source materially changes the access status of an already-populated mandatory field.

Otherwise the formal process advances to:

```text
G1 — COMPLETE
      ↓
G2 — FMR-Specific State Universe Reference Layer
```
