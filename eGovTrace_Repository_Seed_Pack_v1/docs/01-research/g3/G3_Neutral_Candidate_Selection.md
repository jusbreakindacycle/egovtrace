# G3 — Neutral Candidate Selection

**Program:** eGovTrace / Philippine State Control & Assurance Research  
**Research Track:** FMR Reconciliation Experiment  
**Gate:** G3 — Neutral Candidate Selection  
**Status:** PROTOCOL FROZEN / EXECUTION BLOCKED ON FULL-FRAME ENUMERATION  
**Decision date:** 2026-09-02  

---

## 1. Governing Sequence

```text
G0 — Minimum FMR Ontology
    ↓
G1 — Field-by-Field Data Access Matrix
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

G3 does not create new analytical variables. Its purpose is to select experiment subjects without outcome leakage.

---

## 2. Sampling Frame

The intended sampling frame is the **entire currently observable FMR Watch project frame**, not a subset pre-filtered for data richness, procurement visibility, financial visibility, suspected anomalies, or known outcomes.

The live FMR Watch projects page currently reports:

- FMR Watch version 1.3.6;
- a public project search/filter interface;
- **6,424 projects found**;
- regional, provincial, municipal/barangay, status, program, and year filters; and
- 10 projects displayed per page on the visible index.

Source:

`https://fmrwatch.bafe.gov.ph/projects`

The frame is therefore publicly observable, but a reproducible machine-readable enumeration of all 6,424 records has not been established in this research environment.

---

## 3. Definition of Neutral Candidate Selection

A candidate is neutral when its selection is determined from the pre-registered sampling frame and entry criteria **without using information that reflects downstream reconciliation outcomes**.

Neutrality is relative to the observable FMR Watch frame. It does not claim statistical representativeness of every FMR in the Philippines outside that frame.

---

## 4. Minimum Entry Eligibility

A project may enter the candidate frame only when all of the following are true at selection time:

1. A public FMR Watch project representation is observable.
2. The record is sufficiently identifiable as a distinct project representation.
3. Basic project location and context are present in the FMR Watch representation.
4. The record is not a duplicate of another frame record under the published frame itself.
5. The record falls within the temporal scope defined for the eventual experiment, if a temporal scope is imposed.
6. The record is not a prior research anchor or known stress/reference case excluded below.

These are **minimum entry criteria**, not measures of data richness.

---

## 5. Variables Prohibited from Selection

The following must not influence candidate selection or replacement:

- successful PhilGEPS match;
- successful DBM match;
- obligation/payment availability;
- contract availability;
- financial anomaly;
- procurement anomaly;
- physical nonexistence or suspected nonexistence;
- ghost-project status;
- complaint or citizen report;
- audit status;
- legal or investigative status;
- contractor reputation;
- data richness;
- ease of reconciliation;
- expected analytical value;
- suspicion level; or
- any fact learned only after selection.

This implements outcome-leakage control.

---

## 6. Prior Research Anchors Are Not Neutral Candidates

### Exclude: New Casay / New Casayuran FMR

New Casay is the G1 feasibility/development anchor and has already been researched across FMR Watch, procurement, DBM, and financial-lifecycle questions.

It must not be selected as a neutral G3 candidate.

### Exclude: Known Guinobatan / Lower Binogsacan ghost case

This is a known stress/reference case and carries prior outcome information.

It may be retained as a separate stress-test/reference subject, but it must not enter the neutral random candidate pool.

---

## 7. Information Boundary

Selection uses only information observable **at the moment of candidate selection** from the defined sampling frame and pre-registered eligibility rules.

Any information recovered afterward is post-selection analytical information.

The research record must maintain that temporal separation.

---

## 8. Selection Method

Once the full frame is reproducibly enumerated:

1. record the complete frame snapshot or a cryptographically verifiable equivalent;
2. assign each eligible frame record a deterministic frame index;
3. exclude only pre-registered ineligible records and the two known prior-research exclusions;
4. record the resulting eligible-frame count;
5. generate a deterministic random ordering using a recorded seed or equivalent reproducible method;
6. select the pre-registered number of candidates from that ordering;
7. record all replacements, if any, and their pre-selection eligibility reasons.

