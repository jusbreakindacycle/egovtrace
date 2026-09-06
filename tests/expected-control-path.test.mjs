import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateExpectedControlPath,
  assertValidStatusTransition,
  assertPathMayBeMutated,
  normalizeExpectedControlPath,
} from '../packages/domain/dist/expected-control-path.js';

const baseProvenance = (id = '11111111-1111-4111-8111-111111111111') => ({
  provenanceId: id,
  kind: 'SYNTHETIC_FIXTURE',
  parentProvenanceIds: [],
  recordedAt: '2026-09-06T00:00:00Z',
  method: 'test-fixture',
});

const makePath = (overrides = {}) => ({
  id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  controlPathKey: 'SYNTHETIC_PROJECT_LIFECYCLE',
  version: 1,
  status: 'DRAFT',
  classification: 'SYNTHETIC',
  validity: { validFrom: '2026-01-01T00:00:00Z', validTo: '2026-12-31T23:59:59Z' },
  scope: {},
  applicability: { conditions: [] },
  provenance: [baseProvenance()],
  metadata: { synthetic: true },
  steps: [
    {
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
      provenance: [baseProvenance()],
    },
    {
      id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      key: 'BUDGET',
      sequence: 1,
      description: 'Budget approval',
      type: 'BUDGET',
      requiredness: 'REQUIRED',
      dependencies: [{ stepKey: 'PROJECT', kind: 'REQUIRED_PREDECESSOR' }],
      expectedEventTypes: ['BUDGET_APPROVED'],
      evidenceExpectations: [],
      responsibility: { roles: ['Budget Office'] },
      completionModes: ['EVENT_OBSERVED'],
      provenance: [baseProvenance()],
    },
  ],
  ...overrides,
});

test('valid ExpectedControlPath passes deterministic validation', () => {
  assert.doesNotThrow(() => validateExpectedControlPath(makePath()));
});

test('conditional steps require explicit applicability', () => {
  const path = makePath({ steps: [makePath().steps[0] && { ...makePath().steps[0], requiredness: 'CONDITIONAL' }] });
  assert.throws(() => validateExpectedControlPath(path), /CONDITIONAL requires applicability/);
});

test('EVENT_OBSERVED requires an expected event type', () => {
  const path = makePath({ steps: [{ ...makePath().steps[0], expectedEventTypes: [] }] });
  assert.throws(() => validateExpectedControlPath(path), /EVENT_OBSERVED requires expectedEventTypes/);
});

test('dependency cycles are rejected', () => {
  const path = makePath({ steps: [
    { ...makePath().steps[0], dependencies: [{ stepKey: 'B', kind: 'REQUIRED_PREDECESSOR' }] },
    { ...makePath().steps[1], key: 'B', dependencies: [{ stepKey: 'PROJECT', kind: 'REQUIRED_PREDECESSOR' }] },
  ] });
  assert.throws(() => validateExpectedControlPath(path), /dependency cycle detected/);
});

test('unsupported GovernmentEventType values are rejected', () => {
  const path = makePath({ steps: [{ ...makePath().steps[0], expectedEventTypes: ['FAKE_EVENT'] }] });
  assert.throws(() => validateExpectedControlPath(path), /unsupported GovernmentEventType/);
});

test('status transitions are strictly ordered', () => {
  assert.doesNotThrow(() => assertValidStatusTransition('DRAFT', 'REVIEW'));
  assert.doesNotThrow(() => assertValidStatusTransition('APPROVED', 'ACTIVE'));
  assert.throws(() => assertValidStatusTransition('DRAFT', 'ACTIVE'), /not allowed/);
});

test('approved and active paths are immutable', () => {
  assert.throws(() => assertPathMayBeMutated('APPROVED'), /immutable/);
  assert.throws(() => assertPathMayBeMutated('ACTIVE'), /immutable/);
  assert.doesNotThrow(() => assertPathMayBeMutated('DRAFT'));
});

test('normalization trims non-semantic presentation strings without accepting invalid duplicates', () => {
  const path = makePath({ controlPathKey: '  SYNTHETIC_PROJECT_LIFECYCLE  ', steps: [{ ...makePath().steps[0], key: ' PROJECT ', description: ' Project initiation ', responsibility: { roles: [' Program Office '] } }] });
  const normalized = normalizeExpectedControlPath(path);
  assert.equal(normalized.controlPathKey, 'SYNTHETIC_PROJECT_LIFECYCLE');
  assert.equal(normalized.steps[0].key, 'PROJECT');
  assert.equal(normalized.steps[0].description, 'Project initiation');
  assert.equal(normalized.steps[0].responsibility.roles[0], 'Program Office');
});
