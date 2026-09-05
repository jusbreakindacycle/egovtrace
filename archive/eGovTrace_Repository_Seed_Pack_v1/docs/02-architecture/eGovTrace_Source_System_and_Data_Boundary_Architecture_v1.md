# eGovTrace Source-System and Data-Boundary Architecture v1

**Status:** APPROVED WORKING ARCHITECTURE  
**Relationship to G0–G6:** Additive to the approved eGovTrace architecture; not a new formal gate.  
**Primary purpose:** Define what eGovTrace should reference, ingest, derive, store, cache, link to, or explicitly keep outside the central platform while preserving source-system authority.

---

## 1. Executive Decision

The Philippine State already operates multiple authoritative information environments. eGovTrace must **not** become a second government-wide master database by copying everything into one store.

Instead:

```text
SOURCE SYSTEMS
     ↓
SOURCE AUTHORITY
     ↓
ACCESS / INGESTION
     ↓
eGovTrace RECONCILIATION
     ↓
IDENTITY / EVENT / EVIDENCE GRAPH
     ↓
PUBLIC + ASSURANCE VIEWS
```

The source system remains authoritative for the fact it legally owns. eGovTrace stores enough information to preserve provenance, reproduce the reasoning behind a relationship, render a useful accountability record, and identify the source of truth.

---

## 2. Four Data Treatments

Every source field must be classified into one of four primary treatments.

### A. Reference

eGovTrace stores a stable pointer, identifier, URL, source metadata, and reconciliation metadata.

Use when the source is public or dynamically maintained and full replication provides little value.

### B. Evidence Snapshot

eGovTrace stores a time-bounded representation of a public record/document/page/API response sufficient to preserve what was observed.

Use when historical state matters and source systems can change.

### C. Derived Record

eGovTrace computes a new record from source data, such as:

- identity bridge;
- timeline event;
- control state;
- anomaly signal;
- evidence coverage;
- comparison statistic.

Derived records must preserve input provenance and rule/version metadata.

### D. Restricted / External Custody

eGovTrace stores only metadata indicating that the evidence exists, its custodian, access class, and acquisition pathway.

The underlying sensitive record remains in the lawful custodian environment unless a specific legal basis and security architecture authorize controlled storage.

---

## 3. Authority Model

Every object must have explicit metadata for:

```text
source_system
source_institution
source_record_id
source_record_version (if available)
source_url / access path
source_date
source_update_date (if available)
observation_date
access_class
custodian
legal_basis / access basis
```

### Standing rule

> **SEARCH TIME ≠ EVIDENCE DATE**

Historical state must remain temporally preservable.

---

## 4. Source-System Classes

### 4.1 Public finance

Representative sources:

- DBM;
- Bureau of the Treasury;
- agency financial systems where lawfully accessible;
- LGU financial systems/disclosures;
- government financial institutions where appropriate.

Potential data:

```text
appropriation
allotment
NCA/NTA
budget execution
obligation
disbursement
payment / settlement
financial reports
```

Default treatment:

```text
public reports → Reference + Evidence Snapshot
restricted transaction records → Restricted / External Custody unless lawful access exists
```

### 4.2 Procurement

Representative sources:

- PhilGEPS;
- GPPB;
- procuring-entity procurement portals;
- agency BAC records;
- PCAB / CIAP;
- contractor registration records;
- SEC/CDA/BIR/Insurance Commission records where lawfully available.

Potential data:

```text
bid notice
reference number
solicitation number
ABC
award
NOA
contract
NTP
procurement status
supplier/contractor identity
```

Default treatment:

```text
public procurement → Reference + Evidence Snapshot
internal BAC / post-qualification records → Restricted unless lawfully disclosed
```

### 4.3 Audit / assurance

Representative sources:

- COA;
- Ombudsman;
- agency internal audit units;
- appropriate oversight bodies.

Potential data:

```text
audit observation
recommendation
management response
resolution state
fraud-audit referral
case reference
```

Default treatment:

```text
public audit reports → Reference + Evidence Snapshot
confidential investigation material → Restricted / External Custody
```

### 4.4 Government transparency portals

Representative sources:

- Open.gov.ph gateway;
- DPWH transparency/FMR sources;
- agency transparency portals;
- GOCC/authority transparency pages;
- LGU transparency/disclosure portals.

Role:

> Discovery and public evidence surface, not automatically the canonical source of every underlying fact.

### 4.5 FOI

