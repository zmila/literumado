import React, { useState } from 'react';
import Krado from '@/components/krado/Krado';

interface KradoMontriloProps {
    kradoj: string[];
    showCode: boolean;
}

const KradoMontrilo: React.FC<KradoMontriloProps> = ({ kradoj, showCode }) => {

    const [groupBy, setGroupBy] = useState('name');
    const [filter, setFilter] = useState<string>('');
    const [minLen, setMinLen] = useState<number>(1);

    React.useEffect(() => {
        setGroupBy('group_by_length');
    }, []);

    const getAll = () => [
        {
            name: 'All',
            items: kradoj
        }
    ];

    const getGroupsByLength = () => Object.values(
        kradoj.reduce((acc, item) => {
            const length = item.length;
            if (!acc[length]) {
                acc[length] = { name: `Length: ${length}`, items: [] };
            }
            acc[length].items.push(item);
            return acc;
        }, {} as { [key: number]: { name: string, items: string[] } })
    );

    const getFiltered = () => {
        const filterChars = new Set(filter.split(''));
        const filterCharsArray = Array.from(filterChars);
        const filtered = kradoj.filter(code =>
            filterCharsArray.every(char => !code.includes(char))
            && code.length >= minLen
        );

        console.info('filtered: ', filter.length, filtered)
        return [
            {
                name: 'Filtered',
                items: filtered
            }
        ];
    };

    const groups = (() => {
        switch (groupBy) {
            case 'no_grouping':
                return getAll();
            case 'group_by_length':
                return getGroupsByLength();
            case 'filtered':
                return getFiltered();
            default:
                return [];
        }
    })();

    return (
        <>
            <div className="mt-3">
                <select value={groupBy} onChange={(e) => {
                    setGroupBy(e.target.value);
                }}>
                    <option value="no_grouping">no grouping</option>
                    <option value="group_by_length">group by length</option>
                    <option value="filtered">filtered</option>
                </select>
                {groupBy === 'filtered' &&
                    <span>
                        <input id="filter" type="text" className="border mt-3 ml-2 mb-0" onChange={(e) => setFilter(e.target.value)} />
                        <input id="minLen" type="number" className="border mt-3 ml-2 mb-0" onChange={(e) => setMinLen(parseInt(e.target.value))} />
                    </span>}
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
                height: calc(100vh - 160px); 
                overflow-y: scroll;
                padding: .5em;
            }
        `}</style>
        </>
    );
}

export default KradoMontrilo;

