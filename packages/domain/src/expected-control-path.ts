import type { AssertionKind, DomainId, GovernmentEventType, ProvenanceReference, TemporalValidity } from './index.js';

export type ExpectedControlPathStatus = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'ACTIVE' | 'RETIRED';
export type ControlPathClassification = 'SYNTHETIC' | 'NORMATIVE' | 'INTERPRETED';
export type ExpectedControlStepType = 'AUTHORIZATION' | 'BUDGET' | 'PROCUREMENT' | 'CONTRACT' | 'PAYMENT' | 'IMPLEMENTATION' | 'VERIFICATION' | 'AUDIT' | 'ACCOUNTABILITY' | 'OUTCOME';
export type ExpectedControlRequiredness = 'REQUIRED' | 'OPTIONAL' | 'CONDITIONAL';
export type DependencyKind = 'REQUIRED_PREDECESSOR' | 'OPTIONAL_PREDECESSOR' | 'ALTERNATIVE_PREDECESSOR';
export type ApplicabilityOperator = 'EQUALS' | 'NOT_EQUALS' | 'IN' | 'NOT_IN' | 'PRESENT' | 'ABSENT';
export type CompletionMode = 'EVENT_OBSERVED' | 'EVIDENCE_PRESENT' | 'HUMAN_CONFIRMATION' | 'DECLARATIVE_REFERENCE';
export type IndependenceRequirement = 'MUST_DIFFER_FROM_PREVIOUS_ACTOR' | 'MUST_DIFFER_FROM_AUTHORIZING_ACTOR' | 'MUST_BE_OUTSIDE_EXECUTING_OFFICE';
export type CalendarBasis = 'ELAPSED_TIME' | 'CALENDAR_DAYS' | 'BUSINESS_DAYS' | 'SOURCE_DEFINED';

export interface ControlPathScope {
  readonly institutionIds?: readonly DomainId<'INSTITUTION'>[];
  readonly officeIds?: readonly DomainId<'OFFICE'>[];
  readonly programIds?: readonly DomainId[];
  readonly projectTypes?: readonly string[];
  readonly procurementTypes?: readonly string[];
  readonly fundingSources?: readonly string[];
  readonly geographicScopes?: readonly string[];
  readonly transactionCategories?: readonly string[];
}

export type ApplicabilityValue = string | number | boolean | readonly string[];
export interface ApplicabilityCondition {
  readonly field: string;
  readonly operator: ApplicabilityOperator;
  readonly value: ApplicabilityValue;
}
export interface ControlPathApplicability {
  readonly conditions: readonly ApplicabilityCondition[];
}
export interface ApplicabilityConditionGroup {
  readonly conditions: readonly ApplicabilityCondition[];
}

export interface ControlStepDependency {
  readonly stepKey: string;
  readonly kind: DependencyKind;
}

export interface EvidenceExpectation {
  readonly evidenceType: string;
  readonly minimumCount: number;
  readonly sourceClass?: string;
  readonly requiredAttributes?: readonly string[];
  readonly acceptedAssertionKinds?: readonly AssertionKind[];
  readonly availabilityRequirement?: 'AVAILABLE' | 'MAY_BE_WITHHELD';
}

export interface ControlResponsibility {
  readonly institutionId?: DomainId<'INSTITUTION'>;
  readonly officeId?: DomainId<'OFFICE'>;
  readonly roles?: readonly string[];
  readonly permittedActorTypes?: readonly string[];
}

export interface ControlTimingExpectation {
  readonly earliestAfterStepKey?: string;
  readonly latestAfterStepKey?: string;
  readonly targetDurationSeconds?: number;
  readonly calendarBasis?: CalendarBasis;
}

export interface ExpectedControlStep {
  readonly id: DomainId;
  readonly key: string;
  readonly sequence: number;
  readonly description: string;
  readonly type: ExpectedControlStepType;
  readonly requiredness: ExpectedControlRequiredness;
  readonly dependencies: readonly ControlStepDependency[];
  readonly expectedEventTypes: readonly GovernmentEventType[];
  readonly evidenceExpectations: readonly EvidenceExpectation[];
  readonly responsibility: ControlResponsibility;
  readonly timing?: ControlTimingExpectation;
  readonly independence?: IndependenceRequirement;
  readonly applicability?: ApplicabilityConditionGroup;
  readonly alternativeGroup?: string;
  readonly completionModes: readonly CompletionMode[];
  readonly provenance: readonly ProvenanceReference[];
}

