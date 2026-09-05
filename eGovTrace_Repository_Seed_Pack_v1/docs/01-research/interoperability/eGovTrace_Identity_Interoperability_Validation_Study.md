# eGovTrace Identity & Interoperability Validation Study

## Research Decision Record

**Status:** APPROVED / NEXT RESEARCH STUDY

**Relationship to G0–G6:** Additive validation study. Does not modify frozen G0/G1/G2 ontology and does not create a new formal gate.

**Purpose:** Empirically test whether eGovTrace's proposed identity, interoperability, provenance, and reconciliation architecture matches how Philippine government systems actually represent public projects, procurement, contracts, budgets, financial execution, implementation, and accountability.

**Primary research question:**

> Can the same real-world public intervention be defensibly followed across Philippine government institutional representations using durable identifiers, evidence-backed joins, and explicit provenance, without treating similarity or missing data as proof?

**Secondary question:**

> Where the State already has or is developing interoperable identifiers and databases, what is the precise architectural role still required from eGovTrace?

---

# 1. Why This Study Is Next

The approved eGovTrace architecture identifies identity continuity as a central capability and explicitly requires empirical verification of national project identity, cross-system identifier persistence, financial execution continuity, lawful evidence acquisition, case-routing authority, outcome availability, and public usability.

The G4 controlled deepening produced a precise current result:

```text
PROJECT IDENTITY
      ↓
BUDGET / UACS
      ↓
      ?
PROCUREMENT
      ↓
      ?
CONTRACT
      ↓
      ?
OBLIGATION
      ↓
      ?
DISBURSEMENT
      ↓
      ?
ACCOUNTING
      ↓
      ?
SETTLEMENT
```

For both neutral FMR candidates, project-to-budget continuity was defensible, but the downstream project-specific financial chain remained unresolved. The G4 score remains 3/8 for both candidates.

The research problem is therefore no longer simply discovery of government records. It is **cross-system identity continuity**.

---

# 2. Architectural Premise Under Test

The current eGovTrace architecture assumes that the State can be represented as connected institutional records while each source retains authority for its own domain.

The proposed identity path is:

```text
FMR / PROJECT REPRESENTATION
        ↓
AGENCY PROJECT ID
        ↓
PROCUREMENT ID / REFERENCE
        ↓
AWARD
        ↓
CONTRACT ID / CONTRACT RECORD
        ↓
PAP / UACS
        ↓
SARO / ALLOTMENT
        ↓
ORS / OBLIGATION
        ↓
DV / DISBURSEMENT DOCUMENT
        ↓
LDDAP-ADA / ADA
        ↓
JEV / ACCOUNTING
        ↓
SETTLEMENT / PAYMENT
```

This study does **not** assume that every arrow exists, is public, or uses the same identifier.

Instead, every transition becomes an empirical test.

---

# 3. External-System Context Now Requiring Verification

Current Philippine reforms materially affect the research question.

DBM identifies UACS as a government-wide harmonized budgetary, treasury, and accounting code structure intended to support financial reporting and consolidation. UACS is therefore relevant as a financial classification/identity component, but its exact role as a durable public-project key must be tested rather than assumed.

The current Public Financial Management reform roadmap also identifies:

- absence of standardized procurement IDs as an existing problem;
- planned mandatory unique contract IDs;
- creation of a Procurement Identification Number through PhilGEPS/mPhilGEPS enhancement;
- planned integration of PhilGEPS with the government's financial-management environment;
- data mapping and pilot/operational exchange work beginning in the 2026–2028 period;
- third-party validation of PhilGEPS data as a reform action.

These developments create an important research possibility:

```text
NO UNIVERSAL PROJECT ID PROVEN YET
                +
EMERGING PROCUREMENT ID STANDARD
                +
FINANCIAL / PROCUREMENT INTEGRATION REFORM
                ↓
EO-TRACE ROLE MUST BE EMPIRICALLY REFINED
```

The study must therefore distinguish between:

1. identifiers that exist today;
2. identifiers being developed;
3. identifiers actually used across systems;
4. identifiers visible to the public;
5. identifiers available only to authorized government users;
6. identifiers capable of proving continuity.

---

# 4. Core Research Rules

The following are frozen for this study:

