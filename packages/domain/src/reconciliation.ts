import type {
  DomainId,
  GovernmentEvent,
  GovernmentEventType,
  ExpectedControlPath,
  ExpectedControlStep,
} from './index.js';

export type ReconciliationStatus =
  | 'MATCHED'
  | 'MULTIPLE_MATCHES'
  | 'NOT_OBSERVED'
  | 'UNAVAILABLE'
  | 'OUT_OF_SCOPE'
  | 'INAPPLICABLE'
  | 'INSUFFICIENT_INFORMATION'
  | 'CONFLICTING_OBSERVATIONS';

export type ReconciliationApplicability = 'APPLICABLE' | 'INAPPLICABLE' | 'UNKNOWN';

export interface ReconciliationObservationScope {
  readonly eventIds?: readonly DomainId<'GOVERNMENT_EVENT'>[];
  readonly validFrom?: string;
  readonly validTo?: string;
  readonly sourceSystems?: readonly string[];
  readonly classification?: GovernmentEvent['classification'];
}

export interface ReconciliationStepInput {
  readonly stepKey: string;
  readonly applicability: ReconciliationApplicability;
}

export interface ReconciliationRun {
  readonly id: DomainId;
  readonly controlPathId: DomainId;
  readonly observationScope: ReconciliationObservationScope;
  readonly stepInputs: readonly ReconciliationStepInput[];
  readonly algorithmVersion: string;
  readonly executedAt: string;
}

export interface ReconciliationMatchExplanation {
  readonly eventId: DomainId<'GOVERNMENT_EVENT'>;
  readonly matchedCriteria: readonly (
    | 'EVENT_TYPE'
    | 'SUBJECT_IDENTITY'
    | 'PROJECT_CONTEXT'
    | 'SOURCE_IDENTITY'
    | 'TEMPORAL_COMPATIBILITY'
  )[];
}

export interface ReconciliationStepResult {
  readonly stepKey: string;
  readonly status: ReconciliationStatus;
  readonly candidateEventIds: readonly DomainId<'GOVERNMENT_EVENT'>[];
  readonly selectedEventId?: DomainId<'GOVERNMENT_EVENT'>;
  readonly matches: readonly ReconciliationMatchExplanation[];
  readonly reasonCodes: readonly string[];
}

export interface ReconciliationResult {
  readonly run: ReconciliationRun;
  readonly controlPathVersion: number;
  readonly stepResults: readonly ReconciliationStepResult[];
}

export interface ReconciliationMatcherInput {
  readonly path: ExpectedControlPath;
  readonly expectedSubject?: { entityType: string; id: string };
  readonly events: readonly GovernmentEvent[];
  readonly run: ReconciliationRun;
}

function parseTimestamp(value: string, field: string): number {
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) throw new Error(`${field} must be an ISO-parseable timestamp`);
  return timestamp;
}

function sameReference(a: { entityType: string; id: string }, b: { entityType: string; id: string }): boolean {
  return a.entityType === b.entityType && a.id === b.id;
}

function sourceIdentity(event: GovernmentEvent): string | undefined {
  const first = event.sourceIdentifiers[0];
  return first ? `${first.sourceSystem}:${first.sourceRecordId}${first.namespace ? `:${first.namespace}` : ''}` : undefined;
}

function isWithinScope(event: GovernmentEvent, scope: ReconciliationObservationScope): boolean {
  if (scope.eventIds && !scope.eventIds.includes(event.id)) return false;
  if (scope.sourceSystems && !event.sourceReferences.some((ref) => scope.sourceSystems?.includes(ref.sourceSystem))) return false;
  if (scope.classification && event.classification !== scope.classification) return false;
  const occurred = parseTimestamp(event.occurredAt, 'GovernmentEvent.occurredAt');
  if (scope.validFrom && occurred < parseTimestamp(scope.validFrom, 'observationScope.validFrom')) return false;
  if (scope.validTo && occurred > parseTimestamp(scope.validTo, 'observationScope.validTo')) return false;
  return true;
}

function stepIsTimeCompatible(path: ExpectedControlPath, step: ExpectedControlStep, event: GovernmentEvent): boolean {
  const occurred = parseTimestamp(event.occurredAt, 'GovernmentEvent.occurredAt');
  const pathFrom = parseTimestamp(path.validity.validFrom, 'ExpectedControlPath.validity.validFrom');
  const pathTo = path.validity.validTo ? parseTimestamp(path.validity.validTo, 'ExpectedControlPath.validity.validTo') : undefined;
  if (occurred < pathFrom || (pathTo !== undefined && occurred > pathTo)) return false;
  if (!step.timing) return true;
  // T007.1 deliberately treats relative timing as a later reconciliation concern.
  // Absolute path validity is checked here; relative step timing is not invented.
  return true;
}

function detectSourceConflicts(events: readonly GovernmentEvent[]): boolean {
  const seen = new Map<string, GovernmentEvent>();
  for (const event of events) {
    for (const identifier of event.sourceIdentifiers) {
      const key = `${identifier.sourceSystem}:${identifier.sourceRecordId}:${identifier.namespace ?? ''}`;
      const prior = seen.get(key);
      if (!prior) {
        seen.set(key, event);
        continue;
      }
      if (
        prior.eventType !== event.eventType
        || prior.occurredAt !== event.occurredAt
        || !sameReference(prior.object, event.object)
      ) return true;
    }
  }
  return false;
}

