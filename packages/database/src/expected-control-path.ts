import { createHash } from 'node:crypto';
import type { PoolClient } from 'pg';
import type { PersistenceStore } from './index.js';
import type { ProvenanceReference } from '../../domain/dist/index.js';
import {
  assertPathMayBeMutated,
  assertValidStatusTransition,
  normalizeExpectedControlPath,
  validateExpectedControlPath,
  type ExpectedControlPath,
  type ExpectedControlStep,
} from '../../domain/dist/expected-control-path.js';

export const expectedControlPathMigrationSql = `
CREATE TABLE IF NOT EXISTS expected_control_path (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  control_path_key text NOT NULL,
  version integer NOT NULL CHECK (version > 0),
  status text NOT NULL CHECK (status IN ('DRAFT','REVIEW','APPROVED','ACTIVE','RETIRED')),
  classification text NOT NULL CHECK (classification IN ('SYNTHETIC','NORMATIVE','INTERPRETED')),
  validity_from timestamptz NOT NULL,
  validity_to timestamptz,
  scope jsonb NOT NULL DEFAULT '{}',
  applicability jsonb NOT NULL DEFAULT '{"conditions":[]}',
  metadata jsonb NOT NULL DEFAULT '{}',
  record_version integer NOT NULL DEFAULT 1 CHECK (record_version > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (control_path_key, version),
  CHECK (validity_to IS NULL OR validity_from <= validity_to)
);
CREATE TABLE IF NOT EXISTS expected_control_step (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  control_path_id uuid NOT NULL REFERENCES expected_control_path(id) ON DELETE CASCADE,
  step_key text NOT NULL,
  sequence integer NOT NULL CHECK (sequence >= 0),
  description text NOT NULL,
  step_type text NOT NULL CHECK (step_type IN ('AUTHORIZATION','BUDGET','PROCUREMENT','CONTRACT','PAYMENT','IMPLEMENTATION','VERIFICATION','AUDIT','ACCOUNTABILITY','OUTCOME')),
  requiredness text NOT NULL CHECK (requiredness IN ('REQUIRED','OPTIONAL','CONDITIONAL')),
  responsibility jsonb NOT NULL DEFAULT '{}',
  timing jsonb,
  independence text CHECK (independence IS NULL OR independence IN ('MUST_DIFFER_FROM_PREVIOUS_ACTOR','MUST_DIFFER_FROM_AUTHORIZING_ACTOR','MUST_BE_OUTSIDE_EXECUTING_OFFICE')),
  applicability jsonb,
  alternative_group text,
  completion_modes text[] NOT NULL CHECK (cardinality(completion_modes) > 0 AND completion_modes <@ ARRAY['EVENT_OBSERVED','EVIDENCE_PRESENT','HUMAN_CONFIRMATION','DECLARATIVE_REFERENCE']::text[]),
  UNIQUE (control_path_id, step_key)
);
CREATE TABLE IF NOT EXISTS expected_control_step_dependency (
  step_id uuid NOT NULL REFERENCES expected_control_step(id) ON DELETE CASCADE,
  dependency_step_key text NOT NULL,
  dependency_kind text NOT NULL CHECK (dependency_kind IN ('REQUIRED_PREDECESSOR','OPTIONAL_PREDECESSOR','ALTERNATIVE_PREDECESSOR')),
  PRIMARY KEY (step_id, dependency_step_key, dependency_kind)
);
CREATE TABLE IF NOT EXISTS expected_control_step_event_type (
  step_id uuid NOT NULL REFERENCES expected_control_step(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('PROJECT_CREATED','BUDGET_APPROVED','PROCUREMENT_POSTED','CONTRACT_AWARDED','PAYMENT_OBLIGATED','PAYMENT_DISBURSED','PAYMENT_SETTLED','IMPLEMENTATION_REPORTED','VERIFICATION_RECORDED')),
  PRIMARY KEY (step_id, event_type)
);
CREATE TABLE IF NOT EXISTS expected_control_step_evidence_expectation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_id uuid NOT NULL REFERENCES expected_control_step(id) ON DELETE CASCADE,
  evidence_type text NOT NULL,
  minimum_count integer NOT NULL CHECK (minimum_count >= 0),
  source_class text,
  required_attributes text[] NOT NULL DEFAULT '{}',
  accepted_assertion_kinds text[] NOT NULL DEFAULT '{}',
  availability_requirement text CHECK (availability_requirement IS NULL OR availability_requirement IN ('AVAILABLE','MAY_BE_WITHHELD')),
  UNIQUE (step_id, evidence_type, source_class)
);
CREATE TABLE IF NOT EXISTS expected_control_path_provenance (
  expected_control_path_id uuid NOT NULL REFERENCES expected_control_path(id) ON DELETE CASCADE,
  provenance_id uuid NOT NULL REFERENCES provenance_record(id),
  PRIMARY KEY (expected_control_path_id, provenance_id)
);
CREATE TABLE IF NOT EXISTS expected_control_step_provenance (
  expected_control_step_id uuid NOT NULL REFERENCES expected_control_step(id) ON DELETE CASCADE,
  provenance_id uuid NOT NULL REFERENCES provenance_record(id),
  PRIMARY KEY (expected_control_step_id, provenance_id)
);
CREATE TABLE IF NOT EXISTS expected_control_path_idempotency (
  idempotency_key text PRIMARY KEY,
  operation text NOT NULL,
  request_hash text NOT NULL,
  expected_control_path_id uuid NOT NULL REFERENCES expected_control_path(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS expected_control_path_lookup_idx ON expected_control_path(control_path_key, version);
CREATE INDEX IF NOT EXISTS expected_control_path_status_idx ON expected_control_path(status, validity_from, validity_to);
`;

