// Ekvilibra component is a simple form that converts decimal numbers to balanced numbers.

import React, { useState, useEffect } from 'react';
import { EkvilibraKonvertilo } from '@/utils/EkvilibraKonvertilo';
import Layout from '@/components/Layout';

const EkvilibraConverter: React.FC = () => {
    const [dekuma, setDekuma] = useState('');
    const [ekvilibra, setEkvilibra] = useState('');
    const [bazo, setBazo] = useState('3');

    const [hodiaŭ, setHodiaŭ] = useState('hodiaŭ');
    const [tagoDeJaro, setTagoDeJaro] = useState('');

    const ek = new EkvilibraKonvertilo();

    const dekumaŜanĝita = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (!isValidBase(bazo) || !isValidDecInput(value)) {
            return;
        }
        const base = Number.parseInt(bazo);
        const d10 = Number.parseInt(value);
        setDekuma(String(d10));
        setEkvilibra(ek.alEkvilibra(d10, base));
    };

    const ekvilibraŜanĝita = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        if (!isValidBase(bazo) || !isValidEkvilibraInput(input)) {
            return;
        }
        const base = Number.parseInt(bazo);
        setDekuma(String(ek.alDekuma(input, base)));
        setEkvilibra(input);
    };

    const dayOfYear = (date: Date): number => {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    };

    const isValidBase = (base: string) => {
        const b = Number.parseInt(base);
        return b % 2 === 1 && b >= 3 && b <= 99;
    };
    const isValidDecInput = (value: string) => {
        if (!value.trim()) {
            setDekuma('');
            setEkvilibra('');
            return false;
        }
        if (!/^-?\d+$/.test(value.trim())) {
            setDekuma(value);
            setEkvilibra('');
            return false;
        }
        return true;
    };

    const isValidEkvilibraInput = (input: string) => {
        if (!input.trim()) {
            setDekuma('');
            setEkvilibra('');
            return false;
        }
        const maxDigit = Math.floor(Number.parseInt(bazo) / 2);
        const digits = input.trim().split(/\s+/);
        for (const digit of digits) {
            if (!/^-?\d+$/.test(digit)) {
                setDekuma('');
                setEkvilibra(input);
                console.error('ekvilibra: %s ne valida cifero', digit);
                return false;
            }
            const n = Number.parseInt(digit, 10);
            if (Math.abs(n) > maxDigit) {
                setDekuma('');
                setEkvilibra(input);
                console.error('ekvilibra: cifero %d estas pli granda ol maksimuma %d por bazo %d', n, maxDigit, bazo);
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
        if (!isValidBase(bazo)) {
            return;
        }

        const base = Number.parseInt(bazo);
        const d = new Date();
        const year = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const doy = dayOfYear(d);
        setHodiaŭ(`${year}-${mm}-${day}`);
        setTagoDeJaro(`${doy} = [${ek.alEkvilibra(doy, base)}]`);
    }, [bazo]);

    return (
        <Layout>
            <div className="text-column">
                <h1 className="text-4xl font-bold mb-4">Konvertilo inter la dekuma kaj ekvilibra nombrosistemoj</h1>
                <p className="text-lg mb-6">
                    Ekvilibra nombrosistemo estas pozicia nombrosistemo, en kiu la ciferoj estas kaj pozitivaj kaj negativaj.
                    Ĉiu cifero reprezentas valoron inter <kbd>-n</kbd> ĝis <kbd>+n</kbd>, kie <kbd>n</kbd> estas entjera parto de duono de la bazo.
                    Ekzemple, en bazo <kbd>3</kbd>, la ciferoj estas <kbd>-1, 0, +1</kbd>.
                    Tiel eblas reprezenti ĉiujn entjerojn kaj pozitivajn kaj negativajn sen bezono de aparta signo.
                </p>

                <p className='text-lg mb-6'>
                    Por ĉi tiu konvertilo la bazo estu <i>nepara</i> nombro de <kbd>3</kbd> ĝis <kbd>99</kbd>. Uzu -1, -2, ... por la negativaj ciferoj. Dividu ciferojn per la spaceto.
                </p>
            </div>

            <div>
                <div className="flex flex-row gap-4">
                    <input type="number" placeholder="Dekuma nombro" className="p-2 border rounded"
                        name="dekuma"
                        value={dekuma}
                        onChange={dekumaŜanĝita}
                    />

                    <input className="p-2 border rounded"
                        value={bazo}
                        onChange={(e) => setBazo(e.target.value)}
                        size={3} maxLength={2}
                        type="number" min={3} max={99} step={2}
                    />
                    <input type="text" placeholder="Ekvilibra prezento" className="p-2 border rounded text-xl"
                        name="ekvilibra"
                        value={ekvilibra}
                        onChange={ekvilibraŜanĝita}
                    />
                </div>

                <div className="my-8 border-t border-gray-300" />
                <h2 className="text-2xl font-bold mb-4">hodiaŭ estas</h2>
                <p className="text-lg mb-6">
                    <code>
                        {hodiaŭ}, tago: {tagoDeJaro}<sub>{bazo}</sub>
                    </code>
                </p>
            </div>
        </Layout>
    );
};

export default EkvilibraConverter;
