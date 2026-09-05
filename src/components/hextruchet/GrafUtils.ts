import { TruchetCode } from "../common/HexTypes";
import { HexPoint, Point } from "../common/HexTypes";

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

    static axial_add(hex: HexPoint, vec: HexPoint): HexPoint {
        return new HexPoint(hex.q + vec.q, hex.r + vec.r)
    }

    static axial_to_offset(hex: HexPoint, isEven: boolean): Point {
        const col = hex.q + (isEven ? (hex.r + (hex.r & 1)) / 2 : (hex.r - (hex.r & 1)) / 2);
        const row = hex.r;

        return new Point(row, col)
    }

    static get_neighbors(N: number): Point[] {
        const center = new HexPoint(0, 0);
        const results = []
        for (let q = -N; q <= N; q++) {
            for (let r = Math.max(-N, -q - N); r <= Math.min(+N, -q + N); r++) {
                results.push(this.axial_add(center, new HexPoint(q, r)));
            }
        }
        const isEven = N % 2 !== 0;

        return results.map((hex) => this.axial_to_offset(hex, isEven));
    }


    static getFormula(code: TruchetCode): string {
        switch (code) {
            case TruchetCode.TEmpty: return "";
            case TruchetCode.TSp1: return "01 23 45";
            case TruchetCode.TSp2: return "05 12 34";
            case TruchetCode.TStar: return "03 14 25";
            case TruchetCode.TL: return "05 14 23";
            case TruchetCode.TR: return "01 25 34";
            case TruchetCode.T0: return "03 12 45";
            case TruchetCode.T1: return "03 15 24";
            case TruchetCode.T2: return "02 14 35";
            case TruchetCode.T3: return "04 13 25";
            case TruchetCode.T4: return "01 24 35";
            case TruchetCode.T5: return "04 12 35";
            case TruchetCode.T6: return "04 15 23";
            case TruchetCode.T7: return "05 13 24";
            case TruchetCode.T8: return "02 13 45";
            case TruchetCode.T9: return "02 15 34";
            case TruchetCode.TFull: return "03 14 25 01 12 23 34 45 05";
            default: throw new Error("Unknown code: " + code);
        }
    }

}
