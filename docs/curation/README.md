# Curation Process Documentation

This directory documents the process by which OpenZen sources are acquired, vetted, transcribed, and published. It serves three audiences:

- **Curators** adding new texts to the collection
- **Scholars** evaluating the provenance and reliability of published texts
- **Developers** building tools that interact with the collection's metadata

## Process documents

| Document | Purpose |
|---|---|
| [WORKFLOW.md](WORKFLOW.md) | Pre-vetting curation discipline: how to acquire texts, validate licensing, store with attribution. The foundational rules that keep the collection CBETA-independent and commercially usable. |
| [REPO_INTAKE_PIPELINE.md](REPO_INTAKE_PIPELINE.md) | Post-vetting: converting captured sources to TEI XML in the OpenZen repo. 12 sequential steps with sanity checks and gotchas. |
| [TRANSCRIPTION_METHOD.md](TRANSCRIPTION_METHOD.md) | End-to-end transcription method: witness-first reading, OCR as evidence (not authority), multi-witness corroboration, and explicit uncertainty handling. |
| [TRANSCRIPTION_CHECKLIST.md](TRANSCRIPTION_CHECKLIST.md) | Compact checklist distillation of the transcription method for quick reference during active work. |

## Exemplars

The `exemplars/` subdirectory contains worked examples of the process documentation for specific texts. These are the "receipts" — the detailed evidence trail that a future scholar, reviewer, or auditor can inspect to evaluate the reliability of a published text.

### exemplars/wumenguan-1632/ (first woodblock-derived reading edition)

The 1632 NDL Wumenguan reading edition (`pd.wumenguan-1632`) was the first woodblock-derived text in the collection. Its exemplar includes:

| Document | What it shows |
|---|---|
| [THREE_WITNESS_VERIFICATION.md](exemplars/wumenguan-1632/THREE_WITNESS_VERIFICATION.md) | Per-case cross-check ledger: which of the three woodblock witnesses (NDL 1632, Waseda 1752, Wumen Huikai NDL) corroborate each case, at what level (title, order, prose cluster, full text). |
| [CASE_COMPLETENESS_AUDIT.md](exemplars/wumenguan-1632/CASE_COMPLETENESS_AUDIT.md) | Structured table: all 48 cases x 3 structural components (gongan, wumen-commentary, verse) showing complete vs. partial status. Machine-readable. |
| [READING_EDITION_NOTES.md](exemplars/wumenguan-1632/READING_EDITION_NOTES.md) | Editorial notes: what was corrected from the raw witnesses, what remains rough and why, which unusual readings are intentionally witness-backed rather than normalized. |

These documents are the standard to aim for when adding a new text. Not every text will need the same depth (a Wikisource transcription is simpler than a three-witness woodblock reconciliation), but every text should have at least a manifest.json with witness metadata and a provenance/ directory with the captured source.

## Per-text provenance

The `provenance/` directory at the repo root holds per-text captured sources:

```
provenance/
  gateless-barrier/     source.wikitext (captured Wikisource page)
  wumenguan-1632/       source-reading-edition.md (the editorial input)
```

These files are the reproducibility anchors. Combined with the deterministic converter scripts in `tools/`, anyone can regenerate the TEI byte-for-byte from these inputs.

## Manifest schema

See [MANIFEST_SCHEMA.md](../../MANIFEST_SCHEMA.md) at the repo root for the per-text `manifest.json` field reference. Every published text must have a manifest; the exemplar documents above provide the evidence that backs up what the manifest asserts.
