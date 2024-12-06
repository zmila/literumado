import React from 'react';

interface KradoProps {
    code: string;
}

const Krado: React.FC<KradoProps> = ({ code }) => {

    const line = (code: string, id: string, x1: number, y1: number, x2: number, y2: number) => {
        return code.indexOf(id) >= 0 ?
            <line key={id} x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="0.15" />
            : null;
    }

    const generateSvgContent = (code: string) => {
        const elements = [
            line(code, 'n', 0, 0, 1, 0),
            line(code, "m", 1, 0, 2, 0),
            line(code, "b", 0, 0, 0, 1),
            line(code, "e", 1, 0, 1, 1),
            line(code, "d", 2, 0, 2, 1),
            line(code, "i", 0, 1, 1, 1),
            line(code, "a", 1, 1, 2, 1),
            line(code, "p", 0, 1, 0, 2),
            line(code, "o", 1, 1, 1, 2),
            line(code, "q", 2, 1, 2, 2),
            line(code, "u", 0, 2, 1, 2),
            line(code, "w", 1, 2, 2, 2)
        ]
            .filter((el) => el !== null);

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                elements.push(<circle key={`${x}${y}`} cx={x} cy={y} r="0.2" fill="black" />);
            }
        }

        return elements;
    };

    const svgContent = generateSvgContent(code);

    return (
        <span style={{ display: 'inline' }}>
            <svg width="110px" height="110px" viewBox="-2 -2 5 5" xmlns="http://www.w3.org/2000/svg">
                {svgContent}
                <text x="0" y="3" fontFamily="SanSerif" fontSize="0.4" fill="black">
                    {code}
                </text>
            </svg>
        </span>
    );
};

export default Krado;