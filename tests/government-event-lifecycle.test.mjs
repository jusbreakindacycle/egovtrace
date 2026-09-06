import test, { before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { canonicalizeGovernmentEvent } from '../packages/domain/dist/government-event-lifecycle.js';
import { PersistenceStore } from '../packages/database/dist/index.js';
import { ingestGovernmentEvent } from '../packages/database/dist/government-event-lifecycle.js';

const connectionString = process.env.DATABASE_URL;
const integration = connectionString ? test : test.skip;
let store;
let objectEntityId;

before(async () => {
  if (!connectionString) return;
  store = new PersistenceStore({ connectionString });
  await store.migrate();
});

beforeEach(async () => {
  if (!store) return;
  await store.query('TRUNCATE relationship_evidence, relationship_assertion, government_event, financial_state, state_version, evidence, source_identifier, idempotency_record, outbox_record, provenance_record, domain_entity, source_system_registry CASCADE');
  const result = await store.mutate({
    idempotencyKey: `synthetic-object-${Date.now()}`,
    operation: 'create-test-object',
    entity: { entityType: 'PROJECT', payload: { name: 'T004 Synthetic Project', synthetic: true } },
    provenance: { kind: 'SYNTHETIC_FIXTURE', method: 'tests/government-event-lifecycle.test.mjs', recordedAt: '2026-09-06T00:00:00Z', source: { synthetic: true } },
    outboxEventType: 'PROJECT_PERSISTED'
  });
  objectEntityId = result.entityId;
});

after(async () => { if (store) await store.close(); });

test('canonicalization enforces event assertion and payment semantics', () => {
  const candidate = {
    eventType: 'PAYMENT_SETTLED',
    occurredAt: '2026-09-05T10:00:00Z',
    observationAt: '2026-09-06T00:00:00Z',
    sourceRecordedAt: '2026-09-05T10:00:00Z',
    assertionKind: 'OBSERVATION',
    confidence: 'HIGH',
    objectEntityId: 'synthetic-object',
    financialState: 'SETTLEMENT',
    source: { sourceSystem: 'synthetic', sourceRecordId: 'PAY-001', retrievedAt: '2026-09-06T00:00:00Z' }
  };
  assert.equal(canonicalizeGovernmentEvent(candidate).eventType, 'PAYMENT_SETTLED');
  assert.throws(() => canonicalizeGovernmentEvent({ ...candidate, financialState: 'DISBURSEMENT' }), /financialState must be SETTLEMENT/);
  assert.throws(() => canonicalizeGovernmentEvent({ ...candidate, assertionKind: 'CLAIM', source: { ...candidate.source, observationOutcome: 'UNAVAILABLE' } }), /cannot create GovernmentEvent/);
});

integration('persists a GovernmentEvent with provenance and internal outbox message', async () => {
  const result = await ingestGovernmentEvent(store, {
    eventType: 'PROJECT_CREATED',
    occurredAt: '2026-09-05T08:00:00Z',
    observationAt: '2026-09-06T00:00:00Z',
    sourceRecordedAt: '2026-09-05T08:05:00Z',
    assertionKind: 'OBSERVATION',
    confidence: 'HIGH',
    objectEntityId,
    source: { sourceSystem: 'synthetic-source', sourceRecordId: 'EV-001', sourceRecordType: 'PROJECT_RECORD', retrievedAt: '2026-09-06T00:00:00Z' }
  });
  const [event] = await store.query('SELECT event_type, assertion_kind, confidence, observation_at, source_identity_key, source_revision, event_version FROM government_event WHERE id = $1', [result.eventId]);
  const [provenance] = await store.query('SELECT kind, method FROM provenance_record WHERE id = (SELECT provenance_id FROM government_event WHERE id = $1)', [result.eventId]);
  const [outbox] = await store.query('SELECT event_type, aggregate_type, aggregate_id, payload FROM outbox_record WHERE id = $1', [result.outboxId]);
  assert.equal(event.event_type, 'PROJECT_CREATED');
  assert.equal(event.assertion_kind, 'OBSERVATION');
  assert.equal(event.event_version, 1);
  assert.equal(provenance.kind, 'SOURCE_OBSERVATION');
  assert.equal(outbox.event_type, 'event.created');
  assert.equal(outbox.aggregate_type, 'GOVERNMENT_EVENT');
  assert.equal(outbox.payload.eventId, result.eventId);
});

integration('replaying the same source observation is idempotent', async () => {
  const candidate = {
    eventType: 'PROJECT_CREATED',
    occurredAt: '2026-09-05T08:00:00Z',
    observationAt: '2026-09-06T00:00:00Z',
    assertionKind: 'OBSERVATION',
    confidence: 'HIGH',
    objectEntityId,
    source: { sourceSystem: 'synthetic-source', sourceRecordId: 'EV-002', retrievedAt: '2026-09-06T00:00:00Z' }
  };
  const first = await ingestGovernmentEvent(store, candidate);
  const replay = await ingestGovernmentEvent(store, candidate);
  assert.equal(replay.replayed, true);
  assert.equal(replay.eventId, first.eventId);
  assert.equal((await store.query('SELECT count(*) AS count FROM government_event'))[0].count, '1');
  assert.equal((await store.query('SELECT count(*) AS count FROM outbox_record WHERE event_type = \'event.created\''))[0].count, '1');
});

integration('a new source revision creates a new event version with lineage', async () => {
  const base = {
    eventType: 'PROJECT_CREATED',
    occurredAt: '2026-09-05T08:00:00Z',
    observationAt: '2026-09-06T00:00:00Z',
    assertionKind: 'OBSERVATION',
    confidence: 'HIGH',
    objectEntityId,
    source: { sourceSystem: 'synthetic-source', sourceRecordId: 'EV-003', retrievedAt: '2026-09-06T00:00:00Z' }
  };
  const first = await ingestGovernmentEvent(store, { ...base, source: { ...base.source, sourceRevision: '1' } });
  const second = await ingestGovernmentEvent(store, { ...base, source: { ...base.source, sourceRevision: '2' } });
  assert.equal(second.replayed, false);
  assert.equal(second.eventVersion, 2);
  assert.equal(second.supersededEventId, first.eventId);
  const rows = await store.query('SELECT event_version, supersedes_event_id, source_revision FROM government_event WHERE source_identity_key = (SELECT source_identity_key FROM government_event WHERE id = $1) ORDER BY event_version', [second.eventId]);
  assert.deepEqual(rows, [
    { event_version: 1, supersedes_event_id: null, source_revision: '1' },
    { event_version: 2, supersedes_event_id: first.eventId, source_revision: '2' }
  ]);
});

integration('unavailable and no-result observation conditions do not create events', async () => {
  const base = {
    eventType: 'PROJECT_CREATED',
    occurredAt: '2026-09-05T08:00:00Z',
    observationAt: '2026-09-06T00:00:00Z',
    assertionKind: 'OBSERVATION',
    confidence: 'UNKNOWN',
    objectEntityId,
    source: { sourceSystem: 'synthetic-source', sourceRecordId: 'EV-004', retrievedAt: '2026-09-06T00:00:00Z' }
  };
  await assert.rejects(() => ingestGovernmentEvent(store, { ...base, source: { ...base.source, observationOutcome: 'UNAVAILABLE' } }), /UNAVAILABLE/);
  await assert.rejects(() => ingestGovernmentEvent(store, { ...base, source: { ...base.source, sourceRecordId: 'EV-005', observationOutcome: 'NOT_OBSERVED' } }), /NOT_OBSERVED/);
  assert.equal((await store.query('SELECT count(*) AS count FROM government_event'))[0].count, '0');
});

integration('date-only precision is preserved without fabricated time', async () => {
  const result = await ingestGovernmentEvent(store, {
    eventType: 'IMPLEMENTATION_REPORTED',
    occurredAt: '2026-09-05',
    temporalPrecision: 'DATE',
    observationAt: '2026-09-06T00:00:00Z',
    assertionKind: 'CLAIM',
    confidence: 'LOW',
    objectEntityId,
    source: { sourceSystem: 'synthetic-source', sourceLocator: 'https://example.test/report/006', retrievedAt: '2026-09-06T00:00:00Z' }
  });
  const [row] = await store.query('SELECT occurred_at::text AS occurred_at, temporal_precision FROM government_event WHERE id = $1', [result.eventId]);
  assert.ok(row.occurred_at.startsWith('2026-09-05'));
  assert.equal(row.temporal_precision, 'DATE');
  await assert.rejects(() => ingestGovernmentEvent(store, {
    eventType: 'IMPLEMENTATION_REPORTED',
    occurredAt: '2026-09-05T00:00:00Z',
    temporalPrecision: 'DATE',
    observationAt: '2026-09-06T00:00:00Z',
    assertionKind: 'CLAIM',
    confidence: 'LOW',
    objectEntityId,
    source: { sourceSystem: 'synthetic-source', sourceLocator: 'https://example.test/report/007', retrievedAt: '2026-09-06T00:00:00Z' }
  }), /DATE precision/);
});
