# G3-FE — FMR Watch Frame Enumeration & Reproducibility Test
## Execution Record — 2026-09-02

**Program:** eGovTrace / Philippine State Control & Assurance Research  
**Research Track:** FMR Reconciliation Experiment  
**Formal gate:** G3 — Neutral Candidate Selection  
**Sub-test:** G3-FE — FMR Watch Frame Enumeration & Reproducibility Test  
**Execution status:** EXECUTED — FRAME ENUMERATION NOT ESTABLISHED  
**Final disposition:** **INCONCLUSIVE**  

---

## 1. Governing Question

Can the currently observable FMR Watch population be deterministically enumerated, uniquely identified, preserved, and independently reproduced without using downstream project information?

The approved G3-FE protocol requires eight critical conditions:

1. Frame Accessibility
2. Complete Enumeration
3. Record Identity
4. Completeness / Count Reconciliation
5. Duplicate & Collision Test
6. Snapshot Integrity
7. Independent Reproduction
8. Outcome-Leakage Audit

A PASS requires all eight conditions.

---

## 2. Source Examined

**Primary source:** FMR Watch public projects portal  
**URL:** https://fmrwatch.bafe.gov.ph/projects  
**Portal version displayed:** FMR WATCH 1.3.6  
**Access date:** 2026-09-02  
**Exact retrieval time:** not captured by the web retrieval layer; this remains an execution-record limitation.

The public page currently exposes:

- `6424 Projects Found`
- filters for program, region, province, city/municipality, barangay, status, and year
- 10 visible project records per page
- `Showing 1 to 10 of 6424 results`
- `Page 1 of 643`
- individual project-detail links using UUID-like locators

These observations establish a public, paginated project frame, but do not by themselves establish complete machine-reproducible enumeration.

---

## 3. G3-FE Results

### G3-FE1 — Frame Accessibility

**Result: PASS (public observability only)**

The unfiltered public project page is accessible and exposes a stated population count of 6,424 projects with pagination at 10 records per page.

The source page also exposes a visible portal version (`1.3.6`).

**Limitation:** exact request/response mechanics, API endpoint, export route, and machine-readable retrieval contract were not established from the public retrieval surface used in this execution.

### G3-FE2 — Complete Enumeration

**Result: INCONCLUSIVE / NOT ESTABLISHED**

The portal states 6,424 projects and 643 pages, but this execution did not obtain a complete, deterministic record-level enumeration of all 6,424 records.

The available public HTML surface exposes the first page and the control total, while subsequent pagination could not be independently traversed through the retrieval path used for this test. Direct attempts to address parameterized pagination routes were not accepted by the retrieval layer, and the underlying machine-readable endpoint was not established.

**Important:** this does not prove that the portal itself lacks an API or deterministic pagination mechanism. It proves only that such a mechanism was not established during this execution.

### G3-FE3 — Record Identity

**Result: PARTIAL**

Individual project-detail links use UUID-like project locators. This is sufficient to establish that the public project population has record-level locators.

It is not sufficient to establish that these locators are stable native database primary keys, immutable identifiers, or cross-system identifiers.

A deterministic full-frame fingerprint could not be generated because the full population was not enumerated.

### G3-FE4 — Completeness / Count Reconciliation

**Result: INCONCLUSIVE**

The portal reports 6,424 projects and 643 pages at 10 records per page. That is internally consistent with the stated page size and total.

However, the independent enumerated count is unavailable. Therefore:

`portal control total = 6424`  
`independently enumerated total = NOT ESTABLISHED`

No unexplained page gaps can be ruled out because all page ranges were not independently traversed.

### G3-FE5 — Duplicate & Collision Test

**Result: NOT EXECUTED / INCONCLUSIVE**

A duplicate/collision test requires the enumerated frame, at minimum at the level of native locator, source locator, or deterministic source-record fingerprint.

Because the full frame was not enumerated, population-wide duplicate and collision testing could not be completed.

The protocol therefore does not permit a uniqueness assertion for the full population.

### G3-FE6 — Snapshot Integrity

**Result: NOT EXECUTED**

No complete raw frame snapshot was obtained. Consequently there is no complete canonical enumeration file and no SHA-256 hash representing the complete frame.

The observed portal control total and visible first-page records may be preserved as execution evidence, but these are not a frozen frame.

### G3-FE7 — Independent Reproduction

**Result: INCONCLUSIVE / NOT EXECUTED**

The mandatory deterministic rerun (R1) requires a frozen frame or an equivalent reproducible enumeration procedure.

Because the first complete enumeration was not established, an R1 reproduction of the full frame could not be performed.

A second independent execution path (R2) therefore cannot cure the missing R1 baseline.

### G3-FE8 — Outcome-Leakage Audit

**Result: PASS for this execution**

No downstream project outcomes were used to define or filter the 6,424-project frame during this execution.

Specifically, candidate selection was not performed using:

- PhilGEPS match status
- DBM match status
- obligation or payment status
- physical-completion status
- anomaly/suspicion status
- complaints
- audit findings
- contractor reputation
- data richness
- ease of reconciliation
- post-selection information

