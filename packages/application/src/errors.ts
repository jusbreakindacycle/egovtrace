export type ReconciliationApplicationErrorCode =
  | 'INVALID_COMMAND'
  | 'CONTROL_PATH_NOT_FOUND'
  | 'CONTROL_PATH_VERSION_INVALID'
  | 'OBSERVATION_UNAVAILABLE'
  | 'RECONCILIATION_NOT_FOUND'
  | 'IDEMPOTENCY_CONFLICT'
  | 'CONCURRENCY_CONFLICT'
  | 'RECONCILIATION_IMMUTABLE'
  | 'DOMAIN_VALIDATION_FAILED'
  | 'PERSISTENCE_FAILURE'
  | 'AUTHORIZATION_CONTEXT_INVALID';

export interface ReconciliationApplicationErrorShape {
  readonly code: ReconciliationApplicationErrorCode;
  readonly message: string;
  readonly cause?: unknown;
  readonly retryable: boolean;
}

export class ReconciliationApplicationError extends Error implements ReconciliationApplicationErrorShape {
  readonly code: ReconciliationApplicationErrorCode;
  readonly retryable: boolean;
  readonly cause?: unknown;

  constructor(shape: ReconciliationApplicationErrorShape) {
    super(shape.message, { cause: shape.cause });
    this.name = 'ReconciliationApplicationError';
    this.code = shape.code;
    this.retryable = shape.retryable;
    this.cause = shape.cause;
  }
}
