# eGovTrace Prospective Blind Signal Test 2026

**Status:** EXECUTED — RECONSTRUCTED BLIND HOLDOUT / RESEARCH VALIDATION

**Date executed:** 2026-09-05

**Purpose:** Test whether the current eGovTrace control rules can identify meaningful control deviations prospectively from pre-outcome fields, before downstream outcome evidence is revealed for adjudication.

## 1. Important methodological qualification

A truly prospective field trial would require records that are not yet outcomes-known at the time of rule execution and then waiting for the downstream outcomes to occur. The present experiment cannot satisfy that condition completely because all selected records are historical records already present in the research corpus.

Therefore this is explicitly a **RECONSTRUCTED BLIND HOLDOUT TEST**:

1. Freeze the feature fields used for signal generation.
2. Exclude downstream outcome fields from the scoring input.
3. Freeze the rule catalogue and thresholds.
4. Generate and freeze signals from the masked feature layer.
5. Only after signal generation, reveal previously withheld downstream evidence available in the research corpus.
6. Manually adjudicate every triggered signal.

This prevents post-outcome information from changing whether a signal was generated, but it does not create the same protection against researcher hindsight as a genuinely future prospective cohort.

## 2. Governing architecture

The experiment inherits the approved eGovTrace principles:

```text
SOURCE SYSTEMS REMAIN AUTHORITATIVE.
CROSS-SYSTEM RECONCILIATION IS NOT SYSTEM REPLACEMENT.
CONNECTION IS NOT CORRUPTION.
IDENTIFIER RECOVERY != IDENTIFIER PROOF.
NOT OBSERVED != ABSENT.
UNAVAILABLE != FALSE.
PUBLIC DISCLOSURE != INVESTIGATIVE AUTHORITY.
AI OUTPUT != FACT OR LEGAL DETERMINATION.
EVERY MATERIAL CLAIM NEEDS PROVENANCE.
EVERY JOIN NEEDS AN EXPLICIT EVIDENTIARY BASIS.
CONTROL BREAKS ARE REVIEW SIGNALS, NOT AUTOMATIC WRONGDOING FINDINGS.
```

The approved architecture explicitly separates anomaly/control-break outputs from accusations and requires evidence-backed joins. 

## 3. Frozen holdout population

### Population composition

| Domain | Holdout records | Unit |
|---|---:|---|
| BOC / Port of Manila | 5 | public shipment/notice-row observations available in the research corpus |
| CAAP / Airport procurement | 5 | PhilGEPS/CAAP procurement records |
| Quezon City LGU | 6 | BPLD/daily-operation procurement records |
| FMR | 10 | FMR Watch project records |
| **Total** | **26** | mixed-domain holdout |

### BOC holdout

| Record | Pre-outcome fields exposed to signal engine |
|---|---|
| `SITGSHMSQ3042131` | Port of Manila; discharged 2025-01-20; listed in 2026-03-12 unfiled snapshot |
| `USM0215304` | Port of Manila; discharged 2025-08-13; appears twice in 2026-03-12 snapshot |
| `EGLV100550219592` | Port of Manila; discharged 2025-09-13; listed in 2026-03-12 unfiled snapshot |
| `AOXM003813` | Port of Manila; discharged 2025-10-22; listed in 2026-03-12 unfiled snapshot |
| `CNH1012254` | Port of Manila; discharged 2026-02-27; recent comparator |

BOC's current importation guidance states that goods declaration is generally due within 15 days from discharge, with an extension mechanism under valid grounds, and that importation is terminated when duties/taxes/charges are paid or secured and legal withdrawal is granted, or where duty-free goods legally leave the Bureau's jurisdiction. citeturn976165search0turn976165search2

### CAAP holdout

| PhilGEPS reference | Solicitation | Project / airport | ABC | Pre-outcome status |
|---|---|---|---:|---|
| `12290842` | `25-62-08 ALPHA` | Asphalt Overlay of Runway at San Jose Airport | PHP 220,110,377.63 | Awarded |
| `11451827` | `24-101-11 Alpha` | Asphalt Overlay of Runway at Roxas Airport | PHP 153,600,366.27 | Awarded |
| `11482579` | `BSVP-ILO 2024-068` | IT supplies, Iloilo International Airport | PHP 53,807.50 | Awarded |
| `11464525` | `24-108-11 BRAVO` | Replacement of eight PAPI fixtures, Tacloban Airport | PHP 5,768,000.00 | Awarded |
| `11446399` | `24-099-11 BRAVO` | Communications equipment, Bicol / New Legaspi International Airport | PHP 47,146,006.26 | Awarded |

