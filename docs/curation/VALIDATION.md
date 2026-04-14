# OpenZen — Validation reference

This document defines what makes a critical edition publication-ready. It collects the validation rules from each artifact schema into a single reference and adds the publication-candidate checklist that gates the `edition_maturity: "published"` transition.

## Quick reference: required artifacts by edition kind

| Artifact | Required for `transcription` | Required for `critical_edition` |
|---|---|---|
| manifest.json | yes | yes |
| process.json | no | yes |
| apparatus.json | no | yes |
| stats.json | no | yes |
| documents.json | no | recommended |

---

## Manifest validation rules

1. `no_cbeta_material` must be `true`
2. `text_id` must not match CBETA regex (`^[A-Z]\d+n\d+`)
3. Every witness in `witnesses_consulted` must have `captured_sha256` matching the bytes at `captured_local_path`
4. Every witness must have `vetting_confidence: "high"` or an explicit waiver in `production_notes`
5. `tei_file` must exist and parse cleanly as XML
6. If `edition_kind` is `critical_edition`, `base_witness_id` must reference a valid witness `id` in `witnesses_consulted`
7. If `process_file` is set, the referenced file must exist
8. If `apparatus_file` is set, the referenced file must exist
9. If `stats_file` is set, the referenced file must exist
10. If `documents_file` is set, the referenced file must exist

## Process validation rules

1. `project.slug` must match the directory name
2. `project.edition_kind` must match the manifest's `edition_kind`
3. `base_witness.id` must reference a witness in the manifest's `witnesses_consulted`
4. All `witness_families[].members[]` must reference witnesses in the manifest
5. All `human_passes[].witness_id` must reference witnesses in the manifest
6. `publication_checks` fields must all be present (values may be `false` for in-progress editions)

## Apparatus validation rules

1. Every `locus_id` must be unique within the file
2. Every `readings[].witness_id` must reference a witness in the manifest
3. Every `witnesses_supporting[]` value must reference a witness in the manifest
4. Every `tei_target` (when present) must correspond to an anchor in the TEI file
5. Every entry must have at least one reading
6. `status` must be one of: `resolved`, `unresolved`, `publishable-with-note`

## Stats validation rules

1. All integer fields must be non-negative
2. Percentage fields must be in the range 0--100
3. `generated_utc` must be a valid ISO 8601 timestamp

## Documents validation rules

1. Every `id` must be unique within the file
2. Every `path` must point to an existing file (relative to the text directory)
3. `category` must be one of: `process`, `apparatus`, `witness`, `editorial`, `general`
4. `format` must be one of: `markdown`, `csv`, `json`, `text`

---

## Publication-candidate checklist

A critical edition cannot be marked `edition_maturity: "published"` unless **all** of the following hold:

- [ ] Manifest validates (all 10 rules above pass)
- [ ] Process file exists and validates (all 6 rules above pass)
- [ ] Apparatus file exists and validates (all 6 rules above pass)
- [ ] Stats file exists and validates (all 3 rules above pass)
- [ ] Documents file exists and validates (all 4 rules above pass)
- [ ] All `publication_checks` in `process.json` are `true`
- [ ] No `must-resolve-before-publication` unresolved loci remain in `process.json`
- [ ] TEI file validates through the parser
