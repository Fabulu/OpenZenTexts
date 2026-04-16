# pd.wumenguan-1632 — Wumenguan: Wikicommons (2011)

> **Work:** 無門關 (*Wúménguān* / The Gateless Barrier)
> **Witness:** 1632 Japanese woodblock imprint, NDL 12865429 (via Wikimedia Commons)
> **Author:** 無門慧開 (Wumen Huikai, 1183–1260)
> **Compiler:** 宗紹 (Zongshao, fl. 1228)
> **Composed:** 1228 (Shaoding 1) — base witness printed 1632
> **License:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) (public domain dedication — no obligations of any kind)

## What this is

This is an **editorial reading edition** of the Wumenguan, rebuilt from the
1632 Japanese woodblock imprint held by the National Diet Library of Japan
(NDL 12865429) and corroborated from two additional public-domain witnesses.
It is not a diplomatic transcript. It is not a full critical edition. It is a
readable editorial text — the kind you hand to someone who wants to read, cite,
or translate the Wumenguan without navigating leaf-level witness apparatus.

The editor dedicates the editorial layer to the public domain under CC0 1.0.
You can use, copy, modify, redistribute, translate, sell, or build commercial
products from this file **without any obligation to attribute, share-alike, or
notify anyone**. The underlying Song-era work by Wumen Huikai is PD by age
(the author died in 1260); the woodblock witnesses are mechanical reproductions
of public-domain originals hosted on Wikimedia Commons; the editorial work on
top is the editor's own and is released into the public domain here.

## This is NOT ws.gateless-barrier

OpenZen now contains two Wumenguans, and they are independent files:

| | `ws/gateless-barrier/gateless-barrier.xml` | `pd/wumenguan-1632/wumenguan-1632.xml` (this file) |
|---|---|---|
| Source | Chinese Wikisource transcription | 1632 NDL woodblock (via Commons) + two corroborants |
| License | CC BY-SA 4.0 (attribution + share-alike) | CC0 1.0 (no obligations) |
| Line-ID namespace | `wm.*` | `wm32.*` |
| Title (zh-Hant) | `禪宗無門關` | `無門關（一六三二年和刻本，国立国会図書館本・編訂讀本）` |
| Edition kind | Single-witness wiki transcription | Editorial reading edition from PD scans |

The two files deliberately use distinct line-ID namespaces so translation-memory
and search tooling that keys off line IDs cannot cross-pollinate them. If you
want a Wumenguan version with no downstream obligations of any kind, use this
file.

## What's in this directory

