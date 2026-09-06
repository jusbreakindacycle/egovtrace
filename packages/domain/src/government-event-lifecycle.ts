import type { AssertionKind, GovernmentEventType, GovernmentEventStatus, Money } from './index.js';

export type ObservationOutcome = 'OBSERVED' | 'NOT_OBSERVED' | 'UNAVAILABLE' | 'EXPLICITLY_ABSENT' | 'NOT_APPLICABLE';
export type TemporalPrecision = 'YEAR' | 'MONTH' | 'DATE' | 'DATETIME' | 'INTERVAL' | 'UNKNOWN';
export type GovernmentEventAssertionKind = Extract<AssertionKind, 'FACT' | 'OBSERVATION' | 'CLAIM'>;

export interface SourceObservationInput {
  readonly sourceSystem: string;
  readonly sourceRecordId?: string;
  readonly sourceRecordType?: string;
  readonly sourceLocator?: string;
  readonly sourceRevision?: string;
  readonly retrievedAt: string;
  readonly accessClassification?: 'PUBLIC' | 'CONTROLLED' | 'RESTRICTED' | 'SYNTHETIC';
  readonly observationOutcome?: ObservationOutcome;
}

export interface GovernmentEventCandidate {
  readonly eventType: GovernmentEventType;
  readonly occurredAt?: string;
  readonly temporalPrecision?: TemporalPrecision;
  readonly observationAt: string;
  readonly sourceRecordedAt?: string;
  readonly status?: GovernmentEventStatus;
  readonly assertionKind: GovernmentEventAssertionKind;
  readonly confidence: 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN';
  readonly objectEntityId: string;
  readonly institutionId?: string;
  readonly officeId?: string;
  readonly projectId?: string;
  readonly programId?: string;
  readonly financialState?: 'OBLIGATION' | 'DISBURSEMENT' | 'SETTLEMENT';
  readonly amount?: Money;
  readonly payload?: Record<string, unknown>;
  readonly source: SourceObservationInput;
}

const paymentStateByEventType: Record<string, string> = {
  PAYMENT_OBLIGATED: 'OBLIGATION',
  PAYMENT_DISBURSED: 'DISBURSEMENT',
  PAYMENT_SETTLED: 'SETTLEMENT'
};

export function validateGovernmentEventCandidate(candidate: GovernmentEventCandidate): void {
  const source = candidate.source;
  if (!source.sourceSystem) throw new Error('sourceSystem is required');
  if (!source.sourceRecordId && !source.sourceLocator && !source.sourceRevision) {
    throw new Error('source observation requires sourceRecordId, sourceLocator, or sourceRevision');
  }
  if (!candidate.objectEntityId) throw new Error('objectEntityId is required');
  if (!candidate.observationAt) throw new Error('observationAt is required');
  if (!['FACT', 'OBSERVATION', 'CLAIM'].includes(candidate.assertionKind)) {
    throw new Error('GovernmentEvent assertionKind must be FACT, OBSERVATION, or CLAIM');
  }
  if (candidate.eventType in paymentStateByEventType && candidate.financialState !== paymentStateByEventType[candidate.eventType]) {
    throw new Error(`financialState must be ${paymentStateByEventType[candidate.eventType]} for ${candidate.eventType}`);
  }
  if (candidate.financialState === 'SETTLEMENT' && candidate.eventType !== 'PAYMENT_SETTLED') {
    throw new Error('SETTLEMENT financial state requires PAYMENT_SETTLED');
  }
  if (candidate.status === 'ABSENT' || candidate.status === 'NOT_OBSERVED' || candidate.status === 'UNAVAILABLE') {
    throw new Error('negative observation outcomes do not create GovernmentEvent records');
  }
  if (candidate.temporalPrecision === 'DATE' && candidate.occurredAt && /T/.test(candidate.occurredAt)) {
    throw new Error('DATE precision cannot contain fabricated time-of-day precision');
  }
}

export function canonicalizeGovernmentEvent(candidate: GovernmentEventCandidate): Record<string, unknown> {
  validateGovernmentEventCandidate(candidate);
  const outcome = candidate.source.observationOutcome ?? 'OBSERVED';
  if (outcome !== 'OBSERVED') throw new Error(`cannot create GovernmentEvent from observation outcome ${outcome}`);
  return {
    eventType: candidate.eventType,
    occurredAt: candidate.occurredAt ?? null,
    temporalPrecision: candidate.temporalPrecision ?? (candidate.occurredAt ? 'DATETIME' : 'UNKNOWN'),
    observationAt: candidate.observationAt,
    sourceRecordedAt: candidate.sourceRecordedAt ?? null,
    status: candidate.status ?? 'RECORDED',
    assertionKind: candidate.assertionKind,
    confidence: candidate.confidence,
    objectEntityId: candidate.objectEntityId,
    institutionId: candidate.institutionId ?? null,
    officeId: candidate.officeId ?? null,
    projectId: candidate.projectId ?? null,
    programId: candidate.programId ?? null,
    financialState: candidate.financialState ?? null,
    amount: candidate.amount ?? null,
    payload: candidate.payload ?? {},
    source: candidate.source
  };
}
