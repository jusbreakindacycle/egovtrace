# eGovTrace T008 — Deterministic Detection Specification v1

**Status:** Proposed engineering specification
**Task:** T008 — Deterministic Detection
**Parent capability:** Detection
**Depends on:** T004 GovernmentEvent lifecycle; T005/T006 ExpectedControlPath; T007 Reconciliation
**Architecture boundary:** RECONCILIATION → DETECTION

---

## 1. Purpose

T008 defines the bounded detection layer that converts governed reconciliation results and other explicitly permitted control observations into explainable control signals.

Detection is a signal-generation capability. It is not a finding engine, legal engine, corruption classifier, or autonomous accountability system.

The core flow is:

```text
ExpectedControlPath
        +
GovernmentEvent
        ↓
T007 Reconciliation
        ↓
Deterministic Detection Rules
        ↓
Signal
        ↓
Human Verification
```

The detection layer must make it possible to answer:

- What expected control or condition was evaluated?
- What observations were used?
- Which deterministic rule triggered?
- What information is missing?
- Why is the signal relevant?
- What could disprove or resolve the signal?
- What verification action is appropriate?

---

## 2. Architectural Boundary

```text
T007 ReconciliationResult
        │
        ├──────────────┐
        ▼              ▼
Detection Rules     Supporting Evidence
        │
        ▼
Detection Signal
        │
        ▼
Human Verification / Case Workflow (later)
```

T008 consumes governed inputs. It does not rewrite ExpectedControlPath or GovernmentEvent records.

A detection rule may create a signal. It must not silently create a finding.

---

## 3. Scope

### 3.1 In scope

T008 shall define:

- a deterministic detection-rule contract;
- a versioned detection-rule registry boundary;
- a stable detection-signal model;
- explicit reason codes;
- supporting reconciliation and event references;
- missing-information representation;
- severity, priority, and confidence semantics;
- verification recommendations;
- deterministic rule evaluation;
- signal idempotency and reproducibility;
- temporal validity of rules;
- suppression/deduplication boundaries;
- provenance requirements;
- rule execution audit metadata;
- adversarial and regression testing requirements.

### 3.2 Explicitly out of scope

T008 shall not implement:

- probabilistic ML detection;
- black-box risk scoring;
- autonomous corruption classification;
- legal conclusions;
- disciplinary or accountability decisions;
- case adjudication;
- identity proof from fuzzy matching;
- automatic source-record mutation;
- production government connectors;
- public dashboards;
- AI-generated authoritative decisions.

---

## 4. Core Safety Invariants

### 4.1 Signal is not finding

`SIGNAL` is an alert for review. It is not proof of wrongdoing.

### 4.2 Connection is not corruption

A shared contractor, official, institution, project, payment, or event relationship does not establish corruption.

### 4.3 Not observed is not absent

A detection rule must not infer real-world non-occurrence merely because T007 returned `NOT_OBSERVED`.

### 4.4 Unavailable is not false

T007 `UNAVAILABLE` must not be transformed into a control violation merely because required observations could not be obtained.

### 4.5 Missing information must remain visible

A rule may indicate that evidence or information is missing. It must not conceal the limitation to manufacture a stronger signal.

### 4.6 AI is assistive only

AI may later assist with rule-authoring suggestions, evidence summarization, candidate discovery, or analyst workflow, but it must not be the authoritative trigger for a governed T008 signal.

### 4.7 Source authority remains external

The source system remains authoritative for its own record. eGovTrace signals are derived application intelligence, not replacements for source truth.

---

## 5. Detection Signal Model

Recommended canonical shape:

```ts
interface DetectionSignal {
  readonly id: DomainId;
  readonly signalType: string;
  readonly ruleId: string;
  readonly ruleVersion: number;
  readonly status: 'OPEN' | 'SUPPRESSED' | 'RESOLVED' | 'EXPIRED';
  readonly severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  readonly priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  readonly confidence: Confidence;
  readonly summary: string;
  readonly reasonCodes: readonly string[];
  readonly reconciliationRunIds: readonly DomainId[];
  readonly governmentEventIds: readonly DomainId<'GOVERNMENT_EVENT'>[];
  readonly evidenceIds: readonly DomainId<'EVIDENCE'>[];
  readonly missingInformation: readonly MissingInformation[];
  readonly recommendedVerification: readonly VerificationRecommendation[];
  readonly generatedAt: string;
  readonly validFrom: string;
  readonly validTo?: string;
  readonly provenance: readonly ProvenanceReference[];
}
```

The model must distinguish:

```text
rule identity
rule execution
signal identity
supporting observations
missing information
verification recommendation
```

---

## 6. Detection Rule Contract

Each rule must be explicit, versioned, deterministic, and explainable.

```ts
interface DetectionRule<TInput = unknown> {
  readonly id: string;
  readonly version: number;
  readonly name: string;
  readonly description: string;
  readonly enabled: boolean;
  readonly validFrom: string;
  readonly validTo?: string;
  evaluate(input: TInput): DetectionEvaluation;
}
```

