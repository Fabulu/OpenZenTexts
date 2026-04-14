# OpenZen — License Summary

This repository contains text witnesses, converter source code, and provenance records under several free licenses. **Each file's authoritative license is the one declared in its TEI `<availability>` block (for XML files) or its source-file header (for code).** This document summarizes the categories.

---

## Text witnesses (`xml-open/`)

Each TEI file declares its own license in `<teiHeader>/<fileDesc>/<publicationStmt>/<availability>`. As of writing, the witnesses fall into these categories:

### PD-old works with CC BY-SA 4.0 transcription source

Examples: `xml-open/ws/gateless-barrier/gateless-barrier.xml`

- **Underlying work:** Public domain (the author died more than 100 years ago and the text is well beyond any plausible copyright term)
- **Transcription text:** [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/) — sourced from Chinese Wikisource
- **You may:** read, copy, modify, redistribute, translate, sell, or build commercial products
- **You must:** preserve the source attribution declared in the TEI header (`<availability>` block, "Required attribution (short form)" line) and release derivative texts under CC BY-SA 4.0 if they include the transcription verbatim

### Public-domain scans (PD-scan)

Mechanical reproductions of public-domain originals from institutional archives. No new copyright attaches to a faithful mechanical reproduction.

- **Underlying work:** Public domain
- **Scan/reproduction:** No new copyright (where applicable per jurisdiction)
- **You may:** anything
- **You must:** preserve attribution per the per-file TEI header

---

## Converter source code (`tools/`)

The converter scripts in `tools/wikitext-to-tei/` and any future converters in `tools/` are licensed under the **MIT License**:

```
MIT License

Copyright (c) 2026 Read Zen — OpenZen curation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Provenance records (`provenance/`)

The captured source files in `provenance/{text}/` retain their upstream license — they are kept verbatim from the original source as evidence of provenance and to allow reproducible conversion. The license of each captured source file is whatever the upstream host declared at the time of capture (recorded in `provenance/{text}/source-README.md` or equivalent).

---

## What this collection is NOT

- **Not derived from CBETA.** Every file in this repository has been vetted to exclude any CBETA-encoded source material. The CBETA Buddhist canon's distribution terms restrict commercial use; this collection deliberately stays clear of that gravity well so users can build commercial products on top of it.
- **Not legal advice.** The licensing notes in this document and in each TEI file are the curator's best understanding at the time of acquisition. If you plan to build a substantial commercial product on top of any text in this collection, do your own due diligence on the per-file rights basis recorded in the TEI header.

---

## Reporting a license issue

If you believe any file in this collection is mis-licensed, has insufficient provenance evidence, or is contaminated with material whose original source has more restrictive terms than declared, please open an issue in this repository. Contested texts will be moved out of `xml-open/` until the issue is resolved.
