export class ŜavaKonvertilo {
    alŜavaPokr(text: string) {
        const lcText = text.replace(/([A-ZĈĜĤĴŜŬ])/g, `${nompunkto}$1`).toLocaleLowerCase("eo");
        const subst = lcText
            .replace(/aŭ/g, '𐑲')
            .replace(/eŭ/g, '𐑱')
            .replace(/dz/g, '𐑞')
            .replace(/j/g, '𐑰');
        return this.alŜavaStar(subst);
    }

    alŜavaStar(text: string) {
        const out = [];
        for (const char of text) {
            const ŝava = espa2ŝava.get(char);
            out.push(ŝava ? ŝava : char);
        }

        return out.join('');
    }

    alEspa(text: string) {
        const out = [];
        let convertNextToUpperCase = false;
        for (const char of text) {
            if (char === nompunkto) {
                convertNextToUpperCase = true;
                continue;
            }
            const espa = this.alEspaChar(char);
            if (convertNextToUpperCase) {
                out.push(espa ? espa.charAt(0).toLocaleUpperCase("eo") + espa.slice(1) : char);
                convertNextToUpperCase = false;
            } else {
                out.push(espa ? espa : char);
            }
        }

        return out.join('');
    }

    alEspaChar(char: string) {
        switch (char) {
            case '𐑲':
                return 'aŭ';
            case '𐑱':
                return 'eŭ';
            case '𐑞':
                return 'dz';
            case '𐑰':
                return 'j';
            default:
                return ŝava2espa.get(char);
        }
    }
}

const nompunkto = '·'; // 0xb7;

const espa2ŝava: Map<string, string> = new Map([
    ['a', '𐑨'],
    ['b', '𐑚'],
    ['c', '𐑔'],
    ['ĉ', '𐑗'],
    ['d', '𐑛'],
    ['e', '𐑧'],
    ['f', '𐑓'],
    ['g', '𐑜'],
    ['ĝ', '𐑡'],
    ['h', '𐑣'],
    ['ĥ', '𐑙'],
    ['i', '𐑦'],
    ['j', '𐑢'],
    ['ĵ', '𐑠'],
    ['k', '𐑒'],
    ['l', '𐑤'],
    ['m', '𐑫'],
    ['n', '𐑵'],
    ['o', '𐑩'],
    ['p', '𐑐'],
    ['r', '𐑮'],
    ['s', '𐑕'],
    ['ŝ', '𐑖'],
    ['t', '𐑑'],
    ['u', '𐑪'],
    ['ŭ', '𐑘'],
    ['v', '𐑝'],
    ['z', '𐑟']
]);
// ['dz', '𐑞'], ['aŭ', '𐑲'], ['eŭ', '𐑱'], ['y', '𐑰']

const ŝava2espa: Map<string, string> = new Map();
espa2ŝava.forEach((value, key) => {
    ŝava2espa.set(value, key);
});
