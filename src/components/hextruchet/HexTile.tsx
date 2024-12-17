import React from 'react';
import { Hex } from './Hex';

interface HexTileProps {
    column: number;
    row: number;
    hex: Hex;
    showCoord: boolean;
};

const HexTile: React.FC<HexTileProps> = ({ column, row, hex, showCoord }) => {

    const id = () => {
        return `${column}:${row}`;
    }

    const center = hex.center();
    const points = hex.corners().map((point) => point.p()).join(" ")

    return (
        <g id={id()}>
            {showCoord && (column == 0 || row == 0) &&
                <text x={center.x - hex.gu.size / 2} y={center.y + 4} fontSize={hex.gu.size / 1.5} fill="#f93">{id()}</text>}
            <polygon points={points} strokeWidth="2" stroke="#3f6" fill="none" />
        </g>
    );
};

export default HexTile;