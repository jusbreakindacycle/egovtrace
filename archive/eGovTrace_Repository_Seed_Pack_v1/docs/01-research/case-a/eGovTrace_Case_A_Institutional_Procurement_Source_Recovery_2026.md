# eGovTrace Case A — Institutional Procurement-Source Recovery Branch
## Cabarasan–Dao FMR, Gamay, Northern Samar — 2026

## 1. Status

**Study:** eGovTrace Identity & Interoperability Validation Study

**Case:** Case A — Cabarasan–Dao FMR, Gamay, Northern Samar

**FMR UUID:** `7afb3618-2c25-499f-8147-862d36c59ee4`

**FMR code:** `2021-R8-NOS-INFRA-FMRDP-FMR-00547`

**Controlled branch:** Institutional procurement-source recovery

**Objective:** Attempt to recover the primary procurement/award/contract bridge from the implementing office and authoritative procurement sources before treating the procurement→contract→financial chain as unavailable.

**G4 boundary:** No G4 rescore. The frozen G4 score remains **3/8**.

**Governing rules:**
- `CONNECTION ≠ CORRUPTION`
- `NOT OBSERVED ≠ ABSENT`
- `UNAVAILABLE ≠ FALSE`
- `IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF`
- `SAME ROUTE ≠ SAME INTERVENTION`

## 2. Case Baseline

Previously established:

```text
FMR identity                         CONFIRMED
FY2021 budget / UACS                CONFIRMED
Agency-origin contractor evidence   DOCUMENTED SECONDARY
Primary procurement                 NOT ESTABLISHED
Primary contract                    UNRESOLVED
Obligation                          UNRESOLVED
Disbursement                        UNRESOLVED
LDDAP-ADA / ADA                     UNRESOLVED
JEV                                 UNRESOLVED
Settlement                          NOT ESTABLISHED
```

DBM FY2021 GAA material identifies the project as:

`Concreting of Brgy. Cabarasan to Brgy. Dao FMR, Brgy. Cabarasan and Brgy. Dao, Gamay, Northern Samar`

at **₱12,500,000**. The FY2021 direct-release material identifies UACS `310203206922000` for the same project.

The FY2021 NEP separately represents the project under UACS `310203206867000`. This is retained as identifier/representation variation, not automatically treated as contradiction.

A November 2021 agency-origin report states that construction began 23 August 2021, the project was under contract with **A-Cube Construction and Supply**, and reported 43.60% accomplishment as of 31 October 2021. A February 2022 PIA report, citing DPWH Northern Samar 2nd DEO, reports completion.

## 3. Recovery Question

The branch asks, in order:

```text
PROJECT
  ↓
DPWH / IMPLEMENTING-OFFICE PROJECT REPRESENTATION
  ↓
APP / PROCUREMENT RECORD
  ↓
PHILGEPS REFERENCE
  ↓
AWARD / NOA
  ↓
CONTRACT NUMBER
  ↓
NTP / CONTRACT RECORD
```

The target is the **first defensible primary bridge**. We do not proceed to ORS/DV/payment as though the bridge exists merely because contractor, title, amount or location are similar.

## 4. Sources and Recovery Actions

### 4.1 DBM budget representations

**Recovered.**

The official FY2021 FMR annex lists the selected project and ₱12.5M. The official direct-release annex identifies UACS `310203206922000` for the same description and amount.

These records establish budget identity, not procurement identity.

### 4.2 PhilGEPS public procurement search

Targeted web-indexed searches were run for:

- exact project title
- shortened project title
- `Cabarasan to Brgy. Dao`
- `Cabarasan-Dao FMR`
- `Gamay Northern Samar`
- `2021-R8-NOS-INFRA-FMRDP-FMR-00547`
- ₱12.5M project amount
- `A-Cube Construction and Supply`
- combinations of the project and implementing office

**Result:** no defensible exact-project primary PhilGEPS bid notice/award record was recovered in the accessible indexed material.

The search did recover unrelated Northern Samar PhilGEPS civil-works notices. Those were rejected because their procuring entities, titles and objects do not identify the selected Cabarasan–Dao intervention.

### 4.3 DPWH public/indexed procurement and project material

Targeted searches were run against DPWH-indexed material for:

- exact title variants
- `Cabarasan`
- `Dao`
- `Gamay`
- `A-Cube Construction and Supply`
- 2021 Northern Samar 2nd DEO combinations

**Result:** no primary procurement notice, award notice, contract number or NTP for the selected 2021 project was recovered from the accessible indexed DPWH material.

A current DPWH Annual Infrastructure Program search result does contain a Cabarasan–Dao FMR representation, with project code `P00046632VS-CW1`, but that record is not treated as the selected 2021 DA-funded FMR procurement without additional temporal and institutional evidence. The record appears in a DPWH program context and therefore is an adversarial candidate requiring separation from the selected intervention, not automatic proof of continuity.

### 4.4 Historical CPES material

An official DPWH consolidated CPES report contains a **2016** `Concreting of Cabarasan - Dao Farm to Market Road, Gamay, Northern Samar` record associated with **CDU Construction**, contract amount about **₱9.173M**, under Northern Samar 2nd DEO.

This is not joined to the selected 2021 project.

This historical record strengthens the need for temporal identity controls: same route and implementing office do not prove same intervention.

### 4.5 Agency-origin secondary evidence

