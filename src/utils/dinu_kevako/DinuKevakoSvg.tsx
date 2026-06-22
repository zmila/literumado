import React from 'react';
import {
    GLYPH_W, GLYPH_K_H, GLYPH_RADIUS, GLYPH_STROKE,
    VOWEL_W, VOWEL_W_DOUBLE, VOWEL_H, VOWEL_CORNER_R, VOWEL_VERT_H, NUL_KO,
} from './konstantoj';
import { seg, aH, aV, curveB, curveD } from './svg_primitives';

const W = GLYPH_W, KH = GLYPH_K_H;

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
            case 'jn':
                return this.ligaturo_jn(key);
            case 'dz':
                return this.ligaturo_dz(key);
            case NUL_KO:
                return this.konsonanto_nul(key, litero);
            default:
                return this.neimplementita(key, litero);
        }
    }

    /** Inversed-c: right-bulging semicircle at x=0 + body curve + right vertical */
    ligaturo_dz(key: string): React.ReactElement {
        const p = seg(
            `M 0,${KH}`, aV(0, 'up', 'right'),
            curveB(0),
            `M ${2 * W},${KH}`, `V 0`,
        );
        return this._renderKon(key, 'dz', p);
    }


    /** Fish shape: head (left semicircle) + body (curveB) + tail (curveD) — no right vertical */
    ligaturo_jn(key: string): React.ReactElement {
        const p = seg(
            `M ${W / 2},${KH}`, aV(W / 2, 'up', 'left'),  // head: left semicircle
            curveB(W / 2),                                  // body: lower-head → upper-right
            curveD(W / 2),                                  // tail: upper-head → lower-right
        );
        return this._renderKon(key, 'jn', p);
    }

    // ── Vowels (5) ────────────────────────────────────────────────────────────

    vokalo_a(key: string, vowelW: number = VOWEL_W): React.ReactElement {
        return (
            <g key={key} data-litero="a">
                <line x1={0} y1={0} x2={vowelW} y2={0}
                    stroke="#555" strokeWidth={VOWEL_H} strokeLinecap="round" />
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
        const p = seg(
            `M ${W / 2},${KH}`, aV(W / 2, 'up', 'left'),
            curveB(W / 2),
            `M ${2 * W},${KH}`, `V 0`,
        );
        return this._renderKon(key, 'b', p);
    }

    konsonanto_c(key: string): React.ReactElement {
        const p = seg(
            `M 0,0`, `V ${KH}`,
            `C ${W / 3},${KH / 3} ${W},0 ${2 * W},0`,
            `M ${2 * W},${KH}`, aV(2 * W, 'up', 'left'),
        );
        return this._renderKon(key, 'c', p);
    }

    /** Cursive-x: two crossing vertical semicircles */
    konsonanto_cx(key: string): React.ReactElement {
        return this._renderKon(key, 'ĉ', this._cxShape());
    }

    /** ^ shape — t flipped vertically */
    konsonanto_d(key: string): React.ReactElement {
        return this._renderKon(key, 'd', this._tShape(), `translate(0,${KH}) scale(1,-1)`);
    }

    konsonanto_f(key: string): React.ReactElement {
        const midY = KH / 2;
        return (
            <g key={key} data-litero="f">
                <circle cx={W / 2} cy={W / 2} r={GLYPH_RADIUS}
                    fill="none" stroke="#555" strokeWidth={GLYPH_STROKE} />
                <path d={seg(`M ${W},${midY}`, aH(2 * W, midY, 'up'), `V ${KH}`)}
                    fill="none" stroke="#555"
                    strokeWidth={GLYPH_STROKE} strokeLinecap="round" strokeLinejoin="round" />
            </g>
        );
    }

    /** Reverse-C shape — k flipped horizontally */
    konsonanto_g(key: string): React.ReactElement {
        return this._renderKon(key, 'g', this._cShape(), `translate(${W},0) scale(-1,1)`);
    }

    /** cx rotated 90°: two crossing horizontal semicircles */
    konsonanto_gx(key: string): React.ReactElement {
        return this._renderKon(key, 'ĝ', this._gxShape());
    }

    /** Two hollow circles side by side: one at x=0-100, one at x=100-200. Total width: 200, height: 100 */
    konsonanto_h(key: string): React.ReactElement {
        return (
            <g key={key} data-litero="h">
                <circle cx={W / 2} cy={W / 2} r={GLYPH_RADIUS}
                    fill="none" stroke="#555" strokeWidth={GLYPH_STROKE} />
                <circle cx={W + W / 2} cy={W / 2} r={GLYPH_RADIUS}
                    fill="none" stroke="#555" strokeWidth={GLYPH_STROKE} />
            </g>
        );
    }

    /** Oval: left-bulging semicircle + right-bulging semicircle joined by top/bottom horizontal lines */
    konsonanto_hx(key: string): React.ReactElement {
        return this._renderKon(key, 'ĥ', this._hxShape());
    }

    konsonanto_j(key: string): React.ReactElement {
        return this._renderKon(key, 'j', curveB(0));
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
        return this._renderKon(key, 'n', this._mShape(), `translate(0,${KH}) scale(1,-1)`);
    }

    konsonanto_p(key: string): React.ReactElement {
        const p = seg(
            `M 0,0`, `V ${KH}`,
            `C ${W / 3},${KH / 3} ${W},0 ${3 * W / 2},0`,
            aV(3 * W / 2, 'down', 'right'),
        );
        return this._renderKon(key, 'p', p);
    }

    /** Top-right hook — l rotated 180° */
    konsonanto_r(key: string): React.ReactElement {
        return this._renderKon(key, 'r', this._lShape(), `translate(${W},${KH}) scale(-1,-1)`);
    }

    konsonanto_s(key: string): React.ReactElement {
        return this._renderKon(key, 's', this._sShape());
    }

    /** Cursive lowercase m: vertical flip of jx (two n-shapes side by side) */
    konsonanto_sx(key: string): React.ReactElement {
        return this._renderKon(key, 'ŝ', this._jxShape(), `translate(0,${KH}) scale(1,-1)`);
    }

    /** V-shape */
    konsonanto_t(key: string): React.ReactElement {
        return this._renderKon(key, 't', this._tShape());
    }

    /** J flipped horizontally */
    konsonanto_ux(key: string): React.ReactElement {
        return this._renderKon(key, 'ŭ', curveB(0), `translate(${W * 2},0) scale(-1,1)`);
    }

    konsonanto_v(key: string): React.ReactElement {
        const midY = KH / 2;
        return (
            <g key={key} data-litero="v">
                <path d={seg(`M 0,0`, `V ${midY}`, aH(W, midY, 'down'))}
                    fill="none" stroke="#555"
                    strokeWidth={GLYPH_STROKE} strokeLinecap="round" strokeLinejoin="round" />
                <circle cx={W + W / 2} cy={W / 2} r={GLYPH_RADIUS}
                    fill="none" stroke="#555" strokeWidth={GLYPH_STROKE} />
            </g>
        );
    }

    /** Handwritten-z: 3 horizontal lines connected by alternating right/left bulging arcs */
    konsonanto_z(key: string): React.ReactElement {
        return this._renderKon(key, 'z', this._zShape());
    }

    /** Placeholder circle syllable without starting k. */
    konsonanto_nul(key: string, litero: string): React.ReactElement {
        return (
            <g key={key} data-litero={litero}>
                <circle cx={W / 2} cy={W / 2} r={GLYPH_RADIUS}
                    fill="none" stroke="#555" strokeWidth={GLYPH_STROKE} />
            </g>
        );
    }

    // ── Fallback ──────────────────────────────────────────────────────────────

    neimplementita(key: string, litero: string): React.ReactElement {
        return (
            <g key={key} data-litero={litero}>
                <circle cx={W / 2} cy={W / 2} r={GLYPH_RADIUS}
                    fill="none" stroke="grey" strokeWidth={GLYPH_STROKE}
                    strokeDasharray="6 4" />
            </g>
        );
    }

    // ── Private: element renderers ────────────────────────────────────────────

    /** Wraps a path string in a vowel <g> element, with optional transform. */
    private _renderVok(key: string, litero: string, vowelW: number = VOWEL_W, transform?: string): React.ReactElement {
        return (
            <g key={key} data-litero={litero} transform={transform}>
                <path d={this._iShape(vowelW)} fill="none" stroke="#555"
                    strokeWidth={VOWEL_H} strokeLinecap="round" strokeLinejoin="round" />
            </g>
        );
    }

    /** Wraps a path string in a consonant <g> element, with optional transform. */
    private _renderKon(key: string, litero: string, d: string, transform?: string): React.ReactElement {
        return (
            <g key={key} data-litero={litero} transform={transform}>
                <path d={d} fill="none" stroke="#555"
                    strokeWidth={GLYPH_STROKE} strokeLinecap="round" strokeLinejoin="round" />
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
        return `M 0,0 L ${W / 2},${KH} L ${W},0`;
    }

    /** Bottom-left hook: right-bottom → left → arc BL → top  (l; 180°→r) */
    private _lShape(): string {
        const R = W / 2;
        return [
            `M ${W},${KH}`, `H ${W / 2}`,
            `A ${R},${R} 0 0,1 0,${KH - R}`, `V 0`,
        ].join(' ');
    }

    /** Arch: top-left → down → arc → up → top-right  (m; flip→n) */
    private _mShape(): string {
        const midY = KH / 2;
        return seg(`M 0,0`, `V ${midY}`, aH(W, midY, 'down'), `V 0`);
    }

    /** S-curve: bottom-left → up → arc-over → arc-under → top-right */
    private _sShape(): string {
        const midY = KH / 2;
        return seg(`M 0,${KH}`, `V ${midY}`, aH(W, midY, 'up'), aH(2 * W, midY, 'down'), `V 0`);
    }

    /** Double arch (jx/sx): two m-shapes side by side. Total width: 200 */
    private _jxShape(): string {
        const midY = KH / 2;
        return seg(
            `M 0,0`, `V ${midY}`, aH(W, midY, 'down'), `V 0`,
            `M ${W},0`, `V ${midY}`, aH(2 * W, midY, 'down'), `V 0`,
        );
    }

    /** Oval: top-line → right-arc → bottom-line → left-arc + vertical centre line (hx) */
    private _hxShape(): string {
        const r = KH / 2;
        const x1 = r;
        const x2 = 2 * W - r;
        return seg(
            `M ${x1},0`, `H ${x2}`, aV(x2, 'down', 'right'),
            `H ${x1}`, aV(x1, 'up', 'left'),
            `M ${W},0`, `V ${KH}`,
        );
    }

    /** Handwritten-z: top-left → right → arc-right → left → arc-left → bottom-right */
    private _zShape(): string {
        const r = KH / 4;
        const y1 = KH / 2;
        const y2 = KH;
        return [
            `M 0,0`,
            `H ${W - r}`,
            `A ${r},${r} 0 0,1 ${W - r},${y1}`,
            `H ${r}`,
            `A ${r},${r} 0 0,0 ${r},${y2}`,
            `H ${W}`,
        ].join(' ');
    }

    /** C-shape: top-right → left → left semicircle → right  (k; flip→g) */
    private _cShape(): string {
        return seg(`M ${W},0`, `H ${W / 2}`, aV(W / 2, 'down', 'left'), `H ${W}`);
    }

    /** Cursive-x: right-bulging arc at x=0 and left-bulging arc at x=W, crossing at (W/2, KH/2) */
    private _cxShape(): string {
        return seg(`M 0,0`, aV(0, 'down', 'right')) + ' ' +
            seg(`M ${W},0`, aV(W, 'down', 'left'));
    }

    /** Cursive-x rotated 90°: top arc bulges down, bottom arc bulges up */
    private _gxShape(): string {
        return seg(`M 0,0`, aH(W, 0, 'down')) + ' ' +
            seg(`M 0,${KH}`, aH(W, KH, 'up'));
    }
}
