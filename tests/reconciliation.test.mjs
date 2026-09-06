import assert from 'node:assert/strict';
import test from 'node:test';
import {
  reconcile,
  statusImpliesObserved,
  isPotentiallyCompleted,
} from '../packages/domain/dist/index.js';

const id = (value) => value;
const projectId = id('project-001');
const eventId = (value) => id(value);
const evidenceId = (value) => id(value);

const provenance = {
  provenanceId: evidenceId('prov-001'),
  kind: 'SYNTHETIC_FIXTURE',
  parentProvenanceIds: [],
  recordedAt: '2026-01-01T00:00:00Z',
  method: 'fixture',
};

function step(overrides = {}) {
  return {
    id: id(`step-${overrides.key ?? 'budget'}`),
    key: overrides.key ?? 'budget',
    sequence: overrides.sequence ?? 0,
    description: overrides.description ?? 'Budget approval',
    type: overrides.type ?? 'BUDGET',
    requiredness: overrides.requiredness ?? 'REQUIRED',
    dependencies: overrides.dependencies ?? [],
    expectedEventTypes: overrides.expectedEventTypes ?? ['BUDGET_APPROVED'],
    evidenceExpectations: overrides.evidenceExpectations ?? [],
    responsibility: overrides.responsibility ?? {},
    timing: overrides.timing,
    independence: overrides.independence,
    applicability: overrides.applicability,
    alternativeGroup: overrides.alternativeGroup,
    completionModes: overrides.completionModes ?? ['EVENT_OBSERVED'],
    provenance: [provenance],
  };
}

function path(overrides = {}) {
  return {
    id: id('path-001'),
    controlPathKey: 'PROJECT_STANDARD',
    version: 1,
    status: 'ACTIVE',
    scope: {},
    classification: 'SYNTHETIC',
    validity: { validFrom: '2026-01-01T00:00:00Z' },
    applicability: { conditions: [] },
    steps: overrides.steps ?? [step()],
    provenance: [provenance],
    metadata: {},
  };
}

function event(overrides = {}) {
  return {
    id: eventId(overrides.id ?? 'event-001'),
    entityType: 'GOVERNMENT_EVENT',
    sourceIdentifiers: overrides.sourceIdentifiers ?? [{ sourceSystem: 'FIXTURE', sourceRecordId: overrides.sourceRecordId ?? 'record-001' }],
    provenance: [provenance],
    eventType: overrides.eventType ?? 'BUDGET_APPROVED',
    occurredAt: overrides.occurredAt ?? '2026-02-01T00:00:00Z',
    recordedAt: overrides.recordedAt ?? '2026-02-01T01:00:00Z',
    object: overrides.object ?? { entityType: 'PROJECT', id: projectId },
    projectId: overrides.projectId ?? projectId,
    relatedEventIds: [],
    evidenceIds: [],
    sourceReferences: overrides.sourceReferences ?? [{ sourceSystem: 'FIXTURE', sourceRecordId: overrides.sourceRecordId ?? 'record-001', retrievedAt: '2026-02-01T01:00:00Z', accessClassification: 'SYNTHETIC' }],
    classification: overrides.classification ?? 'SYNTHETIC',
    status: overrides.status ?? 'OBSERVED',
    assertionKind: overrides.assertionKind ?? 'OBSERVATION',
    confidence: overrides.confidence ?? 'HIGH',
  };
}

function run(overrides = {}) {
  return {
    id: id('run-001'),
    controlPathId: id('path-001'),
    observationScope: overrides.observationScope ?? {},
    stepInputs: overrides.stepInputs ?? [{ stepKey: 'budget', applicability: 'APPLICABLE' }],
    algorithmVersion: overrides.algorithmVersion ?? 't007.1-v1',
    executedAt: overrides.executedAt ?? '2026-02-02T00:00:00Z',
  };
}

test('matches an explicitly related event deterministically', () => {
  const result = reconcile({
    path: path(),
    expectedSubject: { entityType: 'PROJECT', id: projectId },
    events: [event()],
    run: run(),
  });

  assert.equal(result.controlPathVersion, 1);
  assert.equal(result.stepResults[0].status, 'MATCHED');
  assert.equal(result.stepResults[0].selectedEventId, 'event-001');
  assert.equal(statusImpliesObserved('MATCHED'), true);
});

