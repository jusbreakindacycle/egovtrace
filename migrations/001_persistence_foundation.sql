CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS source_system_registry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  system_key text NOT NULL UNIQUE,
  display_name text NOT NULL,
  authority_notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS domain_entity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL CHECK (entity_type IN ('INSTITUTION','OFFICE','PERSON','OFFICIAL','AUTHORITY','LEGAL_INSTRUMENT','PROJECT','BUDGET','PROCUREMENT','BIDDER','CONTRACTOR','CONTRACT','PAYMENT','EVIDENCE','GOVERNMENT_EVENT')),
  payload jsonb NOT NULL,
  record_version integer NOT NULL DEFAULT 1 CHECK (record_version > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS source_identifier (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL REFERENCES domain_entity(id),
  source_system text NOT NULL REFERENCES source_system_registry(system_key),
  namespace text,
  source_record_id text NOT NULL,
  observed_at timestamptz,
  provenance_id uuid,
  UNIQUE (source_system, namespace, source_record_id, entity_id)
);

CREATE TABLE IF NOT EXISTS provenance_record (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL,
  method text NOT NULL,
  recorded_at timestamptz NOT NULL,
  source jsonb,
  parent_ids uuid[] NOT NULL DEFAULT '{}'
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'source_identifier_provenance_fk'
      AND conrelid = 'source_identifier'::regclass
  ) THEN
    ALTER TABLE source_identifier ADD CONSTRAINT source_identifier_provenance_fk
      FOREIGN KEY (provenance_id) REFERENCES provenance_record(id) NOT VALID;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS state_version (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL REFERENCES domain_entity(id),
  state text NOT NULL,
  valid_from timestamptz NOT NULL,
  valid_to timestamptz,
  observed_at timestamptz NOT NULL,
  provenance_id uuid NOT NULL REFERENCES provenance_record(id),
  recorded_at timestamptz NOT NULL DEFAULT now(),
  CHECK (valid_to IS NULL OR valid_from <= valid_to)
);

CREATE TABLE IF NOT EXISTS evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL REFERENCES domain_entity(id),
  evidence_type text NOT NULL,
  source jsonb NOT NULL,
  captured_at timestamptz NOT NULL,
  content_hash text,
  assertion_kind text NOT NULL,
  confidence text NOT NULL,
  availability_status text NOT NULL DEFAULT 'AVAILABLE',
  provenance_id uuid NOT NULL REFERENCES provenance_record(id)
);

CREATE TABLE IF NOT EXISTS relationship_assertion (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  relationship_type text NOT NULL,
  from_entity_id uuid NOT NULL REFERENCES domain_entity(id),
  to_entity_id uuid NOT NULL REFERENCES domain_entity(id),
  assertion_kind text NOT NULL,
  basis text[] NOT NULL,
  confidence text NOT NULL,
  status text NOT NULL,
  valid_from timestamptz NOT NULL,
  valid_to timestamptz,
  provenance_id uuid NOT NULL REFERENCES provenance_record(id),
  CHECK (valid_to IS NULL OR valid_from <= valid_to)
);

CREATE TABLE IF NOT EXISTS relationship_evidence (
  relationship_id uuid NOT NULL REFERENCES relationship_assertion(id) ON DELETE CASCADE,
  evidence_id uuid NOT NULL REFERENCES evidence(id),
  PRIMARY KEY (relationship_id, evidence_id)
);

CREATE TABLE IF NOT EXISTS financial_state (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL REFERENCES domain_entity(id),
  financial_state text NOT NULL CHECK (financial_state IN ('OBLIGATION', 'DISBURSEMENT', 'SETTLEMENT')),
  amount numeric(20, 4) NOT NULL,
  currency text NOT NULL,
  settlement_status text NOT NULL,
  availability_status text NOT NULL DEFAULT 'OBSERVED',
  valid_from timestamptz NOT NULL,
  valid_to timestamptz,
  observed_at timestamptz NOT NULL,
  provenance_id uuid NOT NULL REFERENCES provenance_record(id),
  CHECK (valid_to IS NULL OR valid_from <= valid_to)
);

CREATE TABLE IF NOT EXISTS government_event (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL REFERENCES domain_entity(id),
  event_type text NOT NULL,
  occurred_at timestamptz NOT NULL,
  status text NOT NULL,
  assertion_kind text NOT NULL,
  confidence text NOT NULL,
  object_entity_id uuid NOT NULL REFERENCES domain_entity(id),
  provenance_id uuid NOT NULL REFERENCES provenance_record(id)
);

CREATE TABLE IF NOT EXISTS idempotency_record (
  idempotency_key text NOT NULL,
  operation text NOT NULL,
  request_hash text NOT NULL,
  result jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (idempotency_key, operation)
);

CREATE TABLE IF NOT EXISTS outbox_record (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  aggregate_type text NOT NULL,
  aggregate_id uuid NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);