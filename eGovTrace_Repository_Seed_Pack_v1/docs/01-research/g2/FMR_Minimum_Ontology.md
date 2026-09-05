# FMR Minimum Ontology

**Project:** Philippine State Control & Assurance Universe / eGovTrace  
**Phase:** Phase 1A — FMR Experiment Readiness  
**Gate:** G0 — Minimum FMR Ontology and Identity Model  
**Status:** Approved G0 design / research ontology  
**Date:** September 1, 2026  

---

# 1. Purpose and Scope

The FMR Reconciliation Experiment is not attempting to model the entire Philippine State.

It tests whether records maintained by different institutions can be reconciled into an evidence-backed representation of the same real-world Farm-to-Market Road intervention and its related entities, events, states, and physical conditions.

The ontology therefore exists to answer five questions:

1. **What are the things being compared?**
2. **What are the institutional representations of those things?**
3. **What events change or describe their state over time?**
4. **How do we determine whether records refer to the same thing?**
5. **How do we preserve the distinction between source assertion, evidence, inference, and finding?**

The ontology is intentionally minimal. It must be expanded only when the actual FMR trace demonstrates a material requirement that cannot be represented adequately with the current model.

This is a **research ontology**, not a production database schema and not the final eGovTrace ontology.

---

# 2. Foundational Principles

## 2.1 Same name is not identity

`Same name ≠ same entity`

Two records with similar or identical names may describe different projects, contracts, organizations, or road segments.

## 2.2 Different name is not necessarily different identity

`Different name ≠ different entity`

An entity may appear under abbreviations, spelling variants, revised descriptions, local naming conventions, or different source-system identifiers.

## 2.3 A source record is not automatically the real-world thing

A database row, document, webpage, spreadsheet entry, photograph, GIS record, or report is a representation or record. It may describe an entity, event, condition, or claim. It is not automatically the entity itself.

## 2.4 Reality and representation must remain separate

The central experimental distinction is:

```text
REAL-WORLD OBJECT / EVENT / CONDITION
                 ↑
                 │ described or observed by
                 │
      INSTITUTIONAL REPRESENTATIONS
                 ↑
                 │ contained in
                 │
            SOURCE RECORDS
```

A government project record can describe an intervention without proving every aspect of the underlying intervention.

## 2.5 An event is not a state

Examples:

- procurement awarded is an event;
- a contract being active is a state;
- payment released is an event;
- the road physically existing is a physical condition/state;
- inspection performed is an event.

The experiment must not collapse events and states into one object.

## 2.6 Administrative representation is not physical proof

A record saying that a project is complete is an administrative assertion/event. It is not, by itself, proof that the physical road exists at the approved location, meets the claimed dimensions, or satisfies the required specification.

## 2.7 Connection is not corruption

A relationship between a project, person, institution, contractor, payment, organization, or road does not by itself establish wrongdoing.

## 2.8 Absence is not automatically evidence of misconduct

A missing record may mean:

- the event did not occur;
- the record exists but was not collected;
- the record is not public;
- access is restricted;
- the record uses another identifier;
- the dataset is incomplete;
- publication is delayed;
- extraction failed;
- the event genuinely has no recorded evidence.

These possibilities must remain separate.

## 2.9 Time is part of identity interpretation

A relationship that is true today may not have been true when a historical project event occurred.

Historical assertions must therefore be interpreted against the relevant time period.

---

# 3. Ontology Architecture

The minimum ontology consists of five conceptual layers.

```text
1. REAL-WORLD LAYER
   Intervention
   Physical Road Segment
   Organization
   Person (minimal)
   Location

2. INSTITUTIONAL REPRESENTATION LAYER
   Project Representation
   Funding / Budget Representation
   Allocation / Allotment Representation
   Obligation Representation
   Procurement Representation
   Contract Representation
   Contract Modification
   Payment Representation
   Inspection Representation
   Completion / Acceptance Representation
   Geographic Representation

3. SOURCE RECORD LAYER
   Source
   Source Record
   Evidence Artifact
   Provenance

4. ASSERTION & ANALYSIS LAYER
   Assertion
   Interpretation
   Inference
   Analytical Observation
   Contradiction
   Expected / Missing Observation
   Finding

5. CROSS-CUTTING CONTROLS
   Identity
   Time
   Geography
   Authority
   Access
   Provenance
```