export interface ExpectedControlPath {
  readonly id: DomainId;
  readonly controlPathKey: string;
  readonly version: number;
  readonly status: ExpectedControlPathStatus;
  readonly scope: ControlPathScope;
  readonly classification: ControlPathClassification;
  readonly validity: TemporalValidity;
  readonly applicability: ControlPathApplicability;
  readonly steps: readonly ExpectedControlStep[];
  readonly provenance: readonly ProvenanceReference[];
  readonly metadata: Readonly<Record<string, unknown>>;
}

const STATUS_ORDER: readonly ExpectedControlPathStatus[] = ['DRAFT', 'REVIEW', 'APPROVED', 'ACTIVE', 'RETIRED'];
const STEP_TYPES = new Set<ExpectedControlStepType>(['AUTHORIZATION', 'BUDGET', 'PROCUREMENT', 'CONTRACT', 'PAYMENT', 'IMPLEMENTATION', 'VERIFICATION', 'AUDIT', 'ACCOUNTABILITY', 'OUTCOME']);
const REQUIREDNESS = new Set<ExpectedControlRequiredness>(['REQUIRED', 'OPTIONAL', 'CONDITIONAL']);
const DEPENDENCY_KINDS = new Set<DependencyKind>(['REQUIRED_PREDECESSOR', 'OPTIONAL_PREDECESSOR', 'ALTERNATIVE_PREDECESSOR']);
const COMPLETION_MODES = new Set<CompletionMode>(['EVENT_OBSERVED', 'EVIDENCE_PRESENT', 'HUMAN_CONFIRMATION', 'DECLARATIVE_REFERENCE']);
const OPERATORS = new Set<ApplicabilityOperator>(['EQUALS', 'NOT_EQUALS', 'IN', 'NOT_IN', 'PRESENT', 'ABSENT']);
const EVENT_TYPES: readonly GovernmentEventType[] = ['PROJECT_CREATED', 'BUDGET_APPROVED', 'PROCUREMENT_POSTED', 'CONTRACT_AWARDED', 'PAYMENT_OBLIGATED', 'PAYMENT_DISBURSED', 'PAYMENT_SETTLED', 'IMPLEMENTATION_REPORTED', 'VERIFICATION_RECORDED'];
const EVENT_TYPE_SET = new Set<string>(EVENT_TYPES);
const INDEPENDENCE = new Set<IndependenceRequirement>(['MUST_DIFFER_FROM_PREVIOUS_ACTOR', 'MUST_DIFFER_FROM_AUTHORIZING_ACTOR', 'MUST_BE_OUTSIDE_EXECUTING_OFFICE']);
const CALENDAR_BASIS = new Set<CalendarBasis>(['ELAPSED_TIME', 'CALENDAR_DAYS', 'BUSINESS_DAYS', 'SOURCE_DEFINED']);

function fail(message: string): never { throw new Error(`invalid ExpectedControlPath: ${message}`); }
function isNonEmpty(value: unknown): value is string { return typeof value === 'string' && value.trim().length > 0; }
function assertUnique(values: readonly string[], label: string): void {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) fail(`${label} contains duplicate value '${value}'`);
    seen.add(value);
  }
}
function assertIso(value: string, label: string): void {
  if (!isNonEmpty(value) || Number.isNaN(Date.parse(value))) fail(`${label} must be a parseable timestamp`);
}
function assertValidity(validity: TemporalValidity): void {
  assertIso(validity.validFrom, 'validFrom');
  if (validity.validTo !== undefined) {
    assertIso(validity.validTo, 'validTo');
    if (Date.parse(validity.validFrom) > Date.parse(validity.validTo)) fail('validFrom must not be after validTo');
  }
}
function validateApplicabilityCondition(condition: ApplicabilityCondition, label: string): void {
  if (!isNonEmpty(condition.field)) fail(`${label}.field is required`);
  if (!OPERATORS.has(condition.operator)) fail(`${label}.operator is unsupported`);
  if (condition.value === undefined || condition.value === null) fail(`${label}.value is required`);
  if ((condition.operator === 'IN' || condition.operator === 'NOT_IN') && (!Array.isArray(condition.value) || condition.value.length === 0)) fail(`${label}.value must be a non-empty string array for ${condition.operator}`);
}