function matchStep(
  path: ExpectedControlPath,
  step: ExpectedControlStep,
  expectedSubject: ReconciliationMatcherInput['expectedSubject'],
  events: readonly GovernmentEvent[],
): ReconciliationStepResult {
  const sourceScoped = events.filter((event) => isWithinScope(event, { eventIds: undefined }));
  const typed = sourceScoped.filter((event) => step.expectedEventTypes.includes(event.eventType));
  if (typed.length === 0) {
    return {
      stepKey: step.key,
      status: 'NOT_OBSERVED',
      candidateEventIds: [],
      matches: [],
      reasonCodes: ['NO_EVENT_OF_EXPECTED_TYPE_IN_SCOPE'],
    };
  }

  const candidateMatches: ReconciliationMatchExplanation[] = [];
  for (const event of typed) {
    const matchedCriteria: ReconciliationMatchExplanation['matchedCriteria'][number][] = ['EVENT_TYPE'];
    if (expectedSubject && sameReference(expectedSubject, event.object)) matchedCriteria.push('SUBJECT_IDENTITY');
    if (expectedSubject?.entityType === 'PROJECT' && event.projectId === expectedSubject.id) matchedCriteria.push('PROJECT_CONTEXT');
    if (event.sourceIdentifiers.length > 0) matchedCriteria.push('SOURCE_IDENTITY');
    if (!stepIsTimeCompatible(path, step, event)) continue;
    matchedCriteria.push('TEMPORAL_COMPATIBILITY');
    if (!expectedSubject || matchedCriteria.includes('SUBJECT_IDENTITY') || matchedCriteria.includes('PROJECT_CONTEXT')) {
      candidateMatches.push({ eventId: event.id, matchedCriteria: [...new Set(matchedCriteria)] });
    }
  }

  if (candidateMatches.length === 0) {
    return {
      stepKey: step.key,
      status: expectedSubject ? 'INSUFFICIENT_INFORMATION' : 'NOT_OBSERVED',
      candidateEventIds: [],
      matches: [],
      reasonCodes: expectedSubject ? ['NO_EXPLICIT_SUBJECT_MATCH'] : ['NO_TEMPORALLY_COMPATIBLE_EVENT'],
    };
  }

  if (candidateMatches.length > 1) {
    return {
      stepKey: step.key,
      status: 'MULTIPLE_MATCHES',
      candidateEventIds: candidateMatches.map((match) => match.eventId),
      matches: candidateMatches,
      reasonCodes: ['MULTIPLE_DETERMINISTIC_CANDIDATES'],
    };
  }

  return {
    stepKey: step.key,
    status: 'MATCHED',
    candidateEventIds: [candidateMatches[0].eventId],
    selectedEventId: candidateMatches[0].eventId,
    matches: candidateMatches,
    reasonCodes: ['EXPLICIT_MATCH_CRITERIA_SATISFIED'],
  };
}

export function reconcile(input: ReconciliationMatcherInput): ReconciliationResult {
  if (input.run.controlPathId !== input.path.id) throw new Error('ReconciliationRun.controlPathId must match ExpectedControlPath.id');
  if (!input.run.algorithmVersion.trim()) throw new Error('algorithmVersion is required');
  parseTimestamp(input.run.executedAt, 'ReconciliationRun.executedAt');

  const inScope = input.events.filter((event) => isWithinScope(event, input.run.observationScope));
  const sourceConflict = detectSourceConflicts(inScope);
  const stepInputByKey = new Map(input.run.stepInputs.map((step) => [step.stepKey, step.applicability]));

  const stepResults = input.path.steps.map((step) => {
    const applicability = stepInputByKey.get(step.key);
    if (!applicability) {
      return {
        stepKey: step.key,
        status: 'INSUFFICIENT_INFORMATION' as const,
        candidateEventIds: [],
        matches: [],
        reasonCodes: ['APPLICABILITY_DECISION_REQUIRED'],
      };
    }
    if (applicability === 'INAPPLICABLE') {
      return {
        stepKey: step.key,
        status: 'INAPPLICABLE' as const,
        candidateEventIds: [],
        matches: [],
        reasonCodes: ['CALLER_DECLARED_INAPPLICABLE'],
      };
    }
    if (applicability === 'UNKNOWN') {
      return {
        stepKey: step.key,
        status: 'INSUFFICIENT_INFORMATION' as const,
        candidateEventIds: [],
        matches: [],
        reasonCodes: ['APPLICABILITY_UNKNOWN'],
      };
    }
    if (sourceConflict) {
      return {
        stepKey: step.key,
        status: 'CONFLICTING_OBSERVATIONS' as const,
        candidateEventIds: [],
        matches: [],
        reasonCodes: ['CONFLICTING_SOURCE_IDENTITIES_IN_SCOPE'],
      };
    }
    return matchStep(input.path, step, input.expectedSubject, inScope);
  });

  return {
    run: input.run,
    controlPathVersion: input.path.version,
    stepResults,
  };
}

export function statusImpliesObserved(status: ReconciliationStatus): boolean {
  return status === 'MATCHED';
}

export function isPotentiallyCompleted(status: ReconciliationStatus): boolean {
  return status === 'MATCHED' || status === 'MULTIPLE_MATCHES';
}

export function governmentEventTypesForStep(step: ExpectedControlStep): readonly GovernmentEventType[] {
  return [...step.expectedEventTypes];
}
