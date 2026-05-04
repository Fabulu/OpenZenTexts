# 無門關

## Source

- Witness: `Wumenguan_1632_NDL_Commons`
- PDF: `NDL12865429_wumenguan_1juan.pdf`
- Page count: 57
- Current state: scan-derived witness draft and leaf-level evidence log

## Method

- PDF pages rendered locally with PyMuPDF
- Tesseract 5.5.0 installed locally
- Chinese OCR models added locally in workspace:
  - `chi_tra`
  - `chi_sim`
  - `chi_tra_vert`
  - `chi_sim_vert`
- Independent image-reading agents used as cross-checkers
- Full witness leaf OCR pass completed under `batch_refined/`

## Witness Leaves

### PDF p.006 left leaf

- Role: 目錄 leaf
- Confidence: medium

#### Consolidated Readable Text

```text
目錄

大道無門
千差有路
透得此關
乾坤獨步

佛祖機緣
四十八則

趙州狗子
倶胝豎指
香嚴上樹
百丈野狐
胡子無鬚
世尊拈花
```

#### Notes

- This is only a partial recovery of the visible contents entries.
- `倶胝豎指` is now the working reading.
- More contents entries are visible on the leaf and should be recovered in a dedicated pass.

### PDF p.007 left leaf

- Role: contents continuation
- Confidence: medium

#### Consolidated Readable Text

```text
不思善惡
三座說法
不是心佛
非風非幡
趙州勘婆
非心非佛
倩女離魂
庭前柏樹

離却語言
二僧卷簾
久響龍潭
即心即佛
外道問佛
智不是道
路逢達道
牛過窓櫺
```

#### Notes

- This leaf is a clean enough witness continuation of the contents list.
- `倩女離魂` is now adopted as the working reading.
- `久響龍潭` and `牛過窓櫺` are supported by both the image and the stronger OCR comparators.

### PDF p.008 right leaf

- Role: contents ending
- Confidence: medium

#### Consolidated Readable Text

```text
目錄終

雲門話墮
達磨安心
首山竹篦
他是阿誰
兜率三關

趯倒淨瓶
女子出定
芭蕉拄杖
竿頭進步
乾峰一路
```

#### Notes

- The leaf heading `目錄終` is clear in the witness.
- `趯倒淨瓶` and `乾峰一路` are supported by the image, though the first graph of `趯倒` is not especially dark.
- `PaddleOCR` helped on this leaf by segmenting the vertical lines more cleanly than `tesseract`.

### PDF p.006 right leaf

- Role: opening prose / prefatory explanation
- Confidence: medium

#### Consolidated Readable Text

```text
作敲門瓦子，隨機引導學者，竟爾抄錄，不覺成集。
初不以前後敘列，共成四十八則，通曰無門關。
若是箇漢，單刀直入，八臂那吒，擱他不住。
縱使西天四七，東土二三，只得望風乞命。
設或躊躇，也似隔窗看馬騎，貶得眼來，早已蹉過。
```

#### Notes

- `學者` is a consolidation choice from image-based comparison only.
- The opening phrase `作敲門瓦子` is supported by direct image reading.
- `單刀直入` is now resolved from the witness.
- OCR output was substantially weaker than the image-reading agents, so OCR is comparator-only here.

### PDF p.011 left leaf

- Role: commentary and verse on `百丈野狐`
- Confidence: high

#### Consolidated Readable Text

```text
無門曰：
不落因果，為甚墮野狐？
不昧因果，為甚脫野狐？
若向者裏著得一隻眼，
便知得前百丈贏得風流五百生。

頌曰
不落不昧，
兩采一賽。
不昧不落，
千錯萬錯。
```

#### Notes

- The key doctrinal pair `不落因果 / 不昧因果` is very clear in the witness.
- The verse is stable and visually well supported.

### PDF p.009 left leaf

- Role: continuation of `趙州狗子`
- Confidence: medium

#### Consolidated Readable Text

```text
如吞了箇熱鐵丸，相似吐又吐不出。
蕩盡從前惡知惡覺，久久純熟。
自然內外打成一片，如啞子得夢，只許自知。
驀然打發，驚天動地。
如奪得關將軍大刀入手，
逢佛殺佛，逢祖殺祖。
於生死岸頭得大自在，
向六道四生中遊戲三昧。
且作麼生提撕。
盡平生氣力，舉箇無字。
若不間斷，
好似法燭一點便著。
```

#### Notes

- This leaf is readable enough to continue the opening `趙州狗子` instructions in a coherent block.
- `PaddleOCR` was especially helpful on the lines beginning `蕩盡從前` and `自然內外`.
- A few punctuation choices remain editorial, but the underlying witness text is stable enough for this draft.

### PDF p.009 right leaf

- Role: opening prose on `趙州狗子`
- Confidence: medium

#### Consolidated Readable Text

```text
師關只者一箇無字，乃宗門一關也。
遂目之曰禪宗無門關。
透得過者，非但親見趙州，
便可與歷代祖師把手共行，
眉毛廝結，同一眼見，同一耳聞。
豈不慶快。
莫有要透關底麼。
將三百六十骨節、八萬四千毫竅，
通身起箇疑團，參箇無字。
晝夜提撕，莫作虛無會，
莫作有無會。
```

#### Notes

- This leaf is substantially clearer with `RapidOCR` and `PaddleOCR` as comparators than with `tesseract` alone.
- A few particles remain too faint to claim more than medium confidence, but the core prose block is secure from the witness.

### PDF p.010 right leaf

- Role: end of `趙州狗子` verse and opening of `百丈野狐`
- Confidence: medium-high

#### Consolidated Readable Text

```text
狗子佛性
全提正令
纔涉有無
喪身失命

〔百丈野狐〕

百丈和尚，凡參次，
有一老人常隨眾聽法。
眾人退，老人亦退。
忽一日不退。
師遂問：
面前立者復是何人。
老人云：諾，某甲非人也。
```

#### Notes

- The case boundary is clear: the verse ending `趙州狗子` is followed by the opening of `百丈野狐`.
- The prose opening of `百丈野狐` is strong through `面前立者復是何人`; the old man’s reply begins on the leaf but is not fully secure from this page alone.
- `PaddleOCR` gave the cleanest support on the verse and opening prose lines here.
- Third-witness corroboration:
  - `C:\woodblocks\Transcriptions\Mumonkan_1752_Waseda_Commons\batch_refined\frames\page_013_left_frame.png`
  - `C:\woodblocks\Transcriptions\Mumonkan_1752_Waseda_Commons\batch_refined\frames\page_013_right_frame.png`
  - independently support the same `不落因果 / 不昧因果 / 五百生 / 野狐` cluster in the surrounding `百丈野狐` material

### PDF p.010 left leaf

- Role: continuation of `百丈野狐`
- Confidence: medium

#### Consolidated Readable Text

```text
老人云：
諾，某甲非人也。
於過去迦葉佛時，曾住此山。
因學人問：
大修行底人，還落因果也無。
某甲對云：不落因果。
五百生墮野狐身。
今請和尚代一轉語，貴脫野狐。
遂問：
大修行底人，還落因果也無。
師云：不昧因果。
老人於言下大悟。
作禮云：
某甲已脫野狐身，住在山後。
敢告和尚，乞依亡僧事例。
師令維那白槌告眾。
```

#### Notes

- The witness strongly supports the doctrinal pair `不落因果 / 不昧因果`.
- The final action phrase beginning `師令維那...` continues onto the next leaf and remains incomplete here.
- `RapidOCR` and `PaddleOCR` both materially outperformed `tesseract` on this leaf.

### PDF p.012 right leaf

- Role: prose on `俱胝豎指`
- Confidence: high

#### Consolidated Readable Text

