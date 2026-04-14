# ws.gateless-barrier — The Gateless Barrier of the Chan School (Wikisource transcription)

> **Work:** 禪宗無門關 (*Chánzōng Wúménguān* / The Gateless Barrier of the Chan School)
> **Author:** 無門慧開 (Wumen Huikai, 1183–1260)
> **Compiler:** 宗紹 (Zongshao, fl. 1228)
> **Composed:** 1228 (Shaoding 1)
> **License:** [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

## What's in this directory

| File | What it is |
|---|---|
| `gateless-barrier.xml` | The TEI-P5 XML file. Body text plus rich license/attribution metadata in the `<teiHeader>` block. Read by both the Read Zen desktop app and the [readzen.pages.dev](https://readzen.pages.dev) web preview |
| `manifest.json` | Provenance manifest. Records the source witness (Chinese Wikisource page at oldid 2648998), capture date, SHA-256 of the captured wikitext, license obligations, and the conversion method used. Source of truth for everything in this directory |
| `README.md` | This file |

The captured Wikisource wikitext that was used to generate the TEI lives at [`../../../provenance/gateless-barrier/source.wikitext`](../../../provenance/gateless-barrier/source.wikitext) and the conversion script that produced the TEI from it lives at [`../../../tools/wikitext-to-tei/convert-gateless-barrier.mjs`](../../../tools/wikitext-to-tei/convert-gateless-barrier.mjs). The conversion is deterministic — anyone with the source files in `provenance/` can re-run the script and get the same TEI byte-for-byte.

## License obligations (the short version)

This file's transcription text is under **CC BY-SA 4.0** because it was extracted from the Chinese Wikisource page, whose site text is licensed that way. The underlying work itself is in the public domain (PD-old; the author died in 1260). What this means in practice:

- **You can use, copy, modify, redistribute, translate, sell, or build commercial products** from this text
- **You must attribute the source** — preserve the attribution declared in the TEI header (`<availability>` block, "Required attribution (short form)" line) or substitute a clearly equivalent acknowledgment
- **Derivative texts that reuse the transcription verbatim or in close paraphrase must also be released under CC BY-SA 4.0** (the "share-alike" obligation)

If you want a version of the Gateless Barrier with **no attribution or share-alike obligations at all**, watch for `ce.gateless-barrier` — the parallel critical edition reconciled from multiple woodblock scans, which will be released under CC0 once it's ready. That version is editorially independent of Wikisource and inherits no obligations from anywhere.

## Why the file ID is `ws.gateless-barrier` and not `T48n2005`

OpenZenTexts is a deliberately CBETA-independent collection. CBETA's distribution terms restrict commercial use, and the project's legal wall between OpenZenTexts and the CBETA-derived [Fabulu/CbetaZenTexts](https://github.com/Fabulu/CbetaZenTexts) requires that nothing in this collection — paths, file IDs, line addressing, namespaces, or metadata — can be confused with CBETA-encoded material. The naming scheme is:

```
{publisher_prefix}.{english-slug}
```

- `publisher_prefix` — the source category. `ws` for Wikisource, `ce` for Critical Edition (reconciled from multiple PD witnesses), `pd` for individual PD scan transcriptions, etc.
- `english-slug` — the work's English title or romanized name, lowercase, hyphenated. No woodblock notation, no canon volume references

The IDs are designed to never match the CBETA file-ID regex (`/^[A-Za-z]{1,3}\d{1,4}n[A-Za-z]?\d{1,5}[A-Za-z]?$/`) so a runtime path lookup can immediately tell which collection a given file belongs to.

## Reproducibility

To re-generate `gateless-barrier.xml` from the captured Wikisource source:

```bash
cd OpenZen
node tools/wikitext-to-tei/convert-gateless-barrier.mjs \
     provenance/gateless-barrier/source.wikitext \
     xml-open/ws/gateless-barrier/gateless-barrier.xml
```

The captured wikitext has SHA-256 `367323287d723c6850f1654d8081939507fe10ee9ecff92683d678b694b6d730` and is 33343 bytes. If your local copy disagrees, you have a different file — re-fetch from Wikisource at oldid 2648998.

## See also

- [`MANIFEST_SCHEMA.md`](../../../MANIFEST_SCHEMA.md) — full field reference for `manifest.json`
- [`LICENSE.md`](../../../LICENSE.md) — collection-level licensing summary
- [`README.md`](../../../README.md) — what OpenZen is and how to add new texts
