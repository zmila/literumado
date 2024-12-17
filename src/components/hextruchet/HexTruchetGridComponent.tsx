import { HexTruchetSettings } from '@/types/HexTruchetSettings';
import React, { useEffect } from 'react';
import HexTile from './HexTile';
import LangUtils from './LangUtils';
import GrafUtils from './GrafUtils';
import { Hex } from './Hex';
import { Point } from './Point';

interface HexTruchetGridComponentProps {
    htSettings: HexTruchetSettings;
    text: string;
}

const HexTruchetGridComponent: React.FC<HexTruchetGridComponentProps> = ({ htSettings, text }) => {

    useEffect(() => {
    }, [htSettings]);

    const { size, width, height, showCoord, showGrid } = htSettings;
    const sr3 = Math.sqrt(3);
    const hexW = 1.5 * size * width + size;
    const hexH = sr3 * size * (height + 0.5); // sqrt(3) comes from sin(60°)

    // const drawGridAxes = () => {
    //     const axis = [];
    //     axis.push(<line key='right' x1="0" y1="0" x2={hexW} y2="0" stroke="red" strokeWidth="1" />);
    //     axis.push(<line key='down' x1="0" y1="0" x2="0" y2={hexH} stroke="red" strokeWidth="1" />);
    //     for (let x = 1; x <= width; x++) {
    //         const ax = x * 1.5 * size - size / 2;
    //         axis.push(<line key={'x' + x} x1={ax} y1="0" x2={ax} y2={2 * size} stroke="blue" strokeWidth="1" />);
    //     }
    //     for (let y = 1; y <= height; y++) {
    //         const ay = y * size * sr3 - size + 4;
    //         axis.push(<line key={"y" + y} x1={0} y1={ay} x2={2 * size} y2={ay} stroke="blue" strokeWidth="1" />);
    //     }
    //     return axis;
    // }
    // const axis = showAxes ? drawGridAxes() : null;

    const gu = new GrafUtils(size);

    const grid = [];
    if (showGrid) {
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const key = `${col}:${row}`;
                const hex = new Hex(col, row, gu);
                grid.push(<HexTile key={key} column={col} row={row} hex={hex} showCoord={showCoord} />);
            }
        }
    }

    const htCode = LangUtils.text2hex(text, LangUtils.char2code);

    const renderHexCodes = (htCode: string) => {
        const len = htCode.length;
        if (len <= 0) return [];

        let c = 0;
        const result = [];
        for (let col = 0; col <= width; col++) {
            for (let row = 0; row < height; row++) {
                const code = GrafUtils.hexCodes[htCode.charAt(c)];
                if (code) {
                    result.push(
                        <g key={"t" + col + ":" + row}>
                            {showTruchetTile(col, row, code)}
                        </g>);
                } else {
                    console.warn(`char ${text.charAt(c)} at position ${c} has no hex code!`);
                }
                c++;
                if (c >= len) {
                    break;
                }
            }
            if (c >= len) {
                break;
            }
        }

        if (c < len) {
            console.log(`remaining text: ` + text.substring(c));
        }

        return result;
    }

    const showTruchetTile = (column: number, row: number, formula: string) => {
        const hex = new Hex(column, row, gu);
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

    const encodedText = renderHexCodes(htCode);

    return (
        <div>
            <svg id="hexGrid" viewBox={`-2 -2 ${hexW} ${hexH + 3}`} xmlns="http://www.w3.org/2000/svg">
                {/* {showAxes && <g>{axis}</g>} */}
                {showGrid && grid}
                {encodedText}
            </svg>
        </div>
    );
}

export default HexTruchetGridComponent;


