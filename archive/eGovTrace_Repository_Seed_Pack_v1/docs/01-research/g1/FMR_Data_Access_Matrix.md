
# 34. Concrete G1 Population Template

This section converts the G1 design into a population instrument.

## 34.1 Source Registry Record Template

One row represents one distinct source/system/dataset access surface.

```yaml
source_id: G1-SRC-0001
source_name: ""
owning_institution: ""
system_name: ""
official_locator: ""
data_domain: ""
source_authority_level: PRIMARY_AUTHORITATIVE | OFFICIAL_DERIVED | OFFICIAL_SECONDARY | THIRD_PARTY_REPRODUCTION | MEDIA_OR_CSO | CONTEXTUAL
primary_data_grain: ""
coverage_start: ""
coverage_end: ""
versioning: YES | NO | UNKNOWN
update_frequency: ""
access_actor: ANONYMOUS_PUBLIC | REGISTERED_PUBLIC | PAID_PUBLIC | ORDINARY_REQUESTER | AUTHORIZED_RESEARCHER | PARTNER_INSTITUTION | AUTHORIZED_GOVERNMENT | UNKNOWN
visibility: PUBLIC_FIELD | PUBLIC_DERIVED | AUTHENTICATED_PUBLIC | PAID_ACCESS | REQUEST_BASED | AUTHORIZED_ACCESS | RESTRICTED | UNRESOLVED
access_method: PORTAL | DOWNLOAD | API | REQUEST | PAID_SERVICE | PARTNERSHIP | OTHER | UNKNOWN
lawful_access_basis: PUBLICATION | OPEN_DATA_RELEASE | STATUTORY_ACCESS | ADMINISTRATIVE_REQUEST | PAID_OFFICIAL_SERVICE | AUTHORIZED_ROLE | PARTNERSHIP | UNRESOLVED
viewable: YES | NO | UNKNOWN
downloadable: YES | NO | UNKNOWN
machine_extractable: YES | NO | UNKNOWN
api_accessible: YES | NO | UNKNOWN
repeatably_retrievable: YES | NO | UNKNOWN
stable_locator: YES | NO | UNKNOWN
access_constraints: []
notes: ""
verification_date: ""
verification_evidence: ""
```

## 34.2 Field Access Record Template

One row represents one specific field or representation requirement.

```yaml
matrix_id: G1-FLD-0001
g0_object: ""
g0_representation: ""
required_field: ""
analytical_purpose: ""
candidate_source_id: G1-SRC-0001
native_field_name: ""
data_grain: ""
native_identifier: ""
identifier_type: ""
identifier_unique: YES | NO | UNKNOWN
identifier_stable: YES | NO | UNKNOWN
identifier_persistent: YES | NO | UNKNOWN
identifier_public: YES | NO | UNKNOWN
cross_referenced: YES | NO | UNKNOWN
access_actor: ANONYMOUS_PUBLIC | REGISTERED_PUBLIC | PAID_PUBLIC | ORDINARY_REQUESTER | AUTHORIZED_RESEARCHER | PARTNER_INSTITUTION | AUTHORIZED_GOVERNMENT | UNKNOWN
visibility: PUBLIC_FIELD | PUBLIC_DERIVED | AUTHENTICATED_PUBLIC | PAID_ACCESS | REQUEST_BASED | AUTHORIZED_ACCESS | RESTRICTED | UNRESOLVED
access_method: PORTAL | DOWNLOAD | API | REQUEST | PAID_SERVICE | PARTNERSHIP | OTHER | UNKNOWN
lawful_access_basis: PUBLICATION | OPEN_DATA_RELEASE | STATUTORY_ACCESS | ADMINISTRATIVE_REQUEST | PAID_OFFICIAL_SERVICE | AUTHORIZED_ROLE | PARTNERSHIP | UNRESOLVED
cost: FREE | PAID | UNKNOWN
login_required: YES | NO | UNKNOWN
api_key_required: YES | NO | UNKNOWN
captcha: YES | NO | UNKNOWN
rate_limit: YES | NO | UNKNOWN
machine_extractable: YES | NO | UNKNOWN
api_accessible: YES | NO | UNKNOWN
bulk_accessible: YES | NO | UNKNOWN
repeatably_retrievable: YES | NO | UNKNOWN
stable_locator: YES | NO | UNKNOWN
coverage_start: ""
coverage_end: ""
versioned: YES | NO | UNKNOWN
event_date_available: YES | NO | UNKNOWN
publication_date_available: YES | NO | UNKNOWN
observation_date_available: YES | NO | UNKNOWN
source_authority_level: PRIMARY_AUTHORITATIVE | OFFICIAL_DERIVED | OFFICIAL_SECONDARY | THIRD_PARTY_REPRODUCTION | MEDIA_OR_CSO | CONTEXTUAL
substitute_source_id: ""
substitute_reason: ""
substitute_authority_level: ""
substitute_limitations: ""
join_capability: DIRECT_CROSS_REFERENCE | SHARED_IDENTIFIER | REFERENCED_IDENTIFIER | COMMON_ATTRIBUTE | GEOGRAPHIC_JOIN | TEMPORAL_JOIN | SEMANTIC_MATCH_REQUIRED | NO_KNOWN_JOIN | UNKNOWN
identity_utility: HIGH | MEDIUM | LOW | NONE | UNKNOWN
temporal_utility: HIGH | MEDIUM | LOW | NONE | UNKNOWN
geographic_utility: HIGH | MEDIUM | LOW | NONE | UNKNOWN
financial_utility: HIGH | MEDIUM | LOW | NONE | UNKNOWN
procurement_utility: HIGH | MEDIUM | LOW | NONE | UNKNOWN
contract_utility: HIGH | MEDIUM | LOW | NONE | UNKNOWN
organizational_utility: HIGH | MEDIUM | LOW | NONE | UNKNOWN
physical_evidence_utility: HIGH | MEDIUM | LOW | NONE | UNKNOWN
lifecycle_utility: HIGH | MEDIUM | LOW | NONE | UNKNOWN
auditing_utility: HIGH | MEDIUM | LOW | NONE | UNKNOWN
outcome_utility: HIGH | MEDIUM | LOW | NONE | UNKNOWN
research_usability: USABLE | CONDITIONALLY_USABLE | MANUAL_ONLY | LIMITED | NOT_CURRENTLY_USABLE | UNRESOLVED | NOT_APPLICABLE
search_status: NOT_SEARCHED | SEARCHED_NOT_FOUND | KNOWN_UNAVAILABLE | ACCESS_RESTRICTED | AVAILABLE | PARTIALLY_AVAILABLE | UNRESOLVED | NOT_APPLICABLE
final_access_status: AVAILABLE | PARTIALLY_AVAILABLE | UNAVAILABLE | RESTRICTED | UNRESOLVED | NOT_APPLICABLE
verification_date: ""
verification_evidence: ""
notes: ""
```