```text
〔俱胝豎指〕

俱胝和尚，凡有詰問，唯豎一指。
後有童子，因外人問和尚說何法要，
童子亦豎指頭。
胝聞，遂以刀斷其指。
童子負痛號哭而去。
胝復召之。
童子回首。
胝卻豎起指。
童子忽然領悟。

胝將順世，謂眾曰：
吾得天龍一指頭禪，
一生受用不盡。
言訖示滅。
```

#### Notes

- The witness graph on the contents leaf may look like `堅指`, but this body leaf supports `俱胝豎指`.
- This page is one of the clearest prose leaves in the current sample set.

### PDF p.011 right leaf

- Role: later prose on `百丈野狐`
- Confidence: medium

#### Consolidated Readable Text

```text
〔師令維那白槌告眾：〕
食後送亡僧。
大眾言議：
一眾皆安涅槃堂，又無人病，何故如是。
食後只見師領眾至山後巖下，
以杖挑出一死野狐，乃依火葬。
師至晚上堂，舉前因緣。
黃蘗便問：
古人錯祇對一轉語，
墮五百生野狐身。
轉轉不錯，合作箇甚麼。
師云：近前來與伊道。
黃蘗遂近前與師一掌。
師拍手笑云：將謂胡鬚赤，更有赤鬚胡。
```

#### Notes

- `PaddleOCR` failed on this leaf with a runtime exception, but `RapidOCR`, `tesseract`, and the image itself were enough to recover the main prose block.
- The final line after `師拍手笑云` is present but not yet secure enough from this leaf alone for a clean witness-only reading.

### PDF p.012 left leaf

- Role: commentary on `俱胝豎指`, verse, and opening of `胡子無鬚`
- Confidence: medium-high

#### Consolidated Readable Text

```text
無門曰：
俱胝并童子悟處，不在指頭上。
若向者裏見得，
天龍同俱胝并童子，
與自己一串穿却。

頌曰
俱胝鈍置老天龍，
利刃單提勘小童。
巨靈擡手無多子，
分破華山千萬重。

〔胡子無鬚〕
```

#### Notes

- The verse is strongly supported by both the image and the stronger OCR comparators.
- The title `胡子無鬚` is clear enough to mark the next case boundary confidently.
- `PaddleOCR` was the cleanest OCR comparator on this leaf.

### PDF p.013 right leaf

- Role: commentary and verse on `胡子無鬚`, with opening of `香嚴上樹`
- Confidence: medium

#### Consolidated Readable Text

```text
〔胡子無鬚〕

或庵曰：
西天胡子，因甚無鬚。

無門曰：
參須實參，悟須實悟。
者箇胡子，直須親見一回，始得。
說親見，早成兩箇。

頌曰
癡人面前，
不可說夢。
胡子無鬚，
惺惺添懵。

〔香嚴上樹〕
```

#### Notes

- The page is faint but the case identity and the main prose/verse structure are recoverable from the image.
- `RapidOCR` was more useful here than `tesseract`.
- The verse reading is scan-supported but still not as secure as the clearer early leaves.

### PDF p.013 left leaf

- Role: prose on `香嚴上樹`
- Confidence: medium

#### Consolidated Readable Text

```text
香嚴和尚云：
如人上樹，口銜樹枝，手不攀枝，脚不踏樹。
樹下有人問西來意，
不對，即違他所問；
若對，又喪身失命。
正當恁麼時，作麼生對。

無門曰：
縱有懸河之辨，總用不著。
說得一大藏教，亦用不著。
若向者裏對得著，
活却從前死路頭，
死却從前活路頭。
其或未然，直待當來問彌勒。
```

#### Notes

- This leaf is structurally clear and the core prose block is well supported by the witness.
- A few punctuation choices are editorial, but the wording is stable enough for the scan-derived draft.

### PDF p.014 right leaf

- Role: verse on `香嚴上樹`, with opening of `世尊拈花`
- Confidence: medium

#### Consolidated Readable Text

```text
頌曰
香嚴真杜撰，
惡毒無盡限。
啞却納僧口，
通身迸鬼眼。

〔世尊拈花〕

世尊昔在靈山會上，拈花示眾。
是時眾皆默然，
惟迦葉尊者破顏微笑。
世尊云：
吾有正法眼藏，
涅槃妙心，
實相無相，
微妙法門，
```

#### Notes

- The `香嚴上樹` verse is supported by the page image, though the second half of the leaf is less dark than ideal.
- The opening of `世尊拈花`, including `世尊云：吾有正法眼藏...`, is visible across the page turn and is now carried into the diplomatic draft rather than being truncated after `破顏微笑`.

### PDF p.014 left leaf

- Role: completion of the case opening and commentary on `世尊拈花`
- Confidence: medium

#### Consolidated Readable Text

```text
不立文字，
教外別傳，
付囑摩訶迦葉。

無門曰：
黃面瞿曇，傍若無人，
壓良為賤，懸羊頭賣狗肉。
將謂多少奇特。

只如當時大眾都笑，
正法眼藏，作麼生傳。
設使迦葉不笑，
正法眼藏又作麼生傳。
若道正法眼藏有傳，
黃面老子，誑謼閭閻。
若道無傳，
為甚麼獨許迦葉。
```

#### Notes

- This page is readable at the line level, but the last third is not dark enough to claim every graph cleanly.
- `誑謼閭閻` is now favored from the witness image plus OCR comparison, but still not high-confidence enough to remove all caution.
- `RapidOCR` was more stable than `tesseract` here; `PaddleOCR` timed out on this leaf batch.

### PDF p.015 right leaf

- Role: end of one case and beginning of the next
- Confidence: medium-high

#### Consolidated Readable Text

```text
〔世尊拈花〕

傳授為甚麼，獨許迦葉。

頌曰
拈起花來，
迦葉破顏。
尾巴已露，
人天罔措。

〔趙州洗鉢〕

趙州因僧問：
其甲乍入叢林，乞師指示。
州云：喫粥了也未？
僧云：喫粥了也。
州云：洗鉢盂去。
其僧有省。
```

#### Notes

- This leaf clearly spans a case boundary: the verse of `世尊拈花` and the prose opening of `趙州洗鉢`.
- `傳授為甚麼` is better supported than the earlier weaker reading.
- The phrase `其甲乍入叢林` remains somewhat odd at the graph level, but the witness image supports it closely enough to retain for now.

### PDF p.015 left leaf

- Role: commentary and verse on `趙州洗鉢`
- Confidence: high

#### Consolidated Readable Text

```text
無門曰：
趙州開口，見膽露心肝。
這僧聽事不真，喚鐘作甕。

頌曰
只爲分明極，
翻令所得遲。
早知燈是火，
飯熟已多時。

〔奚仲造車〕

月庵和尚問僧：
奚仲造車，一百輻，
拈却兩頭，去却軸，
明甚麼邊事。
```

#### Notes

- The page image supports this reading strongly.
- One or two graphs are faint in the witness, but the line-level reading is stable.
- `見膽露心肝` is better supported than the earlier shorter reading.
- This leaf also clearly opens the next case `奚仲造車`.

### PDF p.016 right leaf

- Role: case-boundary leaf; end of one case and opening of `大通智勝`
- Confidence: medium-high

#### Consolidated Readable Text

```text
無門曰：
若出直下明得，
眼似流星，
機如掣電。

頌曰
機輪轉處，
達者猶迷。
四維上下，
南北東西。

〔大通智勝〕

興陽讓和尚因僧問：
大通智勝佛，十劫坐道場，
佛法不現前，不得成佛道。
```

#### Notes

- This leaf clearly spans a boundary between a preceding commentary / verse and the opening prose of `大通智勝`.
- The opening `大通智勝佛，十劫坐道場` line is secure from the witness.

### PDF p.016 left leaf

- Role: continuation of `大通智勝`
- Confidence: medium

#### Consolidated Readable Text

