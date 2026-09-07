import assert from 'node:assert/strict';
import test from 'node:test';
import {
  assertDetectionSignalTransition,
  assertNoSemanticAbsenceConversion,
  assertNonCorruptionConclusion,
  buildDetectionSignal,
  canConstructDetectionSignal,
  canonicalizeDetectionEvaluation,
  canTransitionDetectionSignal,
  DetectionEvaluationValidationError,
  DetectionReferenceValidationError,
  DetectionRuleValidationError,
  DetectionSignalValidationError,
  DetectionTemporalValidationError,
  logicalDetectionSignalIdentity,
  validateDetectionEvaluationContext,
  validateDetectionRule,
  validateDetectionSignal,
} from '../packages/domain/dist/index.js';

const id = (value) => value;
const provenance = {
  provenanceId: id('evidence-prov-001'),
  kind: 'DERIVATION',
  parentProvenanceIds: [],
  recordedAt: '2026-02-01T00:00:00Z',
  method: 'deterministic-rule',
};

const rule = (overrides = {}) => ({
  id: overrides.id ?? 'MISSING_VERIFICATION',
  version: overrides.version ?? 1,
  name: overrides.name ?? 'Missing verification',
  description: overrides.description ?? 'Detects an expected verification condition not observed in governed inputs.',
  enabled: overrides.enabled ?? true,
  validFrom: overrides.validFrom ?? '2026-01-01T00:00:00Z',
  validTo: overrides.validTo,
  evaluate: overrides.evaluate ?? (() => evaluation()),
});

const evaluation = (overrides = {}) => ({
  triggered: overrides.triggered ?? true,
  signalType: overrides.signalType ?? 'MISSING_VERIFICATION',
  reasonCodes: overrides.reasonCodes ?? ['VERIFICATION_NOT_OBSERVED'],
  summary: overrides.summary ?? 'Expected verification record was not observed within the governed observation scope.',
  severity: overrides.severity ?? 'HIGH',
  priority: overrides.priority ?? 'HIGH',
  confidence: overrides.confidence ?? 'HIGH',
  reconciliationRunIds: overrides.reconciliationRunIds ?? [id('run-002'), id('run-001')],
  governmentEventIds: overrides.governmentEventIds ?? [id('event-002'), id('event-001')],
  evidenceIds: overrides.evidenceIds ?? [id('evidence-002'), id('evidence-001')],
  missingInformation: overrides.missingInformation ?? [{
    code: 'OBSERVATION_SOURCE_UNAVAILABLE',
    description: 'Verification source did not respond.',
    requiredFor: 'Verification completeness',
    sourceSystem: 'FIXTURE',
    retryable: true,
  }],
  recommendedVerification: overrides.recommendedVerification ?? [{
    actionCode: 'REQUEST_MISSING_VERIFICATION_RECORD',
    rationale: 'Obtain the verification record from the responsible source.',
    requiredEvidenceTypes: ['VERIFICATION_RECORD', 'SIGNED_REPORT'],
  }],
});

const buildInput = (overrides = {}) => ({
  id: id(overrides.id ?? 'signal-001'),
  generatedAt: overrides.generatedAt ?? '2026-02-02T00:00:00Z',
  validFrom: overrides.validFrom ?? '2026-02-01T00:00:00Z',
  validTo: overrides.validTo,
  provenance: overrides.provenance ?? [provenance],
  status: overrides.status,
});

test('validates a versioned detection rule', () => {
  assert.doesNotThrow(() => validateDetectionRule(rule()));
  assert.throws(() => validateDetectionRule(rule({ id: ' ' })), DetectionRuleValidationError);
  assert.throws(() => validateDetectionRule(rule({ version: 0 })), DetectionRuleValidationError);
  assert.throws(() => validateDetectionRule(rule({ validFrom: '2026-03-01T00:00:00Z', validTo: '2026-02-01T00:00:00Z' })), DetectionTemporalValidationError);
});

test('canonicalizes unordered reference collections deterministically', () => {
  const canonical = canonicalizeDetectionEvaluation(evaluation());
  assert.deepEqual(canonical.reconciliationRunIds, ['run-001', 'run-002']);
  assert.deepEqual(canonical.governmentEventIds, ['event-001', 'event-002']);
  assert.deepEqual(canonical.evidenceIds, ['evidence-001', 'evidence-002']);
  assert.deepEqual(canonical.recommendedVerification[0].requiredEvidenceTypes, ['SIGNED_REPORT', 'VERIFICATION_RECORD']);
});

test('rejects duplicate supporting references instead of giving them semantic meaning', () => {
  assert.throws(() => canonicalizeDetectionEvaluation(evaluation({ evidenceIds: ['evidence-001', 'evidence-001'] })), DetectionReferenceValidationError);
});

test('does not construct a signal from a non-triggered evaluation', () => {
  const nonTriggered = evaluation({ triggered: false, summary: '' });
  assert.equal(canConstructDetectionSignal(nonTriggered), false);
  assert.equal(buildDetectionSignal(rule(), nonTriggered, buildInput()), undefined);
});

