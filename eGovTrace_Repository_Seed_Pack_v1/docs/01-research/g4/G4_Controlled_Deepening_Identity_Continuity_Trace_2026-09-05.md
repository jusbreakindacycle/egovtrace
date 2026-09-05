# G4 Controlled Deepening — Project-Specific Financial Execution & Identity-Continuity Trace

## Status

**Formal gate:** G4 Controlled Deepening (not a new formal gate)

**Research question:** Can one selected public project be followed through the State's own administrative and financial representations without inventing the joins between them?

**Execution mode:** Controlled desk-research trace using the frozen candidates and previously established evidence, supplemented by current web-source recovery.

**FOI state:** FOI IDENTIFIED AS NEXT-EVIDENCE CHANNEL; FOI WAS NOT EXECUTED IN THIS PASS.

## Time instrumentation

**Execution start UTC:** 2026-09-05T04:03:20.635918Z
**Execution end UTC:** 2026-09-05T04:04:09.032Z
**Calendar elapsed:** 48.396 seconds
**Active research time:** 48.396 seconds
**Time-band:** FAVORABLE (<=4h)

This pass did not include breaks or inactive intervals between the recorded start and end timestamps. Calendar elapsed and active research time are therefore equal for this bounded desk-research session.

Important temporal rule:

> SEARCH TIME != EVIDENCE DATE

Dates found inside government or agency records retain their own documentary meaning and must not be confused with the 2026-09-05 research execution date.

## Governing frame

Frozen FMR Watch frame:

- Frame ID: `FMR-FRAME-2026-09-03-859cc9bd480e`
- SHA-256: `859cc9bd480e3d219e9586d02e162889b5462553c40666fd2f10d49853fd4fc9`
- Record count: 6467

G3 selected two candidates from the 6465-record eligible pool after two pre-registered exclusions. No replacement was used and research difficulty/data richness were not selection variables.

## Identity-continuity model

```text
FMR UUID / FMR code
    ↓
DPWH project identity
    ↓
Procurement reference
    ↓
Contract number / contract record
    ↓
UACS / PAP / budget representation
    ↓
SARO / allotment representation
    ↓
ORS / obligation
    ↓
DV / disbursement
    ↓
LDDAP-ADA / ADA
    ↓
JEV / accounting
    ↓
Settlement / payment
```

Core safeguard:

> IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF

A code, amount, contractor, location, or project-name similarity is not sufficient by itself to prove that two records refer to the same intervention.

## Evidence status vocabulary

- **CONFIRMED** — directly established from authoritative evidence.
- **DOCUMENTED AGENCY-ORIGIN SECONDARY** — credible agency-origin information reproduced by a secondary source; not treated as recovered primary source.
- **DOCUMENTED OBSERVATION** — observed research fact, including a rejected join.
- **NOT ESTABLISHED** — evidence sufficient for a positive assertion was not recovered.
- **UNRESOLVED** — relationship remains open.
- **NOT EXECUTED** — the evidence-acquisition action was identified but not actually performed.

`NOT ESTABLISHED`, `UNRESOLVED`, `NOT OBSERVED`, and `NOT EXECUTED` are not findings of absence, misconduct, fraud, non-payment, or false reporting.

---

# Candidate 1

## Identity

**FMR UUID:** `5eff0b52-8f48-456b-9246-7e623533ea4e`

**Frame index:** 3724

**FMR Watch representation:**
Concreting of Purok 5 to Sitio Kaliloan, Brgy. Poblacion FMR, Brgy. Poblacion, Bunawan, Agusan del Sur

**FMR code:** `2024-R13-ADS-INFRA-FMRDP-FMR-00329`

**FMR Watch amount:** ₱10,000,000

**FMR Watch status:** Completed

## Identity-continuity findings

| Link / node | Status | Evidence / reason |
|---|---|---|
| FMR UUID → FMR project representation | CONFIRMED | Frozen FMR Watch record |
| Project → administrative geography | CONFIRMED | FMR Watch + prior G4 reconciliation |
| Project → FY2024 budget representation | CONFIRMED | DBM FY2024 GAA / direct-release record |
| Project → UACS `310203211128000` | CONFIRMED | DBM FY2024 direct-release record |
| Project → primary procurement | NOT ESTABLISHED | Exact project/code searches produced no defensible primary PhilGEPS/DPWH procurement record |
| Project → contract | UNRESOLVED | No project-specific contract identifier recovered |
| Project → SARO / allotment transaction | UNRESOLVED | Budget/direct-release evidence exists, but project-specific downstream allotment authority record was not recovered |
| Project → ORS / obligation | UNRESOLVED | No project-specific ORS recovered |
| Project → DV / disbursement | UNRESOLVED | No project-specific DV recovered |
| Project → LDDAP-ADA / ADA | UNRESOLVED | No project-specific LDDAP-ADA/ADA recovered |
| Project → JEV / accounting | UNRESOLVED | No project-specific JEV recovered |
| Project → settlement / payment | NOT ESTABLISHED | No project-specific settlement evidence recovered |

