import { Silabo, Vorto } from './tipoj';
import { NUL_KO } from './konstantoj';

export class DinuKevakoKonvertilo {
    private estasVokalo(char: string): boolean {
        return 'aeiou'.includes(char);
    }

    private estasKonsonanto(char: string): boolean {
        return 'bcĉdfgĝhĥjĵklmnprsŝtŭvz'.includes(char);
    }

    private tekstoAlVortoj(text: string): string[] {
        return text.replace(/[,.!?;:()"\[\]{}…—–]/g, '').split(/\s+/).filter(Boolean);
    }

    private troviDisiganIndekson(konsonantaAreto: string): number {
        switch (konsonantaAreto.length) {
            case 3:
                return 2; // For 3 consonants: C-CC (e.g., ek-sci)
            case 4:
                return 2; // For 4 consonants: CC-CC (e.g., dek-stra)
            default:
                return 1; // Default for 2 consonants: C-C
        }
    }

    private prilaboriIntervokalojn(nunaK: string, silaboj: Silabo[]): string {
        // Special case for 'Vowel-ŭ-Vowel'
        if (nunaK === 'ŭ' && silaboj.length > 0 && this.estasVokalo(silaboj[silaboj.length - 1].v)) {
            silaboj[silaboj.length - 1].f = 'ŭ';
            return '';
        }

        if (nunaK.length > 1) {
            const disigaIndekso = this.troviDisiganIndekson(nunaK);
            const lastaSilabo = silaboj[silaboj.length - 1];
            lastaSilabo.f = nunaK.slice(0, nunaK.length - disigaIndekso);
            return nunaK.slice(nunaK.length - disigaIndekso);
        }

        return nunaK;
    }

    private vortoAlSilaboj(vortoText: string): Vorto {
        const silaboj: Silabo[] = [];
        let nunaK = '';
        let postLimo = false;  // True after an explicit syllable boundary (-, ', _)

        for (let i = 0; i < vortoText.length; i++) {
            const char = vortoText[i];

            if (char === '-' || char === "'") {
                this.finuSilabon(nunaK, silaboj);
                nunaK = '';
                postLimo = true;
                continue;
            }

            if (this.estasVokalo(char)) {
                if (silaboj.length > 0 && nunaK.length > 0 && !postLimo) {
                    nunaK = this.prilaboriIntervokalojn(nunaK, silaboj);
                }
                silaboj.push({ k: nunaK, v: char, f: '' });
                nunaK = '';
                postLimo = false;
            } else if (this.estasKonsonanto(char)) {
                nunaK += char;
            }
        }

        this.finuSilabon(nunaK, silaboj);

        return silaboj;
    }

    private finuSilabon(nunaK: string, silaboj: Silabo[]) {
        if (nunaK && silaboj.length > 0) {
            silaboj[silaboj.length - 1].f = nunaK;
        } else if (nunaK) {
            silaboj.push({ k: nunaK, v: '', f: '' });
        }
    }

    dividuJeSilaboj(text: string): Vorto[] {
        if (!text) return [];
        const result: Vorto[] = [];
        for (const line of text.split('\n')) {
            const vortojText = this.tekstoAlVortoj(line.toLowerCase());
            if (vortojText.length > 0) {
                if (result.length > 0) result.push([]); // line-break sentinel
                result.push(...vortojText.map(t => this.vortoAlSilaboj(t)));
            }
        }
        return result;
    }

    private formatigiSilabon(s: Silabo): string {
        const k = s.k || NUL_KO;
        if (s.f) {
            return `(${k}|${s.v}|${s.f})`;
        }
        return `(${k}|${s.v})`;
    }

    public formatigi(vortoj: Vorto[]): string {
        if (!vortoj) return '';
        const parts: string[] = [];
        for (const vorto of vortoj) {
            if (vorto.length === 0) {
                parts.push('\n');
            } else {
                if (parts.length > 0 && parts[parts.length - 1] !== '\n') parts.push(' ');
                parts.push(vorto.map(s => this.formatigiSilabon(s)).join('-'));
            }
        }
        return parts.join('');
    }
}
