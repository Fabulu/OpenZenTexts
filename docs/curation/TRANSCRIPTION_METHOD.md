# Woodblock Transcription Workflow

## Purpose

This document records the working method used to transcribe woodblock witnesses into readable Markdown while keeping the transcription scan-derived.

It reflects what actually worked in the `Wumenguan` project:

- witness-first transcription
- OCR-first evidence inventory
- image-based adjudication
- multi-witness corroboration
- explicit uncertainty handling

## Core Rule

- The scan witness is primary.
- OCR is evidence, not authority.
- Additional witnesses may confirm, clarify, or expose divergence.
- No external text spine should be used to silently repair the witness.

## Directory Pattern

For each witness, create a dedicated transcription workspace under `C:\woodblocks\Transcriptions\...` with:

- `architect/`
  Consolidated draft, working notes, verification ledger
- `agent_notes/`
  Raw OCR outputs, local crops, agent readouts
- `scripts/`
  Render / OCR helper scripts
- `batch/`
  Coarse page renders, leaf splits, first-pass OCR
- `batch_refined/`
  Refined crops and OCR
- `tessdata/`
  Local Tesseract models when needed

## End-to-End Process

### 1. Pick a base witness

- Choose one actual scan witness as the base transcription target.
- Confirm the local PDF is real and readable.
- If the file is broken, reacquire it before doing any textual work.

### 2. Create the transcription workspace

- Make a dedicated folder under `Transcriptions`.
- Add architect files describing:
  - witness identity
  - page count
  - current rule set
  - current tooling
- Keep witness workspaces separate from one another.

### 3. Render and split the PDF

- Render every PDF page to PNG.
- Split each page into left/right leaf images when the format requires it.
- Create refined frame crops around the actual text block.

### 4. Run OCR first

- Generate OCR for every leaf.
- Use more than one OCR engine when possible:
  - `tesseract`
  - `RapidOCR`
  - `PaddleOCR`
  - other comparators if helpful
- Treat OCR as the first-pass evidence inventory.

Practical use of OCR:

- find likely titles
- detect repeated formulae
- locate clearer leaves
- produce candidate phrase families
- expose where a page is worth deeper human reading

### 5. Read the image second

- Use the witness image to adjudicate OCR.
- Keep what the image supports.
- Reject OCR hallucinations even if they look plausible.
- When a block is readable in substance but not fully secure character by character, transcribe only the stable part.

This became the most effective actual workflow:

1. OCR first for inventory
2. image second for survival
3. patch only what both can defend, or what the image clearly wins by itself

### 6. Build the Markdown draft leaf by leaf

For each leaf, record:

- PDF page / side
- role
- confidence
- consolidated readable text
- notes

Use a stable section shape:

```md
### PDF p.035 right leaf

- Role: body-text leaf, likely `趙州勘婆`
- Confidence: medium

#### Consolidated Readable Text

```text
...
```

#### Notes

- ...
```

### 7. Mark uncertainty honestly

Use explicit uncertainty where needed.

Good:

- keep a partial line and omit the unstable tail
- note that a block is visible but not yet stable
- classify a leaf as seals / blank if that is the truth

Bad:

- silently repairing from memory
- importing outside canonical text
- forcing a full line where only fragments are visible

### 8. Run multi-witness corroboration

Once the base draft exists, add other scan witnesses in separate workspaces.

For each corroborating witness:

1. validate the PDF
2. batch render and OCR it
3. identify first reliable anchors
4. use those anchors to test weak points in the base draft

What corroboration is for:

- correcting bad case-side labels
- confirming title/order clusters
- strengthening weak prose or verse clusters
- testing body/end boundaries
- documenting divergences

What corroboration is not for:

- flattening different witnesses into one artificial text
- replacing the base witness just because another witness is clearer

### 9. Keep a verification ledger

Maintain a file that records:

- which witnesses exist
- what each witness confirms
- what remains base-witness-led
- what remains weak
- what divergences exist

This prevents chat-only decisions from being lost.

### 10. Revisit the weak leaves

After the main body is stable:

- inventory all remaining weak leaves
- work image-first on those leaves
- use OCR only to surface candidate phrases
- patch only what has actually improved

This is where most end-matter cleanup happens.

## Confidence Model

- `high`
  Strong agreement between OCR evidence and image reading, or image is plainly secure
- `medium`
  Main text is readable, but some particles / graphs / transitions remain soft
- `low`
  Text-bearing but still compressed, damaged, or fragmentary

## Practical Heuristics

- Body leaves are usually worth heavy effort.
- End matter often improves in chunks, not clean full leaves.
- One good corroborating witness can fix a bad label even if it cannot solve every graph.
- Three witnesses are enough to make much of the body structurally trustworthy.
- A truly blank or seal-only leaf should be labeled that way, not padded.

## What Worked Best

- Full-leaf batch generation before detailed reading
- OCR-first evidence inventory
- image-based adjudication
- separate witness workspaces
- verification ledger
- direct screenshot review for stubborn leaves
- patching only high-signal improvements

## What Failed or Worked Poorly

- trusting OCR alone on woodblock pages
- using broken PDFs instead of reacquiring them first
- overclaiming from title-only or contents-only matches
- forcing line-level readings from weak corroborants

## Recommended Default

For future projects, default to:

1. choose base witness
2. batch render
3. OCR all leaves
4. build base leaf-by-leaf Markdown draft
5. add 1-2 corroborating scan witnesses
6. run targeted verification on weak clusters
7. finish with image-first cleanup on the remaining trouble leaves
