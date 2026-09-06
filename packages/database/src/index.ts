import { Pool, type PoolClient } from 'pg';
import { createHash } from 'node:crypto';
import { expectedControlPathMigrationSql } from './expected-control-path.js';

export type DatabaseConfig = { connectionString?: string };
export type EntityInput = { id?: string; entityType: string; payload: Record<string, unknown> };
export type ProvenanceInput = { kind: string; method: string; recordedAt: string; source?: Record<string, unknown> };
export type StateInput = { state: string; validFrom: string; validTo?: string; observedAt: string; provenanceId?: string };
export type EvidenceInput = { entityId?: string; evidenceType: string; source: Record<string, unknown>; capturedAt: string; contentHash?: string; assertionKind: string; confidence: string; availabilityStatus?: string; provenanceId?: string };
export type RelationshipInput = { relationshipType: string; fromId: string; toId: string; assertionKind: string; basis: string[]; confidence: string; status: string; validFrom: string; validTo?: string; provenanceId?: string; evidenceIds: string[] };
export type FinancialInput = { entityId?: string; financialState: 'OBLIGATION' | 'DISBURSEMENT' | 'SETTLEMENT'; amount: number; currency: string; settlementStatus: string; availabilityStatus?: string; validFrom: string; validTo?: string; observedAt: string; provenanceId?: string };
export type MutationInput = { idempotencyKey: string; operation: string; entity: EntityInput; provenance: ProvenanceInput; states?: StateInput[]; evidence?: EvidenceInput[]; relationship?: RelationshipInput; financialStates?: FinancialInput[]; event?: { eventType: string; occurredAt: string; status: string; assertionKind: string; confidence: string; objectEntityId: string }; outboxEventType: string; failAfter?: 'entity' | 'evidence' };

export class OptimisticConcurrencyError extends Error {}
export class IdempotencyConflictError extends Error {}

export class PersistenceStore {
  readonly pool: Pool;

  constructor(config: DatabaseConfig = {}) {
    const connectionString = config.connectionString ?? process.env.DATABASE_URL;
    if (!connectionString) throw new Error('PersistenceStore requires an explicit connectionString or DATABASE_URL');
    this.pool = new Pool({ connectionString });
  }

  async close(): Promise<void> { await this.pool.end(); }
  async query<T extends Record<string, unknown> = Record<string, unknown>>(text: string, values?: unknown[]): Promise<T[]> { return (await this.pool.query(text, values)).rows as T[]; }
  async migrate(): Promise<void> {
    await this.pool.query(schemaSql);
    await this.pool.query(governmentEventLifecycleSql);
    await this.pool.query(expectedControlPathMigrationSql);
  }

  async createProvenance(input: ProvenanceInput, client: PoolClient = this.pool as unknown as PoolClient): Promise<string> {
    const result = await client.query<{ id: string }>('INSERT INTO provenance_record (kind, method, recorded_at, source) VALUES ($1, $2, $3, $4) RETURNING id', [input.kind, input.method, input.recordedAt, input.source ?? null]);
    return result.rows[0].id;
  }

  async createEntity(input: EntityInput, client: PoolClient = this.pool as unknown as PoolClient): Promise<string> {
    const result = await client.query<{ id: string }>('INSERT INTO domain_entity (id, entity_type, payload) VALUES (COALESCE($1::uuid, gen_random_uuid()), $2, $3) RETURNING id', [input.id ?? null, input.entityType, input.payload]);
    return result.rows[0].id;
  }

  async addSourceIdentifier(input: { entityId: string; sourceSystem: string; sourceRecordId: string; namespace?: string; observedAt?: string; provenanceId?: string }): Promise<void> {
    await this.pool.query('INSERT INTO source_system_registry (system_key, display_name) VALUES ($1, $1) ON CONFLICT (system_key) DO NOTHING', [input.sourceSystem]);
    await this.pool.query('INSERT INTO source_identifier (entity_id, source_system, namespace, source_record_id, observed_at, provenance_id) VALUES ($1,$2,$3,$4,$5,$6)', [input.entityId, input.sourceSystem, input.namespace ?? null, input.sourceRecordId, input.observedAt ?? null, input.provenanceId ?? null]);
  }

  async appendState(entityId: string, input: StateInput, client: PoolClient): Promise<void> {
    await client.query('INSERT INTO state_version (entity_id, state, valid_from, valid_to, observed_at, provenance_id) VALUES ($1, $2, $3, $4, $5, $6)', [entityId, input.state, input.validFrom, input.validTo ?? null, input.observedAt, input.provenanceId]);
  }

