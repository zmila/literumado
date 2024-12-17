
export class Point {
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