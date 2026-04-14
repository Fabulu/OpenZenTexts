# Edition Plan: 信心銘 (Faith in Mind)

**Slug:** faith-in-mind
**Edition kind:** critical_edition
**Target maturity:** draft (scaffolding phase)
**Curator:** Read Zen — OpenZen curation
**Created:** 2026-04-14

## Scope

Produce a rigorous critical edition of the 信心銘 attributed to the Third Patriarch Sengcan (僧璨, d. 606), using OCR-first methodology against free scan witnesses.

## Target witnesses

### Base text (8 physical witnesses, 4 families)

| Family | Witness | Source | Role |
|---|---|---|---|
| standalone | 三祖大師信心銘 (Korea/Commons) | Wikimedia Commons | base candidate |
| 四部録 | NDL 2537640 | Wikimedia Commons | primary collation |
| 四部録 | Kyoto RB00009461 (1629) | Kyoto University | primary collation |
| 四部録 | Kyoto RB00012929 (1631) | Kyoto University | primary collation |
| 四部録 | Waseda WUL-bunko31_e1087 | Wikimedia Commons | primary collation |
| 四部録抄 | Waseda WUL-bunko31_e1089 | Wikimedia Commons | secondary collation |
| 四部録抄 | NDL 2537799 | Wikimedia Commons | secondary collation |
| 入衆日用 | Kyoto RB00016909 | Kyoto University | secondary collation |

### Control witnesses (not base text)

| Type | Count | Role |
|---|---|---|
| Japanese translation anthologies | 2 | reception/variant control |
| Commentary witnesses | 11 | variant readings, interpretation history |
| Secondary study | 1 | modern scholarly context |

## Base witness selection

The standalone Korean Commons witness (三祖大師信心銘) is the strongest base candidate because:
- It is a dedicated standalone text, not an excerpt from an anthology
- It is freely available on Wikimedia Commons
- It provides an independent transmission line outside the 四部録 family

Final base witness selection depends on collation results.

## Success conditions

1. All 8 base witnesses acquired, hashed, and rights-locked
2. OCR run on all scan witnesses
3. Collation table built for all variant loci
4. Apparatus entries for all non-trivial variants
5. Decision records for all editorial choices
6. TEI output with anchored critical notes (`nkr_note_crit_*`)
7. All JSON artifacts (process, apparatus, stats, documents) validate

## Out of scope

- Full commentary analysis (commentaries are control witnesses only)
- Japanese translation comparison (reception witnesses only)
- Diplomatic transcripts of every witness (only base + key variants)
- Final publication (this plan covers through draft stage)
