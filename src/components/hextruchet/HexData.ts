import GrafUtils from "./GrafUtils";
import { Point } from "../common/HexTypes";

export class HexData {

    constructor(public column: number, public row: number, public gu: GrafUtils) {
    }

    center() {
        return this.gu.get_center(this.column, this.row);
    }

    corners() {
        const center = this.center();

        const corners = [];
        for (let i = 0; i < 6; i++) {
            corners.push(this.gu.point_hex_corner(center, i));
            // corners.push(this.gu.flat_hex_corner(center, i));
        }

        return corners;
    }

    middles() {
        const corners = this.corners();

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
    }

    showTruchetTile(formula: string,
        buildArc: (arg0: string, arg1: Point, arg2: Point, arg3: Point) => JSX.Element,
        buildLine: (arg0: string, arg1: Point, arg2: Point) => JSX.Element) {

        const sidePairs = GrafUtils.parseTruchetFormula(formula);
        const curves: React.JSX.Element[] = [];
        sidePairs.forEach((c) => {
            switch (GrafUtils.getDistance(c[0], c[1])) {
                case "S": // small arc
                case "B": // big arc
                    curves.push(this.show_arc(c[0], c[1], buildArc));
                    break;
                case "L": // line
                    curves.push(this.show_line(c[0], c[1], buildLine));
                    break;
            }
        });
        return curves;
    }

    show_arc(side1: number, side2: number, buildArc: (arg0: string, arg1: Point, arg2: Point, arg3: Point) => JSX.Element) {
        const middles = this.middles();

        const m1 = middles[side1];
        const m2 = middles[side2];
        const center = this.center();

        const id = this.id() + "_" + side1 + side2;
        return buildArc(id, m1, center, m2);
    }

    show_line(side1: number, side2: number, buildLine: (arg0: string, arg1: Point, arg2: Point) => JSX.Element) {
        const middles = this.middles();
        const m1 = middles[side1];
        const m2 = middles[side2];

        const id = this.id() + "_" + side1 + side2;
        return buildLine(id, m1, m2);
    }

    toString() {
        return `hex<${this.column},${this.row}>`;
    }

    id() {
        return `${this.column}:${this.row}`;
    }
}  