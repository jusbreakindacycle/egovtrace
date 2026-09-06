# T004 — GovernmentEvent Lifecycle and Persistence Implementation Task

**Status:** Ready after GovernmentEvent specification review  
**Specification:** `docs/03-engineering/eGovTrace_GovernmentEvent_and_Event_Lifecycle_Specification_v1.md`  
**Baseline:** main through T003.2 PostgreSQL persistence

## Objective

Implement the smallest production-shaped GovernmentEvent operational layer required to turn a validated source observation into one durable, provenance-backed eGovTrace GovernmentEvent.

## Allowed scope

- Harden the existing `GovernmentEvent` domain model to match the approved T004 specification.
- Define source-observation input structures.
- Implement deterministic normalization/validation boundaries needed by the event lifecycle.
- Implement GovernmentEvent persistence and lineage behavior.
- Implement source/provenance/evidence association required by the event contract.
- Implement idempotent ingestion.
- Implement optimistic-concurrency protection for material corrections.
- Integrate transactional outbox publication for the resulting internal `event.created` message where supported by the existing persistence layer.
- Add focused unit and integration tests.
- Use synthetic fixtures only.

## Forbidden scope

Do not implement:

- ExpectedControlPath;
- reconciliation;
- detection rules;
- graph traversal/database;
- case management;
- accountability workflows;
- production government connectors;
- public UI/API expansion;
- AI inference or automated accusation logic;
- unrelated schema refactors.

## Required invariants

```text
NOT_OBSERVED != ABSENT
UNAVAILABLE != ABSENT
CLAIM != FACT
SIGNAL != GovernmentEvent
FINDING != GovernmentEvent

OBLIGATION != DISBURSEMENT != SETTLEMENT

INTERNAL DOMAIN EVENT != REAL-WORLD GOVERNMENT EVENT

POSSIBLE IDENTITY MATCH != CONFIRMED IDENTITY

SOURCE REVISION != INGESTION RETRY != EVENT LINEAGE VERSION
```

## Required implementation outcomes

1. One valid source observation produces one logical GovernmentEvent.
2. Replaying the same source observation is idempotent.
3. A changed source revision creates a new observation/version lineage without erasing the earlier observation.
4. Unavailable/no-result conditions are represented outside the persisted event as observation outcomes.
5. Event assertion kinds used by GovernmentEvent are limited to `FACT`, `OBSERVATION`, and `CLAIM`.
6. Canonical event types remain the existing V1 vocabulary.
7. Date-only source values do not gain fabricated time-of-day precision.
8. Material source/provenance metadata is persisted atomically with the event creation contract.
9. Database failure results in rollback and no false success.
10. Internal `event.created` publication remains distinct from the real-world GovernmentEvent.

## Minimum tests

- valid `PROJECT_CREATED` creation;
- valid `PAYMENT_OBLIGATED`, `PAYMENT_DISBURSED`, and `PAYMENT_SETTLED` distinctions;
- exact duplicate source replay;
- duplicate delivery with a different semantic payload under the same idempotency key;
- source revision update;
- source without native ID but with stable locator/hash;
- no-result search;
- unavailable source;
- explicit source absence;
- claim-backed event;
- unresolved entity reference;
- possible versus confirmed identity;
- date-only timestamp precision;
- contradictory timestamps;
- missing mandatory provenance;
- transaction rollback;
- optimistic concurrency conflict;
- outbox publication consistency;
- separation of internal event message from GovernmentEvent.

## Definition of Done

The implementation passes the T004 acceptance matrix, existing repository tests remain green, no test is weakened to obtain a pass, no downstream reconciliation/detection behavior is introduced, and the final change is reviewable as one bounded engineering task.