---

# 35. Mandatory vs Optional Fields

The matrix must distinguish fields that are required for a defensible G1 determination from fields that are useful but may be unavailable or inapplicable.

## 35.1 Mandatory for every Source Registry record

| Field | Mandatory? |
|---|---|
| Source ID | YES |
| Source name | YES |
| Owning institution | YES |
| System name | YES |
| Official locator/access route | YES, or explicitly `UNKNOWN` |
| Data domain | YES |
| Source authority level | YES |
| Primary data grain | YES, or `UNKNOWN` |
| Access actor | YES |
| Visibility | YES |
| Access method | YES |
| Lawful access basis | YES |
| Verification date | YES |
| Verification evidence | YES |
| Initial status | YES |

## 35.2 Optional for Source Registry

These may remain `UNKNOWN` when the source does not expose them:

- update frequency;
- version history;
- complete historical coverage;
- API availability;
- bulk access;
- rate limits;
- detailed access constraints.

## 35.3 Mandatory for every Field Access record

A field may be recorded as unavailable, but the row itself must not omit the reason for that disposition.

Mandatory:

- Matrix ID
- G0 object / representation
- Required field
- Analytical purpose
- Candidate source
- Native field name, or `UNKNOWN`
- Data grain
- Native identifier status
- Access actor
- Visibility
- Access method
- Lawful access basis
- Source authority level
- Search status
- Final access status
- Reconciliation utility classification
- Research usability
- Verification date
- Verification evidence
- Notes/limitations

## 35.4 Conditionally mandatory

The following are mandatory when applicable:

- cost, when paid access is possible;
- authentication requirements, when access is authenticated;
- temporal fields, when historical reconciliation is required;
- observation date, for physical evidence;
- identifier type, when a native identifier exists;
- substitute source, when the preferred source is unavailable;
- substitute limitations, when a substitute is used;
- join capability, when another source is intended to be reconciled with the field.

## 35.5 Optional fields

These may remain unknown without preventing a G1 determination unless they become necessary for the specific experiment:

- API rate limits;
- internal source-system version;
- bulk-download size limits;
- update frequency where not published;
- non-essential descriptive metadata;
- outcome utility for fields that have no outcome relevance;
- corporate/organizational details not required by the selected reconciliation test.

### Rule

`Optional ≠ unnecessary forever.`

An optional field becomes mandatory if the actual experiment demonstrates that it is necessary to establish a required reconciliation relationship.

---

# 36. Legal-Access Terminology — Final Controlled Vocabulary

The word **"legal"** must not be used as shorthand for "publicly visible."

G1 is an access-and-evidence research instrument, not a legal-opinion engine. It records the access basis that has actually been established and leaves unresolved questions explicitly unresolved.

## 36.1 Access mode

**PUBLIC_ACCESS**

The information is intentionally made available by the source to the public without an individualized authorization decision.

**AUTHENTICATED_PUBLIC_ACCESS**