## Naming variation

DBM representations use `Kalilaan`, while the frozen FMR Watch representation uses `Kaliloan`.

This is retained as a **naming variant**, not silently normalized.

## Rejected false join

A DPWH Agusan del Sur 2nd DEO PMR search result contained `310203211128000.EAO`, but the associated procurement item was for a **Fire Alarm and Detection System** for the district engineering office rather than the selected FMR.

Disposition:

```text
UACS resemblance → PROJECT JOIN = REJECTED
```

This is the direct empirical precedent for the rule:

> IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF

## Current chain state

```text
FMR project
  ↓ CONFIRMED
FY2024 budget / UACS
  ↓ NOT ESTABLISHED
primary procurement
  ↓ UNRESOLVED
contract
  ↓ UNRESOLVED
obligation
  ↓ UNRESOLVED
disbursement / payment
```

**No project-specific financial execution chain established.**

---

# Candidate 2

## Identity

**FMR UUID:** `7afb3618-2c25-499f-8147-862d36c59ee4`

**Frame index:** 6215

**FMR Watch representation:**
Concreting of Barangay Cabarasan to Barangay Dao FMR, Gamay, Northern Samar

**FMR code:** `2021-R8-NOS-INFRA-FMRDP-FMR-00547`

**FMR Watch amount:** ₱12,500,000

**FMR Watch status:** Completed

## Identity-continuity findings

| Link / node | Status | Evidence / reason |
|---|---|---|
| FMR UUID → FMR project representation | CONFIRMED | Frozen FMR Watch record |
| Project → administrative geography | CONFIRMED | FMR Watch + prior G4 reconciliation |
| Project → FY2021 budget representation | CONFIRMED | DBM FY2021 NEP / direct-release record |
| Project → UACS `310203206922000` | CONFIRMED | DBM FY2021 direct-release record |
| Project → primary procurement | NOT ESTABLISHED | Exact-project procurement searches returned no defensible primary PhilGEPS record |
| Project → contractor | DOCUMENTED AGENCY-ORIGIN SECONDARY | Northern Samar 2nd DEO report reproduced by Leyte-Samar Daily Express |
| Project → contract existence | DOCUMENTED AGENCY-ORIGIN SECONDARY | 2021 report states the project was under contract with A-Cube Construction and Supply |
| Project → implementation | DOCUMENTED AGENCY-ORIGIN SECONDARY | Start reported 2021-08-23; 43.60% accomplishment as of 2021-10-31 |
| Project → SARO / allotment transaction | UNRESOLVED | Direct-release budget representation recovered; project-specific SARO not recovered |
| Project → ORS / obligation | UNRESOLVED | No project-specific ORS recovered |
| Project → DV / disbursement | UNRESOLVED | No project-specific DV recovered |
| Project → LDDAP-ADA / ADA | UNRESOLVED | No project-specific LDDAP-ADA/ADA recovered |
| Project → JEV / accounting | UNRESOLVED | No project-specific JEV recovered |
| Project → settlement / payment | NOT ESTABLISHED | No project-specific settlement evidence recovered |

## Identifier variation

DBM FY2021 NEP identifies the same project at ₱12.5M under UACS `310203206867000`, while the FY2021 direct-release document uses `310203206922000`.

This is recorded as **budget-representation / identifier variation**, not automatically as contradiction.

## Agency-origin implementation evidence

The 23 Nov 2021 Leyte-Samar Daily Express report reproduces a Northern Samar 2nd DEO public-information report stating that:

- the Cabarasan–Dao FMR was constructed beginning 23 Aug 2021;
- it was funded under DPWH CY2021 regular infrastructure projects through the Department of Agriculture;
- it was under contract with A-Cube Construction and Supply;
- 43.60% accomplishment was reported as of 31 Oct 2021.

This is materially stronger implementation evidence than Candidate 1 currently has, but it is **not** promoted to primary contract or primary financial execution evidence.

## Current chain state

```text
FMR project
  ↓ CONFIRMED
FY2021 budget / UACS
  ↓ DOCUMENTED AGENCY-ORIGIN SECONDARY
contractor / implementation
  ↓ NOT ESTABLISHED
primary procurement
  ↓ UNRESOLVED
primary contract
  ↓ UNRESOLVED
obligation
  ↓ UNRESOLVED
disbursement / payment
```