function validateSteps(path: ExpectedControlPath): void {
  if (path.status === 'ACTIVE' && path.steps.length === 0) fail('ACTIVE path must contain at least one step');
  const keys = path.steps.map((step) => step.key);
  assertUnique(keys, 'step keys');
  const keySet = new Set(keys);

  for (const [index, step] of path.steps.entries()) {
    if (!isNonEmpty(step.key)) fail(`step[${index}].key is required`);
    if (!Number.isInteger(step.sequence) || step.sequence < 0) fail(`step[${index}].sequence must be a non-negative integer`);
    if (!isNonEmpty(step.description)) fail(`step[${index}].description is required`);
    if (!STEP_TYPES.has(step.type)) fail(`step[${index}].type '${step.type}' is unsupported`);
    if (!REQUIREDNESS.has(step.requiredness)) fail(`step[${index}].requiredness is unsupported`);
    if (step.requiredness === 'CONDITIONAL' && !step.applicability) fail(`step[${index}] CONDITIONAL requires applicability`);
    if (step.applicability) {
      if (step.applicability.conditions.length === 0) fail(`step[${index}].applicability must contain at least one condition`);
      step.applicability.conditions.forEach((condition, i) => validateApplicabilityCondition(condition, `step[${index}].applicability.conditions[${i}]`));
    }
    assertUnique(step.expectedEventTypes, `step[${index}].expectedEventTypes`);
    for (const eventType of step.expectedEventTypes) if (!EVENT_TYPE_SET.has(eventType)) fail(`step[${index}] references unsupported GovernmentEventType '${eventType}'`);
    assertUnique(step.completionModes, `step[${index}].completionModes`);
    if (step.completionModes.length === 0) fail(`step[${index}].completionModes must not be empty`);
    for (const mode of step.completionModes) if (!COMPLETION_MODES.has(mode)) fail(`step[${index}].completionModes contains unsupported mode '${mode}'`);
    if (step.completionModes.includes('EVENT_OBSERVED') && step.expectedEventTypes.length === 0) fail(`step[${index}] EVENT_OBSERVED requires expectedEventTypes`);
    if (step.completionModes.includes('EVIDENCE_PRESENT') && step.evidenceExpectations.length === 0) fail(`step[${index}] EVIDENCE_PRESENT requires evidenceExpectations`);

    const dependencyKeys = step.dependencies.map((dependency) => dependency.stepKey);
    assertUnique(dependencyKeys, `step[${index}].dependencies`);
    for (const dependency of step.dependencies) {
      if (!keySet.has(dependency.stepKey)) fail(`step[${index}] dependency '${dependency.stepKey}' does not exist`);
      if (dependency.stepKey === step.key) fail(`step[${index}] cannot depend on itself`);
      if (!DEPENDENCY_KINDS.has(dependency.kind)) fail(`step[${index}] has unsupported dependency kind '${dependency.kind}'`);
    }

    for (const [evidenceIndex, expectation] of step.evidenceExpectations.entries()) {
      const prefix = `step[${index}].evidenceExpectations[${evidenceIndex}]`;
      if (!isNonEmpty(expectation.evidenceType)) fail(`${prefix}.evidenceType is required`);
      if (!Number.isInteger(expectation.minimumCount) || expectation.minimumCount < 0) fail(`${prefix}.minimumCount must be a non-negative integer`);
      if (expectation.requiredAttributes) assertUnique(expectation.requiredAttributes, `${prefix}.requiredAttributes`);
      if (expectation.acceptedAssertionKinds) assertUnique(expectation.acceptedAssertionKinds, `${prefix}.acceptedAssertionKinds`);
      if (expectation.availabilityRequirement !== undefined && !['AVAILABLE', 'MAY_BE_WITHHELD'].includes(expectation.availabilityRequirement)) fail(`${prefix}.availabilityRequirement is unsupported`);
    }

    if (step.responsibility.roles) {
      const roles = step.responsibility.roles.map((role) => role.trim());
      if (roles.some((role) => role.length === 0)) fail(`step[${index}].responsibility.roles contains an empty role`);
      assertUnique(roles, `step[${index}].responsibility.roles`);
    }
    if (step.responsibility.permittedActorTypes) {
      const actorTypes = step.responsibility.permittedActorTypes.map((value) => value.trim());
      if (actorTypes.some((value) => value.length === 0)) fail(`step[${index}].responsibility.permittedActorTypes contains an empty value`);
      assertUnique(actorTypes, `step[${index}].responsibility.permittedActorTypes`);
    }

    if (step.independence && !INDEPENDENCE.has(step.independence)) fail(`step[${index}].independence is unsupported`);
    if (step.alternativeGroup !== undefined && !isNonEmpty(step.alternativeGroup)) fail(`step[${index}].alternativeGroup must not be empty`);
    if (step.timing) {
      if (step.timing.targetDurationSeconds !== undefined && (!Number.isFinite(step.timing.targetDurationSeconds) || step.timing.targetDurationSeconds < 0)) fail(`step[${index}].timing.targetDurationSeconds must be non-negative`);
      if (step.timing.calendarBasis !== undefined && !CALENDAR_BASIS.has(step.timing.calendarBasis)) fail(`step[${index}].timing.calendarBasis is unsupported`);
      for (const reference of [step.timing.earliestAfterStepKey, step.timing.latestAfterStepKey]) {
        if (reference !== undefined && !keySet.has(reference)) fail(`step[${index}].timing references missing step '${reference}'`);
        if (reference === step.key) fail(`step[${index}].timing cannot reference itself`);
      }
    }
    for (const provenance of step.provenance) if (!provenance.provenanceId) fail(`step[${index}] provenance requires provenanceId`);
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();
  const byKey = new Map(path.steps.map((step) => [step.key, step]));
  const visit = (key: string): void => {
    if (visiting.has(key)) fail(`dependency cycle detected at step '${key}'`);
    if (visited.has(key)) return;
    visiting.add(key);
    for (const dependency of byKey.get(key)?.dependencies ?? []) visit(dependency.stepKey);
    visiting.delete(key);
    visited.add(key);
  };
  for (const step of path.steps) visit(step.key);
}

export function validateExpectedControlPath(path: ExpectedControlPath): void {
  if (!isNonEmpty(path.controlPathKey)) fail('controlPathKey is required');
  if (!Number.isInteger(path.version) || path.version < 1) fail('version must be a positive integer');
  if (!STATUS_ORDER.includes(path.status)) fail(`status '${path.status}' is unsupported`);
  if (!['SYNTHETIC', 'NORMATIVE', 'INTERPRETED'].includes(path.classification)) fail(`classification '${path.classification}' is unsupported`);
  assertValidity(path.validity);
  if (!path.applicability) fail('path applicability object is required');
  path.applicability.conditions.forEach((condition, index) => validateApplicabilityCondition(condition, `applicability.conditions[${index}]`));
  if (path.classification !== 'SYNTHETIC' && path.provenance.length === 0) fail(`${path.classification} path requires provenance`);
  for (const provenance of path.provenance) if (!provenance.provenanceId) fail('path provenance requires provenanceId');
  validateSteps(path);
}

export function assertValidStatusTransition(from: ExpectedControlPathStatus, to: ExpectedControlPathStatus): void {
  const fromIndex = STATUS_ORDER.indexOf(from);
  const toIndex = STATUS_ORDER.indexOf(to);
  if (fromIndex < 0 || toIndex < 0 || toIndex !== fromIndex + 1) fail(`status transition ${from} -> ${to} is not allowed`);
}

export function assertPathMayBeMutated(status: ExpectedControlPathStatus): void {
  if (status !== 'DRAFT') fail(`path with status ${status} is immutable; create a new version instead`);
}

export function normalizeExpectedControlPath(path: ExpectedControlPath): ExpectedControlPath {
  validateExpectedControlPath(path);
  const trim = (value: string) => value.trim();
  return {
    ...path,
    controlPathKey: trim(path.controlPathKey),
    scope: {
      ...path.scope,
      projectTypes: path.scope.projectTypes?.map(trim),
      procurementTypes: path.scope.procurementTypes?.map(trim),
      fundingSources: path.scope.fundingSources?.map(trim),
      geographicScopes: path.scope.geographicScopes?.map(trim),
      transactionCategories: path.scope.transactionCategories?.map(trim),
    },
    metadata: { ...path.metadata },
    steps: path.steps.map((step) => ({
      ...step,
      key: trim(step.key),
      description: trim(step.description),
      responsibility: {
        ...step.responsibility,
        roles: step.responsibility.roles?.map(trim),
        permittedActorTypes: step.responsibility.permittedActorTypes?.map(trim),
      },
      alternativeGroup: step.alternativeGroup?.trim(),
    })),
  };
}
