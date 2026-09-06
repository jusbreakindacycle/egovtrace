export type EntityType =
  | 'INSTITUTION'
  | 'OFFICE'
  | 'PERSON'
  | 'OFFICIAL'
  | 'AUTHORITY'
  | 'LEGAL_INSTRUMENT'
  | 'PROJECT'
  | 'BUDGET'
  | 'PROCUREMENT'
  | 'BIDDER'
  | 'CONTRACTOR'
  | 'CONTRACT'
  | 'PAYMENT'
  | 'EVIDENCE'
  | 'GOVERNMENT_EVENT';

export type DomainId<T extends EntityType = EntityType> = string & {
  readonly __entityType?: T;
  readonly __brand: 'eGovTraceDomainId';
};

export interface SourceIdentifier {
  readonly sourceSystem: string;
  readonly sourceRecordId: string;
  readonly namespace?: string;
}

export interface SourceReference extends SourceIdentifier {
  readonly sourceUrl?: string;
  readonly observedAt?: string;
  readonly retrievedAt: string;
  readonly accessClassification: 'PUBLIC' | 'CONTROLLED' | 'RESTRICTED' | 'SYNTHETIC';
}

export type ProvenanceKind =
  | 'SOURCE_OBSERVATION'
  | 'NORMALIZATION'
  | 'DERIVATION'
  | 'AI_ASSISTANCE'
  | 'HUMAN_ADJUDICATION'
  | 'SYNTHETIC_FIXTURE';

export interface ProvenanceReference {
  readonly provenanceId: DomainId<'EVIDENCE'>;
  readonly kind: ProvenanceKind;
  readonly source?: SourceReference;
  readonly parentProvenanceIds: readonly DomainId[];
  readonly recordedAt: string;
  readonly method: string;
}

export interface TemporalValidity {
  readonly validFrom: string;
  readonly validTo?: string;
}

export interface StateVersion<TState extends string = string> {
  readonly state: TState;
  readonly validity: TemporalValidity;
  readonly observedAt: string;
  readonly provenance: readonly ProvenanceReference[];
}

export type Confidence = 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN';

export type AssertionKind = 'FACT' | 'OBSERVATION' | 'DERIVED_RELATIONSHIP' | 'CLAIM' | 'SIGNAL' | 'FINDING';

export type GovernmentEventStatus =
  | 'OBSERVED'
  | 'NOT_OBSERVED'
  | 'ABSENT'
  | 'UNAVAILABLE'
  | 'REPORTED'
  | 'DERIVED'
  | 'CONTESTED';

export type RelationshipBasis =
  | 'DIRECT_SOURCE_REFERENCE'
  | 'EXPLICIT_IDENTIFIER_REFERENCE'
  | 'COMMON_ATTRIBUTE'
  | 'TEMPORAL_ALIGNMENT'
  | 'GEOGRAPHIC_ALIGNMENT'
  | 'SEMANTIC_MATCH'
  | 'HUMAN_ADJUDICATION'
  | 'DERIVED_RULE';

export interface DomainReference<T extends EntityType = EntityType> {
  readonly entityType: T;
  readonly id: DomainId<T>;
}

export interface DomainEntity<TState extends string = string, TType extends EntityType = EntityType> {
  readonly id: DomainId<TType>;
  readonly entityType: TType;
  readonly sourceIdentifiers: readonly SourceIdentifier[];
  readonly provenance: readonly ProvenanceReference[];
  readonly stateHistory?: readonly StateVersion<TState>[];
}

export interface RelationshipAssertion {
  readonly id: DomainId;
  readonly relationshipType: string;
  readonly from: DomainReference;
  readonly to: DomainReference;
  readonly assertionKind: 'DERIVED_RELATIONSHIP' | 'CLAIM';
  readonly basis: readonly RelationshipBasis[];
  readonly confidence: Confidence;
  readonly status: 'PROPOSED' | 'UNRESOLVED' | 'SUPPORTED' | 'REJECTED';
  readonly validity: TemporalValidity;
  readonly supportingEvidenceIds: readonly DomainId<'EVIDENCE'>[];
  readonly provenance: readonly ProvenanceReference[];
}

