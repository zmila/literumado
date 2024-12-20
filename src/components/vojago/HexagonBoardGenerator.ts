import { HexMeta, RenderMode, TruchetCode } from "../common/HexMeta";
import GrafUtils from "../hextruchet/GrafUtils";

export class HexagonBoardGenerator {
    generateBoard(boardSize: number): HexMeta {

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
            tiles[point.x + N][point.y + N] = TruchetCode.TEmpty;
        });

        return {
            renderMode(row: number, col: number) {
                return tiles[row][col] ? RenderMode.Visible : RenderMode.Hidden;
            },
            truchetCode(row: number, col: number) {
                return tiles[row][col] || TruchetCode.TEmpty;
            }
        };
    }
}


