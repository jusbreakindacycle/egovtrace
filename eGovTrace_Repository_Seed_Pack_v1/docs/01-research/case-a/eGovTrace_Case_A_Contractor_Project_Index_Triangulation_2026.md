# eGovTrace — Case A Contractor / Project-Index Triangulation

## Status

**Research stream:** Case A — Cabarasan to Dao FMR, Gamay, Northern Samar

**Execution date:** 2026-09-05

**Purpose:** Test whether the known contractor anchor, A-Cube Construction and Supply, can independently recover a project/procurement/contract/NTP identifier for the selected 2021 Cabarasan–Dao FMR.

**Research boundary:** This is an independent public-source branch running in parallel with the already-submitted DPWH/eFOI request. FOI response material is not used as evidence in this branch.

**G4 boundary:** Controlled deepening/validation research. No automatic G4 rescore.

---

## 1. Case Identity

- FMR UUID: `7afb3618-2c25-499f-8147-862d36c59ee4`
- Frozen frame index: `6215`
- FMR code: `2021-R8-NOS-INFRA-FMRDP-FMR-00547`
- FMR Watch title: `Concreting of Barangay Cabarasan to Barangay Dao FMR, Gamay, Northern Samar`
- DBM FY2021 direct-release UACS: `310203206922000`
- DBM FY2021 amount: `PHP 12,500,000`
- Implementing office: `DPWH Northern Samar 2nd District Engineering Office`
- Contractor search anchor: `A-CUBE CONSTRUCTION & SUPPLY`
- Contractor regulatory identifier observed: `PCAB license no. 40806` in historical PCAB material and current PCAB listing entity `A-CUBE CONSTRUCTION AND SUPPLY`.

Existing bridge state before this branch:

```text
PROJECT IDENTITY              CONFIRMED
PROJECT → BUDGET              CONFIRMED
PROJECT → CONTRACTOR          DOCUMENTED AGENCY-ORIGIN SECONDARY
PROJECT → PRIMARY PROCUREMENT NOT ESTABLISHED
PRIMARY CONTRACT              UNRESOLVED
OBLIGATION                    UNRESOLVED
DISBURSEMENT                  UNRESOLVED
LDDAP-ADA / ADA               UNRESOLVED
JEV                           UNRESOLVED
SETTLEMENT                    NOT ESTABLISHED
```

---

## 2. Research Question

> Can the known contractor anchor, together with Northern Samar 2nd DEO, 2021, Cabarasan/Dao/Gamay and the confirmed project/budget representations, recover a defensible procurement reference, award identifier, contract number, or Notice to Proceed for the selected 2021 intervention?

Secondary question:

> Does contractor-side regulatory/index information provide enough additional identity to establish continuity, or does it remain only a supporting attribute?

---

## 3. Search Design

The branch tested combinations of:

```text
A-CUBE CONSTRUCTION & SUPPLY
A-CUBE CONSTRUCTION AND SUPPLY
A-CUBE
PCAB 40806
Alvaro Sim Aguilana
Northern Samar 2nd DEO
Northern Samar
Gamay
Cabarasan
Dao
Cabarasan-Dao
2021
2021-R8-NOS-INFRA-FMRDP-FMR-00547
12,500,000
Farm-to-Market Road
contract ID
procurement
PhilGEPS
award
Notice of Award
Notice to Proceed
```

Priority was given to official/agency-origin sources where indexed. Secondary sources were retained only for corroboration.

A contractor name, license number, TIN, geographic region, or other contractor-side identifier is not treated as a project identity key by itself.

---

## 4. Contractor Entity Continuity

### 4.1 Current PCAB listing

The current 2026 PCAB licensed-contractor list contains:

- A-CUBE CONSTRUCTION AND SUPPLY
- Authorized Managing Officer: **Alvaro Sim Aguilana**
- Region: **Region 8 (Eastern Visayas)**
- Category: **D**

Source: current PCAB licensed-contractor list made available through the eFOI document repository.

**Evidence status:** `DOCUMENTED PRIMARY / REGULATORY LISTING`

This establishes a contractor entity representation but does not by itself establish any particular government contract.

### 4.2 Historical PCAB continuity

Historical PCAB material for CFY 2019–2020 lists:

- license no. `40806`
- A-CUBE CONSTRUCTION & SUPPLY
- primary classification: General Building
- other classification: General Engineering
- managing officer: Alvaro Sim Aguilana
- Region 8
- government-project validity extending to May 21, 2022 in the cited list.

This is temporally relevant because the selected project began construction in 2021.

**Evidence status:** `DOCUMENTED REGULATORY SECONDARY / HISTORICAL INDEX`

