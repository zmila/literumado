import React from 'react';
import { HexData } from './HexData';

interface HexTileProps {
    column: number;
    row: number;
    hex: HexData;
};

const HexTile: React.FC<HexTileProps> = ({ column, row, hex }) => {

    const id = () => {
        return `${column}:${row}`;
    }
    const points = hex.corners().map((point) => point.p()).join(" ")

    return (
        <g id={id()}>
            <polygon points={points} strokeWidth="2" stroke="#3f6" fill="none" />
        </g>
    );
};

export default HexTile;