```text
CONNECTION ≠ CORRUPTION

NOT OBSERVED ≠ ABSENT

ABSENT ≠ MISCONDUCT

UNAVAILABLE ≠ FALSE

IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF

PAYMENT-INSTRUCTION EVIDENCE ≠ PAYMENT-SETTLEMENT EVIDENCE

SEARCH TIME ≠ EVIDENCE DATE

ACTIVE RESEARCH TIME ≠ CALENDAR ELAPSED TIME

SAME NAME ≠ SAME PROJECT

SAME ROUTE ≠ SAME INTERVENTION

SAME UACS ≠ SAME PROCUREMENT OBJECT
```

Every proposed join must identify:

```text
SOURCE RECORD
IDENTIFIER
JOIN BASIS
SUPPORTING ATTRIBUTES
SOURCE AUTHORITY
TEMPORAL VALIDITY
ALTERNATIVE INTERPRETATIONS
CONFIDENCE / STATUS
```

---

# 5. Research Objects

The study will test continuity across five object classes:

### 5.1 Public intervention / project

Examples:

- infrastructure project;
- public service intervention;
- program component;
- procurement-backed project;
- LGU project;
- GOCC/SUC public investment where applicable.

### 5.2 Procurement

Includes, as applicable:

- procurement reference;
- APP entry;
- invitation / notice;
- bid process;
- award;
- BAC action;
- procurement ID.

### 5.3 Contract

Includes:

- contract number;
- contract title;
- winning supplier/contractor;
- contract amount;
- dates;
- NTP;
- variations.

### 5.4 Financial execution

Includes distinct stages:

```text
appropriation
allotment
obligation
DV / disbursement documentation
LDDAP-ADA / ADA
accounting / JEV
settlement
```

### 5.5 Implementation / physical / outcome state

Includes:

- NTP;
- accomplishment;
- inspection;
- acceptance;
- completion;
- physical existence;
- operational state;
- measured outcome.

---

# 6. Source-System Universe to Validate

The initial system inventory should include, at minimum:

```text
DBM
PhilGEPS / PS-DBM
GPPB / GPPB-TSO
DPWH
DA
DOTr
DILG
COA
PPP Center
SEC
DTI
CIAP / PCAB
BIR
CDA
Insurance Commission
LGUs
Relevant agency procurement systems
Relevant agency project systems
Relevant government financial-management representations
```

This is not yet a claim that all systems are directly interoperable.

The study tests whether and how they connect.

---

# 7. Identifier Taxonomy

Every recovered identifier must be classified.

## Type A — Real-world object identifier

Identifier explicitly intended to identify the physical/public intervention.

## Type B — Institutional project identifier

Identifier assigned by an implementing institution.

## Type C — Procurement identifier

Identifier assigned to a procurement process or procurement object.

## Type D — Contract identifier

Identifier assigned to the legal contract.

## Type E — Financial classification identifier

Examples include PAP/UACS-related representations.

## Type F — Financial transaction identifier

Examples include SARO, ORS, DV, LDDAP-ADA/ADA, JEV or equivalent references.

## Type G — Evidence/document identifier

A document ID, publication reference, repository ID, or archival identifier.

## Type H — Emerging / reform identifier

Identifiers defined or being implemented through current reform initiatives but not yet proven as universally operational.

---

# 8. Identifier Properties to Measure

For each identifier, record:

```text
issuer
format
scope
object grain
uniqueness
persistence
reuse behavior
public visibility
internal visibility
historical stability
cross-system presence
cross-system linkage mechanism
retirement / supersession behavior
```

Important distinction:

> An identifier may be unique inside one system while still being unsuitable as a cross-system project identity.

---

# 9. Join-Type Taxonomy

Every observed transition must be classified as one of the following.

### J1 — Direct authoritative link

One source explicitly references the identifier of another source/object.

### J2 — Deterministic structured link

A documented machine-readable relationship exists between systems.

### J3 — Composite evidentiary join

Continuity is established using several attributes that jointly provide strong support.

Example:

```text
project title
+
location
+
implementing office
+
fiscal year
+
amount
+
contract reference
```

### J4 — Corroborative association

Multiple attributes strongly suggest continuity but do not independently prove it.

### J5 — Weak similarity

Name, amount, location, or code similarity only.

J5 must never be promoted automatically to identity proof.

### J6 — Rejected join

Evidence demonstrates that the apparently matching records represent different objects.

The Candidate 1 UACS/Fire Alarm near-miss is a standing example of J6.

---

# 10. Primary Hypotheses

## H1 — There is no single universal public project identifier across all relevant Philippine government systems.

This is a testable hypothesis, not a frozen fact.