test('constructs a signal with exact rule version and preserved uncertainty', () => {
  const signal = buildDetectionSignal(rule({ version: 7 }), evaluation(), buildInput());
  assert.ok(signal);
  assert.equal(signal.ruleId, 'MISSING_VERIFICATION');
  assert.equal(signal.ruleVersion, 7);
  assert.equal(signal.missingInformation.length, 1);
  assert.equal(signal.status, 'OPEN');
  assert.deepEqual(signal.reasonCodes, ['VERIFICATION_NOT_OBSERVED']);
  assert.doesNotThrow(() => validateDetectionSignal(signal));
});

test('disabled rules remain valid historical definitions but cannot create new signals', () => {
  assert.doesNotThrow(() => validateDetectionRule(rule({ enabled: false })));
  assert.throws(() => buildDetectionSignal(rule({ enabled: false }), evaluation(), buildInput()), DetectionSignalValidationError);
});

test('rejects invalid signal validity intervals and absent provenance', () => {
  assert.throws(() => buildDetectionSignal(rule(), evaluation(), buildInput({ validFrom: '2026-03-01T00:00:00Z', validTo: '2026-02-01T00:00:00Z' })), DetectionTemporalValidationError);
  assert.throws(() => buildDetectionSignal(rule(), evaluation(), buildInput({ provenance: [] })), DetectionSignalValidationError);
});

test('keeps severity, priority, and confidence independent', () => {
  const signal = buildDetectionSignal(rule(), evaluation({ severity: 'CRITICAL', priority: 'LOW', confidence: 'UNKNOWN' }), buildInput());
  assert.equal(signal.severity, 'CRITICAL');
  assert.equal(signal.priority, 'LOW');
  assert.equal(signal.confidence, 'UNKNOWN');
});

test('rejects accusatory conclusions while allowing descriptive control conditions', () => {
  assert.doesNotThrow(() => assertNonCorruptionConclusion('Repeated bidder combination requires relationship verification.'));
  assert.throws(() => assertNonCorruptionConclusion('The contractor is corrupt.'), DetectionEvaluationValidationError);
  assert.throws(() => canonicalizeDetectionEvaluation(evaluation({ summary: 'The contractor committed fraud.' })), DetectionEvaluationValidationError);
});

test('does not permit ABSENT to stand in for missing or NOT_OBSERVED', () => {
  assert.doesNotThrow(() => assertNoSemanticAbsenceConversion('NOT_OBSERVED'));
  assert.throws(() => assertNoSemanticAbsenceConversion('ABSENT'), DetectionEvaluationValidationError);
});

test('keeps unavailable reconciliation observations distinct from observed selections', () => {
  const context = {
    now: '2026-02-02T00:00:00Z',
    ruleExecutionId: id('rule-exec-001'),
    reconciliationRuns: [{
      id: id('run-001'),
      controlPathId: id('path-001'),
      observationScope: {},
      stepInputs: [],
      algorithmVersion: 't007.1-v1',
      executedAt: '2026-02-02T00:00:00Z',
      controlPathVersion: 1,
      stepResults: [{
        stepKey: 'verification',
        status: 'UNAVAILABLE',
        candidateEventIds: [],
        selectedEventId: undefined,
        matches: [],
        reasonCodes: ['OBSERVATION_SOURCE_UNAVAILABLE'],
      }],
    }],
    governmentEvents: [],
    evidence: [],
  };
  assert.doesNotThrow(() => validateDetectionEvaluationContext(context));
  assert.throws(() => validateDetectionEvaluationContext({ ...context, reconciliationRuns: [{ ...context.reconciliationRuns[0], stepResults: [{ ...context.reconciliationRuns[0].stepResults[0], selectedEventId: id('event-001') }] }] }), DetectionEvaluationValidationError);
});

test('enforces the detection signal lifecycle without assigning factual meaning to status', () => {
  assert.equal(canTransitionDetectionSignal('OPEN', 'SUPPRESSED'), true);
  assert.equal(canTransitionDetectionSignal('RESOLVED', 'OPEN'), false);
  assert.doesNotThrow(() => assertDetectionSignalTransition('OPEN', 'EXPIRED'));
  assert.throws(() => assertDetectionSignalTransition('EXPIRED', 'OPEN'), DetectionSignalValidationError);
});

test('logical signal identity is independent of input collection order', () => {
  const first = buildDetectionSignal(rule(), evaluation(), buildInput());
  const second = buildDetectionSignal(rule(), evaluation({
    reconciliationRunIds: ['run-001', 'run-002'],
    governmentEventIds: ['event-001', 'event-002'],
    evidenceIds: ['evidence-001', 'evidence-002'],
  }), buildInput({ id: 'signal-002' }));
  assert.equal(logicalDetectionSignalIdentity(first), logicalDetectionSignalIdentity(second));
});