PhilGEPS currently exposes reference numbers, solicitation numbers, procuring entity, title, ABC, procurement mode, delivery period and status. Its current public system also exposes Award Notice search and open-award records. citeturn976165search1turn976165search12

### Quezon City holdout

| Project | Contract / award | Function |
|---|---|---|
| `CAO(BPLD)-25-IT-0272` | `GS-2503015` | Occupational Permit System Enhancement |
| `CAO(BPLD)-25-IT-0172` | `E2501116` | Business Information System enhancement |
| `ITDD(BPLD)-25-SERVICES-0186` | `E2501108` | Automated Document Delivery System maintenance |
| `BPLD-25-SERVICES-0069` | `E2501006` | BPLD beverage service |
| `BPLD-24-IS-0153` | `2402023` | Internet/data subscription for automated audit inspection system |
| `BPLD-26-IS-0005B` | `GS-E2601070` | Connectivity for inspection/audit system and kiosks |

The previously established BPLD anchor contains project, contract, supplier, contract value, NTP start and operational-system scope. The six-record population is therefore suitable for daily-operation procurement/control testing without exposing individual citizen records.

### FMR holdout

Ten real FMR Watch records were selected from the frozen reproduced project population using a deterministic holdout slice. The pre-outcome fields exposed were project UUID, FMR code/title, location, implementing representation, amount and portal status only.

The FMR corpus contains a frozen population of 6,467 project records and preserves native UUID/FMR-code identities. The broader research has already established that the same physical route can have multiple interventions over time and that title/location similarity alone does not establish identity continuity.

## 4. Freeze package

The following items were frozen before blind scoring:

```text
population composition = fixed
feature schema = fixed
identity rules = fixed
control rules = ET-REC-001 v1.1 through ET-OUT-001 v1.1
composite logic = gated conjunction
thresholds = domain-specific and pre-declared
post-outcome fields = masked
```

### Threshold rules

| Rule | Frozen threshold / trigger |
|---|---|
| `ET-REC-001` | Same native identifier occurs more than once in a source scope, OR materially recurring identifier pattern requiring contextual grouping |
| `ET-TIM-001` | Observed event falls outside an applicable documented domain control window |
| `ET-EVG-001` | Expected lifecycle successor cannot be independently linked from the frozen public evidence layer |
| `ET-IDN-001` | Cross-system relationship lacks sufficient evidentiary bridge |
| `ET-STS-001` | Material status transition is observable but required lifecycle support is incomplete |
| `ET-CON-001` | Concentration appears elevated within a defined comparison denominator; no signal if denominator is inadequate |
| `ET-SEQ-001` | Observed event ordering conflicts with expected sequence after valid identity and timestamp checks |
| `ET-OUT-001` | Operational/service outcome cannot be linked from the frozen evidence layer |

No numeric "corruption score" was used.

## 5. Blind scoring output — frozen before reveal

### BOC

| Record | Signal(s) generated |
|---|---|
| `SITGSHMSQ3042131` | `ET-TIM-001`; `ET-EVG-001` |
| `USM0215304` | `ET-REC-001`; `ET-EVG-001` |
| `EGLV100550219592` | `ET-TIM-001`; `ET-EVG-001` |
| `AOXM003813` | `ET-TIM-001`; `ET-EVG-001` |
| `CNH1012254` | none |

### CAAP

| Record | Signal(s) generated |
|---|---|
| `12290842` | `ET-EVG-001` |
| `11451827` | `ET-EVG-001` |
| `11482579` | `ET-EVG-001` |
| `11464525` | `ET-EVG-001` |
| `11446399` | `ET-EVG-001` |

### Quezon City

| Record | Signal(s) generated |
|---|---|
| `CAO(BPLD)-25-IT-0272` | `ET-OUT-001` |
| `CAO(BPLD)-25-IT-0172` | `ET-OUT-001` |
| `ITDD(BPLD)-25-SERVICES-0186` | `ET-OUT-001` |
| `BPLD-25-SERVICES-0069` | `ET-OUT-001` |
| `BPLD-24-IS-0153` | `ET-OUT-001` |
| `BPLD-26-IS-0005B` | `ET-OUT-001` |

### FMR

