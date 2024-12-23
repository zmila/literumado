import { HexMeta, RenderMode, TruchetCode } from "../common/HexTypes";
import GrafUtils from "../hextruchet/GrafUtils";
import { PlayerInfo, PlayerOrientation, PlayerPosition, VojagoBoard } from "./VojagoCommon";

export class VojagoGameUtils {
    static key(row: number, col: number) {
        return `${row}:${col}`;
    }

    static isOutOfBoard(pos: PlayerPosition, maxColumns: number, hexMeta: HexMeta): boolean {
        return (pos.row === 0 && pos.col === 0) ||
            pos.row < 0 || pos.col < 0 ||
            pos.row >= maxColumns || pos.col >= maxColumns ||
            hexMeta.renderMode(pos.row, pos.col) == RenderMode.Hidden;
    }

    static isTileOnBoard(currPos: PlayerPosition, tilesOnBoard: { [key: string]: TruchetCode; }): boolean {
        return !!tilesOnBoard[this.key(currPos.row, currPos.col)];
    }

    static getTileAtPos(currPos: PlayerPosition, tilesOnBoard: { [key: string]: TruchetCode; }): TruchetCode {
        return tilesOnBoard[this.key(currPos.row, currPos.col)];
    }

    static calculateNextOrientation(player: PlayerInfo, tile: TruchetCode): number {
        const currPos = player.position;
        const formula = GrafUtils.getFormula(tile);
        const f = currPos.orientation.valueOf().toString();
        const pair = formula.split(" ").find((p) => p.startsWith(f) || p.endsWith(f))!;
        return parseInt(pair.startsWith(f) ? pair[1] : pair[0]);
    }

    static calculateNextPosition(position: PlayerPosition, to: number) {
        const dc = (position.row % 2 === 0) ? 0 : 1;
        const nextOr = (to + 3) % 6;
        switch (to) {
            case PlayerOrientation.P0: return new PlayerPosition(position.row, position.col + 1, nextOr);
            case PlayerOrientation.P1: return new PlayerPosition(position.row + 1, position.col + dc, nextOr);
            case PlayerOrientation.P2: return new PlayerPosition(position.row + 1, position.col + dc - 1, nextOr);
            case PlayerOrientation.P3: return new PlayerPosition(position.row, position.col - 1, nextOr);
            case PlayerOrientation.P4: return new PlayerPosition(position.row - 1, position.col + dc - 1, nextOr);
            case PlayerOrientation.P5: return new PlayerPosition(position.row - 1, position.col + dc, nextOr);
        }
    }

    static playersCollided(board: VojagoBoard, currentPlayerPos: PlayerPosition, nextOr: PlayerOrientation): PlayerInfo | undefined {
        // only for two players, TODO fix to iterate all others
        const otherPlayers: PlayerInfo[] = this.getOtherPlayers(board);
        return otherPlayers.find(p => p.position.row == currentPlayerPos.row &&
            p.position.col === currentPlayerPos.col &&
            p.position.orientation === nextOr);
    }

    static getOtherPlayers(board: VojagoBoard): PlayerInfo[] {
        const currentPlayer = board.players[board.currentPlayer];
        return board.players.filter(p => p.color != currentPlayer.color);
    }
}

