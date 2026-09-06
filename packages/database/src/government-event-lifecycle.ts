import { createHash } from 'node:crypto';
import type { PersistenceStore, ProvenanceInput } from './index.js';

export type GovernmentEventCandidate = {
  eventType: string;
  occurredAt?: string;
  temporalPrecision?: 'YEAR' | 'MONTH' | 'DATE' | 'DATETIME' | 'INTERVAL' | 'UNKNOWN';
  observationAt: string;
  sourceRecordedAt?: string;
  status?: 'RECORDED';
  assertionKind: 'FACT' | 'OBSERVATION' | 'CLAIM';
  confidence: 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN';
  objectEntityId: string;
  payload?: Record<string, unknown>;
  source: {
    sourceSystem: string;
    sourceRecordId?: string;
    sourceRecordType?: string;
    sourceLocator?: string;
    sourceRevision?: string;
    retrievedAt: string;
    observationOutcome?: 'OBSERVED' | 'NOT_OBSERVED' | 'UNAVAILABLE' | 'EXPLICITLY_ABSENT' | 'NOT_APPLICABLE';
  };
  financialState?: 'OBLIGATION' | 'DISBURSEMENT' | 'SETTLEMENT';
};

export interface IngestGovernmentEventResult {
  readonly eventId: string;
  readonly entityId: string;
  readonly sourceObservationKey: string;
  readonly replayed: boolean;
  readonly eventVersion: number;
  readonly outboxId: string;
}

const EVENT_TYPES = new Set(['PROJECT_CREATED','BUDGET_APPROVED','PROCUREMENT_POSTED','CONTRACT_AWARDED','PAYMENT_OBLIGATED','PAYMENT_DISBURSED','PAYMENT_SETTLED','IMPLEMENTATION_REPORTED','VERIFICATION_RECORDED']);
const PAYMENT_STATES: Record<string, string> = { PAYMENT_OBLIGATED: 'OBLIGATION', PAYMENT_DISBURSED: 'DISBURSEMENT', PAYMENT_SETTLED: 'SETTLEMENT' };

function validateCandidate(candidate: GovernmentEventCandidate): void {
  if (!EVENT_TYPES.has(candidate.eventType)) throw new Error(`unsupported GovernmentEvent type: ${candidate.eventType}`);
  if (!candidate.observationAt) throw new Error('observationAt is required');
  if (!candidate.objectEntityId) throw new Error('objectEntityId is required');
  if (!candidate.source.sourceSystem) throw new Error('sourceSystem is required');
  if (!candidate.source.sourceRecordId && !candidate.source.sourceLocator && !candidate.source.sourceRevision) throw new Error('source observation requires a stable identity');
  if (candidate.source.observationOutcome && candidate.source.observationOutcome !== 'OBSERVED') throw new Error(`cannot ingest observation outcome ${candidate.source.observationOutcome}`);
  if (candidate.eventType in PAYMENT_STATES && candidate.financialState !== PAYMENT_STATES[candidate.eventType]) throw new Error(`financialState must be ${PAYMENT_STATES[candidate.eventType]} for ${candidate.eventType}`);
  if (candidate.temporalPrecision === 'DATE' && candidate.occurredAt && /T/.test(candidate.occurredAt)) throw new Error('DATE precision cannot contain fabricated time-of-day precision');
}

function observationKey(candidate: GovernmentEventCandidate): string {
  return createHash('sha256').update(JSON.stringify({ sourceSystem: candidate.source.sourceSystem, sourceRecordId: candidate.source.sourceRecordId ?? null, sourceRecordType: candidate.source.sourceRecordType ?? null, sourceLocator: candidate.source.sourceLocator ?? null, sourceRevision: candidate.source.sourceRevision ?? null })).digest('hex');
}

