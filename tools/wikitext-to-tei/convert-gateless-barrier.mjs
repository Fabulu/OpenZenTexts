// tools/wikitext-to-tei/convert-gateless-barrier.mjs
//
// Converts a Wikisource MediaWiki dump of 無門關 (The Gateless Barrier) into
// a clean TEI-P5 XML file with synthetic line identifiers.
//
// The synthetic line IDs ("wm.case01.l01" etc.) are deliberately distinct
// from CBETA woodblock notation ("0292a25") so a free-licensed source can
// never collide with — or be mistaken for — CBETA-encoded material.
//
// Usage:
//   node convert-gateless-barrier.mjs <input.wikitext> <output.xml>
//
// This is a one-off converter for the Wumenguan structure. The general
// wikitext→TEI tool will be factored out from this once we have a second
// witness to test against.

import { readFileSync, writeFileSync } from 'node:fs';
import { argv } from 'node:process';

if (argv.length < 4) {
    console.error('Usage: node convert-gateless-barrier.mjs <input.wikitext> <output.xml>');
    process.exit(1);
}

const inputPath = argv[2];
const outputPath = argv[3];

const text = readFileSync(inputPath, 'utf8');
const parsed = parseWikitext(text);
const xml = buildTei(parsed);
writeFileSync(outputPath, xml, 'utf8');

console.log(`Wrote ${outputPath}`);
console.log(`  preface lines: ${parsed.preface.length}`);
console.log(`  cases:         ${parsed.cases.length}`);
let totalLines = parsed.preface.length;
for (const c of parsed.cases) {
    totalLines += c.body.length + c.wumen.length + c.verse.length;
}
console.log(`  total lines:   ${totalLines}`);

// ---------------------------------------------------------------------------

function parseWikitext(raw) {
    const result = {
        title: '無門關',
        author: '無門慧開',
        editor: '宗紹',
        year: '1228',
        preface: [],          // array of paragraph strings
        cases: [],            // array of {number, title, body[], wumen[], verse[]}
        afterword: []         // colophons and post-case material
    };

    // 1. Strip the {{Header|...}} block
    let body = raw.replace(/\{\{Header[\s\S]*?\n\}\}/, '');

    // 2. Strip wikitables (the TOC and any others)
    body = body.replace(/\{\|[\s\S]*?\|\}/g, '');

    // 3. Strip MediaWiki templates {{Foo}} / {{Foo|...}} entirely
    body = body.replace(/\{\{[\s\S]*?\}\}/g, '');

    // 4. Drop interwiki and category links entirely (don't keep text).
    //    Examples: [[en:The Gateless Gate]], [[Category:佛教]]
    body = body.replace(/\[\[(?:[a-z]{2,3}|Category|category):[^\]]*\]\]/g, '');

    // 5. For other [[Page]] / [[Page|display]] links, keep the display text only.
    body = body.replace(/\[\[(?:[^\]|]+\|)?([^\]]+)\]\]/g, '$1');

    // 6. Walk lines, build sections.
    const lines = body.split('\n');
    let currentCase = null;
    let activeBucket = 'preface';   // 'preface' | 'body' | 'wumen' | 'verse' | 'afterword'
    let previousBlank = false;

    for (const rawLine of lines) {
        const cleaned = rawLine.replace(/^[\u3000\s]+/, '').replace(/\s+$/, '');
        if (!cleaned) { previousBlank = true; continue; }

        // Paragraph-boundary rule: a Wumenguan verse is always exactly one
        // paragraph (the four 7-character phrases). If we're in 'verse' mode
        // and a blank-line gap was followed by more content, that "more
        // content" is a postface / appendix, NOT additional verse text.
        // Close the current case and route the rest into the afterword
        // until either a new numbered case starts or the file ends.
        if (previousBlank
            && activeBucket === 'verse'
            && currentCase
            && currentCase.verse.length > 0) {
            result.cases.push(currentCase);
            currentCase = null;
            activeBucket = 'afterword';
        }
        previousBlank = false;

        // ── Heading: ==Anything==
        const headingMatch = cleaned.match(/^==\s*(.+?)\s*==$/);
        if (headingMatch) {
            const headingText = headingMatch[1];

            // Numbered case heading, Arabic form: "1. 趙州狗子"
            const arabicCase = headingText.match(/^(\d+)\.\s*(.+)$/);
            if (arabicCase) {
                if (currentCase) result.cases.push(currentCase);
                currentCase = {
                    number: parseInt(arabicCase[1], 10),
                    title: arabicCase[2],
                    body: [],
                    wumen: [],
                    verse: []
                };
                activeBucket = 'body';
                continue;
            }

            // Numbered case heading, Chinese-numeral form: "第四十九則語"
            const chineseCase = headingText.match(/^第([一二三四五六七八九十百]+)則(.*)$/);
            if (chineseCase) {
                if (currentCase) result.cases.push(currentCase);
                const num = chineseToArabic(chineseCase[1]);
                currentCase = {
                    number: num,
                    title: '第' + chineseCase[1] + '則' + chineseCase[2],
                    body: [],
                    wumen: [],
                    verse: []
                };
                activeBucket = 'body';
                continue;
            }

            // Sub-heading inside the current case
            if (headingText === '頌曰') { activeBucket = 'verse'; continue; }
            if (headingText === '無門曰') { activeBucket = 'wumen'; continue; }

            // Any other ==...== heading is metadata noise; skip silently.
            continue;
        }

        // ── Bracketed sub-heading markers
        if (cleaned === '【無門曰】') { activeBucket = 'wumen'; continue; }
        if (cleaned === '【頌曰】')   { activeBucket = 'verse'; continue; }

        // ── In-case duplicate title line ("一　趙州狗子" right after the
        //    Arabic ==1. 趙州狗子== heading). Skip it.
        if (currentCase
            && activeBucket === 'body'
            && currentCase.body.length === 0
            && currentCase.wumen.length === 0
            && currentCase.verse.length === 0
            && /^[一二三四五六七八九十百]+[\s\u3000]/.test(cleaned)) {
            continue;
        }

        // ── Skip standalone TOC labels in the preface
        if (cleaned === '目錄' || cleaned === '目錄（終）') continue;

        // ── Skip the duplicate work-title lines in the preface
        if (cleaned === '禪宗無門關' || cleaned === '無門關') continue;

        // ── Append to the active bucket
        if (currentCase) {
            currentCase[activeBucket].push(cleaned);
        } else {
            result.preface.push(cleaned);
        }
    }

    if (currentCase) result.cases.push(currentCase);
    return result;
}

