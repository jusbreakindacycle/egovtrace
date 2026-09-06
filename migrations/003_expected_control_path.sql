CREATE TABLE IF NOT EXISTS expected_control_path (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  control_path_key text NOT NULL,
  version integer NOT NULL CHECK (version > 0),
  status text NOT NULL CHECK (status IN ('DRAFT','REVIEW','APPROVED','ACTIVE','RETIRED')),
  classification text NOT NULL CHECK (classification IN ('SYNTHETIC','NORMATIVE','INTERPRETED')),
  validity_from timestamptz NOT NULL,
  validity_to timestamptz,
  scope jsonb NOT NULL DEFAULT '{}',
  applicability jsonb NOT NULL DEFAULT '{"conditions":[]}',
  metadata jsonb NOT NULL DEFAULT '{}',
  record_version integer NOT NULL DEFAULT 1 CHECK (record_version > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (control_path_key, version),
  CHECK (validity_to IS NULL OR validity_from <= validity_to)
);

CREATE TABLE IF NOT EXISTS expected_control_step (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  control_path_id uuid NOT NULL REFERENCES expected_control_path(id) ON DELETE CASCADE,
  step_key text NOT NULL,
  sequence integer NOT NULL CHECK (sequence >= 0),
  description text NOT NULL,
  step_type text NOT NULL CHECK (step_type IN ('AUTHORIZATION','BUDGET','PROCUREMENT','CONTRACT','PAYMENT','IMPLEMENTATION','VERIFICATION','AUDIT','ACCOUNTABILITY','OUTCOME')),
  requiredness text NOT NULL CHECK (requiredness IN ('REQUIRED','OPTIONAL','CONDITIONAL')),
  responsibility jsonb NOT NULL DEFAULT '{}',
  timing jsonb,
  independence text CHECK (independence IS NULL OR independence IN ('MUST_DIFFER_FROM_PREVIOUS_ACTOR','MUST_DIFFER_FROM_AUTHORIZING_ACTOR','MUST_BE_OUTSIDE_EXECUTING_OFFICE')),
  applicability jsonb,
  alternative_group text,
  completion_modes text[] NOT NULL CHECK (cardinality(completion_modes) > 0 AND completion_modes <@ ARRAY['EVENT_OBSERVED','EVIDENCE_PRESENT','HUMAN_CONFIRMATION','DECLARATIVE_REFERENCE']::text[]),
  UNIQUE (control_path_id, step_key)
);

CREATE TABLE IF NOT EXISTS expected_control_step_dependency (
  step_id uuid NOT NULL REFERENCES expected_control_step(id) ON DELETE CASCADE,
  dependency_step_key text NOT NULL,
  dependency_kind text NOT NULL CHECK (dependency_kind IN ('REQUIRED_PREDECESSOR','OPTIONAL_PREDECESSOR','ALTERNATIVE_PREDECESSOR')),
  PRIMARY KEY (step_id, dependency_step_key, dependency_kind)
);

CREATE TABLE IF NOT EXISTS expected_control_step_event_type (
  step_id uuid NOT NULL REFERENCES expected_control_step(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('PROJECT_CREATED','BUDGET_APPROVED','PROCUREMENT_POSTED','CONTRACT_AWARDED','PAYMENT_OBLIGATED','PAYMENT_DISBURSED','PAYMENT_SETTLED','IMPLEMENTATION_REPORTED','VERIFICATION_RECORDED')),
  PRIMARY KEY (step_id, event_type)
);

CREATE TABLE IF NOT EXISTS expected_control_step_evidence_expectation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_id uuid NOT NULL REFERENCES expected_control_step(id) ON DELETE CASCADE,
  evidence_type text NOT NULL,
  minimum_count integer NOT NULL CHECK (minimum_count >= 0),
  source_class text,
  required_attributes text[] NOT NULL DEFAULT '{}',
  accepted_assertion_kinds text[] NOT NULL DEFAULT '{}',
  availability_requirement text CHECK (availability_requirement IS NULL OR availability_requirement IN ('AVAILABLE','MAY_BE_WITHHELD')),
  UNIQUE (step_id, evidence_type, source_class)
);

CREATE TABLE IF NOT EXISTS expected_control_path_provenance (
  expected_control_path_id uuid NOT NULL REFERENCES expected_control_path(id) ON DELETE CASCADE,
  provenance_id uuid NOT NULL REFERENCES provenance_record(id),
  PRIMARY KEY (expected_control_path_id, provenance_id)
);

CREATE TABLE IF NOT EXISTS expected_control_step_provenance (
  expected_control_step_id uuid NOT NULL REFERENCES expected_control_step(id) ON DELETE CASCADE,
  provenance_id uuid NOT NULL REFERENCES provenance_record(id),
  PRIMARY KEY (expected_control_step_id, provenance_id)
);

CREATE TABLE IF NOT EXISTS expected_control_path_idempotency (
  idempotency_key text PRIMARY KEY,
  operation text NOT NULL,
  request_hash text NOT NULL,
  expected_control_path_id uuid NOT NULL REFERENCES expected_control_path(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS expected_control_path_lookup_idx ON expected_control_path(control_path_key, version);
CREATE INDEX IF NOT EXISTS expected_control_path_status_idx ON expected_control_path(status, validity_from, validity_to);