No investigator judgment may reorder the random output based on apparent research value.

---

## 9. Replacement Rule

A selected project may be replaced only if a pre-registered entry-eligibility condition is shown to have failed.

Replacement is not permitted because the project is:

- difficult to research;
- missing downstream data;
- unusually ordinary;
- suspicious;
- too clean;
- geographically inconvenient; or
- analytically uninteresting.

If a selected project later proves data-poor, that fact becomes part of the experiment.

---

## 10. Reproducibility Record

The G3 execution record must preserve at minimum:

| Field | Required value |
|---|---|
| Selection date/time | exact timestamp |
| Sampling frame locator | exact FMR Watch locator |
| Frame snapshot/hash | recorded |
| Reported frame count | 6,424 at current observation |
| Eligibility rule version | recorded |
| Exclusion rule version | recorded |
| Prior-research exclusions | New Casay; Guinobatan/Lower Binogsacan |
| Eligible-frame count | recorded at execution |
| Selection method | deterministic random ordering |
| Seed / equivalent | recorded |
| Selected candidate IDs | recorded |
| Replacement events | recorded, if any |
| Selection-time information | recorded |
| Post-selection information | kept separate |

---

## 11. Small-Pool Rule

If fewer than the required number of eligible candidates remain after applying the fixed criteria:

**Do not loosen the criteria ad hoc.**

Record the deficiency and make a separately documented scope decision.

---

## 12. Data-Richness Rule

```text
MINIMUM ENTRY OBSERVABILITY
        ≠
MAXIMUM DATA RICHNESS
```

The point of G3 is precisely to allow the experiment to discover whether downstream reconciliation capability is uneven across otherwise eligible projects.

Selecting only highly traceable projects would bias the experiment toward successful reconciliation.

---

## 13. Role of OCP in G3

The newly approved **Obligation Compliance Persistence** pattern does not alter candidate selection.

OCP is an analytical/control pattern used after candidate selection when the evidence supports obligation-lifecycle analysis.

It is not a G3 eligibility variable.

---

## 14. Adversarial Checks

### Check 1 — Does full-frame sampling secretly become representative sampling?

**No.** It is neutral relative to the observable FMR Watch frame only.

### Check 2 — Does exclusion of New Casay bias the sample?

The exclusion is pre-registered because it is a prior feasibility anchor. It is not outcome-driven at G3 execution time.

### Check 3 — Does exclusion of the known ghost case remove an important case?

It removes prior-outcome information from the neutral pool while preserving the case as a separate stress/reference subject.

### Check 4 — Does inability to enumerate all 6,424 records justify sampling page 1?

**No.** Page-one convenience sampling would be a different methodology and would violate the approved neutral-frame design.

### Check 5 — Can the investigator replace hard cases?

**No.** Difficulty is part of the experimental result.

---

## 15. Current G3 Disposition

### Protocol

**FROZEN / APPROVED.**

### Execution

**NOT COMPLETED.**

The live FMR Watch frame is visibly public and reports 6,424 projects, but the research environment does not yet possess a reproducible full-frame enumeration from which to perform the required deterministic random draw.

Therefore selecting candidates from the visible first page would be methodologically invalid.

The correct G3 state is:

```text
G3 DESIGN = COMPLETE / FROZEN
G3 EXECUTION = BLOCKED
BLOCKER = FULL-FRAME ENUMERATION / SNAPSHOT
```

---

## 16. Stop Rule

G3 must not be declared complete until the following are all true:

- the full observable frame is reproducibly enumerated or snapshotted;
- fixed eligibility and exclusion rules are applied;
- deterministic random ordering is reproducible;
- selected candidate IDs are recorded;
- replacements, if any, are justified by pre-selection eligibility failure;
- no outcome-bearing variables influenced selection.

Only then may the process advance to:

```text
G3 — COMPLETE / FROZEN
        ↓
G4 — Pre-Registered Evaluation Criteria
```

---

# Final Disposition

**G3 protocol is frozen.**

**G3 execution is deliberately not falsified as complete.** The current blocker is reproducible enumeration of the full 6,424-project observable FMR Watch frame.
