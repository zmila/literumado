import { describe, it, expect } from 'vitest';
import { Prononcilo12 } from './Prononcilo12';

describe('Prononcilo12.prononcuCiferon', () => {
    const prononcilo = new Prononcilo12();

    it('should return correct pronunciation for digits 0-9', () => {
        expect(prononcilo.prononcuCiferon('0')).toBe('nulo');
        expect(prononcilo.prononcuCiferon('1')).toBe('unu');
        expect(prononcilo.prononcuCiferon('2')).toBe('du');
        expect(prononcilo.prononcuCiferon('3')).toBe('tri');
        expect(prononcilo.prononcuCiferon('4')).toBe('kvar');
        expect(prononcilo.prononcuCiferon('5')).toBe('kvin');
        expect(prononcilo.prononcuCiferon('6')).toBe('ses');
        expect(prononcilo.prononcuCiferon('7')).toBe('sep');
        expect(prononcilo.prononcuCiferon('8')).toBe('ok');
        expect(prononcilo.prononcuCiferon('9')).toBe('naŭ');
    });

    it('should return correct pronunciation for A and B', () => {
        expect(prononcilo.prononcuCiferon('A')).toBe('dek');
        expect(prononcilo.prononcuCiferon('B')).toBe('elv');
    });

    it('should throw an error for unknown input', () => {
        expect(() => prononcilo.prononcuCiferon('C')).toThrowError('Nekonata cifero: C');
        expect(() => prononcilo.prononcuCiferon('')).toThrowError('Nekonata cifero: ');
        expect(() => prononcilo.prononcuCiferon('10')).toThrowError('Nekonata cifero: 10');
        expect(() => prononcilo.prononcuCiferon('100')).toThrowError('Nekonata cifero: 100');
    });
});

describe('Prononcilo12.prononcuCiferojn', () => {
    const konvertilo = new Prononcilo12();

    it('returns empty array for empty input', () => {
        expect(konvertilo.prononcuCiferojn("")).toEqual([]);
    });

    it('returns correct array for single digit inputs', () => {
        expect(konvertilo.prononcuCiferojn("0")).toEqual(["nulo"]);
        expect(konvertilo.prononcuCiferojn("1")).toEqual(["unu"]);
    });

    it('returns correct array for multiple digit inputs', () => {
        expect(konvertilo.prononcuCiferojn("BA987654321"))
            .toEqual(["elv", "dek", "naŭ", "ok", "sep", "ses", "kvin", "kvar", "tri", "du", "unu"]);
    });

    it('throws error for unknown digit', () => {
        expect(() => konvertilo.prononcuCiferojn("G")).toThrowError("Nekonata cifero: G");
        expect(() => konvertilo.prononcuCiferojn("1X")).toThrowError("Nekonata cifero: X");
    });
});

describe('Prononcilo12.prononcuKapon', () => {
    const prononcilo = new Prononcilo12();

    it('returns empty string if cifero is "nulo"', () => {
        expect(prononcilo.prononcuKapon("nulo", "bazo")).toBe("");
    });

    it('returns empty string if cifero is empty', () => {
        expect(prononcilo.prononcuKapon("", "bazo")).toBe("");
    });

    it('returns bazo if cifero is "unu"', () => {
        expect(prononcilo.prononcuKapon("unu", "bazo")).toBe("bazo");
    });

    it('returns cifero concatenated with bazo for other values', () => {
        expect(prononcilo.prononcuKapon("du", "tuz")).toBe("dutuz");
        expect(prononcilo.prononcuKapon("dek", "groc")).toBe("dekgroc");
        expect(prononcilo.prononcuKapon("elv", "mas")).toBe("elvmas");
    });
});

describe('Prononcilo12.gluu', () => {
    const prononcilo = new Prononcilo12();

    it('returns vosto if kapo is empty', () => {
        expect(prononcilo.gluu("", "unu")).toBe("unu");
    });

    it('returns kapo if vosto is empty', () => {
        expect(prononcilo.gluu("du", "")).toBe("du");
    });

    it('returns vosto if kapo is 0', () => {
        expect(prononcilo.gluu("nulo", "tri")).toBe("tri");
    });

    it('returns kapo if vosto is 0', () => {
        expect(prononcilo.gluu("kvartuz", "nulo")).toBe("kvartuz");
    });

    it('returns kapo and vosto concatenated with a space if both are non-empty', () => {
        expect(prononcilo.gluu("dutuz", "unu")).toBe("dutuz unu");
        expect(prononcilo.gluu("sesgroc", "kvin")).toBe("sesgroc kvin");
        expect(prononcilo.gluu("sepmas", "ok")).toBe("sepmas ok");
    });

    it('returns empty string if both kapo and vosto are empty', () => {
        expect(prononcilo.gluu("", "")).toBe("");
    });
});