The November 2021 report from Leyte-Samar Daily Express reproduces Northern Samar 2nd DEO public-information material identifying A-Cube Construction and Supply and project implementation.

This remains:

`DOCUMENTED AGENCY-ORIGIN SECONDARY`

not:

`DOCUMENTED PRIMARY CONTRACT`

because the underlying contract or procurement instrument was not recovered.

## 5. Bridge Assessment

### Project → procurement

**Status: NOT ESTABLISHED**

No exact primary procurement reference was recovered in the accessible search conditions.

Candidate matches based only on title, place, contractor, amount, or general DPWH context are not promoted to proof.

### Procurement → award

**Status: UNRESOLVED**

No defensible selected-project primary procurement record was established from which an award identifier could be followed.

### Award → contract

**Status: UNRESOLVED**

The existence of an agency-origin reported contract relationship is not sufficient to recover the legal contract identifier.

### Contract → financial execution

**Status: UNRESOLVED**

No project-specific primary contract anchor was recovered that could safely be used to trace SARO/allotment, ORS, DV, LDDAP-ADA/ADA, JEV, or settlement.

## 6. Adversarial / False-Join Tests

### FJ-01 — Same route, earlier project

2016 Cabarasan–Dao FMR + selected 2021 Cabarasan–Dao FMR.

**Disposition: REJECTED AS IDENTITY JOIN.**

Reason: different fiscal era and contractor (CDU Construction in 2016 versus agency-origin A-Cube evidence in 2021), with no recovered transition record proving they are the same intervention.

### FJ-02 — Current DPWH Annual Infrastructure Program representation

`P00046632VS-CW1` for a Cabarasan–Dao FMR representation.

**Disposition: NOT JOINED.**

Reason: the current indexed record does not, by itself, prove continuity to the selected 2021 DA-funded FMR. The observed record must remain a separate representation until temporal, funding, project-code and institutional continuity are established.

### FJ-03 — Same contractor

A-Cube Construction and Supply is reported as contractor for the selected project and appears in other Northern Samar DPWH material.

**Disposition: NOT SUFFICIENT FOR PROJECT IDENTITY.**

Reason: contractor reuse across projects is possible; contractor identity is a relation attribute, not a universal project key.

### FJ-04 — Same amount

₱12.5M is retained as a supporting attribute but not used as a unique identifier.

**Disposition: NOT SUFFICIENT.**

### FJ-05 — Same locality / implementing office

Gamay + Northern Samar 2nd DEO occur in related records.

**Disposition: NOT SUFFICIENT.**

## 7. Result of Institutional Recovery Branch

The branch did **not** recover the missing primary procurement bridge.

The strongest defensible chain remains:

```text
FY2021 budget representation
        ↓ CONFIRMED
selected Cabarasan–Dao FMR
        ↓ DOCUMENTED AGENCY-ORIGIN SECONDARY
A-Cube / implementation
        ↓
PRIMARY PROCUREMENT
        = NOT ESTABLISHED
        ↓
PRIMARY CONTRACT
        = UNRESOLVED
        ↓
ORS / DV / ADA / JEV / SETTLEMENT
        = UNRESOLVED
```

This is a **localized evidence gap at the project→primary procurement transition**. It is not a finding that procurement, obligation, or payment did not occur.

## 8. Access Boundary

The public/indexed evidence path has been materially tested. The next potentially productive evidence channel is the implementing office's own procurement/accounting records and, where legally appropriate, a formal evidence-acquisition request.

FOI state for this branch:

`FOI IDENTIFIED AS NEXT-EVIDENCE CHANNEL`

`FOI EXECUTED = NO`

No claim is made about whether the implementing office possesses, denies, releases, or withholds the missing records.

## 9. G4 Consequence

No retroactive G4 rescore.

```text
Candidate 2 = 3/8
```

Any future evidence that closes a relationship must be added as a versioned relationship update with explicit source provenance.

## 10. Architectural Finding

This branch provides a useful empirical result for eGovTrace:

> A project can be clearly represented in a government budget record and have credible agency-origin implementation/contract reporting while the public research path still lacks a primary procurement identifier that can safely bridge the intervention into contract and financial-execution records.

This supports continued testing of eGovTrace as an **identity-reconciliation and evidence-gap layer**, while also demonstrating that the layer must preserve unresolved states rather than manufacture continuity.

## 11. Next Admissible Evidence Step

The next highest-value action is a **formal institutional-record acquisition attempt** directed to the responsible procurement/accounting custodian, using the already confirmed project identity and agency-origin contractor evidence as search anchors.

The request should seek, at minimum:

1. procurement reference / PhilGEPS reference or equivalent;
2. BAC procurement/award record;
3. Notice of Award;
4. contract number and executed contract;
5. Notice to Proceed;
6. project-specific financial coding used for obligation/payment tracing;
7. available transaction references sufficient to locate ORS and subsequent disbursement/accounting records.

The request itself must be logged as an **evidence-acquisition event**, not treated as evidence that the requested records exist.

## 12. Research Decision

**Branch result: PROCUREMENT BRIDGE NOT RECOVERED FROM PUBLIC / INDEXED INSTITUTIONAL SOURCES.**

**Case A proceeds to institutional evidence-acquisition boundary.**

The core validation question remains open:

> Can the selected 2021 Cabarasan–Dao intervention be defensibly followed from project identity into its primary procurement, legal contract, and financial-execution identifiers using evidence-backed joins?