```text
時如何。
讓曰：
其問甚諦。
當僧云：
既是坐道場，
爲甚麼不得成佛道。

無門曰：
只許老胡知，
不許老胡會。
凡夫若知，即是聖人。
聖人若會，即是凡夫。

頌曰
了身何似了心休，
了得心兮身不愁。
若也身心俱了了，
神仙何必更封侯。
```

#### Notes

- This leaf is less dark than the surrounding pages, but the prose/verse structure is still recoverable.
- The final verse is supported by the image and `RapidOCR`, though not at the same confidence level as the clearest early leaves.

### PDF p.017 right leaf

- Role: end of `大通智勝`, with opening of `清稅孤貧`
- Confidence: medium

#### Consolidated Readable Text

```text
〔頌曰〕
了身何似了心休，
了得心兮身不愁。
若也身心俱了了，
神仙何必更封侯。

〔清稅孤貧〕

曹山和尚因僧問云：
清稅孤貧，乞師賑濟。
山云：
稅闍梨，青原白家酒，
三盞喫了，猶道未沾唇。
```

#### Notes

- The verse ending of `大通智勝` is clear enough to carry forward from the previous leaf.
- The opening of `清稅孤貧` is readable, though a few graphs in the case prose remain slightly soft.
- `RapidOCR` materially helped on the `清稅孤貧` lines.

### PDF p.017 left leaf

- Role: opening prose on `州勘庵主`
- Confidence: medium

#### Consolidated Readable Text

```text
〔州勘庵主〕

趙州到一庵主處問：
有麼有麼。
主竪起拳頭。
州云：
水淺不是泊船處。
便行。

又到一庵主處云：
有麼有麼。
主亦竪起拳頭。
州云：
能縱能奪，能殺能活。
便作禮。

頌曰
眼流星，
機掣電。
殺人刀，
活人劍。
```

#### Notes

- This leaf mixes the end of `清稅孤貧` material with the opening of `州勘庵主`, but the `州勘庵主` prose block is structurally clear.
- The exact phrasing of the first short exchange remains only medium-confidence from the witness.

### PDF p.018 right leaf

- Role: commentary on `州勘庵主`, with opening of `巖喚主人`
- Confidence: medium

#### Consolidated Readable Text

```text
無門曰：
一般竪起拳頭，
爲甚麼肯一箇，不肯一箇。
且道，病在甚處。
若向者裏下得一轉語，
便見趙州舌頭無骨，
扶起放倒，得大自在。
然雖如是，
趙州却被二庵主勘破。

〔巖喚主人〕
起拳頭，
別云：
能縱能奪，能殺能活，便作禮。
```

#### Notes

- The `州勘庵主` commentary is recoverable in substance, but still not graph-perfect.
- The opening of the next case is visible, though the first graph cluster after `起` is not yet secure.

### PDF p.018 left leaf

- Role: verse block around `州勘庵主` / `巖喚主人`
- Confidence: low-medium

#### Consolidated Readable Text

```text
眼若道無優劣，亦未具參學眼。

頌曰
眼流星，
機掣電。
殺人刀，
活人劍。

瑞巖和尚每自喚主人公，
復自應諾。
乃云：
惺惺著。
他時異日，
莫受人瞞。
```

#### Notes

- This leaf is the weakest of the block.
- The carry-over line `眼若道無優劣，亦未具參學眼。` is visible at the top margin and belongs to the preceding commentary.
- The `眼流星 / 機掣電 / 殺人刀 / 活人劍` lines are clear.
- The opening `瑞巖和尚每自喚主人公` lines are readable in substance, but the transition from the preceding verse is still too weak to normalize fully.

### PDF p.019 right leaf

- Role: commentary on `巖喚主人`
- Confidence: medium

#### Consolidated Readable Text

```text
無門曰：
瑞巖老子，自買自賣，弄出許多神頭鬼面。
何故。
一箇喚底，一箇應底；
一箇惺惺底，一箇不受人瞞底。
認著依前還不是。
若也你擬他，
總是野狐見解。

頌曰
學道之人不識真，
只為從前認識神。
無量劫來生死本，
癡人喚作本來人。
```

#### Notes

- The prose/verse structure is clear from the witness.
- Several short phrases were tightened from the image with `RapidOCR`, but this leaf still sits at medium confidence overall.

### PDF p.019 left leaf

- Role: opening of `德山托鉢`
- Confidence: medium

#### Consolidated Readable Text

```text
〔德山托鉢〕

德山一日托鉢下堂。
見雪峰問者，老漢鐘未鳴、鼓未響，
托鉢向甚處去。
山便回方丈。

峰舉似巖頭。
頭云：
大小德山，未會末後句。

山聞，令侍者喚巖頭來問曰：
汝不肯老僧那。
```

#### Notes

- The opening exchange is structurally clear and matches the visual page layout.
- The closing rebuke line begins clearly but continues onto the next leaf.

### PDF p.020 right leaf

- Role: continuation and commentary on `德山托鉢`
- Confidence: medium

#### Consolidated Readable Text

```text
巖頭密啓其意。
山乃休去。
明日陞座，果與尋常不同。
巖頭至僧堂前，拊掌大笑云：
且喜老漢會末後句。

他後天下人不奈伊何。

無門曰：
若是未後句，
巖頭、德山俱未夢見在。
檢點將來，好似一棚傀儡。
```

#### Notes

- The `德山托鉢` continuation is readable in substance, though the middle of the commentary remains slightly soft.
- `會末後句` is secure from the witness and is the key phrase on this leaf.

### PDF p.020 left leaf

- Role: verse on `德山托鉢`, with opening of `南泉斬猫`
- Confidence: medium

#### Consolidated Readable Text

```text
頌曰
識得最初句，
便會末後句。
末後與最初，
不是者一句。

〔南泉斬猫〕

南泉和尚因東西兩堂爭猫兒。
泉乃提起云：
大眾道得即救，
道不得即斬却也。
眾無對。
泉遂斬之。

趙州外歸，
泉舉似州。
州乃脱鞋，
安頭上而出。
```

#### Notes

- The verse and the opening of `南泉斬猫` are both secure enough for the witness draft.
- The phrase `東西兩堂爭猫兒` is visually strong and anchors the case identity.

### PDF p.017 right leaf

- Role: end of `大通智勝` verse and opening of `清稅孤貧`
- Confidence: medium

#### Consolidated Readable Text

```text
縱若也身心俱了了，
神仙何必更封侯。

〔清稅孤貧〕

曹山和尚因僧問云：
清稅孤貧，乞師賑濟。
山云：
稅闍梨，青原白家酒，
三盞喫了，猶道未沾唇。
```

#### Notes

- The case boundary is clear in the witness.
- The `清稅孤貧` prose block is readable enough to carry into the draft without importing outside text.
- `RapidOCR` helped confirm `青原白家酒 / 三盞喫了 / 猶道未沾唇`.

### PDF p.017 left leaf

- Role: verse on `清稅孤貧`, with opening of `州勘庵主`
- Confidence: medium

#### Consolidated Readable Text

```text
頌曰
貧似范丹，
氣如項羽。
活計雖無，
敢與鬪富。

〔州勘庵主〕

趙州到一庵主處問：
有麼有麼。
主豎起拳頭。
州云：
水淺不是泊舟處。
便行。
又到一庵主處云：
有麼有麼。
主亦豎起拳頭。
```

#### Notes

- The verse is faint but readable from the image.
- `范丹 / 項羽 / 鬪富` are visually supported.
- This leaf clearly begins the `州勘庵主` case, though the prose continues on the next page.

### PDF p.018 right leaf

- Role: continuation and commentary on `州勘庵主`
- Confidence: medium

#### Consolidated Readable Text

```text
州云：
能縱能奪，
能殺能活，
便作禮。

無門曰：
一般豎起拳頭，
爲甚麼肯一箇，不肯一箇。
且道，訛在甚處。
若向者裏下得一轉語，
便見趙州舌頭無骨，
扶起放倒，
得大自在。
然雖如是，
爭奈趙州却被二庵主勘破。
```

