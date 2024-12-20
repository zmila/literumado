import React from 'react';
import { HexData } from './HexData';

interface HexTileProps {
    column: number;
    row: number;
    hex: HexData;
};

const HexTile: React.FC<HexTileProps> = ({ column, row, hex }) => {

    const id = () => {
        return `${row}:${column}`;
    }
    const points = hex.corners().map((point) => point.p()).join(" ")
    //const center = hex.center();

    return (
        <g id={id()}>
            {/* <text x={center.x - hex.gu.size / 2} y={center.y + 4} fontSize={hex.gu.size / 1.5} fill="#f93">{id()}</text> */}
            <polygon points={points} strokeWidth="2" stroke="#3f6" fill="none" />
        </g>
    );
};

export default HexTile;