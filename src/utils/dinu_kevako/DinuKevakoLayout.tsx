import React from 'react';
import { Vorto } from './tipoj';
import {
    GLYPH_W, GLYPH_K_H,
    VOWEL_W,
    GAP_KV,
    K_ZONE_TOP, F_ZONE_TOP,
    LINE_STRIDE,
    CONSONANT_OFFSET_X, GAP_SYLLABLE, GAP_WORD,
    NUL_KO,
} from './konstantoj';
import { DinuKevakoSvg } from './DinuKevakoSvg';

// ── Layout ────────────────────────────────────────────────────────────────────

export interface ArangiAgordoj {
    svgWidth: number;
    padLeft?: number;
    padTop?: number;
}

const svg = new DinuKevakoSvg();

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
        let x          = padL;
        let baseY      = baseY0;
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
                        {svg.glifoPerLitero(silabo.k || NUL_KO, `${col}ki`)}
                    </g>
                );

                // ── v (vowel) — layout anchor at x ────────────────────────
                rezulto.push(
                    <g key={`${col}v`} transform={`translate(${x}, ${baseY})`}>
                        {svg.glifoPerLitero(silabo.v, `${col}vi`)}
                    </g>
                );

                // ── f (final consonant) — centred under the vowel ─────────
                if (silabo.f) {
                    rezulto.push(
                        <g key={`${col}f`} transform={`translate(${x + CONSONANT_OFFSET_X}, ${baseY + F_ZONE_TOP})`}>
                            {svg.glifoPerLitero(silabo.f, `${col}fi`)}
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