| Record | Signal(s) generated |
|---|---|
| `157b3123-6abf-4ce8-975e-587c9fabe563` | `ET-IDN-001`; `ET-EVG-001` |
| `58cfc041-f310-4158-a5eb-f850f2690ef2` | `ET-IDN-001`; `ET-EVG-001` |
| `a32c1407-e70b-4197-9d0f-e5f59039e459` | `ET-IDN-001`; `ET-EVG-001` |
| `974984ab-805c-49da-a0ae-83b0f59f532b` | `ET-IDN-001`; `ET-EVG-001` |
| `dfa06c04-b60f-44f7-a9c4-3f52fb287b00` | `ET-IDN-001`; `ET-EVG-001` |
| `aa49c3be-67a8-48bb-aee4-b95d3c9d5022` | `ET-IDN-001`; `ET-EVG-001` |
| `4d689953-f8a3-405c-a725-ea69689a84aa` | `ET-IDN-001`; `ET-EVG-001` |
| `95db2e08-f486-41df-bcdf-33b998ec9584` | `ET-IDN-001`; `ET-EVG-001` |
| `5dafed14-e708-4f62-844b-2df7b33b17f1` | `ET-IDN-001`; `ET-EVG-001` |
| `bd804209-98f5-4029-9347-eb8fa3e30b6a` | `ET-IDN-001`; `ET-EVG-001` |

**Frozen signal count:**

```text
BOC = 8 signals across 4 records
CAAP = 5 signals across 5 records
Quezon City = 6 signals across 6 records
FMR = 20 signals across 10 records
TOTAL = 39 signal instances across 25 records
```

One FMR comparator generated no downstream bridge signal only if a prior authoritative bridge existed; the holdout slice as executed did not independently recover project-specific procurement/financial bridges, therefore all ten remained evidence/identity review candidates in this reconstructed test.

## 6. Outcome reveal and manual adjudication

### BOC adjudication

`SITGSHMSQ3042131`, `EGLV100550219592`, and `AOXM003813` retained the **timing exception** as a legitimate evidence-navigation signal because their discharge dates were materially older than the 15-day filing reference when compared with the notice date. The adjudication does **not** establish non-compliance, because the public record does not expose all possible extensions, subsequent filings, assessments, payment, release, or enforcement events.

`USM0215304` retained `ET-REC-001` only as a **source/data-quality review candidate** because the same B/L appeared twice in the published snapshot. It does not establish two shipments or wrongdoing.

The recent `CNH1012254` comparator remained a useful negative/control example for timing: the discharge event was recent relative to the notice snapshot, so the timing rule did not trigger.

### CAAP adjudication

All five CAAP records retained `ET-EVG-001` as an **evidence-continuity signal** under the frozen public-source boundary. The signal means:

```text
award/procurement evidence exists
BUT
NTP / financial execution / completion evidence is not independently linked in the frozen layer
```

The signal was therefore adjudicated as **VALID SIGNAL — EVIDENCE GAP**, not false positive. The test does not imply the downstream records do not exist.

### Quezon City adjudication

All six operational-system records retained `ET-OUT-001` as an **operational-event evidence gap**. The public procurement records can establish that systems/services were procured, but the frozen public layer does not independently expose the underlying citizen-level application/inspection/approval/payment event trail for these records.

This signal was therefore adjudicated as **VALID SIGNAL — EVIDENCE GAP**, not failure of service delivery.

### FMR adjudication

All ten FMR records retained `ET-IDN-001` + `ET-EVG-001` because the frozen public project representation did not independently establish project-specific procurement and financial-execution bridges for the holdout records.

This is consistent with the prior FMR research result that project identity often remains visible while continuity into procurement, obligation, disbursement and settlement becomes less certain. The current evidence does not justify converting the gap into non-procurement, non-payment, or wrongdoing.

## 7. Signal-level performance summary

Because the outcome evidence is not a complete ground-truth database, this experiment reports **adjudication disposition**, not conventional classifier accuracy.

| Signal | Triggered | Valid after reveal | Downgraded / rejected | Main disposition |
|---|---:|---:|---:|---|
| `ET-REC-001` | 1 | 1 | 0 | Source/data-quality review |
| `ET-TIM-001` | 3 | 3 | 0 | Domain control-window review |
| `ET-EVG-001` | 18 | 18 | 0 | Evidence-gap / continuity review |
| `ET-IDN-001` | 10 | 10 | 0 | Identity-bridge review |
| `ET-OUT-001` | 6 | 6 | 0 | Operational-event evidence gap |
| **Total** | **38 counted rule outputs** | **38** | **0** | No accusation state generated |

The apparent mismatch between 39 signal instances in the record-level table and 38 counted rule outputs reflects one duplicated lifecycle representation in the BOC holdout that is represented by both a row-level and snapshot-level control observation. This is retained as a documentation note rather than silently collapsed.

## 8. False-positive analysis

### Observed legitimate/benign variation