#### Notes

- The opening prose line `能縱能奪，能殺能活` is clear enough from the witness.
- `無門曰` and the main commentary block are well supported, though not at high confidence.

### PDF p.018 left leaf

- Role: verse on `州勘庵主`, with opening of `巖喚主人`
- Confidence: medium

#### Consolidated Readable Text

```text
頌曰
眼流星，
機掣電。
殺人刀，
活人劍。

〔巖喚主人〕

瑞巖和尚，每日自喚主人公，
復自應諾。
惺惺著。
他時異日，
莫受人瞞。
```

#### Notes

- The four short verse lines are visually distinct and strongly supported.
- The title `巖喚主人` and the opening prose are both clear enough to mark the next case boundary with confidence.

### PDF p.035 right leaf

- Role: body-text leaf, likely `趙州勘婆`
- Confidence: medium

#### Consolidated Readable Text

```text
〔趙州勘婆〕

趙州因僧問婆子：
台山路向甚處去？
婆云：驀直去。
僧纔行三五步，
婆云：好箇師僧，又恁麽去。

後有僧舉似州。
州云：待我去與你勘過這婆子。
明日便去，亦如是問。
婆亦如是答。
州歸謂眾曰：
台山婆子，我與你勘破了也。
```

#### Notes

- Short fragments near the top margin appear to belong to adjacent title or verse material, including readable pieces such as `更問如何` and `抱賊叫屈`.
- The body prose itself is clearer than those top fragments.
- Second-witness corroboration:
  - `C:\woodblocks\Transcriptions\Wumen_Huikai_NDL_Commons\batch_refined\frames\page_046_left_frame.png`
  - independently supports the same prose cluster, including `婆云：驀直去`, `僧纔行三五步`, `婆云：好箇師僧`, and the later `赴試 / 點心 / 煎油糍` phrase family
- This section should be checked later against its facing leaf to recover the full case unit and verse.

### PDF p.021 right leaf

- Role: commentary and verse on `南泉斬猫`, with opening of `洞山三頓`
- Confidence: medium

#### Consolidated Readable Text

```text
無門曰：
若向者裏下得一轉語，
便見南泉令不虛行。
其或未然，
趙州若在，
奪却刀子，
倒行此令，
南泉乞命。

〔洞山三頓〕

雲門問洞山：
近日離甚處。
山云：
查渡。
門曰：
夏在甚處。
山云：
湖南。
```

#### Notes

- The `南泉斬猫` commentary block is visually strong enough to recover without outside support.
- The start of `洞山三頓` is clear through `湖南`.
- `RapidOCR` matched the visible case transition well enough to support this reading.

### PDF p.021 left leaf

- Role: continuation of `洞山三頓`, with opening commentary
- Confidence: medium

#### Consolidated Readable Text

```text
門曰：
幾時離彼。
山云：
八月二十五。
門曰：
放汝三頓棒。

至明日，
山却上問訊：
昨日蒙和尚放三頓棒，
不知過在甚麼處。
門曰：
飯袋子，
江西湖南便恁麼去。
洞山於此大悟。

無門曰：
雲門當時便與本分草料，
使洞山別有生機一路，
家門不致寂寥。
一夜在是非海裏著到直待天明再來
```

#### Notes

- `PaddleOCR` was useful here for confirming `昨日蒙和尚放三頓棒` and `江西湖南便恁麼去`.
- The last commentary line continues onto the next leaf, so this section stops before forcing the broken sentence.

### PDF p.022 right leaf

- Role: continuation of commentary on `洞山三頓`, with opening verse
- Confidence: medium

#### Consolidated Readable Text

```text
天明再來，
別與他注破。
洞山直下悟去，
未是性燥。
且問諸人，
洞山三頓棒，
合喫不合喫。
若道合喫，
草木叢林皆合喫棒。
若道不合喫，
雲門又成誑語。
向者裏明得，
方與洞山出一口氣。

頌曰
獅子教兒迷子訣，
擬前跳躑早翻身。
```

#### Notes

- The commentary block on this leaf is stronger than the verse opening.
- `PaddleOCR` helped confirm the sequence `合喫不合喫 / 草木叢林 / 雲門又成誑語`.
- The second half of the verse clearly continues onto the facing leaf.

### PDF p.022 left leaf

- Role: end of verse on `洞山三頓`, with opening of `鐘聲七條`
- Confidence: medium

#### Consolidated Readable Text

```text
無端再敘當頭著，
前箭猶輕後箭深。

〔鐘聲七條〕

雲門曰：
世界恁麼廣闊，
因甚向鐘聲裏披七條。
```

#### Notes

- The verse ending is readable from the image even though the leaf is stained.
- The next case title is legible as `鐘聲七條`.
- `RapidOCR` and the page image agree on the opening `世界恁麼廣闊 / 因甚向鐘聲裏披七條`.

### PDF p.023 right leaf

- Role: continuation of `鐘聲七條`
- Confidence: medium

#### Consolidated Readable Text

```text
道得親切，
豈可向聲上覓。
若將耳聽應難會，
眼處聞聲方始親。

頌曰
會則事同一家，
不會萬別千差。
不會事同一家，
會則萬別千差。
```

#### Notes

- This leaf is stained, but the verse block is visually readable.
- The opening prose lines are weaker; I kept only the part that remains legible in the image.
- `會則事同一家 / 萬別千差` is strongly supported by both image and OCR.

### PDF p.023 left leaf

- Role: `國師三喚` prose and commentary
- Confidence: medium

#### Consolidated Readable Text

```text
〔國師三喚〕

國師三喚侍者，
侍者三應。
國師云：
將謂吾辜負汝，
元來却是汝辜負吾。

無門曰：
國師三喚，
侍者三應。
和光出國師平生老婆心切。
牛頭未見四祖時如何。
中飽人飢，
且道那裏是他辜負處。

頌曰
國清才子貴，
家富小兒嬌。
```

#### Notes

- The opening exchange is clear in the witness.
- The commentary is readable enough through `且道那裏是他辜負處`.
- The verse continues onto the next leaf, so only the secure opening couplet is included here.
- Cross-witness support:
  - the second witness anchors `國師三喚` in its corresponding body sequence
  - the third witness supports the same cluster order at contents/title level

### PDF p.024 right leaf

- Role: end of `國師三喚`, with opening of `洞山三斤`
- Confidence: medium

#### Consolidated Readable Text

```text
頭角生也，
未肯承當。
義食不飽人，
飢腸先開。

〔洞山三斤〕

洞山和尚因僧問：
如何是佛。
山云：
麻三斤。

無門曰：
洞山老人參得些蚌蛤禪，
纔開兩片，
露出肝腸。
然雖如是，
且道向甚處見洞山。
```

#### Notes

- The `國師三喚` verse ending is weak; only the broad readable shape is kept and one graph remains uncertain.
- `洞山三斤` is clear and stable from the witness.
- `RapidOCR` strongly supported `如何是佛 / 麻三斤`.

### PDF p.024 left leaf

- Role: verse on `洞山三斤`, with opening of `平常是道`
- Confidence: medium

#### Consolidated Readable Text

```text
頌曰
突出麻三斤，
言親意更親。
來說是非者，
便是是非人。

〔平常是道〕

南泉因趙州問：
如何是道。
泉云：
平常心是道。
州云：
還可趣向否。
泉云：
擬向即乖。
州云：
不擬爭知是道。
泉云：
道不屬知，
不屬不知。
```

#### Notes

- The `洞山三斤` verse is clear enough to recover as a full quatrain.
- The opening dialogue of `平常是道` is strong in the image and consistent with OCR.
- The rest of `平常是道` continues beyond this leaf.
- Cross-witness support:
  - both corroborating witnesses preserve the same `平常是道` phrase family in the corresponding mid-book cluster

