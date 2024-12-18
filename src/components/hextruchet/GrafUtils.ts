import { Point } from "./Point";

// 60 gradus in radians
const a60 = Math.PI / 3;
const a30 = Math.PI / 6;

export default class GrafUtils {
    size: number;
    hexW: number;
    hexH: number;
    deltaH: number;
    deltaW: number;

    constructor(size: number) {
        this.size = size;

        this.hexW = Math.sqrt(3) * size; // sqrt(3) comes from sin(60°)
        this.hexH = 2 * size; // sqrt(3) comes from sin(60°)
        this.deltaH = (this.hexH * 3) / 4;
        this.deltaW = this.hexW / 2;
        // this.hexW = 2 * size;
        // this.hexH = Math.sqrt(3) * size; // sqrt(3) comes from sin(60°)
        // this.deltaH = this.hexH / 2;
        // this.deltaW = (this.hexW * 3) / 4;
    }

    static parseTruchetFormula(formula: string): number[][] {
        const parts = formula.split(" ");
        const commands = parts.map((p) => [+p.charAt(0), +p.charAt(1)]);
        return commands;
    }

    static getDistance(side1: number, side2: number): string {
        const dist = Math.abs(side1 - side2);
        switch (dist) {
            case 1:
                return "S";
            case 2:
                return "B";
            case 3:
                return "L";
            case 4:
                return "B";
            case 5:
                return "S";
            default:
                return "";
        }
    }

    get_center(column: number, row: number): Point {
        const origin = this.get_row_origin(row);
        const centerW = origin.x + this.hexW * (1 / 2 + column);
        const centerH = origin.y + this.hexH / 2;
        const center = new Point(centerW, centerH);
        // const origin = this.get_column_origin(column);
        // const centerW = origin.x + this.hexW / 2;
        // const centerH = origin.y + this.hexH * (1 / 2 + row);
        // const center = new Point(centerW, centerH);
        return center;
    }

    // get_column_origin(column: number): Point {
    //     return new Point(column * this.deltaW, column % 2 == 1 ? this.deltaH : 0);
    // }
    get_row_origin(row: number): Point {
        return new Point(row % 2 == 1 ? this.deltaW : 0, row * this.deltaH);
    }

    // flat_hex_corner(center: Point, i: number) {
    //     const angle_rad = (i + 4) * a60;
    //     return new Point(
    //         center.x + this.size * Math.cos(angle_rad),
    //         center.y + this.size * Math.sin(angle_rad)
    //     );
    // }
    point_hex_corner(center: Point, i: number) {
        const angle_rad = (i - 1) * a60 + a30;
        return new Point(
            center.x + this.size * Math.cos(angle_rad),
            center.y + this.size * Math.sin(angle_rad)
        );
    }

    static hexCodes: { [key: string]: string } = {
        "_": "01 23 45",
        "^": "05 12 34",
        "*": "03 14 25",
        "0": "03 12 45",
        "\\": "05 14 23",
        "/": "01 25 34",
        "1": "03 15 24",
        "2": "02 14 35",
        "3": "04 13 25",
        "4": "01 24 35",
        "5": "04 12 35",
        "6": "04 15 23",
        "7": "02 15 34",
        "8": "02 13 45",
        "9": "05 13 24",
    };

}
