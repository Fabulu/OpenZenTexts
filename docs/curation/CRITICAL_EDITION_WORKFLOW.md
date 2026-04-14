# OpenZen — Critical edition workflow

This document describes the 10-stage pipeline for producing a rigorous OpenZen critical edition. Each stage has prerequisites, outputs, and a gate condition that must be met before proceeding.

The workflow is OCR-first: push machine reading as far as possible before human intervention. Every human decision is logged. Every published edition has a coherent artifact tree.

Reference schemas:
- [`PROCESS_JSON_SCHEMA.md`](PROCESS_JSON_SCHEMA.md)
- [`APPARATUS_JSON_SCHEMA.md`](APPARATUS_JSON_SCHEMA.md)
- [`STATS_JSON_SCHEMA.md`](STATS_JSON_SCHEMA.md)
- [`DOCUMENTS_JSON_SCHEMA.md`](DOCUMENTS_JSON_SCHEMA.md)
- [`../../MANIFEST_SCHEMA.md`](../../MANIFEST_SCHEMA.md)

---

## Stage 0. Edition charter

**What happens:** Declare scope, target edition kind, target witnesses, success conditions.

**Output:** `provenance/{slug}/process/edition-plan.md`

**Gate:** Charter exists and names at least one base-witness candidate.

---

## Stage 1. Witness acquisition and rights lock

**What happens:** For every witness: capture source page, capture license page, download file, hash file, verify structure, assign rights confidence, assign completeness status.

**Output:** Witness directories under `provenance/{slug}/witnesses/{witness-id}/` with README, source page snapshot, rights evidence, and captured files.

**Gate:** Every witness has `vetting_confidence: "high"` or an explicit waiver with reason. All SHA-256 hashes recorded. No witness enters OCR before this stage completes.

---

## Stage 2. Segmentation

**What happens:** Build page inventory, leaf splits, reading-order map, and image crop metadata for every scan witness.

**Output:** `provenance/{slug}/ocr/{witness-id}/page-map.csv` with columns: `page_id`, `leaf_id`, `page_number_display`, `side`, `image_path`, `crop_path`, `content_role`, `notes`.

**Gate:** Every scan page has a row in the page map. Content roles assigned.

---

## Stage 3. OCR-maximal pass

**What happens:** Run all available OCR engines on segmented pages. Record engine name, version, model, parameters, run date, input images, output files.

**Output:** `provenance/{slug}/ocr/{witness-id}/ocr/{engine}/` directories with raw OCR output. Engine metadata recorded in `process.json` → `ocr_pipeline.engines[]`.

**Gate:** At least one engine has processed all segmented pages. All outputs on disk. No silent OCR replacement.

---

## Stage 4. OCR evaluation

**What happens:** Benchmark representative pages across engines. Compare character accuracy, title detection, reading-order stability, punctuation, vertical text handling.

**Output:** `provenance/{slug}/ocr/{witness-id}/evaluation/engine-comparison.json`

**Gate:** Default engine selected. Comparison results recorded. Decision documented in `process.json`.

---

## Stage 5. Human adjudication

**What happens:** Humans review OCR output. Every pass records: witness, pages or loci, reason, change type (`ocr-confirm`, `ocr-reject`, `image-only-recovery`, `cross-witness-decision`).

**Output:** `provenance/{slug}/process/process-log.md` entries. `process.json` → `human_passes[]`.

**Gate:** All pages have at least one human pass recorded (even if the pass is "OCR confirmed, no changes").

---

## Stage 6. Collation and apparatus

**What happens:** Build a locus table for all variant-bearing places. Compare readings across witnesses.

**Output:**
- `provenance/{slug}/collation/locus-table.csv` (columns: `locus_id`, `section`, `base_text`, `witness_id`, `reading`, `certainty`, `is_ocr_only`, `is_human_checked`, `notes`)
- `apparatus.json` derived from the locus table

**Gate:** Every locus with witness disagreement has an apparatus entry. `apparatus.json` validates.

---

## Stage 7. Decision logging

**What happens:** Record every non-trivial editorial choice: issue, options, evidence, chosen reading, reversibility, affected loci.

**Output:** `provenance/{slug}/process/decision-log.md`. `process.json` → `decision_records[]`.

**Gate:** Every `unresolved` or `publishable-with-note` apparatus entry has a corresponding decision record or unresolved-locus entry.

---

## Stage 8. Unresolved loci

**What happens:** Classify all remaining uncertainties. Each gets: locus, reason, missing evidence, publication status (`must-resolve-before-publication` or `publishable-with-note`).

**Output:** `provenance/{slug}/process/unresolved-loci.md`. `process.json` → `unresolved_loci[]`.

**Gate:** No locus is left unclassified. All `must-resolve-before-publication` items are either resolved or block publication.

---

## Stage 9. Publication package

**What happens:** Generate final artifacts from all preceding stages.

**Output** (all in `xml-open/{prefix}/{slug}/`):
- TEI XML file
- `manifest.json` (with `edition_maturity` set appropriately)
- `process.json`
- `apparatus.json`
- `stats.json`
- `documents.json`
- `README.md`

**Gate (publication checklist):**
1. All witness rights confirmed (high confidence or explicit waiver)
2. All witness file hashes valid
3. Segmentation complete
4. OCR runs recorded
5. OCR benchmark exists
6. Human passes logged
7. Apparatus exists with at least one entry
8. Unresolved loci classified
9. TEI validates through both parsers
10. All JSON artifacts validate against their schemas

Only after all 10 checks pass may `edition_maturity` be set to `published`.
