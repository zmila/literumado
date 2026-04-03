import { describe, it, expect } from 'vitest';
import { Prononcilo10 } from './Prononcilo10';

describe('Prononcilo.prononcuCiferon', () => {
    const prononcilo = new Prononcilo10();

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

    it('should throw an error for unknown input', () => {
        expect(() => prononcilo.prononcuCiferon('A')).toThrowError('Nekonata cifero: A');
        expect(() => prononcilo.prononcuCiferon('')).toThrowError('Nekonata cifero: ');
        expect(() => prononcilo.prononcuCiferon('10')).toThrowError('Nekonata cifero: 10');
    });
});

describe('Prononcilo.prononcuCiferojn', () => {
    const konvertilo = new Prononcilo10();

    it('returns empty array for empty input', () => {
        expect(konvertilo.prononcuCiferojn("")).toEqual([]);
    });

    it('returns correct array for single digit inputs', () => {
        expect(konvertilo.prononcuCiferojn("0")).toEqual(["nulo"]);
        expect(konvertilo.prononcuCiferojn("1")).toEqual(["unu"]);
    });

    it('returns correct array for multiple digit inputs', () => {
        expect(konvertilo.prononcuCiferojn("987654321"))
            .toEqual(["naŭ", "ok", "sep", "ses", "kvin", "kvar", "tri", "du", "unu"]);
    });

    it('throws error for unknown digit', () => {
        expect(() => konvertilo.prononcuCiferojn("A")).toThrowError("Nekonata cifero: A");
        expect(() => konvertilo.prononcuCiferojn("1X")).toThrowError("Nekonata cifero: X");
    });
});

describe('Prononcilo.prononcuKapon', () => {
    const prononcilo = new Prononcilo10();

    it('returns empty string if cifero is "nulo"', () => {
        expect(prononcilo.prononcuKapon("nulo", "bazo")).toBe("");
    });

    it('returns empty string if cifero is empty', () => {
        expect(prononcilo.prononcuKapon("", "bazo")).toBe("");
    });

    it('returns bazo if cifero is "unu"', () => {
        expect(prononcilo.prononcuKapon("unu", "bazo")).toBe("bazo");
    });

    it('joins only for "dek" and "cent", otherwise separates with a space', () => {
        expect(prononcilo.prononcuKapon("du", "dek")).toBe("dudek");
        expect(prononcilo.prononcuKapon("tri", "cent")).toBe("tricent");
        expect(prononcilo.prononcuKapon("kvar", "mil")).toBe("kvar mil");
        expect(prononcilo.prononcuKapon("sep", "bazo")).toBe("sep bazo");
    });
});

describe('Prononcilo.gluu', () => {
    const prononcilo = new Prononcilo10();

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
        expect(prononcilo.gluu("kvardek", "nulo")).toBe("kvardek");
    });

    it('returns kapo and vosto concatenated with a space if both are non-empty', () => {
        expect(prononcilo.gluu("dudek", "unu")).toBe("dudek unu");
        expect(prononcilo.gluu("sescent", "kvin")).toBe("sescent kvin");
        expect(prononcilo.gluu("sep mil", "ok")).toBe("sep mil ok");
    });

    it('returns empty string if both kapo and vosto are empty', () => {
        expect(prononcilo.gluu("", "")).toBe("");
    });
});

describe('Prononcilo.prononcuDD', () => {
    const prononcilo = new Prononcilo10();
    it('throws error for array length not equal to 2', () => {
        expect(() => prononcilo.prononcuDD([])).toThrowError("Malbona parametro por prononcuDD: ");
        expect(() => prononcilo.prononcuDD(["unu"])).toThrowError("Malbona parametro por prononcuDD: unu");
        expect(() => prononcilo.prononcuDD(["unu", "du", "tri"])).toThrowError("Malbona parametro por prononcuDD: unu,du,tri");
        expect(() => prononcilo.prononcuDD(["nulo", "unu", "du", "tri"])).toThrowError("Malbona parametro por prononcuDD: nulo,unu,du,tri");
    });
    it('returns correct string for array of length 2', () => {
        expect(prononcilo.prononcuDD(["du", "unu"])).toBe("dudek unu");
        expect(prononcilo.prononcuDD(["unu", "kvin"])).toBe("dek kvin");
        expect(prononcilo.prononcuDD(["kvar", "sep"])).toBe("kvardek sep");
        expect(prononcilo.prononcuDD(["nulo", "tri"])).toBe("tri");
        expect(prononcilo.prononcuDD(["", "ok"])).toBe("ok");
        expect(prononcilo.prononcuDD(["unu", "nulo"])).toBe("dek");
        expect(prononcilo.prononcuDD(["kvin", "nulo"])).toBe("kvindek");
    });
});