### Falsification

H1 is weakened or falsified if a durable identifier is found to operate across the tested system universe with documented scope and continuity.

---

## H2 — Procurement identity is more standardized than project identity.

### Falsification

If project identities routinely persist directly into procurement, contract, and financial execution without reconciliation work, the hypothesis weakens.

---

## H3 — Cross-system continuity is commonly achieved through composite joins rather than a single universal key.

### Falsification

If most tested transitions use direct machine-readable or authoritative identifiers, H3 weakens.

---

## H4 — Financial execution contains distinct identifiers and evidence stages that cannot safely be collapsed into one payment state.

### Falsification

If authoritative system documentation demonstrates that the proposed distinction is incorrect for a specific domain, the domain model must be revised.

---

## H5 — Emerging procurement/financial integration reforms will improve interoperability but will not automatically solve historical project identity continuity.

### Falsification

If reform architecture explicitly provides historical, durable, cross-system project continuity for the tested cases, revise accordingly.

---

## H6 — eGovTrace's durable architectural value lies in reconciliation, provenance, temporal continuity, and evidence-gap management rather than replacing source systems.

### Falsification

If existing state systems already provide the complete cross-system evidence-backed lifecycle with accessible historical provenance and appropriate role separation, the eGovTrace architecture would need to be narrowed substantially.

---

# 11. Three-Project Validation Design

A minimum three-case design will be used.

## Case A — Existing FMR candidate

Use one of the existing neutral FMR candidates.

Preferred initial candidate:

```text
7afb3618-2c25-499f-8147-862d36c59ee4
Cabarasan to Dao FMR
Gamay, Northern Samar
2021-R8-NOS-INFRA-FMRDP-FMR-00547
₱12,500,000
```

Reason for preference:

It has a stronger agency-origin implementation/contract anchor through A-Cube Construction and Supply, while its primary procurement and financial execution chain remains unresolved.

This is a research-efficiency choice for validation, not a change to neutral G3 selection.

## Case B — National-agency project outside FMR

Select a DPWH/DA/DOTr or equivalent project with a publicly visible procurement and contract chain.

Selection criteria:

```text
publicly recoverable project identity
public procurement representation
contract reference
budget representation
implementation record
sufficient temporal depth
```

## Case C — Subnational / LGU project

Select a project where the implementing entity is a city, municipality, or province.

Purpose:

Test whether the architecture survives a different legal/institutional environment.

Selection must not use anomaly, contractor reputation, controversy, or expected outcome as selection criteria.

---

# 12. Standard Trace Protocol for Every Case

Every case must receive the same baseline protocol.

### Step 1 — Freeze source representation

Capture:

```text
source URL
retrieval timestamp
source version if visible
record identifier
full relevant field set
snapshot / hash when practical
```

### Step 2 — Establish project identity

Record:

```text
project title
project code
implementing agency
implementing office
location
fiscal year
amount
program
PAP/UACS
```

### Step 3 — Recover procurement representation

Search:

```text
project title variants
project code
procurement reference
APP
PhilGEPS
agency procurement portal
```

### Step 4 — Recover contract identity

Search for:

```text
contract number
award
NOA
NTP
contractor
contract amount
contract dates
```

### Step 5 — Trace financial execution

Search for:

```text
SARO / allotment
ORS
DV
LDDAP-ADA / ADA
JEV
settlement
```

### Step 6 — Trace implementation

Search for:

```text
NTP
progress reports
inspection
billing
acceptance
completion
```

### Step 7 — Trace physical evidence

Where lawfully and practically possible:

```text
inspection records
geospatial evidence
site documentation
asset registry
agency photos
third-party corroboration
```

### Step 8 — Trace outcome

Determine whether:

```text
expected outcome
measurement method
observed outcome
measurement date
source
uncertainty
```

can be established.

---

# 13. Standard Evidence State Vocabulary

Each relationship must receive one of these states:

```text
CONFIRMED
DOCUMENTED PRIMARY
DOCUMENTED AGENCY-ORIGIN SECONDARY
DOCUMENTED OBSERVATION
INFERRED / ANALYTICAL
NOT ESTABLISHED
UNRESOLVED
NOT OBSERVED
NOT PUBLICLY AVAILABLE
NOT EXECUTED
REJECTED JOIN
```

These states are mutually informative and must not be silently collapsed.

---

# 14. Bridge Identifier Matrix

For every case, create a matrix with this structure:

| From | To | Candidate bridge | Bridge type | Evidence | Status | Alternative interpretation |
|---|---|---|---|---|---|---|
| Project | Procurement | project code / procurement reference | J1–J6 | source | status | text |
| Procurement | Contract | award / contract no. | J1–J6 | source | status | text |
| Contract | PAP/UACS | contract financial coding | J1–J6 | source | status | text |
| PAP/UACS | SARO | allotment reference | J1–J6 | source | status | text |
| SARO | ORS | ORS number / RAOD relation | J1–J6 | source | status | text |
| ORS | DV | transaction/document reference | J1–J6 | source | status | text |
| DV | LDDAP-ADA/ADA | disbursement reference | J1–J6 | source | status | text |
| ADA | JEV | accounting relation | J1–J6 | source | status | text |
| JEV | Settlement | settlement evidence | J1–J6 | source | status | text |

The matrix is the central validation artifact.

---

# 15. Public-vs-Government Availability Matrix

For every bridge record:

| Evidence element | Public | Publicly searchable | Agency repository | Authorized/internal | FOI candidate | Notes |
|---|---|---|---|---|---|---|
| Project identity | | | | | | |
| Procurement ID | | | | | | |
| Contract | | | | | | |
| SARO | | | | | | |
| ORS | | | | | | |
| DV | | | | | | |
| LDDAP-ADA / ADA | | | | | | |
| JEV | | | | | | |
| Settlement | | | | | | |
| Inspection | | | | | | |
| Completion | | | | | | |
| Outcome | | | | | | |

This matrix is necessary because lack of public evidence is not equivalent to absence of the underlying government record.

---

# 16. Government-System Integration Questions

For each system, determine:

```text
Does it expose an API?
Does it publish datasets?
Does it publish downloadable documents?
Does it retain historical versions?
Does it expose stable identifiers?
Can another system reference those identifiers?
Does it use a shared identifier?
Does it support machine-readable exchange?
Is the exchange public or authorized-only?
What is the authoritative source status?
```

These questions must be answered from current official documentation or direct empirical observation.

---

# 17. Researching Emerging Procurement Identity

The 2024–2028 PFM reform material explicitly identifies a planned Procurement Identification Number and mandatory unique contract IDs, together with planned PhilGEPS/financial-management integration.

Therefore the study must establish the status of the initiative as of the research execution date:

```text
POLICY ONLY
DESIGN
DEVELOPMENT
PILOT
PARTIAL OPERATION
OPERATIONAL
MANDATORY
NATIONWIDE
```

Do not treat a roadmap target as an already operational national capability.

This distinction is critical.

---

# 18. Historical Continuity Test

A system can be interoperable for new records while historical records remain fragmented.

Therefore each case must separately test:

```text
CURRENT RECORD CONTINUITY
vs.
HISTORICAL RECORD CONTINUITY
```

For identifiers that changed over time, record:

```text
old identifier
new identifier
change date
reason
successor relation
source proving the transition
```

No identifier should be retroactively normalized without evidence.

---

# 19. Temporal Rules

Every recovered record must retain:

```text
record date
real-world event date
source publication/update date
research observation date
```

A 2026 retrieval of a 2021 document remains evidence dated 2021.

Standing rule:

> SEARCH TIME ≠ EVIDENCE DATE

Research effort must separately log:

```text
execution_start_utc
execution_end_utc
calendar_elapsed
active_research_time
```

---

# 20. False-Join and Adversarial Tests

The study must actively attempt to create and then reject false joins.

At minimum, test:

```text
same project title
same amount
same location
same contractor
same UACS
same route
same fiscal year
same implementing office
```

individually and in combinations.

The purpose is to determine the minimum evidentiary combination needed to establish identity.

The known FMR false join involving UACS `310203211128000.EAO` and the unrelated Fire Alarm and Detection System is retained as the canonical adversarial example.

---

# 21. Success Criteria

The study PASSES as an architectural validation if it produces all of the following:

### S1 — Identifier inventory

A documented taxonomy of actual identifiers in the tested system universe.

### S2 — Transition matrix

Each tested lifecycle transition is classified by join type and evidence strength.

### S3 — Reproducible case traces

At least two of three cases achieve a reproducible multi-system trace beyond project → budget.

### S4 — Failure localization

Where continuity fails, the study identifies exactly which transition fails and why.

### S5 — Public/internal distinction

The study distinguishes evidence that is publicly recoverable from evidence that likely exists only in authorized systems.

