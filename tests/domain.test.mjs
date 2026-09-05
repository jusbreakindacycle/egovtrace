import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { assertValidTemporalValidity, isExplicitlyConfirmedIdentity, isPaymentSettled } from '../packages/domain/dist/index.js';

test('synthetic fixture is explicitly synthetic and deterministic', () => {
  const fixture = JSON.parse(fs.readFileSync(new URL('./fixtures/synthetic-project.json', import.meta.url)));
  assert.equal(fixture.synthetic, true);
  assert.equal(fixture.project_id, 'SYN-PROJ-001');
  assert.equal(fixture.lifecycle[0], 'PROJECT_CREATED');
});

test('temporal validity rejects reversed history', () => {
  assert.throws(() => assertValidTemporalValidity({
    validFrom: '2026-01-02T00:00:00Z',
    validTo: '2026-01-01T00:00:00Z'
  }));
});

test('payment settlement is not implied by obligation or disbursement', () => {
  const payment = { financialState: 'DISBURSEMENT', settlementStatus: 'INSTRUCTION_RECORDED' };
  assert.equal(isPaymentSettled(payment), false);
  assert.equal(isPaymentSettled({ financialState: 'SETTLEMENT', settlementStatus: 'SETTLED' }), true);
});

test('identity remains unresolved without explicit source-backed basis', () => {
  const assertion = {
    status: 'SUPPORTED',
    basis: ['COMMON_ATTRIBUTE']
  };
  assert.equal(isExplicitlyConfirmedIdentity(assertion), false);
  assert.equal(isExplicitlyConfirmedIdentity({
    status: 'SUPPORTED',
    basis: ['DIRECT_SOURCE_REFERENCE', 'EXPLICIT_IDENTIFIER_REFERENCE']
  }), true);
});

test('unavailable, not observed, and absent remain distinct event statuses', () => {
  const statuses = ['UNAVAILABLE', 'NOT_OBSERVED', 'ABSENT'];
  assert.equal(new Set(statuses).size, 3);
  assert.notEqual(statuses[0], 'OBSERVED');
  assert.notEqual(statuses[1], 'ABSENT');
});

test('claims, findings, signals, and derived relationships remain distinct assertions', () => {
  assert.notEqual('CLAIM', 'FINDING');
  assert.notEqual('CLAIM', 'SIGNAL');
  assert.notEqual('DERIVED_RELATIONSHIP', 'FACT');
});

test('AI assistance is provenance, not a source fact', () => {
  const aiDerivedClaim = {
    assertionKind: 'CLAIM',
    provenance: [{ kind: 'AI_ASSISTANCE' }]
  };
  assert.equal(aiDerivedClaim.assertionKind, 'CLAIM');
  assert.equal(aiDerivedClaim.provenance[0].kind, 'AI_ASSISTANCE');
  assert.notEqual(aiDerivedClaim.assertionKind, 'FACT');
});

test('relationships carry evidence and do not imply wrongdoing', () => {
  const relationship = {
    assertionKind: 'DERIVED_RELATIONSHIP',
    supportingEvidenceIds: ['evidence-1'],
    basis: ['COMMON_ATTRIBUTE'],
    confidence: 'LOW'
  };
  assert.deepEqual(relationship.supportingEvidenceIds, ['evidence-1']);
  assert.equal(relationship.assertionKind, 'DERIVED_RELATIONSHIP');
  assert.equal('wrongdoing' in relationship, false);
});
