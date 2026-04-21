// ── Special symbols ───────────────────────────────────────────────────────────
export const NUL_KO = '◦';  // placeholder for a missing consonant

// ── Glyph cell ────────────────────────────────────────────────────────────────
export const GLYPH_W        = 100;  // width of one glyph cell (k or f consonant)
export const GLYPH_K_H      = 100;  // height of the initial-consonant (k) zone
export const GLYPH_F_H      = 100;  // height of the final-consonant   (f) zone
export const GLYPH_STROKE   =   5;  // stroke-width for consonant glyphs (matches VOWEL_H)
// Outer edge of stroke = r + GLYPH_STROKE/2 must equal GLYPH_W/2 = 50
export const GLYPH_RADIUS   = GLYPH_W / 2 - GLYPH_STROKE / 2;  // 47.5

// ── Vowel line ────────────────────────────────────────────────────────────────
export const VOWEL_W        = 150;  // length of the vowel stroke (single-width syllable)
export const VOWEL_W_DOUBLE = 250;  // length of the vowel stroke (when k or f is double-width)
export const VOWEL_H        =   5;  // stroke-width of the vowel line
export const VOWEL_CORNER_R =  25;  // radius of the rounded corner used in I, E, O, U
export const VOWEL_VERT_H   = 75;  // length of the vertical descender used in I, E, O, U

// ── Vertical gaps inside one syllable column ─────────────────────────────────
export const GAP_KV         =  25;  // gap between bottom of k zone and vowel line
export const GAP_VF         =  25;  // gap between vowel line and top of f zone

// ── Derived vertical positions (relative to baseline = vowel y) ──────────────
// k zone  → [K_ZONE_TOP .. K_ZONE_TOP + GLYPH_K_H]  i.e. [-125 .. -25]
// vowel   → 0  (baseline)
// f zone  → [F_ZONE_TOP .. F_ZONE_TOP + GLYPH_F_H]  i.e. [30 .. 130]
export const K_ZONE_TOP     = -(GAP_KV + GLYPH_K_H);         // -125
export const F_ZONE_TOP     =   VOWEL_H + GAP_VF;             //   30
export const F_ZONE_BOTTOM  =   F_ZONE_TOP + GLYPH_F_H;       //  130

// ── Total syllable column height & row spacing ────────────────────────────────
export const SYLLABLE_H     = GLYPH_K_H + GAP_KV + VOWEL_H + GAP_VF + GLYPH_F_H; // 255
export const GAP_LINE       = 100;  // extra vertical gap between successive rows
export const LINE_STRIDE    = SYLLABLE_H + GAP_LINE;          // 355 — baseline-to-baseline

// ── Baseline offset from the top of a row ────────────────────────────────────
export const BASELINE_OFFSET = GLYPH_K_H + GAP_KV;           // 125

// ── Consonant centering over the vowel line ───────────────────────────────────
// Vowel is the layout anchor; consonant cell (GLYPH_W=100) is narrower than
// the vowel line (VOWEL_W=150), so offset it right by half the difference.
export const CONSONANT_OFFSET_X = (VOWEL_W - GLYPH_W) / 2;  // 25

// ── Horizontal spacing ────────────────────────────────────────────────────────
export const GAP_SYLLABLE   =  50;  // horizontal gap between syllables in same word
export const GAP_WORD       = 100;  // horizontal gap between words

// ── SVG canvas ────────────────────────────────────────────────────────────────
export const SVG_PAD        =  10;  // uniform padding on all four sides
export const SVG_PAD_LEFT   = SVG_PAD + 10;                   // 20 — left glyph margin
// Content height fits exactly N full rows + bottom breathing room (GAP_LINE/2)
// bottom of row n (0-based) = BASELINE_OFFSET + n*LINE_STRIDE + F_ZONE_BOTTOM
// for 2 rows: 125 + 355 + 130 = 610; add GAP_LINE/2=50 → 660
export const SVG_ROWS       = 2;
export const SVG_CONTENT_H  = BASELINE_OFFSET + (SVG_ROWS - 1) * LINE_STRIDE + F_ZONE_BOTTOM + GAP_LINE / 2; // 660
export const SVG_H          = SVG_CONTENT_H + SVG_PAD * 2;   // 680 — total SVG height

// ── Grid / colours ────────────────────────────────────────────────────────────
export const VERT_STEP      = 100;  // distance between vertical grid lines
export const PARCHMENT      = '#fdf6e3';
export const LINE_SOLID     = '#c8b89a';
export const LINE_DOTTED    = '#d9c9b0';
export const VERT_COLOR     = '#ddd0bc';


// ── Consonant width classification ───────────────────────────────────────────
// Single consonants occupy one glyph cell (GLYPH_W = 100).
// All others are "double" — two cells wide (2 × GLYPH_W = 200).
const UNUOPAJ_KONSONANTOJ = new Set<string>([
    'd', 'g', 'ĝ', 'k', 'l', 'm', 'n', 'r', 't', 'ĉ',
    // 'f', 'h', 's', 'ŝ', 'ĵ', and 'v' are now double-width
]);

/** Returns true if the consonant glyph fits in a single GLYPH_W cell. */
export function estasUnuopa(litero: string): boolean {
    return UNUOPAJ_KONSONANTOJ.has(litero);
}