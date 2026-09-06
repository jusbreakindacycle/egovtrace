# eGovTrace T008.1 — Detection Domain and Signal Implementation Specification v1

**Status:** Proposed implementation specification  
**Task:** T008.1  
**Parent capability:** T008 Deterministic Detection  
**Depends on:** T004 GovernmentEvent lifecycle; T005/T006 ExpectedControlPath; T007 Reconciliation; T008 Deterministic Detection Specification  
**Target branch:** `t008-1-detection-domain-signal-implementation`  

---

## 1. Purpose

T008.1 converts the approved T008 deterministic detection specification into an implementation-ready domain boundary for detection rules, evaluations, signals, reason codes, missing-information records, and verification recommendations.

This task establishes the canonical in-memory contracts and deterministic invariants that later T008 persistence and execution orchestration will consume.

The implementation MUST NOT introduce database behavior, connectors, HTTP behavior, probabilistic detection, or downstream case/accountability semantics.

---

## 2. Architectural Position

```text
T007 ReconciliationResult
        ↓
T008.1 Detection Domain
        ├── DetectionRule
        ├── DetectionEvaluation
        ├── DetectionSignal
        ├── MissingInformation
        └── VerificationRecommendation
        ↓
T008.2 Rule Registry / Execution
        ↓
T008.3 Signal Persistence
```

The domain package remains the owner of detection semantics. Infrastructure and application layers must consume these contracts rather than redefine them.

---

## 3. Scope

### 3.1 In scope

T008.1 defines:

- canonical detection signal domain model;
- deterministic detection-rule contract;
- rule identity and version semantics;
- detection evaluation result contract;
- missing-information model;
- verification recommendation model;
- explicit severity, priority, and confidence vocabularies;
- supporting reconciliation/event/evidence references;
- signal validity and lifecycle states;
- deterministic collection ordering requirements;
- signal identity inputs;
- validation invariants;
- semantic helper functions;
- adversarial domain tests.

### 3.2 Explicitly out of scope

T008.1 does not implement:

- PostgreSQL persistence;
- rule registry storage;
- rule execution orchestration over repositories;
- government connectors;
- anomaly ML/AI models;
- risk scoring engines;
- corruption classification;
- legal conclusions;
- accountability decisions;
- case workflow;
- public projections;
- HTTP/API/UI behavior.

---

## 4. Core Semantic Invariants

The domain implementation MUST preserve:

- `SIGNAL` is not `FINDING`;
- connection is not corruption;
- `NOT_OBSERVED` is not `ABSENT`;
- `UNAVAILABLE` is not false;
- missing information remains explicit;
- severity, priority, and confidence are distinct concepts;
- a rule version is part of reproducibility;
- supporting references are not evidence of guilt;
- AI output cannot be the authoritative trigger for a governed signal.

No helper or validator may encode stronger semantics than these rules.

---

## 5. Canonical Domain Types

### 5.1 Signal status

```ts
export type DetectionSignalStatus =
  | 'OPEN'
  | 'SUPPRESSED'
  | 'RESOLVED'
  | 'EXPIRED';
```

Status describes workflow state only. It does not describe truth, guilt, or legal validity.

### 5.2 Severity

```ts
export type DetectionSeverity =
  | 'INFO'
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL';
```

Severity describes relative significance of the detected control condition.

### 5.3 Priority

```ts
export type DetectionPriority =
  | 'LOW'
  | 'NORMAL'
  | 'HIGH'
  | 'URGENT';
```

Priority describes operational urgency.

### 5.4 Confidence

Reuse the repository-wide `Confidence` type:

```ts
'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN'
```

Confidence is confidence in the deterministic evaluation's stated condition, not probability of corruption or guilt.

---

## 6. Missing Information

```ts
export interface MissingInformation {
  readonly code: string;
  readonly description: string;
  readonly requiredFor: string;
  readonly sourceSystem?: string;
  readonly retryable: boolean;
}
```

Validation requirements:

- `code` is non-empty;
- `description` is non-empty;
- `requiredFor` is non-empty;
- `retryable` is explicit;
- a missing-information record cannot silently be transformed into a control violation.

Recommended codes remain descriptive:

```text
EXPECTED_STEP_APPLICABILITY_UNKNOWN
OBSERVATION_SOURCE_UNAVAILABLE
REQUIRED_EVIDENCE_UNAVAILABLE
MISSING_FINANCIAL_OBSERVATION
MISSING_IMPLEMENTATION_OBSERVATION
MISSING_AUTHORITY_RECORD
```

---

## 7. Verification Recommendation

```ts
export interface VerificationRecommendation {
  readonly actionCode: string;
  readonly rationale: string;
  readonly requiredEvidenceTypes: readonly string[];
}
```

