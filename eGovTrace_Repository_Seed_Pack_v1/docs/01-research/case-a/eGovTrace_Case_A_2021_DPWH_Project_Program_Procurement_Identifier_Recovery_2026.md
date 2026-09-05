# eGovTrace Case A — 2021 DPWH Project / Program / Procurement Identifier Recovery
## Cabarasan–Dao FMR, Gamay, Northern Samar

**Status:** EXECUTED / PUBLIC-SOURCE BRANCH  
**Scope:** Recover a genuinely 2021-specific DPWH project/program/procurement identifier that can defensibly bridge the selected FMR/budget representation to procurement.  
**Case:** FMR UUID `7afb3618-2c25-499f-8147-862d36c59ee4`  
**FMR code:** `2021-R8-NOS-INFRA-FMRDP-FMR-00547`  
**Project:** Concreting of Barangay Cabarasan to Barangay Dao FMR, Gamay, Northern Samar  
**Budget anchor:** ₱12,500,000; FY2021 DBM/UACS representations previously established.

## Research question

Can a DPWH-native 2021 project/program identifier, procurement reference, contract ID, or equivalent bridge be recovered from public records and defensibly linked to the selected 2021 intervention?

## Controls

- `IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF`
- `SAME ROUTE ≠ SAME INTERVENTION`
- `SAME TITLE ≠ SAME PROJECT`
- `SAME CONTRACTOR ≠ SAME PROJECT`
- Historical 2016 Cabarasan–Dao records remain separate unless continuity evidence is found.
- The search must prefer primary/official evidence and must record rejected or insufficient matches.

## Search anchors

| Anchor | Value |
|---|---|
| FMR UUID | `7afb3618-2c25-499f-8147-862d36c59ee4` |
| FMR code | `2021-R8-NOS-INFRA-FMRDP-FMR-00547` |
| Project title | Concreting of Brgy. Cabarasan - Brgy. Dao Farm-to-Market Road, Gamay, Northern Samar |
| Implementing office | DPWH Northern Samar 2nd District Engineering Office |
| Municipality | Gamay, Northern Samar |
| Contractor anchor | A-Cube Construction and Supply |
| Amount | ₱12,500,000 |
| FY | 2021 |
| UACS direct-release anchor | `310203206922000` |
| UACS/NEP variation | `310203206867000` |

## Public-source recovery performed

### 1. Official/agency project indexing

The current DPWH Annual Infrastructure Program publicly exposes a project component record:

`P00046632VS-CW1` — “Concreting of Brgy. Cabarasan - Brgy. Dao Farm-to-Market Road, Gamay, Northern Samar,” under Northern Samar 2nd District Engineering Office, with UACS/PAP `165004050305802`, 1.300 lane km, and ₱10,000,000 allocation.

However, the same DPWH-indexed representation is tied to an older budget/program lineage, not the selected 2021 budget representation. It therefore cannot be promoted to a 2021 project identifier on the current evidence.

Source: DPWH Annual Infrastructure Program, Region VIII, page 85, timestamped 3/29/2017 in the indexed document.

### 2. Historical government budget continuity

DBM FY2016 material independently identifies:

“Concreting of Brgy. Cabarasan - Brgy. Dao Farm-to-Market Road, Gamay, Northern Samar”

under UACS/PAP `165004050305802` at ₱10,000,000.

This matches the DPWH project-component lineage above and therefore strengthens the conclusion that `P00046632VS-CW1` / `165004050305802` belongs to the older intervention lineage rather than being safely assignable to the selected 2021 intervention.

### 3. Historical CPES false-join boundary

GPPB CPES reporting identifies:

- Constructor: C D U Construction
- Project: Concreting of Cabarasan - Dao Farm to Market Road, Gamay, Northern Samar
- Start date: 8/28/2016
- Implementing office: Northern Samar 2nd DEO
- Contract amount: ₱9.173M
- Status: 60 / CPES data
- Qualitative result: 82.9% Satisfactory

This is an independently documented older intervention. It must remain separate from the selected 2021 A-Cube intervention.

### 4. 2021 agency-origin implementation evidence

The 23 Nov 2021 Leyte-Samar Daily Express report reproduces information from DPWH Northern Samar 2nd DEO stating that:

- the Cabarasan–Dao FMR was constructed beginning 23 Aug 2021;
- it was funded under DPWH CY2021 Regular Infrastructure Projects through DA;
- it was under contract with A-Cube Construction and Supply;
- 43.60% accomplishment was reported as of 31 Oct 2021.

This is a strong 2021 implementation/contractor anchor but does not expose a 2021 DPWH project-component ID, PhilGEPS reference number, award notice number, or contract ID in the text.

### 5. 2022 completion reporting

The Philippine Information Agency, citing DPWH Northern Samar 2nd DEO, reported in February 2022 that the Cabarasan–Dao FMR was completed and described it as a ₱12M project.

The amount differs from the selected FMR Watch/DBM ₱12.5M representation and therefore is not used as a primary identity key. It corroborates the existence of the 2021/2022 implementation but does not supply a missing procurement identifier.

### 6. Later DPWH records are not silently back-linked

Current DPWH annual-program indexing also contains a “Cabarasan - Brgy. Dao” project representation with `P00046632VS-CW1` and a separate 2024 Phase II procurement listing exists.

