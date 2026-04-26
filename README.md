# OpenZen

Chinese Zen primary texts in TEI-P5 XML format, curated by the [Read Zen](https://github.com/Fabulu/ReadZen) project for **commercial reusability**.

[![Support on Ko-fi](https://img.shields.io/badge/Ko--fi-Support%20this%20project-ff5e5b?logo=ko-fi&logoColor=white)](https://ko-fi.com/readzen)

## Why this exists

The CBETA Chinese Buddhist canon is the gold standard for digital Zen text scholarship, but its distribution terms restrict commercial use. OpenZen is a parallel collection sourced from public-domain witnesses and freely-licensed transcriptions — you can redistribute, modify, translate, sell, or build commercial products from anything in this repository, subject to each file's per-text license terms.

Every file in this repository is **independent of CBETA-encoded material**. The [edition process](https://github.com/Fabulu/woodblockeditionprocess) excludes any source whose provenance chain touches CBETA. Synthetic line identifiers (e.g. `wm.case01.l01`) replace CBETA woodblock notation (e.g. `T48n2005:0292c22`) so the two corpora can never be confused.

## What's in here

```
xml-open/
  ws/                              <- witnesses sourced from Wikisource
    gateless-barrier/
  pd/                              <- public-domain woodblock editions
    wumenguan-1632/
  ce/                              <- critical edition projects
    faith-in-mind/
provenance/                        <- original captured source files for each text
  gateless-barrier/
  wumenguan-1632/
  faith-in-mind/
tools/
  wikitext-to-tei/                 <- converters for source formats
  woodblock-to-tei/
docs/
  curation/                        <- curation workflow documentation and schemas
LICENSE.md
README.md
```

- **ws/** — Wikisource-sourced witnesses (transcriptions under CC BY-SA 4.0)
- **pd/** — Public-domain woodblock editions (scanned historical prints, PD-old)
- **ce/** — Critical edition projects (collated from multiple witnesses)

Each TEI file declares its own license, source URL, stable revision, rights basis, and required attribution in its `<teiHeader>/<fileDesc>/<publicationStmt>/<availability>` block. The Read Zen desktop app reads these fields and surfaces them to users when they open a text from this collection.

## License

This repository contains text witnesses under several different free licenses:

- **PD-old** — works whose authors died more than 100 years ago (the underlying texts in this collection)
- **CC0** — public-domain dedications where the contributor waives all rights
- **CC BY-SA 4.0** — Wikisource transcription text (attribution + share-alike obligations)
- **MIT** — the converter scripts in `tools/`

See [`LICENSE.md`](LICENSE.md) for the per-component breakdown and [`xml-open/*/`](xml-open) for the per-file declarations in the TEI headers.

**No CBETA material.** This collection deliberately contains nothing derived from CBETA-encoded files. The [edition process](https://github.com/Fabulu/woodblockeditionprocess) treats any CBETA marker in a source's provenance chain as disqualifying.

## Adding a new text

The intended workflow is documented in the [edition process repository](https://github.com/Fabulu/woodblockeditionprocess). Briefly:

1. Find a free-licensed witness with explicit commercial reuse terms (or a vetted PD source)
2. Capture the source files into `provenance/{text-slug}/` along with a `README.md` recording source URL, stable revision, rights basis, and vetting confidence
3. Verify there is no CBETA contamination in the provenance chain
4. Write a converter in `tools/` (or extend an existing one) to produce the TEI XML
5. Place the source files under `provenance/{text-slug}/` and the generated XML under `xml-open/{publisher}/{text-slug}/{text-slug}.xml`
6. Make sure the TEI header carries full attribution metadata (see existing files for the schema)

The converter pipeline must be deterministic and reproducible — anyone with the source files in `provenance/` should be able to re-run the converter and get the same output.

## Related repositories

| Repository | Description |
|---|---|
| [OpenZenTranslations](https://github.com/Fabulu/OpenZenTranslations) | Translations of open-licensed texts (commercial use OK) |
| [CbetaZenTexts](https://github.com/Fabulu/CbetaZenTexts) | CBETA Chinese Zen source texts (non-commercial) |
| [CbetaZenTranslations](https://github.com/Fabulu/CbetaZenTranslations) | Translations of CBETA texts (non-commercial) |
| [Read Zen](https://github.com/Fabulu/ReadZen) | Desktop app for reading and translating Zen texts |
