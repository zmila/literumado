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


export enum HexGridType {
    Hexagon = "hexagon", // width is count of hexs on side, so width=1 is one hex, width=2 is 7 hexes
    Rectangle = "rectangle", // has height and width
}
