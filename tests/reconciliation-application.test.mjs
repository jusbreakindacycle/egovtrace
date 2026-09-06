import test from 'node:test';
import assert from 'node:assert/strict';
import { ReconciliationApplicationService } from '../packages/application/dist/index.js';

const controlPath = {
  id: '10000000-0000-4000-8000-000000000001',
  version: 1,
  name: 'Synthetic project lifecycle',
  description: 'Synthetic test path',
  steps: [{
    key: 'project-created',
    sequence: 1,
    expectedEventTypes: ['PROJECT_CREATED'],
    timing: undefined,
  }],
  validity: { validFrom: '2026-01-01T00:00:00Z' },
};

const runId = '20000000-0000-4000-8000-000000000001';

function makeService(overrides = {}) {
  const repository = {
    created: [],
    async create(result) {
      const persisted = {
        ...result.run,
        controlPathVersion: result.controlPathVersion,
        status: 'COMPLETED',
        recordVersion: 1,
        stepResults: result.stepResults,
      };
      this.created.push(persisted);
      return persisted;
    },
    async get(id) { return this.created.find((run) => run.id === id) ?? null; },
    async listByControlPath() { return [...this.created]; },
    async finalize() { return 2; },
  };
  const deps = {
    controlPaths: { async getExact() { return controlPath; } },
    observations: { async getObservations() { return { availability: 'AVAILABLE', events: [] }; } },
    repository,
    now: () => '2026-09-07T00:00:00.000Z',
    ...overrides,
  };
  return { service: new ReconciliationApplicationService(deps), repository };
}

function command(overrides = {}) {
  return {
    reconciliationRunId: runId,
    controlPathId: controlPath.id,
    controlPathVersion: 1,
    observationScope: {},
    stepInputs: [{ stepKey: 'project-created', applicability: 'APPLICABLE' }],
    algorithmVersion: 't007.1-v1',
    executedAt: '2026-09-07T00:00:00Z',
    idempotencyKey: 'recon-test-1',
    events: [],
    ...overrides,
  };
}

test('execute uses explicit empty observations without calling provider', async () => {
  let providerCalls = 0;
  const { service } = makeService({
    observations: { async getObservations() { providerCalls += 1; return { availability: 'UNAVAILABLE', reasonCode: 'should-not-run' }; } },
  });
  const result = await service.execute(command());
  assert.equal(providerCalls, 0);
  assert.equal(result.run.stepResults[0].status, 'NOT_OBSERVED');
});

test('execute preserves provider UNAVAILABLE as an application error', async () => {
  const { service } = makeService({
    observations: { async getObservations() { return { availability: 'UNAVAILABLE', reasonCode: 'SOURCE_TIMEOUT' }; } },
  });
  await assert.rejects(() => service.execute(command({ events: undefined })), (error) => {
    assert.equal(error.code, 'OBSERVATION_UNAVAILABLE');
    assert.equal(error.retryable, true);
    return true;
  });
});

test('execute resolves the exact control-path version', async () => {
  const { service } = makeService({
    controlPaths: { async getExact(id, version) { assert.equal(id, controlPath.id); assert.equal(version, 1); return controlPath; } },
  });
  const result = await service.execute(command());
  assert.equal(result.run.controlPathVersion, 1);
});

test('execute maps idempotency conflict from persistence', async () => {
  const { service } = makeService({
    repository: {
      async create() { throw new (await import('../packages/database/dist/reconciliation.js')).ReconciliationIdempotencyConflictError('conflict'); },
      async get() { return null; },
      async listByControlPath() { return []; },
      async finalize() { return 2; },
    },
  });
  await assert.rejects(() => service.execute(command()), (error) => {
    assert.equal(error.code, 'IDEMPOTENCY_CONFLICT');
    assert.equal(error.retryable, false);
    return true;
  });
});

test('finalize delegates state transition without recalculation', async () => {
  const calls = [];
  const { service } = makeService({
    repository: {
      async create() { throw new Error('not expected'); },
      async get() { return null; },
      async listByControlPath() { return []; },
      async finalize(id, version) { calls.push([id, version]); return 2; },
    },
  });
  const result = await service.finalize({ reconciliationRunId: runId, expectedRecordVersion: 1 });
  assert.deepEqual(calls, [[runId, 1]]);
  assert.deepEqual(result, { reconciliationRunId: runId, recordVersion: 2, finalized: true });
});