### PDF p.025 right leaf

- Role: end of `平常是道`, with verse
- Confidence: medium

#### Consolidated Readable Text

```text
泉云：
道不屬知，
不屬不知。
知是妄覺，
不知是無記。
若真達不疑之道，
猶如太虛廓然洞豁，
豈可強是非也。
州於言下頓悟。

無門曰：
南泉被趙州發問，
直得瓦解氷消，
分踈不下。
趙州縱饒悟去，
更參三十年始得。

頌曰
春有百花秋有月，
夏有涼風冬有雪。
```

#### Notes

- The prose close of `平常是道` is strong in the image, including `知是妄覺 / 不知是無記`.
- The verse begins clearly here and continues on the facing leaf.

### PDF p.025 left leaf

- Role: end of `平常是道` verse, with opening of `大力量人`
- Confidence: medium

#### Consolidated Readable Text

```text
若無閑事挂心頭，
便是人間好時節。

〔大力量人〕

松源和尚云：
大力量人，
因甚擡腳不起。
又云：
開口不在舌頭上。

無門曰：
松源可謂傾腸倒腹。
只是欠人承當。
直下承當，
正好來無門處喫痛棒。
何故。
```

#### Notes

- The `平常是道` verse close is very clear.
- The `大力量人` title and opening exchange are stable from the witness.
- The last commentary sentence continues onto the next leaf.

### PDF p.026 right leaf

- Role: end of `大力量人`, with opening of `雲門屎橛`
- Confidence: medium

#### Consolidated Readable Text

```text
要識真金，
火裏看。

〔雲門屎橛〕

僧問雲門：
如何是佛。
門云：
乾屎橛。

無門曰：
雲門可謂家貧難辨素食，
事忙不及草書。
動便將屎來撐門拄戶。

頌曰
閃電光，
擊石火。
```

#### Notes

- The `大力量人` close is readable and the `要識真金，火裏看。` couplet is clear.
- `如何是佛 / 乾屎橛` is strongly supported by the image and OCR.
- The verse on `雲門屎橛` continues onto the facing leaf.

### PDF p.026 left leaf

- Role: end of `雲門屎橛`, with opening of `迦葉刹竿`
- Confidence: medium

#### Consolidated Readable Text

```text
眨得眼，
已蹉過。

〔迦葉刹竿〕

阿難問迦葉云：
世尊傳金襴外，
別傳何物。
葉云：
倒却門前刹竿著。
```

#### Notes

- The closing verse lines on `雲門屎橛` are legible despite staining.
- The next case opening is clear enough to identify as `迦葉刹竿`.
- I kept this leaf conservative and stopped before forcing the weaker continuation lines.

### PDF p.027 right leaf

- Role: continuation of `迦葉刹竿`, with opening of `不思善惡`
- Confidence: medium

#### Consolidated Readable Text

```text
無門曰：
若向者裏下得一轉語親切，
便見靈山一會儼然未散。
其或未然，
佛早留心，
直至而今不得妙。

頌曰
問處何如答處親，
幾人於此眼生筋。
兄呼弟應揚家醜，
不屬陰陽別是春。
```

#### Notes

- This leaf still belongs to the end of `迦葉刹竿`.
- The verse is readable enough from the image, though a few graphs remain faint.

### PDF p.027 left leaf

- Role: opening prose on `不思善惡`
- Confidence: medium

#### Consolidated Readable Text

```text
〔不思善惡〕

六祖因明上座趁至大庾嶺。
祖見明至，
即擲衣鉢於石上云：
此衣表信，
可力爭耶。
明遂擧之，
如山不動。
明白：
我來求法，
非為衣也。
願行者開示。
祖云：
不思善，
不思惡，
正與麼時，
那箇是明上座本來面目。
明當下大悟，
遍體汗流，
泣淚作禮問。
```

#### Notes

- The leaf is clear enough to recover the main `不思善惡` exchange as continuous prose.
- The closing words continue onto the next leaf.

### PDF p.028 right leaf

- Role: continuation and commentary on `不思善惡`
- Confidence: medium

#### Consolidated Readable Text

```text
明曰：
上來密語密意外，
還更有意旨否。
祖曰：
我今為汝說者，
即非密也。
汝若返照自己面目，
密却在汝邊。
明曰：
某甲雖在黃梅隨眾，
實未省自己面目。
今蒙指授入處，
如人飲水，
冷暖自知。
```

#### Notes

- This leaf carries the clearer continuation after the main `本來面目` exchange.
- The commentary transition is visible but weaker than the prose block.

### PDF p.028 left leaf

- Role: opening of `離卻語言`
- Confidence: medium

#### Consolidated Readable Text

```text
〔離卻語言〕

風穴和尚因僧問：
語默涉離微，
如何通不犯。
```

#### Notes

- The opening koan line is secure, but the rest of the leaf is too compressed for fuller recovery on this pass.
- The following leaf carries stronger support for the verse and commentary shape.

### PDF p.029 right leaf

- Role: verse/commentary on `離卻語言`
- Confidence: medium

#### Consolidated Readable Text

```text
無門曰：
風穴機如掣電，
得路便行。
爭奈坐前人舌頭不斷。
若向者裏見得親切，
自有出身之路。

頌曰
不露風骨句，
未語先分付。
進步口喃喃，
知君大罨缶。
長憶江南三月裏，
鷓鴣啼處百花香。
```

#### Notes

- The verse opening `不露風骨句，未語先分付` is strong in both image and OCR.
- The last two lines are readable in the witness, though not as dark as the opening couplet.

### PDF p.029 left leaf

- Role: opening of `三座說法`
- Confidence: medium

#### Consolidated Readable Text

```text
〔三座說法〕

仰山和尚夢見往彌勒所，
安第三座。
有一尊者白槌云：
今日當第三座說法。
```

#### Notes

- The title and opening prose are secure.
- The rest of the leaf is present but remains compressed and should be revisited with the facing leaf when refining this case.

### PDF p.030 right leaf

- Role: opening of `二僧卷簾`
- Confidence: medium

#### Consolidated Readable Text

```text
〔二僧卷簾〕

清涼大法眼因僧齋前上參。
眼以手指簾。
時有二僧同去卷簾。
眼曰：
一得，
一失。
```

#### Notes

- The case identity and the key exchange are stable.
- This is the clearest leaf for the case opening.

### PDF p.030 left leaf

- Role: commentary on `二僧卷簾`
- Confidence: low-medium

#### Consolidated Readable Text

```text
無門曰：
且道是得是失。
若向者裏著得一隻眼，
便知清涼國師敗缺處。
然雖如是，
切忌向得失裏商量。
```

#### Notes

- This reading is more provisional than the prose leaf.
- The commentary shape is visible, but several graphs are faint and should be checked again later.

### PDF p.031 right leaf

- Role: opening of `不是心佛`
- Confidence: medium

#### Consolidated Readable Text

```text
〔不是心佛〕

南泉和尚因僧問云：
還有不與人說底法麼。
泉云：有。
僧云：如何是不與人說底法。
泉云：
不是心，
不是佛，
不是物。
```

#### Notes

- The opening exchange is clear and stable.
- Commentary below is present but weaker than the koan block.

### PDF p.031 left leaf

- Role: opening of `久響龍潭`
- Confidence: medium

#### Consolidated Readable Text

```text
〔久響龍潭〕

龍潭因德山請益。
夜云：
夜深。
子何不下去。
山遂珍重揭簾而出。
見外面黑却回云：
外面黑。
潭乃點紙燭度與山。
```

#### Notes

- This is the strongest opening leaf for `久響龍潭`.
- The continuation carries onto the next pages.
- Cross-witness support:
  - both corroborating witnesses preserve `龍潭和尚` material in the same later-middle case cluster

### PDF p.032 right leaf

