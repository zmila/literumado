import React from 'react';
import {
    GLYPH_W, GLYPH_K_H, GLYPH_RADIUS, GLYPH_STROKE,
    VOWEL_W, VOWEL_W_DOUBLE, VOWEL_H, VOWEL_CORNER_R, VOWEL_VERT_H,
} from './konstantoj';

/**
 * Low-level glyph factory.
 * Each public method returns one SVG <g> fragment for a given letter.
 * The fragment is drawn in its own local coordinate system:
 *   - consonant glyphs:  origin at top-left of the GLYPH_W × GLYPH_W cell
 *   - vowel glyphs:      origin at the left end of the vowel baseline
 * Positioning (translate) is the responsibility of DinuKevakoLayout.
 */
export class DinuKevakoSvg {

    // ── Dispatcher ────────────────────────────────────────────────────────────

    /** Returns the SVG fragment for any Esperanto letter (or fallback). */
    glifoPerLitero(litero: string, key: string, vowelW: number = VOWEL_W): React.ReactElement {
        switch (litero) {
            // vowels
            case 'a':
                return this.vokalo_a(key, vowelW);
            case 'e':
                return this.vokalo_e(key, vowelW);
            case 'i':
                return this.vokalo_i(key, vowelW);
            case 'o':
                return this.vokalo_o(key, vowelW);
            case 'u':
                return this.vokalo_u(key, vowelW);
            // consonants
            case 'b':
                return this.konsonanto_b(key);
            case 'c':
                return this.konsonanto_c(key);
            case 'ĉ':
                return this.konsonanto_cx(key);
            case 'd':
                return this.konsonanto_d(key);
            case 'f':
                return this.konsonanto_f(key);
            case 'g':
                return this.konsonanto_g(key);
            case 'ĝ':
                return this.konsonanto_gx(key);
            case 'h':
                return this.konsonanto_h(key);
            case 'ĥ':
                return this.konsonanto_hx(key);
            case 'j':
                return this.konsonanto_j(key);
            case 'ĵ':
                return this.konsonanto_jx(key);
            case 'k':
                return this.konsonanto_k(key);
            case 'l':
                return this.konsonanto_l(key);
            case 'm':
                return this.konsonanto_m(key);
            case 'n':
                return this.konsonanto_n(key);
            case 'p':
                return this.konsonanto_p(key);
            case 'r':
                return this.konsonanto_r(key);
            case 's':
                return this.konsonanto_s(key);
            case 'ŝ':
                return this.konsonanto_sx(key);
            case 't':
                return this.konsonanto_t(key);
            case 'ŭ':
                return this.konsonanto_ux(key);
            case 'v':
                return this.konsonanto_v(key);
            case 'z':
                return this.konsonanto_z(key);
            default:
                return this.neimplementita(key, litero);
        }
    }

    // ── Vowels (5) ────────────────────────────────────────────────────────────

    vokalo_a(key: string, vowelW: number = VOWEL_W): React.ReactElement {
        return (
            <g key={key} data-litero="a">
                <line x1={0} y1={0} x2={vowelW} y2={0}
                      stroke="#555" strokeWidth={VOWEL_H} strokeLinecap="round"/>
            </g>
        );
    }

    vokalo_e(key: string, vowelW: number = VOWEL_W): React.ReactElement {
        return this._renderVok(key, 'e', vowelW, `scale(1,-1)`);
    }

    vokalo_i(key: string, vowelW: number = VOWEL_W): React.ReactElement {
        return this._renderVok(key, 'i', vowelW);
    }

    vokalo_o(key: string, vowelW: number = VOWEL_W): React.ReactElement {
        return this._renderVok(key, 'o', vowelW, `translate(${vowelW},0) scale(-1,-1)`);
    }

    vokalo_u(key: string, vowelW: number = VOWEL_W): React.ReactElement {
        return this._renderVok(key, 'u', vowelW, `translate(${vowelW},0) scale(-1,1)`);
    }

    // ── Consonant glyphs ──────────────────────────────────────────────────────

    konsonanto_b(key: string): React.ReactElement {
        return (
            <g key={key} data-litero="b">
                {/* Left part: right semi-circle (from p's right semi-circle, rotated 180°) */}
                <path d={this._bSemicircleLeft()} fill="none" stroke="#555"
                      strokeWidth={GLYPH_STROKE} strokeLinecap="round" strokeLinejoin="round"/>
                {/* Connecting curve: cubic bezier rotated 180° */}
                <path d={this._bConnectingCurve()} fill="none" stroke="#555"
                      strokeWidth={GLYPH_STROKE} strokeLinecap="round" strokeLinejoin="round"/>
                {/* Right part: vertical line (from p's left line, rotated 180°) */}
                <path d={this._bLineRight()} fill="none" stroke="#555"
                      strokeWidth={GLYPH_STROKE} strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        );
    }

