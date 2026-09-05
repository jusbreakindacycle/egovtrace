# eGovTrace — Case A DPWH Project/Program Identity Recovery
## 2021 Northern Samar 2nd District Engineering Office — Cabarasan–Dao FMR

## Research status

**Research stream:** Case A — DPWH Project/Program Identity Recovery  
**Execution date:** 2026-09-05  
**Purpose:** Recover a defensible DPWH project/program identifier, Contract ID, procurement reference, or equivalent bridge between the confirmed 2021 FMR/budget representation and procurement.  
**G4 boundary:** Controlled deepening / validation research. No automatic G4 rescore.  
**FOI channel:** Previously submitted by user; this public-source branch is kept separate from the FOI response channel.

## 1. Frozen case identity

- FMR UUID: `7afb3618-2c25-499f-8147-862d36c59ee4`
- Frozen frame index: `6215`
- FMR code: `2021-R8-NOS-INFRA-FMRDP-FMR-00547`
- FMR Watch title: `Concreting of Barangay Cabarasan to Barangay Dao FMR, Gamay, Northern Samar`
- FMR Watch amount: `PHP 12,500,000`
- Implementing office: `DPWH Northern Samar 2nd District Engineering Office`
- Known contractor anchor: `A-Cube Construction and Supply`
- DBM FY2021 direct-release UACS representation: `310203206922000`

## 2. Research question

> Can a DPWH institutional project/program identifier, Contract ID, procurement reference, or other authoritative bridge be recovered that defensibly connects the selected 2021 Cabarasan–Dao FMR to the procurement/contract layer?

The research deliberately does **not** treat title, route, amount, contractor, municipality, or a similar code as sufficient identity proof.

## 3. Public-source results

### 3.1 2021 budget representation remains confirmed

DBM's FY2021 Expenditure Program identifies:

`310203206867000` — `Concreting of Brgy. Cabarasan to Brgy. Dao FMR, Brgy. Cabarasan and Brgy. Dao, Gamay, Northern Samar` — `PHP 12,500,000`.

This is the FY2021 NEP representation. The separately recovered FY2021 direct-release material uses UACS `310203206922000`. This remains an identifier/representation variation already recorded in the Case A dossier, not an automatic contradiction.

Source: DBM FY2021 Expenditure Program. citeturn769364search15

### 3.2 DPWH project-component identifier recovered, but not temporally bridged to the selected 2021 intervention

A current DPWH Annual Infrastructure Program entry identifies:

- Project Component ID: `P00046632VS-CW1`
- Description: `Concreting of Brgy. Cabarasan - Brgy. Dao Farm-to-Market Road, Gamay, Northern Samar - Construction of Concrete Road`
- Implementing Office: `Northern Samar 2nd District Engineering Office`
- UACS PAP shown in that record: `165004050305802`
- Allocation shown in that record: `PHP 10,000,000`

Source: DPWH Region VIII Annual Infrastructure Program. citeturn728856search0

This is a significant institutional identity candidate because `P00046632VS-CW1` is explicitly a DPWH Project Component ID.

However, the available record is a current DPWH AIP representation and does **not by itself prove** that `P00046632VS-CW1` is the same institutional project representation used for the selected 2021 FMR. The UACS and amount also differ from the recovered FY2021 FMR budget representations.

Disposition:

`P00046632VS-CW1 → 2021 selected FMR = NOT ESTABLISHED`

This is therefore **not promoted to a successful bridge**.

### 3.3 Historical 2016 procurement reference is a confirmed false-join boundary

An indexed historical PhilGEPS/DPWH dataset identifies:

- Organization: Department of Public Works and Highways — Northern Samar 2nd
- Reference ID: `4088342`
- Notice title: `17IJ0004 Construction of Brgy. Cabarasan – Dao Road, Gamay, Northern Samar`
- Publish date: `29/09/2016`
- ABC: `PHP 9,625,460.47`
- Line Item ID: `17IJ0004`
- Notice status: `Closed`

Source: DPWH/PhilGEPS deficiencies dataset. citeturn664827search4

This record is **not** the selected 2021 FMR. It is retained as a temporal adversarial case:

`2016 Cabarasan–Dao procurement ≠ 2021 Cabarasan–Dao FMR`

A route/title match cannot establish intervention continuity.

### 3.4 2016 CPES record independently corroborates the older intervention

The CIAP/PDCB performance report identifies:

- Constructor: `C D U Construction`
- License: `13915`
- Project: `Concreting of Cabarasan - Dao Farm to Market Road, Gamay, Northern Samar`
- Implementing agency: `Northern Samar 2nd DEO`
- Date of evaluation: `08/28/2016`
- Contract value field: `9.173` million
- Contract duration: `60`
- Status: `C`
- CPES visit rating: `82.9% Satisfactory`

Source: CIAP/PDCB CPES report. citeturn664827search5turn769364search16

This strengthens the temporal separation test and shows that the same physical corridor/name can have multiple institutional project representations across years.

### 3.5 2021 agency-origin implementation evidence remains the strongest 2021 contractor anchor

