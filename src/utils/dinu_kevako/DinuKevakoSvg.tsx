import React from 'react';
import {
    GLYPH_W, GLYPH_RADIUS, GLYPH_STROKE,
    VOWEL_W, VOWEL_H, VOWEL_CORNER_R, VOWEL_VERT_H,
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
    glifoPerLitero(litero: string, key: string): React.ReactElement {
        switch (litero) {
            // vowels
            case 'a':
                return this.vokalo_a(key);
            case 'e':
                return this.vokalo_e(key);
            case 'i':
                return this.vokalo_i(key);
            case 'o':
                return this.vokalo_o(key);
            case 'u':
                return this.vokalo_u(key);
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

    vokalo_a(key: string): React.ReactElement {
        return (
            <g key={key} data-litero="a">
                <line x1={0} y1={0} x2={VOWEL_W} y2={0}
                      stroke="#555" strokeWidth={VOWEL_H} strokeLinecap="round"/>
            </g>
        );
    }

    /**
     * Common shape for i, e, o, u:
     *   horizontal line → arc corner → vertical line.
     * @param deDekstre  true  → start at right, go left  (i, e)
     *                   false → start at left,  go right (u, o)
     * @param suben      true  → vertical goes downward   (i, u)
     *                   false → vertical goes upward     (e, o)
     */
    private _vokaloHoko(key: string, litero: string, deDekstre: boolean, suben: boolean): React.ReactElement {
        const R = VOWEL_CORNER_R;
        const sweep = (deDekstre !== suben) ? 1 : 0;
        const vertY = suben ? VOWEL_VERT_H : -VOWEL_VERT_H;
        const d = deDekstre
            ? [
                `M ${VOWEL_W},0`,
                `H ${R}`,
                `A ${R},${R} 0 0,${sweep} 0,${suben ? R : -R}`,
                `V ${vertY}`,
            ].join(' ')
            : [
                `M 0,0`,
                `H ${VOWEL_W - R}`,
                `A ${R},${R} 0 0,${sweep} ${VOWEL_W},${suben ? R : -R}`,
                `V ${vertY}`,
            ].join(' ');
        return (
            <g key={key} data-litero={litero}>
                <path d={d} fill="none" stroke="#555"
                      strokeWidth={VOWEL_H} strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        );
    }

    vokalo_e(key: string): React.ReactElement {
        return this._vokaloHoko(key, 'e', true, false);
    }

    vokalo_i(key: string): React.ReactElement {
        return this._vokaloHoko(key, 'i', true, true);
    }

    vokalo_o(key: string): React.ReactElement {
        return this._vokaloHoko(key, 'o', false, false);
    }

    vokalo_u(key: string): React.ReactElement {
        return this._vokaloHoko(key, 'u', false, true);
    }

    // ── Consonants (23) ───────────────────────────────────────────────────────
    // Origin: top-left of the GLYPH_W × GLYPH_W cell.
    // Current placeholder: hollow circle.  Replace each method body with the
    // real glyph shape once the design is settled.

    private _cirkel(key: string, litero: string): React.ReactElement {
        return (
            <g key={key} data-litero={litero}>
                <circle cx={GLYPH_W / 2} cy={GLYPH_W / 2} r={GLYPH_RADIUS}
                        fill="none" stroke="#888" strokeWidth={GLYPH_STROKE}/>
            </g>
        );
    }

    konsonanto_b(key: string): React.ReactElement {
        return this._cirkel(key, 'b');
    }

    konsonanto_c(key: string): React.ReactElement {
        return this._cirkel(key, 'c');
    }

    konsonanto_cx(key: string): React.ReactElement {
        return this._cirkel(key, 'ĉ');
    }

    konsonanto_d(key: string): React.ReactElement {
        return (
            <g key={key} data-litero="d">
                <polyline points={`0,${GLYPH_W} ${GLYPH_W / 2},0 ${GLYPH_W},${GLYPH_W}`}
                          fill="none" stroke="#555" strokeWidth={GLYPH_STROKE}
                          strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        );
    }

    konsonanto_f(key: string): React.ReactElement {
        return this._cirkel(key, 'f');
    }

    konsonanto_g(key: string): React.ReactElement {
        return this._cirkel(key, 'g');
    }

    konsonanto_gx(key: string): React.ReactElement {
        return this._cirkel(key, 'ĝ');
    }

    konsonanto_h(key: string): React.ReactElement {
        return this._cirkel(key, 'h');
    }

    konsonanto_hx(key: string): React.ReactElement {
        return this._cirkel(key, 'ĥ');
    }

    konsonanto_j(key: string): React.ReactElement {
        return this._cirkel(key, 'j');
    }

    konsonanto_jx(key: string): React.ReactElement {
        return this._cirkel(key, 'ĵ');
    }

    konsonanto_k(key: string): React.ReactElement {
        return this._cirkel(key, 'k');
    }

    konsonanto_l(key: string): React.ReactElement {
        return this._cirkel(key, 'l');
    }

    konsonanto_m(key: string): React.ReactElement {
        return this._cirkel(key, 'm');
    }

    konsonanto_n(key: string): React.ReactElement {
        return this._cirkel(key, 'n');
    }

    konsonanto_p(key: string): React.ReactElement {
        return this._cirkel(key, 'p');
    }

    konsonanto_r(key: string): React.ReactElement {
        return this._cirkel(key, 'r');
    }

    konsonanto_s(key: string): React.ReactElement {
        return this._cirkel(key, 's');
    }

    konsonanto_sx(key: string): React.ReactElement {
        return this._cirkel(key, 'ŝ');
    }

    konsonanto_t(key: string): React.ReactElement {
        return (
            <g key={key} data-litero="t">
                <polyline points={`0,0 ${GLYPH_W / 2},${GLYPH_W} ${GLYPH_W},0`}
                          fill="none" stroke="#555" strokeWidth={GLYPH_STROKE}
                          strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        );
    }

    konsonanto_ux(key: string): React.ReactElement {
        return this._cirkel(key, 'ŭ');
    }

    konsonanto_v(key: string): React.ReactElement {
        return this._cirkel(key, 'v');
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
}
