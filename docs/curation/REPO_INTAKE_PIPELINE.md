# Repo Intake Pipeline

How to take a text witness from `C:\woodblocks\` and turn it into a properly-vetted TEI file in the [`OpenZenTexts`](https://github.com/Fabulu/OpenZenTexts) collection. This doc captures the end-to-end procedure that was used to ship the first text (Wumenguan, Wikisource transcription) so the same workflow is reproducible for every subsequent text.

This is the **post-vetting** half of the pipeline. The pre-vetting half (find sources, validate licensing, capture into `C:\woodblocks\{Folder}\`) is documented separately in [`WORKFLOW.md`](WORKFLOW.md). Don't enter this pipeline until the source has cleared `WORKFLOW.md`.

---

## Mental model

```
   C:\woodblocks\{Source_Folder}\        ← captured + vetted, never touched after intake
            ↓
   tools/wikitext-to-tei/converter       ← deterministic conversion script (or new one)
            ↓
   OpenZen/xml-open/{prefix}/{slug}/
       ├── {slug}.xml                    ← the TEI file the apps consume
       ├── manifest.json                 ← provenance + license, machine-readable
       └── README.md                     ← per-text human notes
   OpenZen/provenance/{slug}/       ← verbatim copy of captured source
       └── ...                              for reproducibility