    konsonanto_c(key: string): React.ReactElement {
        return (
            <g key={key} data-litero="c">
                {/* Left part: vertical line at x=0 */}
                <path d={this._cLineLeft()} fill="none" stroke="#555"
                      strokeWidth={GLYPH_STROKE} strokeLinecap="round" strokeLinejoin="round"/>
                {/* Connecting curve placeholder */}
                <path d={this._cConnectingCurve()} fill="none" stroke="#555"
                      strokeWidth={GLYPH_STROKE} strokeLinecap="round" strokeLinejoin="round"/>
                {/* Right part: left semi-circle */}
                <path d={this._cSemicircleRight()} fill="none" stroke="#555"
                      strokeWidth={GLYPH_STROKE} strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        );
    }

    /** Cursive-x: two crossing vertical semicircles */
    konsonanto_cx(key: string): React.ReactElement {
        return this._renderKon(key, 'ĉ', this._cxShape());
    }

    /** ^ shape — t flipped vertically */
    konsonanto_d(key: string): React.ReactElement {
        return this._renderKon(key, 'd', this._tShape(), `translate(0,${GLYPH_K_H}) scale(1,-1)`);
    }

    konsonanto_f(key: string): React.ReactElement {
        return (
            <g key={key} data-litero="f">
                {/* Left part: circle at x=0-100 */}
                <circle cx={GLYPH_W / 2} cy={GLYPH_W / 2} r={GLYPH_RADIUS}
                        fill="none" stroke="#555" strokeWidth={GLYPH_STROKE}/>
                {/* Right part: m-shape without final vertical (arc path), rotated 180° and positioned at x=100-200 */}
                <path d={this._fShapeArc()} fill="none" stroke="#555"
                      strokeWidth={GLYPH_STROKE} strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        );
    }

    /** Reverse-C shape — k flipped horizontally */
    konsonanto_g(key: string): React.ReactElement {
        return this._renderKon(key, 'g', this._cShape(), `translate(${GLYPH_W},0) scale(-1,1)`);
    }

    /** cx rotated 90°: two crossing horizontal semicircles */
    konsonanto_gx(key: string): React.ReactElement {
        return this._renderKon(key, 'ĝ', this._gxShape());
    }

    /** Two hollow circles side by side: one at x=0-100, one at x=100-200. Total width: 200, height: 100 */
    konsonanto_h(key: string): React.ReactElement {
        return (
            <g key={key} data-litero="h">
                {/* First circle: x=0-100 */}
                <circle cx={GLYPH_W / 2} cy={GLYPH_W / 2} r={GLYPH_RADIUS}
                        fill="none" stroke="#555" strokeWidth={GLYPH_STROKE}/>
                {/* Second circle: x=100-200 */}
                <circle cx={GLYPH_W + GLYPH_W / 2} cy={GLYPH_W / 2} r={GLYPH_RADIUS}
                        fill="none" stroke="#555" strokeWidth={GLYPH_STROKE}/>
            </g>
        );
    }

    konsonanto_hx(key: string): React.ReactElement {
        return this._cirkel(key, 'ĥ');
    }

    konsonanto_j(key: string): React.ReactElement {
        return this._cirkel(key, 'j');
    }

    /** Two m-shapes side by side, touching at the center */
    konsonanto_jx(key: string): React.ReactElement {
        return this._renderKon(key, 'ĵ', this._jxShape());
    }

    /** C-shape */
    konsonanto_k(key: string): React.ReactElement {
        return this._renderKon(key, 'k', this._cShape());
    }

    /** Bottom-left hook */
    konsonanto_l(key: string): React.ReactElement {
        return this._renderKon(key, 'l', this._lShape());
    }

    /** U-shape */
    konsonanto_m(key: string): React.ReactElement {
        return this._renderKon(key, 'm', this._mShape());
    }

    /** n-shape — m flipped vertically */
    konsonanto_n(key: string): React.ReactElement {
        return this._renderKon(key, 'n', this._mShape(), `translate(0,${GLYPH_K_H}) scale(1,-1)`);
    }

