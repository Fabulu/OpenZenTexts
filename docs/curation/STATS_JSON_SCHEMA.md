# OpenZen — `stats.json` schema reference

The `stats.json` file is a compact derived summary for a critical edition. It lives alongside `manifest.json` in `xml-open/{prefix}/{slug}/` and is referenced by the manifest's `stats_file` field.

This file is generated from the process and apparatus data. It exists so the app can display edition statistics without parsing the full process and apparatus files.

## Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `witness_count` | integer | yes | Total number of witnesses consulted |
| `witness_family_count` | integer | yes | Number of distinct witness families |
| `page_count` | integer | yes | Total pages across all witnesses |
| `leaf_count` | integer | yes | Total leaves (a leaf may contain two pages) |
| `ocr_engine_count` | integer | yes | Number of OCR engines used |
| `percent_machine_resolved` | number | yes | Percentage of loci resolved by OCR alone (0–100) |
| `percent_human_intervention` | number | yes | Percentage of loci requiring human intervention (0–100) |
| `unresolved_count` | integer | yes | Number of loci still unresolved |
| `apparatus_entry_count` | integer | yes | Total entries in the apparatus |
| `base_text_confidence` | object | yes | Distribution of confidence levels. See below |
| `generated_utc` | string (ISO 8601) | yes | When this stats file was generated |

### `base_text_confidence`

| Field | Type | Required | Notes |
|---|---|---|---|
| `high` | integer | yes | Number of loci with high confidence |
| `medium` | integer | yes | Number of loci with medium confidence |
| `low` | integer | yes | Number of loci with low confidence |

## Validation

A `stats.json` is valid if:

1. All integer fields are non-negative
2. Percentage fields are in the range 0–100
3. `percent_machine_resolved` + `percent_human_intervention` does not exceed 100
4. `generated_utc` is a valid ISO 8601 timestamp
5. `base_text_confidence.high` + `medium` + `low` equals `apparatus_entry_count` (when apparatus entries all have confidence ratings)