The experiment is primarily testing the transition:

```text
MULTIPLE SOURCE RECORDS
        ↓
MULTIPLE ASSERTIONS
        ↓
RECONCILIATION AGAINST THE SAME REAL-WORLD SUBJECT
        ↓
CONSISTENT / CONTRADICTORY / AMBIGUOUS / UNRESOLVED
```

---

# 4. Real-World Entity Classes

## RW01 — FMR Intervention

### Definition

A planned, funded, procured, implemented, rehabilitated, improved, extended, or maintained real-world intervention affecting a Farm-to-Market Road capability or physical infrastructure.

The FMR Intervention is the **analytical reconciliation subject**.

### Critical rule

An FMR Intervention is not presumed to have physically occurred merely because a government record represents or claims it.

### Examples of attributes

- internal research intervention ID;
- intervention description;
- stated purpose;
- intended scope;
- relevant program context;
- relevant geographic area;
- temporal scope;
- known project representations.

---

## RW02 — Physical Road Segment

### Definition

A real-world road segment that is claimed, planned, constructed, rehabilitated, improved, extended, or maintained in relation to an FMR intervention.

### Attributes

- internal research road-segment ID;
- geometry, if established;
- coordinates;
- start/end points, where available;
- observed length, where measurable;
- claimed/stated length;
- condition/specification observations, where available;
- observation date/time;
- relationship to one or more interventions.

### Critical rule

A GIS line, shapefile geometry, or project coordinate is a **representation of location**, not automatically proof that the represented road physically exists.

### Temporal rule

One physical road segment may be affected by multiple interventions over time.

```text
Road Segment A
   ├── 2018 Construction Intervention
   ├── 2021 Rehabilitation Intervention
   ├── 2024 Improvement Intervention
   └── 2026 Maintenance Intervention
```

Therefore the relationship is not ownership. It is an intervention relationship such as:

`CONSTRUCTS`

`REHABILITATES`

`IMPROVES`

`EXTENDS`

`MODIFIES`

`MAINTAINS`

---

## RW03 — Organization / Legal Entity

### Definition

A government institution, LGU, contractor, supplier, subcontractor, consultant, joint-venture participant, or other organization relevant to the experiment.

### Attributes

- canonical/legal name;
- normalized name;
- authoritative identifier, where available;
- entity type;
- source identifiers;
- temporal validity;
- identity status.

### Important distinction

The organization is the entity. Its relationship to a project or procurement process is modeled separately as a role/participation.

---

## RW04 — Person

### Definition

A natural person included only where necessary and lawfully justified for the specific research question.

### Scope rule

Person-level modeling is minimized.

A person is not included merely because a name appears in a record.

Where included, identity basis and provenance are mandatory.

---

## RW05 — Location

### Definition

A real-world or analytical geographic location associated with an intervention, physical road segment, event, organization, or observation.

Location is represented separately from administrative jurisdiction and from the record that claims a location.

---

# 5. Institutional Representation Classes

These objects represent what an institution or source system says about the real-world subject.

## REP01 — Project Representation

A government or institutional record describing an FMR project or intervention.

### Typical attributes

- source-system project ID;
- project name;
- description;
- implementing unit;
- location as stated;
- stated scope/length;
- lifecycle references;
- source record reference.

### Critical rule

`Project Representation ≠ FMR Intervention`

The relationship between them must be established and may remain unresolved.

---

## REP02 — Funding / Appropriation Representation

A record representing a funding or appropriation basis associated with a program, intervention, project, or government activity.

---

## REP03 — Allocation / Allotment Representation

A record representing an allocation/allotment or equivalent downstream funding authority where the source distinguishes it from appropriation.

---

## REP04 — Obligation Representation

A record representing a recognized obligation or financial commitment where available and relevant.

---

## REP05 — Procurement Representation

A source representation of a procurement package/process and its associated identifiers and attributes.

It is distinct from individual procurement events.

---

## REP06 — Contract Representation

A source representation of a contract or agreement associated with project delivery.

### Typical attributes