FOI is treated as an **evidence-acquisition pathway**, not merely a document repository.

```text
QUESTION
  ↓
REQUEST
  ↓
CUSTODIAN
  ↓
RESPONSE
  ↓
DOCUMENT / DATA
  ↓
EVIDENCE OBJECT
```

The platform must record:

```text
request_id
request_date
custodian
request_scope
response_date
response_state
document/data received
disclosure basis / limitations
```

### 4.6 Statistics and administrative data

Representative sources:

- PSA OpenSTAT / PXWeb / administrative statistics;
- CBMS-related aggregate information;
- government statistical releases;
- agency statistics.

Use primarily for:

```text
outcomes
baselines
comparators
population context
trade flows
labor/economic context
service demand
```

Individual-level sensitive records remain restricted unless legally authorized.

### 4.7 Geospatial / physical systems

Representative sources may include:

- NAMRIA;
- PAGASA;
- PHIVOLCS;
- MGB;
- DENR;
- DPWH;
- DOTr authorities;
- LGU GIS/asset systems;
- other lawful geospatial data providers.

Default treatment:

```text
public layers → Reference + Snapshot
high-volume spatial tiles → external/service architecture where possible
sensitive exact locations → restricted/generalized
```

### 4.8 Operational service systems

Examples:

- permits;
- licensing;
- customs processing;
- airport operations;
- business registration;
- social services;
- health services;
- education services;
- enforcement systems.

Default rule:

> eGovTrace should not replicate operational transaction databases simply to create a mirror.

Instead, it should connect to the minimum lawful data required to answer an accountability question.

---

## 5. Data-Boundary Decision Matrix

| Data type | Default treatment | Why |
|---|---|---|
| Public project metadata | Reference + Snapshot | Accountability history |
| Public procurement notices | Reference + Snapshot | Reproducibility |
| Public contract metadata | Reference + Snapshot | Legal commitment trace |
| Public audit reports | Reference + Snapshot | Assurance history |
| Public statistics | Reference + derived | Comparative context |
| Public GIS layers | Reference + cache/snapshot as needed | Spatial trace |
| Citizen reports | eGovTrace-owned evidence/event record | Core product function |
| Derived identity bridges | Derived record | Cross-system reconciliation |
| Control signals | Derived record | Analytics |
| Internal financial transaction detail | Restricted by default | Sensitivity / legal authority |
| Confidential investigations | External custody | Legal / operational sensitivity |
| Personal citizen records | Minimize; restricted by default | Privacy |
| Credentials/secrets/private keys | Never centralize as ordinary data | Security |
| Agency source-of-truth master databases | Do not replace | Institutional authority |

---

## 6. Source-of-Truth Rule

For every fact, eGovTrace must know:

```text
WHO OWNS THE RECORD?
WHAT RECORD PROVES IT?
WHEN WAS IT TRUE?
WHEN WAS IT OBSERVED?
HAS IT CHANGED?
WHAT JOIN CONNECTS IT TO ANOTHER RECORD?
```

If the source is updated, eGovTrace must preserve the prior observation where legally and technically appropriate.

---

## 7. Identity Architecture

There is no assumption of one universal national identifier.

Instead:

```text
NATIVE IDENTIFIERS
      ↓
IDENTITY BRIDGE
      ↓
eGovTrace OBJECT ID
```

Example:

```text
FMR CODE
UACS/PAP
PhilGEPS REFERENCE
CONTRACT NUMBER
ORS
B/L
PERMIT NUMBER
PAYMENT REFERENCE
PROJECT ID
```

Each bridge must have:

```text
bridge_id
source_object_a
source_object_b
basis_type
basis_detail
evidence_ids
confidence
created_at
validity_period
adjudication_state
```

Standing rule:

> **IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF**

---

## 8. Event Architecture

Records should be normalized into events where possible.

Examples:

```text
BUDGET_APPROVED
BID_POSTED
BID_CLOSED
AWARD_MADE
CONTRACT_SIGNED
NTP_ISSUED
OBLIGATION_RECORDED
DISBURSEMENT_RECORDED
PAYMENT_SETTLED
INSPECTION_COMPLETED
PROJECT_REPORTED_COMPLETE
SERVICE_APPROVED
PERMIT_ISSUED
CUSTOMS_DECLARATION_FILED
CUSTOMS_ASSESSED
CUSTOMS_PAYMENT_RECORDED
CARGO_RELEASED
CITIZEN_REPORT_SUBMITTED
GOVERNMENT_RESPONSE_RECEIVED
CASE_RESOLVED
```

