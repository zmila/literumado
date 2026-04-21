import React from 'react';
import { Vorto } from './tipoj';
import {
    GLYPH_W, GLYPH_K_H, GLYPH_RADIUS, GLYPH_STROKE,
    VOWEL_W, VOWEL_H,
    GAP_KV,
    K_ZONE_TOP, F_ZONE_TOP,
    LINE_STRIDE,
    CONSONANT_OFFSET_X, GAP_SYLLABLE, GAP_WORD,
} from './konstantoj';

// ── Default "not implemented" glyph (hollow circle) ──────────────────────────
function defaultGlifo(key: string, label: string): React.ReactElement {
    return (
        <g key={key} data-litero={label}>
            <circle
                cx={GLYPH_W / 2}
                cy={GLYPH_W / 2}
                r={GLYPH_RADIUS}
                fill="none"
                stroke="#888"
                strokeWidth={GLYPH_STROKE}
            />
        </g>
    );
}

// ── Vowel line glyph ──────────────────────────────────────────────────────────
function vokalGlifo(key: string, litero: string): React.ReactElement {
    // vowel line starts at x=0 (left edge of vowel anchor), full VOWEL_W width
    return (
        <g key={key} data-litero={litero}>
            <line
                x1={0}
                y1={0}
                x2={VOWEL_W}
                y2={0}
                stroke="#555"
                strokeWidth={VOWEL_H}
                strokeLinecap="round"
            />
        </g>
    );
}

// ── Layout ────────────────────────────────────────────────────────────────────

export interface ArangiAgordoj {
    svgWidth: number;
    padLeft?: number;
    padTop?: number;
}

export class DinuKevakoLayout {
    /**
     * Takes Vorto[] and layout settings, returns a flat array of positioned
     * SVG <g> elements — one column per syllable, glyphs stacked k / v / f.
     */
    arangi(vortoj: Vorto[], agordoj: ArangiAgordoj): React.ReactElement[] {
        const padL   = agordoj.padLeft ?? 10;
        const baseY0 = agordoj.padTop  ?? (padL + GLYPH_K_H + GAP_KV); // first baseline
        const maxX   = agordoj.svgWidth - padL;

        const rezulto: React.ReactElement[] = [];
        let x        = padL;
        let baseY    = baseY0;
        let kolIndekso = 0;

        const novaVico = () => {
            x     = padL;
            baseY += LINE_STRIDE;
        };

        for (let vi = 0; vi < vortoj.length; vi++) {
            const vorto = vortoj[vi];

            for (let si = 0; si < vorto.length; si++) {
                const silabo = vorto[si];

                // wrap if the next syllable column would overflow
                if (x + VOWEL_W > maxX) {
                    novaVico();
                }

                const col = `c${kolIndekso++}`;

                // ── k (initial consonant) — centred over the vowel ────────
                rezulto.push(
                    <g key={`${col}k`} transform={`translate(${x + CONSONANT_OFFSET_X}, ${baseY + K_ZONE_TOP})`}>
                        {defaultGlifo(`${col}ki`, silabo.k || '◦')}
                    </g>
                );

                // ── v (vowel) — layout anchor at x ────────────────────────
                rezulto.push(
                    <g key={`${col}v`} transform={`translate(${x}, ${baseY})`}>
                        {vokalGlifo(`${col}vi`, silabo.v)}
                    </g>
                );

                // ── f (final consonant) — centred under the vowel ─────────
                if (silabo.f) {
                    rezulto.push(
                        <g key={`${col}f`} transform={`translate(${x + CONSONANT_OFFSET_X}, ${baseY + F_ZONE_TOP})`}>
                            {defaultGlifo(`${col}fi`, silabo.f)}
                        </g>
                    );
                }

                // advance x by vowel width (the column anchor unit)
                x += VOWEL_W + GAP_SYLLABLE;
            }

            // extra word gap (replace last syllable gap with word gap)
            if (vi < vortoj.length - 1) {
                x += GAP_WORD - GAP_SYLLABLE;
            }
        }

        return rezulto;
    }
}
