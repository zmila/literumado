import React, { useState } from 'react';
import Krado from '@/components/krado/Krado';

interface KradoMontriloProps {
    kradoj: string[];
    showCode: boolean;
}

const KradoMontrilo: React.FC<KradoMontriloProps> = ({ kradoj, showCode }) => {

    const [groupBy, setGroupBy] = useState('name');

    const groups = (groupBy === 'no_grouping') ? [
        {
            name: 'All',
            items: kradoj
        }] : Object.values(
            kradoj.reduce((acc, item) => {
                const length = item.length;
                if (!acc[length]) {
                    acc[length] = { name: `Length: ${length}`, items: [] };
                }
                acc[length].items.push(item);
                return acc;
            }, {} as { [key: number]: { name: string, items: string[] } })
        )

    return (
        <>
            <div className="mt-3">
                <select value={groupBy} onChange={(e) => {
                    setGroupBy(e.target.value);
                }}>
                    <option value="no_grouping">no grouping</option>
                    <option value="group_by_length">group by length</option>
                </select>
            </div>

            <div className="mt-3" id="groups-container">
                {groups.map(({ name, items }) => {
                    return (<details key={name}>
                        <summary className="font-weight-bold" style={{ fontSize: '1.25rem' }}>{name} - {items.length}</summary>
                        <div id="all-combos" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2px' }}>
                            {items.map(code => <Krado key={code} code={code} showCode={showCode} />)}
                        </div>
                    </details>)
                })}
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
        </>
    );
}

export default KradoMontrilo;