export type ExpectedControlPathCreateResult = {
  readonly pathId: string;
  readonly recordVersion: number;
  readonly replayed: boolean;
};
export class ExpectedControlPathIdempotencyConflictError extends Error {}
export class ExpectedControlPathConcurrencyError extends Error {}

function hashPath(path: ExpectedControlPath): string { return createHash('sha256').update(JSON.stringify(path)).digest('hex'); }

async function loadProvenance(store: PersistenceStore, ids: readonly string[]): Promise<ProvenanceReference[]> {
  if (ids.length === 0) return [];
  const rows = await store.query<any>('SELECT id,kind,source,parent_ids,recorded_at,method FROM provenance_record WHERE id = ANY($1::uuid[])', [ids]);
  const byId = new Map(rows.map((row) => [row.id, row]));
  return ids.map((id) => {
    const row = byId.get(id);
    if (!row) throw new Error(`provenance record ${id} not found`);
    return { provenanceId: row.id, kind: row.kind, source: row.source ?? undefined, parentProvenanceIds: row.parent_ids ?? [], recordedAt: new Date(row.recorded_at).toISOString(), method: row.method } as ProvenanceReference;
  });
}

async function insertProvenanceLinks(client: PoolClient, path: ExpectedControlPath): Promise<void> {
  for (const provenance of path.provenance) await client.query('INSERT INTO expected_control_path_provenance (expected_control_path_id, provenance_id) VALUES ($1,$2)', [path.id, provenance.provenanceId]);
}

async function insertSteps(client: PoolClient, pathId: string, steps: readonly ExpectedControlStep[]): Promise<void> {
  for (const step of steps) {
    const result = await client.query<{ id: string }>(
      `INSERT INTO expected_control_step (control_path_id,step_key,sequence,description,step_type,requiredness,responsibility,timing,independence,applicability,alternative_group,completion_modes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id`,
      [pathId, step.key, step.sequence, step.description, step.type, step.requiredness, step.responsibility, step.timing ?? null, step.independence ?? null, step.applicability ?? null, step.alternativeGroup ?? null, step.completionModes],
    );
    const stepId = result.rows[0].id;
    for (const dependency of step.dependencies) await client.query('INSERT INTO expected_control_step_dependency (step_id,dependency_step_key,dependency_kind) VALUES ($1,$2,$3)', [stepId, dependency.stepKey, dependency.kind]);
    for (const eventType of step.expectedEventTypes) await client.query('INSERT INTO expected_control_step_event_type (step_id,event_type) VALUES ($1,$2)', [stepId, eventType]);
    for (const expectation of step.evidenceExpectations) await client.query('INSERT INTO expected_control_step_evidence_expectation (step_id,evidence_type,minimum_count,source_class,required_attributes,accepted_assertion_kinds,availability_requirement) VALUES ($1,$2,$3,$4,$5,$6,$7)', [stepId, expectation.evidenceType, expectation.minimumCount, expectation.sourceClass ?? null, expectation.requiredAttributes ?? [], expectation.acceptedAssertionKinds ?? [], expectation.availabilityRequirement ?? null]);
    for (const provenance of step.provenance) await client.query('INSERT INTO expected_control_step_provenance (expected_control_step_id, provenance_id) VALUES ($1,$2)', [stepId, provenance.provenanceId]);
  }
}

export class ExpectedControlPathRepository {
  constructor(private readonly store: PersistenceStore) {}
  async migrate(): Promise<void> { await this.store.query(expectedControlPathMigrationSql); }

