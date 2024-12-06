import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Krado from '@/components/krado/Krado';

const Grid33Component: React.FC = () => {

    const [userCode, setUserCode] = useState<string>('');

    const generateCombinations = (items: string[], length: number): string[] => {
        if (length === 1) return items;
        const combinations: string[] = [];
        items.forEach((item, index) => {
            const smallerCombinations = generateCombinations(items.slice(index + 1), length - 1);
            smallerCombinations.forEach(smallerCombination => {
                combinations.push(item + smallerCombination);
            });
        });
        return combinations;
    };

    const allCombinations: string[] = [];
    const items = ['n', 'm', 'b', 'e', 'd', 'i', 'a', 'p', 'o', 'q', 'u', 'w'];

    for (let i = 1; i <= items.length; i++) {
        allCombinations.push(...generateCombinations(items, i));
    }

    console.log("count of all combinations: ", allCombinations.length);

    const label = "{a, e, i, o, n, m, u, w, b, p, q, d}";

    return (
        <Layout>
            <div className="m-1">
                <label htmlFor="enter-code">{label}</label>:
                <input id="enter-code" type="text" className="border mt-3 ml-2 mb-0" onChange={(e) => setUserCode(e.target.value)} />
                <Krado code={userCode} />
            </div>

            <style jsx>{`
                #all-combos {
                    border: 1px solid #green;
                    background-color: #f0f0f0;
                    height: calc(100vh - 360px); 
                    overflow-y: scroll;
                    padding: .5em;
                }
            `}</style>
            <div id="all-combos" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2px' }}>
                {allCombinations.map(code => <Krado key={code} code={code} />)}
            </div>
        </Layout>
    );
};

export default Grid33Component;