export interface Institution extends DomainEntity<'ACTIVE' | 'INACTIVE', 'INSTITUTION'> {
  readonly name: string;
  readonly institutionType: string;
}

export interface Office extends DomainEntity<'ACTIVE' | 'INACTIVE', 'OFFICE'> {
  readonly institutionId: DomainId<'INSTITUTION'>;
  readonly name: string;
}

export interface Person extends DomainEntity<'ACTIVE' | 'INACTIVE', 'PERSON'> {
  readonly displayName: string;
}

export interface Official extends DomainEntity<'APPOINTED' | 'ENDED', 'OFFICIAL'> {
  readonly personId: DomainId<'PERSON'>;
  readonly officeId: DomainId<'OFFICE'>;
  readonly role: string;
  readonly appointmentValidity: TemporalValidity;
}

export interface Authority extends DomainEntity<'ACTIVE' | 'EXPIRED', 'AUTHORITY'> {
  readonly grantingInstitutionId: DomainId<'INSTITUTION'>;
  readonly holder: DomainReference<'PERSON' | 'OFFICIAL' | 'OFFICE' | 'INSTITUTION'>;
  readonly scope: string;
  readonly validity: TemporalValidity;
  readonly legalInstrumentId?: DomainId<'LEGAL_INSTRUMENT'>;
}

export interface LegalInstrument extends DomainEntity<'IN_FORCE' | 'SUPERSEDED' | 'EXPIRED', 'LEGAL_INSTRUMENT'> {
  readonly title: string;
  readonly instrumentType: string;
  readonly issuedBy: DomainId<'INSTITUTION'>;
  readonly effectiveValidity: TemporalValidity;
}

export interface Project extends DomainEntity<'PROPOSED' | 'APPROVED' | 'IMPLEMENTING' | 'COMPLETED' | 'CANCELLED', 'PROJECT'> {
  readonly name: string;
  readonly institutionId: DomainId<'INSTITUTION'>;
  readonly officeId?: DomainId<'OFFICE'>;
  readonly programId?: DomainId;
}

export interface Budget extends DomainEntity<'PROPOSED' | 'APPROVED' | 'AMENDED' | 'CLOSED', 'BUDGET'> {
  readonly projectId?: DomainId<'PROJECT'>;
  readonly fiscalYear: number;
  readonly amount: Money;
  readonly revision: number;
}

export interface Procurement extends DomainEntity<'PLANNED' | 'POSTED' | 'AWARDED' | 'CANCELLED', 'PROCUREMENT'> {
  readonly projectId?: DomainId<'PROJECT'>;
  readonly institutionId: DomainId<'INSTITUTION'>;
  readonly procurementReference?: string;
}

export interface Bidder extends DomainEntity<'PARTICIPATING' | 'DISQUALIFIED' | 'SELECTED' | 'NOT_SELECTED', 'BIDDER'> {
  readonly procurementId: DomainId<'PROCUREMENT'>;
  readonly legalName: string;
}

export interface Contractor extends DomainEntity<'ACTIVE' | 'INACTIVE', 'CONTRACTOR'> {
  readonly legalName: string;
  readonly registrationIdentifiers: readonly SourceIdentifier[];
}

export interface Contract extends DomainEntity<'DRAFT' | 'EXECUTED' | 'ACTIVE' | 'COMPLETED' | 'TERMINATED', 'CONTRACT'> {
  readonly procurementId?: DomainId<'PROCUREMENT'>;
  readonly contractorId: DomainId<'CONTRACTOR'>;
  readonly projectId?: DomainId<'PROJECT'>;
  readonly contractValue: Money;
}

export type PaymentFinancialState = 'OBLIGATION' | 'DISBURSEMENT' | 'SETTLEMENT';

