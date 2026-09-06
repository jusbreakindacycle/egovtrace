import test, { before, after, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import {
  PersistenceStore,
  ReconciliationConcurrencyError,
  ReconciliationIdempotencyConflictError,
  ReconciliationImmutableError,
  ReconciliationRepository,
} from '../packages/database/dist/index.js';

const connectionString = process.env.DATABASE_URL;
const integration = connectionString ? test : test.skip;
let store;
let repository;
const createdRunIds = new Set();
const controlPathIds = new Set();
const eventIds = new Set();

function iso(day) { return `2026-09-${String(day).padStart(2, '0')}T00:00:00.000Z`; }

async function createFixture() {
  const controlPathId = randomUUID();
  const eventId = randomUUID();
  const eventEntityId = randomUUID();
  const provenanceId = randomUUID();
  const runId = randomUUID();
  controlPathIds.add(controlPathId);
  eventIds.add(eventId);
  createdRunIds.add(runId);

  await store.query('INSERT INTO provenance_record (id,kind,method,recorded_at,source) VALUES ($1,$2,$3,$4,$5)', [provenanceId, 'SYNTHETIC_FIXTURE', 'tests/reconciliation-persistence.test.mjs', iso(1), { synthetic: true }]);
  await store.query('INSERT INTO expected_control_path (id,control_path_key,version,status,classification,validity_from,scope,applicability,metadata) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [controlPathId, `synthetic-path-${controlPathId}`, 1, 'ACTIVE', 'SYNTHETIC', iso(1), {}, { conditions: [] }, { synthetic: true }]);
  await store.query('INSERT INTO expected_control_path_provenance (expected_control_path_id,provenance_id) VALUES ($1,$2)', [controlPathId, provenanceId]);
  const stepResult = await store.query('INSERT INTO expected_control_step (control_path_id,step_key,sequence,description,step_type,requiredness,responsibility,completion_modes) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id', [controlPathId, 'PROJECT_CREATED', 1, 'Synthetic project creation', 'AUTHORIZATION', 'REQUIRED', {}, ['EVENT_OBSERVED']]);
  await store.query('INSERT INTO expected_control_step_event_type (step_id,event_type) VALUES ($1,$2)', [stepResult[0].id, 'PROJECT_CREATED']);

  await store.query('INSERT INTO domain_entity (id,entity_type,payload) VALUES ($1,$2,$3)', [eventEntityId, 'PROJECT', { name: 'Synthetic Persistence Project' }]);
  await store.query('INSERT INTO government_event (id,entity_id,event_type,occurred_at,status,assertion_kind,confidence,object_entity_id,provenance_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [eventId, eventEntityId, 'PROJECT_CREATED', iso(2), 'OBSERVED', 'OBSERVATION', 'HIGH', eventEntityId, provenanceId]);

  const result = {
    run: {
      id: runId,
      controlPathId,
      observationScope: { eventIds: [eventId], validFrom: iso(1), validTo: iso(3) },
      stepInputs: [{ stepKey: 'PROJECT_CREATED', applicability: 'APPLICABLE' }],
      algorithmVersion: 't007.1-v1',
      executedAt: iso(3),
    },
    controlPathVersion: 1,
    stepResults: [{
      stepKey: 'PROJECT_CREATED',
      status: 'MATCHED',
      candidateEventIds: [eventId],
      selectedEventId: eventId,
      matches: [{ eventId, matchedCriteria: ['EVENT_TYPE', 'SOURCE_IDENTITY', 'TEMPORAL_COMPATIBILITY'] }],
      reasonCodes: ['EXPLICIT_MATCH_CRITERIA_SATISFIED'],
    }],
  };
  return { result, controlPathId, eventId };
}

before(async () => {
  if (!connectionString) return;
  store = new PersistenceStore({ connectionString });
  repository = new ReconciliationRepository(store);
  await store.migrate();
});

afterEach(async () => {
  if (!store) return;
  for (const runId of createdRunIds) await store.query('DELETE FROM reconciliation_run WHERE id=$1', [runId]);
  for (const eventId of eventIds) await store.query('DELETE FROM government_event WHERE id=$1', [eventId]);
  for (const controlPathId of controlPathIds) await store.query('DELETE FROM expected_control_path WHERE id=$1', [controlPathId]);
  createdRunIds.clear(); eventIds.clear(); controlPathIds.clear();
});

after(async () => { if (store) await store.close(); });

integration('persists and retrieves a complete reconciliation result', async () => {
  const { result } = await createFixture();
  const persisted = await repository.create(result, `persist-${result.run.id}`);
  assert.equal(persisted.id, result.run.id);
  assert.equal(persisted.controlPathVersion, 1);
  assert.equal(persisted.status, 'COMPLETED');
  assert.deepEqual(persisted.stepInputs, result.run.stepInputs);
  assert.deepEqual(persisted.stepResults, result.stepResults);
  assert.deepEqual(await repository.getByIdempotencyKey(`persist-${result.run.id}`), persisted);
});

integration('replays idempotently and rejects conflicting reuse', async () => {
  const { result } = await createFixture();
  const key = `idem-${result.run.id}`;
  const first = await repository.create(result, key);
  const replay = await repository.create(result, key);
  assert.equal(replay.id, first.id);
  assert.equal((await store.query('SELECT count(*) AS count FROM reconciliation_run WHERE id=$1', [first.id]))[0].count, '1');
  const changed = { ...result, run: { ...result.run, algorithmVersion: 'different-version' } };
  await assert.rejects(() => repository.create(changed, key), ReconciliationIdempotencyConflictError);
});

integration('preserves multiple candidates and null selection', async () => {
  const { result } = await createFixture();
  result.stepResults[0] = { ...result.stepResults[0], status: 'MULTIPLE_MATCHES', selectedEventId: undefined };
  const persisted = await repository.create(result, `multi-${result.run.id}`);
  assert.equal(persisted.stepResults[0].status, 'MULTIPLE_MATCHES');
  assert.equal(persisted.stepResults[0].selectedEventId, undefined);
});

integration('keeps historical control-path version on the persisted run', async () => {
  const { result, controlPathId } = await createFixture();
  const persisted = await repository.create(result, `history-${result.run.id}`);
  await store.query('UPDATE expected_control_path SET version=2 WHERE id=$1', [controlPathId]);
  assert.equal((await repository.get(persisted.id)).controlPathVersion, 1);
});

integration('finalizes a run and rejects stale or repeated finalization', async () => {
  const { result } = await createFixture();
  const persisted = await repository.create(result, `finalize-${result.run.id}`);
  const nextVersion = await repository.finalize(persisted.id, persisted.recordVersion);
  assert.equal(nextVersion, persisted.recordVersion + 1);
  await assert.rejects(() => repository.finalize(persisted.id, persisted.recordVersion), ReconciliationConcurrencyError);
  await assert.rejects(() => repository.finalize(persisted.id, nextVersion), ReconciliationImmutableError);
});

integration('rolls back the entire reconciliation result on child-row failure', async () => {
  const { result } = await createFixture();
  const broken = { ...result, stepResults: [...result.stepResults, { ...result.stepResults[0] }] };
  await assert.rejects(() => repository.create(broken, `rollback-${result.run.id}`), /duplicate key|unique/i);
  assert.equal((await store.query('SELECT count(*) AS count FROM reconciliation_run WHERE id=$1', [result.run.id]))[0].count, '0');
});