describe('Prononcilo.prononcuDDD', () => {
    const prononcilo = new Prononcilo10();

    it('throws error if array length is not 3', () => {
        expect(() => prononcilo.prononcuDDD([])).toThrowError("Malbona parametro por prononcuDDD: ");
        expect(() => prononcilo.prononcuDDD(["unu"])).toThrowError("Malbona parametro por prononcuDDD: unu");
        expect(() => prononcilo.prononcuDDD(["unu", "du"])).toThrowError("Malbona parametro por prononcuDDD: unu,du");
        expect(() => prononcilo.prononcuDDD(["unu", "du", "tri", "kvar"])).toThrowError("Malbona parametro por prononcuDDD: unu,du,tri,kvar");
    });

    it('returns correct string for three digits ', () => {
        expect(prononcilo.prononcuDDD(["nulo", "nulo", "nulo"])).toBe("nulo");
        expect(prononcilo.prononcuDDD(["nulo", "nulo", "unu"])).toBe("unu");
        expect(prononcilo.prononcuDDD(["nulo", "nulo", "naŭ"])).toBe("naŭ");
        expect(prononcilo.prononcuDDD(["nulo", "unu", "nulo"])).toBe("dek");
        expect(prononcilo.prononcuDDD(["nulo", "du", "nulo"])).toBe("dudek");
        expect(prononcilo.prononcuDDD(["nulo", "du", "unu"])).toBe("dudek unu");
        expect(prononcilo.prononcuDDD(["nulo", "du", "naŭ"])).toBe("dudek naŭ");
        expect(prononcilo.prononcuDDD(["unu", "nulo", "nulo"])).toBe("cent");
        expect(prononcilo.prononcuDDD(["tri", "nulo", "nulo"])).toBe("tricent");
        expect(prononcilo.prononcuDDD(["kvar", "nulo", "kvar"])).toBe("kvarcent kvar");
        expect(prononcilo.prononcuDDD(["kvar", "kvin", "nulo"])).toBe("kvarcent kvindek");
        expect(prononcilo.prononcuDDD(["ses", "sep", "ok"])).toBe("sescent sepdek ok");
    });
});


describe('Prononcilo.prononcu3', () => {
    const prononcilo = new Prononcilo10();

    it('returns empty string for empty array', () => {
        expect(prononcilo.prononcu3([])).toBe("");
    });

    it('returns correct pronunciation for single digit array', () => {
        expect(prononcilo.prononcu3(['nulo'])).toBe('nulo');
        expect(prononcilo.prononcu3(['unu'])).toBe('unu');
        expect(prononcilo.prononcu3(['dek'])).toBe('dek');
    });

    it('returns correct pronunciation for two digit array', () => {
        expect(prononcilo.prononcu3(['nulo', 'unu'])).toBe('unu');
        expect(prononcilo.prononcu3(['nulo', 'nulo'])).toBe('nulo');
        expect(prononcilo.prononcu3(['du', 'unu'])).toBe('dudek unu');
    });

    it('returns correct pronunciation for three digit array', () => {
        expect(prononcilo.prononcu3(['nulo', 'nulo', 'nulo'])).toBe('nulo');
        expect(prononcilo.prononcu3(['nulo', 'nulo', 'unu'])).toBe('unu');
        expect(prononcilo.prononcu3(['nulo', 'unu', 'nulo'])).toBe('dek');
        expect(prononcilo.prononcu3(['unu', 'unu', 'unu'])).toBe('cent dek unu');
    });

    it('throws error for input array longer than 3', () => {
        expect(() => prononcilo.prononcu3(['unu', 'du', 'tri', 'kvar'])).toThrowError("Malbona longo de dekuma: unu,du,tri,kvar");
        expect(() => prononcilo.prononcu3(['nulo', 'nulo', 'nulo', 'nulo'])).toThrowError("Malbona longo de dekuma: nulo,nulo,nulo,nulo");
    });
});

describe('Prononcilo.prononcuNombron', () => {
    const prononcilo = new Prononcilo10();

    it('returns empty string for empty input', () => {
        expect(prononcilo.prononcuNombron("")).toBe("");
    });

    it('returns correct pronunciation for 1,2,3 digits', () => {
        expect(prononcilo.prononcuNombron("0")).toBe("nulo");
        expect(prononcilo.prononcuNombron("21")).toBe("dudek unu");
        expect(prononcilo.prononcuNombron("30")).toBe("tridek");
        expect(prononcilo.prononcuNombron("123")).toBe("cent dudek tri");
        expect(prononcilo.prononcuNombron("200")).toBe("ducent");
    });

    it('returns correct pronunciation for four to six digits', () => {
        expect(prononcilo.prononcuNombron("1000")).toBe("mil");
        expect(prononcilo.prononcuNombron("1234")).toBe("mil ducent tridek kvar");
        expect(prononcilo.prononcuNombron("0001")).toBe("unu");
        expect(prononcilo.prononcuNombron("2001")).toBe("du mil unu");
        expect(prononcilo.prononcuNombron("7000")).toBe("sep mil");
        expect(prononcilo.prononcuNombron("30002")).toBe("tridek mil du");
        expect(prononcilo.prononcuNombron("400003")).toBe("kvarcent mil tri");
        expect(prononcilo.prononcuNombron("987654")).toBe("naŭcent okdek sep mil sescent kvindek kvar");
    });

    it('throws error for input longer than 6 digits', () => {
        expect(() => prononcilo.prononcuNombron("1234567")).toThrowError("Malbona longo de dekuma: 1234567");
        expect(() => prononcilo.prononcuNombron("0000000")).toThrowError("Malbona longo de dekuma: 0000000");
    });

    it('throws error for unknown digit', () => {
        expect(() => prononcilo.prononcuNombron("1X")).toThrowError("Nekonata cifero: X");
        expect(() => prononcilo.prononcuNombron("G123")).toThrowError("Nekonata cifero: G");
    });

    it('returns correct pronunciation for negative numbers', () => {
        expect(prononcilo.prononcuNombron("-5")).toBe("minus kvin");
        expect(prononcilo.prononcuNombron("-21")).toBe("minus dudek unu");
        expect(prononcilo.prononcuNombron("-123")).toBe("minus cent dudek tri");
        expect(prononcilo.prononcuNombron("-1000")).toBe("minus mil");
        expect(prononcilo.prononcuNombron("-987654")).toBe("minus naŭcent okdek sep mil sescent kvindek kvar");
    });
});