| File | What it is |
|---|---|
| `wumenguan-1632.xml` | The TEI-P5 XML file. Body text plus rich license/attribution metadata in the `<teiHeader>` block. Read by both the Read Zen desktop app and the [readzen.pages.dev](https://readzen.pages.dev) web preview |
| `manifest.json` | Provenance manifest. Records the three witnesses consulted, their SHA-256 hashes and byte counts, the reading-edition markdown used as the direct conversion input, the license basis, and the conversion method. Source of truth for everything in this directory |
| `process.json` | Editorial process record: pipeline, witnesses used, OCR engines, coverage, publication checks, and known gaps |
| `apparatus.json` | Apparatus skeleton (empty in v1 — no variant-reading entries yet for this reading edition) |
| `stats.json` | Summary statistics: witness counts, case counts, apparatus entry count, input hashes |
| `documents.json` | Registry of all provenance documents under `provenance/wumenguan-1632/` |
| `README.md` | This file |

## Editorial scope

- **Cases 1–48** are structurally complete and form the core koan sequence.
  They are each wrapped in a `<div type="case" n="N">` with nested `<div type="gongan">`,
  `<div type="wumen-commentary">`, and `<div type="verse">` children.
- **Case 49 (第四十九則語)** is late-appended material by 安晚 Anwan and is
  placed in a `<div type="appendix">` outside the core 48-case spine. It is
  not counted as part of the received 48-case sequence by this edition — this
  matches the `CASE_COMPLETENESS_AUDIT.md` stance and is documented in the TEI
  header's `editorialDecl`.
- **Back matter** (跋尾 — closing address, colophon, 黃龍三關 摘句,
  題贊與銜名, 附錄相連散文, 刊記) each sits in its own `<div type="appendix">`
  labelled with the source section name.
- **No apparatus** in v1. Variant readings and per-leaf witness notes live in
  the working files at
  `C:\woodblocks\Transcriptions\Wumenguan_1632_NDL_Commons\architect\WUMENGUAN_1632.md`
  and `THREE_WITNESS_VERIFICATION.md`. They may be surfaced in a future version
  as a `<div type="apparatus">`.

## Intentionally rough readings (do not silently "fix")

Several passages are witness-backed but locally rough. They are retained
verbatim from the reading-edition markdown and are **not** silently normalized
here:

1. **Preface:** `說道有門，無阿師分` — looks unusual against the familiar received
   wording, but it is locally supported and has not been silently normalized away.
2. **Case 20 verse:** `請續一向` — kept as a rough witness-backed reading
   rather than a smoothed received-text substitute.
3. **Case 31 無門曰:** Kept in its witness-derived form rather than the most
   familiar received wording.

See the TEI `<editorialDecl>` block and
`C:\woodblocks\Transcriptions\Wumenguan_1632_NDL_Commons\architect\WUMENGUAN_1632_READING_EDITION_NOTES.md`
for the full list. A future editor should not "fix" these back to a witness-raw
form without reading those notes first.

## Editorial repairs baked in (do not roll back)

These repairs are part of the reading edition and should be treated as
authoritative:

- Received prefatory opening `佛語心為宗` is restored
- Case 10 reads in the standard order 公案 → 無門曰 → 頌
- Case 17 received a coherence pass in 無門曰 / 頌
- Cases 27 and 28 are in the received order: 27 = 不是心佛, 28 = 久響龍潭
- Case 31 no longer carries imported 龍潭 material
- Case 32 uses the expected 阿難乃佛弟子 / 劍刃上行 commentary and verse set
- Duplicated back-matter prose has been reduced so the reader-facing edition
  no longer repeats the same 傍人問云 / 總在裏許 block twice

## Rights basis (the short version)

- **Underlying work:** Public domain. Wumen Huikai died in 1260, more than
  760 years ago — well beyond any plausible copyright term in any jurisdiction.
- **Base witness (NDL 12865429, 1632):** Mechanical scan of a public-domain
  Japanese woodblock imprint, hosted on Wikimedia Commons as PD. Confidence: high.
- **Corroborating witness (Waseda bunko31 e1102, 1752):** Mechanical scan of a
  public-domain Japanese woodblock imprint, hosted on Wikimedia Commons as PD.
  Confidence: medium-high (we rely on the Commons posture rather than Waseda's
  own site terms).
- **Tertiary corroborant (NDL 2537788, Wumen Huikai Recorded Sayings):**
  Categorized PD-Japan / PD-scan (PD-Japan) on Wikimedia Commons. Local copy
  validated (`246,780,631` bytes, SHA-256
  `782397C4D09627ECAF40EB6EBEF698E96B45A7FD743FC9A3FD6BB766D3319494`).
  Vetting confidence: **high**. This witness is cited only as an editorial
  corroborant for Huikai's own voice and is not treated as a primary authority.
- **Editorial layer:** Dedicated to the public domain under CC0 1.0 by the
  editor. No attribution required.

See `manifest.json` `witnesses_consulted[]` for the per-witness SHA-256 hashes
and local paths.

## Reproducibility

To regenerate `wumenguan-1632.xml` from the captured reading-edition markdown:

```bash
node tools/woodblock-to-tei/convert-wumenguan-1632.mjs \
     <path-to>/WUMENGUAN_1632_READING_EDITION.md \
     xml-open/pd/wumenguan-1632/wumenguan-1632.xml
```

The reading-edition markdown is in the curator's working directory at
`C:\woodblocks\Transcriptions\Wumenguan_1632_NDL_Commons\architect\WUMENGUAN_1632_READING_EDITION.md`
(SHA-256 `6ecc0b148d4cc82c1cf18b60c193d6c5be24298875140a89869fe67288c6e742`,
30,903 bytes). The converter is deterministic — same input bytes produce
byte-identical output.

## Line-ID scheme

Synthetic identifiers in the form `wm32.{section}.{position}`:

- `wm32.preface.l001` — preface lines
- `wm32.case01.l01` — case 1 gongan lines
- `wm32.case01.wumen.l05` — case 1 wumen commentary lines
- `wm32.case01.verse.l01` — case 1 verse lines
- `wm32.appendix.case49.l01` — case 49 (appendix) lines
- `wm32.appendix.colophon.l01` — colophon (back matter) lines

The `wm32` prefix is deliberately distinct from `wm.*` (used by
`ws/gateless-barrier/gateless-barrier.xml`) and cannot be confused with CBETA
woodblock notation like `T48n2005:0292c22`.

## See also

- [`MANIFEST_SCHEMA.md`](../../../MANIFEST_SCHEMA.md) — full field reference for `manifest.json`
- [`LICENSE.md`](../../../LICENSE.md) — collection-level licensing summary
- [`README.md`](../../../README.md) — what OpenZen is
- [`../../ws/gateless-barrier/`](../../ws/gateless-barrier/) — the other Wumenguan
  in the corpus (Wikisource-derived, CC BY-SA 4.0)