A rule must declare the input contract it consumes.

Rules must not reach directly into arbitrary database tables. They receive a governed evaluation context assembled by the application/detection layer.

---

## 7. Detection Evaluation Result

Recommended shape:

```ts
interface DetectionEvaluation {
  readonly triggered: boolean;
  readonly signalType: string;
  readonly reasonCodes: readonly string[];
  readonly summary: string;
  readonly severity: DetectionSignal['severity'];
  readonly priority: DetectionSignal['priority'];
  readonly confidence: Confidence;
  readonly reconciliationRunIds: readonly DomainId[];
  readonly governmentEventIds: readonly DomainId<'GOVERNMENT_EVENT'>[];
  readonly evidenceIds: readonly DomainId<'EVIDENCE'>[];
  readonly missingInformation: readonly MissingInformation[];
  readonly recommendedVerification: readonly VerificationRecommendation[];
}
```

When `triggered === false`, no signal is created.

A rule must not encode a legal conclusion in `summary` or `reasonCodes`.

---

## 8. Initial V1 Rule Families

T008 should begin with a deliberately narrow rule set aligned with the repository architecture.

### 8.1 Missing verification

Trigger when an applicable expected verification step is `NOT_OBSERVED` under a reconciliation scope sufficient to evaluate the step.

Do not trigger this rule when the step is `UNAVAILABLE` or the applicability is unresolved.

Signal language must remain observational, such as:

```text
Expected verification observation was not found in the participating scope.
```

It must not state:

```text
Project was not verified.
```

unless that stronger statement is separately established by governed evidence.

### 8.2 Payment without expected evidence

Trigger when an applicable payment-related control step is matched while a required evidence expectation is explicitly unmet or unresolved under the applicable evidence contract.

The signal must preserve payment-state distinctions such as:

```text
OBLIGATION
DISBURSEMENT
SETTLEMENT
```

### 8.3 Financial-versus-physical progress mismatch

Trigger only when the system has governed financial observations and governed implementation/progress observations that support a deterministic comparison.

Missing inputs must result in `missingInformation`, not fabricated zero values.

### 8.4 Authority mismatch

Trigger only when an explicit ExpectedControlPath responsibility or authority requirement is contradicted by governed observations.

An inferred relationship or name similarity is insufficient by itself.

### 8.5 Independence gap

Trigger only when an explicit segregation/independence requirement from the ExpectedControlPath can be deterministically evaluated and is contradicted by governed relationships or event actors.

The signal must identify the expected independence condition and the observed relationship without labeling misconduct.

### 8.6 Contractor recurrence / repeated bidder combination

These may identify recurring patterns for review, but recurrence alone is not evidence of improper conduct.

The signal language must remain descriptive and include the population/window used for the deterministic comparison.

---

## 9. Rule Input Context

Rules should receive a bounded context rather than unrestricted database access.

Recommended shape:

```ts
interface DetectionEvaluationContext {
  readonly reconciliationRuns: readonly ReconciliationResult[];
  readonly governmentEvents: readonly GovernmentEvent[];
  readonly evidence: readonly Evidence[];
  readonly now: string;
  readonly ruleExecutionId: DomainId;
}
```

The context must identify the exact historical reconciliation and observation inputs used by the rule.

No rule may silently query a newer path version or current entity state when the evaluation is intended to be historical.

---

## 10. Determinism

Given the same:

- rule ID/version;
- governed evaluation context;
- reference time;
- rule configuration;

the rule must produce the same evaluation.

Results must not depend on:

- database row order;
- random selection;
- network timing;
- model output;
- current wall-clock state not captured in the evaluation context.

Stable ordering is required for collections of supporting references.

---

## 11. Signal Identity and Idempotency

The detection layer must prevent duplicate semantic signals from repeated execution of the same rule against the same governed input.

Recommended identity inputs:

```text
ruleId
ruleVersion
evaluation scope
reconciliation run identities
relevant event identities
temporal window
```

The implementation must distinguish:

```text
same rule + same governed inputs → replay existing signal
same rule + materially different inputs → distinct evaluation
rule version changed → new rule evaluation identity
```

A detection signal must preserve the rule version that produced it.

---

## 12. Suppression and Deduplication

Suppression is a workflow/state concern, not a hidden change to rule truth.

A suppressed signal remains historically visible and must preserve:

- original triggering rule;
- original inputs;
- suppression actor/context;
- suppression reason;
- suppression timestamp.

Deduplication must never delete the underlying evidence or make a previous evaluation unreproducible.

---

## 13. Severity, Priority, and Confidence

These concepts must remain separate.

### Severity

Describes the relative significance of the detected control condition.

### Priority

Describes operational urgency for human review.

### Confidence

Describes confidence that the deterministic rule's stated condition is supported by its governed inputs.

None of these fields means probability of corruption or guilt.

---

## 14. Missing Information

Recommended shape:

```ts
interface MissingInformation {
  readonly code: string;
  readonly description: string;
  readonly requiredFor: string;
  readonly sourceSystem?: string;
  readonly retryable: boolean;
}
```

