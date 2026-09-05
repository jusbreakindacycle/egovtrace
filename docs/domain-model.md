# Domain Model

T002 establishes the dependency-free TypeScript domain foundation in `packages/domain`.

## Semantics

- Every domain object has an eGovTrace `DomainId`; source-system identifiers are separate `SourceIdentifier` values.
- `TemporalValidity` and `StateVersion` preserve changing relationships and historical state without overwriting earlier observations.
- `ProvenanceReference`, `RelationshipAssertion`, `AssertionKind`, `RelationshipBasis`, and `Confidence` keep evidence, derivation, uncertainty, and truth claims distinct. Relationships carry both provenance and explicit supporting evidence IDs.
- A relationship is not identity proof unless it has explicit source and identifier support. Similarity alone cannot confirm identity.
- Payment records distinguish `OBLIGATION`, `DISBURSEMENT`, and `SETTLEMENT`; an instruction or disbursement does not imply settlement.
- `NOT_OBSERVED`, `ABSENT`, `UNAVAILABLE`, and `CONTESTED` remain distinct statuses; none implies the others or implies wrongdoing.
- `AI_ASSISTANCE` is a provenance kind, so AI-derived material can be traced without becoming a source fact. `FINDING` is a generic review result, not a legal or wrongdoing determination.

## Scope

The package contains typed representations for Institution, Office, Person, Official, Authority, LegalInstrument, Project, Budget, Procurement, Bidder, Contractor, Contract, Payment, Evidence, and GovernmentEvent. Persistence, APIs, connectors, authentication, AI, and detection logic remain outside T002.
