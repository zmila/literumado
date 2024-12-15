import React from 'react';

// 60 gradus in radians
const a60 = Math.PI / 3;


interface HexTileProps {
    column: number;
    row: number;
    size: number;
};

const HexTile: React.FC<HexTileProps> = ({ column, row, size }) => {

    const hexW = 2 * size;
    const hexH = Math.sqrt(3) * size; // sqrt(3) comes from sin(60°)
    const deltaH = hexH / 2;
    const deltaW = (hexW * 3) / 4;

    const getCorners = () => {
        const centerP = getCenter(column, row);

        const corners = [];
        for (let i = 0; i < 6; i++) {
            corners.push(flat_hex_corner(centerP, size, i));
        }

        return corners;
    }

    /* const middles = () => {
        const corners = getCorners();

        const middles = [];
        for (let i = 0; i < 5; i++) {
            const x = (corners[i].x + corners[i + 1].x) / 2;
            const y = (corners[i].y + corners[i + 1].y) / 2;
            middles.push(new Point(x, y));
        }

        const x = (corners[5].x + corners[0].x) / 2;
        const y = (corners[5].y + corners[0].y) / 2;
        middles.push(new Point(x, y));

        return middles;
    } */

    /* const toString = () => {
        return `hex<${column},${row}>`;
    } */

    const id = () => {
        return `${column}:${row}`;
    }

    const get_column_origin = (column: number) => {
        return new Point(column * deltaW, column % 2 == 1 ? deltaH : 0);
    }

    const getCenter = (column: number, row: number) => {
        const origin = get_column_origin(column);
        const centerW = origin.x + hexW / 2;
        const centerH = origin.y + hexH * (1 / 2 + row);
        const center = new Point(centerW, centerH);
        return center;
    }

    const flat_hex_corner = (center: Point, size: number, i: number) => {
        const angle_rad = (i + 4) * a60;
        return new Point(
            center.x + size * Math.cos(angle_rad),
            center.y + size * Math.sin(angle_rad)
        );
    }

    const center = getCenter(column, row);
    const points = getCorners().map((point) => point.p()).join(" ")

    return (
        <g id={id()}>
            {(column == 0 || row == 0) && <text x={center.x - size / 2} y={center.y + 4} fontSize={size / 1.5} fill="#f93">{id()}</text>}
            <polygon points={points} strokeWidth="2" stroke="#3f6" fill="none" />
        </g>
    );
};

class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    p() {
        return [this.x, this.y];
    }

    toString() {
        return "{" + Math.round(this.x) + ", " + Math.round(this.y) + "}";
    }
}


export default HexTile;