### S6 — Historical distinction

The study separately evaluates current and historical continuity.

### S7 — False-join resilience

The method successfully rejects known or constructed similarity-based false joins.

### S8 — Architectural role clarity

The study can specify where eGovTrace adds value beyond existing portals and government integration initiatives.

---

# 22. Failure / Falsification Conditions

The current architecture should be reconsidered if empirical evidence demonstrates that:

1. an existing authoritative system already provides complete cross-system identity continuity for the tested lifecycle;
2. project identity is already universally durable across the relevant government system universe;
3. eGovTrace cannot materially improve provenance or evidence-gap visibility without duplicating authoritative systems;
4. the proposed reconciliation layer introduces more ambiguity than it resolves;
5. legal or governance restrictions make the proposed role separation infeasible;
6. the architecture cannot distinguish government facts from analytical inference with sufficient provenance.

A failure is a valid research result.

---

# 23. Expected Findings Matrix

The study should produce one of four outcomes for each transition:

```text
A. DIRECTLY INTEROPERABLE

B. INTEROPERABLE WITH DOCUMENTED RECONCILIATION

C. RECONCILABLE ONLY THROUGH EVIDENCE-BASED MANUAL / ANALYTICAL JOIN

D. CURRENTLY UNRESOLVED / NOT PUBLICLY RECONCILABLE
```

This classification is more useful than a simple “interoperable / not interoperable” binary.

---

# 24. Implications for eGovTrace Architecture

## If A dominates

eGovTrace should focus more on:

```text
cross-system evidence presentation
provenance
temporal versioning
citizen usability
control monitoring
```

and less on identity reconstruction.

## If B dominates

Identity reconciliation remains central, but much of it can rely on documented government bridges.

## If C dominates

Identity-resolution and evidence/provenance become foundational eGovTrace capabilities.

## If D dominates

Evidence acquisition, lawful access pathways, unresolved-state modeling, and source-custody metadata become critical.

---

# 25. Expected Role of eGovTrace After Validation

The study must answer whether eGovTrace should function primarily as:

```text
IDENTITY RECONCILIATION LAYER
+
EVIDENCE / PROVENANCE LAYER
+
TEMPORAL STATE LAYER
+
CONTROL / ASSURANCE LAYER
+
PUBLIC ACCOUNTABILITY VIEW
+
AUTHORIZED INVESTIGATION SUPPORT
```

rather than:

```text
replacement government database
```

The present architecture favors the former, but this study must empirically validate that position.

---

# 26. Relationship to G4

This study does not automatically change the frozen G4 score.

The current neutral candidates remain:

```text
Candidate 1 = 3/8
Candidate 2 = 3/8
```

Evidence recovered during this study may support later versioned updates to individual relationships, but no silent retroactive rescore is allowed.

The FMR neutral selection remains frozen.

---

# 27. Relationship to PIP-CTRL

The Planning / Investment / Project Control research remains a separate stream.

This study may discover that planning and investment identifiers are important upstream bridges:

```text
PLAN
↓
INVESTMENT PROGRAM
↓
BUDGET
↓
PROJECT
↓
PROCUREMENT
```

However, no new ontology or formal gate is created merely because such relationships are observed.

---

# 28. Relationship to OCP

Obligation Compliance Persistence can use the interoperability results once financial and administrative obligations can be traced reliably.

The sequence remains:

```text
obligation created
↓
expected fulfillment
↓
observed state
↓
variance
↓
explanation
↓
escalation
↓
resolution
↓
closure
```

Missing observability remains distinct from non-compliance.

---

# 29. Evidence Acquisition Ladder

Every unresolved bridge should be assigned the highest evidence-acquisition level actually attempted:

```text
LEVEL 0 — PUBLIC PAGE
LEVEL 1 — PUBLIC DATASET
LEVEL 2 — AGENCY DOCUMENT REPOSITORY
LEVEL 3 — STRUCTURED API / OPEN-DATA ENDPOINT
LEVEL 4 — CROSS-AGENCY PUBLISHED RECORD
LEVEL 5 — FOI REQUEST
LEVEL 6 — AUTHORIZED GOVERNMENT ACCESS
LEVEL 7 — RESTRICTED AUDIT / INVESTIGATIVE EVIDENCE
```

A level number is not itself an evidence-quality score.

It describes acquisition channel.

FOI must be explicitly labeled:

```text
FOI IDENTIFIED AS NEXT-EVIDENCE CHANNEL
```

until actually filed.

---

# 30. Case Selection Controls

The three cases must not be selected because they appear suspicious.

Do not select based on:

```text
controversy
political reputation
known allegations
contractor reputation
high anomaly score
expected negative outcome
```

Selection should favor representativeness and traceability variation.

This protects the experiment from outcome or suspicion leakage.

---

# 31. Research Logging Requirements

Every material search session must record:

```text
execution start
execution end
active research time
sources searched
queries used
records recovered
records rejected
joins accepted
joins rejected
unresolved transitions
access failures
legal/access constraints
```

For every accepted join:

```text
join_id
from_record
from_identifier
to_record
to_identifier
join_type
evidence_refs
source_authority
temporal_validity
reasoning note
status
```

---

# 32. Deliverables of This Study

The study should ultimately produce:

### D1 — System Inventory

`eGovTrace_System_Interoperability_Inventory.md`

### D2 — Identifier Registry

`eGovTrace_Identifier_Registry.md`

### D3 — Three-Case Trace Dataset

`eGovTrace_Interoperability_Trace_Cases.json`

### D4 — Bridge Matrix

`eGovTrace_Cross_System_Bridge_Matrix.md`

### D5 — False-Join Test Report

`eGovTrace_False_Join_Adversarial_Test.md`

### D6 — Validation Decision Record

`eGovTrace_Identity_Interoperability_Validation_Decision.md`

The present document is the protocol/master study specification. These are execution artifacts, not required to be created before the protocol is approved.

---

# 33. Execution Order

The controlled sequence is:

```text
1. VERIFY current official interoperability / identifier architecture
                    ↓
2. Build system inventory
                    ↓
3. Build identifier registry
                    ↓
4. Select three representative projects
                    ↓
5. Execute identical baseline trace protocol
                    ↓
6. Build bridge matrix
                    ↓
7. Run false-join adversarial tests
                    ↓
8. Evaluate public vs authorized evidence boundary
                    ↓
9. Evaluate historical continuity
                    ↓
10. Determine architectural implications
                    ↓
11. Produce validation decision record
```

---

# 34. Current External Research Anchors

The current official-source landscape establishes several important starting facts for the study:

- DBM describes UACS as a government-wide harmonized budgetary, treasury, and accounting code structure.
- The PFM Reform Roadmap 2024–2028 midterm material identifies absence of standardized procurement IDs, proposes mandatory unique contract IDs and a Procurement Identification Number, and proposes PhilGEPS integration with the government's financial-management environment.
- GPPB has described the New Government Procurement Act's whole-government approach to database interconnectivity among procurement, contractor, business, tax, ownership and LGU-related data sources.
- PS-DBM participated in a 2026 multilateral e-GP assessment of PhilGEPS, indicating that procurement-system interoperability and technical architecture remain an active reform area rather than a fully settled endpoint.

These are research anchors, not proof that the target interoperability architecture is already operational nationwide.

---

# 35. Research Decision Standard

At completion, the study must make one explicit decision:

```text
ARCHITECTURE VALIDATED
```

or

```text
ARCHITECTURE PARTIALLY VALIDATED — REVISION REQUIRED
```

or

```text
ARCHITECTURE FALSIFIED / NARROWED
```

The decision must be based on observed evidence, not on whether the desired eGovTrace architecture appears technically attractive.

---

# 36. Bottom-Line Research Position

The current evidence suggests that the central technical problem is not a lack of government data in the abstract.

It is the **identity and evidence continuity problem created when one real-world intervention is represented differently across project, procurement, contract, budget, accounting, implementation, audit, and outcome systems**.

The Philippines is also actively working on procurement identifier standardization and procurement/financial-management integration. That makes this validation study especially timely: eGovTrace should not duplicate reforms that government is already implementing.

Instead, the research must discover what remains unresolved after those reforms are accounted for.

The key question is therefore:

> **What interoperability does the Philippine State already possess, what interoperability is being built, what continuity remains broken across historical and current records, and what exact accountability function should eGovTrace perform that existing government systems do not already provide?**

---

# 37. One-Sentence Study Definition

> **The eGovTrace Identity & Interoperability Validation Study empirically tests whether Philippine government project, procurement, contract, financial, implementation, and accountability records can be defensibly connected across institutional systems, identifies where identity continuity succeeds or breaks, and determines the precise role eGovTrace should play without replacing authoritative government systems.**