Each event requires:

```text
event_id
event_type
actor
object
source
source_record_id
event_date
observation_date
provenance
```

---

## 9. Operational Control Model

The graph separates:

```text
EXPECTED CONTROL
        ↓
OBSERVED EVENT / STATE
        ↓
VARIANCE
        ↓
CONTROL SIGNAL
```

Control signals include:

```text
TIMING_EXCEPTION
SEQUENCE_BREAK
IDENTITY_BRIDGE_GAP
DOWNSTREAM_EVIDENCE_GAP
STATUS_TRANSITION_EXCEPTION
CONCENTRATION_SIGNAL
RECURRENCE_SIGNAL
OUTCOME_EVIDENCE_GAP
```

A signal never changes the source record.

A signal does not equal wrongdoing.

---

## 10. Public vs Derived Data

### Public facts

Examples:

```text
Agency publicly reports project completed.
Contract publicly lists contractor.
DBM publicly reports budget amount.
```

### Derived state

Examples:

```text
project-to-contract bridge confidence = high
payment continuity = unresolved
control timing = review candidate
```

The UI and APIs must label derived information clearly.

---

## 11. Ingestion Patterns

### Pattern A — API pull

Use when an authorized stable API exists.

```text
source API
  ↓
connector
  ↓
schema validation
  ↓
raw snapshot
  ↓
normalization
  ↓
provenance
```

### Pattern B — Public document retrieval

```text
public URL
  ↓
download
  ↓
content hash
  ↓
metadata
  ↓
extract
  ↓
evidence object
```

### Pattern C — Manual/FOI acquisition

```text
request
  ↓
response
  ↓
received file/data
  ↓
hash + provenance
  ↓
restricted/public classification
  ↓
reconciliation
```

### Pattern D — Source link only

Use when:

- replication is unnecessary;
- source is dynamic;
- technical/legal constraints prohibit copying;
- a stable public source can be referenced.

---

## 12. Snapshotting and Versioning

Every important public evidence snapshot should support:

```text
snapshot_id
source_url
retrieval_timestamp
content_hash
mime_type
source_update_date (if available)
parser/version
observation_window
```

This prevents a later source update from silently rewriting history.

---

## 13. APIs

The external API architecture should distinguish:

```text
PUBLIC READ API
PUBLIC REPORT API
SOURCE CONNECTOR API
INTERNAL GRAPH API
ASSURANCE API
ADMIN / GOVERNANCE API
```

No internal restricted field should become public merely because the underlying object is otherwise public.

APIs should expose provenance metadata where appropriate.

The 2026 E-Governance Act IRR requires government websites to provide access to public information via APIs and requires covered systems to comply with the Philippine Government Interoperability Framework (PGIF). https://lawphil.net/statutes/repacts/ra2026/irr_12254_2026.html

---

## 14. What eGovTrace Should NOT Centralize

The following are rejected as default centralization targets:

1. Entire agency transactional databases merely for duplication.
2. Raw citizen personal data not necessary for accountability.
3. Confidential investigative files.
4. Authentication secrets and private keys.
5. Full internal financial ledgers when a lawful summarized/bridged representation is sufficient.
6. Full operational copies of systems that can be securely queried or referenced.
7. Unverified citizen allegations represented as factual records.
8. Data whose central storage would violate legal, contractual, sovereignty, or security constraints.

---

## 15. What eGovTrace SHOULD Centralize

Centralize where it is necessary to make cross-system accountability possible:

```text
canonical eGovTrace object IDs
source identity metadata
identity bridges
provenance metadata
evidence hashes/snapshots where lawful
event normalization
control rules
rule versions
control states
signal outputs
case/report identifiers
routing state
public response/resolution history
research/audit logs
```

The core principle is:

> **Centralize the accountability relationship, not every underlying government record.**

---

## 16. Case Routing Boundary

Routing should be decision support first.

Each signal/case may contain:

```text
likely_custodian
candidate_authority
basis
required_evidence
routing_confidence
legal_scope_note
```

The system must not invent legal authority.

Official action remains with the competent institution.

---

## 17. Source Custodian Registry

Every source should have a registry record:

```yaml
source_id:
institution_id:
source_name:
source_type:
authority_domain:
public_access:
api_available:
document_access:
foi_available:
restricted_access:
identifier_types:
update_frequency:
historical_availability:
data_quality_notes:
legal_constraints:
security_classification:
owner_contact:
```