describe('Prononcilo12.prononcuDD', () => {
    const prononcilo = new Prononcilo12();
    it('throws error for array length not equal to 2', () => {
        expect(() => prononcilo.prononcuDD([])).toThrowError("Malbona parametro por prononcuDD: ");
        expect(() => prononcilo.prononcuDD(["unu"])).toThrowError("Malbona parametro por prononcuDD: unu");
        expect(() => prononcilo.prononcuDD(["unu", "du", "tri"])).toThrowError("Malbona parametro por prononcuDD: unu,du,tri");
        expect(() => prononcilo.prononcuDD(["nulo", "unu", "du", "tri"])).toThrowError("Malbona parametro por prononcuDD: nulo,unu,du,tri");
    });
    it('returns correct string for array of length 2', () => {
        expect(prononcilo.prononcuDD(["du", "unu"])).toBe("dutuz unu");
        expect(prononcilo.prononcuDD(["unu", "kvin"])).toBe("tuz kvin");
        expect(prononcilo.prononcuDD(["kvar", "sep"])).toBe("kvartuz sep");
        expect(prononcilo.prononcuDD(["nulo", "tri"])).toBe("tri");
        expect(prononcilo.prononcuDD(["", "ok"])).toBe("ok");
        expect(prononcilo.prononcuDD(["unu", "nulo"])).toBe("tuz");
        expect(prononcilo.prononcuDD(["kvin", "nulo"])).toBe("kvintuz");
    });
});

describe('Prononcilo12.prononcuDDD', () => {
    const prononcilo = new Prononcilo12();

    it('throws error if array length is not 3', () => {
        expect(() => prononcilo.prononcuDDD([])).toThrowError("Malbona parametro por prononcuDDD: ");
        expect(() => prononcilo.prononcuDDD(["unu"])).toThrowError("Malbona parametro por prononcuDDD: unu");
        expect(() => prononcilo.prononcuDDD(["unu", "du"])).toThrowError("Malbona parametro por prononcuDDD: unu,du");
        expect(() => prononcilo.prononcuDDD(["unu", "du", "tri", "kvar"])).toThrowError("Malbona parametro por prononcuDDD: unu,du,tri,kvar");
    });

    it('returns correct string for three digits ', () => {
        expect(prononcilo.prononcuDDD(["nulo", "nulo", "nulo"])).toBe("nulo");
        expect(prononcilo.prononcuDDD(["nulo", "nulo", "unu"])).toBe("unu");
        expect(prononcilo.prononcuDDD(["nulo", "nulo", "dek"])).toBe("dek");
        expect(prononcilo.prononcuDDD(["nulo", "unu", "nulo"])).toBe("tuz");
        expect(prononcilo.prononcuDDD(["nulo", "du", "nulo"])).toBe("dutuz");
        expect(prononcilo.prononcuDDD(["nulo", "du", "unu"])).toBe("dutuz unu");
        expect(prononcilo.prononcuDDD(["nulo", "du", "elv"])).toBe("dutuz elv");
        expect(prononcilo.prononcuDDD(["unu", "nulo", "nulo"])).toBe("groc");
        expect(prononcilo.prononcuDDD(["tri", "nulo", "nulo"])).toBe("trigroc");
        expect(prononcilo.prononcuDDD(["kvar", "nulo", "kvar"])).toBe("kvargroc kvar");
        expect(prononcilo.prononcuDDD(["kvar", "kvin", "nulo"])).toBe("kvargroc kvintuz");
        expect(prononcilo.prononcuDDD(["ses", "sep", "ok"])).toBe("sesgroc septuz ok");
    });
});


