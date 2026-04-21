import React from 'react';
import { Silabo, Vorto } from './tipoj';

const GLYPH_SIZE = 100;
const RADIUS = GLYPH_SIZE / 2 - 4; // small inset so stroke fits inside the cell

/** Default "not implemented" glyph — hollow circle */
function neimplementitaGlifo(silabo: Silabo, litero: string, key: string): React.ReactElement {
    return (
        <g key={key} data-litero={litero} data-k={silabo.k} data-v={silabo.v} data-f={silabo.f}>
            <circle
                cx={GLYPH_SIZE / 2}
                cy={GLYPH_SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="#888"
                strokeWidth={1.5}
            />
        </g>
    );
}

export class DinuKevakoSvg {
    /**
     * Converts a list of words (Vorto[]) into a flat list of SVG <g> fragments —
     * one fragment per letter (k, v, f) of each syllable.
     * Letters that have no glyph yet are rendered as hollow circles.
     */
    vortojAlSvg(vortoj: Vorto[]): React.ReactElement[] {
        const rezulto: React.ReactElement[] = [];
        let indekso = 0;

        for (const vorto of vortoj) {
            for (const silabo of vorto) {
                // initial consonant (k) — may be empty string meaning "no consonant"
                rezulto.push(
                    neimplementitaGlifo(silabo, silabo.k || '◦', `g${indekso++}k`)
                );
                // vowel (v)
                rezulto.push(
                    neimplementitaGlifo(silabo, silabo.v, `g${indekso++}v`)
                );
                // final consonant (f) — only if present
                if (silabo.f) {
                    rezulto.push(
                        neimplementitaGlifo(silabo, silabo.f, `g${indekso++}f`)
                    );
                }
            }
        }

        return rezulto;
    }
}

