import React, {useState} from 'react';
import Layout from '@/components/Layout';
import {DinuKevakoKonvertilo} from '@/utils/dinu_kevako/DinuKevakoKonvertilo';
import { Vorto } from '@/utils/dinu_kevako/tipoj';
import DinuKevakoSvgComponent from '@/components/dinu_kevako/DinuKevakoSvgComponent';

const MIN_VICOJ = 1;
const MAX_VICOJ = 12;

const DinuKevakoComponent: React.FC = () => {
    const dkk = new DinuKevakoKonvertilo();
    const [teksto, setTeksto] = useState('');
    const [vortoj, setVortoj] = useState<Vorto[]>([]);
    const [vicoj, setVicoj] = useState(2);

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTeksto = event.target.value;
        setTeksto(newTeksto);
        setVortoj(dkk.dividuJeSilaboj(newTeksto));
    };

    const handleVicoj = (event: React.ChangeEvent<HTMLInputElement>) => {
        const v = Number(event.target.value);
        if (v >= MIN_VICOJ && v <= MAX_VICOJ) setVicoj(v);
    };

    return (
        <Layout>
            <h1 className="text-4xl font-bold mb-4">Dinu Kevako</h1>
            <p className="mb-4"> Dinu Kevako estas silabara skribsistemo por Esperanto. </p>
            <div>
                <textarea
                    id="taTeksto"
                    className="p-2 w-4/5 m-2 border rounded"
                    rows={2}
                    value={teksto}
                    onChange={handleInput}
                ></textarea>
                <textarea
                    id="taSilaboj"
                    className="p-2 w-4/5 m-2 border rounded"
                    rows={2}
                    readOnly
                    value={dkk.formatigi(vortoj)}
                ></textarea>
                <div className="p-2 m-2 flex items-center gap-1">
                    <button
                        className="w-6 h-6 flex items-center justify-center border rounded text-sm leading-none disabled:opacity-40"
                        onClick={() => setVicoj(v => Math.max(MIN_VICOJ, v - 1))}
                        disabled={vicoj <= MIN_VICOJ}
                    >−</button>
                    <input
                        type="number"
                        min={MIN_VICOJ}
                        max={MAX_VICOJ}
                        value={vicoj}
                        onChange={handleVicoj}
                        className="w-10 text-center border rounded text-sm p-0.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                        className="w-6 h-6 flex items-center justify-center border rounded text-sm leading-none disabled:opacity-40"
                        onClick={() => setVicoj(v => Math.min(MAX_VICOJ, v + 1))}
                        disabled={vicoj >= MAX_VICOJ}
                    >+</button>
                    <span className="text-sm text-gray-500 ml-1">vicoj</span>
                </div>
                <div className="p-2 m-2">
                    <DinuKevakoSvgComponent vortoj={vortoj} vicoj={vicoj} />
                </div>
            </div>
        </Layout>
    );
};

export default DinuKevakoComponent;