    konsonanto_p(key: string): React.ReactElement {
        return (
            <g key={key} data-litero="p">
                {/* Left part: vertical line at x=0 */}
                <path d={this._pLineLeft()} fill="none" stroke="#555"
                      strokeWidth={GLYPH_STROKE} strokeLinecap="round" strokeLinejoin="round"/>
                {/* Connecting curve: cubic bezier from line endpoint to semicircle start */}
                <path d={this._pConnectingCurve()} fill="none" stroke="#555"
                      strokeWidth={GLYPH_STROKE} strokeLinecap="round" strokeLinejoin="round"/>
                {/* Right part: right semi-circle at rightmost position (x=100-200) */}
                <path d={this._pSemicircleRight()} fill="none" stroke="#555"
                      strokeWidth={GLYPH_STROKE} strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        );
    }

    /** Top-right hook — l rotated 180° */
    konsonanto_r(key: string): React.ReactElement {
        return this._renderKon(key, 'r', this._lShape(), `translate(${GLYPH_W},${GLYPH_K_H}) scale(-1,-1)`);
    }

    konsonanto_s(key: string): React.ReactElement {
        return this._renderKon(key, 's', this._sShape());
    }

    /** Cursive lowercase m: vertical flip of jx (two n-shapes side by side) */
    konsonanto_sx(key: string): React.ReactElement {
        return this._renderKon(key, 'ŝ', this._jxShape(), `translate(0,${GLYPH_K_H}) scale(1,-1)`);
    }

    /** V-shape */
    konsonanto_t(key: string): React.ReactElement {
        return this._renderKon(key, 't', this._tShape());
    }

    konsonanto_ux(key: string): React.ReactElement {
        return this._cirkel(key, 'ŭ');
    }

    konsonanto_v(key: string): React.ReactElement {
        return (
            <g key={key} data-litero="v">
                {/* Left part: m-shape without final vertical (arc path) */}
                <path d={this._vShapeArc()} fill="none" stroke="#555"
                      strokeWidth={GLYPH_STROKE} strokeLinecap="round" strokeLinejoin="round"/>
                {/* Right part: circle at x=100-200 */}
                <circle cx={GLYPH_W + GLYPH_W / 2} cy={GLYPH_W / 2} r={GLYPH_RADIUS}
                        fill="none" stroke="#555" strokeWidth={GLYPH_STROKE}/>
            </g>
        );
    }

    konsonanto_z(key: string): React.ReactElement {
        return this._cirkel(key, 'z');
    }

    // ── Fallback ──────────────────────────────────────────────────────────────

    neimplementita(key: string, litero: string): React.ReactElement {
        return (
            <g key={key} data-litero={litero}>
                <circle cx={GLYPH_W / 2} cy={GLYPH_W / 2} r={GLYPH_RADIUS}
                        fill="none" stroke="#888" strokeWidth={GLYPH_STROKE}
                        strokeDasharray="6 4"/>
            </g>
        );
    }

    // ── Private: element renderers ────────────────────────────────────────────

    /** Wraps a path string in a vowel <g> element, with optional transform. */
    private _renderVok(key: string, litero: string, vowelW: number = VOWEL_W, transform?: string): React.ReactElement {
        return (
            <g key={key} data-litero={litero} transform={transform}>
                <path d={this._iShape(vowelW)} fill="none" stroke="#555"
                      strokeWidth={VOWEL_H} strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        );
    }

    /** Wraps a path string in a consonant <g> element, with optional transform. */
    private _renderKon(key: string, litero: string, d: string, transform?: string): React.ReactElement {
        return (
            <g key={key} data-litero={litero} transform={transform}>
                <path d={d} fill="none" stroke="#555"
                      strokeWidth={GLYPH_STROKE} strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        );
    }

    /** Placeholder circle for unimplemented consonants. */
    private _cirkel(key: string, litero: string): React.ReactElement {
        return (
            <g key={key} data-litero={litero}>
                <circle cx={GLYPH_W / 2} cy={GLYPH_W / 2} r={GLYPH_RADIUS}
                        fill="none" stroke="#888" strokeWidth={GLYPH_STROKE}/>
            </g>
        );
    }

    // ── Private: shape path factories ─────────────────────────────────────────

    /**
     * Hook shape (base for i, e, o, u vowels):
     *   start right → go left → arc bottom-left corner → go down.
     *   e = scale(1,-1)  |  u = translate(W,0) scale(-1,1)  |  o = translate(W,0) scale(-1,-1)
     */
    private _iShape(vowelW: number = VOWEL_W): string {
        const R = VOWEL_CORNER_R;
        return [`M ${vowelW},0`, `H ${R}`, `A ${R},${R} 0 0,0 0,${R}`, `V ${VOWEL_VERT_H}`].join(' ');
    }

