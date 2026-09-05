# Architecture

## Initial shape
Modular monolith monorepo.

apps/api: typed HTTP boundary
apps/web: future government/public web surface
apps/mobile: future authorized field client
packages/domain: canonical domain types and invariants
packages/database: persistence boundary
packages/graph: typed relationship model
packages/detection: deterministic control rules
packages/evidence: evidence/provenance model
packages/auth: authorization boundary

## Why
One deployable core reduces early distributed-systems complexity while preserving domain boundaries for later extraction.