```

Three things must be true at the end:

1. The TEI file **parses cleanly** through both the desktop app's `TeiRenderer.cs` and the web preview's `lib/tei.js`
2. The manifest file **records full provenance** including SHA-256 hashes of every captured source byte
3. **Zero CBETA references** appear anywhere in the new files — paths, file IDs, line IDs, manifest fields, or human-readable text

If any of those three is false, the intake is incomplete and the file should not be committed.

---

## Step 0 — Preconditions

Before you start an intake, you must already have:

- A folder under `C:\woodblocks\{Source}_{License}\` with the captured source files. The folder name follows `WORKFLOW.md`'s convention: descriptive, ASCII, with the source host and license category in the name. Example: `Wumenguan_Wikisource_PD_old`
- A `README.md` inside that folder with source URL, stable revision URL (or oldid), rights basis, vetting confidence, and a `provenance check` line confirming no CBETA contamination
- An entry in `C:\woodblocks\SOURCES.md` mirroring the same metadata
- The text marked vetted in `C:\woodblocks\ZEN_TEXT_WORKLIST.md` (`[x]` only after the full set is acquired and validated)

If any of these are missing, go back to `WORKFLOW.md` and finish the pre-vetting steps first.

---

## Step 1 — Decide the file identity

Two decisions before you write any code: the **publisher prefix** and the **English slug**.

### Publisher prefix

The prefix categorizes how the text was produced. Currently:

| Prefix | Meaning | Typical license |
|---|---|---|
| `ws` | Wikisource transcription | CC BY-SA 4.0 (transcription text) + PD-old (work) |
| `ce` | Critical edition reconciled from multiple PD witnesses | CC0-1.0 / MIT (editor owns the editorial work) |
| `pd` | Single PD-scan transcription (OCR or hand-keyed from one scan) | PD-old / CC0-1.0 |
| `mit` | Reserved for contributor-released MIT-equivalent work | MIT |

If your new text doesn't fit any of these, propose a new prefix in `OpenZen/MANIFEST_SCHEMA.md` and add it to that table. Prefixes must be 2–3 lowercase ASCII letters and **must never collide with CBETA canon abbreviations** (`T`, `X`, `S`, etc.).

### English slug

A lowercase, hyphenated English title or romanized name. Examples: `gateless-barrier`, `blue-cliff-record`, `book-of-serenity`, `linji-record`. Pick the form that's **most recognizable in Western Buddhist studies**, which is sometimes the English translation (`gateless-barrier`) and sometimes the romanization (`linji-record`). When unsure, the romanized form is safer.

The slug is shared across all editions of the same work — so a future critical edition of the Wumenguan reconciles to `ce.gateless-barrier` and lives at `xml-open/ce/gateless-barrier/`, sibling to the Wikisource version at `xml-open/ws/gateless-barrier/`.

### Composite file ID

Combine them as `{prefix}.{slug}`. Example: `ws.gateless-barrier`, `ce.gateless-barrier`, `pd.linji-record`.

The composite file ID **must not match the CBETA regex**:

```
/^[A-Za-z]{1,3}\d{1,4}n[A-Za-z]?\d{1,5}[A-Za-z]?$/
```

The dot separator and hyphenated slug guarantee this. **Do not** invent a format that uses a literal `n` between digits, do not use canon-letter prefixes, do not embed Taishō volume numbers anywhere.

---

## Step 2 — Decide the line addressing scheme

The TEI file needs synthetic `<lb n="...">` line identifiers because OpenZen cannot use CBETA's woodblock notation (`0292c22`). Pick a scheme that reflects the work's natural structure.

For Wumenguan we used:

| Pattern | Used for |
|---|---|
| `wm.title` | The top-level work title heading |
| `wm.preface.l01`, `wm.preface.l02`, … | Lines in the front matter |
| `wm.case01.head` | Heading for case 1 (e.g. "1. 趙州狗子") |
| `wm.case01.l01`, `wm.case01.l02`, … | Body lines of case 1 |
| `wm.case01.wumen.head` | The "無門曰" sub-heading |
| `wm.case01.wumen.l01`, … | Lines of Wumen's commentary |
| `wm.case01.verse.head` | The "頌曰" sub-heading |
| `wm.case01.verse.l01`, … | Lines of the verse |

Two important rules:

1. **Never collide with CBETA woodblock notation.** CBETA uses `0292c22` and similar. A regex like `^\d{4}[abc]\d{2}$` should never match any of your IDs. The conversion tests check this
2. **Every `<head>` element must be preceded by its own `<lb>`.** Without this, the parser attributes the heading text to whatever bucket the previous `<lb>` set up, and you get cross-section bleed. The Wumenguan converter learned this the hard way — see commit `52bb27c` on `OpenZen` for the fix and the test that catches it

For a new work, choose a short prefix (`bcr` for blue-cliff-record, `ll` for linji-lu, etc.) and a hierarchy that mirrors the work's structure (`{prefix}.{section}.{subsection}.l{n}` is a good template).

---

## Step 3 — Build or extend a converter

The current converter (`OpenZen/tools/wikitext-to-tei/convert-gateless-barrier.mjs`) is a one-off for Wumenguan. It will be generalized once a second wikitext-source text comes through (the next obvious candidate is Hongzhi Extensive Record at `C:\woodblocks\Hongzhi_Extensive_Record_Wikisource_PD_old\`).

### If your source is wikitext

Copy `convert-gateless-barrier.mjs` and adapt it. The structure of the script is:

1. **`parseWikitext(raw)`** — strips the `{{Header}}`, wikitables, templates, interwiki/category links; walks lines; produces a structured object with `preface`, `cases`, etc. **Adapt this** to the work's structure. The case-detection regex (`==N. Title==`) and Chinese-numeral case detection (`第四十九則語`) are Wumenguan-specific
2. **`paragraphsToLines(paragraphs)`** — splits paragraphs into lines at sentence boundaries (`。！？`). Reusable as-is
3. **`buildTei(parsed)`** — emits the TEI XML with the rich `<teiHeader>` block, the synthetic line IDs, and the `<lb>` placeholders before every `<head>`. **Adapt the line-ID scheme** but keep the structure

### If your source is a different format

You'll need a new converter. Follow the same shape: deterministic, runs from the command line, takes input file and output file as arguments, prints a summary of what it produced. Place it under `OpenZen/tools/{format}-to-tei/`.

For OCR-based pipelines (the future critical-edition path), the converter is expected to be much more elaborate — multiple input scans, OCR model invocation, reconciliation logic, manual override files. The shape is the same: deterministic in-out, no surprises, every editorial decision recorded somewhere.

---

## Step 4 — Generate the TEI

Run the converter:

```bash
cd OpenZen
node tools/wikitext-to-tei/convert-gateless-barrier.mjs \
     provenance/{slug}/source.wikitext \
     xml-open/{prefix}/{slug}/{slug}.xml
