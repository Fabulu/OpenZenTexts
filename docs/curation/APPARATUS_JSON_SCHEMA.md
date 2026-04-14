# OpenZen — `apparatus.json` schema reference

The `apparatus.json` file is the machine-readable variant and apparatus layer for a critical edition. It lives alongside `manifest.json` in `xml-open/{prefix}/{slug}/` and is referenced by the manifest's `apparatus_file` field.

Footnotes in the TEI (`nkr_note_crit_*` anchors) are the reader-facing surface. This file is the data backbone — full variant tables, witness-by-witness evidence, and machine-readable statistics for filtering and aggregation in the UI.

## Top-level structure

```json
{
  "entries": [ ... ]
}
```

## Entry fields

Each entry in `entries[]` describes one variant-bearing locus.

| Field | Type | Required | Notes |
|---|---|---|---|
| `locus_id` | string | yes | Unique identifier for this locus within the edition |
| `tei_target` | string | optional | The `#nkr_note_crit_*` anchor ID this entry corresponds to in the TEI. Omit if no TEI footnote exists for this locus |
| `section` | string | yes | Which section of the text (e.g. case number, verse, paragraph) |
| `lemma` | string | yes | The base-text reading adopted in the edition |
| `readings` | array | yes | One entry per variant reading. See reading fields below |
| `witnesses_supporting` | string[] | yes | Witness IDs that support the lemma (the adopted reading) |
| `decision` | string | yes | What was chosen and adopted |
| `decision_basis` | string | yes | Why this reading was chosen over alternatives |
| `status` | enum | yes | One of: `resolved`, `unresolved`, `publishable-with-note` |

## Reading fields

Each entry in `readings[]` describes one witness's reading at this locus.

| Field | Type | Required | Notes |
|---|---|---|---|
| `witness_id` | string | yes | Must match a witness `id` in the manifest |
| `reading` | string | yes | The text this witness has at this locus |
| `certainty` | enum | yes | One of: `high`, `medium`, `low` |
| `is_ocr_only` | boolean | yes | Whether this reading comes solely from OCR with no human verification |
| `is_human_checked` | boolean | yes | Whether a human has verified this reading against the source |

## Validation

An `apparatus.json` is valid if:

1. Every `locus_id` is unique within the file
2. Every `readings[].witness_id` references a witness in the manifest
3. Every `witnesses_supporting[]` value references a witness in the manifest
4. Every `tei_target` value (when present) corresponds to an anchor in the TEI file
5. Every entry has at least one reading
6. `status` is one of the three allowed values
