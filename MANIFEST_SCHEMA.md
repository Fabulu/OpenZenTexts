# OpenZenTexts — `manifest.json` schema reference

Every text in `xml-open/{publisher}/{slug}/` carries a `manifest.json` next to its TEI file. The manifest is the **provenance trail and license declaration** for that text. The Read Zen desktop app and the [readzen.pages.dev](https://readzen.pages.dev) web preview both read these manifests to display attribution, license terms, and source-witness information to users.

This document describes every field. The TEI file's own `<teiHeader><availability>` block carries the same information in human-readable form for in-situ inspection; the `manifest.json` carries it in machine-readable form so tooling doesn't have to parse TEI to find a license.

## Top-level fields

### Identity

| Field | Type | Required | Notes |
|---|---|---|---|
| `text_id` | string | yes | The collection-wide identifier in the form `{publisher_prefix}.{english-slug}`. Example: `ws.gateless-barrier`. Must NOT match the CBETA file-ID regex (`/^[A-Za-z]{1,3}\d{1,4}n[A-Za-z]?\d{1,5}[A-Za-z]?$/`). The publisher prefix tells you the source category — see below. |
| `work_name` | string | yes | The work's English title (or best-known romanization if there's no English convention) |
| `work_name_zh` | string | recommended | The work's Chinese title in traditional characters |
| `work_name_alt` | string[] | optional | Alternate names — pinyin, Japanese romaji, Korean transliteration, common English variants |
| `author` | string | yes | Original author of the work, with dates if known |
| `compiler` | string | optional | Editor / compiler if distinct from the author |
| `year_composed` | string | optional | Year the work was composed (or best estimate). String, not number, so era names work |

### Edition classification

| Field | Type | Required | Notes |
|---|---|---|---|
| `edition_kind` | enum | yes | One of: `transcription`, `critical_edition`, `scan_ocr`, `derived`. See "Edition kinds" below |
| `edition_kind_note` | string | optional | Free-text elaboration of what kind of edition this is and how it differs from other editions of the same work in the collection |

### License

| Field | Type | Required | Notes |
|---|---|---|---|
| `license` | string | yes | SPDX identifier where possible: `CC0-1.0`, `CC-BY-4.0`, `CC-BY-SA-4.0`, `MIT`, `PD-old`, etc. |
| `license_url` | string (URL) | recommended | Canonical URL for the license text |
| `license_basis` | string | yes | Plain-English explanation of WHY this is the license. Reference the underlying work's PD status, the source-text's separate license, the editor's release decision, etc. |
| `commercial_use_allowed` | boolean | yes | Whether downstream users may use this text in commercial products. Almost always `true` in OpenZenTexts (the whole point of the collection), but explicit so tooling can filter |
| `attribution_required` | boolean | yes | Whether downstream uses must preserve attribution |
| `share_alike_required` | boolean | yes | Whether derivative works must inherit the same license |
| `no_cbeta_material` | boolean | yes | **Hard requirement.** Must be `true` for every file in OpenZenTexts. Affirms that nothing in this text is derived from CBETA-encoded material. The curation workflow at `C:\woodblocks\WORKFLOW.md` is the validation gate |

### File pointers

| Field | Type | Required | Notes |
|---|---|---|---|
| `tei_file` | string | yes | The TEI XML filename in this directory (relative). Example: `gateless-barrier.xml` |
| `production_inputs_dir` | string | optional | Relative path to the captured source files used to produce the TEI. Usually points into `provenance/`. Example: `../../../provenance/gateless-barrier/` |

### Witnesses (the provenance trail)

| Field | Type | Required | Notes |
|---|---|---|---|
| `witnesses_consulted` | array | yes | One entry per source witness consulted in producing the TEI. See "Witness fields" below. A `transcription` edition typically has one witness; a `critical_edition` has two or more |

### Production

| Field | Type | Required | Notes |
|---|---|---|---|
| `production_method` | string | yes | Brief description of how the TEI was produced from the witnesses. Reference the conversion script or pipeline used |
| `production_notes` | string | optional | Free-text notes about editorial decisions, known issues, planned successors, etc. |
| `captured_utc` | string (ISO 8601) | yes | When the TEI file in this directory was generated. Distinct from per-witness `captured_utc` (which is when each witness was first captured into `provenance/`) |
| `curator` | string | yes | Who produced this text. Default: `Read Zen — OpenZenTexts curation` |

## Witness fields

