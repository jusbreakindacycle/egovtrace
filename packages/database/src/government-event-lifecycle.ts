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
  evidence?: Array<{
    evidenceType: string;
    source: Record<string, unknown>;
    capturedAt: string;
    contentHash?: string;
    assertionKind: string;
    confidence: string;
    availabilityStatus?: string;
  }>;
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
  readonly supersededEventId?: string;
  readonly outboxId: string;
}

const EVENT_TYPES = new Set(['PROJECT_CREATED','BUDGET_APPROVED','PROCUREMENT_POSTED','CONTRACT_AWARDED','PAYMENT_OBLIGATED','PAYMENT_DISBURSED','PAYMENT_SETTLED','IMPLEMENTATION_REPORTED','VERIFICATION_RECORDED']);
const PAYMENT_STATES: Record<string, string> = { PAYMENT_OBLIGATED: 'OBLIGATION', PAYMENT_DISBURSED: 'DISBURSEMENT', PAYMENT_SETTLED: 'SETTLEMENT' };

function validateCandidate(candidate: GovernmentEventCandidate): void {
  if (!EVENT_TYPES.has(candidate.eventType)) throw new Error(`unsupported GovernmentEvent type: ${candidate.eventType}`);
  if (!candidate.observationAt) throw new Error('observationAt is required');
  if (!candidate.objectEntityId) throw new Error('objectEntityId is required');
  if (!candidate.source.sourceSystem) throw new Error('sourceSystem is required');
  if (!candidate.source.sourceRecordId && !candidate.source.sourceLocator) throw new Error('source observation requires sourceRecordId or sourceLocator for stable lineage');
  if (candidate.source.observationOutcome && candidate.source.observationOutcome !== 'OBSERVED') throw new Error(`cannot ingest observation outcome ${candidate.source.observationOutcome}`);
  if (candidate.eventType in PAYMENT_STATES && candidate.financialState !== PAYMENT_STATES[candidate.eventType]) throw new Error(`financialState must be ${PAYMENT_STATES[candidate.eventType]} for ${candidate.eventType}`);
  if (candidate.temporalPrecision === 'DATE' && candidate.occurredAt && /T/.test(candidate.occurredAt)) throw new Error('DATE precision cannot contain fabricated time-of-day precision');
}

function sourceIdentityKey(candidate: GovernmentEventCandidate): string {
  return createHash('sha256').update(JSON.stringify({ sourceSystem: candidate.source.sourceSystem, sourceRecordId: candidate.source.sourceRecordId ?? null, sourceRecordType: candidate.source.sourceRecordType ?? null, sourceLocator: candidate.source.sourceLocator ?? null })).digest('hex');
}

function sourceObservationKey(candidate: GovernmentEventCandidate): string {
  return createHash('sha256').update(JSON.stringify({ identity: sourceIdentityKey(candidate), sourceRevision: candidate.source.sourceRevision ?? 'UNVERSIONED' })).digest('hex');
}

