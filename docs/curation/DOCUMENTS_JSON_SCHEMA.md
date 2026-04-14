# OpenZen — `documents.json` schema reference

The `documents.json` file is a curated registry of human-readable documents associated with an edition. It lives alongside `manifest.json` in `xml-open/{prefix}/{slug}/` and is referenced by the manifest's `documents_file` field.

This replaces the previous approach of auto-discovering all `.md` files under `provenance/{slug}/`. Instead, the curator explicitly declares which documents are relevant and how they should be categorized in the app.

## Top-level structure

```json
{
  "documents": [ ... ]
}
```

## Document fields

Each entry in `documents[]` describes one human-readable document.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Unique identifier within this edition (e.g. `process-log`, `ndl-witness-readme`) |
| `title` | string | yes | Display title shown in the UI |
| `path` | string | yes | Relative path from the text directory to the document file (e.g. `../../../provenance/wumenguan-1632/witnesses/wumenguan-1632-ndl-README.md`) |
| `category` | enum | yes | One of: `process`, `apparatus`, `witness`, `editorial`, `general`. Controls which tab the document appears under in the Edition Process dialog |
| `format` | enum | yes | One of: `markdown`, `csv`, `json`, `text`. Determines how the app renders the document |
| `description` | string | optional | One-line summary of what the document contains |
| `sort_order` | integer | optional | Display order within its category (lower = earlier). Documents without `sort_order` appear after those with one, sorted alphabetically by title |

## Categories

| Category | Purpose | Typical documents |
|---|---|---|
| `process` | Editorial workflow and decisions | Process log, decision log, publication checklist |
| `apparatus` | Variant and collation data | Locus table, family stemma, engine comparison |
| `witness` | Per-witness documentation | Witness READMEs, rights evidence, source page snapshots |
| `editorial` | Editorial notes and commentary | Diplomatic draft, reading edition notes, unresolved loci |
| `general` | Everything else | Text README, edition plan |

## Validation

A `documents.json` is valid if:

1. Every `id` is unique within the file
2. Every `path` points to a file that exists (relative to the text directory)
3. Every `category` is one of the five allowed values
4. Every `format` is one of the four allowed values