/**
 * Convert a small Chinese numeral string (up to 99) to its Arabic value.
 * Handles: 一 (1) … 九 (9), 十 (10), 十一-十九, 二十-九十, 二十一-九十九.
 */
function chineseToArabic(s) {
    const map = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };
    if (s.length === 1) return map[s] || 0;
    if (s[0] === '十') return 10 + (map[s[1]] || 0);
    if (s.length === 2 && s[1] === '十') return (map[s[0]] || 0) * 10;
    if (s.length === 3 && s[1] === '十') return (map[s[0]] || 0) * 10 + (map[s[2]] || 0);
    return 0;
}

// ---------------------------------------------------------------------------

/**
 * Split a paragraph into "lines" at sentence boundaries. Splits on Chinese
 * full stop (。), question mark (？), and exclamation (！), keeping the
 * punctuation attached to the preceding chunk. Pure CJK whitespace runs are
 * collapsed to a single ideographic space, so verses with multi-space
 * formatting (e.g. "大道無門　千差有路") survive readably.
 */
function paragraphToLines(paragraph) {
    const collapsed = paragraph.replace(/\u3000{2,}/g, '\u3000');
    const parts = collapsed.split(/(?<=[。！？])/);
    return parts.map((s) => s.trim()).filter((s) => s.length > 0);
}

function paragraphsToLines(paragraphs) {
    const out = [];
    for (const p of paragraphs) {
        for (const line of paragraphToLines(p)) {
            out.push(line);
        }
    }
    return out;
}

// ---------------------------------------------------------------------------

