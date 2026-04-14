# OpenZen — `process.json` schema reference

The `process.json` file is the machine-readable editorial workflow record for a critical edition. It lives alongside `manifest.json` in `xml-open/{prefix}/{slug}/` and is referenced by the manifest's `process_file` field.

The manifest answers "what is this text and what license applies." The process file answers "how was this edition produced, and can the process be audited."

## Top-level sections

### `project`

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | Human-readable project name |
| `slug` | string | yes | The text slug (matches the directory name) |
| `edition_kind` | string | yes | Must match `manifest.json` `edition_kind` |
| `target_maturity` | enum | yes | One of: `draft`, `review`, `publication-candidate`, `published` |
| `curator` | string | yes | Who is responsible for this edition |
| `start_date` | string (ISO 8601) | yes | When editorial work began |

### `base_witness`

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Must match a witness `id` in the manifest's `witnesses_consulted` |
| `label` | string | yes | Human-readable label |
| `selection_rationale` | string | yes | Why this witness was chosen as base text |

### `witness_families`

Array of witness family objects. Required for critical editions with multiple witness families.

| Field | Type | Required | Notes |
|---|---|---|---|
| `family_id` | string | yes | Short identifier (e.g. `四部録`, `standalone`) |
| `family_name` | string | yes | Human-readable family name |
| `members` | string[] | yes | Witness IDs belonging to this family |
| `relationship_notes` | string | optional | How members relate to each other within the family |

### `ocr_pipeline`

| Field | Type | Required | Notes |
|---|---|---|---|
| `engines` | array | yes | One entry per OCR engine used. See engine fields below |
| `default_engine` | string | yes | Name of the engine used as primary OCR source |
| `evaluation_method` | string | yes | How engines were compared (e.g. `sample-page-character-accuracy`) |

#### Engine fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | Engine name (e.g. `tesseract`, `rapidocr`, `paddleocr`) |
| `version` | string | yes | Engine version |
| `model` | string | optional | Model or language pack used |
| `parameters` | string | optional | Non-default parameters applied |
| `run_date` | string (ISO 8601) | yes | When this engine was run |

### `segmentation_pipeline`

| Field | Type | Required | Notes |
|---|---|---|---|
| `method` | string | yes | How pages were segmented (e.g. `manual-leaf-split`, `auto-crop`) |
| `page_map_file` | string | optional | Relative path to the page-map CSV |
| `notes` | string | optional | Additional segmentation notes |

### `human_passes`

Array of human intervention records. Each entry documents one pass of human work.

| Field | Type | Required | Notes |
|---|---|---|---|
| `pass_id` | string | yes | Unique identifier for this pass |
| `witness_id` | string | yes | Which witness was being worked on |
| `pages_or_loci` | string | yes | Which pages or loci were touched |
| `reason` | string | yes | Why human intervention was needed |
| `change_type` | enum | yes | One of: `ocr-confirm`, `ocr-reject`, `image-only-recovery`, `cross-witness-decision` |
| `date` | string (ISO 8601) | yes | When this pass was performed |

### `decision_records`

Array of editorial decision records. Each entry documents one non-trivial editorial choice.

| Field | Type | Required | Notes |
|---|---|---|---|
| `decision_id` | string | yes | Unique identifier |
| `locus` | string | yes | Where in the text this decision applies |
| `issue` | string | yes | What the problem was |
| `options_considered` | string[] | yes | What readings or approaches were considered |
| `evidence` | string | yes | What evidence informed the decision |
| `chosen_reading` | string | yes | What was adopted |
| `reversibility` | string | yes | Whether and how this decision could be reversed |
| `affected_loci` | string[] | optional | Other loci affected by this decision |

### `coverage`

| Field | Type | Required | Notes |
|---|---|---|---|
| `total_pages` | integer | yes | Total pages across all witnesses |
| `segmented_pages` | integer | yes | Pages that have been segmented |
| `ocr_pages` | integer | yes | Pages that have been OCR'd |
| `human_checked_pages` | integer | yes | Pages that have had human review |
| `percent_complete` | number | yes | Overall completion percentage (0–100) |

### `unresolved_loci`

Array of loci where the edition has not reached a final decision.

| Field | Type | Required | Notes |
|---|---|---|---|
| `locus_id` | string | yes | Unique identifier for this locus |
| `reason` | string | yes | Why this locus is unresolved |
| `missing_evidence` | string | yes | What evidence would be needed to resolve it |
| `publication_status` | enum | yes | One of: `must-resolve-before-publication`, `publishable-with-note` |

### `publication_checks`

All fields are boolean. A critical edition is not publishable unless all required checks are `true`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `all_witness_rights_confirmed` | boolean | yes | Every witness has high-confidence rights or an explicit waiver |
| `all_hashes_valid` | boolean | yes | Every witness file matches its `captured_sha256` |
| `segmentation_complete` | boolean | yes | All pages are segmented |
| `ocr_recorded` | boolean | yes | All OCR runs are recorded with engine, version, and date |
| `ocr_benchmark_exists` | boolean | yes | At least one engine comparison exists |
| `human_passes_logged` | boolean | yes | All human intervention is documented |
| `apparatus_exists` | boolean | yes | An apparatus file exists with at least one entry |
| `unresolved_classified` | boolean | yes | All unresolved loci have a `publication_status` |
| `tei_validates` | boolean | yes | The TEI file parses cleanly |
| `all_artifacts_validate` | boolean | yes | manifest, process, apparatus, stats, and documents files all validate |

## Validation

A `process.json` is valid if:

1. `project.slug` matches the directory name
2. `project.edition_kind` matches the manifest
3. `base_witness.id` references a witness in the manifest
4. All `witness_families[].members[]` reference witnesses in the manifest
5. All `human_passes[].witness_id` values reference witnesses in the manifest
6. `publication_checks` fields are all present (values may be `false` for in-progress editions)