- contract/reference number;
- contract date;
- contract amount;
- start date;
- required completion date;
- related project/procurement identifiers;
- contractor role;
- source authority;
- source record.

---

## REP07 — Contract Modification Representation

A source representation of a documented modification, variation, extension, or other change to a contract.

### Possible changed dimensions

- amount;
- scope;
- duration;
- deliverables;
- other documented terms.

A changed contract amount must not automatically be interpreted as an inconsistency when a documented modification explains the change.

---

## REP08 — Payment Representation

A source representation of a payment or disbursement associated with a project, contract, obligation, or related transaction.

### Typical attributes

- payment/reference number;
- date;
- amount;
- payee;
- related contract/reference;
- source system;
- source record.

Payment representation does not by itself prove:

- physical completion;
- satisfactory performance;
- absence of overpricing;
- absence of fraud.

---

## REP09 — Inspection Representation

A source representation of a field inspection, validation, engineering inspection, site visit, or similar assessment.

### Typical attributes

- inspection date;
- inspecting authority/unit;
- named inspector where necessary and lawful;
- project reference;
- stated location;
- stated purpose;
- observations;
- resulting source record.

An inspection representation documents an observation or assessment; it does not automatically establish every underlying fact independently.

---

## REP10 — Completion / Acceptance Representation

A source representation of completion, acceptance, turnover, or another lifecycle milestone.

Completion/acceptance is an administrative representation and event. It does not automatically prove physical condition.

---

## REP11 — Geographic Representation

A source-system representation of where a project or physical road is located.

Examples:

- PSGC location;
- coordinates;
- project polygon;
- road geometry;
- narrative location.

---

# 6. Participation Roles

Organization is separate from the role it plays in a particular context.

```text
ORGANIZATION
      ↓
PARTICIPATES IN [CONTEXT]
      ↓
ROLE
```

Possible roles include:

- procuring entity;
- bidder;
- awardee;
- contractor;
- subcontractor;
- supplier;
- consultant;
- implementing entity;
- inspecting authority;
- funding authority;
- oversight body.

### Rule

Role is contextual and temporal:

`Organization + Context + Time = Participation Role`

An organization is not permanently “the contractor.”

---

# 7. Source and Evidence Model

## SRC01 — Source

The publishing or originating authority/system.

Examples:

- DA / BAFE;
- PhilGEPS / GPPB;
- DBM;
- PSA;
- SEC;
- COA;
- LGU;
- other authoritative or secondary source.

---

## SRC02 — Source Record

A specific retrievable representation from a source.

Examples:

- database row;
- procurement notice;
- official PDF;
- inspection report;
- webpage;
- dataset record;
- GIS feature;
- official photograph.

### Required source identity

```text
source_system
source_institution
source_record_id
source_record_type
source_name
source_url_or_locator
retrieval_date
publication_date, if known
```

If a source has no native identifier, generate an internal research identifier while preserving the original locator.

---

## SRC03 — Evidence Artifact

The underlying material used to support, challenge, or contextualize an assertion.

A Source Record and Evidence Artifact may be the same object, but they must not be assumed to be identical.

### Typical attributes

- evidence ID;
- source;
- source type;
- acquisition date;
- publication date, where known;
- original locator;
- temporal coverage;
- integrity/provenance metadata;
- transformation history.

---

# 8. Assertion and Analysis Model

## ANA01 — Assertion

A proposition represented or stated by a source, institution, person, researcher, or derived process.

Minimum structure:

```text
subject
predicate
object_or_value
asserting_source
source_record
relevant_time
geography, if applicable
identity_basis
provenance
```

### Example

```text
Subject: Project Representation A
Predicate: states_contract_amount
Value: ₱X
Source Record: Contract Document #123
Relevant Time: Contract execution date
```

An assertion is not automatically an established fact about reality.

---

## ANA02 — Interpretation

A reasoned reading of an evidence artifact or set of assertions.

---

## ANA03 — Inference

A conclusion derived from multiple assertions, observations, or evidence.

An inference must remain identifiable as an inference.

---

## ANA04 — Analytical Observation

A documented research observation about relationships, patterns, missing records, contradictions, or uncertainty.

---

## ANA05 — Finding

A human-reviewed research conclusion that meets the experiment's predefined evidentiary standard.

