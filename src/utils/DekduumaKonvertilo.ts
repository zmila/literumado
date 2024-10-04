export class DekduumaKonvertilo {

    alDekduuma(dekuma: number): string {
        const d12 = [];
        let d = dekuma
        while (d > 0) {
            const rem = d % 12;
            d12.unshift(rem == 10 ? 'A' : rem == 11 ? 'B' : rem);
            d = Math.floor(d / 12);
        }
        return d12.join("");
    }

    alDekuma(dekduuma: string): number {

        let dek = 0;
        for (const char of dekduuma.toUpperCase()) {
            const d = char == 'A' ? 10 : char == 'B' ? 11 : Number.parseInt(char);
            dek = dek * 12 + d;
        }

        return dek;
    }

    alKaktovika(dekduuma: string): string {
        const out = [];
        for (const char of dekduuma.toUpperCase()) {
            const kakto = dekdu2kaktovika.get(char)
            out.push(kakto ? kakto : char);
        }

        return out.join('');
    }

    elKaktovika(kaktovika: string): string {
        const out = [];
        for (const char of kaktovika) {
            const d12 = kaktovika2dekdu.get(char)
            out.push(d12 ? d12 : char);
        }

        return out.join('');
    }

    montruDaton(d: Date): string {
        const year = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const doy = this.dayOfYear(d);
        const dec = `${year}-${mm}-${day} (${doy})`;

        return dec;
    }

    montruDaton12(d: Date): string {

        const year12 = this.alDekduuma(d.getFullYear());
        const mm12 = this.alDekduuma(d.getMonth() + 1).padStart(2, '0');
        const day12 = this.alDekduuma(d.getDate()).padStart(2, '0');
        const doy = this.dayOfYear(d);
        const doy12 = this.alDekduuma(doy);
        const kakto = `${year12}-${mm12}-${day12} (${doy12})`;

        return kakto;
    }

    dayOfYear(date: Date): number {
        const start = new Date(date.getFullYear(), 0, 0); //start of the year
        const diff = date.getTime() - start.getTime(); // difference in milliseconds
        const oneDay = 1000 * 60 * 60 * 24; // number of milliseconds in a day
        return Math.floor(diff / oneDay); // difference in days
    }

}

// kaktovikaj ciferoj
const dekdu2kaktovika: Map<string, string> = new Map([
    ['0', "\u{1d2c0}"], // 𝋀
    ['1', "\u{1d2c1}"], // 𝋁 
    ['2', "\u{1d2c2}"], // 𝋂
    ['3', "\u{1d2c3}"], // 𝋃
    ['4', "\u{1d2c5}"], // 𝋅 la origina "5" uzata kiel "4" por 12uma
    ['5', "\u{1d2c6}"], // 𝋆 same, movo je -1
    ['6', "\u{1d2c7}"], // 𝋇 same, movo je -1
    ['7', "\u{1d2c8}"], // 𝋈 same, movo je -1
    ['8', "\u{1d2ca}"], // 𝋊 la origina "10" uzata kiel "8" por 12uma
    ['9', "\u{1d2cb}"], // 𝋋 same, movo je -2
    ['A', "\u{1d2cc}"], // 𝋌 same, movo je -2
    ['B', "\u{1d2cd}"], // 𝋍 same, movo je -2
])

const kaktovika2dekdu: Map<string, string> = new Map();
dekdu2kaktovika.forEach((value, key) => {
    kaktovika2dekdu.set(value, key);
});
