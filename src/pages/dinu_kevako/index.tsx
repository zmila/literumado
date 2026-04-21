import React, {useState} from 'react';
import Layout from '@/components/Layout';
import {DinuKevakoKonvertilo} from '@/utils/dinu_kevako/DinuKevakoKonvertilo';
import { Vorto } from '@/utils/dinu_kevako/tipoj';
import DinuKevakoSvgComponent from '@/components/dinu_kevako/DinuKevakoSvgComponent';

const DinuKevakoComponent: React.FC = () => {
    const dkk = new DinuKevakoKonvertilo();
    // const defaultText = 'dekstra ekbrilo parte adiaŭas';
    // const [teksto, setTeksto] = useState(defaultText);
    // const [vortoj, setVortoj] = useState<Vorto[]>(dkk.dividuJeSilaboj(defaultText));
    const [teksto, setTeksto] = useState('');
    const [vortoj, setVortoj] = useState<Vorto[]>([]);

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTeksto = event.target.value;
        setTeksto(newTeksto);
        const newVortoj = dkk.dividuJeSilaboj(newTeksto);
        setVortoj(newVortoj);
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
                <div className="p-2 m-2">
                    <DinuKevakoSvgComponent vortoj={vortoj}/>
                </div>
            </div>
        </Layout>
    );
};

export default DinuKevakoComponent;
