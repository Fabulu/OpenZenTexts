// tools/woodblock-to-tei/convert-wumenguan-1632.mjs
//
// Converts the editorial reading edition at
//   C:\woodblocks\Transcriptions\Wumenguan_1632_NDL_Commons\architect\
//      WUMENGUAN_1632_READING_EDITION.md
// into a clean TEI-P5 XML file for the OpenZenTexts corpus.
//
// The input is a structured markdown file organized as:
//     # 無門關
//     ## 序            (prefatory section)
//     ## 目錄          (TOC — skipped in output)
//     ### N. Title     (cases 1–48 + appended case 49)
//       #### 公案      (case body; may appear multiple times for split gongans)
//       #### 無門曰    (Wumen Huikai's commentary)
//       #### 頌        (verse)
//     ## 跋尾          (back matter — each ### inside is its own appendix div)
//
// The converter emits TEI with:
//   - A <teiHeader> declaring CC0 1.0 Universal, PD-old underlying work,
//     three woodblock witnesses (NDL 1632, Waseda 1752, NDL Huikai-Record),
//     and the editorial reading-edition basis.
//   - A <text><body> structured with <div type="preface">,
//     <div type="case" n="N"> (with nested gongan / wumen-commentary / verse),
//     and <div type="appendix"> (case 49 + back matter).
//   - Synthetic line identifiers in the "wm32.{section}.{position}" namespace.
//     Distinct from the existing ws/gateless-barrier file's "wm.*" namespace
//     so TM / search machinery keyed by line ID cannot cross-pollinate.
//
// Usage:
//   node convert-wumenguan-1632.mjs <input.md> <output.xml>
//
// Deterministic: same input → same output, byte-for-byte.

import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { argv } from 'node:process';

if (argv.length < 4) {
    console.error(
        'Usage: node convert-wumenguan-1632.mjs <input.md> <output.xml>'
    );
    process.exit(1);
}

const inputPath = argv[2];
const outputPath = argv[3];

const inputBuffer = readFileSync(inputPath);
const text = inputBuffer.toString('utf8');
const inputBytes = inputBuffer.length;
const inputSha256 = createHash('sha256').update(inputBuffer).digest('hex').toUpperCase();
const parsed = parseReadingEdition(text);
const xml = buildTei(parsed, {
    inputBytes,
    inputPath,
    inputSha256
});
writeFileSync(outputPath, xml, 'utf8');

console.log(`Wrote ${outputPath}`);
console.log(`  preface blocks: ${parsed.preface.length}`);
console.log(`  core cases:     ${parsed.cases.length}`);
console.log(`  appendix divs:  ${parsed.appendix.length}`);

let totalLines = 0;
for (const para of parsed.preface) totalLines += para.length;
for (const c of parsed.cases) {
    for (const seg of [...c.gongan, ...c.wumen, ...c.verse]) totalLines += seg.length;
}
for (const ap of parsed.appendix) {
    for (const para of ap.paragraphs) totalLines += para.length;
}
console.log(`  total lines:    ${totalLines}`);

// ============================================================================
// PARSER
// ============================================================================

/**
 * Parses the reading-edition markdown into a structured tree.
 *
 * Returns:
 *   {
 *     preface:  Array<Array<string>>,    // paragraphs of lines
 *     cases: [
 *       {
 *         number: Number (1–48),
 *         title:  String,
 *         gongan: Array<Array<string>>,  // may have multiple sub-paragraphs
 *         wumen:  Array<Array<string>>,
 *         verse:  Array<Array<string>>
 *       }
 *     ],
 *     appendix: [
 *       {
 *         label: String,                  // human-readable appendix div head
 *         paragraphs: Array<Array<string>>
 *       }
 *     ]
 *   }
 *
 * Each "line" is a non-empty logical line in the source (markdown soft breaks
 * "line  \n" split into separate lines). Paragraph breaks (blank lines) create
 * new sub-arrays so the TEI can emit them as distinct <p> elements.
 */
