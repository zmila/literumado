import { TruchetCode } from "../common/HexTypes";

const { TStar, TUp, TDn, TR, TL, T0, T1, T2, T3, T4, T6, T7, T5, T8, T9, TEmpty } = TruchetCode;

export default class LangUtils {

    // sentinel pushed into a code stream to request a row break during rendering
    static readonly LINE_BREAK = 'LINE_BREAK' as const;

    private static codeChar2code(ch: string): TruchetCode | typeof LangUtils.LINE_BREAK | undefined {
        switch (ch) {
            case '0': return T0;
            case '1': return T1;
            case '2': return T2;
            case '3': return T3;
            case '4': return T4;
            case '5': return T5;
            case '6': return T6;
            case '7': return T7;
            case '8': return T8;
            case '9': return T9;
            case '\\': return TL;
            case '/': return TR;
            case '*': return TStar;
            case '_': return TDn;
            case '^': return TUp;
            case ' ': return TEmpty;
            case '\n': return LangUtils.LINE_BREAK;
            default: return undefined;
        }
    }

    static codeCharToTruchetCodes(text: string): (TruchetCode | typeof LangUtils.LINE_BREAK)[] {
        const tc: (TruchetCode | typeof LangUtils.LINE_BREAK)[] = [];
        for (let i = 0; i < text.length; i++) {
            const code = LangUtils.codeChar2code(text.charAt(i));
            if (code !== undefined) {
                tc.push(code);
            }
        }
        return tc;
    }

    private static fallbackChar2code(ch: string): TruchetCode | typeof LangUtils.LINE_BREAK | undefined {
        switch (ch) {
            case '\\': return TL;
            case '/': return TR;
            case '0': return T0;
            case '\n': return LangUtils.LINE_BREAK;
            default: return undefined;
        }
    }

    static textToTruchetCodes(text: string, char2code: { [key: string]: TruchetCode[] }): (TruchetCode | typeof LangUtils.LINE_BREAK)[] {
        let tc: (TruchetCode | typeof LangUtils.LINE_BREAK)[] = [];
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
            } else {
                const code = LangUtils.fallbackChar2code(ch);
                if (code !== undefined) {
                    tc.push(code);
                }
            }
        }
        return tc;
    }

    static punctuation: { [key: string]: TruchetCode[] } = {
        '.': [TStar],
        ' ': [TDn],
        '^': [TUp],
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