export class TruchetTile {
    row: number;
    col: number;
    code: string;

    constructor(row: number, col: number, code: string) {
        this.row = row;
        this.col = col;
        this.code = code;
    }
}

export class Point {
    constructor(public x: number, public y: number) {
    }

    p() {
        return [this.x, this.y];
    }

    toString() {
        return "{" + Math.round(this.x) + ", " + Math.round(this.y) + "}";
    }
}

export class HexPoint {
    constructor(public q: number, public r: number) { }
}