  async create(path: ExpectedControlPath, idempotencyKey: string): Promise<ExpectedControlPathCreateResult> {
    const normalized = normalizeExpectedControlPath(path);
    validateExpectedControlPath(normalized);
    if (!idempotencyKey.trim()) throw new Error('idempotencyKey is required');
    const hash = hashPath(normalized);
    const client = await this.store.pool.connect();
    try {
      await client.query('BEGIN');
      const prior = await client.query<{ request_hash: string; expected_control_path_id: string }>('SELECT request_hash,expected_control_path_id FROM expected_control_path_idempotency WHERE idempotency_key=$1 FOR UPDATE', [idempotencyKey]);
      if (prior.rowCount) {
        if (prior.rows[0].request_hash !== hash) throw new ExpectedControlPathIdempotencyConflictError('idempotency key reused with a different ExpectedControlPath');
        const version = await client.query<{ record_version: number }>('SELECT record_version FROM expected_control_path WHERE id=$1', [prior.rows[0].expected_control_path_id]);
        await client.query('COMMIT');
        return { pathId: prior.rows[0].expected_control_path_id, recordVersion: version.rows[0]?.record_version ?? 1, replayed: true };
      }
      const inserted = await client.query<{ id: string; record_version: number }>(
        `INSERT INTO expected_control_path (id,control_path_key,version,status,classification,validity_from,validity_to,scope,applicability,metadata)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id,record_version`,
        [normalized.id, normalized.controlPathKey, normalized.version, normalized.status, normalized.classification, normalized.validity.validFrom, normalized.validity.validTo ?? null, normalized.scope, normalized.applicability, normalized.metadata],
      );
      await insertProvenanceLinks(client, normalized);
      await insertSteps(client, inserted.rows[0].id, normalized.steps);
      await client.query('INSERT INTO expected_control_path_idempotency (idempotency_key,operation,request_hash,expected_control_path_id) VALUES ($1,$2,$3,$4)', [idempotencyKey, 'CREATE_EXPECTED_CONTROL_PATH', hash, inserted.rows[0].id]);
      await client.query('COMMIT');
      return { pathId: inserted.rows[0].id, recordVersion: inserted.rows[0].record_version, replayed: false };
    } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  }

  async createNextVersion(path: ExpectedControlPath, idempotencyKey: string): Promise<ExpectedControlPathCreateResult> {
    validateExpectedControlPath(path);
    const latest = await this.store.query<{ version: number }>('SELECT version FROM expected_control_path WHERE control_path_key=$1 ORDER BY version DESC LIMIT 1', [path.controlPathKey]);
    const expectedVersion = latest.length ? latest[0].version + 1 : 1;
    if (path.version !== expectedVersion) throw new Error(`next ExpectedControlPath version must be ${expectedVersion}`);
    return this.create(path, idempotencyKey);
  }

  async updateDraft(path: ExpectedControlPath, expectedRecordVersion: number): Promise<number> {
    validateExpectedControlPath(path);
    assertPathMayBeMutated(path.status);
    const client = await this.store.pool.connect();
    try {
      await client.query('BEGIN');
      const current = await client.query<{ status: ExpectedControlPath['status']; record_version: number }>('SELECT status,record_version FROM expected_control_path WHERE id=$1 FOR UPDATE', [path.id]);
      if (!current.rowCount) throw new Error('ExpectedControlPath not found');
      if (current.rows[0].status !== 'DRAFT') throw new Error(`path with status ${current.rows[0].status} is immutable; create a new version instead`);
      if (current.rows[0].record_version !== expectedRecordVersion) throw new ExpectedControlPathConcurrencyError('stale ExpectedControlPath version');
      await client.query('DELETE FROM expected_control_step WHERE control_path_id=$1', [path.id]);
      await client.query('DELETE FROM expected_control_path_provenance WHERE expected_control_path_id=$1', [path.id]);
      const updated = await client.query<{ record_version: number }>(
        `UPDATE expected_control_path SET control_path_key=$1,classification=$2,validity_from=$3,validity_to=$4,scope=$5,applicability=$6,metadata=$7,record_version=record_version+1,updated_at=now()
         WHERE id=$8 AND record_version=$9 RETURNING record_version`,
        [path.controlPathKey, path.classification, path.validity.validFrom, path.validity.validTo ?? null, path.scope, path.applicability, path.metadata, path.id, expectedRecordVersion],
      );
      if (!updated.rowCount) throw new ExpectedControlPathConcurrencyError('stale ExpectedControlPath version');
      await insertProvenanceLinks(client, path);
      await insertSteps(client, path.id, path.steps);
      await client.query('COMMIT');
      return updated.rows[0].record_version;
    } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  }