No neutral candidates were selected in this execution.

---


### Additional FE2 Retrieval Investigation — 2026-09-02

The live source was re-opened and its currently observable listing was re-verified. The source reports **6,424 projects**, **643 pages**, and 10 visible records per page, with portal version **FMR WATCH 1.3.6**. The listing exposes individual project-detail links with UUID-like locators. citeturn449715view0turn260602view0

The retrieval investigation then tested whether the public evidence available to the research environment exposes a reproducible alternate route for traversing the complete frame. No publicly indexed API/export/sitemap or alternate machine-readable full-frame endpoint was established. Direct detail-page retrieval also returned a **403 Forbidden** through the retrieval path used by the test, while the listing page itself remained publicly observable.

This strengthens FE2's limitation but does **not** establish that FMR Watch has no internal/browser-side endpoint. It establishes only that no reproducible full-frame retrieval mechanism was recovered through the public retrieval surfaces available to this execution.

External reporting confirms that FMR Watch is the DA-BAFE public transparency portal and describes it as providing project-level information and monitoring nationwide, but those reports do not supply a complete machine-readable frame for independent enumeration. citeturn867889search0turn312453search0

**FE2 remains INCONCLUSIVE / NOT ESTABLISHED.**

## 4. Consolidated Result

| Sub-test | Result |
|---|---|
| G3-FE1 Frame Accessibility | PASS |
| G3-FE2 Complete Enumeration | INCONCLUSIVE / NOT ESTABLISHED |
| G3-FE3 Record Identity | PARTIAL |
| G3-FE4 Completeness / Count Reconciliation | INCONCLUSIVE |
| G3-FE5 Duplicate & Collision Test | NOT EXECUTED / INCONCLUSIVE |
| G3-FE6 Snapshot Integrity | NOT EXECUTED |
| G3-FE7 Independent Reproduction | INCONCLUSIVE / NOT EXECUTED |
| G3-FE8 Outcome-Leakage Audit | PASS |

**G3-FE overall:** **INCONCLUSIVE**

---

## 5. Why the Result Is Not PASS

The approved G3-FE protocol requires all eight critical conditions for PASS. This execution did not establish complete frame enumeration, population-wide identity, snapshot integrity, duplicate/collision testing, or mandatory reproduction.

The portal's public control total of 6,424 is therefore treated as a **reported frame count**, not as an independently verified research frame.

---

## 6. Why the Result Is Not FAIL

The evidence does not establish that FMR Watch is inherently incapable of complete enumeration.

The result is constrained by the retrieval path available during this execution. The portal may have a browser-side or machine-readable mechanism that was not recoverable through the public access path used here.

Accordingly, the evidence does not justify the stronger conclusion that the source itself has a material enumeration defect.

---

## 7. Research Interpretation

The supported statement is:

> **Public project observability and a stated frame count are established, while machine-reproducible full-population enumeration of the FMR Watch frame remains unestablished.**

This is an observability/reproducibility result, not an integrity accusation.

It is also consistent with the pre-existing G1.1 finding that FMR Watch public project observability is established while machine retrieval, API behavior, export capability, and version history remained unresolved.

---

## 8. G3 Consequence

**Neutral candidate selection remains BLOCKED.**

The approved G3 protocol does not permit substitution with:

- first-page selection
- random-page selection
- manually selected projects
- region-only or province-only sampling
- search-result sampling
- data-rich project selection
- anomaly-driven selection

The 6,424-project control total cannot be converted into a frozen sampling frame merely by applying a random seed.

The frame-freeze sequence remains:

```text
FRAME ENUMERATION
        ↓
FRAME VALIDATION
        ↓
FRAME SNAPSHOT
        ↓
FRAME HASH
        ↓
FRAME FREEZE
        ↓
G3 ELIGIBILITY FILTER
        ↓
DETERMINISTIC INDEXING
        ↓
RECORDED RANDOM SEED
        ↓
RANDOM ORDER
        ↓
2 CANDIDATES
```

---

## 9. Next Permitted Action

Investigate the unresolved machine-retrieval / pagination mechanism without changing the sampling frame.

Permitted investigation targets:

1. publicly exposed pagination behavior;
2. browser/network-visible data endpoints if publicly accessible;
3. public export/download capability;
4. reproducible query parameters or cursor mechanisms;
5. source-side enumeration behavior that yields all 6,424 records;
6. a complete frame snapshot that can be independently re-run and hashed.

No project may be selected as a neutral candidate until the frame is frozen through the approved process.

---

## 10. Evidence Basis

Primary live-source observation:

- FMR Watch public projects page, version 1.3.6, reporting 6,424 projects and 643 pages at 10 records/page.

Prior governing evidence:

- `G3_Frame_Enumeration_Reproducibility_Test.md`
- `G1.1_FMR_Watch_Public_Observability.md`
- `G1_Populated_Source_Registry_and_Field_Access_Matrix.md`

---

## Final Disposition

# **G3-FE: INCONCLUSIVE — G3 SELECTION REMAINS BLOCKED**

No weakening of the approved G3 protocol is authorized based on this result.
