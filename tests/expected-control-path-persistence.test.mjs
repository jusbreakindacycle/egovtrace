import test, { before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { PersistenceStore } from '../packages/database/dist/index.js';
import {
  ExpectedControlPathRepository,
  ExpectedControlPathConcurrencyError,
  ExpectedControlPathIdempotencyConflictError,
} from '../packages/database/dist/expected-control-path.js';

const connectionString = process.env.DATABASE_URL;
const integration = connectionString ? test : test.skip;
let store;
let repo;

const makePath = (id, provenanceId, overrides = {}) => ({
  id,
  controlPathKey: 'SYNTHETIC_PROJECT_LIFECYCLE',
  version: 1,
  status: 'DRAFT',
  classification: 'SYNTHETIC',
  validity: { validFrom: '2026-01-01T00:00:00Z', validTo: '2026-12-31T23:59:59Z' },
  scope: {},
  applicability: { conditions: [] },
  provenance: [{ provenanceId, kind: 'SYNTHETIC_FIXTURE', parentProvenanceIds: [], recordedAt: '2026-09-06T00:00:00Z', method: 'test-fixture' }],
  metadata: { synthetic: true },
  steps: [{
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    key: 'PROJECT',
    sequence: 0,
    description: 'Project initiation',
    type: 'AUTHORIZATION',
    requiredness: 'REQUIRED',
    dependencies: [],
    expectedEventTypes: ['PROJECT_CREATED'],
    evidenceExpectations: [],
    responsibility: { roles: ['Program Office'] },
    completionModes: ['EVENT_OBSERVED'],
    provenance: [{ provenanceId, kind: 'SYNTHETIC_FIXTURE', parentProvenanceIds: [], recordedAt: '2026-09-06T00:00:00Z', method: 'test-fixture' }],
  }],
  ...overrides,
});

before(async () => {
  if (!connectionString) return;
  store = new PersistenceStore({ connectionString });
  await store.migrate();
  repo = new ExpectedControlPathRepository(store);
});

beforeEach(async () => {
  if (!store) return;
  await store.query('TRUNCATE expected_control_path_idempotency, expected_control_step_provenance, expected_control_path_provenance, expected_control_step_evidence_expectation, expected_control_step_event_type, expected_control_step_dependency, expected_control_step, expected_control_path CASCADE');
  const provenance = await store.createProvenance({ kind: 'SYNTHETIC_FIXTURE', method: 'tests/expected-control-path-persistence.test.mjs', recordedAt: '2026-09-06T00:00:00Z', source: { synthetic: true } });
  globalThis.testProvenanceId = provenance;
});

after(async () => { if (store) await store.close(); });

integration('round-trips an ExpectedControlPath with steps and provenance', async () => {
  const path = makePath('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', globalThis.testProvenanceId);
  const created = await repo.create(path, 'ecp-create-1');
  const loaded = await repo.get(created.pathId);
  assert.equal(loaded?.controlPathKey, path.controlPathKey);
  assert.equal(loaded?.steps[0].expectedEventTypes[0], 'PROJECT_CREATED');
  assert.equal(loaded?.provenance[0].kind, 'SYNTHETIC_FIXTURE');
  assert.equal(loaded?.steps[0].provenance[0].method, 'tests/expected-control-path-persistence.test.mjs');
});

integration('replays idempotently and rejects conflicting reuse', async () => {
  const path = makePath('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', globalThis.testProvenanceId);
  const first = await repo.create(path, 'ecp-idem');
  const replay = await repo.create(path, 'ecp-idem');
  assert.equal(replay.replayed, true);
  assert.equal(replay.pathId, first.pathId);
  await assert.rejects(() => repo.create(makePath('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', globalThis.testProvenanceId, { metadata: { changed: true } }), 'ecp-idem'), ExpectedControlPathIdempotencyConflictError);
  assert.equal((await store.query('SELECT count(*) AS count FROM expected_control_path'))[0].count, '1');
});

integration('enforces status transitions and optimistic concurrency', async () => {
  const path = makePath('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', globalThis.testProvenanceId);
  const created = await repo.create(path, 'ecp-status');
  const afterReview = await repo.transitionStatus(created.pathId, 'REVIEW', 1);
  assert.equal(afterReview, 2);
  const afterApproval = await repo.transitionStatus(created.pathId, 'APPROVED', 2);
  assert.equal(afterApproval, 3);
  await assert.rejects(() => repo.transitionStatus(created.pathId, 'ACTIVE', 1), ExpectedControlPathConcurrencyError);
});

integration('prevents mutation of approved paths', async () => {
  const path = makePath('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', globalThis.testProvenanceId);
  const created = await repo.create(path, 'ecp-immutable');
  const approvedVersion = await repo.transitionStatus(created.pathId, 'REVIEW', 1).then((version) => repo.transitionStatus(created.pathId, 'APPROVED', version));
  const approved = await repo.get(created.pathId);
  await assert.rejects(() => repo.updateDraft({ ...approved, status: 'APPROVED' }, approvedVersion), /immutable/);
});
