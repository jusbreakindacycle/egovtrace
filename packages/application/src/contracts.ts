import type { ExpectedControlPath, GovernmentEvent, ReconciliationObservationScope, ReconciliationPersistedRun, ReconciliationResult, ReconciliationRun, ReconciliationStepInput, DomainId } from '../../domain/dist/index.js';

export interface ExpectedControlPathResolver {
  getExact(controlPathId: string, controlPathVersion: number): Promise<ExpectedControlPath | null>;
}

export interface ReconciliationObservationRequest {
  readonly observationScope: ReconciliationObservationScope;
  readonly expectedSubject?: { readonly entityType: string; readonly id: string };
}

export type ReconciliationObservationResponse =
  | { readonly availability: 'AVAILABLE'; readonly events: readonly GovernmentEvent[] }
  | { readonly availability: 'UNAVAILABLE'; readonly reasonCode: string; readonly sourceSystem?: string };

export interface ReconciliationObservationProvider {
  getObservations(request: ReconciliationObservationRequest): Promise<ReconciliationObservationResponse>;
}

export interface ReconciliationRepositoryPort {
  create(result: ReconciliationResult, idempotencyKey: string): Promise<ReconciliationPersistedRun>;
  get(reconciliationRunId: string): Promise<ReconciliationPersistedRun | null>;
  listByControlPath(controlPathId: string, controlPathVersion?: number): Promise<readonly ReconciliationPersistedRun[]>;
  finalize(reconciliationRunId: string, expectedRecordVersion: number): Promise<number>;
}

export interface ReconciliationAuthorizationContext {
  readonly actorId: string;
  readonly actorType: string;
  readonly scopes: readonly string[];
  readonly requestId: string;
}

export interface ExecuteReconciliationCommand {
  readonly reconciliationRunId: DomainId;
  readonly controlPathId: DomainId;
  readonly controlPathVersion: number;
  readonly expectedSubject?: { readonly entityType: string; readonly id: string };
  readonly observationScope: ReconciliationObservationScope;
  readonly stepInputs: readonly ReconciliationStepInput[];
  readonly events?: readonly GovernmentEvent[];
  readonly algorithmVersion: string;
  readonly executedAt: string;
  readonly idempotencyKey: string;
  readonly authorizationContext?: ReconciliationAuthorizationContext;
}

export interface FinalizeReconciliationCommand {
  readonly reconciliationRunId: string;
  readonly expectedRecordVersion: number;
  readonly authorizationContext?: ReconciliationAuthorizationContext;
}

export interface GetReconciliationQuery {
  readonly reconciliationRunId: string;
}

export interface ListReconciliationsByControlPathQuery {
  readonly controlPathId: string;
  readonly controlPathVersion?: number;
}

export interface ReconciliationApplicationResult {
  readonly run: ReconciliationPersistedRun;
}

export interface FinalizeReconciliationResult {
  readonly reconciliationRunId: string;
  readonly recordVersion: number;
  readonly finalized: true;
}

export type AuditSink = (entry: {
  readonly action: 'RECONCILIATION_EXECUTED' | 'RECONCILIATION_FINALIZED';
  readonly reconciliationRunId: string;
  readonly requestId?: string;
  readonly actorId?: string;
  readonly actorType?: string;
  readonly recordedAt: string;
}) => Promise<void>;

export interface ReconciliationApplicationDependencies {
  readonly controlPaths: ExpectedControlPathResolver;
  readonly observations: ReconciliationObservationProvider;
  readonly repository: ReconciliationRepositoryPort;
  readonly now?: () => string;
  readonly audit?: AuditSink;
}
