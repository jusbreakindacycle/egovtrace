import test, { before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { PersistenceStore, IdempotencyConflictError, OptimisticConcurrencyError } from '../packages/database/dist/index.js';

const connectionString = process.env.DATABASE_URL;
const integration = connectionString ? test : test.skip;
let store;

test('database configuration must be explicit', async () => {
  if (connectionString) return;
  assert.throws(() => new PersistenceStore({}), /requires an explicit connectionString or DATABASE_URL/);
});

const baseMutation = (overrides = {}) => ({
  idempotencyKey: `synthetic-${Math.random()}`,
  operation: 'persist-synthetic-project',
  entity: { entityType: 'PROJECT', payload: { name: 'Synthetic Public Project Alpha', synthetic: true } },
  provenance: { kind: 'SYNTHETIC_FIXTURE', method: 'tests/fixtures/synthetic-project.json', recordedAt: '2026-09-05T00:00:00Z', source: { synthetic: true } },
  states: [{ state: 'PROPOSED', validFrom: '2026-01-01T00:00:00Z', observedAt: '2026-01-02T00:00:00Z' }],
  outboxEventType: 'PROJECT_PERSISTED',
  ...overrides
});

before(async () => {
  if (!connectionString) return;
  store = new PersistenceStore({ connectionString });
  await store.migrate();
});

beforeEach(async () => {
  if (!store) return;
  await store.query('TRUNCATE relationship_evidence, relationship_assertion, government_event, financial_state, state_version, evidence, source_identifier, idempotency_record, outbox_record, provenance_record, domain_entity, source_system_registry CASCADE');
});

after(async () => { if (store) await store.close(); });

integration('persists a synthetic entity, source identifier, provenance, state history, and outbox', async () => {
  const result = await store.mutate(baseMutation({ idempotencyKey: 'round-trip' }));
  const [entity] = await store.query('SELECT id, entity_type, payload, record_version FROM domain_entity WHERE id = $1', [result.entityId]);
  const [state] = await store.query('SELECT state, valid_from, observed_at FROM state_version WHERE entity_id = $1', [result.entityId]);
  const [outbox] = await store.query('SELECT event_type, aggregate_id FROM outbox_record WHERE id = $1', [result.outboxId]);
  await store.addSourceIdentifier({ entityId: result.entityId, sourceSystem: 'synthetic-fixture', sourceRecordId: 'SYN-PROJ-001' });
  const [source] = await store.query('SELECT source_system, source_record_id FROM source_identifier WHERE entity_id = $1', [result.entityId]);
  assert.equal(entity.entity_type, 'PROJECT');
  assert.equal(entity.payload.synthetic, true);
  assert.equal(state.state, 'PROPOSED');
  assert.equal(outbox.aggregate_id, result.entityId);
  assert.deepEqual(source, { source_system: 'synthetic-fixture', source_record_id: 'SYN-PROJ-001' });
  assert.notEqual(result.entityId, source.source_record_id);
});

integration('preserves provenance, relationship evidence, and uncertainty states', async () => {
  const first = await store.mutate(baseMutation({ idempotencyKey: 'relationship-from', entity: { entityType: 'CONTRACTOR', payload: { legalName: 'Synthetic Contractor' } } }));
  const second = await store.mutate(baseMutation({ idempotencyKey: 'relationship-to', entity: { entityType: 'CONTRACT', payload: { contractValue: { amount: 100, currency: 'PHP' } } } }));
  const provenance = await store.query('SELECT id FROM provenance_record LIMIT 1');
  const evidence = await store.query('INSERT INTO evidence (entity_id, evidence_type, source, captured_at, assertion_kind, confidence, availability_status, provenance_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id', [first.entityId, 'SOURCE_DOCUMENT', { sourceRecordId: 'EVID-1' }, '2026-09-05T00:00:00Z', 'OBSERVATION', 'HIGH', 'UNAVAILABLE', provenance[0].id]);
  const relationship = await store.mutate(baseMutation({ idempotencyKey: 'relationship', entity: { entityType: 'GOVERNMENT_EVENT', payload: { status: 'UNAVAILABLE' } }, relationship: { relationshipType: 'AWARDS', fromId: first.entityId, toId: second.entityId, assertionKind: 'CLAIM', basis: ['COMMON_ATTRIBUTE'], confidence: 'LOW', status: 'UNRESOLVED', validFrom: '2026-01-01T00:00:00Z', evidenceIds: [evidence[0].id], provenanceId: provenance[0].id } }));
  const [link] = await store.query('SELECT r.status, r.basis, e.availability_status FROM relationship_assertion r JOIN relationship_evidence re ON re.relationship_id = r.id JOIN evidence e ON e.id = re.evidence_id WHERE r.id = (SELECT id FROM relationship_assertion ORDER BY id DESC LIMIT 1)');
  assert.equal(link.status, 'UNRESOLVED');
  assert.deepEqual(link.basis, ['COMMON_ATTRIBUTE']);
  assert.equal(link.availability_status, 'UNAVAILABLE');
  assert.ok(relationship.outboxId);
});

integration('keeps obligation, disbursement, and settlement separate', async () => {
  const result = await store.mutate(baseMutation({ idempotencyKey: 'financial', entity: { entityType: 'PAYMENT', payload: { synthetic: true } }, financialStates: [
    { financialState: 'OBLIGATION', amount: 100, currency: 'PHP', settlementStatus: 'NOT_APPLICABLE', validFrom: '2026-01-01T00:00:00Z', observedAt: '2026-01-02T00:00:00Z' },
    { financialState: 'DISBURSEMENT', amount: 100, currency: 'PHP', settlementStatus: 'INSTRUCTION_RECORDED', validFrom: '2026-02-01T00:00:00Z', observedAt: '2026-02-02T00:00:00Z' }
  ] }));
  const rows = await store.query('SELECT financial_state, settlement_status FROM financial_state WHERE entity_id = $1 ORDER BY financial_state', [result.entityId]);
  assert.deepEqual(rows, [{ financial_state: 'DISBURSEMENT', settlement_status: 'INSTRUCTION_RECORDED' }, { financial_state: 'OBLIGATION', settlement_status: 'NOT_APPLICABLE' }]);
  assert.equal((await store.query("SELECT count(*) AS count FROM financial_state WHERE entity_id = $1 AND financial_state = 'SETTLEMENT'", [result.entityId]))[0].count, '0');
});

integration('replays idempotently and rejects conflicting reuse', async () => {
  const input = baseMutation({ idempotencyKey: 'same-key' });
  const first = await store.mutate(input);
  const replay = await store.mutate(input);
  assert.equal(replay.replayed, true);
  assert.equal(replay.entityId, first.entityId);
  assert.equal((await store.query('SELECT count(*) AS count FROM domain_entity'))[0].count, '1');
  await assert.rejects(() => store.mutate({ ...input, entity: { entityType: 'PROJECT', payload: { changed: true } } }), IdempotencyConflictError);
  assert.equal((await store.query('SELECT count(*) AS count FROM outbox_record'))[0].count, '1');
});

integration('rejects stale optimistic writes', async () => {
  const result = await store.mutate(baseMutation({ idempotencyKey: 'concurrency' }));
  assert.equal(await store.updateEntity(result.entityId, 1, { changed: true }), 2);
  await assert.rejects(() => store.updateEntity(result.entityId, 1, { changed: 'stale' }), OptimisticConcurrencyError);
});

integration('rolls back entity, provenance, evidence, and outbox together', async () => {
  await assert.rejects(() => store.mutate(baseMutation({ idempotencyKey: 'rollback', failAfter: 'evidence', evidence: [{ evidenceType: 'SOURCE', source: {}, capturedAt: '2026-09-05T00:00:00Z', assertionKind: 'OBSERVATION', confidence: 'HIGH' }] })));
  for (const table of ['domain_entity', 'provenance_record', 'evidence', 'outbox_record', 'idempotency_record']) assert.equal((await store.query(`SELECT count(*) AS count FROM ${table}`))[0].count, '0');
});