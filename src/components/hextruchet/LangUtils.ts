import { TruchetCode } from "../common/HexMeta";

const { TStar, TSp1, TSp2, TR, TL, T0, T1, T2, T3, T4, T6, T7, T5, T8, T9 } = TruchetCode;

export default class LangUtils {

    static textToTruchetCodes(text: string, char2code: { [key: string]: TruchetCode[] }): TruchetCode[] {
        let tc: TruchetCode[] = [];
        if (!text.length) {
            return tc;
        }

        const upper = text.toLocaleUpperCase("eo");
        for (let i = 0; i < upper.length; i++) {
            const ch = upper.charAt(i);
            if (char2code[ch]) {
                tc = [...tc, ...char2code[ch]];
            } else if (LangUtils.punctuation[ch]) {
                tc = [...tc, ...LangUtils.punctuation[ch]];
            } else if (ch == '\\') {
                tc.push(TL);
            } else if (ch == '/') {
                tc.push(TR);
            } else if (ch == '0') {
                tc.push(T0);
            }
        }
        return tc;
    }

    static punctuation: { [key: string]: TruchetCode[] } = {
        '.': [TStar],
        ' ': [TSp1],
        '^': [TSp2],
        ':': [TStar, TStar],
        ',': [TStar, TR],
        '?': [TStar, TL],
        '!': [TStar, T1],
        '•': [TStar, T0],
        '\'': [TStar, T4],
        '-': [TStar, T6],
        ';': [TStar, T7],
        '(': [TStar, T5],
        ')': [TStar, T8],
        '`': [TStar, T9],
        '"': [TStar, T2],
        '&': [TL, T9],
    };

    static char2code: { [key: string]: TruchetCode[] } = {
        A: [T3],
        B: [TL, T2],
        C: [TR, T3],
        D: [TR, T1],
        E: [T1],
        F: [TR, T7],
        G: [TR, T8],
        H: [T8],
        I: [T5],
        J: [TL, T5],
        K: [TL, T4],
        L: [TR, T2],
        M: [TR, T5],
        N: [T6],
        O: [T4],
        P: [TL, T1],
        Q: [TL, T7],
        R: [T9],
        S: [T7],
        T: [T2],
        U: [TR, T4],
        V: [TL, T3],
        W: [TR, T6],
        X: [TL, T6],
        Y: [TR, T9],
        Z: [TL, T8],
    };

    static charEo2code: { [key: string]: TruchetCode[] } = {
        A: [T1],
        Ŝ: [TR, T1],
        Ĵ: [TL, T1],

        I: [T2],
        C: [TR, T2],
        Ĉ: [TL, T2],

        E: [T3],
        P: [TR, T3],
        H: [TL, T3],

        O: [T4],
        Ŭ: [TR, T4],
        B: [TL, T4],

        N: [T5],
        Z: [TR, T5],
        D: [TL, T5],

        L: [T6],
        F: [TR, T6],
        J: [TL, T6],

        R: [T7],
        Ĝ: [TR, T7],
        U: [TL, T7],

        S: [T8],
        K: [TR, T8],
        G: [TL, T8],

        T: [T9],
        V: [TR, T9],
        M: [TL, T9],

        Ĥ: [TL, TL, T1],
    };

}