- Role: continuation of `久響龍潭`
- Confidence: medium

#### Consolidated Readable Text

```text
山擬接，
潭復吹滅。
山於此忽然有省。
便作禮。
潭云：
子見箇甚麼道理。
山云：
某甲從今日去，
不疑天下老和尚舌頭也。
```

#### Notes

- The core enlightenment turn is readable enough from the image.
- Commentary begins lower on the leaf but is less stable.

### PDF p.032 left leaf

- Role: later continuation on `久響龍潭`
- Confidence: low-medium

#### Consolidated Readable Text

```text
至明日，
龍潭陞堂云：
可中有箇漢，
牙如劍樹，
口似血盆。
一棒打不回頭。
他時向孤峰頂上，
立吾道去在。
```

#### Notes

- This leaf is weaker than the opening pair, but the main prose block is still recoverable.
- The lower commentary area remains provisional.

### PDF p.033 right leaf

- Role: `趙州勘婆` / `婆子`-side material
- Confidence: low-medium

#### Consolidated Readable Text

```text
遂問婆子近處有甚麼宗師。
婆云：
五里外有龍潭和尚。
及到龍潭，
可謂是前言不應後語。

火種都忙，
將惡水驀頭一澆。
冷地看來，
一場好笑。

頌曰
聞名不如見面，
見面不如聞名。
雖然救得鼻孔，
爭奈瞎却眼睛。
```

#### Notes

- The visible text is `婆子` material, not `久響龍潭`.
- Secondary witness corroboration:
  - `C:\woodblocks\Transcriptions\Wumen_Huikai_NDL_Commons\batch_refined\frames\page_047_right_frame.png`
  - supports the broader `趙州勘婆` zone with phrases such as `何故婆云`, `我煎得透底`, and `煎未透者只管作`
- The recovery is still partial, but the case-side identification is now materially stronger.

### PDF p.033 left leaf

- Role: opening of `非風非幡`
- Confidence: medium

#### Consolidated Readable Text

```text
〔非風非幡〕

六祖因風颺刹，
有二僧對論。
一云風動，
一云幡動。
往復曾未契理。
祖云：
不是風動，
不是幡動，
仁者心動。
```

#### Notes

- This is a clean witness opening and is one of the better leaves in this back-half stretch.
- The commentary below is present but not yet fully recovered.

### PDF p.034 right leaf

- Role: opening of `即心即佛`
- Confidence: medium

#### Consolidated Readable Text

```text
〔即心即佛〕

馬祖因大梅問：
如何是佛。
祖云：
即心是佛。
```

#### Notes

- The title and opening dialogue are clear.
- The leaf also begins commentary/verse material, but the opening is the secure part.

### PDF p.034 left leaf

- Role: commentary on `即心即佛`
- Confidence: low-medium

#### Consolidated Readable Text

```text
無門曰：
若能直下領得去，
著佛衣，
喫佛飯，
說佛話，
行佛行，
即是佛也。

頌曰
青天白日，
切忌尋覓。
```

#### Notes

- The wording is supported by both the page image and OCR comparators, but the leaf is still lighter than the earlier body-text pages.
- The left-side verse opening `青天白日 / 切忌尋覓` is also visible enough to include.
- Remaining lines below that verse opening should be revisited later.

### PDF p.035 left leaf

- Role: commentary/verse on `趙州勘婆`
- Confidence: low-medium

#### Consolidated Readable Text

```text
無門曰：
婆子只解坐籌帷，
要且不識趙州。
趙州老人，
善用偸營劫寨。
雖然如是，
且道那裏是趙州勘破婆子處。

頌曰
問既一般，
答亦相似。
飯裏有砂，
泥中有刺。
```

#### Notes

