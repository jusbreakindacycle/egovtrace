import { createHash } from 'node:crypto';
import type { PersistenceStore, ProvenanceInput } from './index.js';
import {
  canonicalizeGovernmentEvent,
  type GovernmentEventCandidate
} from '@egovtrace/domain';

export interface IngestGovernmentEventResult {
  readonly eventId: string;
  readonly entityId: string;
  readonly sourceObservationKey: string;
  readonly replayed: boolean;
  readonly eventVersion: number;
  readonly outboxId: string;
}

function sourceObservationKey(candidate: GovernmentEventCandidate): string {
  const source = candidate.source;
  const canonical = JSON.stringify({
    sourceSystem: source.sourceSystem,
    sourceRecordId: source.sourceRecordId ?? null,
    sourceRecordType: source.sourceRecordType ?? null,
    sourceLocator: source.sourceLocator ?? null,
    sourceRevision: source.sourceRevision ?? null
  });
  return createHash('sha256').update(canonical).digest('hex');
}

async function ensureLifecycleColumns(store: PersistenceStore): Promise<void> {
  await store.query('ALTER TABLE government_event ALTER COLUMN occurred_at DROP NOT NULL');
  await store.query('ALTER TABLE government_event ADD COLUMN IF NOT EXISTS observation_at timestamptz');
  await store.query('ALTER TABLE government_event ADD COLUMN IF NOT EXISTS source_recorded_at timestamptz');
  await store.query('ALTER TABLE government_event ADD COLUMN IF NOT EXISTS temporal_precision text NOT NULL DEFAULT \'UNKNOWN\'');
  await store.query('ALTER TABLE government_event ADD COLUMN IF NOT EXISTS observation_state text NOT NULL DEFAULT \'OBSERVED\'');
  await store.query('ALTER TABLE government_event ADD COLUMN IF NOT EXISTS event_version integer NOT NULL DEFAULT 1');
  await store.query('ALTER TABLE government_event ADD COLUMN IF NOT EXISTS supersedes_event_id uuid');
  await store.query('ALTER TABLE government_event ADD COLUMN IF NOT EXISTS source_observation_key text');
  await store.query('CREATE UNIQUE INDEX IF NOT EXISTS government_event_source_key_version_idx ON government_event(source_observation_key, event_version) WHERE source_observation_key IS NOT NULL');
}

export async function ingestGovernmentEvent(
  store: PersistenceStore,
  candidate: GovernmentEventCandidate,
  provenance: ProvenanceInput = {
    kind: 'SOURCE_OBSERVATION',
    method: 'T004_SOURCE_OBSERVATION_INGESTION',
    recordedAt: candidate.observationAt,
    source: candidate.source as unknown as Record<string, unknown>
  }
): Promise<IngestGovernmentEventResult> {
  const normalized = canonicalizeGovernmentEvent(candidate);
  const sourceKey = sourceObservationKey(candidate);
  await ensureLifecycleColumns(store);

  const client = await store.pool.connect();
  try {
    await client.query('BEGIN');
    const existing = await client.query<{ id: string; entity_id: string; event_version: number; outbox_id: string }>(
      'SELECT ge.id, ge.entity_id, ge.event_version, ob.id AS outbox_id FROM government_event ge LEFT JOIN outbox_record ob ON ob.aggregate_id = ge.entity_id AND ob.event_type = $2 WHERE ge.source_observation_key = $1 ORDER BY ge.event_version DESC LIMIT 1 FOR UPDATE',
      [sourceKey, 'event.created']
    );
    if (existing.rowCount) {
      await client.query('COMMIT');
      return {
        eventId: existing.rows[0].id,
        entityId: existing.rows[0].entity_id,
        sourceObservationKey: sourceKey,
        replayed: true,
        eventVersion: existing.rows[0].event_version,
        outboxId: existing.rows[0].outbox_id
      };
    }

    const entityResult = await client.query<{ id: string }>(
      'INSERT INTO domain_entity (entity_type, payload) VALUES ($1, $2) RETURNING id',
      ['GOVERNMENT_EVENT', normalized]
    );
    const entityId = entityResult.rows[0].id;
    const provenanceResult = await client.query<{ id: string }>(
      'INSERT INTO provenance_record (kind, method, recorded_at, source) VALUES ($1, $2, $3, $4) RETURNING id',
      [provenance.kind, provenance.method, provenance.recordedAt, provenance.source ?? null]
    );
    const provenanceId = provenanceResult.rows[0].id;

    const sourceRecordId = candidate.source.sourceRecordId ?? sourceKey;
    const sourceNamespace = candidate.source.sourceRecordId ? (candidate.source.sourceRecordType ?? null) : 'GENERATED_SOURCE_OBSERVATION_KEY';
    await client.query(
      'INSERT INTO source_system_registry (system_key, display_name) VALUES ($1, $1) ON CONFLICT (system_key) DO NOTHING',
      [candidate.source.sourceSystem]
    );
    await client.query(
      'INSERT INTO source_identifier (entity_id, source_system, namespace, source_record_id, observed_at, provenance_id) VALUES ($1,$2,$3,$4,$5,$6)',
      [entityId, candidate.source.sourceSystem, sourceNamespace, sourceRecordId, candidate.observationAt, provenanceId]
    );

    const eventResult = await client.query<{ id: string }>(
      'INSERT INTO government_event (entity_id, event_type, occurred_at, status, assertion_kind, confidence, object_entity_id, provenance_id, observation_at, source_recorded_at, temporal_precision, observation_state, event_version, source_observation_key) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING id',
      [
        entityId,
        candidate.eventType,
        candidate.occurredAt ?? null,
        candidate.status ?? 'RECORDED',
        candidate.assertionKind,
        candidate.confidence,
        candidate.objectEntityId,
        provenanceId,
        candidate.observationAt,
        candidate.sourceRecordedAt ?? null,
        candidate.temporalPrecision ?? (candidate.occurredAt ? 'DATETIME' : 'UNKNOWN'),
        candidate.source.observationOutcome ?? 'OBSERVED',
        1,
        sourceKey
      ]
    );
    const eventId = eventResult.rows[0].id;
    const outboxResult = await client.query<{ id: string }>(
      'INSERT INTO outbox_record (event_type, aggregate_type, aggregate_id, payload) VALUES ($1,$2,$3,$4) RETURNING id',
      ['event.created', 'GOVERNMENT_EVENT', entityId, { eventId, entityId, sourceObservationKey: sourceKey }]
    );
    await client.query('COMMIT');
    return {
      eventId,
      entityId,
      sourceObservationKey: sourceKey,
      replayed: false,
      eventVersion: 1,
      outboxId: outboxResult.rows[0].id
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
