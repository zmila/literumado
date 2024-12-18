import React, { useEffect } from 'react';
import { TruchetTile } from '../common/HexTypes';
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
    const htCode = LangUtils.text2hex(text,
        htSettings.language === 'esperanto' ? LangUtils.charEo2code : LangUtils.char2code);
    //console.log(text, '->', htCode);

    const renderHexCodes = (htCode: string) => {
        const len = htCode.length;
        if (len <= 0) return [];

        let c = 0;
        const result = [];
        for (let col = 0; col < width && c < len; col++) {
            for (let row = 0; row < height && c < len; row++) {
                result.push(new TruchetTile(row, col, htCode.charAt(c)));
                c++;
            }
        }
        // if (c < len) {
        //     console.info(`rendered ${c} codes, no room to show the rest: ` + htCode.substring(c).length);
        // }

        return result;
    }

    return (
        <div style={{ border: "1px solid yellow" }}>
            <HexTruchetGridComponent htSettings={htSettings} tiles={renderHexCodes(htCode)} />
        </div>
    )
}

export default HexTruchetLangComponent;