Each entry in `witnesses_consulted[]` describes one physical source.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | A short slug unique within this manifest. Example: `wikisource-zh-2648998`, `ndl-1632`, `korea-1882`. Used in TEI `<sourceDesc>` cross-references and reconciliation notes |
| `kind` | enum | yes | One of: `wiki_transcription`, `woodblock_scan`, `printed_edition`, `manuscript`, `other` |
| `label` | string | yes | Human-readable label for the witness, suitable for display in UI |
| `host` | string | optional | The institution or platform hosting the source (e.g. "Chinese Wikisource", "NDL Japan", "Wikimedia Commons") |
| `upstream_url` | string (URL) | yes | Canonical URL where the witness can be re-fetched. Use the most stable form available (`oldid=` for wikis, `pid` for NDL, etc.) |
| `stable_revision_url` | string (URL) | recommended for wikis | Permanent-link URL pinned to a specific revision (e.g. `?oldid=2648998`) |
| `stable_revision_id` | string | recommended for wikis | The bare revision identifier (e.g. `2648998`) |
| `captured_local_path` | string | yes | Path within `C:\woodblocks\` (the curator's working directory) where the captured copy lives. Used for reproducibility — anyone with the same directory structure can verify against this manifest |
| `captured_filename` | string | optional | The actual filename if it differs from the path leaf (e.g. for non-ASCII filenames) |
| `captured_sha256` | string (hex) | yes | SHA-256 of the captured bytes. **Hard requirement** for provenance integrity. If a future user has a copy that doesn't match this hash, it's a different file and the manifest doesn't validate it |
| `captured_bytes` | integer | yes | Byte count of the captured file |
| `captured_utc` | string (ISO 8601) | yes | When this witness was first captured into `provenance/` |
| `rights` | string | yes | One-line summary of the witness's rights status |
| `rights_basis_text` | string | yes | Longer explanation of WHY the witness is usable. Reference page-level PD evidence, host site terms, etc. |
| `vetting_confidence` | enum | yes | `high`, `medium`, or `low`. Reflects how confident the curator is in the rights basis. Per the workflow at `C:\woodblocks\WORKFLOW.md`, witnesses below `high` should not normally land in this collection |
| `provenance_check` | string | yes | Always set to `no_cbeta_marker_in_captured_package` for OpenZenTexts witnesses. Affirms the curator manually checked that the captured source has no CBETA contamination |
| `role_in_production` | string | yes | What role this witness played: `sole source`, `primary base text`, `variant for X`, `secondary cross-check`, etc. |

## Edition kinds

The `edition_kind` field categorizes how the TEI was produced. Each kind has different reasonable values for the license fields.

### `transcription`

A direct conversion from a single existing transcription (typically Wikisource wikitext). The transcription source carries its own license obligations which propagate to the TEI.

- Witness count: typically 1
- Common licenses: `CC-BY-SA-4.0` (Wikisource), `CC-BY-4.0`
- `share_alike_required`: usually `true`
- Example: `ws.gateless-barrier`

### `critical_edition`

A scholarly reconciliation of multiple PD witnesses (woodblock scans, manuscripts, printed editions) using OCR, ML, and editorial judgment. **The editor owns the editorial work** and can release it under any license — the underlying witnesses are PD, so there's no inheritance gravity well.

- Witness count: 2 or more
- Common licenses: `CC0-1.0`, `MIT`, `CC-BY-4.0`
- `share_alike_required`: usually `false` (this is the whole point)
- `production_notes` should reference per-section editorial decisions
- Example (planned): `ce.gateless-barrier`

### `scan_ocr`

A simple OCR pass over a single PD scan, with minimal or no editorial reconciliation. The OCR is mechanical, so the output is also PD (subject to the same caveats as the underlying scan's rights).

- Witness count: 1
- Common licenses: `PD-old`, `CC0-1.0`
- `share_alike_required`: `false`

### `derived`

A text produced from another text in the OpenZenTexts collection (e.g. a normalized variant, a punctuation overlay). The license should match or be looser than the source text's license.

- Witness count: 1 (and the witness should reference the source `text_id` rather than an external URL)

## Publisher prefixes

The `text_id` field starts with a publisher prefix. Currently used:

| Prefix | Meaning |
|---|---|
| `ws` | Wikisource transcription |
| `ce` | Critical edition (reconciled from multiple PD witnesses) |
| `pd` | Public-domain scan transcription (OCR or hand-keyed from a single scan) |
| `mit` | (Reserved) Contributor-released text under MIT or equivalent |

Each prefix maps directly to a path component: `xml-open/{prefix}/{slug}/` and to a directory in `provenance/{slug}/` (the slug is shared across prefixes when the same work has multiple editions, so all the captured source files for "gateless-barrier" live together regardless of which edition they fed).

New prefixes can be added when a new source category appears, but they should be short (2–3 letters), lowercase, and never collide with the CBETA canon abbreviations (`T`, `X`, `S`, etc.).

## Validation

A manifest is "valid" for OpenZenTexts if:

1. `no_cbeta_material` is `true`
2. `text_id` does not match the CBETA regex
3. Every witness has a `captured_sha256` that matches the bytes at `captured_local_path`
4. Every witness has `vetting_confidence: "high"` (or has an explicit `production_notes` waiver)
5. The `tei_file` exists and parses cleanly through both `lib/tei.js` (zenlinkpage) and `TeiRenderer.cs` (Read Zen desktop app)

There is no automated validator yet. The validation will be added to the CI workflow once the schema stabilizes.

## Example

See [`xml-open/ws/gateless-barrier/manifest.json`](xml-open/ws/gateless-barrier/manifest.json) for the canonical example. It's the only manifest in the collection right now and serves as the reference implementation.