    /** V-shape: top-left → bottom-centre → top-right  (t; flip→d) */
    private _tShape(): string {
        return `M 0,0 L ${GLYPH_W / 2},${GLYPH_K_H} L ${GLYPH_W},0`;
    }

    /** Bottom-left hook: right-bottom → left → arc BL → top  (l; 180°→r) */
    private _lShape(): string {
        const R = GLYPH_W / 2;
        return [
            `M ${GLYPH_W},${GLYPH_K_H}`, `H ${GLYPH_W / 2}`,
            `A ${R},${R} 0 0,1 0,${GLYPH_K_H - R}`, `V 0`,
        ].join(' ');
    }

    /** Arch: top-left → down → arc upward → up → top-right  (m; flip→n; rotate→k,g) */
    private _mShape(): string {
        const midY = GLYPH_K_H / 2;
        const r = GLYPH_W / 2;
        return [`M 0,0`, `V ${midY}`, `A ${r},${r} 0 0,0 ${GLYPH_W},${midY}`, `V 0`].join(' ');
    }

    /** S-shape: two glyphs side by side forming an S curve. Total width: 200, height: 100 */
    private _sShape(): string {
        const midY = GLYPH_K_H / 2;
        const r = GLYPH_W / 2;
        // Left part: starts at bottom-left, goes up and arcs right
        // This is like the first half of an S: M left,bottom V middle A radius right
        const leftPart = [`M 0,${GLYPH_K_H}`, `V ${midY}`, `A ${r},${r} 0 0,1 ${GLYPH_W},${midY}`].join(' ');
        // Right part: continues the arc and goes up to top-right
        // This is like the second half of an S: A radius right V top
        const rightPart = `A ${r},${r} 0 0,0 ${GLYPH_W * 2},${midY} V 0`;
        return `${leftPart} ${rightPart}`;
    }

    /** Double m (jx): two M-shapes side by side, touching at center. Total width: 200, height: 100 */
    private _jxShape(): string {
        const midY = GLYPH_K_H / 2;
        const r = GLYPH_W / 2;
        // M-shape: top-left → down → arc upward → up → top-right
        // Left M at x=0-100: top-left → down → arc → up
        const leftM = [`M 0,0`, `V ${midY}`, `A ${r},${r} 0 0,0 ${GLYPH_W},${midY}`, `V 0`].join(' ');
        // Right M at x=100-200: top-left → down → arc → up (same as left M, just offset to 100-200)
        const rightM = `M ${GLYPH_W},0 V ${midY} A ${r},${r} 0 0,0 ${GLYPH_W * 2},${midY} V 0`;
        return `${leftM} ${rightM}`;
    }

    /** V-shape left part: m-shape without final vertical upstroke (just the arc). Total width: 100, height: 100 */
    private _vShapeArc(): string {
        const midY = GLYPH_K_H / 2;
        const r = GLYPH_W / 2;
        // M-shape without final upstroke: top-left → down → arc → stops at arc
        return [`M 0,0`, `V ${midY}`, `A ${r},${r} 0 0,0 ${GLYPH_W},${midY}`].join(' ');
    }

    /** F-shape right part: n-shape without first left upstroke (starts with top arc), positioned at x=100-200 */
    private _fShapeArc(): string {
        const midY = GLYPH_K_H / 2;
        const r = GLYPH_W / 2;
        // N-shape without first vertical: starts with arc downward → right downstroke
        // M at middle-top-left, arc down to middle-bottom-right, V up to top-right
        return [`M ${GLYPH_W},${midY}`, `A ${r},${r} 0 0,1 ${GLYPH_W * 2},${midY}`, `V ${GLYPH_K_H}`].join(' ');
    }

    /** P-shape left part: vertical line from top to bottom at x=0 */
    private _pLineLeft(): string {
        // Vertical line: top to bottom at x=0
        return `M 0,0 V ${GLYPH_K_H}`;
    }

    /** P-shape connecting curve: cubic bezier from line bottom to semicircle top */
    private _pConnectingCurve(): string {
        const startX = 0;
        const startY = GLYPH_K_H;

        const cp1X = GLYPH_W / 3;
        const cp1Y = GLYPH_K_H / 3;

        const cp2X = GLYPH_W;
        const cp2Y = 0;

        const endX = GLYPH_W + GLYPH_W / 2;
        const endY = 0;
        return `M ${startX},${startY} C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${endX},${endY}`;
    }

    /** C-shape connecting curve: cubic bezier from line bottom to semicircle top */
    private _cConnectingCurve(): string {
        const startX = 0;
        const startY = GLYPH_K_H;

        const cp1X = GLYPH_W / 3;
        const cp1Y = GLYPH_K_H / 3;

        const cp2X = GLYPH_W;
        const cp2Y = 0;

        const endX = GLYPH_W * 2;
        const endY = 0;
        return `M ${startX},${startY} C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${endX},${endY}`;
    }

