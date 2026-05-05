# Wumenguan 1632 NDL Reading Edition — Process Log

**Text ID:** pd.wumenguan-1632
**Edition kind:** scan_ocr (editorial reading edition)
**Status:** Draft

---

## Witness Acquisition

Work on the Wumenguan 1632 reading edition began on 2026-04-09 with the goal of producing a freely-licensed Chinese text of the Gateless Barrier from public-domain Japanese woodblock scans, entirely independent of CBETA material.

The primary base witness was identified as NDL 12865429, a 1632 Japanese woodblock imprint of the Wumenguan in one volume, hosted on Wikimedia Commons as a mirror from the National Diet Library of Japan. The PDF (188 MB) was downloaded and its SHA-256 hash anchored the same day. Rights were confirmed as PD-old: the underlying work is by Wumen Huikai (d. 1260) and the 1632 imprint is a mechanical reproduction of a public-domain original.

A secondary witness was acquired simultaneously: Waseda University Library bunko31 e1102, a 1752 woodblock edition of the Mumonkan, also hosted on Wikimedia Commons (47 MB). This witness was assigned a cross-check role for image adjudication in passages where the 1632 base was unclear or damaged.

A tertiary corroborant was added on 2026-04-12: NDL 2537788, the Wumen Huikai Recorded Sayings (247 MB), also on Wikimedia Commons under PD-Japan / PD-scan (PD-Japan). This witness contributes corroboration for Huikai's distinctive voice in the commentaries but is not used as a primary authority for case text wording.

## The Three-Witness Approach

The reading edition uses a three-witness method. The NDL 1632 scan serves as the primary base from which all text is read. Where characters are ambiguous or damaged in the 1632 scan, the Waseda 1752 edition is consulted as a secondary cross-check — same text lineage, different printing, often clearer in specific passages. The Wumen Huikai Recorded Sayings provides a third line of corroboration specifically for Huikai's commentary voice, helping to confirm unusual phrasings that might otherwise be suspected as OCR errors.

Multi-engine OCR comparison was performed on the base witness using tesseract, RapidOCR, PaddleOCR, and selective EasyOCR. Where engines disagreed, image adjudication against the scan was performed, with the secondary witness consulted for difficult cases.

Several witness-backed rough readings were intentionally retained without silent normalization: the prefatory "說道有門，無阿師分", the "請續一向" in case 20, and the case 31 wording. These are documented editorial choices based on what the witnesses actually show.

## Markdown-to-TEI Conversion

The editorial reading edition was first assembled as a structured markdown file (WUMENGUAN_1632_READING_EDITION.md, 30,903 bytes). This markdown was then converted to TEI XML by a deterministic converter (convert-wumenguan-1632.mjs) that emits one TEI file from the markdown input with byte-identical output for identical input.

The converter produces a TEI structure with: a preface div, 48 core case divs (each containing gongan, wumen-commentary, and verse sub-divs), and an appendix div for case 49 (late-appended material by Anwan, kept outside the core spine so that TM and search machinery iterating the core sequence do not pull it into scope).

Synthetic line IDs use the "wm32" namespace, distinct from the "wm" namespace used by the separate ws.gateless-barrier text. This prevents cross-pollination through translation memory or search indices.

## Current Status

The edition is marked as **draft**. All publication checks pass: rights are confirmed for all witnesses, SHA-256 hashes are recorded, no CBETA material is present, and the line-ID namespace is distinct. The one deliberate omission is apparatus — variant readings and per-leaf witness notes exist in the working files but are not yet surfaced in the TEI. A future version may add a `<div type="apparatus">` from these materials.

The reading edition is not a diplomatic transcript and not a full critical edition. A deeper critical reconciliation may eventually be published as ce.gateless-barrier, per the reservation noted in the existing ws.gateless-barrier manifest.

On 2026-05-04, a witness-to-draft audit repaired two additional provenance-chain losses. In case 6 (`世尊拈花`), the koan opening had been truncated in the checked-in reading-edition chain after `惟迦葉尊者破顏微笑`, even though the facing witness leaves still show `世尊云：吾有正法眼藏...付囑摩訶迦葉。` across PDF p.014 right/left. In the appendix volume-end material, the witness-backed line `無門卷` was restored ahead of `無門關卷終`.

On 2026-05-05, the checked-in OpenZen source was brought back into line with the repaired local reading edition at case 24 (`離卻語言`). The Fengxue response line `穴云：長憶江南三月裏，鷓鴣啼處百花香。` had still been sitting in the verse block in the OpenZen mirror and its downstream translation XML; it now returns to the koan where the local witness chain places it. The same pass tightened the editorial note layer for cases 14, 21, and 22 so the package now states more plainly when a reading comes from mixed witness layers and when an opening formula is being kept conservatively rather than overstated as fully secure.