Examples:

```text
EXPECTED_STEP_APPLICABILITY_UNKNOWN
OBSERVATION_SOURCE_UNAVAILABLE
REQUIRED_EVIDENCE_UNAVAILABLE
MISSING_FINANCIAL_OBSERVATION
MISSING_IMPLEMENTATION_OBSERVATION
MISSING_AUTHORITY_RECORD
```

Missing information must not be silently converted into a failed control condition.

---

## 15. Verification Recommendations

A triggered signal should be able to recommend the next bounded human action.

```ts
interface VerificationRecommendation {
  readonly actionCode: string;
  readonly rationale: string;
  readonly requiredEvidenceTypes: readonly string[];
}
```

Recommendations are procedural guidance, not decisions.

Examples:

```text
REQUEST_MISSING_VERIFICATION_RECORD
COMPARE_CONTRACT_AND_PAYMENT_RECORDS
CONFIRM_AUTHORITY_AT_EVENT_TIME
REVIEW_IMPLEMENTATION_PROGRESS_EVIDENCE
VERIFY_BIDDER_RELATIONSHIP
```

---

## 16. Temporal Semantics

Rules must be evaluated against explicit time windows.

A rule must declare whether it operates on:

- a single reconciliation execution;
- an event validity interval;
- a bounded historical window;
- a current operational window.

Historical evaluations must remain reproducible after newer data arrives.

Rules must not silently compare historical events against today's authority or relationship state when the rule is intended to assess the historical state.

---

## 17. Provenance

Every triggered signal must be traceable to:

1. the exact rule and version;
2. the evaluation execution;
3. the reconciliation result(s) used;
4. the GovernmentEvents used;
5. relevant evidence references;
6. known limitations or missing information;
7. generated timestamp;
8. any later suppression/resolution action.

The signal's provenance must preserve the difference between source observation, derivation, AI assistance, and human adjudication.

---

## 18. Access and Authorization Boundary

T008 must not bypass the existing authorization model.

Rule evaluation must be performed only over data the calling workflow is authorized to evaluate.

Authorization failure must never become:

```text
no observation
→ NOT_OBSERVED
→ detection signal
```

A protected source may instead produce an explicit access/missing-information limitation, according to the application authorization contract.

---

## 19. Error Semantics

Detection execution should distinguish:

```text
INVALID_RULE
INVALID_INPUT
MISSING_REQUIRED_CONTEXT
UNAVAILABLE_DEPENDENCY
AUTHORIZATION_FAILURE
PERSISTENCE_FAILURE
CONCURRENCY_CONFLICT
```

Errors must not be converted into signals unless a separately defined rule explicitly models an operational failure signal.

---

## 20. Observability

Every rule execution should emit technical telemetry sufficient to answer:

- which rule/version ran;
- when it ran;
- which scope it evaluated;
- whether it triggered;
- duration;
- dependency failures;
- generated signal ID, if any.

Telemetry must not introduce a synthetic corruption-count metric as a source of truth.

---

## 21. Testing Strategy

T008 requires:

### Rule unit tests

Verify deterministic true/false behavior and reason-code stability.

### Boundary tests

Verify that:

- `UNAVAILABLE` does not trigger `NOT_OBSERVED` rules;
- unresolved applicability does not silently become false;
- missing evidence remains missing;
- multiple reconciliation candidates remain multiple;
- payment obligation/disbursement/settlement remain distinct;
- historical rule versions remain stable.

### Adversarial tests

At minimum test:

```text
empty observation set
unavailable source
authorization denial
duplicate events
conflicting observations
historical path version
rule version change
same-input replay
materially different input with same identity key
missing timestamp
missing required evidence
multiple candidate matches
```

### Regression tests

Every accepted rule must have fixture-based regression coverage so later rule changes cannot silently alter existing signal semantics.

---

## 22. Implementation Split

T008 should be implemented in the following controlled sequence:

```text
T008.1 Detection domain + signal contract
        ↓
T008.2 Rule registry + deterministic rule engine
        ↓
T008.3 Detection persistence + idempotency
        ↓
T008.4 Application orchestration
        ↓
T008.5 Verification/case integration
```

Each subtask requires its own specification before implementation where the boundary is material.

---

## 23. Definition of Done

T008 is complete only when:

- deterministic detection rules are explicitly versioned;
- every signal records why it triggered;
- supporting observations are traceable;
- missing information is visible;
- historical evaluation is reproducible;
- signal generation is deterministic and idempotent;
- suppression does not erase history;
- authorization failures remain distinct from observation absence;
- severity, priority, and confidence remain separate;
- no rule creates a legal finding or corruption conclusion;
- no AI output controls authoritative detection decisions;
- adversarial and regression tests pass;
- the implementation remains within the detection package boundary.

---

## 24. Review Gate

This document is specification-only.

Do not implement T008 under this PR.

T008 implementation begins only after this specification is reviewed and merged. Subsequent implementation work must follow the dependency order in Section 22.
