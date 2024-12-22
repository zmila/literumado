import { TruchetCode } from "../common/HexTypes";

export enum BoardAction {
    Cancel = "cancel",
    Step = "step",
    Finish = "finish",
}

/**
 * orientation of player on tile from 0=right clockwise to 5=up-right
 */
export enum PlayerOrientation {
    P0 = 0, // right
    P1 = 1, // right-down
    P2 = 2, // left-down
    P3 = 3, // left
    P4 = 4, // up-left
    P5 = 5, // up-right
}

export class PlayerPosition {
    constructor(public row: number, public col: number, public orientation: PlayerOrientation) {
    }
}
export class PlayerMove {
    constructor(public row: number, public col: number, public from: PlayerOrientation, public to: PlayerOrientation) {
    }
}

export class PlayerInfo {
    constructor(public name: string, public color: string, public position: PlayerPosition, public moves: PlayerMove[]) { }
}

export interface VojagoBoard {
    playersCount: number; // currently 1 or 2
    currentPlayer: number;
    players: PlayerInfo[];
    tilesOnBoard: { [key: string]: TruchetCode; };
}