  async mutate(input: MutationInput): Promise<{ entityId: string; outboxId: string; replayed: boolean }> {
    const client = await this.pool.connect();
    const requestHash = createHash('sha256').update(JSON.stringify(input)).digest('hex');
    try {
      await client.query('BEGIN');
      const prior = await client.query<{ request_hash: string; result: { entityId: string; outboxId: string; replayed: boolean } }>('SELECT request_hash, result FROM idempotency_record WHERE idempotency_key = $1 AND operation = $2 FOR UPDATE', [input.idempotencyKey, input.operation]);
      if (prior.rowCount) {
        if (prior.rows[0].request_hash !== requestHash) throw new IdempotencyConflictError('Idempotency key was reused with a different request');
        await client.query('COMMIT');
        return { ...prior.rows[0].result, replayed: true };
      }
      const entityId = await this.createEntity(input.entity, client);
      const provenanceId = await this.createProvenance(input.provenance, client);
      for (const state of input.states ?? []) await this.appendState(entityId, { ...state, provenanceId: state.provenanceId || provenanceId }, client);
      for (const evidence of input.evidence ?? []) {
        await client.query('INSERT INTO evidence (entity_id, evidence_type, source, captured_at, content_hash, assertion_kind, confidence, availability_status, provenance_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [evidence.entityId || entityId, evidence.evidenceType, evidence.source, evidence.capturedAt, evidence.contentHash ?? null, evidence.assertionKind, evidence.confidence, evidence.availabilityStatus ?? 'AVAILABLE', evidence.provenanceId || provenanceId]);
      }
      if (input.failAfter === 'evidence') throw new Error('synthetic mutation failure');
      for (const financial of input.financialStates ?? []) await client.query('INSERT INTO financial_state (entity_id, financial_state, amount, currency, settlement_status, availability_status, valid_from, valid_to, observed_at, provenance_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [financial.entityId || entityId, financial.financialState, financial.amount, financial.currency, financial.settlementStatus, financial.availabilityStatus ?? 'OBSERVED', financial.validFrom, financial.validTo ?? null, financial.observedAt, financial.provenanceId || provenanceId]);
      if (input.relationship) {
        const relationship = input.relationship;
        const result = await client.query<{ id: string }>('INSERT INTO relationship_assertion (relationship_type, from_entity_id, to_entity_id, assertion_kind, basis, confidence, status, valid_from, valid_to, provenance_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id', [relationship.relationshipType, relationship.fromId, relationship.toId, relationship.assertionKind, relationship.basis, relationship.confidence, relationship.status, relationship.validFrom, relationship.validTo ?? null, relationship.provenanceId || provenanceId]);
        for (const evidenceId of relationship.evidenceIds) await client.query('INSERT INTO relationship_evidence (relationship_id, evidence_id) VALUES ($1, $2)', [result.rows[0].id, evidenceId]);
      }
      if (input.event) await client.query('INSERT INTO government_event (entity_id, event_type, occurred_at, status, assertion_kind, confidence, object_entity_id, provenance_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)', [entityId, input.event.eventType, input.event.occurredAt, input.event.status, input.event.assertionKind, input.event.confidence, input.event.objectEntityId, provenanceId]);
      const outbox = await client.query<{ id: string }>('INSERT INTO outbox_record (event_type, aggregate_type, aggregate_id, payload) VALUES ($1, $2, $3, $4) RETURNING id', [input.outboxEventType, input.entity.entityType, entityId, { entityId, entityType: input.entity.entityType }]);
      const result = { entityId, outboxId: outbox.rows[0].id, replayed: false };
      await client.query('INSERT INTO idempotency_record (idempotency_key, operation, request_hash, result) VALUES ($1,$2,$3,$4)', [input.idempotencyKey, input.operation, requestHash, result]);
      await client.query('COMMIT');
      return result;
    } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  }

  async updateEntity(id: string, expectedVersion: number, payload: Record<string, unknown>): Promise<number> {
    const result = await this.pool.query<{ record_version: number }>('UPDATE domain_entity SET payload = $1, record_version = record_version + 1 WHERE id = $2 AND record_version = $3 RETURNING record_version', [payload, id, expectedVersion]);
    if (!result.rowCount) throw new OptimisticConcurrencyError('Stale entity version');
    return result.rows[0].record_version;
  }
}

export const schemaSql = `
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS source_system_registry (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), system_key text NOT NULL UNIQUE, display_name text NOT NULL, authority_notes text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS domain_entity (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), entity_type text NOT NULL CHECK (entity_type IN ('INSTITUTION','OFFICE','PERSON','OFFICIAL','AUTHORITY','LEGAL_INSTRUMENT','PROJECT','BUDGET','PROCUREMENT','BIDDER','CONTRACTOR','CONTRACT','PAYMENT','EVIDENCE','GOVERNMENT_EVENT')), payload jsonb NOT NULL, record_version integer NOT NULL DEFAULT 1 CHECK (record_version > 0), created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS provenance_record (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), kind text NOT NULL, method text NOT NULL, recorded_at timestamptz NOT NULL, source jsonb, parent_ids uuid[] NOT NULL DEFAULT '{}');
CREATE TABLE IF NOT EXISTS source_identifier (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), entity_id uuid NOT NULL REFERENCES domain_entity(id), source_system text NOT NULL REFERENCES source_system_registry(system_key), namespace text, source_record_id text NOT NULL, observed_at timestamptz, provenance_id uuid REFERENCES provenance_record(id), UNIQUE (source_system, namespace, source_record_id, entity_id));
CREATE TABLE IF NOT EXISTS state_version (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), entity_id uuid NOT NULL REFERENCES domain_entity(id), state text NOT NULL, valid_from timestamptz NOT NULL, valid_to timestamptz, observed_at timestamptz NOT NULL, provenance_id uuid NOT NULL REFERENCES provenance_record(id), recorded_at timestamptz NOT NULL DEFAULT now(), CHECK (valid_to IS NULL OR valid_from <= valid_to));
CREATE TABLE IF NOT EXISTS evidence (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), entity_id uuid NOT NULL REFERENCES domain_entity(id), evidence_type text NOT NULL, source jsonb NOT NULL, captured_at timestamptz NOT NULL, content_hash text, assertion_kind text NOT NULL, confidence text NOT NULL, availability_status text NOT NULL DEFAULT 'AVAILABLE', provenance_id uuid NOT NULL REFERENCES provenance_record(id));
CREATE TABLE IF NOT EXISTS relationship_assertion (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), relationship_type text NOT NULL, from_entity_id uuid NOT NULL REFERENCES domain_entity(id), to_entity_id uuid NOT NULL REFERENCES domain_entity(id), assertion_kind text NOT NULL, basis text[] NOT NULL, confidence text NOT NULL, status text NOT NULL, valid_from timestamptz NOT NULL, valid_to timestamptz, provenance_id uuid NOT NULL REFERENCES provenance_record(id), CHECK (valid_to IS NULL OR valid_from <= valid_to));
CREATE TABLE IF NOT EXISTS relationship_evidence (relationship_id uuid NOT NULL REFERENCES relationship_assertion(id) ON DELETE CASCADE, evidence_id uuid NOT NULL REFERENCES evidence(id), PRIMARY KEY (relationship_id, evidence_id));
CREATE TABLE IF NOT EXISTS financial_state (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), entity_id uuid NOT NULL REFERENCES domain_entity(id), financial_state text NOT NULL CHECK (financial_state IN ('OBLIGATION','DISBURSEMENT','SETTLEMENT')), amount numeric(20,4) NOT NULL, currency text NOT NULL, settlement_status text NOT NULL, availability_status text NOT NULL DEFAULT 'OBSERVED', valid_from timestamptz NOT NULL, valid_to timestamptz, observed_at timestamptz NOT NULL, provenance_id uuid NOT NULL REFERENCES provenance_record(id), CHECK (valid_to IS NULL OR valid_from <= valid_to));
CREATE TABLE IF NOT EXISTS government_event (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), entity_id uuid NOT NULL REFERENCES domain_entity(id), event_type text NOT NULL, occurred_at timestamptz NOT NULL, status text NOT NULL, assertion_kind text NOT NULL, confidence text NOT NULL, object_entity_id uuid NOT NULL REFERENCES domain_entity(id), provenance_id uuid NOT NULL REFERENCES provenance_record(id));
CREATE TABLE IF NOT EXISTS idempotency_record (idempotency_key text NOT NULL, operation text NOT NULL, request_hash text NOT NULL, result jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY (idempotency_key, operation));
CREATE TABLE IF NOT EXISTS outbox_record (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), event_type text NOT NULL, aggregate_type text NOT NULL, aggregate_id uuid NOT NULL, payload jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), published_at timestamptz);
`;

export const governmentEventLifecycleSql = `
ALTER TABLE government_event ALTER COLUMN occurred_at DROP NOT NULL;
ALTER TABLE government_event ADD COLUMN IF NOT EXISTS observation_at timestamptz;
ALTER TABLE government_event ADD COLUMN IF NOT EXISTS source_recorded_at timestamptz;
ALTER TABLE government_event ADD COLUMN IF NOT EXISTS temporal_precision text NOT NULL DEFAULT 'UNKNOWN';
ALTER TABLE government_event ADD COLUMN IF NOT EXISTS observation_state text NOT NULL DEFAULT 'OBSERVED';
ALTER TABLE government_event ADD COLUMN IF NOT EXISTS event_version integer NOT NULL DEFAULT 1;
ALTER TABLE government_event ADD COLUMN IF NOT EXISTS supersedes_event_id uuid REFERENCES government_event(id);
ALTER TABLE government_event ADD COLUMN IF NOT EXISTS source_identity_key text;
ALTER TABLE government_event ADD COLUMN IF NOT EXISTS source_revision text NOT NULL DEFAULT 'UNVERSIONED';
ALTER TABLE government_event ADD COLUMN IF NOT EXISTS occurred_at_source_value text;
CREATE UNIQUE INDEX IF NOT EXISTS government_event_source_identity_revision_idx ON government_event(source_identity_key, source_revision) WHERE source_identity_key IS NOT NULL;
CREATE INDEX IF NOT EXISTS government_event_source_identity_idx ON government_event(source_identity_key) WHERE source_identity_key IS NOT NULL;
`;

export const packageName = '@egovtrace/database';
