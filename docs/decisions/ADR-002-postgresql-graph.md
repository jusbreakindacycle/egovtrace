# ADR-002: PostgreSQL Before Dedicated Graph Database

Status: Accepted for V1 prototype.

Decision: Represent graph relationships as typed relational records with temporal and evidentiary metadata.

Reason: The first vertical slice needs transactional consistency and explainability. A dedicated graph database will be introduced only when measured traversal/query needs justify it.