A finding is not automatically a legal finding, administrative finding, audit finding, or judicial finding unless issued by the appropriate authority.

---

# 9. Event Model

Events represent things that happened or were recorded as happening.

Minimum event classes:

```text
EV01 Funding / Appropriation Event
EV02 Allocation / Allotment Event
EV03 Obligation Event
EV04 Procurement Event
EV05 Award Event
EV06 Contract Event
EV07 Contract Modification Event
EV08 Notice-to-Proceed Event
EV09 Construction / Implementation Event
EV10 Inspection Event
EV11 Completion Event
EV12 Acceptance / Turnover Event
EV13 Payment Event
EV14 Audit / Observation Event
EV15 Public Reporting Event
EV16 Evidence Acquisition Event
```

Not every source will support every event.

`UNKNOWN` is a valid state.

An event should preserve its source representation and relevant time whenever available.

---

# 10. State and Condition Model

Where evidence supports it, the FMR Intervention may be represented through research states such as:

```text
PROPOSED
   ↓
PRIORITIZED
   ↓
FUNDED
   ↓
PROCUREMENT_INITIATED
   ↓
AWARDED
   ↓
UNDER_IMPLEMENTATION
   ↓
INSPECTED
   ↓
COMPLETED / ACCEPTED
   ↓
OPERATIONAL / MAINTAINED
```

This is a research model, not a claim that government systems use these exact states.

A state should only be assigned when the supporting evidence is sufficient.

Physical condition is modeled separately from administrative lifecycle state.

---

# 11. Relationship Model

## 11.1 Core relationships

```text
FMR Program
    └── CONTAINS → Project Representation

Project Representation
    └── DESCRIBES / CLAIMS_TO_DESCRIBE → FMR Intervention

Institution / Organization
    └── ADMINISTERS / IMPLEMENTS → Program / Intervention

FMR Intervention
    ├── HAS_COMPONENT → Project Component, if needed
    ├── REPRESENTED_BY → Project Representation
    ├── ASSOCIATED_WITH → Funding / Budget Representation
    ├── ASSOCIATED_WITH → Allocation / Allotment Representation
    ├── ASSOCIATED_WITH → Obligation Representation
    ├── ASSOCIATED_WITH → Procurement Representation
    ├── ASSOCIATED_WITH → Contract Representation
    ├── ASSOCIATED_WITH → Payment Representation
    ├── AFFECTS → Physical Road Segment
    ├── OCCURS_IN → Location
    ├── HAS_EVENT → Event
    └── HAS_ASSERTION → Assertion

Procurement Representation
    └── HAS_EVENT → Procurement / Award Event

Procurement Representation
    └── MAY_RESULT_IN → Contract Representation

Contract Representation
    ├── HAS_MODIFICATION → Contract Modification Representation
    ├── HAS_PAYMENT → Payment Representation
    └── HAS_PARTICIPANT → Organization via Participation Role

Inspection Representation
    └── PRODUCES / REFERENCES → Evidence Artifact

Source Record
    └── MAKES / CONTAINS → Assertion

Evidence Artifact
    ├── SUPPORTS → Assertion
    └── CHALLENGES → Assertion

Assertion
    ├── INTERPRETED_AS → Interpretation
    ├── CONTRIBUTES_TO → Inference
    └── CONTRIBUTES_TO → Finding
```

## 11.2 Important semantic rule

A relationship between two records is not automatically a relationship between the underlying real-world entities.

Identity and representation linkage must be established separately.

---

# 12. Cardinality Model

The ontology does not assume one-to-one relationships.

Examples:

### One intervention → multiple project representations

Allowed and expected across different source systems or revisions.

### One intervention → multiple contracts

Possible.

### One contract → multiple interventions

Possible in some procurement structures; must be established from evidence.

### One intervention → multiple road segments

Possible and expected where project scope spans segments.

### One physical road segment → multiple interventions

Expected over time.

### One budget representation → multiple interventions

Possible.

### One payment → multiple contractual/project contexts

Not assumed impossible.

Therefore:

> **Cardinality is an empirical property to be discovered during reconciliation, not a design assumption.**

---

# 13. Identity Resolution Framework

