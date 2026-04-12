# Process Log: [Text Name] ([Publisher Prefix].[Slug])

**Curator:** [name]
**Started:** [date]
**Status:** [in-progress | review | published]
**Source witnesses:** [list with URLs]

---

## How to use this log

This is the running journal for a transcription/editorial project. Write entries as you work, not retroactively. A future scholar, reviewer, or auditor should be able to read this log and understand:
- What was done, in what order, and why
- What tools and methods were used at each stage
- Where editorial judgment was exercised and what alternatives were considered
- What went wrong, what was corrected, and how

Timestamps matter. Brief entries are fine. Honesty about uncertainty is more valuable than false confidence.

---

## Witness acquisition

| Date | Action | Notes |
|------|--------|-------|
| YYYY-MM-DD | Identified [witness] at [source URL] | [rights basis, confidence] |
| YYYY-MM-DD | Downloaded PDF/scan to local | [filename, bytes, sha256] |
| YYYY-MM-DD | Verified rights basis | [PD-old because..., Commons because...] |

---

## Transcription sessions

### Session [N]: [date] [time range]

**Scope:** [which leaves/pages/cases]
**Method:** [OCR model X on leaves 1-20 | human reading of leaves 21-30 | etc.]
**Results:**
- [N] leaves processed, [M] high-confidence, [K] need review
- Notable difficulties: [damaged leaf 17, unclear character at col 4 line 3]

**Decisions made:**
- [character X at leaf 12: OCR reads A, image shows B, chose B because...]
- [case ordering: contents page shows X, body order shows Y, chose contents because...]

**Open questions:**
- [leaf 23 col 2: character unclear, tentatively read as X, needs witness corroboration]

---

## Witness corroboration sessions

### Corroboration [N]: [date] — [which witness]

**Scope:** [cases 1-16 checked against witness 2]
**Method:** [side-by-side comparison of case titles + opening phrases]
**Confirmations:**
- Cases [1, 2, 5, 7, 12]: full text match
- Cases [3, 8]: title match, prose cluster confirmed
- Case [10]: order discrepancy — witness 2 has [X], base has [Y]

**Corrections applied:**
- Case [10]: reordered to match witness 2 because [reason]
- Case [N]: [what changed and why]

**Unresolved:**
- Case [N]: witnesses disagree, keeping base reading because [reason]

---

## Editorial decisions

### Decision [N]: [date] — [one-line summary]

**Context:** [what was the issue]
**Options considered:**
1. [option A] — [pros/cons]
2. [option B] — [pros/cons]

**Chose:** [which option and why]
**Evidence:** [leaf reference, witness comparison, scholarly precedent]
**Reversibility:** [easy to undo / permanent / affects downstream]

---

## Rough readings retained

| Location | Reading | Why kept |
|----------|---------|----------|
| Case N, line M | [unusual text] | Witness-backed: appears in [which witnesses]. Not smoothing to received form because [reason]. |

---

## Assembly / reading edition build

### Chunk [N]: [date] — Cases [X-Y]

**Source:** [DIPLOMATIC_DRAFT.md sections A-B]
**Editorial changes from diplomatic:**
- [normalized punctuation at X]
- [corrected character at Y per witness 2]
- [retained rough reading at Z — see Rough Readings table]

**Status:** [draft | corroborated | review-ready | final]

---

## Quality checks

| Date | Check | Result |
|------|-------|--------|
| YYYY-MM-DD | Case count verification | 48 core + 1 appendix = correct |
| YYYY-MM-DD | Structure audit (gongan + wumen + verse per case) | [N] complete, [M] partial |
| YYYY-MM-DD | Rough readings preserved | All [N] entries verified present |
| YYYY-MM-DD | CBETA independence | No CBETA-derived material found |
| YYYY-MM-DD | Converter re-run | Byte-identical output confirmed |

---

## Publication

| Date | Action | Commit |
|------|--------|--------|
| YYYY-MM-DD | Converter script written | [sha] |
| YYYY-MM-DD | TEI XML generated | [sha] |
| YYYY-MM-DD | manifest.json written | [sha] |
| YYYY-MM-DD | Provenance files committed | [sha] |
| YYYY-MM-DD | Published to OpenZenTexts | v[X.Y.Z] |

---

## Lessons learned

[What would you do differently next time? What worked well? What was harder than expected?]
