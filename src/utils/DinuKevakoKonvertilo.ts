export type Silabo = {
    k: string;
    v: string;
    f: string;
};

export type Vorto = Silabo[];

export class DinuKevakoKonvertilo {
    private estasVokalo(char: string): boolean {
        return 'aeiou'.includes(char.toLowerCase());
    }

    private tekstoAlVortoj(text: string): string[] {
        return text.replace(/[,.]/g, '').split(/\s+/).filter(Boolean);
    }

    private troviDisiganIndekson(konsonantaAreto: string): number {
        switch (konsonantaAreto.length) {
            case 3: return 2; // For 3 consonants: C-CC (e.g., ek-sci)
            case 4: return 2; // For 4 consonants: CC-CC (e.g., dek-stra)
            default: return 1; // Default for 2 consonants: C-C
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

        for (const char of vortoText) {
            if (this.estasVokalo(char)) {
                if (silaboj.length > 0 && nunaK.length > 0) {
                    nunaK = this.prilaboriIntervokalojn(nunaK, silaboj);
                }
                silaboj.push({ k: nunaK, v: char, f: '' });
                nunaK = '';
            } else {
                nunaK += char;
            }
        }

        if (nunaK && silaboj.length > 0) {
            silaboj[silaboj.length - 1].f = nunaK;
        } else if (nunaK) {
            silaboj.push({ k: nunaK, v: '', f: '' });
        }

        return silaboj;
    }

    dividuJeSilaboj(text: string): Vorto[] {
        if (!text) {
            return [];
        }
        const vortojText = this.tekstoAlVortoj(text);
        return vortojText.map(vortoText => this.vortoAlSilaboj(vortoText));
    }

    private formatigiSilabon(s: Silabo): string {
        const k = s.k || '◦';
        if (s.f) {
            return `(${k}|${s.v}|${s.f})`;
        }
        return `(${k}|${s.v})`;
    }

    public formatigi(vortoj: Vorto[]): string {
        if (!vortoj) {
            return '';
        }

        return vortoj.map(vorto =>
            vorto.map(s => this.formatigiSilabon(s)).join('-')
        ).join(' ');
    }
}
