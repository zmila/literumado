import { describe, it, expect } from 'vitest';
import { DekduumaKonvertilo } from './DekduumaKonvertilo';

describe('DekduumaKonvertilo.alDekduuma', () => {
    const konvertilo = new DekduumaKonvertilo();

    it('converts decimal 0 to duodecimal', () => {
        expect(konvertilo.alDekduuma(0)).toBe("0");
    });

    it('converts small decimal numbers to duodecimal', () => {
        expect(konvertilo.alDekduuma(1)).toBe("1");
        expect(konvertilo.alDekduuma(10)).toBe("A");
        expect(konvertilo.alDekduuma(11)).toBe("B");
        expect(konvertilo.alDekduuma(12)).toBe("10");
    });

    it('converts larger decimal numbers to duodecimal', () => {
        expect(konvertilo.alDekduuma(144)).toBe("100");
        expect(konvertilo.alDekduuma(1728)).toBe("1000");
    });

    it('converts negative decimal numbers to duodecimal', () => {
        expect(konvertilo.alDekduuma(-1)).toBe("-1");
        expect(konvertilo.alDekduuma(-10)).toBe("-A");
        expect(konvertilo.alDekduuma(-11)).toBe("-B");
        expect(konvertilo.alDekduuma(-12)).toBe("-10");
        expect(konvertilo.alDekduuma(-144)).toBe("-100");
        expect(konvertilo.alDekduuma(-1728)).toBe("-1000");
    });
});

describe('DekduumaKonvertilo.alDekuma', () => {
    const konvertilo = new DekduumaKonvertilo();

    it('converts duodecimal 0 to decimal', () => {
        expect(konvertilo.alDekuma("0")).toBe(0);
    });

    it('converts small duodecimal numbers to decimal', () => {
        expect(konvertilo.alDekuma("1")).toBe(1);
        expect(konvertilo.alDekuma("A")).toBe(10);
        expect(konvertilo.alDekuma("B")).toBe(11);
        expect(konvertilo.alDekuma("10")).toBe(12);
    });

    it('converts larger duodecimal numbers to decimal', () => {
        expect(konvertilo.alDekuma("100")).toBe(144);
        expect(konvertilo.alDekuma("1000")).toBe(1728);
    });

    it('converts negative duodecimal numbers to decimal', () => {
        expect(konvertilo.alDekuma("-1")).toBe(-1);
        expect(konvertilo.alDekuma("-A")).toBe(-10);
        expect(konvertilo.alDekuma("-B")).toBe(-11);
        expect(konvertilo.alDekuma("-10")).toBe(-12);
        expect(konvertilo.alDekuma("-100")).toBe(-144);
        expect(konvertilo.alDekuma("-1000")).toBe(-1728);
    });

    it('handles case insensitivity', () => {
        expect(konvertilo.alDekuma("a")).toBe(10);
        expect(konvertilo.alDekuma("b")).toBe(11);
        expect(konvertilo.alDekuma("-a")).toBe(-10);
        expect(konvertilo.alDekuma("-b")).toBe(-11);
    });
});

describe('DekduumaKonvertilo.alKaktovika', () => {
    const konvertilo = new DekduumaKonvertilo();

    it('converts duodecimal to kaktovika for digits 0-9', () => {
        expect(konvertilo.alKaktovika("0")).toBe("𝋀");
        expect(konvertilo.alKaktovika("1")).toBe("𝋁");
        expect(konvertilo.alKaktovika("9")).toBe("𝋋");
    });

    it('converts duodecimal A and B to kaktovika', () => {
        expect(konvertilo.alKaktovika("A")).toBe("𝋌");
        expect(konvertilo.alKaktovika("B")).toBe("𝋍");
    });

    it('converts multi-digit duodecimal to kaktovika', () => {
        expect(konvertilo.alKaktovika("10")).toBe("𝋁𝋀");
        expect(konvertilo.alKaktovika("100")).toBe("𝋁𝋀𝋀");
    });

    it('converts negative duodecimal to kaktovika', () => {
        expect(konvertilo.alKaktovika("-1")).toBe("-𝋁");
        expect(konvertilo.alKaktovika("-A")).toBe("-𝋌");
        expect(konvertilo.alKaktovika("-10")).toBe("-𝋁𝋀");
    });

    it('handles case insensitivity', () => {
        expect(konvertilo.alKaktovika("a")).toBe("𝋌");
        expect(konvertilo.alKaktovika("b")).toBe("𝋍");
    });
});

describe('DekduumaKonvertilo.elKaktovika', () => {
    const konvertilo = new DekduumaKonvertilo();

    it('converts kaktovika to duodecimal for single digits', () => {
        expect(konvertilo.elKaktovika("𝋀")).toBe("0");
        expect(konvertilo.elKaktovika("𝋁")).toBe("1");
        expect(konvertilo.elKaktovika("𝋌")).toBe("A");
        expect(konvertilo.elKaktovika("𝋍")).toBe("B");
    });

    it('converts multi-digit kaktovika to duodecimal', () => {
        expect(konvertilo.elKaktovika("𝋁𝋀")).toBe("10");
        expect(konvertilo.elKaktovika("𝋁𝋀𝋀")).toBe("100");
    });

    it('converts negative kaktovika to duodecimal', () => {
        expect(konvertilo.elKaktovika("-𝋁")).toBe("-1");
        expect(konvertilo.elKaktovika("-𝋌")).toBe("-A");
        expect(konvertilo.elKaktovika("-𝋁𝋀")).toBe("-10");
    });
});

describe('DekduumaKonvertilo roundtrip conversions', () => {
    const konvertilo = new DekduumaKonvertilo();

    it('decimal -> duodecimal -> decimal roundtrip', () => {
        const decimals = [0, 1, 10, 11, 12, 100, 144, 1000, 1728, -1, -10, -144, -1728];
        for (const d of decimals) {
            const d12 = konvertilo.alDekduuma(d);
            const back = konvertilo.alDekuma(d12);
            expect(back).toBe(d);
        }
    });

    it('decimal -> duodecimal -> kaktovika -> duodecimal -> decimal roundtrip', () => {
        const decimals = [1, 10, 12, 144, 1728, -1, -10, -144];
        for (const d of decimals) {
            const d12 = konvertilo.alDekduuma(d);
            const kakt = konvertilo.alKaktovika(d12);
            const d12back = konvertilo.elKaktovika(kakt);
            const dback = konvertilo.alDekuma(d12back);
            expect(dback).toBe(d);
        }
    });
});
