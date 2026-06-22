# Dinu Kevako — Arkitekturo

Dinu Kevako estas silabara skribsistemo por Esperanto.
Ĉiu signo prezentas silabon en formo **K–V–F**:
supre estas komenca konsonanto (k), meze — vokalo (v), sube — fina konsonanto (f).

---

## Dosierstrukturo

```
src/
  utils/dinu_kevako/
    tipoj.ts                 — datentipoj: Silabo, Vorto
    konstantoj.ts            — ĉiuj numeroj kaj koloroj (unu fonto de vero)
    DinuKevakoKonvertilo.ts  — disigado de teksto je vortoj kaj silaboj
    DinuKevakoLayout.tsx     — poziciigo de glifoj (k/v/f) en vicoj kun translinio
    DinuKevakoSvg.tsx        — (rezerva) defaŭlta glifo-fabrikisto (malplena)

  components/dinu_kevako/
    DinuKevakoSvgComponent.tsx — SVG-bildigo: fono, krado, glifoj

  pages/dinu_kevako/
    index.tsx                — paĝo: enigo, silabado, SVG-prezento
```

---

## Dosieroj — priskribo

### `tipoj.ts`
Nur datentipoj, sen ia logiko:
```ts
type Silabo = { k: string; v: string; f: string };
type Vorto  = Silabo[];
```
`k` — komenca konsonanto (povas esti malplena),
`v` — vokalo,
`f` — fina konsonanto (povas esti malplena).

---

### `konstantoj.ts`
Ĉiuj dimensioj, spacoj kaj koloroj estas difinitaj ĉi tie kaj nur ĉi tie.
Aliaj dosieroj importas el ĉi tiu dosiero — neniu "magia nombro" en la kodo.

Ĉefaj grupoj de konstantoj:

| Grupo               | Ekzemploj                                                             |
|---------------------|-----------------------------------------------------------------------|
| Glifo-ĉelo          | `GLYPH_W=100`, `GLYPH_K_H=100`, `GLYPH_RADIUS=47.5`, `GLYPH_STROKE=5` |
| Vokala linio        | `VOWEL_W=150`, `VOWEL_H=5`                                            |
| Vertikalaj spacoj   | `GAP_KV=25`, `GAP_VF=25`                                              |
| Derivitaj pozicioj  | `K_ZONE_TOP=-125`, `F_ZONE_TOP=30`, `F_ZONE_BOTTOM=130`               |
| Vico-geometrio      | `SYLLABLE_H=255`, `GAP_LINE=100`, `LINE_STRIDE=355`                   |
| Horizontalaj spacoj | `GAP_SYLLABLE=50`, `GAP_WORD=100`                                     |
| SVG-kanvaso         | `SVG_PAD=10`, `SVG_CONTENT_H=660`, `SVG_H=680`                        |
| Koloroj             | `PARCHMENT`, `LINE_SOLID`, `LINE_DOTTED`, `VERT_COLOR`                |

---

### `DinuKevakoKonvertilo.ts`
**Algoritmo — disigado de teksto je silaboj:**

1. **Teksto → vortoj**: forigu interpunkcion, dividu laŭ spacoj.
2. **Vorto → silaboj**: trairu literon post litero:
   - Se litero estas **vokalo**: kreu novan `Silabo { k: nunaK, v: litero, f: '' }`, nuligu `nunaK`.
   - Se litero estas **konsonanto**: aldonu al `nunaK`.
   - Se post konsonant-areto venas vokalo kaj jam ekzistas antaŭa silabo:
     - **Intervokalaj konsonantoj** (`nunaK.length > 1`): dividu la areton — la lastaj 1–2 konsonantoj iras al `k` de la nova silabo, la unuaj — al `f` de la antaŭa.
     - Speciala kazo **`ŭ`** inter du vokaloj: ĝi fariĝas `f` de la antaŭa silabo.
3. Postrestantaj konsonantoj (vortofine) aldoniĝas kiel `f` al la lasta silabo.

---

### `DinuKevakoLayout.tsx`
**Algoritmo — vertikala poziciigo de K–V–F:**

La **bazlinio** estas la y-koordinato de la vokalo.
Ĉiuj pozicioj estas relativaj al ĝi:

```
bazlinio − 125  ←  supro de k-zono   (punktita direktlinio)
bazlinio − 25   ←  subo  de k-zono
bazlinio + 0    ←  vokala linio      (solida direktlinio)
bazlinio + 30   ←  supro de f-zono
bazlinio + 130  ←  subo  de f-zono   (punktita direktlinio)
```

La **vokalo** (VOWEL_W=150) estas la horizontala ankro de la kolumno.
La **konsonantoj** (GLYPH_W=100) estas centrumitaj super/sub ĝi per `CONSONANT_OFFSET_X=25`.

**Algoritmo — horizontala aranĝo de silaboj en vicon:**

```
x = padLeft
por ĉiu vorto:
  por ĉiu silabo:
    se x + VOWEL_W > maxX: translinio (x ← padLeft, baseY += LINE_STRIDE)
    desegnu k ĉe translate(x + 25, baseY − 125)
    desegnu v ĉe translate(x,      baseY)
    desegnu f ĉe translate(x + 25, baseY + 30)  [nur se f ≠ '']
    x += VOWEL_W + GAP_SYLLABLE   (150 + 50 = 200)
  x += GAP_WORD − GAP_SYLLABLE    (aldona +50 inter vortoj)
```

---

### `DinuKevakoSvgComponent.tsx`
SVG-komponanto kiu ricevas `vortoj: Vorto[]` kaj:

1. **Mezuras** la faktan larĝon de la SVG per `ResizeObserver`.
2. **Fono** — pergamentkolora (`#fdf6e3`) rektangulo kun 10px marĝeno.
3. **Horizontalaj direktlinioj** — por ĉiu vico laŭ `LINE_STRIDE`:
   - punktita: supro de k-zono
   - solida: bazlinio (vokalo)
   - punktita: subo de f-zono
4. **Vertikalaj direktlinioj** — ekde `SVG_PAD_LEFT + CONSONANT_OFFSET_X = 45`, paŝo `GLYPH_W = 100` — ĉiu linio koincidas kun la maldekstra aŭ dekstra rando de konsonant-ĉelo.
5. **Glifoj** — la rezulto de `DinuKevakoLayout.arangi(vortoj, …)`.

---

## TODO

- [ ] Listo de **ligaturoj** (oftaj konsonantaj aroj kiel unusola kunmetita glifo)
- [ ] SVG-glifoj por ligaturoj
- [ ] Restas glifo por 'dz', 'ajn'

---