describe('Prononcilo12.prononcu3', () => {
    const prononcilo = new Prononcilo12();

    it('returns empty string for empty array', () => {
        expect(prononcilo.prononcu3([])).toBe("");
    });

    it('returns correct pronunciation for single digit array', () => {
        expect(prononcilo.prononcu3(['nulo'])).toBe('nulo');
        expect(prononcilo.prononcu3(['unu'])).toBe('unu');
        expect(prononcilo.prononcu3(['dek'])).toBe('dek');
        expect(prononcilo.prononcu3(['elv'])).toBe('elv');
    });

    it('returns correct pronunciation for two digit array', () => {
        expect(prononcilo.prononcu3(['nulo', 'unu'])).toBe('unu');
        expect(prononcilo.prononcu3(['nulo', 'nulo'])).toBe('nulo');
        expect(prononcilo.prononcu3(['du', 'unu'])).toBe('dutuz unu');
    });

    it('returns correct pronunciation for three digit array', () => {
        expect(prononcilo.prononcu3(['nulo', 'nulo', 'nulo'])).toBe('nulo');
        expect(prononcilo.prononcu3(['nulo', 'nulo', 'unu'])).toBe('unu');
        expect(prononcilo.prononcu3(['nulo', 'unu', 'nulo'])).toBe('tuz');
        expect(prononcilo.prononcu3(['unu', 'unu', 'unu'])).toBe('groc tuz unu');
    });

    it('throws error for input array longer than 3', () => {
        expect(() => prononcilo.prononcu3(['unu', 'du', 'tri', 'kvar'])).toThrowError("Malbona longo de dekduuma: unu,du,tri,kvar");
        expect(() => prononcilo.prononcu3(['nulo', 'nulo', 'nulo', 'nulo'])).toThrowError("Malbona longo de dekduuma: nulo,nulo,nulo,nulo");
    });
});

describe('Prononcilo12.prononcuNombron', () => {
    const prononcilo = new Prononcilo12();

    it('returns empty string for empty input', () => {
        expect(prononcilo.prononcuNombron("")).toBe("");
    });

    it('returns correct pronunciation for 1,2,3 digits', () => {
        expect(prononcilo.prononcuNombron("0")).toBe("nulo");
        expect(prononcilo.prononcuNombron("A")).toBe("dek");
        expect(prononcilo.prononcuNombron("21")).toBe("dutuz unu");
        expect(prononcilo.prononcuNombron("123")).toBe("groc dutuz tri");
    });

    it('returns correct pronunciation for four to six digits', () => {
        expect(prononcilo.prononcuNombron("1000")).toBe("mas");
        expect(prononcilo.prononcuNombron("1234")).toBe("mas dugroc trituz kvar");
        expect(prononcilo.prononcuNombron("0001")).toBe("unu");
        expect(prononcilo.prononcuNombron("2001")).toBe("du mas unu");
        expect(prononcilo.prononcuNombron("30002")).toBe("trituz mas du");
        expect(prononcilo.prononcuNombron("400003")).toBe("kvargroc mas tri");
        expect(prononcilo.prononcuNombron("BA9876")).toBe("elvgroc dektuz naŭ mas okgroc septuz ses");
    });

    it('throws error for input longer than 6 digits', () => {
        expect(() => prononcilo.prononcuNombron("1234567")).toThrowError("Malbona longo de dekduuma: 1234567");
        expect(() => prononcilo.prononcuNombron("0000000")).toThrowError("Malbona longo de dekduuma: 0000000");
    });

    it('throws error for unknown digit', () => {
        expect(() => prononcilo.prononcuNombron("1X")).toThrowError("Nekonata cifero: X");
        expect(() => prononcilo.prononcuNombron("G123")).toThrowError("Nekonata cifero: G");
    });

    it('returns correct pronunciation for negative numbers', () => {
        expect(prononcilo.prononcuNombron("-5")).toBe("minus kvin");
        expect(prononcilo.prononcuNombron("-A")).toBe("minus dek");
        expect(prononcilo.prononcuNombron("-21")).toBe("minus dutuz unu");
        expect(prononcilo.prononcuNombron("-123")).toBe("minus groc dutuz tri");
        expect(prononcilo.prononcuNombron("-1000")).toBe("minus mas");
        expect(prononcilo.prononcuNombron("-BA9876")).toBe("minus elvgroc dektuz naŭ mas okgroc septuz ses");
    });
});

