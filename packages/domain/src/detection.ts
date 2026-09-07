import type {
  Confidence,
  DomainId,
  Evidence,
  GovernmentEvent,
  ProvenanceReference,
  ReconciliationResult,
} from './index.js';

export type DetectionSignalStatus = 'OPEN' | 'SUPPRESSED' | 'RESOLVED' | 'EXPIRED';
export type DetectionSeverity = 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type DetectionPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export interface MissingInformation {
  readonly code: string;
  readonly description: string;
  readonly requiredFor: string;
  readonly sourceSystem?: string;
  readonly retryable: boolean;
}

export interface VerificationRecommendation {
  readonly actionCode: string;
  readonly rationale: string;
  readonly requiredEvidenceTypes: readonly string[];
}

export interface DetectionRule<TInput = unknown> {
  readonly id: string;
  readonly version: number;
  readonly name: string;
  readonly description: string;
  readonly enabled: boolean;
  readonly validFrom: string;
  readonly validTo?: string;
  evaluate(input: TInput): DetectionEvaluation;
}

export interface DetectionEvaluation {
  readonly triggered: boolean;
  readonly signalType: string;
  readonly reasonCodes: readonly string[];
  readonly summary: string;
  readonly severity: DetectionSeverity;
  readonly priority: DetectionPriority;
  readonly confidence: Confidence;
  readonly reconciliationRunIds: readonly DomainId[];
  readonly governmentEventIds: readonly DomainId<'GOVERNMENT_EVENT'>[];
  readonly evidenceIds: readonly DomainId<'EVIDENCE'>[];
  readonly missingInformation: readonly MissingInformation[];
  readonly recommendedVerification: readonly VerificationRecommendation[];
}

export interface DetectionEvaluationContext {
  readonly reconciliationRuns: readonly ReconciliationResult[];
  readonly governmentEvents: readonly GovernmentEvent[];
  readonly evidence: readonly Evidence[];
  readonly now: string;
  readonly ruleExecutionId: DomainId;
}

export interface DetectionSignal {
  readonly id: DomainId;
  readonly signalType: string;
  readonly ruleId: string;
  readonly ruleVersion: number;
  readonly status: DetectionSignalStatus;
  readonly severity: DetectionSeverity;
  readonly priority: DetectionPriority;
  readonly confidence: Confidence;
  readonly summary: string;
  readonly reasonCodes: readonly string[];
  readonly reconciliationRunIds: readonly DomainId[];
  readonly governmentEventIds: readonly DomainId<'GOVERNMENT_EVENT'>[];
  readonly evidenceIds: readonly DomainId<'EVIDENCE'>[];
  readonly missingInformation: readonly MissingInformation[];
  readonly recommendedVerification: readonly VerificationRecommendation[];
  readonly generatedAt: string;
  readonly validFrom: string;
  readonly validTo?: string;
  readonly provenance: readonly ProvenanceReference[];
}

export class DetectionRuleValidationError extends Error {
  constructor(message: string) { super(message); this.name = 'DetectionRuleValidationError'; }
}
export class DetectionEvaluationValidationError extends Error {
  constructor(message: string) { super(message); this.name = 'DetectionEvaluationValidationError'; }
}
export class DetectionSignalValidationError extends Error {
  constructor(message: string) { super(message); this.name = 'DetectionSignalValidationError'; }
}
export class DetectionTemporalValidationError extends Error {
  constructor(message: string) { super(message); this.name = 'DetectionTemporalValidationError'; }
}
export class DetectionReferenceValidationError extends Error {
  constructor(message: string) { super(message); this.name = 'DetectionReferenceValidationError'; }
}

