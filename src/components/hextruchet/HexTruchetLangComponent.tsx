import React, { useEffect } from 'react';
import { HexMeta } from "../common/HexTypes";
import { RenderMode } from "../common/HexTypes";
import { TruchetCode } from "../common/HexTypes";
import HexTruchetGridComponent from './HexTruchetGridComponent';
import { HexTruchetSettings } from './HexTruchetSettings';
import LangUtils from './LangUtils';

interface HexTruchetLangComponentProps {
    htSettings: HexTruchetSettings;
    text: string;
}

const HexTruchetLangComponent: React.FC<HexTruchetLangComponentProps> = ({ htSettings, text }) => {

    useEffect(() => {
    }, [htSettings]);

    const { width, height } = htSettings;

    const renderHexCodes = (tCodes: (TruchetCode | typeof LangUtils.LINE_BREAK)[]): { [key: string]: TruchetCode } => {
        const result: { [key: string]: TruchetCode } = {};
        let row = 0;
        let col = 0;
        for (let c = 0; c < tCodes.length && row < height; c++) {
            const code = tCodes[c];
            if (code === LangUtils.LINE_BREAK) {
                row++;
                col = 0;
                continue;
            }
            if (col >= width) {
                row++;
                col = 0;
                if (row >= height) break;
            }
            result[key(row, col)] = code;
            col++;
        }

        return result;
    }

    const key = (row: number, col: number) => {
        return `${row}:${col}`;
    }

    let tCodes: (TruchetCode | typeof LangUtils.LINE_BREAK)[];
    switch (htSettings.language) {
        case 'esperanto':
            tCodes = LangUtils.textToTruchetCodes(text, LangUtils.charEo2code);
            break;
        case 'codes':
            tCodes = LangUtils.codeCharToTruchetCodes(text);
            break;
        case 'english':
        default:
            tCodes = LangUtils.textToTruchetCodes(text, LangUtils.char2code);
            break;
    }
    console.log(text, '->', tCodes);

    const tiles: { [key: string]: TruchetCode } = renderHexCodes(tCodes);

    const hexMeta: HexMeta = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderMode(row: number, col: number) {
            return RenderMode.Visible;
        },
        truchetCode(row: number, col: number) {
            return tiles[key(row, col)];
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        extra(row: number, col: number) {
            return null;
        }
    };

    return (
        <div>
            <HexTruchetGridComponent htSettings={htSettings} hexMeta={hexMeta} />
        </div>
    )
}

export default HexTruchetLangComponent;
