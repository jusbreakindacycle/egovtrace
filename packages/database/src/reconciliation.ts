import type { PersistenceStore } from './index.js';
import type {
  DomainId,
  ReconciliationResult,
  ReconciliationRun,
  ReconciliationStepInput,
  ReconciliationStepResult,
} from '../../domain/dist/index.js';

export type ReconciliationRunStatus = 'CREATED' | 'COMPLETED' | 'FAILED' | 'FINALIZED';

export type ReconciliationPersistedRun = ReconciliationResult['run'] & {
  readonly controlPathVersion: number;
  readonly status: ReconciliationRunStatus;
  readonly recordVersion: number;
  readonly stepResults: readonly ReconciliationStepResult[];
};

export class ReconciliationIdempotencyConflictError extends Error {}
export class ReconciliationConcurrencyError extends Error {}
export class ReconciliationImmutableError extends Error {}

function stableJson(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`).join(',')}}`;
}

function requestHash(result: ReconciliationResult): string {
  const input = stableJson(result).normalize('NFC');
  let hash = 0;
  for (const char of input) hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
  return String(hash >>> 0);
}

function validateRun(run: ReconciliationRun): void {
  if (!run.id || !run.controlPathId) throw new Error('reconciliation run identifiers are required');
  if (!run.algorithmVersion.trim()) throw new Error('algorithmVersion is required');
  if (Number.isNaN(Date.parse(run.executedAt))) throw new Error('executedAt must be ISO-parseable');
  const keys = new Set<string>();
  for (const input of run.stepInputs) {
    if (!input.stepKey.trim()) throw new Error('stepKey is required');
    if (keys.has(input.stepKey)) throw new Error(`duplicate reconciliation step input: ${input.stepKey}`);
    keys.add(input.stepKey);
  }
}

async function getRunInternal(store: PersistenceStore, id: string): Promise<ReconciliationPersistedRun | null> {
  const rows = await store.query<any>('SELECT id,control_path_id,control_path_version,observation_scope,algorithm_version,executed_at,status,record_version FROM reconciliation_run WHERE id=$1', [id]);
  if (!rows.length) return null;
  const row = rows[0];
  const inputs = await store.query<any>('SELECT step_key,applicability FROM reconciliation_step_input WHERE reconciliation_run_id=$1 ORDER BY step_key', [id]);
  const stepRows = await store.query<any>('SELECT id,step_key,status,selected_event_id,reason_codes FROM reconciliation_step_result WHERE reconciliation_run_id=$1 ORDER BY step_key', [id]);
  const stepResults: ReconciliationStepResult[] = [];
  for (const step of stepRows) {
    const [candidates, explanations] = await Promise.all([
      store.query<any>('SELECT event_id FROM reconciliation_step_candidate WHERE step_result_id=$1 ORDER BY candidate_ordinal,event_id', [step.id]),
      store.query<any>('SELECT event_id,matched_criteria FROM reconciliation_match_explanation WHERE step_result_id=$1 ORDER BY event_id', [step.id]),
    ]);
    stepResults.push({
      stepKey: step.step_key,
      status: step.status,
      candidateEventIds: candidates.map((candidate) => candidate.event_id as DomainId<'GOVERNMENT_EVENT'>),
      selectedEventId: step.selected_event_id ?? undefined,
      matches: explanations.map((explanation) => ({ eventId: explanation.event_id, matchedCriteria: explanation.matched_criteria })),
      reasonCodes: step.reason_codes ?? [],
    });
  }
  return {
    id: row.id,
    controlPathId: row.control_path_id,
    observationScope: row.observation_scope,
    stepInputs: inputs.map((input): ReconciliationStepInput => ({ stepKey: input.step_key, applicability: input.applicability })),
    algorithmVersion: row.algorithm_version,
    executedAt: new Date(row.executed_at).toISOString(),
    controlPathVersion: row.control_path_version,
    status: row.status,
    recordVersion: row.record_version,
    stepResults,
  };
}

export class ReconciliationRepository {
  constructor(private readonly store: PersistenceStore) {}

  async migrate(): Promise<void> {
    await this.store.query(reconciliationMigrationSql);
  }

