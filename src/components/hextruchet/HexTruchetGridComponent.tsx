import { HexTruchetSettings } from '@/types/HexTruchetSettings';
import React, { useEffect } from 'react';
import HexTile from './HexTile';

interface HexTruchetGridComponentProps {
    htSettings: HexTruchetSettings;
}

const HexTruchetGridComponent: React.FC<HexTruchetGridComponentProps> = ({ htSettings }) => {

    const drawGridAxes = () => {
        const axis = [];
        axis.push(<line key='right' x1="0" y1="0" x2={hexW} y2="0" stroke="red" strokeWidth="1" />);
        axis.push(<line key='down' x1="0" y1="0" x2="0" y2={hexH} stroke="red" strokeWidth="1" />);
        for (let x = 1; x <= width; x++) {
            const ax = x * 1.5 * size - size / 2;
            axis.push(<line key={'x' + x} x1={ax} y1="0" x2={ax} y2={2 * size} stroke="blue" strokeWidth="1" />);
        }
        for (let y = 1; y <= height; y++) {
            const ay = y * size * sr3 - size + 4;
            axis.push(<line key={"y" + y} x1={0} y1={ay} x2={2 * size} y2={ay} stroke="blue" strokeWidth="1" />);
        }
        return axis;
    }

    useEffect(() => {
    }, [htSettings]);

    const { size, width, height } = htSettings;
    const sr3 = Math.sqrt(3);
    const hexW = 1.5 * size * width + size;
    const hexH = sr3 * size * height; // sqrt(3) comes from sin(60°)

    const axis = drawGridAxes();

    const hexs = [];
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const key = `${col}:${row}`;
            hexs.push(<HexTile key={key} column={col} row={row} size={size} />);
        }
    }

    return (
        <div>
            <svg id="hexGrid" viewBox={`-2 -2 ${hexW} ${hexH + 3}`} xmlns="http://www.w3.org/2000/svg">
                <g>{axis}</g>
                {hexs}
            </svg>
        </div>
    );


}

export default HexTruchetGridComponent;



/*         
            viewBox="-2 -2 5 5"
            
            (showCode && <text x="0" y="3" fontFamily="SanSerif" fontSize="0.6" fill="black">
                    {code}
                </text>)

                
            <div className="pt-4" style={{ height: '100vh', border: '2px solid yellow' }}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${htSettings.width}, ${htSettings.size}px)`, gap: '2px', margin: 'auto' }}>
                {Array.from({ length: htSettings.width * htSettings.height }).map((_, i) => {
                    return (
                        <div key={i} style={{ width: `${htSettings.size}px`, height: `${htSettings.size}px`, backgroundColor: 'red' }}>
                            {i}
                        </div>
                    );
                })}
            </div>
        </div> 
 */