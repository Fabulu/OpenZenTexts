# Wumenguan 1632 Transcription System

## Scope

This workspace is for a diplomatic-but-readable transcription of the scan in:

- `C:\woodblocks\Wumenguan_1632_NDL_Commons\NDL12865429_wumenguan_1juan.pdf`

The immediate goal is to produce a structured Markdown file with:

- source metadata
- page and leaf references
- normalized readable Chinese text
- explicit uncertainty markers
- an audit trail showing how OCR and independent readers agreed or disagreed

## Directory Layout

- `images/`: rendered PDF pages and cropped leaf images
- `agent_notes/`: raw or lightly cleaned notes from independent agent readers
- `architect/`: consolidated working files and final transcription draft
- `tessdata/`: local Tesseract language models used by this project

## Working Method

For each target leaf:

1. Render the PDF page to PNG.
2. Split the opening into left and right leaf images when useful.
3. Run Tesseract OCR with:
   - `chi_tra_vert`
   - `chi_sim_vert`
   - optionally horizontal models as a weak comparator
4. Ask multiple independent agents to read the same leaf directly from the image.
5. Compare:
   - agent vs agent
   - agent vs OCR
   - image vs any obvious formulaic phrases or titles
6. Consolidate into the architect draft.
7. Mark anything unresolved instead of silently guessing.

OCR should lead the evidence inventory. Direct image reading is then used to adjudicate, reject OCR errors, and cautiously fill remaining gaps.

## Markdown Output Format

Each section should use this shape:

```md
# 無門關

## Source
- Witness: Wumenguan_1632_NDL_Commons
- PDF: `NDL12865429_wumenguan_1juan.pdf`
- Physical description: vertical woodblock print, one fascicle

## Leaf Map
### PDF p.006 right leaf
- Role: preface / opening prose
- Confidence: medium

#### Diplomatic Readable Text
...

#### Notes
- seal or library marks omitted from main text
- uncertain graph: 〔?〕
- alternative reading: 〔疑:通/道〕
```

## Normalization Rules

- Keep Chinese characters.
- Reorder vertical lines into readable horizontal text.
- Preserve section titles and named cases as headings when identifiable.
- Do not modernize wording.
- Omit stamps, library slips, rulers, and color bars from the main text.
- Record paratext in notes if it touches the readable content.

## Uncertainty Markers

- `〔?〕`: unread single character
- `〔疑:甲/乙〕`: two plausible readings
- `〔缺字〕`: one or more missing or illegible characters
- `〔待校〕`: passage needs another pass before acceptance

## Confidence Scale

- `high`: strong agreement between OCR evidence and direct image reading
- `medium`: mostly readable, but some characters remain doubtful
- `low`: OCR and readers disagree materially, or image quality is poor

## Pilot Strategy

Start with:

- table of contents leaf
- opening prose / preface leaf
- one representative koan leaf

This gives an early test across three page types before scaling to the whole fascicle.
