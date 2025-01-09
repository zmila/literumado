import React from 'react';
import { HexData } from './HexData';

interface HexTileProps {
    column: number;
    row: number;
    hex: HexData;
    color: string;
    fill?: string;
    showCoord?: boolean;
};

const HexTile: React.FC<HexTileProps> = ({ column, row, hex, color, fill = "none", showCoord = false }) => {

    const id = () => {
        return `${row}:${column}`;
    }
    const points = hex.corners().map((point) => point.p()).join(" ")
    const center = hex.center();

    return (
        <g id={id()}>
            <polygon points={points} strokeWidth="1" stroke={color} fill={fill} />
            {showCoord && (
                <text x={center.x - hex.gu.size / 2} y={center.y + 4} fontSize={hex.gu.size / 1.5} fill="#f93">
                    {id()}
                </text>
            )}
        </g>
    );
};

export default HexTile;