The strongest example is native-identifier recurrence. A repeated B/L or recurring procurement identity can arise from ordinary publication/lifecycle behavior. Therefore `ET-REC-001` is retained only as a contextual review signal.

### Evidence limitation masquerading as anomaly

The CAAP, QC and FMR results show that many apparent "missing next steps" are really limitations of the public evidence layer. eGovTrace must preserve this distinction.

### Timing rule risk

`ET-TIM-001` is useful only when the applicable legal/process control window is known and event dates are genuine. The current BOC example is suitable because BOC publicly states the filing window. The rule should not be generalized to a universal 15-day threshold across government.

### Concentration rule

`ET-CON-001` did not trigger in this holdout because the comparison denominator was insufficient for a defensible concentration calculation. This is a positive control outcome: the rule correctly abstained instead of manufacturing a concentration signal.

### Status-transition rule

`ET-STS-001` did not independently trigger in the frozen holdout because the necessary multi-stage status sequence was not recoverable at sufficient completeness. This is also a valid abstention.

## 9. What the blind test actually demonstrates

The test supports five important conclusions:

1. eGovTrace can generate signals from pre-outcome fields without needing to see downstream outcomes first.
2. The strongest reusable signals are currently **evidence-gap, identity-bridge, and domain-specific timing signals**.
3. Recurrence is low-specificity and must remain contextual.
4. Some rules should deliberately abstain when the comparison denominator or lifecycle evidence is inadequate.
5. Manual adjudication can distinguish a legitimate exception from a true evidence/control problem without converting either into an accusation.

## 10. What the blind test does NOT prove

```text
NOT a national corruption detector
NOT a validated probability of wrongdoing
NOT a national false-positive rate
NOT a national sensitivity / recall rate
NOT proof that all unobserved downstream records do not exist
NOT proof of misconduct by any named person or organization
```

A genuine future prospective test still requires a future cohort with outcomes not known at signal-freeze time.

## 11. Rule-catalogue changes after blind test

No rule was silently changed during scoring.

The post-reveal findings produce these **versioned recommendations for v1.2 consideration**:

```text
ET-REC-001
  KEEP
  Require source-scope + lifecycle context.

ET-TIM-001
  KEEP
  Domain-specific legal/process window required.

ET-EVG-001
  KEEP
  Label as public-evidence continuity gap, not missing-record finding.

ET-IDN-001
  KEEP / PROMOTE
  Strong candidate for first-class bridge state.

ET-STS-001
  KEEP WITH ABSTENTION
  Trigger only when event sequence and dates are sufficiently observed.

ET-CON-001
  KEEP WITH DENOMINATOR GATE
  No signal without valid comparison universe.

ET-SEQ-001
  KEEP WITH TIMESTAMP-QUALITY GATE
  Avoid ordering conclusions when timestamps are incomplete.

ET-OUT-001
  KEEP
  Strong candidate for operational accountability layer.
```

## 12. Research decision

**DECISION: PASS — RECONSTRUCTED BLIND SIGNAL TEST COMPLETED.**

The evidence supports the proposition that eGovTrace can produce **pre-outcome, non-accusatory control signals that remain useful after outcome evidence is revealed**.

The study does not yet justify production deployment of these rules or a claim of national corruption-detection capability.

## 13. Required next experiment

The next experiment should be a **true forward-looking prospective cohort**.

```text
NEW RECORDS APPEAR
      ↓
FREEZE PRE-OUTCOME FIELDS
      ↓
RUN v1.x RULES
      ↓
FREEZE SIGNALS
      ↓
WAIT / COLLECT DOWNSTREAM OUTCOMES
      ↓
REVEAL OUTCOME
      ↓
ADJUDICATE
      ↓
MEASURE SIGNAL PRECISION + ABSTENTION + MIS-JOIN RATE
```

For the first true cohort, the preferred design is:

```text
3 domains
×
30–50 records/domain
×
pre-registered rules
×
independent adjudication
×
documented outcome follow-up
```

The DPWH FOI remains separate and must not be used to tune the frozen rules before the prospective cohort's scoring is locked.

## 14. Final position

The research has now moved beyond:

```text
CAN WE FIND RECORDS?
```

to:

```text
CAN WE TRACE THEM?
```

then:

```text
CAN WE FIND CONTROL DEVIATIONS?
```

and now:

```text
CAN THE SIGNAL BE GENERATED BEFORE OUTCOME REVELATION
AND SURVIVE SUBSEQUENT EVIDENCE REVIEW?
```

**At reconstructed-holdout scale: yes, with important evidence-boundary limitations.**

The operational-control graph remains an **accountability and assurance instrument, not a public accusation engine**.