test('does not choose an event when subject identity conflicts', () => {
  const result = reconcile({
    path: path(),
    expectedSubject: { entityType: 'PROJECT', id: 'different-project' },
    events: [event()],
    run: run(),
  });

  assert.equal(result.stepResults[0].status, 'INSUFFICIENT_INFORMATION');
  assert.equal(result.stepResults[0].selectedEventId, undefined);
});

test('returns multiple matches instead of arbitrarily selecting one', () => {
  const result = reconcile({
    path: path(),
    expectedSubject: { entityType: 'PROJECT', id: projectId },
    events: [event({ id: 'event-001', sourceRecordId: 'record-001' }), event({ id: 'event-002', sourceRecordId: 'record-002' })],
    run: run(),
  });

  assert.equal(result.stepResults[0].status, 'MULTIPLE_MATCHES');
  assert.deepEqual(result.stepResults[0].candidateEventIds, ['event-001', 'event-002']);
  assert.equal(result.stepResults[0].selectedEventId, undefined);
  assert.equal(isPotentiallyCompleted('MULTIPLE_MATCHES'), true);
});

test('preserves NOT_OBSERVED when the expected event type is absent', () => {
  const result = reconcile({
    path: path(),
    expectedSubject: { entityType: 'PROJECT', id: projectId },
    events: [event({ eventType: 'PROJECT_CREATED', id: 'event-project' })],
    run: run(),
  });

  assert.equal(result.stepResults[0].status, 'NOT_OBSERVED');
  assert.equal(statusImpliesObserved('NOT_OBSERVED'), false);
});

test('does not turn path validity mismatch into an observed match', () => {
  const expiredPath = path();
  expiredPath.validity = { validFrom: '2026-01-01T00:00:00Z', validTo: '2026-01-15T00:00:00Z' };
  const result = reconcile({
    path: expiredPath,
    expectedSubject: { entityType: 'PROJECT', id: projectId },
    events: [event({ occurredAt: '2026-02-01T00:00:00Z' })],
    run: run(),
  });

  assert.equal(result.stepResults[0].status, 'INSUFFICIENT_INFORMATION');
});

test('requires an explicit applicability input instead of evaluating normative applicability', () => {
  const result = reconcile({
    path: path(),
    expectedSubject: { entityType: 'PROJECT', id: projectId },
    events: [event()],
    run: run({ stepInputs: [{ stepKey: 'budget', applicability: 'UNKNOWN' }] }),
  });

  assert.equal(result.stepResults[0].status, 'INSUFFICIENT_INFORMATION');
});

test('supports explicit inapplicability without claiming the event is absent', () => {
  const result = reconcile({
    path: path(),
    expectedSubject: { entityType: 'PROJECT', id: projectId },
    events: [event()],
    run: run({ stepInputs: [{ stepKey: 'budget', applicability: 'INAPPLICABLE' }] }),
  });

  assert.equal(result.stepResults[0].status, 'INAPPLICABLE');
});

test('flags contradictory source identity records as conflicting observations', () => {
  const result = reconcile({
    path: path(),
    expectedSubject: { entityType: 'PROJECT', id: projectId },
    events: [
      event({ id: 'event-001', sourceRecordId: 'same-record', eventType: 'BUDGET_APPROVED' }),
      event({ id: 'event-002', sourceRecordId: 'same-record', eventType: 'PROJECT_CREATED' }),
    ],
    run: run(),
  });

  assert.equal(result.stepResults[0].status, 'CONFLICTING_OBSERVATIONS');
});

test('an event with no explicit source identifier remains eligible by subject and type', () => {
  const sourceLess = event({ sourceIdentifiers: [], sourceReferences: [] });
  const result = reconcile({
    path: path(),
    expectedSubject: { entityType: 'PROJECT', id: projectId },
    events: [sourceLess],
    run: run(),
  });

  assert.equal(result.stepResults[0].status, 'MATCHED');
});
