export default class LangUtils {
    static text2hex(text: string, char2code: { [key: string]: string }): string {
        let hex = "";
        if (!text.length) {
            return hex;
        }

        const upper = text.toLocaleUpperCase("eo");
        for (let i = 0; i < upper.length; i++) {
            const ch = upper.charAt(i);
            if (char2code[ch]) {
                hex = hex + char2code[ch];
            } else if (LangUtils.punctuation[ch]) {
                hex = hex + LangUtils.punctuation[ch];
            }
            // TODO add encoding of numbers
        }
        return hex;
    }

    static punctuation: { [key: string]: string } = {
        '.': '*',
        ' ': '_',
        '^': '^',
        ':': '**',
        ',': '*/',
        '?': '*\\',
        '!': '*1',
        '•': '*0',
        '\'': '*4',
        '-': '*6',
        ';': '*7',
        '(': '*5',
        ')': '*8',
        '`': '*9',
        '"': '*2',
        '&': '\\9'
    };

    static char2code = {
        A: "3",
        B: "\\2",
        C: "/3",
        D: "/1",
        E: "1",
        F: "/7",
        G: "/8",
        H: "8",
        I: "5",
        J: "\\5",
        K: "\\4",
        L: "/2",
        M: "/5",
        N: "6",
        O: "4",
        P: "\\1",
        Q: "\\7",
        R: "9",
        S: "7",
        T: "2",
        U: "/4",
        V: "\\3",
        W: "/6",
        X: "\\6",
        Y: "/9",
        Z: "\\8",
    };

    static charEo2code = {
        A: "1",
        Ŝ: "/1",
        Ĵ: "\\1",

        I: "2",
        C: "/2",
        Ĉ: "\\2",

        E: "3",
        P: "/3",
        H: "\\3",

        O: "4",
        Ŭ: "/4",
        B: "\\4",

        N: "5",
        Z: "/5",
        D: "\\5",

        L: "6",
        F: "/6",
        J: "\\6",

        R: "7",
        Ĝ: "/7",
        U: "\\7",

        S: "8",
        K: "/8",
        G: "\\8",

        T: "9",
        V: "/9",
        M: "\\9",

        Ĥ: "\\\\1",
    };

}