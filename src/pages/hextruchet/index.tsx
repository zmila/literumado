import HexTruchetSettingsComponent from '@/components/hextruchet/HexTruchetSettingsComponent';
import HexTruchetLangComponent from '@/components/hextruchet/HexTruchetLangComponent';
import { HexTruchetSettings } from '@/components/hextruchet/HexTruchetSettings';
import React, { useState } from 'react';


const HexTruchetComponent: React.FC = () => {

    const [text, setText] = useState("");

    const [hexTruchetSettings, setHexTruchetSettings] = useState<HexTruchetSettings>({
        size: 30,
        showGrid: true,
        gridColor: 'grey',
        gridFill: 'none',
        height: 12,
        width: 28,
        language: 'english'
    } as HexTruchetSettings);

    const handleSettingsChanged = (control: keyof HexTruchetSettings, value: boolean | number | string) => {
        setHexTruchetSettings((prevSettings) => {
            return { ...prevSettings, [control]: value };
        });
    }

    return (
        <>
            <div className="text-lg">Encoding of the English alphabet using <a href="hextruchet/about_en.html">Hexagonal Truchet tiling</a>
                / Kodigado de la Esperanta alfabeto uzante <a href="hextruchet/about_eo.html">Seslateran Truchet-kahelaron</a></div>

            <HexTruchetSettingsComponent htSettings={hexTruchetSettings} onChanged={handleSettingsChanged} />
            <label style={{ display: 'flex', alignItems: 'center' }}>Text:
                <textarea className='ifText m-2' cols={80} value={text} onChange={(e) => setText(e.target.value)} />
            </label>

            <HexTruchetLangComponent htSettings={hexTruchetSettings} text={text} />
        </>
    );
};

export default HexTruchetComponent;