Identity resolution is performed between records/representations and the analytical entity they may describe.

## 13.1 Match outcomes

Use descriptive statuses rather than pseudo-probability scores:

### CONFIRMED

Identity is established by a reliable authoritative identifier or explicit authoritative linkage.

### PROBABLE

Multiple strong attributes align and reasonable alternatives are limited.

### POSSIBLE

Some attributes align, but meaningful alternative explanations remain.

### REJECTED

Evidence indicates the records do not refer to the same entity.

### UNRESOLVED

Available evidence is insufficient to establish identity.

---

## 13.2 Required match basis

Every material identity assertion should document:

- matching attributes;
- authoritative identifiers, if any;
- source records;
- temporal compatibility;
- geographic compatibility;
- contradictions considered;
- alternative explanations considered;
- method used;
- human review status.

---

## 13.3 Identity methods

Possible methods include:

```text
AUTHORITATIVE IDENTIFIER
SOURCE-DECLARED LINK
MULTI-ATTRIBUTE MATCH
GEOSPATIAL MATCH
MANUAL EXPERT REVIEW
UNRESOLVED
```

### Prohibition

Do not convert an ordinal identity status into a probability unless a separately validated statistical model is introduced later.

---

# 14. Entity-Specific Identity Attributes

## FMR Intervention / Project Representation

Preferred attributes:

1. authoritative project identifier;
2. source-system identifier;
3. procurement reference;
4. funding/program reference;
5. implementing institution/unit;
6. geographic location;
7. road scope/length;
8. lifecycle dates;
9. project description;
10. stable descriptive attributes.

## Contract Representation

Preferred attributes:

1. contract/reference number;
2. procurement reference;
3. procuring entity;
4. contractor role/entity;
5. contract amount;
6. contract dates;
7. project/intervention reference.

## Organization

Preferred attributes:

1. legal name;
2. authoritative registration identifier;
3. SEC identifier where available;
4. historical names;
5. address where appropriate;
6. other authoritative identifiers.

Corporate relationships must not be inferred merely from names, addresses, officers, or commercial relationships.

## Physical Road Segment

Preferred attributes:

1. authoritative geometry where reliable;
2. coordinates;
3. route/location description;
4. endpoints;
5. physical measurements;
6. temporal observation;
7. intervention/component association.

---

# 15. Temporal Model

Historical identity and relationships require explicit temporal interpretation.

Minimum temporal dimensions:

```text
EVENT TIME
EFFECTIVE TIME
OBSERVATION TIME
PUBLICATION TIME
ACQUISITION TIME
```

Optional where distinguishable:

```text
RECORDING TIME
```

### Examples

A contract may be executed on one date, modified later, inspected later still, and acquired by the researcher much later.

Those dates must not be collapsed into one timestamp.

### Core rule

```text
PUBLICATION DATE ≠ EVENT DATE
ACQUISITION DATE ≠ OBSERVATION DATE
CURRENT STATE ≠ HISTORICAL STATE
```

Where temporal validity is unknown, preserve the uncertainty.

---

# 16. Location Model

Location must distinguish at least three dimensions.

## 16.1 Administrative Geography

Examples:

- region;
- province;
- city/municipality;
- barangay;
- PSGC identifier.

## 16.2 Claimed Project Geography

The location represented in an institutional project/procurement/administrative record.

## 16.3 Observed Physical Geography

The location supported by physical observation or geospatial evidence, such as:

- coordinates;
- geometry;
- imagery;
- field inspection;
- other physical evidence.

These may conflict.

A geographic discrepancy is initially an analytical issue, not automatically an error or wrongdoing.

---

# 17. Administrative vs Physical Representation

The experiment must explicitly distinguish:

```text
ADMINISTRATIVE ASSERTION
        ↓
claims project/intervention state
        ↓
PHYSICAL OBSERVATION
        ↓
observes real-world condition
```

Examples:

> “Project completed” = administrative representation/event.

> “Road exists at the approved coordinates” = physical observation.

> “Road meets required specification” = technical/physical assessment.

These must never be collapsed into a single boolean such as:

`completed = true`

---

# 18. Assertion and Evidence Status

The ontology preserves the distinction among:

### Assertion
A proposition made or represented by a source.