```

You'll need to create the target directory first if it doesn't exist:

```bash
mkdir -p xml-open/{prefix}/{slug}
mkdir -p provenance/{slug}
```

Copy the captured source files from `C:\woodblocks\{Source_Folder}\` into `provenance/{slug}/` BEFORE running the converter. This is the reproducibility anchor — anyone with the same source files in `provenance/` should be able to re-run the converter and get the same TEI byte-for-byte.

---

## Step 5 — Inspect the TEI header

Open the generated `{slug}.xml` and verify the `<teiHeader>` block contains:

- **`<titleStmt>`** with the work's title in both `xml:lang="zh-Hant"` and `xml:lang="en"`, plus the author and compiler with dates
- **`<publicationStmt><availability>`** with:
  - One `<licence target="...">` element per applicable license (e.g. PD-old + CC BY-SA 4.0 = two `<licence>` elements)
  - `<p><label>Source witness:</label> ...</p>`
  - `<p><label>Source page:</label> ...</p>`
  - `<p><label>Stable revision:</label> ...</p>` with oldid where applicable
  - `<p><label>Rights basis:</label> ...</p>` with the long-form explanation
  - `<p><label>Provenance check:</label> ... no CBETA-derived material ...</p>`
  - `<p><label>Curator:</label> Read Zen — OpenZen curation, {date}</p>`
  - `<p><label>Conversion:</label> Generated from ...</p>`
  - `<p><label>Required attribution (short form):</label> "..."</p>`
- **`<sourceDesc>`** with one `<bibl>` for the work itself and one `<bibl type="digitalSource">` for the captured source

If anything is missing or generic, edit the converter — the rich header is what the desktop app's license display reads, so it must be accurate.

---

## Step 6 — Compute SHA-256 of every captured source file

For each source file under `provenance/{slug}/` that you'll reference in the manifest:

```bash
sha256sum provenance/{slug}/source.wikitext
sha256sum provenance/{slug}/page_revisions.json
# etc.
```

Record the full hex hash. You'll paste these into the manifest in the next step.

Verify the hash matches the **original** in `C:\woodblocks\{Source_Folder}\`:

```bash
sha256sum "C:/woodblocks/{Source_Folder}/{filename}"
```

If they don't match, you have line-ending normalization or some other byte-level corruption between the woodblocks copy and the provenance copy. Fix it before continuing — the manifest's integrity guarantee depends on the bytes being identical.

---

## Step 7 — Write the manifest

Create `xml-open/{prefix}/{slug}/manifest.json` per [`OpenZen/MANIFEST_SCHEMA.md`](../programmieren/OpenZen/MANIFEST_SCHEMA.md). The canonical example is `OpenZen/xml-open/ws/gateless-barrier/manifest.json`. Required top-level fields:

- `text_id` — the composite file ID from Step 1
- `work_name`, `work_name_zh`, `author`, `compiler`, `year_composed`
- `edition_kind` — `transcription` / `critical_edition` / `scan_ocr` / `derived`
- `license` — SPDX identifier
- `license_basis` — plain-English why
- `commercial_use_allowed`, `attribution_required`, `share_alike_required`
- `no_cbeta_material: true` — **always true for OpenZen**
- `tei_file` — filename of the TEI in this directory
- `witnesses_consulted[]` — one entry per source witness (see schema for sub-fields)
- `production_method` — what generated the TEI
- `production_notes` — free-text editorial notes
- `captured_utc` — when the TEI file in this directory was generated
- `curator` — who produced this text

**Every witness in `witnesses_consulted[]`** needs a full `captured_sha256`, `captured_bytes`, `upstream_url`, and `vetting_confidence`. The schema document explains every field.

---

## Step 8 — Write the per-text README

Create `xml-open/{prefix}/{slug}/README.md`. Use the existing one at `OpenZen/xml-open/ws/gateless-barrier/README.md` as a template. It should cover:

- Work metadata (title, author, year, license) in a header block
- A table listing the files in the directory and what each is for
- A "license obligations (the short version)" section in plain English explaining what users may and must do
- A reference to the captured source in `provenance/{slug}/`
- A note explaining why the file ID uses the OpenZen naming scheme (link to `MANIFEST_SCHEMA.md` for the full reasoning)
- A reproducibility section with the exact command to re-generate the TEI
- A "see also" section linking to `MANIFEST_SCHEMA.md`, `LICENSE.md`, and the repo `README.md`

---

## Step 9 — Run the parser sanity check

**Both parsers must accept the new TEI cleanly** before you commit. The check has two halves:

### Web preview parser (`lib/tei.js`)

Adapt the throwaway script that was used to validate Wumenguan (deleted after the run, but the pattern is captured here):

```javascript
// throwaway script in C:/programmieren/zenlinkpage/test/_sanity-check-{slug}.mjs
import { readFileSync } from 'node:fs';
import { installDomShim } from './_dom-shim.js';

