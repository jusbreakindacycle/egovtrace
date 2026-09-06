import {
  reconcile,
  type ReconciliationResult,
  type ReconciliationRun,
} from '../../domain/dist/index.js';
import {
  ReconciliationConcurrencyError,
  ReconciliationIdempotencyConflictError,
  ReconciliationImmutableError,
} from '../../database/dist/reconciliation.js';
import {
  ReconciliationApplicationError,
  type ReconciliationApplicationErrorCode,
} from './errors.js';
import type {
  ExecuteReconciliationCommand,
  FinalizeReconciliationCommand,
  FinalizeReconciliationResult,
  GetReconciliationQuery,
  ListReconciliationsByControlPathQuery,
  ReconciliationApplicationDependencies,
  ReconciliationApplicationResult,
} from './contracts.js';

function assertNonEmpty(value: string, field: string): void {
  if (!value.trim()) throw new ReconciliationApplicationError({ code: 'INVALID_COMMAND', message: `${field} is required`, retryable: false });
}

function assertPositiveInteger(value: number, field: string): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new ReconciliationApplicationError({ code: 'INVALID_COMMAND', message: `${field} must be a positive integer`, retryable: false });
  }
}

function assertIso(value: string, field: string): void {
  if (Number.isNaN(Date.parse(value))) {
    throw new ReconciliationApplicationError({ code: 'INVALID_COMMAND', message: `${field} must be ISO-parseable`, retryable: false });
  }
}

function validateAuthorizationContext(context: ExecuteReconciliationCommand['authorizationContext'] | FinalizeReconciliationCommand['authorizationContext']): void {
  if (!context) return;
  assertNonEmpty(context.actorId, 'authorizationContext.actorId');
  assertNonEmpty(context.actorType, 'authorizationContext.actorType');
  assertNonEmpty(context.requestId, 'authorizationContext.requestId');
}

function validateExecuteCommand(command: ExecuteReconciliationCommand): void {
  assertNonEmpty(command.reconciliationRunId, 'reconciliationRunId');
  assertNonEmpty(command.controlPathId, 'controlPathId');
  assertPositiveInteger(command.controlPathVersion, 'controlPathVersion');
  assertNonEmpty(command.algorithmVersion, 'algorithmVersion');
  assertNonEmpty(command.idempotencyKey, 'idempotencyKey');
  assertIso(command.executedAt, 'executedAt');
  if (command.expectedSubject) {
    assertNonEmpty(command.expectedSubject.entityType, 'expectedSubject.entityType');
    assertNonEmpty(command.expectedSubject.id, 'expectedSubject.id');
  }
  if (command.observationScope.validFrom) assertIso(command.observationScope.validFrom, 'observationScope.validFrom');
  if (command.observationScope.validTo) assertIso(command.observationScope.validTo, 'observationScope.validTo');
  const keys = new Set<string>();
  for (const input of command.stepInputs) {
    assertNonEmpty(input.stepKey, 'stepInputs.stepKey');
    if (keys.has(input.stepKey)) throw new ReconciliationApplicationError({ code: 'INVALID_COMMAND', message: `duplicate step input: ${input.stepKey}`, retryable: false });
    keys.add(input.stepKey);
    if (!['APPLICABLE', 'INAPPLICABLE', 'UNKNOWN'].includes(input.applicability)) {
      throw new ReconciliationApplicationError({ code: 'INVALID_COMMAND', message: `invalid applicability: ${input.applicability}`, retryable: false });
    }
  }
  validateAuthorizationContext(command.authorizationContext);
}

function validateFinalizeCommand(command: FinalizeReconciliationCommand): void {
  assertNonEmpty(command.reconciliationRunId, 'reconciliationRunId');
  assertPositiveInteger(command.expectedRecordVersion, 'expectedRecordVersion');
  validateAuthorizationContext(command.authorizationContext);
}

function translatePersistenceError(error: unknown): ReconciliationApplicationError {
  if (error instanceof ReconciliationIdempotencyConflictError) {
    return new ReconciliationApplicationError({ code: 'IDEMPOTENCY_CONFLICT', message: error.message, retryable: false, cause: error });
  }
  if (error instanceof ReconciliationConcurrencyError) {
    return new ReconciliationApplicationError({ code: 'CONCURRENCY_CONFLICT', message: error.message, retryable: true, cause: error });
  }
  if (error instanceof ReconciliationImmutableError) {
    return new ReconciliationApplicationError({ code: 'RECONCILIATION_IMMUTABLE', message: error.message, retryable: false, cause: error });
  }
  if (error instanceof ReconciliationApplicationError) return error;
  return new ReconciliationApplicationError({ code: 'PERSISTENCE_FAILURE', message: 'reconciliation persistence failed', retryable: true, cause: error });
}

export class ReconciliationApplicationService {
  constructor(private readonly dependencies: ReconciliationApplicationDependencies) {}