function buildTei(parsed) {
    const out = [];
    out.push('<?xml version="1.0" encoding="UTF-8"?>');
    out.push('<TEI xmlns="http://www.tei-c.org/ns/1.0">');
    out.push('  <teiHeader>');
    out.push('    <fileDesc>');
    out.push('      <titleStmt>');
    out.push('        <title xml:lang="zh-Hant">禪宗無門關</title>');
    out.push('        <title xml:lang="en">The Gateless Barrier of the Chan School</title>');
    out.push('        <title type="alt" xml:lang="ja">無門関 (Mumonkan)</title>');
    out.push('        <author>無門慧開 (Wumen Huikai, 1183–1260)</author>');
    out.push('        <editor role="compiler">宗紹 (Zongshao, fl. 1228)</editor>');
    out.push('        <respStmt>');
    out.push('          <resp>Witness sourcing, vetting, and TEI conversion</resp>');
    out.push('          <name>Read Zen — OpenZenTexts curation</name>');
    out.push('        </respStmt>');
    out.push('      </titleStmt>');
    out.push('      <publicationStmt>');
    out.push('        <publisher>Read Zen — OpenZenTexts</publisher>');
    out.push('        <pubPlace>https://github.com/Fabulu/OpenZenTexts</pubPlace>');
    out.push('        <date when="1228">Composed 1228 (Shaoding 1)</date>');
    out.push('        <availability status="free">');
    out.push('          <licence target="https://creativecommons.org/publicdomain/mark/1.0/">');
    out.push('            <p><label>Work license:</label> Public domain (PD-old). The author Wumen Huikai died in 1260, more than 700 years ago, well beyond any plausible copyright term in any jurisdiction.</p>');
    out.push('          </licence>');
    out.push('          <licence target="https://creativecommons.org/licenses/by-sa/4.0/">');
    out.push('            <p><label>Source-text license:</label> The transcription was extracted from Chinese Wikisource, whose page text is available under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0). Attribution and share-alike obligations apply to the transcription text as published by Wikisource.</p>');
    out.push('          </licence>');
    out.push('          <p><label>Source witness:</label> Chinese Wikisource page "無門關"</p>');
    out.push('          <p><label>Source page:</label> https://zh.wikisource.org/wiki/%E7%84%A1%E9%96%80%E9%97%9C</p>');
    out.push('          <p><label>Stable revision (oldid):</label> https://zh.wikisource.org/w/index.php?title=%E7%84%A1%E9%96%80%E9%97%9C&amp;oldid=2648998</p>');
    out.push('          <p><label>Rights basis:</label> The captured oldid HTML shows page-level PD-old / public-domain language, and the Wikisource site footer declares site text available under CC BY-SA 4.0. Vetting confidence: high.</p>');
    out.push('          <p><label>Provenance check:</label> The captured source package shows no CBETA marker. This file is independent of CBETA-encoded material.</p>');
    out.push('          <p><label>Curator:</label> Read Zen — OpenZenTexts curation, 2026-04-09</p>');
    out.push('          <p><label>Conversion:</label> Generated from the captured wikitext via tools/wikitext-to-tei/convert-gateless-barrier.mjs in this repository. Synthetic line identifiers (wm.*) are used; the file references no CBETA woodblock line notation.</p>');
    out.push('          <p><label>Commercial use:</label> Permitted, subject to attribution and share-alike terms of CC BY-SA 4.0 for the transcription. The underlying work itself is PD-old and unrestricted.</p>');
    out.push('          <p><label>Required attribution (short form):</label> "無門關 (The Gateless Barrier), public domain. Transcription from Chinese Wikisource (oldid 2648998), CC BY-SA 4.0. Compiled by Read Zen — OpenZenTexts."</p>');
    out.push('        </availability>');
    out.push('      </publicationStmt>');
    out.push('      <sourceDesc>');
    out.push('        <bibl>無門慧開 (Wumen Huikai), 禪宗無門關 (Chánzōng Wúménguān / "The Gateless Barrier of the Chan School"), composed Shaoding 1 (1228), compiled by 宗紹 (Zongshao). Forty-eight kōan cases with the master\'s commentary and verses, plus a 49th case appended later by 安晚 (Anwan).</bibl>');
    out.push('        <bibl type="digitalSource">Chinese Wikisource page "無門關", oldid 2648998, captured 2026-04-11. URL: https://zh.wikisource.org/w/index.php?title=%E7%84%A1%E9%96%80%E9%97%9C&amp;oldid=2648998</bibl>');
    out.push('      </sourceDesc>');
    out.push('    </fileDesc>');
    out.push('    <encodingDesc>');
    out.push('      <projectDesc>');
    out.push('        <p>This file is part of the OpenZenTexts collection — Chinese Chan/Zen primary texts curated by the Read Zen project for commercial reusability. Each text in the collection is sourced from a public-domain or freely-licensed witness, with provenance, rights basis, and vetting confidence recorded in this TEI header. The collection deliberately excludes CBETA-derived material so it can be redistributed and built upon without inheriting CBETA non-commercial restrictions.</p>');
    out.push('      </projectDesc>');
    out.push('      <editorialDecl>');
    out.push('        <p><label>Line addressing:</label> This file uses synthetic line identifiers in the form "wm.{section}.{position}" (e.g. wm.case01.l01, wm.case01.wumen.l05, wm.case01.verse.l01). These identifiers are local to this file and do not reference any external woodblock line notation. They are designed never to collide with the CBETA notation (e.g. T48n2005:0292c22) so the two corpora can never be confused.</p>');
    out.push('        <p><label>Sentence segmentation:</label> Paragraphs from the source wikitext are split into "lines" at Chinese sentence-ending punctuation (。！？) so each line bucket is small enough for translation editing.</p>');
    out.push('      </editorialDecl>');
    out.push('    </encodingDesc>');
    out.push('  </teiHeader>');
    out.push('  <text>');
    out.push('    <body>');

    // Every <head> must be preceded by an <lb> that owns its bucket.
    // Without this, the parser's current line-id is whatever the previous
    // section's last <lb> set, and the heading text bleeds into that
    // bucket (e.g. case 2's title appearing as a tail on case 1's last
    // verse line). The leading <lb> creates a fresh empty bucket which
    // the heading text fills, and which the headings array references
    // by lineId so deep links to a section land at the heading itself.

    // Top-level work title
    out.push('      <lb n="wm.title"/>');
    out.push('      <head>禪宗無門關</head>');

    // Preface
    if (parsed.preface.length > 0) {
        const prefaceLines = paragraphsToLines(parsed.preface);
        out.push('      <p>');
        prefaceLines.forEach((line, idx) => {
            const id = `wm.preface.l${pad(idx + 1)}`;
            out.push(`        <lb n="${id}"/>${escapeXml(line)}`);
        });
        out.push('      </p>');
    }

    // Cases
    for (const c of parsed.cases) {
        const caseKey = `case${pad(c.number)}`;

        // Case heading: e.g. "1. 趙州狗子"
        out.push(`      <lb n="wm.${caseKey}.head"/>`);
        out.push(`      <head>${escapeXml(c.number + '. ' + c.title)}</head>`);

        if (c.body.length > 0) {
            const bodyLines = paragraphsToLines(c.body);
            out.push('      <p>');
            bodyLines.forEach((line, idx) => {
                const id = `wm.${caseKey}.l${pad(idx + 1)}`;
                out.push(`        <lb n="${id}"/>${escapeXml(line)}`);
            });
            out.push('      </p>');
        }

        if (c.wumen.length > 0) {
            // 無門曰 sub-heading
            out.push(`      <lb n="wm.${caseKey}.wumen.head"/>`);
            out.push('      <head>無門曰</head>');
            const wumenLines = paragraphsToLines(c.wumen);
            out.push('      <p>');
            wumenLines.forEach((line, idx) => {
                const id = `wm.${caseKey}.wumen.l${pad(idx + 1)}`;
                out.push(`        <lb n="${id}"/>${escapeXml(line)}`);
            });
            out.push('      </p>');
        }

        if (c.verse.length > 0) {
            // 頌曰 sub-heading
            out.push(`      <lb n="wm.${caseKey}.verse.head"/>`);
            out.push('      <head>頌曰</head>');
            const verseLines = paragraphsToLines(c.verse);
            out.push('      <p>');
            verseLines.forEach((line, idx) => {
                const id = `wm.${caseKey}.verse.l${pad(idx + 1)}`;
                out.push(`        <lb n="${id}"/>${escapeXml(line)}`);
            });
            out.push('      </p>');
        }
    }

    out.push('    </body>');
    out.push('  </text>');
    out.push('</TEI>');
    out.push('');
    return out.join('\n');
}

// ---------------------------------------------------------------------------

function pad(n) {
    return String(n).padStart(2, '0');
}

function escapeXml(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