  async create(result: ReconciliationResult, idempotencyKey: string): Promise<ReconciliationPersistedRun> {
    validateRun(result.run);
    if (!idempotencyKey.trim()) throw new Error('idempotencyKey is required');
    const hash = requestHash(result);
    const client = await this.store.pool.connect();
    try {
      await client.query('BEGIN');
      const prior = await client.query<{ request_hash: string; id: string }>('SELECT request_hash,id FROM reconciliation_run WHERE idempotency_key=$1 FOR UPDATE', [idempotencyKey]);
      if (prior.rowCount) {
        if (prior.rows[0].request_hash !== hash) throw new ReconciliationIdempotencyConflictError('idempotency key reused with a different reconciliation request');
        await client.query('COMMIT');
        const replayed = await getRunInternal(this.store, prior.rows[0].id);
        if (!replayed) throw new Error('idempotency key points to a missing reconciliation run');
        return replayed;
      }
      await client.query('INSERT INTO reconciliation_run (id,control_path_id,control_path_version,observation_scope,algorithm_version,executed_at,status,idempotency_key,request_hash) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [result.run.id, result.run.controlPathId, result.controlPathVersion, result.run.observationScope, result.run.algorithmVersion, result.run.executedAt, 'COMPLETED', idempotencyKey, hash]);
      for (const input of result.run.stepInputs) await client.query('INSERT INTO reconciliation_step_input (reconciliation_run_id,step_key,applicability) VALUES ($1,$2,$3)', [result.run.id, input.stepKey, input.applicability]);
      for (const step of result.stepResults) {
        const inserted = await client.query<{ id: string }>('INSERT INTO reconciliation_step_result (reconciliation_run_id,step_key,status,selected_event_id,reason_codes) VALUES ($1,$2,$3,$4,$5) RETURNING id', [result.run.id, step.stepKey, step.status, step.selectedEventId ?? null, step.reasonCodes]);
        const stepResultId = inserted.rows[0].id;
        for (const [ordinal, eventId] of step.candidateEventIds.entries()) await client.query('INSERT INTO reconciliation_step_candidate (step_result_id,event_id,candidate_ordinal) VALUES ($1,$2,$3)', [stepResultId, eventId, ordinal]);
        for (const explanation of step.matches) await client.query('INSERT INTO reconciliation_match_explanation (step_result_id,event_id,matched_criteria) VALUES ($1,$2,$3)', [stepResultId, explanation.eventId, explanation.matchedCriteria]);
      }
      await client.query('COMMIT');
      const created = await getRunInternal(this.store, result.run.id);
      if (!created) throw new Error('created reconciliation run could not be retrieved');
      return created;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async finalize(id: string, expectedRecordVersion: number): Promise<number> {
    const client = await this.store.pool.connect();
    try {
      await client.query('BEGIN');
      const current = await client.query<{ status: ReconciliationRunStatus; record_version: number }>('SELECT status,record_version FROM reconciliation_run WHERE id=$1 FOR UPDATE', [id]);
      if (!current.rowCount) throw new Error('ReconciliationRun not found');
      if (current.rows[0].record_version !== expectedRecordVersion) throw new ReconciliationConcurrencyError('stale reconciliation run version');
      if (current.rows[0].status === 'FINALIZED') throw new ReconciliationImmutableError('reconciliation run is already finalized');
      if (current.rows[0].status !== 'COMPLETED') throw new Error(`only COMPLETED reconciliation runs may be finalized; current=${current.rows[0].status}`);
      const updated = await client.query<{ record_version: number }>('UPDATE reconciliation_run SET status=$1,record_version=record_version+1,updated_at=now() WHERE id=$2 AND record_version=$3 RETURNING record_version', ['FINALIZED', id, expectedRecordVersion]);
      if (!updated.rowCount) throw new ReconciliationConcurrencyError('stale reconciliation run version');
      await client.query('COMMIT');
      return updated.rows[0].record_version;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async get(id: string): Promise<ReconciliationPersistedRun | null> {
    return getRunInternal(this.store, id);
  }

  async getByIdempotencyKey(idempotencyKey: string): Promise<ReconciliationPersistedRun | null> {
    const rows = await this.store.query<{ id: string }>('SELECT id FROM reconciliation_run WHERE idempotency_key=$1', [idempotencyKey]);
    return rows.length ? getRunInternal(this.store, rows[0].id) : null;
  }

  async listByControlPath(controlPathId: string, controlPathVersion?: number): Promise<ReconciliationPersistedRun[]> {
    const rows = controlPathVersion === undefined
      ? await this.store.query<any>('SELECT id FROM reconciliation_run WHERE control_path_id=$1 ORDER BY control_path_version,executed_at,id', [controlPathId])
      : await this.store.query<any>('SELECT id FROM reconciliation_run WHERE control_path_id=$1 AND control_path_version=$2 ORDER BY executed_at,id', [controlPathId, controlPathVersion]);
    const runs: ReconciliationPersistedRun[] = [];
    for (const row of rows) {
      const run = await getRunInternal(this.store, row.id);
      if (run) runs.push(run);
    }
    return runs;
  }
}

export const reconciliationMigrationSql = `
CREATE TABLE IF NOT EXISTS reconciliation_run (
  id uuid PRIMARY KEY,
  control_path_id uuid NOT NULL REFERENCES expected_control_path(id),
  control_path_version integer NOT NULL CHECK (control_path_version > 0),
  observation_scope jsonb NOT NULL DEFAULT '{}',
  algorithm_version text NOT NULL,
  executed_at timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('CREATED','COMPLETED','FAILED','FINALIZED')),
  record_version integer NOT NULL DEFAULT 1 CHECK (record_version > 0),
  idempotency_key text NOT NULL UNIQUE,
  request_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS reconciliation_step_input (
  reconciliation_run_id uuid NOT NULL REFERENCES reconciliation_run(id) ON DELETE CASCADE,
  step_key text NOT NULL,
  applicability text NOT NULL CHECK (applicability IN ('APPLICABLE','INAPPLICABLE','UNKNOWN')),
  PRIMARY KEY (reconciliation_run_id, step_key)
);
CREATE TABLE IF NOT EXISTS reconciliation_step_result (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reconciliation_run_id uuid NOT NULL REFERENCES reconciliation_run(id) ON DELETE CASCADE,
  step_key text NOT NULL,
  status text NOT NULL CHECK (status IN ('MATCHED','MULTIPLE_MATCHES','NOT_OBSERVED','UNAVAILABLE','OUT_OF_SCOPE','INAPPLICABLE','INSUFFICIENT_INFORMATION','CONFLICTING_OBSERVATIONS')),
  selected_event_id uuid REFERENCES government_event(id),
  reason_codes text[] NOT NULL DEFAULT '{}',
  UNIQUE (reconciliation_run_id, step_key)
);
CREATE TABLE IF NOT EXISTS reconciliation_step_candidate (
  step_result_id uuid NOT NULL REFERENCES reconciliation_step_result(id) ON DELETE CASCADE,
  event_id uuid NOT NULL REFERENCES government_event(id),
  candidate_ordinal integer NOT NULL CHECK (candidate_ordinal >= 0),
  PRIMARY KEY (step_result_id, event_id),
  UNIQUE (step_result_id, candidate_ordinal)
);
CREATE TABLE IF NOT EXISTS reconciliation_match_explanation (
  step_result_id uuid NOT NULL REFERENCES reconciliation_step_result(id) ON DELETE CASCADE,
  event_id uuid NOT NULL REFERENCES government_event(id),
  matched_criteria text[] NOT NULL DEFAULT '{}',
  PRIMARY KEY (step_result_id, event_id)
);
CREATE INDEX IF NOT EXISTS reconciliation_run_control_path_idx ON reconciliation_run(control_path_id, control_path_version, executed_at DESC);
CREATE INDEX IF NOT EXISTS reconciliation_run_status_idx ON reconciliation_run(status, executed_at DESC);
CREATE INDEX IF NOT EXISTS reconciliation_step_result_run_idx ON reconciliation_step_result(reconciliation_run_id);
`;