This registry becomes the foundation for the national source map.

---

## 18. Data Quality States

Every imported/referenced record should support:

```text
OBSERVED
NORMALIZED
VALIDATED
RECONCILED
UNRESOLVED
STALE
RETRACTED
SUPERSEDED
RESTRICTED
UNAVAILABLE
```

`UNAVAILABLE` does not mean false.

`NOT OBSERVED` does not mean absent.

---

## 19. Security Architecture

Minimum security domains:

```text
Identity & access
Encryption
Key management
Audit logs
Integrity monitoring
Secrets management
Least privilege
Data minimization
Backups
Disaster recovery
Incident response
```

Public and restricted data paths must be logically separated.

The government assurance workspace must never inherit public permissions merely because it uses the same graph.

---

## 20. eGovPH Integration Boundary

The integration should be API-based and standards-aligned.

Potential integration functions:

```text
deep linking
authentication handoff
notifications
citizen profile references (minimal)
report status
service-context handoff
```

Potentially sensitive graph fields stay in eGovTrace unless and until an authorized integration explicitly exposes them.

The architecture must align with the national E-Government Master Plan / PGIF rather than creating an independent interoperability regime.

---

## 21. Example: Project Trace

```text
DPWH / FMR SOURCE
       ↓
PROJECT RECORD
       ↓
FMR CODE
       ↓
IDENTITY BRIDGE
       ↓
DBM BUDGET RECORD
       ↓
PHILGEPS PROCUREMENT
       ↓
CONTRACT
       ↓
FINANCIAL RECORDS
       ↓
IMPLEMENTATION
       ↓
INSPECTION
       ↓
AUDIT
       ↓
OUTCOME
```

Source systems remain authoritative at each stage.

eGovTrace preserves the bridges and evidence needed to reconstruct the lifecycle.

---

## 22. Example: Customs Trace

```text
B/L
 ↓
DISCHARGE
 ↓
GOODS DECLARATION
 ↓
ASSESSMENT
 ↓
PAYMENT
 ↓
RELEASE INSTRUCTION
 ↓
PHYSICAL RELEASE
```

The B/L is not the declaration number.

The declaration is not the payment settlement.

The payment is not the release event.

Each bridge must be separately proven.

---

## 23. Example: LGU Daily Operation

```text
APPLICATION
 ↓
IDENTITY / ELIGIBILITY
 ↓
DOCUMENTS
 ↓
ASSESSMENT
 ↓
INSPECTION
 ↓
DECISION
 ↓
PAYMENT
 ↓
PERMIT / SERVICE RELEASE
 ↓
APPEAL / REVIEW
```

The eGovTrace model should capture the minimum lawful evidence necessary to answer:

> Did the transaction follow the expected control sequence, and can the important events be reconciled?

It should not replicate every operational row merely because replication is technically possible.

---

## 24. Cost / Scale Principle

As scale increases, prefer:

```text
reference over duplicate
snapshot over permanent raw copy
aggregate over unnecessary row-level replication
derived state over repeated transformation
source query over stale local mirror where legally and technically reliable
```

Exception:

Where historical reproducibility, legal evidence preservation, or auditability requires a snapshot, preserve it.

---

## 25. Governance of Derived Intelligence

Every derived object must contain:

```text
rule_id
rule_version
input_object_ids
input_evidence_ids
execution_timestamp
model/version (if AI-assisted)
confidence
human_adjudication state
```

This makes AI and analytics reproducible and auditable.

---

## 26. Architectural Decisions Frozen

1. Source systems remain authoritative.
2. eGovTrace is not a replacement database.
3. Domain-native identifiers remain valid and distinct.
4. Identity bridges are first-class objects.
5. Evidence provenance is mandatory.
6. Historical public states should be snapshot-preservable.
7. Derived analytics are not source facts.
8. Restricted data is not public by default.
9. Citizen reports are claims/observations until established.
10. eGovPH integration is an API/deep-link/gateway relationship, not backend ownership transfer.
11. The public API and assurance API must be separately authorized.
12. Centralize accountability relationships, not every source record.

---

## 27. Research Status

**ARCHITECTURE:** APPROVED WORKING BASELINE  
**IMPLEMENTATION:** NOT YET AUTHORIZED BY THIS DOCUMENT ALONE  
**NEXT ENGINEERING TASK:** Source-system connector specification + source custody registry + API/data-classification matrix.