Interpretation:

```text
PCAB entity continuity during 2021
        ≠
selected Cabarasan–Dao contract proven
```

The PCAB record strengthens the plausibility and temporal continuity of the contractor identity, but it does not identify the project contract.

---

## 5. Agency-Origin Project / Contractor Evidence

A November 23, 2021 Leyte-Samar Daily Express report reproduces information attributed to the DPWH Northern Samar 2nd District Engineering Office and states that:

- the Brgy. Cabarasan–Brgy. Dao FMR was constructed beginning August 23, 2021;
- the project was funded under DPWH CY2021 Regular Infrastructure Projects through the Department of Agriculture;
- the project was under contract with **A-Cube Construction and Supply**;
- the project was supervised by Engr. Genaro C. Pinca, Jr. as Project Engineer.

Source: Leyte-Samar Daily Express, November 23, 2021, “NS 2nd DEO constructs Cabarasan-Dao FMR.”

**Evidence status:** `DOCUMENTED AGENCY-ORIGIN SECONDARY`

This is the strongest contractor/project relationship currently recovered in public research, but it still does not expose the contract number, procurement reference, award number, or NTP.

---

## 6. Independent Later Agency-Origin Contractor Observation

A later report about DPWH-NSSDEO projects in Mapanas/Gamay states that **A-Cube Construction and Supply** was carrying out a separate 2023 Gamay Multi-Purpose Evacuation Center project.

This is evidence that the contractor had another DPWH project relationship in Gamay, Northern Samar at a later time.

It is **not joined** to the selected 2021 Cabarasan–Dao FMR.

Disposition:

```text
same contractor
+
same municipality
+
different year
+
different project description
        ↓
NO AUTOMATIC JOIN
```

**Evidence status:** `DOCUMENTED AGENCY-ORIGIN SECONDARY`

This is useful for the adversarial test because contractor recurrence across projects is expected and cannot by itself establish project identity.

---

## 7. BIR Contractor-Side Regulatory Identity Observation

A 2023 BIR released tax-clearance list contains:

- **AGUILANA, ALVARO SIM (A-CUBE CONSTRUCTION & SUPPLY)**
- a Taxpayer Identification Number and Tax Clearance for Bidding Purposes record.

This is a contractor-side regulatory identity record.

It may help future identity resolution between contractor names and legal/tax records, but the document is from 2023 and does not establish the selected 2021 contract.

**Evidence status:** `DOCUMENTED REGULATORY SECONDARY`

Disposition:

```text
contractor legal/tax identity
        ≠
project contract identity
```

---

## 8. Procurement / Contract Index Recovery Result

The search branch did **not** recover a defensible primary:

- PhilGEPS procurement reference for the selected 2021 FMR;
- award notice number;
- solicitation/reference number that can be proven to belong to the selected project;
- DPWH contract number;
- Notice of Award;
- Notice to Proceed;
- executed contract record.

Exact and variant searches using the project, contractor, location, year and amount produced contextual hits but no source record sufficient to cross the project → primary procurement bridge.

Current disposition:

```text
PROJECT → PRIMARY PROCUREMENT
= NOT ESTABLISHED
```

This does not mean no procurement occurred and does not mean the records do not exist.

---

## 9. Contractor Identifier as a Candidate Bridge

The following contractor-side identifiers were recovered:

```text
A-CUBE CONSTRUCTION AND SUPPLY
PCAB license no. 40806
AMO: Alvaro Sim Aguilana
Region 8
BIR taxpayer representation for Alvaro Sim Aguilana
```

These can now be used as additional search anchors for institutional records.

However:

```text
PCAB 40806
      ↓
contractor entity
      ≠
project procurement ID
```

The contractor identifier is therefore classified as an **attribute/supporting identity node**, not as a project bridge identifier.

---

## 10. False-Join Tests Built Into This Branch

### Test FJ-1 — Same contractor

A-Cube Construction and Supply appears on other Northern Samar / Gamay projects.

**Result:** same contractor is insufficient to join projects.

**Disposition:** `J5 / REJECTED AS IDENTITY PROOF`

### Test FJ-2 — Same contractor + same municipality

A-Cube later appears on another Gamay project.

**Result:** same contractor + same municipality is insufficient.

**Disposition:** `J5 / REJECTED AS IDENTITY PROOF`

### Test FJ-3 — Same route + different year

The Cabarasan–Dao route appears in a prior 2016 intervention and later representations.

**Result:** same route across years is not sufficient to merge interventions.

**Disposition:** historical records remain separate.

### Test FJ-4 — Same contractor + route + fiscal context

No recovered primary document provided a contract/procurement identifier establishing all attributes as one authoritative record.

