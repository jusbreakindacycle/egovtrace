CREATE TABLE IF NOT EXISTS reconciliation_run (
  id uuid PRIMARY KEY,
  control_path_id uuid NOT NULL REFERENCES expected_control_path(id),
  control_path_version integer NOT NULL CHECK (control_path_version > 0),
  observation_scope jsonb NOT NULL DEFAULT '{}',
  algorithm_version text NOT NULL,
  executed_at timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('CREATED','COMPLETED','FAILED','FINALIZED')),
  record_version integer NOT NULL DEFAULT 1 CHECK (record_version > 0),
  idempotency_key text NOT NULL UNIQUE,
  request_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS reconciliation_step_input (
  reconciliation_run_id uuid NOT NULL REFERENCES reconciliation_run(id) ON DELETE CASCADE,
  step_key text NOT NULL,
  applicability text NOT NULL CHECK (applicability IN ('APPLICABLE','INAPPLICABLE','UNKNOWN')),
  PRIMARY KEY (reconciliation_run_id, step_key)
);
CREATE TABLE IF NOT EXISTS reconciliation_step_result (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reconciliation_run_id uuid NOT NULL REFERENCES reconciliation_run(id) ON DELETE CASCADE,
  step_key text NOT NULL,
  status text NOT NULL CHECK (status IN ('MATCHED','MULTIPLE_MATCHES','NOT_OBSERVED','UNAVAILABLE','OUT_OF_SCOPE','INAPPLICABLE','INSUFFICIENT_INFORMATION','CONFLICTING_OBSERVATIONS')),
  selected_event_id uuid REFERENCES government_event(id),
  reason_codes text[] NOT NULL DEFAULT '{}',
  UNIQUE (reconciliation_run_id, step_key)
);
CREATE TABLE IF NOT EXISTS reconciliation_step_candidate (
  step_result_id uuid NOT NULL REFERENCES reconciliation_step_result(id) ON DELETE CASCADE,
  event_id uuid NOT NULL REFERENCES government_event(id),
  candidate_ordinal integer NOT NULL CHECK (candidate_ordinal >= 0),
  PRIMARY KEY (step_result_id, event_id),
  UNIQUE (step_result_id, candidate_ordinal)
);
CREATE TABLE IF NOT EXISTS reconciliation_match_explanation (
  step_result_id uuid NOT NULL REFERENCES reconciliation_step_result(id) ON DELETE CASCADE,
  event_id uuid NOT NULL REFERENCES government_event(id),
  matched_criteria text[] NOT NULL DEFAULT '{}',
  PRIMARY KEY (step_result_id, event_id)
);
CREATE INDEX IF NOT EXISTS reconciliation_run_control_path_idx ON reconciliation_run(control_path_id, control_path_version, executed_at DESC);
CREATE INDEX IF NOT EXISTS reconciliation_run_status_idx ON reconciliation_run(status, executed_at DESC);
CREATE INDEX IF NOT EXISTS reconciliation_step_result_run_idx ON reconciliation_step_result(reconciliation_run_id);
