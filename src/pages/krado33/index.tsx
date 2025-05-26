import Layout from '@/components/Layout';
import KradoDemo from '@/components/krado/KradoDemo';
import KradoMontrilo from '@/components/krado/KradoMontrilo';
import React from 'react';


const Grid33Component: React.FC = () => {

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
    return (
        <Layout>
            {/* <KradoDemo showCode={false} /> */}

            <KradoMontrilo kradoj={allCombinations} showCode={true} />
        </Layout>
    );
};

export default Grid33Component;
