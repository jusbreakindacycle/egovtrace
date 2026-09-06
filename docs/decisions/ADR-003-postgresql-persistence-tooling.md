# ADR-003: PostgreSQL Persistence Tooling

## Status

Accepted for T003.2 implementation.

## Context

The accepted T003.1 persistence boundary requires PostgreSQL-backed typed
records, explicit transactions, append-oriented temporal and provenance data,
queryable relationship evidence, separate financial states, idempotent
mutations, optimistic concurrency, and a transactional outbox. The T003.1
file is present on the `t003-persistence-boundary` branch and is not merged
into this task branch; this ADR uses that accepted specification as its
authority.

## Options considered

| Option | Type safety | SQL transparency | Transactions/temporal queries | PostgreSQL/PostGIS | Complexity |
| --- | --- | --- | --- | --- | --- |
| Direct `pg` plus SQL migrations | Typed repository inputs/outputs; database constraints are authoritative | Highest | Explicit and unrestricted | Native; PostGIS can be added later | Lowest |
| Lightweight typed query layer | Stronger inferred query types | High | Explicit, but adds generated/build tooling | Depends on adapter | Medium |
| ORM | Model-level types | Lower; generated SQL can obscure review | Supported, but temporal/provenance SQL needs escape hatches | Varies by ORM and extension support | Highest |

## Decision

Use the `pg` PostgreSQL driver with forward-only SQL migrations and a small
typed repository in `packages/database`. Keep SQL visible and keep domain
invariants enforced by PostgreSQL constraints plus repository checks. Use
opaque UUID primary keys, JSONB for the preserved domain envelope where a
subtype does not need additional query columns, and normalized tables for
source identifiers, provenance, state versions, relationship assertions,
relationship evidence, financial states, idempotency, and outbox records.

Do not use an ORM or generated query layer in T003.2. This keeps migration
review, transaction boundaries, temporal queries, and provenance traversal
straightforward while the persistence surface is small. A typed query layer
can be evaluated after query volume and schema breadth justify its build
complexity.

Do not enable PostGIS in T003.2. The synthetic slice does not perform spatial
queries; optional latitude/longitude values remain scalar metadata. Adding
PostGIS later remains compatible with this schema and should be driven by an
actual geographic query requirement.

## Consequences

- SQL migrations are reviewed artifacts and must be applied before tests.
- Repository methods expose explicit transaction callbacks rather than hiding
  transaction scope in a generic unit-of-work abstraction.
- The database package requires a local PostgreSQL connection for integration
  tests; no production or government credentials are used.
- UUIDs remain independent from source-system identifiers.
- Temporal, provenance, relationship, and financial records remain queryable
  without overwriting earlier observations.