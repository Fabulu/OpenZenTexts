# OpenZen — `timeline.json` schema reference

The `timeline.json` file is the canonical chronological event stream for a critical edition. It lives alongside `manifest.json` in `xml-open/{prefix}/{slug}/` and is referenced by the manifest's `timeline_file` field and by `process.json`'s `timeline_file` field.

This is the backbone of the visible build history. The app uses it to power the timeline slider, state reconstruction, and event inspection.

## Top-level structure

```json
{
  "text_id": "ce.faith-in-mind",
  "events": [ ... ]
}
```

## Ordering rule

Every event has `event_id`, `sequence`, and `timestamp`. `sequence` is authoritative for ordering if timestamps collide. Events are stored newest-last (ascending sequence).

## Event fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `event_id` | string | yes | Unique identifier (e.g. `evt_000001`) |
| `sequence` | integer | yes | Authoritative ordering number (ascending) |
| `timestamp` | string (ISO 8601) | yes | When this event occurred |
| `stage` | enum | yes | Which pipeline stage this belongs to. See required stages below |
| `event_type` | enum | yes | What kind of event. See required event types below |
| `object_type` | string | yes | What kind of thing was affected (e.g. `witness_file`, `apparatus_entry`, `reading`, `ocr_run`) |
| `object_id` | string | yes | ID of the affected object (e.g. witness siglum, locus ID) |
| `summary` | string | yes | One-line human summary |
| `details` | string | optional | Multi-line explanation of what happened and why |
| `actor_type` | enum | yes | One of: `human`, `agent`, `machine`, `hybrid` |
| `actor_id` | string | yes | Who did this (username, agent name, tool name) |
| `inputs` | string[] | optional | Files or artifacts consumed |
| `outputs` | string[] | optional | Files or artifacts produced |
| `evidence_links` | string[] | optional | URLs to external evidence (Commons, NDL, etc.) |
| `state_effects` | object | optional | Key-value pairs describing what changed in edition state |
| `decision_ref` | string | optional | Links to a decision record ID |
| `note_anchor_id` | string | optional | Links to a TEI note anchor (`nkr_note_*`) if this event affects visible text |
| `supersedes` | string[] | optional | Event IDs that this event replaces or corrects |
| `status` | enum | yes | One of: `applied`, `reverted`, `superseded` |

## Required stages

| Stage | Description |
|---|---|
| `project_setup` | Edition charter and initial planning |
| `witness_search` | Finding and evaluating potential witnesses |
| `witness_validation` | Downloading, hashing, verifying witnesses |
| `witness_lock` | Finalizing the witness set |
| `sigla_freeze` | Assigning stable sigla to witnesses |
| `copy_text_selection` | Ranking and selecting the copy text / base witness |
| `ocr` | Running OCR engines |
| `segmentation` | Page/leaf segmentation |
| `collation` | Comparing readings across witnesses |
| `apparatus` | Building the critical apparatus |
| `reading_text` | Constructing the reading edition text |
| `review` | Editorial review and QA |
| `publication` | Final checks and publication |

## Required event types

| Event Type | Description |
|---|---|
| `project_started` | Edition work begins |
| `witness_found` | A potential witness is identified |
| `witness_rejected` | A witness is excluded from the edition |
| `witness_tier_changed` | A witness changes role (e.g. primary → secondary) |
| `witness_set_locked` | The witness set is finalized |
| `sigla_frozen` | Stable sigla assigned |
| `download_attempted` | File download started |
| `download_failed` | File download failed |
| `download_replaced` | A bad download was replaced with a good one |
| `hash_recorded` | SHA-256 hash captured |
| `hash_changed` | Hash changed (re-download, correction) |
| `validation_passed` | File validation succeeded |
| `validation_failed` | File validation failed |
| `ocr_started` | OCR engine run began |
| `ocr_finished` | OCR engine run completed |
| `ocr_failed` | OCR engine run failed |
| `segmentation_started` | Segmentation began |
| `segmentation_finished` | Segmentation completed |
| `copy_text_ranked` | Copy text candidates ranked |
| `copy_text_selected` | Base / copy text chosen |
| `decision_made` | An editorial decision was recorded |
| `apparatus_entry_added` | New apparatus entry created |
| `apparatus_entry_changed` | Existing apparatus entry modified |
| `unresolved_opened` | New unresolved locus identified |
| `unresolved_closed` | Unresolved locus resolved |
| `text_changed` | The reading text was modified |
| `publication_check_changed` | A publication checklist item changed |

## `text_changed` event — additional fields

When `event_type` is `text_changed`, the `state_effects` object must include:

| Field | Type | Required | Notes |
|---|---|---|---|
| `locus_id` | string | yes | Which locus was affected |
| `previous_reading` | string | yes | The old reading |
| `new_reading` | string | yes | The new reading |
| `change_kind` | enum | yes | One of: `selection`, `normalization`, `segmentation`, `punctuation`, `character_choice`, `apparatus_only` |
| `reason` | string | yes | Why this change was made |
| `witness_support` | string[] | optional | Which witnesses support the new reading |
| `note_anchor_id` | string | optional | TEI note anchor if a visible note exists |

## State reconstruction

The timeline supports state reconstruction at any event step. By replaying events from sequence 1 to N, the app can derive:

- Accepted witnesses (from `witness_found` minus `witness_rejected`)
- Rejected witnesses
- Current witness tiers (from `witness_tier_changed`)
- Current copy-text candidate/selection
- Current unresolved loci (from `unresolved_opened` minus `unresolved_closed`)
- Current OCR status (from `ocr_started`/`ocr_finished`/`ocr_failed`)
- Current apparatus count (from `apparatus_entry_added`/`apparatus_entry_changed`)
- Current edition maturity (from `publication_check_changed`)

## Validation

A `timeline.json` is valid if:

1. Every `event_id` is unique
2. Every `sequence` is unique and consecutive
3. Events are ordered by `sequence` ascending
4. Every `stage` is one of the required stages
5. Every `event_type` is one of the required event types
6. Every `text_changed` event has the required `state_effects` fields
7. Every `decision_ref` references a decision in `process.json`
8. Every `note_anchor_id` references an anchor in the TEI file
