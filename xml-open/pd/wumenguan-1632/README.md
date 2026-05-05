# pd.wumenguan-1632 â€” The Gateless Barrier, 1632 NDL Woodblock Reading Edition

> **Work:** ç„¡é–€é—œ (*WÃºmÃ©nguÄn* / The Gateless Barrier)
> **Witness:** 1632 Japanese woodblock imprint, NDL 12865429 (via Wikimedia Commons)
> **Author:** ç„¡é–€æ…§é–‹ (Wumen Huikai, 1183â€“1260)
> **Compiler:** å®—ç´¹ (Zongshao, fl. 1228)
> **Composed:** 1228 (Shaoding 1) â€” base witness printed 1632
> **License:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) (public domain dedication â€” no obligations of any kind)

## What this is

This is an **editorial reading edition** of the Wumenguan, rebuilt from the
1632 Japanese woodblock imprint held by the National Diet Library of Japan
(NDL 12865429) and corroborated from two additional public-domain witnesses.
It is not a diplomatic transcript. It is not a full critical edition. It is a
readable editorial text â€” the kind you hand to someone who wants to read, cite,
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
| Title (zh-Hant) | `ç¦ªå®—ç„¡é–€é—œ` | `ç„¡é–€é—œï¼ˆä¸€å…­ä¸‰äºŒå¹´å’Œåˆ»æœ¬ï¼Œå›½ç«‹å›½ä¼šå›³æ›¸é¤¨æœ¬ãƒ»ç·¨è¨‚è®€æœ¬ï¼‰` |
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
| `apparatus.json` | Apparatus skeleton (empty in v1 â€” no variant-reading entries yet for this reading edition) |
| `stats.json` | Summary statistics: witness counts, case counts, apparatus entry count, input hashes |
| `documents.json` | Registry of all provenance documents under `provenance/wumenguan-1632/` |
| `README.md` | This file |

## Editorial scope

- **Cases 1â€“48** are structurally complete and form the core koan sequence.
  They are each wrapped in a `<div type="case" n="N">` with nested `<div type="gongan">`,
  `<div type="wumen-commentary">`, and `<div type="verse">` children.
- **Case 49 (ç¬¬å››åä¹å‰‡èªž)** is late-appended material by å®‰æ™š Anwan and is
  placed in a `<div type="appendix">` outside the core 48-case spine. It is
  not counted as part of the received 48-case sequence by this edition â€” this
  matches the `CASE_COMPLETENESS_AUDIT.md` stance and is documented in the TEI
  header's `editorialDecl`.
- **Back matter** (è·‹å°¾ â€” closing address, colophon, é»ƒé¾ä¸‰é—œ æ‘˜å¥,
  é¡Œè´Šèˆ‡éŠœå, é™„éŒ„ç›¸é€£æ•£æ–‡, åˆŠè¨˜) each sits in its own `<div type="appendix">`
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

1. **Preface:** `èªªé“æœ‰é–€ï¼Œç„¡é˜¿å¸«åˆ†` â€” looks unusual against the familiar received
   wording, but it is locally supported and has not been silently normalized away.
2. **Case 20 verse:** `è«‹çºŒä¸€å‘` â€” kept as a rough witness-backed reading
   rather than a smoothed received-text substitute.
3. **Case 31 ç„¡é–€æ›°:** Kept in its witness-derived form rather than the most
   familiar received wording.

See the TEI `<editorialDecl>` block and
`C:\woodblocks\Transcriptions\Wumenguan_1632_NDL_Commons\architect\WUMENGUAN_1632_READING_EDITION_NOTES.md`
for the full list. A future editor should not "fix" these back to a witness-raw
form without reading those notes first.

## Editorial repairs baked in (do not roll back)

These repairs are part of the reading edition and should be treated as
authoritative:

- Received prefatory opening `ä½›èªžå¿ƒç‚ºå®—` is restored
- Case 6 restores the witness-backed Flower Sermon transmission block after Mahakasyapa smiles
- Case 10 reads in the standard order å…¬æ¡ˆ â†’ ç„¡é–€æ›° â†’ é Œ
- Case 17 received a coherence pass in ç„¡é–€æ›° / é Œ
- Cases 27 and 28 are in the received order: 27 = ä¸æ˜¯å¿ƒä½›, 28 = ä¹…éŸ¿é¾æ½­
- Case 31 no longer carries imported é¾æ½­ material
- Case 32 uses the expected é˜¿é›£ä¹ƒä½›å¼Ÿå­ / åŠåˆƒä¸Šè¡Œ commentary and verse set
- Case 24 keeps the Fengxue response in the koan rather than carrying it into the verse
- Volume-end heading "Wumen Volume" is restored ahead of the fascicle-end line
- Duplicated back-matter prose has been reduced so the reader-facing edition
  no longer repeats the same å‚äººå•äº‘ / ç¸½åœ¨è£è¨± block twice

## Rights basis (the short version)

- **Underlying work:** Public domain. Wumen Huikai died in 1260, more than
  760 years ago â€” well beyond any plausible copyright term in any jurisdiction.
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
     provenance/wumenguan-1632/source-reading-edition.md \
     xml-open/pd/wumenguan-1632/wumenguan-1632.xml
```

The captured reading-edition markdown is checked into this repository at
`provenance/wumenguan-1632/source-reading-edition.md`
(SHA-256 `eac77eec705b9b2a6de69df2a8b2422b736df4867771cae2e4187bdf1f99d158`,
29,556 bytes). The converter is deterministic â€” same input bytes produce
byte-identical output.

## Line-ID scheme

Synthetic identifiers in the form `wm32.{section}.{position}`:

- `wm32.preface.l001` â€” preface lines
- `wm32.case01.l01` â€” case 1 gongan lines
- `wm32.case01.wumen.l05` â€” case 1 wumen commentary lines
- `wm32.case01.verse.l01` â€” case 1 verse lines
- `wm32.appendix.case49.l01` â€” case 49 (appendix) lines
- `wm32.appendix.colophon.l01` â€” colophon (back matter) lines

The `wm32` prefix is deliberately distinct from `wm.*` (used by
`ws/gateless-barrier/gateless-barrier.xml`) and cannot be confused with CBETA
woodblock notation like `T48n2005:0292c22`.

## See also

- [`MANIFEST_SCHEMA.md`](../../../MANIFEST_SCHEMA.md) â€” full field reference for `manifest.json`
- [`LICENSE.md`](../../../LICENSE.md) â€” collection-level licensing summary
- [`README.md`](../../../README.md) â€” what OpenZen is
- [`../../ws/gateless-barrier/`](../../ws/gateless-barrier/) â€” the other Wumenguan
  in the corpus (Wikisource-derived, CC BY-SA 4.0)
