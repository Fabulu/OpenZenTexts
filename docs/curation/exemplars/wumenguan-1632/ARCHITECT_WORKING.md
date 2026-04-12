# Wumenguan 1632 Architect Working File

## Current Witness

- Folder: `C:\woodblocks\Wumenguan_1632_NDL_Commons`
- Canonical PDF: `NDL12865429_wumenguan_1juan.pdf`
- Page count: 57

## Tooling Status

- PDF rendering: available via PyMuPDF
- OCR engine: Tesseract 5.5.0 installed
- Local language data:
  - `chi_tra`
  - `chi_sim`
  - `chi_tra_vert`
  - `chi_sim_vert`
- Agent cross-check: enabled

## Batch Status

- `batch/`: first-pass full render and OCR pass across all 57 PDF pages / 114 leaves
- `batch_refined/`: side-specific cropped leaf OCR pass completed across all 114 leaves
- refined OCR is materially better on body-text leaves than on covers, guards, and heavily stained leaves
- OCR remains comparator-quality, not publication-quality
- `LEAF_SCORECARD.txt`: per-leaf OCR character counts for triage and sequencing
- Python 3.12 OCR venv: `.venv312-ocr`
- Secondary OCR comparator available: `rapidocr_onnxruntime`
- Additional OCR comparator available: `PaddleOCR`
- `scripts/run_rapidocr_leaf.py`: UTF-8 RapidOCR runner for individual leaves
- `scripts/run_paddleocr_leaf.py`: UTF-8 PaddleOCR runner for individual leaves

## Working Rule

- This workspace must remain scan-derived.
- No CBETA text, ordered backbone, or external text spine should be used here.
- If case order is reconstructed, it must be reconstructed from the witness itself and explicitly marked as provisional where needed.
- OCR comparators may be used, but they are evidence aids only, never a replacement witness text.
- Current Paddle note: `paddlepaddle 3.2.2` works in the local OCR venv; `3.3.1` failed on CPU inference.
- Read OCR outputs first for evidence inventory; use the witness image second to adjudicate and extend.

## Current Readability Assessment

- Strong enough for manual consolidation on many body leaves
- Weak on covers, stamps, guard leaves, and some low-contrast pages
- Best current use of OCR:
  - page-role triage
  - locating clearer body leaves
  - serving as the first-pass evidence inventory before direct image adjudication

## Confirmed Leaves

### PDF p.006 left leaf
- Visual role: table of contents / index leaf
- Notes: clear enough to recover several contents entries and the prefatory quatrain

### PDF p.006 right leaf
- Visual role: opening prose / preface-style text
- Notes: cross-checked by OCR and independent readers; still contains unresolved graphs

### PDF p.011 left leaf
- Visual role: commentary and verse on `百丈野狐`
- Notes: one of the clearest early body leaves

### PDF p.012 right leaf
- Visual role: prose on `俱胝豎指`
- Notes: one of the clearest prose leaves in the early sequence

### PDF p.015 right leaf
- Visual role: case-boundary leaf
- Notes: spans `世尊拈花` into `趙州洗鉢`

### PDF p.015 left leaf
- Visual role: commentary and verse body leaf
- Notes: stable sample for `趙州洗鉢`, with the opening of `奚仲造車` visible at the boundary

### PDF p.016 right leaf
- Visual role: case-boundary leaf
- Notes: spans into `大通智勝`

### PDF p.035 right leaf
- Visual role: body-text leaf
- Notes: likely `趙州勘婆`; body prose is clearer than the short fragments near the top

## Confirmed Supporting Notes

- `agent_notes/PDF_p006_right.md`
- `agent_notes/PDF_p015_left.md`
- `agent_notes/PDF_p035_right.md`
- `architect/WITNESS_BACK_HALF_IDENTIFICATIONS.md`

## Recommended Next Step

1. use `WITNESS_CASE_ORDER_FROM_CONTENTS.md` as the scan-derived ordering backbone
2. extend the witness draft sequentially in that reconstructed order
3. mark uncertain case boundaries explicitly instead of importing outside text
4. leave damaged or low-confidence leaves for a later verification pass
5. use `WITNESS_BACK_HALF_IDENTIFICATIONS.md` as the provisional scan-only completion spine for cases 23-48 and end matter

## Architect Conventions

- `WUMENGUAN_1632.md` is the main witness-derived draft and evidence log.
- Raw agent outputs should be copied or summarized under `agent_notes/`.
- No silent normalization of doubtful graphs.
- Prefer explicit uncertainty to false precision.