  async transitionStatus(id: string, to: ExpectedControlPath['status'], expectedRecordVersion: number): Promise<number> {
    const client = await this.store.pool.connect();
    try {
      await client.query('BEGIN');
      const current = await client.query<{ status: ExpectedControlPath['status']; record_version: number }>('SELECT status,record_version FROM expected_control_path WHERE id=$1 FOR UPDATE', [id]);
      if (!current.rowCount) throw new Error('ExpectedControlPath not found');
      assertValidStatusTransition(current.rows[0].status, to);
      if (current.rows[0].record_version !== expectedRecordVersion) throw new ExpectedControlPathConcurrencyError('stale ExpectedControlPath version');
      const updated = await client.query<{ record_version: number }>('UPDATE expected_control_path SET status=$1,record_version=record_version+1,updated_at=now() WHERE id=$2 AND record_version=$3 RETURNING record_version', [to, id, expectedRecordVersion]);
      if (!updated.rowCount) throw new ExpectedControlPathConcurrencyError('stale ExpectedControlPath version');
      await client.query('COMMIT');
      return updated.rows[0].record_version;
    } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  }

  async get(id: string): Promise<ExpectedControlPath | null> {
    const rows = await this.store.query<any>('SELECT id,control_path_key,version,status,classification,validity_from,validity_to,scope,applicability,metadata FROM expected_control_path WHERE id=$1', [id]);
    if (!rows.length) return null;
    const row = rows[0];
    const stepsRows = await this.store.query<any>('SELECT id,step_key,sequence,description,step_type,requiredness,responsibility,timing,independence,applicability,alternative_group,completion_modes FROM expected_control_step WHERE control_path_id=$1 ORDER BY sequence,step_key', [id]);
    const pathProvIds = (await this.store.query<any>('SELECT provenance_id FROM expected_control_path_provenance WHERE expected_control_path_id=$1 ORDER BY provenance_id', [id])).map((p) => p.provenance_id);
    const pathProvenance = await loadProvenance(this.store, pathProvIds);
    const steps: ExpectedControlStep[] = [];
    for (const step of stepsRows) {
      const [dependencies, events, evidence, provRows] = await Promise.all([
        this.store.query<any>('SELECT dependency_step_key,dependency_kind FROM expected_control_step_dependency WHERE step_id=$1 ORDER BY dependency_step_key,dependency_kind', [step.id]),
        this.store.query<any>('SELECT event_type FROM expected_control_step_event_type WHERE step_id=$1 ORDER BY event_type', [step.id]),
        this.store.query<any>('SELECT evidence_type,minimum_count,source_class,required_attributes,accepted_assertion_kinds,availability_requirement FROM expected_control_step_evidence_expectation WHERE step_id=$1 ORDER BY evidence_type,source_class', [step.id]),
        this.store.query<any>('SELECT provenance_id FROM expected_control_step_provenance WHERE expected_control_step_id=$1 ORDER BY provenance_id', [step.id]),
      ]);
      const stepProvenance = await loadProvenance(this.store, provRows.map((p) => p.provenance_id));
      steps.push({
        id: step.id,
        key: step.step_key,
        sequence: step.sequence,
        description: step.description,
        type: step.step_type,
        requiredness: step.requiredness,
        dependencies: dependencies.map((d) => ({ stepKey: d.dependency_step_key, kind: d.dependency_kind })),
        expectedEventTypes: events.map((e) => e.event_type),
        evidenceExpectations: evidence.map((e) => ({ evidenceType: e.evidence_type, minimumCount: e.minimum_count, sourceClass: e.source_class ?? undefined, requiredAttributes: e.required_attributes, acceptedAssertionKinds: e.accepted_assertion_kinds, availabilityRequirement: e.availability_requirement ?? undefined })),
        responsibility: step.responsibility,
        timing: step.timing ?? undefined,
        independence: step.independence ?? undefined,
        applicability: step.applicability ?? undefined,
        alternativeGroup: step.alternative_group ?? undefined,
        completionModes: step.completion_modes,
        provenance: stepProvenance,
      });
    }
    const asIso = (value: string | Date) => new Date(value).toISOString();
    const result: ExpectedControlPath = { id: row.id, controlPathKey: row.control_path_key, version: row.version, status: row.status, classification: row.classification, validity: { validFrom: asIso(row.validity_from), ...(row.validity_to ? { validTo: asIso(row.validity_to) } : {}) }, scope: row.scope, applicability: row.applicability, steps, provenance: pathProvenance, metadata: row.metadata };
    validateExpectedControlPath(result);
    return result;
  }

  async list(controlPathKey?: string): Promise<ExpectedControlPath[]> {
    const rows = controlPathKey ? await this.store.query<any>('SELECT id FROM expected_control_path WHERE control_path_key=$1 ORDER BY version', [controlPathKey]) : await this.store.query<any>('SELECT id FROM expected_control_path ORDER BY control_path_key,version');
    const paths: ExpectedControlPath[] = [];
    for (const row of rows) { const path = await this.get(row.id); if (path) paths.push(path); }
    return paths;
  }
}