function parseReadingEdition(raw) {
    const result = {
        preface: [],
        cases: [],
        appendix: []
    };

    // Normalize line endings and strip trailing trailing-space markdown markers.
    const lines = raw.replace(/\r\n?/g, '\n').split('\n');

    // Tracking state
    let section = null;
    //   'preface'      — top-level ## 序 contents
    //   'toc'          — ## 目錄 contents (we drop these)
    //   'case.gongan'  — inside a ### case, #### 公案 bucket
    //   'case.wumen'   — inside a ### case, #### 無門曰 bucket
    //   'case.verse'   — inside a ### case, #### 頌 bucket
    //   'appendix'     — inside ## 跋尾, accumulating into a ### sub-appendix
    let currentCase = null;
    let currentAppendix = null;
    let currentParagraph = [];

    function flushParagraph() {
        if (currentParagraph.length === 0) return;
        const p = currentParagraph;
        currentParagraph = [];
        if (section === 'preface') {
            result.preface.push(p);
        } else if (section === 'toc') {
            // drop TOC content
        } else if (section === 'case.gongan' && currentCase) {
            currentCase.gongan.push(p);
        } else if (section === 'case.wumen' && currentCase) {
            currentCase.wumen.push(p);
        } else if (section === 'case.verse' && currentCase) {
            currentCase.verse.push(p);
        } else if (section === 'appendix' && currentAppendix) {
            currentAppendix.paragraphs.push(p);
        }
        // else: silently drop (shouldn't happen with well-formed input)
    }

    function finalizeCurrentCase() {
        flushParagraph();
        if (currentCase) {
            result.cases.push(currentCase);
            currentCase = null;
        }
    }

    function finalizeCurrentAppendix() {
        flushParagraph();
        if (currentAppendix) {
            result.appendix.push(currentAppendix);
            currentAppendix = null;
        }
    }

    for (const rawLine of lines) {
        // Strip markdown trailing "  " soft-break markers and trim whitespace.
        const line = rawLine.replace(/\s+$/, '');

        // Blank line → paragraph break.
        if (line === '') {
            flushParagraph();
            continue;
        }

        // Italic meta-commentary like "_〔…〕_" in the TOC: drop.
        if (/^_〔[^〕]+〕_\s*$/.test(line)) {
            continue;
        }

        // ── Headings ────────────────────────────────────────────────────────

        // Level-1: "# 無門關" → top title only, no body content.
        const h1 = line.match(/^#\s+(.+?)\s*$/);
        if (h1 && !line.startsWith('##')) {
            // Top of file; nothing to do — the title is baked into the TEI
            // header, not the body.
            continue;
        }

        // Level-2: "## 序" / "## 目錄" / "## 跋尾"
        const h2 = line.match(/^##\s+(.+?)\s*$/);
        if (h2 && !line.startsWith('###')) {
            const h = h2[1].trim();
            finalizeCurrentCase();
            finalizeCurrentAppendix();
            if (h === '序') {
                section = 'preface';
            } else if (h === '目錄') {
                section = 'toc';
            } else if (h === '跋尾') {
                section = 'appendix';
                // Don't create a currentAppendix yet — wait for the first ### sub.
            } else {
                // Unknown level-2; treat as appendix-like section.
                section = 'appendix';
            }
            continue;
        }

        // Level-3: "### N. Title" (cases) or "### 結尾示眾" etc. (back matter)
        const h3 = line.match(/^###\s+(.+?)\s*$/);
        if (h3 && !line.startsWith('####')) {
            const h = h3[1].trim();

            // Is it a numbered case? "### 1. 趙州狗子" or "### 49. 第四十九則語"
            const caseMatch = h.match(/^(\d+)\.\s*(.+)$/);
            if (caseMatch) {
                const num = parseInt(caseMatch[1], 10);
                const title = caseMatch[2].trim();
                if (num >= 1 && num <= 48) {
                    finalizeCurrentCase();
                    finalizeCurrentAppendix();
                    currentCase = {
                        number: num,
                        title,
                        gongan: [],
                        wumen: [],
                        verse: []
                    };
                    section = 'case.gongan'; // cases open in gongan mode by default
                    // until a #### subheading switches the bucket
                    continue;
                } else {
                    // Case 49 — late addition. Route into the appendix instead.
                    finalizeCurrentCase();
                    finalizeCurrentAppendix();
                    currentAppendix = {
                        label: `Case ${num} — ${title} (late appended material, not part of the core 48)`,
                        paragraphs: []
                    };
                    section = 'appendix';
                    continue;
                }
            }

            // Otherwise it's a named back-matter section inside 跋尾.
            finalizeCurrentAppendix();
            currentAppendix = {
                label: h,
                paragraphs: []
            };
            section = 'appendix';
            continue;
        }

        // Level-4: "#### 公案" / "#### 無門曰" / "#### 頌"
        const h4 = line.match(/^####\s+(.+?)\s*$/);
        if (h4) {
            const h = h4[1].trim();
            flushParagraph();
            if (!currentCase) {
                // #### inside appendix — treat as a label break (rare); ignore.
                continue;
            }
            if (h === '公案') {
                section = 'case.gongan';
            } else if (h === '無門曰') {
                section = 'case.wumen';
            } else if (h === '頌') {
                section = 'case.verse';
            }
            // Unknown #### → stay in current bucket.
            continue;
        }

        // ── Body content line ────────────────────────────────────────────────
        //
        // Inside 目錄 / preface / case-buckets / appendix, this is a content
        // line. Push it into the current paragraph.

        // In the TOC, drop everything (labels like "目錄終" too).
        if (section === 'toc') continue;

        // Collapse runs of multiple ideographic or ASCII spaces to a single
        // ideographic space — this matches the existing converter's behaviour
        // for verse-layout preservation.
        let normalized = line
            .replace(/[\u3000]+/g, '\u3000')
            .replace(/ {2,}/g, ' ')
            .trim();

        if (normalized === '') continue;

        currentParagraph.push(normalized);
    }

    // End of file — flush whatever is still open.
    flushParagraph();
    if (currentCase) {
        result.cases.push(currentCase);
        currentCase = null;
    }
    if (currentAppendix) {
        result.appendix.push(currentAppendix);
        currentAppendix = null;
    }

    return result;
}

// ============================================================================
// TEI BUILDER
// ============================================================================

function buildTei(parsed, inputMeta) {
    const out = [];
    out.push('<?xml version="1.0" encoding="UTF-8"?>');
    out.push('<TEI xmlns="http://www.tei-c.org/ns/1.0">');
    out.push('  <teiHeader>');
    emitFileDesc(out, inputMeta);
    emitEncodingDesc(out);
    out.push('  </teiHeader>');
    out.push('  <text>');
    out.push('    <body>');
    emitPreface(out, parsed.preface);
    for (const c of parsed.cases) emitCase(out, c);
    emitAppendix(out, parsed.appendix);
    out.push('    </body>');
    out.push('  </text>');
    out.push('</TEI>');
    out.push('');
    return out.join('\n');
}

function emitFileDesc(out, inputMeta) {
    out.push('    <fileDesc>');
    out.push('      <titleStmt>');
    out.push('        <title xml:lang="zh-Hant">無門關（一六三二年和刻本，国立国会図書館本・編訂讀本）</title>');
    out.push('        <title xml:lang="en">The Gateless Barrier — 1632 NDL Woodblock Reading Edition</title>');
    out.push('        <title type="alt" xml:lang="zh-Hant">無門關（1632 NDL 和刻本）</title>');
    out.push('        <title type="alt" xml:lang="ja">無門関 — 1632年国会図書館本 読本版</title>');
    out.push('        <title type="alt" xml:lang="en">Wumenguan / Mumonkan — 1632 NDL block, Read Zen reading edition</title>');
    out.push('        <author>無門慧開 (Wumen Huikai, 1183–1260)</author>');
    out.push('        <editor role="compiler">宗紹 (Zongshao, fl. 1228)</editor>');
    out.push('        <editor role="reading-edition">Read Zen — OpenZenTexts curation</editor>');
    out.push('        <respStmt>');
    out.push('          <resp>Witness sourcing, OCR, image adjudication, editorial rebuild, and TEI conversion</resp>');
    out.push('          <name>Read Zen — OpenZenTexts curation</name>');
    out.push('        </respStmt>');
    out.push('      </titleStmt>');
    out.push('      <publicationStmt>');
    out.push('        <publisher>Read Zen — OpenZenTexts</publisher>');
    out.push('        <pubPlace>https://github.com/Fabulu/OpenZenTexts</pubPlace>');
    out.push('        <date when="1228">Composed 1228 (Shaoding 1) — base witness printed 1632</date>');
    out.push('        <availability status="free">');
    out.push('          <licence target="https://creativecommons.org/publicdomain/zero/1.0/">');
    out.push('            <p><label>Reading-edition license:</label> Creative Commons CC0 1.0 Universal (public domain dedication). The editor dedicates this reading edition — including the line-ID scheme, segmentation, case ordering, and small editorial repairs — to the public domain. You may use, copy, modify, redistribute, translate, sell, or build commercial products from this file without any obligation to attribute, share-alike, or notify anyone.</p>');
    out.push('          </licence>');
    out.push('          <licence target="https://creativecommons.org/publicdomain/mark/1.0/">');
    out.push('            <p><label>Underlying work license:</label> Public domain (PD-old). The author Wumen Huikai died in 1260, more than 760 years ago, well beyond any plausible copyright term in any jurisdiction. The 1632 Japanese woodblock witness is a mechanical reproduction of a public-domain original.</p>');
    out.push('          </licence>');
    out.push('          <p><label>Base witness:</label> NDL 12865429 無門關 1卷 (Japan, 1632 woodblock imprint). Hosted on Wikimedia Commons as a public-domain mechanical scan.</p>');
    out.push('          <p><label>Base witness URL:</label> https://commons.wikimedia.org/wiki/File:NDL12865429_%E7%84%A1%E9%96%80%E9%97%9C_1%E5%8D%B7.pdf</p>');
    out.push('          <p><label>Base witness local PDF:</label> C:\\woodblocks\\Wumenguan_1632_NDL_Commons\\NDL12865429_wumenguan_1juan.pdf (188,151,699 bytes, SHA-256 64D5CB03D60C70E94DE5BAC514BE6BEF3956892E51011CE5F80A163252B50026)</p>');
    out.push('          <p><label>Corroborating witness (secondary):</label> Waseda University Library bunko31 e1102 無門關 1卷 (Japan, 1752 woodblock imprint), hosted on Wikimedia Commons as a public-domain mechanical scan. URL: https://commons.wikimedia.org/wiki/File:WUL-bunko31_e1102_%E7%84%A1%E9%96%80%E9%96%A2.pdf — local PDF: C:\\woodblocks\\Mumonkan_1752_Waseda_Commons\\WUL-bunko31_e1102_mumonkan.pdf (47,017,686 bytes, SHA-256 A88B551B9C168D6FC946E27130EB0012A8F562815E85E5E8305DD6F9ECCD0C5F). Confidence: medium-high (Commons-hosted PD-old).</p>');
    out.push('          <p><label>Corroborating witness (context):</label> NDL 2537788 無門慧開禪師語錄 (the Wumen-Huikai Record — a collected sayings-record of the same master). Commons file page: https://commons.wikimedia.org/wiki/File:NDL2537788_%E7%84%A1%E9%96%80%E9%96%8B%E5%92%8C%E5%B0%9A%E8%AA%9E%E9%8C%B2.pdf. DOI: 10.11501/2537788. Local PDF: C:\woodblocks\Wumen_Huikai_NDL_Commons\NDL2537788_wumen_kai_record.redownload2.pdf (246,780,631 bytes, SHA-256 782397C4D09627ECAF40EB6EBEF698E96B45A7FD743FC9A3FD6BB766D3319494). The Commons file page is categorized PD-Japan and PD-scan (PD-Japan); this witness is vetted high and is cited here as a tertiary corroborant for Huikai\'s voice only, not as a primary authority.</p>');
    out.push('          <p><label>Rights basis:</label> All three witnesses are PD by age (Song-era core work; 1632/1752 Japanese woodblock imprints; mechanical scans by Wikimedia Commons and/or the NDL). The editorial reading-edition layer — the segmentation, line-ID scheme, case ordering, small repairs — is the editor\'s own creative work and is released under CC0 1.0. No attribution is required.</p>');
    out.push('          <p><label>Provenance check:</label> The captured source package shows no CBETA marker. This file is independent of CBETA-encoded material and uses a synthetic "wm32.*" line-ID namespace that cannot collide with CBETA woodblock notation.</p>');
    out.push('          <p><label>Curator:</label> Read Zen — OpenZenTexts curation, 2026-04-12</p>');
    out.push(`          <p><label>Conversion:</label> Generated from the editorial reading-edition markdown (${inputMeta.inputPath}, ${inputMeta.inputBytes.toLocaleString('en-US')} bytes, SHA-256 ${inputMeta.inputSha256}) via tools/woodblock-to-tei/convert-wumenguan-1632.mjs in this repository. The conversion is deterministic and idempotent — same input, same output.</p>`);
    out.push('          <p><label>Commercial use:</label> Fully permitted. No obligations of any kind. CC0 1.0 Universal dedicates the editorial layer to the public domain.</p>');
    out.push('          <p><label>Required attribution:</label> None. Attribution is welcome but not required. If you want to credit the source anyway, a suggested short form is: "無門關 — 1632 NDL Woodblock Reading Edition, Read Zen OpenZenTexts (CC0)."</p>');
    out.push('        </availability>');
    out.push('      </publicationStmt>');
    out.push('      <sourceDesc>');
    out.push('        <bibl>無門慧開 (Wumen Huikai), 禪宗無門關 (Chánzōng Wúménguān / "The Gateless Barrier of the Chan School"), composed Shaoding 1 (1228), compiled by 宗紹 (Zongshao). Forty-eight kōan cases with the master\'s commentary (無門曰) and verses (頌), plus a later-appended 49th-case addendum by 安晚 (Anwan). This file presents the 1632 Japanese woodblock witness as an editorial reading edition — not a diplomatic transcript, not a full critical edition.</bibl>');
    out.push('        <bibl type="witness-base">NDL 12865429 無門關 1卷 (Japan, 1632 woodblock imprint). Wikimedia Commons file: https://commons.wikimedia.org/wiki/File:NDL12865429_%E7%84%A1%E9%96%80%E9%97%9C_1%E5%8D%B7.pdf — local PDF: NDL12865429_wumenguan_1juan.pdf (188,151,699 bytes).</bibl>');
    out.push('        <bibl type="witness-secondary">Waseda University Library bunko31 e1102 無門關 1卷 (Japan, 1752 woodblock imprint). Wikimedia Commons file: https://commons.wikimedia.org/wiki/File:WUL-bunko31_e1102_%E7%84%A1%E9%96%80%E9%96%A2.pdf — local PDF: WUL-bunko31_e1102_mumonkan.pdf (47,017,686 bytes).</bibl>');
    out.push('        <bibl type="witness-context">NDL 2537788 無門慧開禪師語錄 (Wumen Huikai Recorded Sayings). Commons file: https://commons.wikimedia.org/wiki/File:NDL2537788_%E7%84%A1%E9%96%80%E9%96%8B%E5%92%8C%E5%B0%9A%E8%AA%9E%E9%8C%B2.pdf. DOI: 10.11501/2537788. Local PDF: NDL2537788_wumen_kai_record.redownload2.pdf (246,780,631 bytes). Commons rights posture: PD-Japan / PD-scan (PD-Japan). Used as a tertiary corroborant for Huikai\'s voice only.</bibl>');
    out.push(`        <bibl type="digitalSource">Editorial reading-edition markdown rebuilt from the three witnesses above via OCR-first comparison (tesseract, RapidOCR, PaddleOCR, selective EasyOCR), image adjudication, and selective manual repair. Captured from ${inputMeta.inputPath}.</bibl>`);
    out.push('      </sourceDesc>');
    out.push('    </fileDesc>');
}

function emitEncodingDesc(out) {
    out.push('    <encodingDesc>');
    out.push('      <projectDesc>');
    out.push('        <p>This file is part of the OpenZenTexts collection — Chinese Chan/Zen primary texts curated by the Read Zen project for commercial reusability. Each text in the collection is sourced from a public-domain or freely-licensed witness, with provenance, rights basis, and vetting confidence recorded in this TEI header. The collection deliberately excludes CBETA-derived material so it can be redistributed and built upon without inheriting CBETA non-commercial restrictions.</p>');
    out.push('      </projectDesc>');
    out.push('      <editorialDecl>');
    out.push('        <p><label>Edition kind:</label> This is an <hi rend="italic">editorial reading edition</hi>. It is neither a diplomatic transcript of the 1632 NDL woodblock witness nor a full critical edition. It is a readable editorial text rebuilt from the 1632 base witness, tightened by local OCR comparison, image adjudication, and selective corroboration from two additional PD woodblock witnesses (Waseda 1752 and the NDL Wumen-Huikai Record). Apparatus (variant readings, per-leaf witness notes) is deliberately kept out of this body for v1; the witness-level notes live separately in C:\\woodblocks\\Transcriptions\\Wumenguan_1632_NDL_Commons\\architect\\WUMENGUAN_1632.md and THREE_WITNESS_VERIFICATION.md and may be surfaced in a future version as a <gi>div</gi> of <att>type</att> "apparatus".</p>');
    out.push('        <p><label>Line addressing:</label> This file uses synthetic line identifiers in the form "wm32.{section}.{position}" (e.g. wm32.case01.l01, wm32.case01.wumen.l05, wm32.case01.verse.l01, wm32.appendix.case49.verse.l01). The "wm32" prefix is deliberately distinct from the existing OpenZenTexts file ws/gateless-barrier/gateless-barrier.xml, which uses "wm.*" — the two files coexist in the same corpus and any TM or search machinery keyed by line ID must not cross-pollinate them. These identifiers are local to this file, do not reference any external woodblock line notation, and cannot collide with CBETA notation (e.g. T48n2005:0292c22).</p>');
    out.push('        <p><label>Sentence segmentation:</label> Lines in the source markdown (one logical line per markdown soft break "line  \\n" or per blank-line-separated paragraph) are preserved one-to-one as <gi>lb</gi> buckets in the TEI. The source markdown\'s editorial segmentation is respected and not re-split at sentence-ending punctuation — unlike the ws/gateless-barrier file, which re-splits Wikisource paragraphs at 。！？ boundaries. Keeping the source segmentation here honours the reading-edition\'s own editorial shape.</p>');
    out.push('        <p><label>Case 49 and back matter:</label> Cases 1–48 are the structurally complete core sequence. Case 49 (第四十九則語) is late-appended material and is placed outside the core 48-case spine, inside a <gi>div</gi> of <att>type</att> "appendix" with a <gi>head</gi> explicitly naming it as a late addition. Subsequent back-matter sections (跋尾) — the closing address, colophon, 黃龍三關 摘句, 題贊與銜名, 刊記, etc. — each sit in their own <gi>div</gi> of <att>type</att> "appendix" labelled with the source section name.</p>');
    out.push('        <p><label>Intentionally rough readings:</label> Several passages in the reading edition are witness-backed but locally rough. They are retained verbatim from the reading-edition markdown and are not silently normalized here: (1) "說道有門，無阿師分" in the prefatory material; (2) "請續一向" in case 20; (3) the case 31 無門曰 wording, which is a witness-derived form rather than the familiar received version. These are intentional editorial choices, not OCR errors.</p>');
    out.push('        <p><label>Editorial repairs baked into the reading edition:</label> The received prefatory opening beginning "佛語心為宗" has been restored. Case 10 reads in the standard order 公案 → 無門曰 → 頌. Case 17 received a coherence pass. Cases 27 and 28 are in the received order (27 = 不是心佛, 28 = 久響龍潭). Case 31 no longer carries imported 龍潭 material. Case 32 uses the expected 阿難乃佛弟子 / 劍刃上行 commentary and verse set. These are noted here so a future editor cannot accidentally "fix" them back to a witness-raw form.</p>');
    out.push('      </editorialDecl>');
    out.push('    </encodingDesc>');
}

// ----------------------------------------------------------------------------

function emitPreface(out, prefaceParagraphs) {
    if (prefaceParagraphs.length === 0) return;
    out.push('      <div type="preface" xml:id="wm32.preface">');
    out.push('        <lb n="wm32.preface.head"/>');
    out.push('        <head>序</head>');
    let lineIdx = 0;
    for (const paragraph of prefaceParagraphs) {
        out.push('        <p>');
        for (const line of paragraph) {
            lineIdx += 1;
            const id = `wm32.preface.l${pad(lineIdx, 3)}`;
            out.push(`          <lb n="${id}"/>${escapeXml(line)}`);
        }
        out.push('        </p>');
    }
    out.push('      </div>');
}

function emitCase(out, c) {
    const caseKey = `case${pad(c.number, 2)}`;
    const caseId = `wm32.${caseKey}`;
    out.push(`      <div type="case" n="${c.number}" xml:id="${caseId}">`);
    out.push(`        <lb n="${caseId}.head"/>`);
    out.push(`        <head>${escapeXml(c.number + '. ' + c.title)}</head>`);

    if (c.gongan.length > 0) {
        emitSubsection(out, c.gongan, 'gongan', '公案', caseId);
    }
    if (c.wumen.length > 0) {
        emitSubsection(out, c.wumen, 'wumen-commentary', '無門曰', caseId);
    }
    if (c.verse.length > 0) {
        emitSubsection(out, c.verse, 'verse', '頌', caseId);
    }

    out.push('      </div>');
}

/**
 * Emit one sub-section (gongan, wumen-commentary, or verse) of a case.
 * Each line in each paragraph gets its own <lb> with an id scoped by the
 * sub-section prefix, so ids stay unique even when the case body has multiple
 * paragraph breaks (e.g. case 2's three-part 公案).
 */
function emitSubsection(out, paragraphs, divType, headText, caseId) {
    const subPrefix =
        divType === 'gongan'
            ? ''
            : divType === 'wumen-commentary'
            ? 'wumen.'
            : 'verse.';
    // Sub-section head ID — use a distinct suffix so it can never collide with
    // the outer case div's "head" id (e.g. "wm32.case27.head" already names
    // the case-div head; the gongan sub-head gets "wm32.case27.gongan-head"
    // so each <lb n="..."/> id is unique in the document).
    const headId =
        divType === 'gongan'
            ? `${caseId}.gongan-head`
            : `${caseId}.${subPrefix}head`;
    out.push(`        <div type="${divType}">`);
    out.push(`          <lb n="${headId}"/>`);
    out.push(`          <head>${escapeXml(headText)}</head>`);
    let lineIdx = 0;
    for (const paragraph of paragraphs) {
        out.push('          <p>');
        for (const line of paragraph) {
            lineIdx += 1;
            const id = `${caseId}.${subPrefix}l${pad(lineIdx, 2)}`;
            out.push(`            <lb n="${id}"/>${escapeXml(line)}`);
        }
        out.push('          </p>');
    }
    out.push('        </div>');
}

function emitAppendix(out, appendixDivs) {
    if (appendixDivs.length === 0) return;
    for (let i = 0; i < appendixDivs.length; i += 1) {
        const ap = appendixDivs[i];
        const slug = slugForAppendix(ap.label, i);
        const apId = `wm32.appendix.${slug}`;
        out.push(`      <div type="appendix" xml:id="${apId}">`);
        out.push(`        <lb n="${apId}.head"/>`);
        out.push(`        <head>${escapeXml(ap.label)}</head>`);
        let lineIdx = 0;
        for (const paragraph of ap.paragraphs) {
            out.push('        <p>');
            for (const line of paragraph) {
                lineIdx += 1;
                const id = `${apId}.l${pad(lineIdx, 2)}`;
                out.push(`          <lb n="${id}"/>${escapeXml(line)}`);
            }
            out.push('        </p>');
        }
        out.push('      </div>');
    }
}

function slugForAppendix(label, fallbackIdx) {
    // Well-known back-matter section names → short Latin slugs.
    if (label.startsWith('Case 49')) return 'case49';
    const known = {
        結尾示眾: 'closing-address',
        識語: 'colophon',
        無門關卷終: 'volume-end',
        黃龍三關摘句: 'huanglong-sanguan',
        題贊與銜名: 'dedication-titles',
        附錄相連散文: 'appended-prose',
        刊記: 'imprint'
    };
    if (known[label]) return known[label];
    return `misc${pad(fallbackIdx + 1, 2)}`;
}

// ============================================================================
// UTILITIES
// ============================================================================

function pad(n, width) {
    return String(n).padStart(width, '0');
}

function escapeXml(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