    /** P-shape right part: right semi-circle positioned at x=100-150 (moved 50px left from edge) */
    private _pSemicircleRight(): string {
        const r = GLYPH_W / 2;
        const rightX = GLYPH_W + GLYPH_W / 2;  // 150: center of right square
        // Right semi-circle: from top to bottom on the right edge
        // M at top-right, arc down to bottom-right
        return [`M ${rightX},0`, `A ${r},${r} 0 0,1 ${rightX},${GLYPH_K_H}`].join(' ');
    }

    /** B-shape left part: left semi-circle (p's right semi-circle rotated 180° around center) */
    private _bSemicircleLeft(): string {
        const r = GLYPH_W / 2;
        const leftX = GLYPH_W / 2;  // 50: center of left square (mirrored from p's 150)
        // Left semi-circle: from bottom to top on the left edge (mirrored orientation)
        // M at bottom-left, arc up to top-left
        return [`M ${leftX},${GLYPH_K_H}`, `A ${r},${r} 0 0,1 ${leftX},0`].join(' ');
    }

    /** B-shape connecting curve: cubic bezier rotated 180° around center (100, 50) */
    private _bConnectingCurve(): string {
        const startX = GLYPH_W / 2;
        const startY = GLYPH_K_H;

        const cp1X = GLYPH_W;
        const cp1Y = GLYPH_K_H;

        const cp2X = 2 * GLYPH_W - GLYPH_W/3;
        const cp2Y = 2 * GLYPH_K_H / 3;

        const endX = 2 * GLYPH_W;
        const endY = 0;
        return `M ${startX},${startY} C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${endX},${endY}`;
    }

    /** B-shape right part: vertical line from bottom to top at x=200 */
    private _bLineRight(): string {
        // Vertical line from bottom to top at rightmost position (rotated from p's left line)
        return `M ${GLYPH_W * 2},${GLYPH_K_H} V 0`;
    }

    /** C-shape left part: vertical line from top to bottom at x=0 */
    private _cLineLeft(): string {
        // Vertical line: top to bottom at x=0 (very left edge)
        return `M 0,0 V ${GLYPH_K_H}`;
    }

    /** C-shape right part: left semi-circle positioned at x=200 (moved GLYPH_W/2 to the right from x=150) */
    private _cSemicircleRight(): string {
        const r = GLYPH_W / 2;
        const rightX = GLYPH_W + GLYPH_W / 2 + GLYPH_W / 2;  // 200: moved further right
        // Left semi-circle: from bottom to top on the right edge (mirrored orientation)
        // M at bottom-right, arc up to top-right
        return [`M ${rightX},${GLYPH_K_H}`, `A ${r},${r} 0 0,1 ${rightX},0`].join(' ');
    }

    /** C-shape: top-right → half-width left → left semicircle → half-width right → bottom-right  (k; flip→g) */
    private _cShape(): string {
        const midX = GLYPH_W / 2;
        const midY = GLYPH_K_H / 2;
        return [
            `M ${GLYPH_W},0`, `H ${midX}`,
            `A ${midY},${midY} 0 0,0 ${midX},${GLYPH_K_H}`,
            `H ${GLYPH_W}`,
        ].join(' ');
    }

    /** Cursive-x: right-bulging arc at x=0 and left-bulging arc at x=W, both crossing at centre (W/2, H/2) */
    private _cxShape(): string {
        const r  = GLYPH_K_H / 2;
        const x1 = 0;           // right-bulging arc on left edge
        const x2 = GLYPH_W;    // left-bulging arc on right edge
        return [
            `M ${x1},0 A ${r},${r} 0 0,1 ${x1},${GLYPH_K_H}`,
            `M ${x2},0 A ${r},${r} 0 0,0 ${x2},${GLYPH_K_H}`,
        ].join(' ');
    }

    /** Cursive-x rotated 90°: two crossing horizontal semicircles, both bulging toward the centre */
    private _gxShape(): string {
        const r = GLYPH_W / 2;
        return [
            `M 0,0 A ${r},${r} 0 0,0 ${GLYPH_W},0`,                        // top arc, sweep=0 → bulges down into cell
            `M 0,${GLYPH_K_H} A ${r},${r} 0 0,1 ${GLYPH_W},${GLYPH_K_H}`, // bottom arc, sweep=1 → bulges up into cell
        ].join(' ');
    }
}