installDomShim();
const { parseTei } = await import('../lib/tei.js');

const xml = readFileSync('C:/programmieren/OpenZen/xml-open/{prefix}/{slug}/{slug}.xml', 'utf8');
const parsed = parseTei(xml);

console.log('titleZh:', parsed.titleZh);
console.log('titleEn:', parsed.titleEn);
console.log('line buckets:', parsed.lineOrder.length);
console.log('headings:', parsed.headings.length);
console.log('first 5 line IDs:', parsed.lineOrder.slice(0, 5));
console.log('last 5 line IDs:', parsed.lineOrder.slice(-5));

// Hard checks
const cbetaStyle = parsed.lineOrder.filter((id) => /^\d{4}[abc]\d{2}$/.test(id));
if (cbetaStyle.length > 0) throw new Error('CBETA-style line IDs found: ' + cbetaStyle.slice(0, 5));
if (!parsed.lineOrder[0]?.startsWith('{prefix-of-line-ids}.')) throw new Error('First line ID has wrong prefix');
if (parsed.lineOrder.some((id) => !parsed.linesById.get(id)?.text?.length)) throw new Error('Empty line bucket');

console.log('GREEN');
```

Run with `node test/_sanity-check-{slug}.mjs`. Delete the file after the run — it loads an absolute path that would break CI.

### Desktop renderer (`TeiRenderer.cs`)

Add a temporary xunit test under `ReadZen.Tests/Services/_OpenZenSanityCheck.cs` (delete after the run). Pattern:

```csharp
[Fact]
public void {WorkName}_RendersCleanSegments()
{
    var xml = File.ReadAllText(@"C:\programmieren\OpenZen\xml-open\{prefix}\{slug}\{slug}.xml");
    var doc = TeiRenderer.Render(xml);

    Assert.False(doc.IsEmpty);
    Assert.True(doc.Segments.Count >= 100);

    var lbSegments = doc.Segments.Where(s => s.Key.StartsWith("lb|", StringComparison.Ordinal)).ToList();
    Assert.NotEmpty(lbSegments);

    // Legal-wall check
    var nonOpenLb = lbSegments.Where(s => !s.Key.StartsWith("lb|{your-line-id-prefix}.", StringComparison.Ordinal)).ToList();
    Assert.Empty(nonOpenLb);

    // No CBETA-style
    var cbetaStyle = lbSegments.Where(s =>
        Regex.IsMatch(s.Key, @"^lb\|\d{4}[abc]\d{2}")).ToList();
    Assert.Empty(cbetaStyle);
}
```

Run:

```bash
cd C:/programmieren/MergeWorkCbeta/CBETA-Translator
dotnet test ReadZen.Tests/ReadZen.Tests.csproj \
  --filter "FullyQualifiedName~OpenZenSanityCheck"
