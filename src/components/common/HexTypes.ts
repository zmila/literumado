import {JSX} from "react";

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
    constructor(public q: number, public r: number) {
    }
}

export enum TruchetCode {
    TEmpty = " ",
    TDn = "_",
    TUp = "^",
    TStar = "*",
    TL = "\\",
    TR = "/",
    T0 = "0",
    T1 = "1",
    T2 = "2",
    T3 = "3",
    T4 = "4",
    T5 = "5",
    T6 = "6",
    T7 = "7",
    T8 = "8",
    T9 = "9",
    TFull = "#"
}

export const truchetCode = (code: string): TruchetCode | null => {
    switch (code) {
        case " ":
            return TruchetCode.TEmpty;
        case "_":
            return TruchetCode.TDn;
        case "^":
            return TruchetCode.TUp;
        case "*":
            return TruchetCode.TStar;
        case "\\":
            return TruchetCode.TL;
        case "/":
            return TruchetCode.TR;
        case "0":
            return TruchetCode.T0;
        case "1":
            return TruchetCode.T1;
        case "2":
            return TruchetCode.T2;
        case "3":
            return TruchetCode.T3;
        case "4":
            return TruchetCode.T4;
        case "5":
            return TruchetCode.T5;
        case "6":
            return TruchetCode.T6;
        case "7":
            return TruchetCode.T7;
        case "8":
            return TruchetCode.T8;
        case "9":
            return TruchetCode.T9;
        case "#":
            return TruchetCode.TFull;
        default:
            return null;
    }
}


export enum RenderMode {
    Visible = 'visible',
    Hidden = 'hidden'
}

export interface HexMeta {
    renderMode(row: number, col: number): RenderMode;

    truchetCode(row: number, col: number): TruchetCode;

    extra(row: number, col: number): JSX.Element[] | null;
}

