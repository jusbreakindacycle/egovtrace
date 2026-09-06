ALTER TABLE government_event
  ALTER COLUMN occurred_at DROP NOT NULL;

ALTER TABLE government_event
  ADD COLUMN IF NOT EXISTS observation_at timestamptz,
  ADD COLUMN IF NOT EXISTS source_recorded_at timestamptz,
  ADD COLUMN IF NOT EXISTS temporal_precision text NOT NULL DEFAULT 'UNKNOWN',
  ADD COLUMN IF NOT EXISTS observation_state text NOT NULL DEFAULT 'OBSERVED',
  ADD COLUMN IF NOT EXISTS event_version integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS supersedes_event_id uuid REFERENCES government_event(id),
  ADD COLUMN IF NOT EXISTS source_identity_key text,
  ADD COLUMN IF NOT EXISTS source_revision text;

CREATE UNIQUE INDEX IF NOT EXISTS government_event_source_identity_revision_idx
  ON government_event(source_identity_key, source_revision)
  WHERE source_identity_key IS NOT NULL AND source_revision IS NOT NULL;

CREATE INDEX IF NOT EXISTS government_event_source_identity_idx
  ON government_event(source_identity_key)
  WHERE source_identity_key IS NOT NULL;