**Financial execution remains the largest unresolved bridge.**

---

# Cross-candidate findings

## 1. Project identity is currently strongest through budget level

Both candidates can be defensibly linked from the FMR Watch project representation to a fiscal-year budget representation and amount.

The next stage is materially weaker because the identifiers do not behave like a single universal key across every institutional record class.

## 2. Procurement evidence is still not primary for either candidate

Candidate 2 has useful agency-origin evidence identifying A-Cube Construction and Supply, but the primary procurement record was not recovered.

Candidate 1 currently has no comparable project-specific procurement/contract anchor.

## 3. No project-specific obligation/payment chain was recovered for either candidate

Current state:

```text
Candidate 1: ORS → DV → LDDAP-ADA/ADA → JEV → settlement = UNRESOLVED / NOT ESTABLISHED
Candidate 2: ORS → DV → LDDAP-ADA/ADA → JEV → settlement = UNRESOLVED / NOT ESTABLISHED
```

This does **not** mean either project was unpaid.

## 4. Government financial workflow confirms these are distinct evidentiary stages

DBM's current published procedure shows ORS, DV, LDDAP-ADA and supporting documents moving through separate processing stages; it also states that the ORS is posted in the Registry of Allotments, Obligations and Disbursements (RAOD) with an assigned ORS number. The procedure for infrastructure-project payment also calls for documents including the approved contract, Notice of Award, Notice to Proceed, progress billing, inspection report, statement of work accomplished, and monthly certificate of payment.

Therefore the model should preserve separate nodes for:

```text
allotment authority
obligation
DV / disbursement documentation
LDDAP-ADA / ADA
accounting
settlement
```

and must not collapse them into one `PAID` state.

## 5. Bridge identifier remains the highest-value missing discovery

The most valuable next discovery is not necessarily the peso amount.

It is the identifier transition that allows one government representation to be defensibly connected to the next:

```text
FMR code
→ DPWH project ID
→ procurement reference
→ contract number
→ UACS/PAP
→ SARO / allotment reference
→ ORS number
→ DV number
→ LDDAP-ADA / ADA reference
→ JEV
→ settlement reference
```

## 6. Search effort is now explicitly measured

This execution consumed **48.396 seconds of active research time** and **48.396 seconds of calendar elapsed time**, producing a favorable G4 time-band for this bounded desk-research session.

This time-band describes **search/research effort**, not project complexity in the real world.

It must not be combined with the documentary dates of the records recovered.

## 7. FOI status

```text
FOI IDENTIFIED AS NEXT-EVIDENCE CHANNEL
FOI EXECUTED = NO
```

No FOI request was filed during this pass.

Therefore no claim may be made that an institution denied, ignored, fulfilled, or lacked records in response to FOI.

---

# G4 state after this deepening

The baseline G4 score remains preserved:

```text
Candidate 1 = 3/8
Candidate 2 = 3/8
```

No silent retroactive score change has been made.

This controlled deepening may support a later **versioned** relationship update if additional defensible evidence is recovered.

Current unresolved relationships remain primarily:

```text
procurement
contract (primary)
obligation / ORS
DV / disbursement
LDDAP-ADA / ADA
JEV / accounting
settlement / payment
physical verification
oversight
```

---

# Next admissible evidence-acquisition step

The next strongest step is **institutional source recovery**, not broader generic web searching.

Priority:

1. Recover the project-to-procurement identifier from the implementing office / procurement records.
2. Recover contract number and primary contract record.
3. Use the contract/UACS/project key to request or locate ORS.
4. Follow the ORS into DV and LDDAP-ADA/ADA records.
5. Locate accounting / JEV reference and, where possible, actual settlement evidence.
6. Separately recover inspection/acceptance and oversight evidence.

Candidate 2 should use its known contractor and implementing-office anchors for enhanced tracing, while Candidate 1 must still receive the same minimum baseline protocol.

Any FOI request must be logged separately as:

```text
FOI IDENTIFIED AS NEXT-EVIDENCE CHANNEL
```

until it is actually filed.

---

# Bottom-line finding

The identity-continuity test has **not yet produced a complete project-to-payment chain for either candidate**.

It has, however, produced a more precise structural result:

> **Project identity remains defensibly traceable through budget representation for both candidates, but the continuity of identity into procurement, obligation, disbursement, accounting, and settlement remains insufficiently evidenced from publicly recovered records.**

Candidate 2 currently has stronger agency-origin implementation/contract evidence than Candidate 1, but neither candidate has a primary, project-specific obligation-to-settlement chain.

The central unresolved eGovTrace problem is therefore now sharply defined as **cross-system identity continuity**, rather than merely “missing payment records.”