export async function ingestGovernmentEvent(store: PersistenceStore, candidate: GovernmentEventCandidate, provenance?: ProvenanceInput): Promise<IngestGovernmentEventResult> {
  validateCandidate(candidate);
  const identityKey = sourceIdentityKey(candidate);
  const observationKey = sourceObservationKey(candidate);
  const sourceRevision = candidate.source.sourceRevision ?? 'UNVERSIONED';
  const normalized = { ...candidate, sourceObservationKey: observationKey, sourceIdentityKey: identityKey };
  const client = await store.pool.connect();
  try {
    await client.query('BEGIN');
    const existing = await client.query<{ id: string; entity_id: string; event_version: number; outbox_id: string | null }>('SELECT ge.id, ge.entity_id, ge.event_version, ob.id AS outbox_id FROM government_event ge LEFT JOIN outbox_record ob ON ob.aggregate_id = ge.entity_id AND ob.event_type = $2 WHERE ge.source_identity_key = $1 AND ge.source_revision = $3 LIMIT 1 FOR UPDATE OF ge', [identityKey, 'event.created', sourceRevision]);
    if (existing.rowCount) {
      if (!existing.rows[0].outbox_id) throw new Error('existing GovernmentEvent is missing transactional outbox record');
      await client.query('COMMIT');
      return { eventId: existing.rows[0].id, entityId: existing.rows[0].entity_id, sourceObservationKey: observationKey, replayed: true, eventVersion: existing.rows[0].event_version, outboxId: existing.rows[0].outbox_id };
    }

    const latest = await client.query<{ id: string; event_version: number }>('SELECT id, event_version FROM government_event WHERE source_identity_key = $1 ORDER BY event_version DESC LIMIT 1 FOR UPDATE', [identityKey]);
    const eventVersion = latest.rowCount ? latest.rows[0].event_version + 1 : 1;
    const supersedesEventId = latest.rowCount ? latest.rows[0].id : null;

    const entity = await client.query<{ id: string }>('INSERT INTO domain_entity (entity_type, payload) VALUES ($1,$2) RETURNING id', ['GOVERNMENT_EVENT', normalized]);
    const entityId = entity.rows[0].id;
    const prov = await client.query<{ id: string }>('INSERT INTO provenance_record (kind, method, recorded_at, source) VALUES ($1,$2,$3,$4) RETURNING id', [provenance?.kind ?? 'SOURCE_OBSERVATION', provenance?.method ?? 'T004_SOURCE_OBSERVATION_INGESTION', provenance?.recordedAt ?? candidate.observationAt, provenance?.source ?? candidate.source]);
    const provenanceId = prov.rows[0].id;

    await client.query('INSERT INTO source_system_registry (system_key, display_name) VALUES ($1,$1) ON CONFLICT (system_key) DO NOTHING', [candidate.source.sourceSystem]);
    await client.query('INSERT INTO source_identifier (entity_id,source_system,namespace,source_record_id,observed_at,provenance_id) VALUES ($1,$2,$3,$4,$5,$6)', [entityId, candidate.source.sourceSystem, candidate.source.sourceRecordType ?? null, candidate.source.sourceRecordId ?? candidate.source.sourceLocator, candidate.observationAt, provenanceId]);

    for (const evidence of candidate.evidence ?? []) {
      await client.query('INSERT INTO evidence (entity_id,evidence_type,source,captured_at,content_hash,assertion_kind,confidence,availability_status,provenance_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [entityId, evidence.evidenceType, evidence.source, evidence.capturedAt, evidence.contentHash ?? null, evidence.assertionKind, evidence.confidence, evidence.availabilityStatus ?? 'AVAILABLE', provenanceId]);
    }

    const occurredAtIsDate = candidate.temporalPrecision === 'DATE';
    const event = await client.query<{ id: string }>('INSERT INTO government_event (entity_id,event_type,occurred_at,status,assertion_kind,confidence,object_entity_id,provenance_id,observation_at,source_recorded_at,temporal_precision,observation_state,event_version,supersedes_event_id,source_identity_key,source_revision,occurred_at_source_value) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING id', [entityId, candidate.eventType, occurredAtIsDate ? null : (candidate.occurredAt ?? null), candidate.status ?? 'RECORDED', candidate.assertionKind, candidate.confidence, candidate.objectEntityId, provenanceId, candidate.observationAt, candidate.sourceRecordedAt ?? null, candidate.temporalPrecision ?? (candidate.occurredAt ? 'DATETIME' : 'UNKNOWN'), 'OBSERVED', eventVersion, supersedesEventId, identityKey, sourceRevision, candidate.occurredAt ?? null]);
    if (supersedesEventId) await client.query('UPDATE government_event SET status = \'SUPERSEDED\' WHERE id = $1', [supersedesEventId]);
    const outbox = await client.query<{ id: string }>('INSERT INTO outbox_record (event_type,aggregate_type,aggregate_id,payload) VALUES ($1,$2,$3,$4) RETURNING id', ['event.created','GOVERNMENT_EVENT',entityId,{ eventId: event.rows[0].id, entityId, sourceObservationKey: observationKey, eventVersion }]);
    await client.query('COMMIT');
    return { eventId: event.rows[0].id, entityId, sourceObservationKey: observationKey, replayed: false, eventVersion, supersededEventId: supersedesEventId ?? undefined, outboxId: outbox.rows[0].id };
  } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
}
