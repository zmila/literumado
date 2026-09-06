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

    static getRandomTile(): TruchetCode {
        // 15 playable codes: T0-T9, TL, TR, TStar, TSp1, TSp2
        // Excludes TEmpty and TFull
        const playableCodes: TruchetCode[] = [
            TruchetCode.T0, TruchetCode.T1, TruchetCode.T2, TruchetCode.T3, TruchetCode.T4,
            TruchetCode.T5, TruchetCode.T6, TruchetCode.T7, TruchetCode.T8, TruchetCode.T9,
            TruchetCode.TL, TruchetCode.TR, TruchetCode.TStar, TruchetCode.TSp1, TruchetCode.TSp2
        ];
        return playableCodes[Math.floor(Math.random() * playableCodes.length)];
    }

    // Rotation mapping: CW rotation by 60° increments
    // Built by rotating each tile's edge indices: i → (i + 1) % 6
    // Maps: tile code → [rotated by 0°, 1×60°, 2×60°, 3×60°, 4×60°, 5×60°]
    private static readonly ROTATION_MAP: Map<TruchetCode, TruchetCode[]> = new Map([
        [TruchetCode.TSp1, [TruchetCode.TSp1, TruchetCode.TSp2, TruchetCode.TSp1, TruchetCode.TSp2, TruchetCode.TSp1, TruchetCode.TSp2]],
        [TruchetCode.TSp2, [TruchetCode.TSp2, TruchetCode.TSp1, TruchetCode.TSp2, TruchetCode.TSp1, TruchetCode.TSp2, TruchetCode.TSp1]],
        [TruchetCode.TStar, [TruchetCode.TStar, TruchetCode.TStar, TruchetCode.TStar, TruchetCode.TStar, TruchetCode.TStar, TruchetCode.TStar]],
        [TruchetCode.TL, [TruchetCode.TL, TruchetCode.TR, TruchetCode.T0, TruchetCode.TL, TruchetCode.TR, TruchetCode.T0]],
        [TruchetCode.TR, [TruchetCode.TR, TruchetCode.T0, TruchetCode.TL, TruchetCode.TR, TruchetCode.T0, TruchetCode.TL]],
        [TruchetCode.T0, [TruchetCode.T0, TruchetCode.TL, TruchetCode.TR, TruchetCode.T0, TruchetCode.TL, TruchetCode.TR]],
        [TruchetCode.T1, [TruchetCode.T1, TruchetCode.T2, TruchetCode.T3, TruchetCode.T1, TruchetCode.T2, TruchetCode.T3]],
        [TruchetCode.T2, [TruchetCode.T2, TruchetCode.T3, TruchetCode.T1, TruchetCode.T2, TruchetCode.T3, TruchetCode.T1]],
        [TruchetCode.T3, [TruchetCode.T3, TruchetCode.T1, TruchetCode.T2, TruchetCode.T3, TruchetCode.T1, TruchetCode.T2]],
        [TruchetCode.T4, [TruchetCode.T4, TruchetCode.T5, TruchetCode.T6, TruchetCode.T9, TruchetCode.T8, TruchetCode.T7]],
        [TruchetCode.T5, [TruchetCode.T5, TruchetCode.T6, TruchetCode.T9, TruchetCode.T8, TruchetCode.T7, TruchetCode.T4]],
        [TruchetCode.T6, [TruchetCode.T6, TruchetCode.T9, TruchetCode.T8, TruchetCode.T7, TruchetCode.T4, TruchetCode.T5]],
        [TruchetCode.T7, [TruchetCode.T7, TruchetCode.T4, TruchetCode.T5, TruchetCode.T6, TruchetCode.T9, TruchetCode.T8]],
        [TruchetCode.T8, [TruchetCode.T8, TruchetCode.T7, TruchetCode.T4, TruchetCode.T5, TruchetCode.T6, TruchetCode.T9]],
        [TruchetCode.T9, [TruchetCode.T9, TruchetCode.T8, TruchetCode.T7, TruchetCode.T4, TruchetCode.T5, TruchetCode.T6]],
    ]);

    /**
     * Rotate a tile clockwise by N × 60° (where N is 0..5)
     * @param tile The tile code to rotate
     * @param rotationSteps Number of 60° steps (0..5, or will be normalized to 0..5)
     * @returns The rotated tile code
     */
    static rotateTileClockwise(tile: TruchetCode, rotationSteps: number): TruchetCode {
        const normalizedSteps = rotationSteps % 6;
        const rotations = this.ROTATION_MAP.get(tile);
        if (!rotations) {
            // Fallback: return original tile if not in map (e.g., TEmpty, TFull)
            return tile;
        }
        return rotations[normalizedSteps];
    }
}

