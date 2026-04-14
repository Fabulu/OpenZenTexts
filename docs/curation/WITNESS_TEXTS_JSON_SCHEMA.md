# OpenZen — `witness-texts.json` schema reference

The `witness-texts.json` file is the programmatic registry of witness text data for a critical edition. It lives alongside `manifest.json` in `xml-open/{prefix}/{slug}/`.

This enables the **Witness Comparison** surface — a separate UI from the critical text and the timeline. The critical text is the edited edition. The witness comparison shows what the individual source witnesses actually read at each locus.

## Design principle (from the Witness Comparison Brief)

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
| `siglum` | string | optional | Stable siglum (e.g., "T1", "A3"). May differ from witness_id |
| `label` | string | yes | Human-readable label |
| `family_id` | string | optional | Witness family (e.g., "standalone", "shiburoku") |
| `text_type` | enum | yes | One of: `ocr`, `transcription`, `tei`, `image` |
| `text_path` | string | conditional | Relative path to the witness text file. Required unless text_type is `image` |
| `readings` | object | optional | Locus-level readings: key = locus_id, value = reading text. Populated post-collation |
| `has_ocr` | boolean | yes | Whether OCR has been run on this witness |
| `has_human_check` | boolean | yes | Whether a human has reviewed the text |

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
