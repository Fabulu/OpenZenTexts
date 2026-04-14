# OpenZen — `witnesses.json` schema reference

The `witnesses.json` file (also accepted as `witness-texts.json` for backwards compatibility) is the definitive witness delivery registry for a critical edition. It lives alongside `manifest.json` in `xml-open/{prefix}/{slug}/`.

Every published critical edition must ship definitive delivered text packages for each witness. This file is the machine-readable registry that tells the app what witness texts exist, where they live, and what their status is.

This enables the **Witness Comparison** surface — a separate UI from the critical text and the timeline.

## Design principle

These are three separate things:
1. The critical edition reading text (the main reader surface)
2. Witness-text comparison (what do the sources say?)
3. Editorial history / timeline replay (how was the text built?)

This file supports #2. Do not conflate it with #1 or #3.

## Top-level structure

```json
{
  "text_id": "ce.faith-in-mind",
  "witnesses": [ ... ]
}
```

## Witness entry fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `witness_id` | string | yes | Must match a witness ID in the manifest |
| `siglum` | string | recommended | Stable siglum (e.g., "T1", "A3") |
| `label` | string | yes | Human-readable label |
| `family_id` | string | optional | Witness family |
| `role` | string | yes | One of: `base`, `primary_collation`, `secondary_collation`, `context_only` |
| `definitive_text_file` | string | conditional | Relative path to the definitive witness text file. Required unless no text exists |
| `text_format` | enum | recommended | One of: `plain_text`, `json_loci`, `tei`, `markdown` |
| `text_status` | enum | yes | One of: `raw_ocr`, `normalized`, `corrected_working`, `definitive_witness_text` |
| `completeness` | enum | optional | One of: `complete`, `partial`, `fragment` |
| `confidence` | enum | optional | One of: `high`, `medium`, `low` |
| `has_locus_map` | boolean | yes | Whether a locus map exists |
| `locus_map_file` | string | conditional | Relative path to JSON locus map (locus_id → text). Required if has_locus_map is true |
| `source_readme` | string | optional | Relative path to the witness README / source documentation |
| `has_ocr` | boolean | yes | Whether OCR has been run |
| `has_human_check` | boolean | yes | Whether a human has reviewed the text |
| `readings` | object | optional | Inline locus-level readings (key = locus_id, value = reading text). Used when a separate locus map doesn't exist |

## Usage

The app uses this file to:
1. List available witnesses for comparison
2. Load witness text for a selected locus
3. Show which witnesses support which reading in the apparatus

## When to create

Create `witness-texts.json` when:
- OCR outputs exist for at least one witness
- Or transcribed text exists for at least one witness
- Or locus-level readings have been collated

Do not create it for single-witness transcriptions (like Wikisource imports) — there is nothing to compare.