export async function ingestGovernmentEvent(store: PersistenceStore, candidate: GovernmentEventCandidate, provenance?: ProvenanceInput): Promise<IngestGovernmentEventResult> {
  validateCandidate(candidate);
  const sourceKey = observationKey(candidate);
  const normalized = { ...candidate, sourceObservationKey: sourceKey };
  const client = await store.pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('ALTER TABLE government_event ALTER COLUMN occurred_at DROP NOT NULL');
    await client.query("ALTER TABLE government_event ADD COLUMN IF NOT EXISTS observation_at timestamptz");
    await client.query("ALTER TABLE government_event ADD COLUMN IF NOT EXISTS source_recorded_at timestamptz");
    await client.query("ALTER TABLE government_event ADD COLUMN IF NOT EXISTS temporal_precision text NOT NULL DEFAULT 'UNKNOWN'");
    await client.query("ALTER TABLE government_event ADD COLUMN IF NOT EXISTS observation_state text NOT NULL DEFAULT 'OBSERVED'");
    await client.query('ALTER TABLE government_event ADD COLUMN IF NOT EXISTS event_version integer NOT NULL DEFAULT 1');
    await client.query('ALTER TABLE government_event ADD COLUMN IF NOT EXISTS source_observation_key text');
    await client.query('CREATE UNIQUE INDEX IF NOT EXISTS government_event_source_key_idx ON government_event(source_observation_key) WHERE source_observation_key IS NOT NULL');

    const existing = await client.query<{ id: string; entity_id: string; outbox_id: string | null }>('SELECT ge.id, ge.entity_id, ob.id AS outbox_id FROM government_event ge LEFT JOIN outbox_record ob ON ob.aggregate_id = ge.entity_id AND ob.event_type = $2 WHERE ge.source_observation_key = $1 LIMIT 1 FOR UPDATE', [sourceKey, 'event.created']);
    if (existing.rowCount) {
      if (!existing.rows[0].outbox_id) throw new Error('existing GovernmentEvent is missing transactional outbox record');
      await client.query('COMMIT');
      return { eventId: existing.rows[0].id, entityId: existing.rows[0].entity_id, sourceObservationKey: sourceKey, replayed: true, eventVersion: 1, outboxId: existing.rows[0].outbox_id };
    }

    const entity = await client.query<{ id: string }>('INSERT INTO domain_entity (entity_type, payload) VALUES ($1,$2) RETURNING id', ['GOVERNMENT_EVENT', normalized]);
    const entityId = entity.rows[0].id;
    const prov = await client.query<{ id: string }>('INSERT INTO provenance_record (kind, method, recorded_at, source) VALUES ($1,$2,$3,$4) RETURNING id', [provenance?.kind ?? 'SOURCE_OBSERVATION', provenance?.method ?? 'T004_SOURCE_OBSERVATION_INGESTION', provenance?.recordedAt ?? candidate.observationAt, provenance?.source ?? candidate.source]);
    const provenanceId = prov.rows[0].id;
    const sourceRecordId = candidate.source.sourceRecordId ?? sourceKey;
    const namespace = candidate.source.sourceRecordId ? candidate.source.sourceRecordType ?? null : 'GENERATED_SOURCE_OBSERVATION_KEY';
    await client.query('INSERT INTO source_system_registry (system_key, display_name) VALUES ($1,$1) ON CONFLICT (system_key) DO NOTHING', [candidate.source.sourceSystem]);
    await client.query('INSERT INTO source_identifier (entity_id,source_system,namespace,source_record_id,observed_at,provenance_id) VALUES ($1,$2,$3,$4,$5,$6)', [entityId, candidate.source.sourceSystem, namespace, sourceRecordId, candidate.observationAt, provenanceId]);
    const event = await client.query<{ id: string }>('INSERT INTO government_event (entity_id,event_type,occurred_at,status,assertion_kind,confidence,object_entity_id,provenance_id,observation_at,source_recorded_at,temporal_precision,observation_state,event_version,source_observation_key) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING id', [entityId, candidate.eventType, candidate.occurredAt ?? null, candidate.status ?? 'RECORDED', candidate.assertionKind, candidate.confidence, candidate.objectEntityId, provenanceId, candidate.observationAt, candidate.sourceRecordedAt ?? null, candidate.temporalPrecision ?? (candidate.occurredAt ? 'DATETIME' : 'UNKNOWN'), 'OBSERVED', 1, sourceKey]);
    const outbox = await client.query<{ id: string }>('INSERT INTO outbox_record (event_type,aggregate_type,aggregate_id,payload) VALUES ($1,$2,$3,$4) RETURNING id', ['event.created','GOVERNMENT_EVENT',entityId,{ eventId: event.rows[0].id, entityId, sourceObservationKey: sourceKey }]);
    await client.query('COMMIT');
    return { eventId: event.rows[0].id, entityId, sourceObservationKey: sourceKey, replayed: false, eventVersion: 1, outboxId: outbox.rows[0].id };
  } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
}
