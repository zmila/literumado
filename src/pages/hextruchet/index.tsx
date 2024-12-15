import HexTruchetSettingsComponent from '@/components/hextruchet/HexTruchetSettingsComponent';
import HexTruchetGridComponent from '@/components/hextruchet/HexTruchetGridComponent';
import { HexTruchetSettings } from '@/types/HexTruchetSettings';
import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';


const HexTruchetComponent: React.FC = () => {

    const [lang, setLang] = useState("");
    useEffect(() => {
        if (!lang) {
            setLang('english');
        } else {
            localStorage.setItem('lang', lang);
        }
    }, [lang]);

    const [hexTruchetSettings, setHexTruchetSettings] = useState<HexTruchetSettings>({
        showGrid: true,
        size: 30,
        height: 18,
        width: 36
    } as HexTruchetSettings);

    const handleChangeLang = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLang(event.target.value);
        if (lang == "english") {
        }
    };

    const handleSettingsChanged = (control: keyof HexTruchetSettings, value: boolean | number) => {
        setHexTruchetSettings((prevSettings) => {
            return { ...prevSettings, [control]: value };
        });
    }

    return (
        <Layout>
            <div className="flex mb-4">
                <label className="mr-8">
                    <input
                        type="radio" radioGroup='lang' className="mr-4"
                        value="esperanto"
                        checked={lang === 'esperanto'}
                        onChange={handleChangeLang}
                    />
                    Esperanto
                </label>
                <label>
                    <input
                        type="radio" radioGroup='lang' className="mr-4"
                        value="english"
                        checked={lang === 'english'}
                        onChange={handleChangeLang}
                    />
                    English
                </label>
            </div>
            {lang == "english" && <p className="text-lg mb-6">Encoding of the English alphabet using <a href="hextruchet/about_en.html">Hexagonal Truchet tiling</a></p>}
            {lang == "esperanto" && <p className="text-lg mb-6">Kodigado de la Esperanta alfabeto uzante <a href="hextruchet/about_eo.html">Seslateran Truchet-kahelaron</a></p>}

            <HexTruchetSettingsComponent htSettings={hexTruchetSettings} onChanged={handleSettingsChanged} />

            <HexTruchetGridComponent htSettings={hexTruchetSettings} />

        </Layout>
    );
};

export default HexTruchetComponent;
