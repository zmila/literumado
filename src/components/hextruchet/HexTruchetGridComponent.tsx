import { HexTruchetSettings } from '@/components/hextruchet/HexTruchetSettings';
import React, { useEffect } from 'react';
import HexTile from './HexTile';
import GrafUtils from './GrafUtils';
import { HexData } from './HexData';
import { Point } from './Point';
import { HexMeta } from '../common/HexMeta';

interface HexTruchetGridComponentProps {
    htSettings: HexTruchetSettings;
    hexMeta: HexMeta;
}

const HexTruchetGridComponent: React.FC<HexTruchetGridComponentProps> = ({ htSettings, hexMeta }) => {

    useEffect(() => { }, [htSettings]);

    const { size, width, height, showGrid } = htSettings;
    // max(width, 1200) - to prevent very big tiles when width is small
    const hexW = Math.max(Math.sqrt(3) * size * (width + 1), 1200);  // sqrt(3) comes from sin(60°)
    const hexH = 1.5 * size * height + size;
    // const hexW = Math.max(1.5 * size * width + size, 1200);
    // const hexH = Math.sqrt(3) * size * (height + 0.5); // sqrt(3) comes from sin(60°)

    const gu = new GrafUtils(size);

    const showTruchetTile = (column: number, row: number, formula: string) => {
        const hex = new HexData(column, row, gu);
        return hex.showTruchetTile(formula, buildSvgArc, buildSvgLine);
    }

    function buildSvgArc(id: string, m1: Point, center: Point, m2: Point): JSX.Element {
        return <path key={id} stroke="blue" strokeWidth="4" fill="none"
            d={`M${m1.x} ${m1.y} Q${center.x} ${center.y} ${m2.x} ${m2.y}`} />;
    }

    const buildSvgLine = (id: string, m1: Point, m2: Point): JSX.Element => {
        return <line key={id} stroke="blue" strokeWidth="4"
            x1={m1.x} y1={m1.y} x2={m2.x} y2={m2.y} />;
    }

    const grid = [];
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (hexMeta.renderMode(row, col) === 'hidden') {
                continue;
            }
            const key = `${col}:${row}`;
            if (showGrid) {
                const hex = new HexData(col, row, gu);
                grid.push(<HexTile key={key} column={col} row={row} hex={hex} />);
            }
            const tc = hexMeta.truchetCode(row, col);
            if (!!tc) {
                const code = GrafUtils.getFormula(tc);
                grid.push(<g key={"t" + key}>
                    {showTruchetTile(col, row, code)}
                </g>);
            }
        }
    }

    return (
        <div>
            <svg id="hexGrid" viewBox={`-2 -2 ${hexW} ${hexH + 3}`} xmlns="http://www.w3.org/2000/svg">
                {grid}
            </svg>
        </div>
    );
}


export default HexTruchetGridComponent;