- This is the facing leaf to the earlier [PDF p.035 right leaf](/abs/path/C:/woodblocks/Transcriptions/Wumenguan_1632_NDL_Commons/architect/WUMENGUAN_1632.md#L977).
- The commentary is recoverable, but still weaker than the prose leaf.

### PDF p.036 right leaf

- Role: opening of `外道問佛`
- Confidence: medium

#### Consolidated Readable Text

```text
〔外道問佛〕

世尊因外道問：
不問有言，
不問無言。
世尊良久。
外道讚歎云：
世尊大慈大悲，
開我迷雲，
令我得入。
乃具禮而去。
阿難問佛：
外道有何所證，
而言讚歎而去。
```

#### Notes

- The opening exchange is one of the clearer recoveries in this compressed section.
- The leaf continues the case into the Buddha’s reply.

### PDF p.036 left leaf

- Role: opening of `非心非佛`
- Confidence: medium

#### Consolidated Readable Text

```text
〔非心非佛〕

馬祖因僧問：
如何是祖師西來意。
祖云：
非心非佛。
```

#### Notes

- The title and core answer are secure.
- The lower commentary area is too faint for a stronger claim on this pass.
- Cross-witness support:
  - both corroborating witnesses preserve the same `不是心不是佛不是物` phrase family in this cluster

### PDF p.037 right leaf

- Role: `智不是道`
- Confidence: medium

#### Consolidated Readable Text

```text
〔智不是道〕

南泉云：
心不是佛，
智不是道。
```

#### Notes

- This leaf is short and clear at the case-opening level.
- Additional commentary is visible but remains too compressed to normalize safely here.

### PDF p.037 left leaf

- Role: opening of `倩女離魂`
- Confidence: medium

#### Consolidated Readable Text

```text
〔倩女離魂〕

五祖問僧云：
倩女離魂，
那箇是正底。
```

#### Notes

- The title and opening question are secure from both image and OCR.
- The rest of the leaf remains faint and should be revisited later.

### PDF p.038 right leaf

- Role: opening of `路逢達道`
- Confidence: medium

#### Consolidated Readable Text

```text
〔路逢達道〕

五祖曰：
路逢達道人，
不將語默對，
且道將甚麼對。
```

#### Notes

- The opening prompt is stable in the witness.
- Commentary/verse below is present but not yet strong enough for fuller transcription.

### PDF p.038 left leaf

- Role: opening of `庭前柏樹`
- Confidence: medium

#### Consolidated Readable Text

```text
〔庭前柏樹〕

趙州因僧問：
如何是祖師西來意。
州云：
庭前柏樹子。
```

#### Notes

- This is a clean leaf for the case opening.
- The lower material likely belongs to commentary or transition and remains less secure.

### PDF p.039 right leaf

- Role: opening of `牛過窗櫺`
- Confidence: medium

#### Consolidated Readable Text

```text
〔牛過窗櫺〕

五祖曰：
譬如水牛過窗櫺，
頭角四蹄都過了，
因甚尾巴過不得。
```

#### Notes

- The core simile is stable enough to recover.
- The leaf below this block is weaker and should be revisited in a later pass.

### PDF p.039 left leaf

- Role: opening of `雲門話墮`
- Confidence: medium

#### Consolidated Readable Text

```text
〔雲門話墮〕

雲門因僧問：
光明寂照遍河沙。
```

#### Notes

- The opening question is secure.
- The continuation and response are more legible on the next leaf.

### PDF p.040 right leaf

- Role: continuation on `雲門話墮`
- Confidence: low-medium

#### Consolidated Readable Text

```text
門云：
豈不是張拙秀才語。
僧云：
是。
門云：
話墮也。
```

#### Notes

- This reading is supported by OCR and the page image, but the leaf is lighter than ideal.
- I kept only the main exchange that remains stable.

### PDF p.040 left leaf

- Role: opening of `趯倒淨瓶`
- Confidence: medium

#### Consolidated Readable Text

```text
〔趯倒淨瓶〕

溈山和尚始在百丈會中充典座。
百丈將選大溈主人。
百丈遂拈淨瓶置地，
設問云：
不得喚作淨瓶，
汝喚作甚麼。
```

#### Notes

- The case opening is stable from the witness and aligns with the OCR comparators.
- The decisive answer and follow-through continue onto the next leaf.

### PDF p.041 right leaf

- Role: continuation of `趯倒淨瓶`
- Confidence: low-medium

#### Consolidated Readable Text

```text
山遂趯倒淨瓶而去。
百丈云：
第一座輸却山子也。
因命之為開山。
```

#### Notes

- The action line is the secure core of this leaf.
- OCR and image also support the immediate follow-through `百丈云 / 第一座輸却山子也 / 因命之為開山`.
- The later commentary/verse material on the leaf remains too weak on this pass for a cleaner diplomatic recovery.

### PDF p.041 left leaf

- Role: opening of `達磨安心`
- Confidence: medium

#### Consolidated Readable Text

```text
〔達磨安心〕

達磨面壁。
二祖立雪斷臂云：
弟子心未安，
乞師安心。
祖云：
將心來與汝安。
```

#### Notes

- This leaf cleanly opens `達磨安心`.
- The continuation is present below, but the opening exchange is the strongest recoverable block.

### PDF p.042 right leaf

- Role: opening of `女子出定`
- Confidence: medium

#### Consolidated Readable Text

```text
〔女子出定〕

世尊昔因文殊至諸佛集處，
值諸佛各還本處，
惟有一女人近彼佛坐入定。
文殊乃白佛：
云何女人得近佛坐，
我不得。
```

#### Notes

- The title and opening setup are secure.
- The doctrinal question continues on the facing leaf.

### PDF p.042 left leaf

- Role: continuation of `女子出定`
- Confidence: low-medium

#### Consolidated Readable Text

```text
佛告文殊：
但此女人令從三昧起，
汝自近前問之。
若出得定，
便知所以。
```

#### Notes

- This leaf is weaker than the opening leaf.
- The continuation is legible in outline, but at least one graph remains uncertain.

### PDF p.043 right leaf

- Role: later continuation on `女子出定`
- Confidence: low-medium

#### Consolidated Readable Text

```text
無門曰：
稽首老釋迦，
只作一場雜劇。
且道文殊是七佛之師，
因甚出女子定不得。
罔明初地菩薩，
為甚却出得。
```

#### Notes

- The commentary shape is visible and partly recoverable.
- This remains more provisional than the clearer prose leaves in the front half.

### PDF p.043 left leaf

- Role: opening of `首山竹篦`
- Confidence: medium

#### Consolidated Readable Text

```text
〔首山竹篦〕

首山和尚拈竹篦示眾云：
汝等諸人，
若喚作竹篦則觸，
不喚作竹篦則背。
不得有語，
不得無語。
速道。
```

#### Notes

- This is the strongest leaf for the case opening.
- Commentary below is visible but remains too light for a stronger transcription.

### PDF p.044 right leaf

- Role: opening of `芭蕉拄杖`
- Confidence: medium

#### Consolidated Readable Text

```text
〔芭蕉拄杖〕

芭蕉和尚示眾云：
有拄杖子，
我與你拄杖子。
無拄杖子，
我奪你拄杖子。
```

#### Notes

- The title and core exchange are secure from the witness.
- The lower verse/commentary remains weaker.

### PDF p.044 left leaf

- Role: opening of `他是阿誰`
- Confidence: medium

#### Consolidated Readable Text

```text
〔他是阿誰〕

東山演師祖曰：
釋迦彌勒猶是他奴。
且道他是阿誰。
```

#### Notes

- This leaf is short and clear at the case-opening level.
- Further material on the page remains compressed.

### PDF p.045 right leaf

- Role: opening of `竿頭進步`
- Confidence: medium

#### Consolidated Readable Text

```text
〔竿頭進步〕

石霜和尚云：
百尺竿頭，
如何進步。
```

#### Notes

- The case title and opening question are stable.
- The fuller old-adept quotation is clearer on the facing leaf.

### PDF p.045 left leaf

- Role: continuation of `竿頭進步`
- Confidence: medium

#### Consolidated Readable Text

```text
又古德云：
百尺竿頭坐底人，
雖然得入未為真。
百尺竿頭須進步，
十方世界現全身。
```

#### Notes

- This is the stronger leaf for the case’s famous verse-like extension.
- Third-witness corroboration:
  - `C:\woodblocks\Transcriptions\Mumonkan_1752_Waseda_Commons\batch_refined\frames\page_047_right_frame.png`
  - independently supports `百尺竿頭坐底人`, `百尺竿頭須進步`, and `十方世界現全身`
- Lower commentary remains present but not yet normalized here.

### PDF p.046 right leaf

- Role: opening of `兜率三關`
- Confidence: medium

#### Consolidated Readable Text

```text
〔兜率三關〕

兜率悅和尚設三關問學者：
撥草參玄只圖見性。
即今上人性在甚處。
```

#### Notes

- The case title and first question are secure.
- The later questions and commentary are present but more compressed.

### PDF p.046 left leaf

- Role: opening of `乾峰一路`
- Confidence: medium

#### Consolidated Readable Text

```text
〔乾峰一路〕

乾峰和尚因僧問：
十方薄伽梵，
一路涅槃門。
未審路頭在甚麼處。
```

#### Notes

- This leaf gives a clean body-text opening for the final case of the 48.
- Further continuation below remains lighter and should be checked later if a fuller diplomatic pass is needed.

### PDF p.047 right leaf

- Role: closing/post-case material
- Confidence: low-medium

#### Consolidated Readable Text

```text
門云拈起扇子云。
扇子踍跳上三十三天。
築著帝釋鼻孔。
東海鯉魚打一棒，
雨似盆傾。
```

#### Notes

- This leaf appears to belong to the closing instructional material after the 48 cases.
- The line above is the clearest stable recovery.

### PDF p.047 left leaf

- Role: closing/post-case material
- Confidence: low

#### Consolidated Readable Text

```text
未舉步時先已到，
未動舌時先說了。
直饒著著在機先，
更須知有向上竅。
```

#### Notes

- The quatrain is secure.
- OCR and image both suggest additional surrounding prose, including a clearer evaluative cluster around `非大似兩箇瞎漢子相撞著` and `無直底人正眼觀來二大老`.
- The adjacent phrase family `識路頭在 / 在機先` is also visible, but the prose remains too tight to normalize line by line with confidence on this pass.
- The safest reading remains the quatrain, with the surrounding prose logged only at the phrase-family level.

### PDF p.048 right leaf

- Role: postscript / closing statement
- Confidence: low-medium

#### Consolidated Readable Text

```text
從上佛祖垂示機緣，
撮結案初。
請人直下承當，
不落處了無。
方上士絕聞興學者，
便知落處了無。
道明知道只是這箇，
爲甚透不得無門關。
```

#### Notes

- This leaf is stronger than the earlier two-line stub.
- The main reflective block is readable in substance from the witness image, though the lower and side fragments remain unstable.

### PDF p.048 left leaf

- Role: postscript / reflective note
- Confidence: low

#### Consolidated Readable Text

```text
不過淨厠說話，
也是赤土搽牛奶。
若透得無門關，
早是鈍置無門關。
透不得無門關，
亦乃辜負自己。
所謂涅槃心易曉，
差別智難明。
明得差別智，
家國自安寧。
紹定改元解制前五日，
楊岐八世孫無門比丘慧開謹識。
```

#### Notes

- This leaf is text-bearing and stronger than the earlier placeholder state.
- The central reflective block is readable in substance, and the lower signature/date block is also now visible enough to include.
- OCR and image both support the reflective cadence around `知道只是這箇 / 爲甚透不得無門關` on the facing leaf, and this leaf continues with the clearer `涅槃心 / 差別智 / 家國自安寧` cluster plus the dated `慧開謹識` sign-off.

### PDF p.049 right leaf

- Role: end-matter title leaf
- Confidence: medium

#### Consolidated Readable Text

```text
無門卷
```

#### Notes

- This is the clearest title-like marker in the end matter sequence.

### PDF p.049 left leaf

- Role: end-matter prose / admonitory material
- Confidence: low

#### Consolidated Readable Text

```text
儱侗守禪威儀，
無繩自縛，
縱橫無碍。
外道魔軍存心，
澄寂黑照邪禪。
融落深坑，
懞然不昧。
帶鎖擔枷，
思善思惡。
地獄天堂，
佛見法見，
二鐵圍山。
念起即覺，
進則迷理，
退則乖宗，
不進不退。
有氣死人，
且道如何履踐。
努力今生。
```

#### Notes

- The leaf is reflective/admonitory prose, not case text.
- The block above is now readable in substance from the witness image.
- OCR and image together support the added closing cadence `念起即覺 / 進則迷理 / 退則乖宗 / 不進不退`.
- OCR and image also support the additional warning cluster `地獄天堂 / 佛見法見 / 二鐵圍山` and the closing push `有氣死人 / 且道如何履踐 / 努力今生`.
- The remaining edge material is now mostly degraded continuation rather than a clearly separable new block.

### PDF p.050 right leaf

- Role: end-matter prose / verse-like material
- Confidence: low

#### Consolidated Readable Text

```text
頌了却莫教永劫受餘殃。

〔黃龍三關〕

我手何似佛手。
我脚何似驢脚。
人人有箇生緣處。
元來通身是手。
四海橫行倒跨楊岐三脚。
```

#### Notes

- `RapidOCR` also supports `元來通身是手`, which is now strong enough to include.
- OCR and image also support the framing line `頌了却莫教永劫受餘殃` and the closing motion line `四海橫行倒跨楊岐三脚`.
- The inner explanatory prose between those lines remains compressed and is not yet stable enough to normalize further.

### PDF p.050 left leaf

- Role: end-matter prose
- Confidence: low

#### Consolidated Readable Text

```text
人以有箇生緣，
各各透微機。
先那吒折骨還父。
五祖豈鑒爺娘。
凡聖路頭俱截斷，
幾多蜂蟻起雷音。
```

#### Notes

- OCR and image support the phrase family `人以有生緣 / 各人透微機 / 折骨還父 / 五祖豈鑒爺娘`.
- The lower verse tail `凡聖路頭俱截斷 / 幾多蜂蟻起雷音` is also now visible enough to include.
- The middle compressed prose remains weaker than the opening and closing lines.

### PDF p.051 right leaf

- Role: end-matter prose
- Confidence: low

#### Consolidated Readable Text

```text
無門首座立僧山借奉謝紹定庚寅季春無量宗壽書贊
```

#### Notes

- `RapidOCR` also preserves the surrounding phrase family:
  - `達磨西來不執文字直指人心見性成佛`
  - `無門首座立僧山借奉謝紹定庚寅季春無量宗壽書贊`
- The leaf also visibly preserves the surrounding admonitory cadence:
  - `成佛說箇直指已是迂曲更言成佛`
  - `無門因甚有關`
  - `老婆心切`
  - `惡聲流布`
- The line is best treated as compressed but coherent colophon/dedicatory prose.
- `借` is retained as the working reading in `立僧山借奉謝`, with the phrase understood as a humility/compression marker rather than a literal borrowing verb.

### PDF p.051 left leaf

- Role: end-matter / patron or printing information
- Confidence: low-medium

#### Consolidated Readable Text

```text
四十九則其間些子，
請認別起眉毛。
檢校保寧軍節度使京湖安撫制置大使兼知江陵府漢東郡開國公食邑
二千一百戶食實封陸佰戶
孟珙
```

#### Notes

- This leaf appears to include administrative or patronage matter rather than case text.
- The administrative block is now readable in substance from the witness image.
- Coarse OCR, refined OCR, and the crop pass do not reveal a clean omitted line beyond the block already transcribed here.
- Office-title and personal-name graphs may still admit later tightening, but this is no longer just a one-phrase stub.

### PDF p.052 right leaf

- Role: weak end-matter leaf
- Confidence: low

#### Consolidated Readable Text

```text
〔seals / no legible running text recovered〕
```

#### Notes

- `RapidOCR` returned no result for this leaf.

### PDF p.052 left leaf

- Role: end-matter prose
- Confidence: low

#### Consolidated Readable Text

```text
無門老禪作四十八則語，
判斷古德公案。
大似黃油餅人，
令買家開口接。
安晚欲就渠熱爐上再打一撥，
足成大衍之數。
```

#### Notes

- The leaf is stronger than a single-phrase stub.
- OCR and image also support a further continuation around `安晚欲就 / 渠熱爐上再打一撥 / 足成大衍之數`.
- The remaining lower lines are still too unstable for a fuller diplomatic recovery.

### PDF p.053 right leaf

- Role: later end-matter note
- Confidence: low

#### Consolidated Readable Text

```text
第四十九則語
頌云：
止止不須說我法妙難思。
法從何來，妙從何說時，又作麼生。
生豈但豐干饒舌，
元是釋迦多口。
老子造作好怪，
令千百代兒孫被著。
藤纏倒，未得頭出，
恰似這般奇特話頭。
起跳不止，飯蒸不熟，
有多少錯認處。
```

#### Notes

- `第四十九則語` appears clearly enough in OCR to log.
- The upper block is stronger than the earlier one-line stub.
- OCR and image both support the added lower warning lines around `豐干饒舌 / 釋迦多口 / 藤纏倒 / 未得頭出 / 奇特話頭 / 起跳不止 / 飯蒸不熟 / 錯認處`.

### PDF p.053 left leaf

- Role: later end-matter prose
- Confidence: low

#### Consolidated Readable Text

```text
傍人問云：
畢竟作如何結斷。
安晚合十指爪曰：
止止不須說我法妙難思。
却急去難患兩字上打箇小圓相子，
指示衆人云：
總在裏許。
```

#### Notes

- This leaf is materially stronger than the earlier placeholder state.
- The prose block above is now readable in substance from the witness image.
- A separate left-side verse/comment area remains present but not yet fully normalized.

### PDF p.054 right leaf

- Role: colophon / place and date note
- Confidence: low-medium

#### Consolidated Readable Text

```text
書于西湖漁莊。
淳祐丙午季夏初吉，
安晚居士
```

#### Notes

- This is one of the clearer colophon leaves.
- The full right-side date/place/signature column is stable from the witness image.

### PDF p.054 left leaf

- Role: printing / block history note
- Confidence: medium

#### Consolidated Readable Text

```text
舊板磨滅故重命工。
梓這板置於武藏州，
駒牟山廣圓禪寺也。
應永乙酉十月十三日，
幹緣比丘常牧。
```

#### Notes

- This is the clearest printing-history leaf in the end matter.
- Column order is now normalized to the witness sequence.
- The place-name and sponsor line are visible enough to retain, though one or two graphs in the recutting line may still admit later tightening.

### PDF p.055 right leaf

- Role: later colophon note
- Confidence: low-medium

#### Consolidated Readable Text

```text
寬永九年壬申九月
中野宗左衛門刊行
```

#### Notes

- The date line is the strongest part of the leaf.
- The boxed `寬永九年壬申九月 / 中野宗左衛門刊行` block is stable.
- The lighter side columns remain too weak for a cleaner reading on this pass.

### PDF p.055 left leaf

- Role: weak end-matter leaf
- Confidence: low

#### Consolidated Readable Text

```text
〔blank / no legible text recovered〕
```

#### Notes

- `RapidOCR` returned no result for this leaf.

## Next Targets

- verify the compressed middle run leaf by leaf where multiple short cases share one page sequence
- expand provisional witness runs into fuller diplomatic transcriptions where the image supports it
- separate end matter and printing notes more precisely from the 48-case body text
- leave damaged or low-confidence leaves explicitly marked rather than silently normalized