Ordinary registration/login is required, but no special institutional authorization has been established.

**PAID_OFFICIAL_ACCESS**

Access is available through an official paid service/process available to the requesting public or eligible users.

**REQUEST_BASED_ACCESS**

Access depends on an official request process and an agency/source decision or fulfillment process.

**ROLE_AUTHORIZED_ACCESS**

Access requires a defined institutional role or authorization beyond ordinary public access.

**PARTNER_ACCESS**

Access depends on a formal institutional partnership, research arrangement, or equivalent cooperation.

**RESTRICTED_ACCESS**

Access is materially limited by an applicable restriction, such as privacy, confidentiality, security, or another established access control.

**UNRESOLVED_ACCESS**

The research has not established a reliable access basis.

## 36.2 Legal/access basis

Where established, record the mechanism by which access is available:

- PUBLICATION
- OPEN_DATA_RELEASE
- STATUTORY_ACCESS
- ADMINISTRATIVE_REQUEST
- PAID_OFFICIAL_SERVICE
- AUTHORIZED_ROLE
- PARTNERSHIP
- UNRESOLVED

These terms describe an **access pathway**, not a legal opinion that the researcher may use every field for every conceivable purpose.

## 36.3 Terms to avoid

Do not use these ambiguous labels in the G1 matrix:

- "legal data"
- "illegal data"
- "public = unrestricted"
- "government can access, therefore researcher can access"
- "not public = prohibited"
- "FOI required"

Replace them with the controlled vocabulary above.

## 36.4 FOI / RTI terminology

FOI/RTI must be recorded only as a specific access mechanism when the relevant legal regime and request procedure actually apply.

Do not use:

> `FOI BLOCKED`

as a generic label for inaccessible data.

Use:

> `UNRESOLVED_ACCESS`

and record whether an existing request-based route, statutory route, paid official service, authorized route, or partnership route has been established.

---

# 37. Field-Level Population Rules

## Rule 1 — Never populate from assumption

If a field has not been verified, use `UNKNOWN`, `UNRESOLVED`, or the appropriate non-observation state.

## Rule 2 — Public visibility must be demonstrated

A source being mentioned in a government report does not prove that the underlying field is publicly accessible.

## Rule 3 — Field access overrides source assumptions

A public source may contain restricted, missing, derived, or incomplete fields.

## Rule 4 — Preserve original terminology

Record the source's native field name before creating a normalized research field.

## Rule 5 — Preserve the source's grain

Never turn a project-level source into a contract-level claim merely because the information appears related.

## Rule 6 — Record the join mechanism

If a field is expected to reconcile with another source, the mechanism must be documented.

## Rule 7 — Record non-observation honestly

`SEARCHED_NOT_FOUND` is different from `KNOWN_UNAVAILABLE`.

## Rule 8 — Preserve temporal limitations

A current source cannot automatically satisfy a historical evidence requirement.

## Rule 9 — Preserve authority differences

A substitute can increase observability while decreasing evidentiary authority. Record both.

## Rule 10 — No silent legal conclusion

G1 records access conditions and documented access bases; it does not declare a field "lawful" or "unlawful" beyond what is actually established by the research.

---

# 38. Minimum Population Order

To keep G1 manageable, populate in this order:

### Population Pass A — Source Discovery

Create the Source Registry records only.

### Population Pass B — Core FMR Fields

Populate the fields required for:

1. intervention/project identity;
2. administrative geography;
3. stated scope;
4. lifecycle dates;
5. procurement identity;
6. contractor/legal-entity identity;
7. physical/geospatial representation.

### Population Pass C — Financial Chain

Populate, where obtainable:

1. appropriation/funding;
2. allocation/allotment;
3. obligation;
4. procurement value;
5. contract value;
6. contract modifications;
7. payment/disbursement.

### Population Pass D — Evidence and Oversight

Populate:

- inspection;
- completion/acceptance;
- audit;
- physical observations;
- citizen evidence;
- imagery;
- missing/expected observations.

### Population Pass E — Reconciliation Utility

After actual fields are populated, identify which fields establish usable joins.

This order prevents spending early effort on corporate or sensitive records before the core project identity can be established.

---

# 39. G1 Completion Standard

G1 is complete when every **mandatory field required for the selected FMR experiment** has a documented status, even when that status is:

- UNKNOWN;
- UNRESOLVED;
- KNOWN_UNAVAILABLE;
- ACCESS_RESTRICTED;
- PARTIALLY_AVAILABLE.

The matrix is not incomplete merely because some data cannot be obtained.

It is incomplete when the research has failed to record what the access state actually is.

---

# 40. Updated G1 Status

**Design:** LOCKED

**Population template:** DEFINED

**Mandatory/optional field policy:** DEFINED

**Legal/access terminology:** LOCKED

**Artifact status:** READY FOR ACTUAL SOURCE-BY-SOURCE POPULATION

The next operation is no longer ontology design. It is empirical population of the matrix against the actual FMR data-access surface.