**Result:** composite similarity remains insufficient without a source-record bridge.

**Disposition:** `NOT ESTABLISHED`

---

## 11. Bridge Matrix Result

| From | To | Candidate bridge | Type | Status | Interpretation |
|---|---|---|---|---|---|
| FMR project | Contractor | A-Cube Construction & Supply | J3 | DOCUMENTED AGENCY-ORIGIN SECONDARY | Strong project/contractor relationship, but not primary contract proof |
| Contractor | PCAB entity | License 40806 / name / AMO | J1/J2 at contractor-registry level | DOCUMENTED | Establishes contractor regulatory identity, not project identity |
| Contractor | Procurement | contractor name | J5 | NOT ESTABLISHED | Contractor name alone does not identify procurement |
| Contractor | Contract | contractor name | J5 | NOT ESTABLISHED | No contract number recovered |
| Project | PhilGEPS procurement | title/code/location/contractor | J3 candidate | NOT ESTABLISHED | No defensible primary project-specific PhilGEPS record recovered |
| Project | NTP | title/location/contractor | J3 candidate | NOT ESTABLISHED | No NTP recovered |
| Contract | ORS | contract/UACS | J3 candidate | UNRESOLVED | No project-specific ORS recovered |

---

## 12. Key Finding

The contractor-side search materially strengthens the **contractor entity node**, but it does not recover the missing project-to-procurement bridge.

The evidence now forms this defensible chain:

```text
SELECTED 2021 FMR
      ↓ CONFIRMED
FY2021 BUDGET / UACS
      ↓
AGENCY-ORIGIN REPORT
      ↓
A-CUBE CONSTRUCTION & SUPPLY
      ↓
PCAB ENTITY / HISTORICAL LICENSE CONTINUITY
```

But the following remains unresolved:

```text
A-CUBE / PROJECT
      ↓ ?
PRIMARY PROCUREMENT ID
      ↓ ?
AWARD
      ↓ ?
CONTRACT NUMBER
      ↓ ?
NTP
      ↓ ?
SARO / ORS
      ↓ ?
DV / ADA / JEV
      ↓ ?
SETTLEMENT
```

---

## 13. Effect on the Identity-Continuity Test

This branch provides evidence for a more nuanced identity architecture:

```text
PROJECT IDENTITY
      |
      +---- budget identifiers
      |
      +---- project/agency identifiers
      |
      +---- contractor entity identifiers
      |
      +---- procurement identifiers
      |
      +---- contract identifiers
      |
      +---- financial transaction identifiers
```

The contractor identifier is a distinct identity domain.

This supports the eGovTrace principle that no single contractor-side or fiscal identifier should be treated as the universal project key.

---

## 14. Relationship to the Pending FOI

This branch does not replace the existing formal request.

The FOI remains the strongest current route for recovering the implementing office's authoritative procurement and accounting identifiers.

The contractor-side findings should be supplied to the FOI adjudication process as contextual search anchors **only if they are relevant to interpreting returned records**.

The FOI submission status remains:

```text
EXECUTED: YES
RESPONSE: PENDING
```

No response or document was used in this branch.

---

## 15. Recommended Next Search State

Do not issue a duplicate broad FOI solely because this branch failed to recover the procurement ID.

When further public-source work is justified, the highest-value contractor-derived searches are:

```text
PCAB 40806
+
A-CUBE CONSTRUCTION & SUPPLY
+
Northern Samar 2nd DEO
+
2021
```

and:

```text
Alvaro Sim Aguilana
+
A-CUBE CONSTRUCTION & SUPPLY
+
Northern Samar 2nd DEO
+
Cabarasan / Dao / Gamay
```

The objective remains a **primary record identifier**, not additional evidence that the contractor exists.

---

## 16. Overall Result

**Branch result: PARTIAL / BRIDGE NOT RECOVERED**

The contractor/project triangulation branch succeeded in establishing a stronger contractor-side identity context but failed to recover the project-specific procurement/contract/NTP identifier.

Most important result:

> **A contractor identity can be made highly specific without becoming a project identity.**

This is a useful empirical constraint for eGovTrace.

---

## 17. Standing Rules Preserved

```text
CONNECTION ≠ CORRUPTION
NOT OBSERVED ≠ ABSENT
UNAVAILABLE ≠ FALSE
IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF
SAME CONTRACTOR ≠ SAME PROJECT
SAME ROUTE ≠ SAME INTERVENTION
SAME MUNICIPALITY ≠ SAME PROJECT
SEARCH TIME ≠ EVIDENCE DATE
```

**G4 remains frozen at 3/8 for the selected candidates.**
