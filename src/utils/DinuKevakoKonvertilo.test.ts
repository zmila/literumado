import { describe, it, expect } from 'vitest';
import { DinuKevakoKonvertilo, Vorto } from './DinuKevakoKonvertilo';

describe('DinuKevakoKonvertilo', () => {
    const konvertilo = new DinuKevakoKonvertilo();

    describe('dividuJeSilaboj', () => {
        it('should split text into words by whitespace', () => {
            const result = konvertilo.dividuJeSilaboj('vorto unu vorto du');
            expect(result).toHaveLength(4);
        });

        it('should handle multiple spaces and trim whitespace', () => {
            const result = konvertilo.dividuJeSilaboj('  vorto1   vorto2  ');
            expect(result).toHaveLength(2);
        });

        it('should remove punctuation like commas and dots', () => {
            const result = konvertilo.dividuJeSilaboj('vorto1, vorto2.');
            expect(result).toHaveLength(2);
            // We can also check the content if needed
            const pretty = konvertilo.formatigi(result);
            expect(pretty).not.toContain(',');
            expect(pretty).not.toContain('.');
        });

        it('should return an empty array for empty or whitespace-only input', () => {
            expect(konvertilo.dividuJeSilaboj('')).toEqual([]);
            expect(konvertilo.dividuJeSilaboj('   ')).toEqual([]);
        });
    });

    describe('vortoAlSilaboj (private)', () => {
        // Accessing private method for testing purposes as requested
        const vortoAlSilaboj = (text: string): Vorto => {
            // @ts-ignore
            return konvertilo.vortoAlSilaboj(text);
        };

        const testCases = [
            { input: 'a', expected: '(◦|a)' }, // V
            { input: 'ne', expected: '(n|e)' }, // CV
            { input: 'aŭ', expected: '(◦|a|ŭ)' }, // VC
            { input: 'kaj', expected: '(k|a|j)' }, // CVC
            { input: 'pra', expected: '(pr|a)' }, // CCV
            { input: 'ajn', expected: '(◦|a|jn)' }, // VCC
            { input: 'start', expected: '(st|a|rt)' }, // CCVCC

            { input: 'iu', expected: '(◦|i)-(◦|u)' }, // V-V
            { input: 'ame', expected: '(◦|a)-(m|e)' }, // V-CV
            { input: 'kie', expected: '(k|i)-(◦|e)' }, // CV-V
            { input: 'dato', expected: '(d|a)-(t|o)' }, // CV-CV
            { input: 'parto', expected: '(p|a|r)-(t|o)' }, // CVC-CV
            { input: 'frato', expected: '(fr|a)-(t|o)' }, // CCV-CV
            { input: 'starto', expected: '(st|a|r)-(t|o)' }, // CCVC-CV
            { input: 'eksci', expected: '(◦|e|k)-(sc|i)' }, // VC-CCV
            { input: 'dekstra', expected: '(d|e|ks)-(tr|a)' }, // CVCC-CCV
            { input: 'adiaŭas', expected: '(◦|a)-(d|i)-(◦|a|ŭ)-(◦|a|s)' }, // V-CV-V̆-VC
        ];

        testCases.forEach(({ input, expected }) => {
            it(`should correctly syllabify "${input}"`, () => {
                const result = vortoAlSilaboj(input);
                expect(konvertilo.formatigi([result])).toEqual(expected);
            });
        });
    });

    describe('formatigi', () => {
        it('should separate multiple words with a space', () => {
            const vortoj: Vorto[] = [
                [{ k: 'v', v: 'o', f: 'r' }, { k: 't', v: 'o', f: '' }],
                [{ k: 'd', v: 'u', f: '' }]
            ];
            const expected = '(v|o|r)-(t|o) (d|u)';
            expect(konvertilo.formatigi(vortoj)).toEqual(expected);
        });

        it('should separate syllables within a word with a dash', () => {
            const vorto: Vorto[] = [[{ k: 'p', v: 'a', f: 'r' }, { k: 't', v: 'o', f: '' }]];
            const expected = '(p|a|r)-(t|o)';
            expect(konvertilo.formatigi(vorto)).toEqual(expected);
        });

        const syllableTestCases = [
            { name: 'V', input: [[{ k: '', v: 'a', f: '' }]], expected: '(◦|a)' },
            { name: 'CV', input: [[{ k: 'n', v: 'e', f: '' }]], expected: '(n|e)' },
            { name: 'VC', input: [[{ k: '', v: 'a', f: 'ŭ' }]], expected: '(◦|a|ŭ)' },
            { name: 'CVC', input: [[{ k: 'k', v: 'a', f: 'j' }]], expected: '(k|a|j)' },
            { name: 'CCV', input: [[{ k: 'pr', v: 'a', f: '' }]], expected: '(pr|a)' },
            { name: 'VCC', input: [[{ k: '', v: 'a', f: 'jn' }]], expected: '(◦|a|jn)' },
            { name: 'CCVCC', input: [[{ k: 'st', v: 'a', f: 'rt' }]], expected: '(st|a|rt)' },
        ];

        syllableTestCases.forEach(({ name, input, expected }) => {
            it(`should correctly render a single ${name} syllable`, () => {
                expect(konvertilo.formatigi(input)).toEqual(expected);
            });
        });
    });
});
