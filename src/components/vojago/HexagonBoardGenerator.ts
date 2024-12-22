import { HexMeta } from "../common/HexTypes";
import { RenderMode } from "../common/HexTypes";
import { TruchetCode } from "../common/HexTypes";
import GrafUtils from "../hextruchet/GrafUtils";

export class HexagonBoardGenerator {
    static generateBoard(boardSize: number, tilesOnBoard: { [key: string]: TruchetCode; }): HexMeta {

        const rows = 2 * boardSize - 1;
        const cols = 2 * boardSize - 1;
        const tiles: (TruchetCode | null)[][] = [];
        for (let row = 0; row < rows; row++) {
            const rowTiles = new Array(cols).fill(null);
            tiles.push(rowTiles);
        }

        const N = boardSize - 1;
        const points = GrafUtils.get_neighbors(N);
        points.forEach((point) => {
            const key = `${point.x + N}:${point.y + N}`;
            tiles[point.x + N][point.y + N] = tilesOnBoard[key] || TruchetCode.TEmpty;
        });

        return {
            renderMode(row: number, col: number) {
                return tiles[row][col] ? RenderMode.Visible : RenderMode.Hidden;
            },
            truchetCode(row: number, col: number) {
                return tiles[row][col] || TruchetCode.TEmpty;
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            extra(row: number, col: number) {
                return null;
            }
        };
    }
}