Validation requirements:

- `actionCode` is non-empty;
- `rationale` is non-empty;
- evidence type collections are deterministic and duplicate-free;
- recommendations are procedural guidance, not conclusions.

Examples:

```text
REQUEST_MISSING_VERIFICATION_RECORD
COMPARE_CONTRACT_AND_PAYMENT_RECORDS
CONFIRM_AUTHORITY_AT_EVENT_TIME
REVIEW_IMPLEMENTATION_PROGRESS_EVIDENCE
VERIFY_BIDDER_RELATIONSHIP
```

---

## 8. Detection Rule Contract

```ts
export interface DetectionRule<TInput = unknown> {
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

### Validation invariants

- `id`, `name`, and `description` are non-empty;
- `version` is a positive integer;
- `validFrom` is ISO-parseable;
- `validTo`, when present, is ISO-parseable and not earlier than `validFrom`;
- rule identity is `(id, version)`;
- disabled rules remain representable for historical reproducibility;
- the contract does not permit a rule to mutate its input context.

The rule contract MUST remain deterministic for the same governed input and reference time.

---

## 9. Detection Evaluation

```ts
export interface DetectionEvaluation {
  readonly triggered: boolean;
  readonly signalType: string;
  readonly reasonCodes: readonly string[];
  readonly summary: string;
  readonly severity: DetectionSeverity;
  readonly priority: DetectionPriority;
  readonly confidence: Confidence;
  readonly reconciliationRunIds: readonly DomainId[];
  readonly governmentEventIds: readonly DomainId<'GOVERNMENT_EVENT'>[];
  readonly evidenceIds: readonly DomainId<'EVIDENCE'>[];
  readonly missingInformation: readonly MissingInformation[];
  readonly recommendedVerification: readonly VerificationRecommendation[];
}
```

Rules:

- when `triggered === false`, the evaluation MUST NOT be converted into a signal;
- `signalType` and `summary` remain descriptive;
- reason codes must be stable machine-readable identifiers;
- references must be duplicate-free and deterministically ordered;
- empty collections must be represented explicitly rather than omitted semantically;
- evaluation output must not contain legal or accusatory conclusions.

---

## 10. Detection Signal

```ts
export interface DetectionSignal {
  readonly id: DomainId;
  readonly signalType: string;
  readonly ruleId: string;
  readonly ruleVersion: number;
  readonly status: DetectionSignalStatus;
  readonly severity: DetectionSeverity;
  readonly priority: DetectionPriority;
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

### Signal invariants

A valid signal must:

1. identify the rule and exact rule version;
2. identify when it was generated;
3. identify the signal validity interval;
4. preserve all governed supporting references;
5. preserve missing-information limitations;
6. preserve provenance;
7. remain observational/descriptive in its human-readable summary;
8. remain independent of database row ordering.

---

## 11. Reference Collection Semantics

Supporting reference arrays must be treated as sets for semantic identity but returned in deterministic order.

Recommended canonical ordering:

```text
reconciliationRunIds → lexical normalized ID
GovernmentEvent IDs   → lexical normalized ID
Evidence IDs          → lexical normalized ID
reasonCodes           → lexical normalized code
```

The implementation must not allow database insertion order or JavaScript object traversal order to become signal semantics.

Duplicate references must be removed before signal construction.

---

## 12. Signal Identity

Signal identity must remain separate from display text.

The canonical logical identity inputs are:

```text
ruleId
ruleVersion
signalType
evaluation scope
reconciliationRunIds
governmentEventIds
evidenceIds
validity window
```

A later persistence layer may add a physical identifier, but the domain model must expose enough information to reproduce the logical identity decision.

The domain must not use a probabilistic hash as semantic proof of uniqueness.

---

## 13. Rule Evaluation Context

The T008.1 domain contracts should support a bounded evaluation context without coupling rules to infrastructure.

```ts
export interface DetectionEvaluationContext {
  readonly reconciliationRuns: readonly ReconciliationResult[];
  readonly governmentEvents: readonly GovernmentEvent[];
  readonly evidence: readonly Evidence[];
  readonly now: string;
  readonly ruleExecutionId: DomainId;
}
```

The context is input data, not a database handle.

Rules must not mutate context arrays or contained domain records.

Historical evaluation must use the exact reconciliation and observation inputs provided to the execution.

---

## 14. Validation Rules

T008.1 domain validation must cover at least:

### Rule metadata

- non-empty identity fields;
- positive integer version;
- valid temporal interval;
- stable rule identity.

### Evaluation

- valid severity, priority, confidence;
- valid references;
- non-empty descriptive fields when triggered;
- no duplicate references;
- explicit missing-information values.

### Signal

- valid signal status;
- valid temporal interval;
- non-empty rule identity;
- non-empty signal type;
- valid generated timestamp;
- provenance preserved;
- supporting references deterministic.

### Semantic prohibitions

Validation/tests must reject or prevent:

- treating an unavailable input as a normal false observation;
- converting `NOT_OBSERVED` into `ABSENT`;
- treating a relationship as proof of corruption;
- embedding legal conclusions in the signal summary contract;
- using AI output as an authoritative rule trigger field.

---

## 15. Temporal Semantics

All temporal fields must be ISO-parseable timestamps.

The implementation must reject intervals where `validTo < validFrom`.

A historical signal preserves the rule version and validity context that existed at evaluation time. Updating the rule later must not mutate the historical signal.

Reference time must be explicit in the evaluation context. The implementation must not silently call `new Date()` inside rule evaluation to determine semantic output.

---

## 16. Provenance Semantics

Signals are derived domain assertions.

At minimum, provenance must preserve:

- provenance identifier;
- derivation kind;
- recording time;
- derivation method;
- parent provenance references when present.

A signal must not be treated as a source observation merely because it references source observations.

Recommended provenance kind for deterministic rules:

```text
DERIVATION
```

Source observations remain represented by their existing provenance chain.

---

## 17. Status Transition Boundary

T008.1 may define pure transition guards for workflow state:

```text
OPEN → SUPPRESSED
OPEN → RESOLVED
OPEN → EXPIRED
SUPPRESSED → OPEN
SUPPRESSED → RESOLVED
RESOLVED → EXPIRED
```

The exact persistence workflow is deferred to later T008 tasks.

Transition helpers must not reinterpret resolution as factual exoneration, guilt, or legal determination.

---

## 18. Initial Rule-Family Compatibility

T008.1 must be expressive enough to support the approved initial rule families without implementing their orchestration here.

Required families:

```text
MISSING_VERIFICATION
PAYMENT_WITHOUT_EXPECTED_EVIDENCE
FINANCIAL_PHYSICAL_PROGRESS_MISMATCH
AUTHORITY_MISMATCH
INDEPENDENCE_GAP
CONTRACTOR_RECURRENCE
REPEATED_BIDDER_COMBINATION
```

Rule family identifiers must remain descriptive and versionable.

---

## 19. Error Semantics

Domain validation errors must be distinguishable from infrastructure errors introduced later.

Recommended domain error types:

```ts
DetectionRuleValidationError
DetectionEvaluationValidationError
DetectionSignalValidationError
DetectionTemporalValidationError
DetectionReferenceValidationError
```

No database, network, authorization, or connector error type belongs in the T008.1 domain package.

---

## 20. Adversarial Test Matrix

The implementation must test at least:

| Case | Expected behavior |
|---|---|
| duplicate event reference | reject or canonicalize deterministically |
| duplicate evidence reference | reject or canonicalize deterministically |
| empty rule id | reject |
| version 0 / negative | reject |
| invalid temporal range | reject |
| triggered=false | no signal construction |
| unavailable source represented as false | reject semantic violation |
| NOT_OBSERVED converted to ABSENT | reject semantic violation |
| connection described as corruption | reject semantic contract |
| AI output as authoritative trigger | reject semantic contract |
| shuffled reference input | same canonical signal meaning |
| historical rule version changed later | historical identity unchanged |
| missing-information record omitted | reject when required by evaluation contract |
| duplicate reason code | canonicalize or reject deterministically |

Tests must prove semantic boundaries, not just TypeScript shape correctness.

---

## 21. Implementation Order

1. Add T008.1 detection domain types.
2. Add pure validators and canonicalization helpers.
3. Add signal/rule lifecycle guards that do not require persistence.
4. Add adversarial domain tests.
5. Export the domain boundary through the existing domain package convention.
6. Do not add persistence or transport in T008.1.

---

## 22. Acceptance Criteria

T008.1 is complete when:

- detection rules have explicit versioned contracts;
- detection evaluations are deterministic domain outputs;
- signals preserve rule identity/version and supporting references;
- severity, priority, and confidence remain independent;
- missing information remains explicit;
- temporal validity is enforced;
- provenance is preserved;
- collections are deterministic;
- signal workflow status is separate from factual/legal meaning;
- adversarial tests cover semantic failure modes;
- no infrastructure dependency leaks into the domain package.

---

## 23. Definition of Done

The task is ready for implementation review when:

- the specification is merged;
- the domain implementation matches these contracts;
- tests cover the adversarial matrix;
- existing eGovTrace tests remain green;
- no downstream detection persistence, case workflow, legal, accountability, or AI authority is introduced.