const SEVERITIES = new Set<DetectionSeverity>(['INFO', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
const PRIORITIES = new Set<DetectionPriority>(['LOW', 'NORMAL', 'HIGH', 'URGENT']);
const CONFIDENCES = new Set<Confidence>(['LOW', 'MEDIUM', 'HIGH', 'UNKNOWN']);
const SIGNAL_STATUSES = new Set<DetectionSignalStatus>(['OPEN', 'SUPPRESSED', 'RESOLVED', 'EXPIRED']);

type ValidationError = typeof DetectionRuleValidationError | typeof DetectionEvaluationValidationError | typeof DetectionSignalValidationError;
function requireNonEmpty(value: string, field: string, ErrorType: ValidationError): void {
  if (typeof value !== 'string' || value.trim().length === 0) throw new ErrorType(`${field} must be non-empty`);
}
function parseTimestamp(value: string, field: string): number {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) throw new DetectionTemporalValidationError(`${field} must be an ISO-parseable timestamp`);
  return parsed;
}
function assertOrderedInterval(validFrom: string, validTo: string | undefined, owner: 'rule' | 'signal'): void {
  const from = parseTimestamp(validFrom, `${owner}.validFrom`);
  const to = validTo === undefined ? undefined : parseTimestamp(validTo, `${owner}.validTo`);
  if (to !== undefined && to < from) throw new DetectionTemporalValidationError(`${owner}.validTo must not be earlier than ${owner}.validFrom`);
}
function canonicalizeStrings(values: readonly string[], field: string): readonly string[] {
  const normalized = values.map((value) => {
    if (typeof value !== 'string' || value.trim().length === 0) throw new DetectionReferenceValidationError(`${field} cannot contain empty values`);
    return value.trim();
  });
  return [...new Set(normalized)].sort((a, b) => a.localeCompare(b));
}
function canonicalizeMissingInformation(values: readonly MissingInformation[]): readonly MissingInformation[] {
  const canonical = values.map((value) => {
    requireNonEmpty(value.code, 'missingInformation.code', DetectionEvaluationValidationError);
    requireNonEmpty(value.description, 'missingInformation.description', DetectionEvaluationValidationError);
    requireNonEmpty(value.requiredFor, 'missingInformation.requiredFor', DetectionEvaluationValidationError);
    return { ...value, code: value.code.trim(), description: value.description.trim(), requiredFor: value.requiredFor.trim(), sourceSystem: value.sourceSystem?.trim() };
  });
  const seen = new Set<string>();
  for (const value of canonical) {
    const key = JSON.stringify([value.code, value.description, value.requiredFor, value.sourceSystem ?? null, value.retryable]);
    if (seen.has(key)) throw new DetectionEvaluationValidationError(`duplicate missing-information record: ${value.code}`);
    seen.add(key);
  }
  return canonical.sort((a, b) => `${a.code}:${a.requiredFor}:${a.sourceSystem ?? ''}`.localeCompare(`${b.code}:${b.requiredFor}:${b.sourceSystem ?? ''}`));
}
function canonicalizeRecommendations(values: readonly VerificationRecommendation[]): readonly VerificationRecommendation[] {
  const canonical = values.map((value) => {
    requireNonEmpty(value.actionCode, 'recommendedVerification.actionCode', DetectionEvaluationValidationError);
    requireNonEmpty(value.rationale, 'recommendedVerification.rationale', DetectionEvaluationValidationError);
    return { ...value, actionCode: value.actionCode.trim(), rationale: value.rationale.trim(), requiredEvidenceTypes: canonicalizeStrings(value.requiredEvidenceTypes, 'requiredEvidenceTypes') };
  });
  const seen = new Set<string>();
  for (const value of canonical) {
    const key = JSON.stringify([value.actionCode, value.rationale, value.requiredEvidenceTypes]);
    if (seen.has(key)) throw new DetectionEvaluationValidationError(`duplicate verification recommendation: ${value.actionCode}`);
    seen.add(key);
  }
  return canonical.sort((a, b) => `${a.actionCode}:${a.rationale}`.localeCompare(`${b.actionCode}:${b.rationale}`));
}
function assertDescriptiveSummary(summary: string): void {
  const normalized = summary.toLowerCase();
  const forbiddenConclusionPatterns = [
    /\b(is|was|are|were)\s+corrupt\b/,
    /\b(is|was|are|were)\s+guilty\b/,
    /\bcommitted\s+fraud\b/,
    /\bcriminal\s+offen[cs]e\b/,
    /\bcriminally\s+liable\b/,
  ];
  if (forbiddenConclusionPatterns.some((pattern) => pattern.test(normalized))) throw new DetectionEvaluationValidationError('signal summary must remain descriptive and non-accusatory');
}

export function validateDetectionRule<TInput>(rule: DetectionRule<TInput>): void {
  requireNonEmpty(rule.id, 'rule.id', DetectionRuleValidationError);
  requireNonEmpty(rule.name, 'rule.name', DetectionRuleValidationError);
  requireNonEmpty(rule.description, 'rule.description', DetectionRuleValidationError);
  if (!Number.isInteger(rule.version) || rule.version <= 0) throw new DetectionRuleValidationError('rule.version must be a positive integer');
  parseTimestamp(rule.validFrom, 'rule.validFrom');
  assertOrderedInterval(rule.validFrom, rule.validTo, 'rule');
  if (typeof rule.evaluate !== 'function') throw new DetectionRuleValidationError('rule.evaluate must be a function');
}

export function validateDetectionEvaluation(evaluation: DetectionEvaluation): void {
  requireNonEmpty(evaluation.signalType, 'evaluation.signalType', DetectionEvaluationValidationError);
  if (evaluation.triggered) requireNonEmpty(evaluation.summary, 'evaluation.summary', DetectionEvaluationValidationError);
  if (!SEVERITIES.has(evaluation.severity)) throw new DetectionEvaluationValidationError('evaluation.severity is invalid');
  if (!PRIORITIES.has(evaluation.priority)) throw new DetectionEvaluationValidationError('evaluation.priority is invalid');
  if (!CONFIDENCES.has(evaluation.confidence)) throw new DetectionEvaluationValidationError('evaluation.confidence is invalid');
  assertDescriptiveSummary(evaluation.summary);
  const reasonCodes = canonicalizeStrings(evaluation.reasonCodes, 'reasonCodes');
  const reconciliationIds = canonicalizeStrings(evaluation.reconciliationRunIds, 'reconciliationRunIds');
  const eventIds = canonicalizeStrings(evaluation.governmentEventIds, 'governmentEventIds');
  const evidenceIds = canonicalizeStrings(evaluation.evidenceIds, 'evidenceIds');
  if (reasonCodes.length !== evaluation.reasonCodes.length) throw new DetectionReferenceValidationError('reasonCodes must be duplicate-free');
  if (reconciliationIds.length !== evaluation.reconciliationRunIds.length) throw new DetectionReferenceValidationError('reconciliationRunIds must be duplicate-free');
  if (eventIds.length !== evaluation.governmentEventIds.length) throw new DetectionReferenceValidationError('governmentEventIds must be duplicate-free');
  if (evidenceIds.length !== evaluation.evidenceIds.length) throw new DetectionReferenceValidationError('evidenceIds must be duplicate-free');
  canonicalizeMissingInformation(evaluation.missingInformation);
  canonicalizeRecommendations(evaluation.recommendedVerification);
}

export function validateDetectionEvaluationContext(context: DetectionEvaluationContext): void {
  parseTimestamp(context.now, 'evaluationContext.now');
  requireNonEmpty(context.ruleExecutionId, 'evaluationContext.ruleExecutionId', DetectionEvaluationValidationError);
  for (const reconciliation of context.reconciliationRuns) {
    for (const step of reconciliation.stepResults) {
      if (step.status === 'UNAVAILABLE' && step.selectedEventId !== undefined) {
        throw new DetectionEvaluationValidationError('UNAVAILABLE reconciliation input cannot be represented with an observed selected event');
      }
    }
  }
}

export function canonicalizeDetectionEvaluation(evaluation: DetectionEvaluation): DetectionEvaluation {
  validateDetectionEvaluation(evaluation);
  return {
    ...evaluation,
    reasonCodes: canonicalizeStrings(evaluation.reasonCodes, 'reasonCodes'),
    reconciliationRunIds: canonicalizeStrings(evaluation.reconciliationRunIds, 'reconciliationRunIds') as DomainId[],
    governmentEventIds: canonicalizeStrings(evaluation.governmentEventIds, 'governmentEventIds') as DomainId<'GOVERNMENT_EVENT'>[],
    evidenceIds: canonicalizeStrings(evaluation.evidenceIds, 'evidenceIds') as DomainId<'EVIDENCE'>[],
    missingInformation: canonicalizeMissingInformation(evaluation.missingInformation),
    recommendedVerification: canonicalizeRecommendations(evaluation.recommendedVerification),
  };
}
export function canConstructDetectionSignal(evaluation: DetectionEvaluation): boolean {
  validateDetectionEvaluation(evaluation);
  return evaluation.triggered;
}

export interface DetectionSignalBuildInput {
  readonly id: DomainId;
  readonly generatedAt: string;
  readonly validFrom: string;
  readonly validTo?: string;
  readonly provenance: readonly ProvenanceReference[];
  readonly status?: DetectionSignalStatus;
}

export function buildDetectionSignal(rule: DetectionRule<unknown>, evaluation: DetectionEvaluation, input: DetectionSignalBuildInput): DetectionSignal | undefined {
  validateDetectionRule(rule);
  const canonical = canonicalizeDetectionEvaluation(evaluation);
  if (!canonical.triggered) return undefined;
  if (!rule.enabled) throw new DetectionSignalValidationError('disabled rules cannot construct a new detection signal');
  requireNonEmpty(input.id, 'signal.id', DetectionSignalValidationError);
  parseTimestamp(input.generatedAt, 'signal.generatedAt');
  assertOrderedInterval(input.validFrom, input.validTo, 'signal');
  if (input.provenance.length === 0) throw new DetectionSignalValidationError('signal.provenance must contain at least one reference');
  const status = input.status ?? 'OPEN';
  if (!SIGNAL_STATUSES.has(status)) throw new DetectionSignalValidationError('signal.status is invalid');
  return {
    id: input.id,
    signalType: canonical.signalType.trim(),
    ruleId: rule.id.trim(),
    ruleVersion: rule.version,
    status,
    severity: canonical.severity,
    priority: canonical.priority,
    confidence: canonical.confidence,
    summary: canonical.summary.trim(),
    reasonCodes: [...canonical.reasonCodes],
    reconciliationRunIds: [...canonical.reconciliationRunIds],
    governmentEventIds: [...canonical.governmentEventIds],
    evidenceIds: [...canonical.evidenceIds],
    missingInformation: [...canonical.missingInformation],
    recommendedVerification: [...canonical.recommendedVerification],
    generatedAt: input.generatedAt,
    validFrom: input.validFrom,
    ...(input.validTo === undefined ? {} : { validTo: input.validTo }),
    provenance: [...input.provenance],
  };
}

export function validateDetectionSignal(signal: DetectionSignal): void {
  requireNonEmpty(signal.id, 'signal.id', DetectionSignalValidationError);
  requireNonEmpty(signal.signalType, 'signal.signalType', DetectionSignalValidationError);
  requireNonEmpty(signal.ruleId, 'signal.ruleId', DetectionSignalValidationError);
  if (!Number.isInteger(signal.ruleVersion) || signal.ruleVersion <= 0) throw new DetectionSignalValidationError('signal.ruleVersion must be a positive integer');
  if (!SIGNAL_STATUSES.has(signal.status)) throw new DetectionSignalValidationError('signal.status is invalid');
  if (!SEVERITIES.has(signal.severity)) throw new DetectionSignalValidationError('signal.severity is invalid');
  if (!PRIORITIES.has(signal.priority)) throw new DetectionSignalValidationError('signal.priority is invalid');
  if (!CONFIDENCES.has(signal.confidence)) throw new DetectionSignalValidationError('signal.confidence is invalid');
  requireNonEmpty(signal.summary, 'signal.summary', DetectionSignalValidationError);
  assertDescriptiveSummary(signal.summary);
  parseTimestamp(signal.generatedAt, 'signal.generatedAt');
  assertOrderedInterval(signal.validFrom, signal.validTo, 'signal');
  for (const [values, field] of [
    [signal.reasonCodes, 'reasonCodes'],
    [signal.reconciliationRunIds, 'reconciliationRunIds'],
    [signal.governmentEventIds, 'governmentEventIds'],
    [signal.evidenceIds, 'evidenceIds'],
  ] as const) {
    const canonical = canonicalizeStrings(values, field);
    if (canonical.length !== values.length) throw new DetectionReferenceValidationError(`${field} must be duplicate-free`);
    if (canonical.some((value, index) => value !== values[index])) throw new DetectionReferenceValidationError(`${field} must be deterministically ordered`);
  }
  canonicalizeMissingInformation(signal.missingInformation);
  canonicalizeRecommendations(signal.recommendedVerification);
  if (signal.provenance.length === 0) throw new DetectionSignalValidationError('signal.provenance must contain at least one reference');
}

export type DetectionSignalTransition = `${DetectionSignalStatus}->${DetectionSignalStatus}`;
const ALLOWED_TRANSITIONS = new Set<DetectionSignalTransition>([
  'OPEN->SUPPRESSED', 'OPEN->RESOLVED', 'OPEN->EXPIRED',
  'SUPPRESSED->OPEN', 'SUPPRESSED->RESOLVED', 'RESOLVED->EXPIRED',
]);
export function canTransitionDetectionSignal(from: DetectionSignalStatus, to: DetectionSignalStatus): boolean {
  return ALLOWED_TRANSITIONS.has(`${from}->${to}` as DetectionSignalTransition);
}
export function assertDetectionSignalTransition(from: DetectionSignalStatus, to: DetectionSignalStatus): void {
  if (!canTransitionDetectionSignal(from, to)) throw new DetectionSignalValidationError(`invalid detection signal transition: ${from} -> ${to}`);
}

export function logicalDetectionSignalIdentity(signal: Pick<DetectionSignal, 'ruleId' | 'ruleVersion' | 'signalType' | 'reconciliationRunIds' | 'governmentEventIds' | 'evidenceIds' | 'validFrom' | 'validTo'>): string {
  return JSON.stringify({
    ruleId: signal.ruleId.trim(),
    ruleVersion: signal.ruleVersion,
    signalType: signal.signalType.trim(),
    reconciliationRunIds: canonicalizeStrings(signal.reconciliationRunIds, 'reconciliationRunIds'),
    governmentEventIds: canonicalizeStrings(signal.governmentEventIds, 'governmentEventIds'),
    evidenceIds: canonicalizeStrings(signal.evidenceIds, 'evidenceIds'),
    validFrom: signal.validFrom,
    validTo: signal.validTo ?? null,
  });
}

export function assertNoSemanticAbsenceConversion(status: string): void {
  if (status === 'ABSENT') throw new DetectionEvaluationValidationError('ABSENT is not a permitted substitute for missing or NOT_OBSERVED detection inputs');
}
export function assertNonCorruptionConclusion(text: string): void {
  assertDescriptiveSummary(text);
  if (/\b(corrupt|corruption|bribe|graft|kickback|fraud)\b/i.test(text)) throw new DetectionEvaluationValidationError('detection signal text must not classify a relationship or control condition as corruption');
}