### Evidence Artifact
Material that supports or challenges an assertion.

### Interpretation
Reasoned reading of the evidence.

### Inference
Conclusion derived from multiple observations/assertions.

### Analytical Observation
Researcher-described pattern, discrepancy, or unresolved issue.

### Finding
Human-reviewed conclusion that satisfies the predefined research standard.

This ontology does not equate any of these with guilt or legal liability.

---

# 19. Contradiction Model

A contradiction is not merely a difference between values.

## C0 — Benign Variation

Formatting, abbreviation, rounding, naming, or other non-material difference.

## C1 — Data-Quality Discrepancy

Likely caused by stale, incomplete, duplicated, malformed, poorly normalized, or differently scoped records.

## C2 — Material Unresolved Inconsistency

Two credible representations describe materially incompatible states and the reason is currently unresolved.

## C3 — Evidence Contradiction

Independent evidence materially challenges an assertion or represented state.

## C4 — Apparent Anomaly Requiring Authorized Human Review

A contradiction, pattern, or combination of observations is sufficiently significant to warrant further human examination.

**C4 is not a finding of wrongdoing.**

---

# 20. Expected / Missing Observation Model

The ontology supports expected-but-unobserved events without treating absence as misconduct.

```text
EXPECTED EVENT / RECORD
          ↓
WAS A SEARCH PERFORMED?
          ↓
        YES
          ↓
WAS IT OBSERVED?
      ┌───┴───┐
     YES      NO
               ↓
      NON-OBSERVATION
               ↓
        WHY UNKNOWN?
```

Possible explanations:

- event did not occur;
- record was never created;
- record exists but is inaccessible;
- record exists but is not public;
- alternate identifier;
- dataset incompleteness;
- publication delay;
- extraction failure;
- genuinely absent recorded evidence.

### Required distinctions

```text
NOT OBSERVED ≠ ABSENT
ABSENT ≠ MISCONDUCT
UNAVAILABLE ≠ FALSE
```

Only after reasonable explanations have been assessed may a missing observation become an analytical signal.

---

# 21. Authority and Access Model

Every important source record or representation should identify relevant authority where established.

Minimum attributes:

- issuing institution;
- operational owner where different;
- legal/administrative role where established;
- source system;
- scope of authority;
- temporal validity.

The ontology preserves the distinctions:

```text
DATA CUSTODY
TECHNICAL ACCESS
OPERATIONAL AUTHORITY
INVESTIGATIVE AUTHORITY
DECISION AUTHORITY
```

Technical access does not automatically establish investigative or decision authority.

---

# 22. Minimum FMR Reconciliation Object

For the actual experiment, each selected subject should ultimately be representable as:

```text
FMR INTERVENTION
├── identity
├── project representations
├── program context
├── institutions / roles
├── locations
├── physical road segments
├── funding / budget representations
├── allocation / allotment representations
├── obligation representations
├── procurement representations
├── procurement events
├── contracts
├── contract modifications
├── payment representations/events
├── lifecycle states/events
├── inspection representations/events
├── completion / acceptance representations/events
├── source records
├── evidence artifacts
├── assertions
├── interpretations / inferences
├── contradictions
├── expected / missing observations
├── findings, if any
└── identity / temporal / provenance metadata
```

Not every branch will be populated.

An empty branch may mean:

- not applicable;
- not observed;
- unavailable;
- inaccessible;
- not yet researched;
- unresolved.

These statuses must not be collapsed into a blank cell with no explanation.

---

# 23. Minimum Fields for Phase 2A

| Category | Minimum research fields |
|---|---|
| Intervention identity | internal ID, source project IDs, names, identity status, identity basis |
| Institution | institution/unit, role, authority status |
| Geography | administrative location, claimed location, observed location/geometry where available |
| Scope | description, stated length/scope, component reference where needed |
| Program | program/reference |
| Funding | fiscal year, appropriation/funding reference, amount where available |
| Allocation | allocation/allotment reference and amount where available |
| Obligation | obligation reference and amount where available |
| Procurement | procurement/package reference, event type, mode, relevant dates |
| Contract | contract reference, amount, dates, related procurement/project representation |
| Contract modification | modification reference, type, amount/scope/time changes where available |
| Organization | legal name, authoritative identifier where available, participation role |
| Payments | date, amount, payee, reference where available |
| Physical | geometry/coordinates, observed condition, observation date where available |
| Lifecycle | key documented events, states, and dates |
| Source records | source, source record ID/locator, retrieval/publication dates |
| Evidence | evidence ID, source, temporal coverage, provenance |
| Analysis | contradiction status, unresolved questions, explanations considered |
| Finding | human-reviewed finding and supporting evidence, if any |