export interface Payment extends DomainEntity<'RECORDED' | 'UNVERIFIED' | 'SETTLED' | 'REVERSED', 'PAYMENT'> {
  readonly contractId?: DomainId<'CONTRACT'>;
  readonly projectId?: DomainId<'PROJECT'>;
  readonly financialState: PaymentFinancialState;
  readonly settlementStatus: 'NOT_APPLICABLE' | 'INSTRUCTION_RECORDED' | 'UNVERIFIED' | 'SETTLED';
  readonly amount: Money;
}

export interface Money {
  readonly amount: number;
  readonly currency: string;
}

export interface Evidence extends DomainEntity<'AVAILABLE' | 'WITHHELD' | 'SUPERSEDED', 'EVIDENCE'> {
  readonly evidenceType: string;
  readonly source: SourceReference;
  readonly capturedAt: string;
  readonly contentHash?: string;
  readonly assertionKind: AssertionKind;
  readonly confidence: Confidence;
}

export interface EventActor {
  readonly personId?: DomainId<'PERSON'>;
  readonly officialId?: DomainId<'OFFICIAL'>;
  readonly role?: string;
}

export type GovernmentEventType =
  | 'PROJECT_CREATED'
  | 'BUDGET_APPROVED'
  | 'PROCUREMENT_POSTED'
  | 'CONTRACT_AWARDED'
  | 'PAYMENT_OBLIGATED'
  | 'PAYMENT_DISBURSED'
  | 'PAYMENT_SETTLED'
  | 'IMPLEMENTATION_REPORTED'
  | 'VERIFICATION_RECORDED';

export interface GovernmentEvent extends DomainEntity<'RECORDED' | 'SUPERSEDED', 'GOVERNMENT_EVENT'> {
  readonly eventType: GovernmentEventType;
  readonly occurredAt: string;
  readonly recordedAt: string;
  readonly institutionId?: DomainId<'INSTITUTION'>;
  readonly officeId?: DomainId<'OFFICE'>;
  readonly actor?: EventActor;
  readonly authorityId?: DomainId<'AUTHORITY'>;
  readonly legalBasisId?: DomainId<'LEGAL_INSTRUMENT'>;
  readonly object: DomainReference;
  readonly financialValue?: Money;
  readonly programId?: DomainId;
  readonly projectId?: DomainId<'PROJECT'>;
  readonly location?: Location;
  readonly relatedEventIds: readonly DomainId<'GOVERNMENT_EVENT'>[];
  readonly evidenceIds: readonly DomainId<'EVIDENCE'>[];
  readonly sourceReferences: readonly SourceReference[];
  readonly classification: 'PUBLIC' | 'CONTROLLED' | 'RESTRICTED' | 'SYNTHETIC';
  readonly status: GovernmentEventStatus;
  readonly assertionKind: AssertionKind;
  readonly confidence: Confidence;
  readonly validity?: TemporalValidity;
}

export interface Location {
  readonly countryCode: string;
  readonly administrativeArea?: string;
  readonly locality?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly precisionMeters?: number;
}

export function assertValidTemporalValidity(validity: TemporalValidity): void {
  const from = Date.parse(validity.validFrom);
  const to = validity.validTo === undefined ? undefined : Date.parse(validity.validTo);
  if (Number.isNaN(from) || (to !== undefined && Number.isNaN(to)) || (to !== undefined && from > to)) {
    throw new Error('Temporal validity must contain ordered ISO-parseable timestamps');
  }
}

export function isPaymentSettled(payment: Payment): boolean {
  return payment.financialState === 'SETTLEMENT' && payment.settlementStatus === 'SETTLED';
}

export function isExplicitlyConfirmedIdentity(assertion: RelationshipAssertion): boolean {
  return assertion.status === 'SUPPORTED'
    && assertion.basis.includes('EXPLICIT_IDENTIFIER_REFERENCE')
    && assertion.basis.includes('DIRECT_SOURCE_REFERENCE');
}

export type * from './expected-control-path.js';
export type * from './reconciliation.js';
export { reconcile, governmentEventTypesForStep, isPotentiallyCompleted, statusImpliesObserved } from './reconciliation.js';
