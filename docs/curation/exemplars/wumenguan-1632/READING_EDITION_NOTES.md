# 無門關 Reading Edition Notes

## What This Is

This file accompanies the rebuilt reading edition in `WUMENGUAN_1632_READING_EDITION.md`.

The reading edition is not a diplomatic transcript and not a full critical edition. It is an editorial reading text rebuilt from the 1632 NDL witness, tightened by local OCR comparison, image adjudication, and selective corroboration from two additional woodblock witnesses.

## Main Editorial Position

- The main 48-case body is presented as a readable text.
- Leaf-level witness apparatus is kept out of the reading flow as much as possible.
- Corroborant witnesses are used where the 1632 base is weak or incomplete.
- The appended `49. 第四十九則語` remains late witness material outside the core 48-case sequence.

## Current Caveats

- The edition still sits between plain transcript and reading edition. It is cleaner than the witness draft, but it is still an editorial working edition rather than a bare transcript.
- Some passages are witness-backed but still locally rough. They are retained because the local evidence supports them better than a silent normalization would.
- Prefatory and end-matter material remain weaker and less uniform than the main 48-case body.
- The back matter is now cleaned for reading, but it is still the least stable portion of the book.

## Rough Readings Still Kept

- `說道有門，無阿師分` in the prefatory material looks unusual against the familiar received wording, but it is locally supported and has not been silently normalized away.
- `請續一向` in case `20` remains a rough witness-backed reading rather than a smoothed received-text substitute.
- Case `31` `無門曰` now has the correct case placement, but its wording still reads as a witness-derived form rather than the most familiar received version.

## What Was Corrected

- The received prefatory opening beginning `佛語心為宗。無門為法門...` is now restored to the reading edition.
- The duplicated short preface carry-over beginning at `作敲門瓦子...` was removed from the reading flow.
- Case `10` now reads in the standard order `公案 → 無門曰 → 頌`.
- Case `17` received a coherence pass in `無門曰 / 頌`.
- Cases `27` and `28` were returned to the received order: `27. 不是心佛`, `28. 久響龍潭`.
- Case `31` no longer carries imported `龍潭` material.
- Case `32` now uses the expected `阿難乃佛弟子... / 劍刃上行...` commentary and verse set.
- Duplicated appended prose in the back matter was reduced so the reader-facing edition no longer repeats the same `傍人問云...總在裏許` block twice.

## Witness and Source Basis

- Base witness: `Wumenguan_1632_NDL_Commons`
- Corroborating witness: `Wumen_Huikai_NDL_Commons`
- Corroborating witness: `Mumonkan_1752_Waseda_Commons`
- Source PDF: `NDL12865429_wumenguan_1juan.pdf`
- Working witness draft: `WUMENGUAN_1632.md`
- Reading edition: `WUMENGUAN_1632_READING_EDITION.md`

## Method

- OCR-first comparison, then image adjudication
- Multiple OCR comparators used, including `tesseract`, `RapidOCR`, `PaddleOCR`, and selective `EasyOCR`
- Three woodblock witnesses are in play overall; corroboration is selective rather than a full critical collation
- No CBETA-derived spine or imported text used in the reconstruction

## Recommended Use

- Use `WUMENGUAN_1632_READING_EDITION.md` for reading, translation, and editorial shaping.
- Use `WUMENGUAN_1632.md` for leaf-level provenance and witness notes.
- Use your separate XML workflow for machine-oriented structuring.