The November 23, 2021 report reproducing Northern Samar 2nd DEO public information states that construction of the Cabarasan–Dao FMR started on August 23, 2021, was under contract with A-Cube Construction and Supply, and had 43.60% accomplishment as of October 31, 2021.

Source: Leyte-Samar Daily Express, reproducing DPWH Northern Samar 2nd DEO information. citeturn664827search3

This remains agency-origin secondary evidence, not a recovered primary contract.

## 4. Bridge assessment

| Transition | Candidate identifier / evidence | Join type | Status | Disposition |
|---|---|---|---|---|
| 2021 FMR → FY2021 budget | title + location + FY + amount + DBM representation | J3 | CONFIRMED | Existing Case A evidence |
| 2021 FMR → DPWH Project Component ID | `P00046632VS-CW1` | J5/J4 candidate only | NOT ESTABLISHED | Current AIP timing not proven as 2021 continuity; UACS/amount differ |
| 2021 FMR → 2016 PhilGEPS reference | `4088342` / `17IJ0004` | J6 test | REJECTED | Different fiscal-era intervention |
| 2021 FMR → A-Cube | agency-origin report | J4 | DOCUMENTED AGENCY-ORIGIN SECONDARY | Not primary contract identity |
| 2021 FMR → primary Contract ID | none recovered | — | UNRESOLVED | FOI/institutional evidence remains highest-value |

## 5. Important new finding

The public search recovered a **DPWH-native Project Component ID** (`P00046632VS-CW1`) attached to the same route/project wording.

This is important because it demonstrates that DPWH has a project-component identity layer that could potentially serve as an intermediate eGovTrace bridge.

But the evidence does not currently prove that this identifier is the identity of the selected **2021** intervention.

The difference is material:

```text
SELECTED 2021 FMR
PHP 12.5M
DBM UACS: 310203206922000
NEP UACS: 310203206867000
FMR code: 2021-R8-NOS-INFRA-FMRDP-FMR-00547

CURRENT DPWH AIP REPRESENTATION
Project Component ID: P00046632VS-CW1
PHP 10M
UACS: 165004050305802
```

The same/near-same project wording is therefore insufficient to collapse these representations.

## 6. Adversarial / false-join results

### False-join test A — same route/title, different year

`2016 17IJ0004 Cabarasan–Dao` was recovered as a separate procurement representation.

Disposition:

`REJECTED JOIN`

### False-join test B — same project wording, later DPWH component representation

`P00046632VS-CW1` appears in a current DPWH AIP with the same/near-same description.

Disposition:

`NOT ESTABLISHED`, not joined to 2021 absent temporal bridge evidence.

### False-join test C — contractor as identity key

A-Cube is associated with the selected 2021 project through agency-origin secondary evidence, but contractor identity alone is not a project or contract identifier.

Disposition:

`J4 corroborative association`, not primary identity proof.

## 7. Result

**DPWH project/program identity recovery: PARTIAL**

A DPWH-native Project Component ID was recovered:

`P00046632VS-CW1`

but the research could not establish that this is the institutional project identity for the selected 2021 FMR.

No defensible 2021-specific:

- Contract ID
- PhilGEPS Reference Number
- Award Notice Number
- Solicitation/Procurement Reference
- Notice of Award
- Notice to Proceed

was recovered in this public-source branch.

Therefore the critical bridge remains:

```text
2021 FMR
  ↓ CONFIRMED
2021 BUDGET / UACS
  ↓
DPWH 2021 PROJECT COMPONENT ID
  = NOT ESTABLISHED
  ↓
PRIMARY PROCUREMENT
  = NOT ESTABLISHED
  ↓
PRIMARY CONTRACT
  = UNRESOLVED
```

## 8. Interpretation

This is a useful validation result rather than a failed search in the ordinary sense.

The public record demonstrates:

1. DPWH has a native project-component identifier representation.
2. Similar project descriptions can persist across different years and interventions.
3. A current DPWH identifier cannot be safely back-projected into a historical intervention without temporal continuity evidence.
4. The missing 2021 project-to-procurement bridge remains the principal unresolved edge.

This supports the eGovTrace architecture's requirement that joins carry temporal validity and an explicit evidentiary basis.

## 9. Next evidence boundary

The highest-value unresolved target remains:

```text
2021 project
→ DPWH institutional project/component record for CY2021
→ procurement reference
→ Contract ID
```

Because the FOI has already been submitted, the next adjudication event should be the agency response.

A future response should be checked first for:

- DPWH project/component ID
- procurement reference
- Contract ID
- PhilGEPS reference
- award reference
- NOA
- NTP

Only after a defensible contract/procurement identity is established should the financial bridge be pursued from:

`contract → SARO/allotment → ORS → DV → LDDAP-ADA/ADA → JEV → settlement`.

## 10. Frozen G4 consequence

No automatic G4 rescore.

Candidate 2 remains:

`G4 = 3/8`

The present branch improves the evidence map and adds a DPWH-native identifier candidate plus adversarial temporal boundaries, but does not close the 2021 procurement bridge.
