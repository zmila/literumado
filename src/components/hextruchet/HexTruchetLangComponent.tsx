import React, { useEffect } from 'react';
import { HexMeta, RenderMode, TruchetCode } from '../common/HexMeta';
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

    const renderHexCodes = (tCodes: TruchetCode[]): { [key: string]: TruchetCode } => {
        const len = tCodes.length;
        if (len <= 0) return {};

        let c = 0;
        const result: { [key: string]: TruchetCode } = {};
        for (let row = 0; row < height && c < len; row++) {
            for (let col = 0; col < width && c < len; col++) {
                result[key(row, col)] = tCodes[c];
                // result.push(new TruchetTile(row, col, htCode.charAt(c)));
                c++;
            }
        }
        // if (c < len) {
        //     console.info(`rendered ${c} codes, no room to show the rest: ` + htCode.substring(c).length);
        // }

        return result;
    }

    const key = (row: number, col: number) => {
        return `${row}:${col}`;
    }

    const tCodes: TruchetCode[] = LangUtils.textToTruchetCodes(text,
        htSettings.language === 'esperanto' ? LangUtils.charEo2code : LangUtils.char2code);
    console.log(text, '->', tCodes);

    const tiles: { [key: string]: TruchetCode } = renderHexCodes(tCodes);

    const hexMeta: HexMeta = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderMode(row: number, col: number) {
            return RenderMode.Visible;
        },
        truchetCode(row: number, col: number) {
            return tiles[key(row, col)];
        }
    };

    return (
        <div>
            <HexTruchetGridComponent htSettings={htSettings} hexMeta={hexMeta} />
        </div>
    )
}

export default HexTruchetLangComponent;
