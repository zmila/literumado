import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { DinuKevakoKonvertilo, Vorto } from '@/utils/DinuKevakoKonvertilo';

const DinuKevakoComponent: React.FC = () => {
    const dkk = new DinuKevakoKonvertilo();
    const defaultText = 'dekstra ekbrilo parte adiaŭas';

    const [teksto, setTeksto] = useState(defaultText);
    const [vortoj, setVortoj] = useState<Vorto[]>(dkk.dividuJeSilaboj(defaultText));

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTeksto = event.target.value;
        setTeksto(newTeksto);
        const newVortoj = dkk.dividuJeSilaboj(newTeksto);
        setVortoj(newVortoj);
    };

    return (
        <Layout>
            <h1 className="text-4xl font-bold mb-4">Dinu Kevako</h1>
            <p className="mb-4">
                Dinu Kevako estas silabara skribsistemo por Esperanto. Ĉiu signo prezentas silabon en formo KV aŭ KVK. La partoj de signo estas aranĝitaj vertikale: meze estas signo por vokalo, supre estas komenca konsonanto(j), kaj sub la vokalo estas fina konsonanto(j) se ili prezentas.
            </p>
            <div>
                <textarea
                    id="taTeksto"
                    className="p-2 w-4/5 m-2 border rounded"
                    rows={5}
                    value={teksto}
                    onChange={handleInput}
                ></textarea>
                <textarea
                    id="taSilaboj"
                    className="p-2 w-4/5 m-2 border rounded"
                    rows={5}
                    readOnly
                    value={dkk.formatigi(vortoj)}
                ></textarea>
                <div id="svgDK" className="p-2 w-4/s m-2 border rounded" style={{ height: '300px' }}></div>
            </div>
        </Layout>
    );
};

export default DinuKevakoComponent;