```

Delete the test file after it passes. Both parsers reporting the same line-bucket count is a strong sanity signal — they should agree.

---

## Step 10 — Commit and push

```bash
cd C:/programmieren/OpenZen
git status
git add xml-open/{prefix}/{slug}/{slug}.xml \
        xml-open/{prefix}/{slug}/manifest.json \
        xml-open/{prefix}/{slug}/README.md \
        provenance/{slug}/
# Optionally also: tools/{converter}/...
git commit -m "Add {edition_kind}: {work_name} ({prefix}.{slug})"
git push origin main
```

Use a descriptive commit message that mentions the work, the source, the license, and any quirks. The first Wumenguan commit at `f3cc42c` is a good template.

---

## Step 11 — Update the title index in OpenZenTranslations

Add an entry to `OpenZenTranslations/titles.jsonl`:

```json
{"path":"{prefix}/{slug}/{slug}.xml","fileId":"{prefix}.{slug}","zh":"{Chinese title}","en":"{English title}","enShort":"{Short English title}","author":"{Author}","year":"{Year}","license":"{SPDX or short label}","collection":"OpenZen"}
```

Commit and push to `OpenZenTranslations`. The web preview's title-lookup feature uses this file.

---

## Step 12 — Update the worklist

Mark the text done in `C:\woodblocks\ZEN_TEXT_WORKLIST.md` and update `C:\woodblocks\SOURCES.md` with the resulting file ID and link to the GitHub commit. This closes the loop between the curation tracker and the published artifact.

---

## Common gotchas

| Gotcha | Symptom | Fix |
|---|---|---|
| Heading text bleeds into the previous section's last line | A line bucket contains "case 1 verse" plus "2. Case 2 Title" | Make sure every `<head>` is preceded by its own `<lb>` placeholder. See Wumenguan commit `52bb27c` |
| Line-ending hash mismatch between woodblocks and provenance copies | `sha256sum` reports different values for what should be the same bytes | Use binary copy (`cp` from a Unix-like shell, not Notepad save) when moving the source into `provenance/`. The repo's `.gitattributes` may also be normalizing — check what's actually on disk vs what git stores |
| Converter strips wikitext templates aggressively and loses content | Some preface lines missing | The order of regex passes matters. Strip wikitables and `{{templates}}` separately and BEFORE converting `[[link]]` syntax |
| File ID matches the CBETA regex by accident | Test fails with "CBETA-style file ID" | Add a literal dot or hyphen to the slug. The dot separator between prefix and slug already prevents this in the standard scheme — check you're using the standard scheme |
| Sanity-check test left in the test project | CI fails on a different machine because the absolute path doesn't exist there | Always delete `_OpenZenSanityCheck.cs` after the run. It's a one-off check, not a permanent test |

---

## Authoritative references

- [`C:\woodblocks\WORKFLOW.md`](WORKFLOW.md) — pre-vetting curation discipline (acquire, validate, license-check)
- [`C:\woodblocks\SOURCES.md`](SOURCES.md) — the attribution ledger / inventory
- [`C:\woodblocks\ZEN_TEXT_WORKLIST.md`](ZEN_TEXT_WORKLIST.md) — the working queue
- [`OpenZen/MANIFEST_SCHEMA.md`](../programmieren/OpenZen/MANIFEST_SCHEMA.md) — manifest field reference
- [`OpenZen/xml-open/ws/gateless-barrier/`](../programmieren/OpenZen/xml-open/ws/gateless-barrier/) — the canonical first-text example
- [`OpenZen/tools/wikitext-to-tei/convert-gateless-barrier.mjs`](../programmieren/OpenZen/tools/wikitext-to-tei/convert-gateless-barrier.mjs) — the canonical converter pattern
- [`Fabulu/OpenZenTexts`](https://github.com/Fabulu/OpenZenTexts) on GitHub — the live repo
- [`Fabulu/OpenZenTranslations`](https://github.com/Fabulu/OpenZenTranslations) on GitHub — the companion translations repo