These records are retained as separate temporal observations. A later or older project on the same road corridor is not automatically the selected 2021 intervention.

## Identifier adjudication

| Candidate identifier / record | Proposed role | Adjudication | Reason |
|---|---|---|---|
| `P00046632VS-CW1` | DPWH project component ID | **REJECTED AS 2021 BRIDGE** | Official DPWH record aligns with FY2016/2017 UACS/PAP `165004050305802` and ₱10M older lineage |
| `165004050305802` | UACS/PAP / program representation | **REJECTED AS 2021 UNIQUE BRIDGE** | DBM FY2016 and DPWH 2017 records show older intervention lineage |
| `2021-R8-NOS-INFRA-FMRDP-FMR-00547` | FMR Watch source identifier | **CONFIRMED FOR CASE A** | Frozen population source identifier |
| `310203206922000` | FY2021 budget/UACS representation | **CONFIRMED BUDGET ANCHOR** | Previously established from DBM FY2021 direct-release evidence |
| `310203206867000` | FY2021 NEP budget representation | **CONFIRMED VARIANT** | Previously established from DBM FY2021 NEP; variation is retained |
| A-Cube Construction and Supply | contractor anchor | **DOCUMENTED AGENCY-ORIGIN SECONDARY** | 2021 DPWH-origin reporting reproduced by secondary publication |
| 2021 PhilGEPS reference | procurement bridge | **NOT RECOVERED** | No defensible exact-project primary reference surfaced in this branch |
| 2021 DPWH Contract ID | contract bridge | **NOT RECOVERED** | No defensible exact-project primary contract identifier surfaced |
| 2021 DPWH project component ID | project/program bridge | **NOT RECOVERED** | Older `P00046632VS-CW1` cannot be promoted to 2021 |

## False-join tests

### Test FJ-1 — Same route/title

2016 Cabarasan–Dao and selected 2021 Cabarasan–Dao are treated as separate interventions.

**Result: PASS**

### Test FJ-2 — Same implementing office

Both older and selected records involve Northern Samar 2nd DEO.

**Result: PASS — office identity is not treated as project identity.**

### Test FJ-3 — Same corridor + same/similar title

The corridor appears again in later records including a 2024 Phase II project.

**Result: PASS — temporal records remain separate.**

### Test FJ-4 — UACS/project-component resemblance

`P00046632VS-CW1` / `165004050305802` looks highly relevant because the title matches the 2021 FMR. Government budget chronology, however, places that identifier in an older FY2016/2017 lineage.

**Result: PASS — apparent match rejected for 2021 continuity.**

### Test FJ-5 — Same contractor

A-Cube is a 2021 contractor anchor, and the contractor also appears in later Northern Samar 2nd DEO projects.

**Result: PASS — contractor recurrence is not treated as project identity.**

## Result

### 2021-specific bridge status

```text
SELECTED 2021 FMR
        ↓ CONFIRMED
FY2021 BUDGET / UACS
        ↓
2021 DPWH PROJECT / PROGRAM IDENTIFIER
        = NOT RECOVERED
        ↓
2021 PROCUREMENT REFERENCE
        = NOT RECOVERED
        ↓
2021 CONTRACT ID
        = NOT RECOVERED
```

The best-looking DPWH-native identifier found, `P00046632VS-CW1`, is **not admissible as the 2021 bridge** on current evidence because its documentary lineage points to the older `165004050305802` / ₱10M project representation.

## Evidence boundary reached

The public-source branch has now localized the remaining bridge:

**Project/budget identity → genuinely 2021-specific DPWH project/procurement identity**

The branch did not recover a defensible 2021 procurement or contract identifier.

This is not evidence that no such identifier exists. It is evidence that the identifier was not independently recovered under the public-source search conditions used in this branch.

## Implication for the FOI branch

The already-submitted DPWH FOI request is now the highest-value source for resolving this exact boundary.

The request should be adjudicated specifically for:

1. 2021 project/program/project-component identifier;
2. 2021 procurement reference / PhilGEPS reference;
3. Notice of Award / BAC record;
4. contract number;
5. Notice to Proceed;
6. identifier linking the procurement/contract to the selected FMR and FY2021 UACS representation.

Only if such a bridge is recovered should downstream financial records be traced as the same intervention:

```text
PROCUREMENT
 ↓
AWARD
 ↓
CONTRACT
 ↓
SARO / ALLOTMENT
 ↓
ORS
 ↓
DV
 ↓
LDDAP-ADA / ADA
 ↓
JEV
 ↓
SETTLEMENT
```

## Current Case A disposition

**2021-specific DPWH project/program/procurement identifier: NOT RECOVERED.**

**False-join resilience: PASS.**

**Next evidence source: pending DPWH FOI response.**

**G4 score: remains frozen at 3/8.**

## Source anchors used

- DPWH Annual Infrastructure Program, Region VIII — Cabarasan–Dao entry and `P00046632VS-CW1`.
- DBM FY2016 / historical project budget material — `165004050305802`, ₱10M.
- GPPB CPES report — 2016 Cabarasan–Dao intervention, C D U Construction, ₱9.173M.
- Leyte-Samar Daily Express, 23 Nov 2021 — DPWH Northern Samar 2nd DEO implementation/contractor report.
- Philippine Information Agency, 14 Feb 2022 — completion report from DPWH Northern Samar 2nd DEO.

