# eGovTrace — T007.1 Reconciliation Domain and Deterministic Matcher Implementation Specification v1

**Status:** Proposed implementation boundary
**Task:** T007.1 — Reconciliation domain model and deterministic matcher
**Depends on:** T007 — Expected-vs-Observed Reconciliation Specification v1
**Observed-event baseline:** T004 GovernmentEvent lifecycle
**Control-path baseline:** T006 ExpectedControlPath implementation

## 1. Purpose

T007.1 implements only the domain representation and deterministic matching boundary required to compare one ExpectedControlPath against an explicit observation scope of GovernmentEvent records.

The matcher must produce structured reconciliation states without converting absence of an observation into proof of absence, and without producing detection signals, findings, legal conclusions, or accountability decisions.

## 2. In Scope

- ReconciliationRun domain model.
- Observation-scope representation.
- Step-level reconciliation result model.
- Deterministic event matching for explicit event type, subject identity, project context, source identity, and temporal compatibility.
- Explicit handling of applicability decisions supplied by the caller.
- Multiple-match preservation.
- Conflicting-source observation detection when the same source identity describes incompatible event facts.
- Unit and adversarial tests.

## 3. Explicitly Out of Scope

- PostgreSQL persistence.
- Reconciliation run scheduling.
- Database joins across source systems.
- Probabilistic/entity-resolution matching.
- Identifier recovery as identity proof.
- AI-based matching or adjudication.
- Risk scoring or anomaly detection.
- Case management.
- Accountability decisions.
- Findings or corruption classification.
- Government connectors.
- Public or internal UI.

## 4. Canonical Status Semantics

```text
MATCHED
MULTIPLE_MATCHES
NOT_OBSERVED
UNAVAILABLE
OUT_OF_SCOPE
INAPPLICABLE
INSUFFICIENT_INFORMATION
CONFLICTING_OBSERVATIONS
```

T007.1 may emit the first, second, third, sixth, seventh, and eighth values directly from deterministic domain conditions. `UNAVAILABLE` and `OUT_OF_SCOPE` remain representable even when the initial matcher receives fully materialized events; future persistence/connectors will supply those states when observation availability is known.

## 5. Deterministic Matching Rules

For a step to be a candidate match:

1. The event type must be declared by the expected step.
2. The event must be inside the explicit observation scope.
3. The event must be temporally compatible with the control path validity.
4. When an expected subject is supplied, the event must explicitly reference that subject or the same project through `projectId` when the subject is a project.
5. The matcher must not select one candidate merely because it appears first, has a higher confidence value, or has a richer record.
6. Multiple valid candidates produce `MULTIPLE_MATCHES`.
7. Conflicting reuse of one explicit source identity across incompatible event facts produces `CONFLICTING_OBSERVATIONS`.
8. The matcher never synthesizes identity from names, descriptions, semantic similarity, geospatial proximity, or timing alone.

## 6. Applicability

Applicability evaluation is deliberately external to T007.1.

Each step requires the caller to provide one of:

- `APPLICABLE`
- `INAPPLICABLE`
- `UNKNOWN`

`UNKNOWN` produces `INSUFFICIENT_INFORMATION`; it does not produce `NOT_OBSERVED`.

## 7. Evidence Boundary

T007.1 records matching explanations and references to observed event identifiers only. It does not assert that supporting evidence proves a control obligation or legal requirement. Evidence assessment belongs to later stages.

## 8. Historical and Provenance Boundary

The result records the exact ExpectedControlPath version and the reconciliation algorithm version used for the run. The matcher does not rewrite historical path definitions or observed events.

## 9. Adversarial Acceptance Cases

The implementation must prove that:

- same subject + expected type + valid time => `MATCHED`;
- wrong subject => no match;
- two valid candidates => `MULTIPLE_MATCHES`;
- expected type absent => `NOT_OBSERVED`;
- event outside path validity => no match;
- applicability unknown => `INSUFFICIENT_INFORMATION`;
- explicit inapplicability => `INAPPLICABLE`;
- conflicting source identity => `CONFLICTING_OBSERVATIONS`;
- absence of source identifiers does not by itself invalidate an explicitly subject/type-compatible event;
- no result state is interpreted by this module as a legal finding or corruption determination.
