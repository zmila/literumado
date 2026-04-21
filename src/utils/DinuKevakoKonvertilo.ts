export type Silabo = {
    k: string;
    v: string;
    f: string;
};

export type Vorto = Silabo[];

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

        for (let i = 0; i < vortoText.length; i++) {
            const char = vortoText[i];

            if (char === '-' || char === "'") {
                this.finuSilabon(nunaK, silaboj);
                nunaK = '';
                continue;
            }

            if (this.estasVokalo(char)) {
                if (silaboj.length > 0 && nunaK.length > 0) {
                    nunaK = this.prilaboriIntervokalojn(nunaK, silaboj);
                }
                silaboj.push({k: nunaK, v: char, f: ''});
                nunaK = '';
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
            silaboj.push({k: nunaK, v: '', f: ''});
        }
    }

    dividuJeSilaboj(text: string): Vorto[] {
        if (!text) {
            return [];
        }
        const vortojText = this.tekstoAlVortoj(text.toLowerCase());
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
