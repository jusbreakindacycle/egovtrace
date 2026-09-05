export type GovernmentEventType =
  | 'PROJECT_CREATED'
  | 'BUDGET_APPROVED'
  | 'PROCUREMENT_POSTED'
  | 'CONTRACT_AWARDED'
  | 'PAYMENT_RECORDED'
  | 'IMPLEMENTATION_REPORTED'
  | 'VERIFICATION_RECORDED';

export interface GovernmentEvent {
  id: string;
  eventType: GovernmentEventType;
  occurredAt: string;
  subjectId: string;
  sourceKind: 'SYNTHETIC' | 'REFERENCE' | 'EVIDENCE_SNAPSHOT' | 'DERIVED';
}