  async execute(command: ExecuteReconciliationCommand): Promise<ReconciliationApplicationResult> {
    validateExecuteCommand(command);

    const path = await this.dependencies.controlPaths.getExact(command.controlPathId, command.controlPathVersion).catch((error) => {
      throw new ReconciliationApplicationError({ code: 'PERSISTENCE_FAILURE', message: 'control-path resolution failed', retryable: true, cause: error });
    });

    if (!path) {
      throw new ReconciliationApplicationError({ code: 'CONTROL_PATH_NOT_FOUND', message: 'requested control-path version was not found', retryable: false });
    }
    if (path.id !== command.controlPathId || path.version !== command.controlPathVersion) {
      throw new ReconciliationApplicationError({ code: 'CONTROL_PATH_VERSION_INVALID', message: 'resolved control path does not match requested identity/version', retryable: false });
    }

    let events;
    if (command.events !== undefined) {
      events = command.events;
    } else {
      const observation = await this.dependencies.observations.getObservations({
        observationScope: command.observationScope,
        expectedSubject: command.expectedSubject,
      }).catch((error) => {
        throw new ReconciliationApplicationError({ code: 'OBSERVATION_UNAVAILABLE', message: 'observation retrieval failed', retryable: true, cause: error });
      });
      if (observation.availability === 'UNAVAILABLE') {
        throw new ReconciliationApplicationError({ code: 'OBSERVATION_UNAVAILABLE', message: observation.reasonCode, retryable: true });
      }
      events = observation.events;
    }

    const run: ReconciliationRun = {
      id: command.reconciliationRunId,
      controlPathId: command.controlPathId,
      observationScope: command.observationScope,
      stepInputs: command.stepInputs,
      algorithmVersion: command.algorithmVersion,
      executedAt: command.executedAt,
    };

    let result: ReconciliationResult;
    try {
      result = reconcile({ path, expectedSubject: command.expectedSubject, events, run });
    } catch (error) {
      throw new ReconciliationApplicationError({ code: 'DOMAIN_VALIDATION_FAILED', message: error instanceof Error ? error.message : 'domain reconciliation failed', retryable: false, cause: error });
    }

    let persisted;
    try {
      persisted = await this.dependencies.repository.create(result, command.idempotencyKey);
    } catch (error) {
      throw translatePersistenceError(error);
    }

    const audit = this.dependencies.audit;
    if (audit) {
      await audit({
        action: 'RECONCILIATION_EXECUTED',
        reconciliationRunId: command.reconciliationRunId,
        requestId: command.authorizationContext?.requestId,
        actorId: command.authorizationContext?.actorId,
        actorType: command.authorizationContext?.actorType,
        recordedAt: this.dependencies.now?.() ?? new Date().toISOString(),
      });
    }

    return { run: persisted };
  }

  async finalize(command: FinalizeReconciliationCommand): Promise<FinalizeReconciliationResult> {
    validateFinalizeCommand(command);
    try {
      const recordVersion = await this.dependencies.repository.finalize(command.reconciliationRunId, command.expectedRecordVersion);
      if (this.dependencies.audit) {
        await this.dependencies.audit({
          action: 'RECONCILIATION_FINALIZED',
          reconciliationRunId: command.reconciliationRunId,
          requestId: command.authorizationContext?.requestId,
          actorId: command.authorizationContext?.actorId,
          actorType: command.authorizationContext?.actorType,
          recordedAt: this.dependencies.now?.() ?? new Date().toISOString(),
        });
      }
      return { reconciliationRunId: command.reconciliationRunId, recordVersion, finalized: true };
    } catch (error) {
      throw translatePersistenceError(error);
    }
  }

  async get(query: GetReconciliationQuery) {
    assertNonEmpty(query.reconciliationRunId, 'reconciliationRunId');
    try {
      const result = await this.dependencies.repository.get(query.reconciliationRunId);
      if (!result) throw new ReconciliationApplicationError({ code: 'RECONCILIATION_NOT_FOUND', message: 'reconciliation run not found', retryable: false });
      return result;
    } catch (error) {
      if (error instanceof ReconciliationApplicationError) throw error;
      throw translatePersistenceError(error);
    }
  }

  async listByControlPath(query: ListReconciliationsByControlPathQuery) {
    assertNonEmpty(query.controlPathId, 'controlPathId');
    if (query.controlPathVersion !== undefined) assertPositiveInteger(query.controlPathVersion, 'controlPathVersion');
    try {
      return await this.dependencies.repository.listByControlPath(query.controlPathId, query.controlPathVersion);
    } catch (error) {
      throw translatePersistenceError(error);
    }
  }
}

export function applicationErrorCode(error: unknown): ReconciliationApplicationErrorCode | undefined {
  return error instanceof ReconciliationApplicationError ? error.code : undefined;
}