These fields describe the **research representation**.

They do not imply that all fields are publicly obtainable or legally accessible to an independent researcher.

---

# 24. Explicit Non-Goals

Unless the FMR trace demonstrates that they are materially necessary, this ontology does not model:

- nationwide political relationship networks;
- campaign finance;
- full beneficial-ownership graphs;
- criminal case records;
- private financial information;
- unrelated personal profiling;
- AI-agent authorization;
- complete government enterprise architecture;
- nationwide service/outcome models;
- broad corrections/justice ontology;
- comprehensive national infrastructure asset registry.

The purpose is to prevent ontology expansion from becoming hidden architecture expansion.

---

# 25. Ontology Expansion Rule

A new entity, representation, relationship, or analytical class may be added only when all are true:

1. the FMR experiment encounters a real record or question that cannot be represented adequately;
2. the missing concept materially affects reconciliation or interpretation;
3. adding the concept improves explanatory or reconciliation power;
4. the concept can be defined without importing unsupported assumptions.

Every expansion must record:

`reason → evidence → proposed concept → impact → approval`

No expansion should be justified merely because it would be useful for a future national architecture.

---

# 26. G0 Acceptance Criteria

G0 is satisfied when:

- [x] the distinction between real-world object, institutional representation, source record, assertion, event, state, evidence, and finding is explicit;
- [x] FMR Intervention is distinguished from Project Representation;
- [x] Project Representation is distinguished from contract, procurement, funding, payment, and physical road segment;
- [x] Source Record is first-class;
- [x] Assertion is first-class;
- [x] identity rules are defined;
- [x] temporal dimensions are defined;
- [x] administrative, claimed, and observed geography are distinguished;
- [x] physical condition is distinguished from administrative lifecycle state;
- [x] financial lifecycle distinctions are preserved where the source supports them;
- [x] contract modifications are representable;
- [x] organizational role is separated from the organization itself;
- [x] evidence is separated from interpretation, inference, and finding;
- [x] contradiction classes are defined;
- [x] expected-but-missing observations have explicit handling;
- [x] authority is separated from technical access;
- [x] identity outcomes are auditable rather than treated as probabilities;
- [x] minimum Phase 2A fields are defined;
- [x] unnecessary person-level and sensitive-data modeling is avoided;
- [x] cardinality is discovered empirically rather than assumed;
- [x] ontology expansion is controlled;
- [x] the model remains small enough for manual use by one researcher.

---

# 27. G0 Decision

**STATUS: APPROVED FOR G0 / FINAL RESEARCH ONTOLOGY**

This ontology is approved for use in the subsequent Phase 1A readiness gates.

It remains intentionally separate from any production eGovTrace data model.

The next gates are:

```text
G0 — Minimum FMR Ontology                         APPROVED
        ↓
G1 — Field-by-Field Data Access Matrix            NEXT
        ↓
G2 — FMR-Specific State Universe Reference Layer
        ↓
G3 — Neutral Candidate Selection
        ↓
G4 — Pre-Registered Evaluation Criteria
        ↓
G5 — Evidence / Security / Publication Protocol
        ↓
G6 — Final Readiness Decision
        ↓
Phase 2A — FMR Reconciliation Experiment
```

---

# 28. Core Research Principle

The fundamental research object is not:

> “the FMR database.”

It is:

> **the same real-world FMR intervention as represented by different institutions, source systems, records, events, locations, organizations, and physical evidence over time.**

The purpose of the ontology is to make it possible to determine where those representations:

- agree;
- diverge;
- remain ambiguous;
- cannot be observed;
- or require further authorized human review.

The ontology succeeds when it makes those distinctions explicit without inventing facts or converting relationships into accusations.
