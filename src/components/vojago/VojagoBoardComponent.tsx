import { VojagoSettings } from '@/components/vojago/VojagoSettings';
import React, { ChangeEvent } from 'react';
import { HexMeta, Point, RenderMode, truchetCode, TruchetCode } from "../common/HexTypes";
import GrafUtils from '../hextruchet/GrafUtils';
import { HexData } from '../hextruchet/HexData';
import HexTruchetGridComponent from '../hextruchet/HexTruchetGridComponent';
import { HexagonBoardGenerator } from './HexagonBoardGenerator';
import { BoardAction, PlayerOrientation, VojagoBoard } from "./VojagoCommon";

interface VojagoBoardComponentProps {
    preview: boolean;
    settings: VojagoSettings;
    board: VojagoBoard;
    onBoardAction: (action: BoardAction, tile?: TruchetCode) => void;
}

const VojagoBoardComponent: React.FC<VojagoBoardComponentProps> = ({ preview, settings, board, onBoardAction: onBoardChange }) => {

    const [tileCode, setTileCode] = React.useState<string>('');

    const rows = 2 * settings.boardSize - 1;
    const cols = 2 * settings.boardSize - 1;

    const htSettings = {
        size: settings.size,
        showGrid: true,
        gridColor: 'grey',
        gridFill: 'lightyellow',
        height: rows,
        width: cols,
        language: ''
    };

    // const center = settings.boardSize - 1;
    const gu = new GrafUtils(settings.size);

    const players = board.players;

    const extra: ExtraElement[] = [];
    players.forEach((player) => {
        const p = player.position;
        const hex = new HexData(p.col, p.row, gu);
        const pMiddle = hex.middles()[p.orientation];
        extra.push(new ExtraElement(p.row, p.col, <circle key="player" cx={pMiddle.x} cy={pMiddle.y} r={5} fill={player.color} />));
    })

    const buildPlayerMove = (playerColor: string, column: number, row: number, from: PlayerOrientation, to: PlayerOrientation) => {
        const hex = new HexData(column, row, gu);
        const formula = `${from}${to}`;
        return hex.showTruchetTile(formula, getArcBuilder(playerColor), getLineBuilder(playerColor));
    }

    const getArcBuilder = (strokeColor: string) => {
        return function buildSvgArc(id: string, m1: Point, center: Point, m2: Point): JSX.Element {
            return <path key={id} stroke={strokeColor} strokeWidth="5" fill="none"
                d={`M${m1.x} ${m1.y} Q${center.x} ${center.y} ${m2.x} ${m2.y}`} />;
        }
    }

    const getLineBuilder = (strokeColor: string) => {
        return function buildSvgLine(id: string, m1: Point, m2: Point): JSX.Element {
            return <line key={id} stroke={strokeColor} strokeWidth="5"
                x1={m1.x} y1={m1.y} x2={m2.x} y2={m2.y} />;
        }
    }

    const findExtra = (row: number, col: number): JSX.Element[] => {
        return extra.filter(e => e.row === row && e.col === col).map(e => e.element);
    }

    players.forEach((player) => {
        player.moves.forEach((m) => {
            const svgElements = buildPlayerMove(player.color, m.col, m.row, m.from, m.to);
            svgElements.forEach(s => extra.push(new ExtraElement(m.row, m.col, s)));
        });
    });

    const hexMeta: HexMeta = HexagonBoardGenerator.generateBoard(settings.boardSize, board.tilesOnBoard);

    const playMeta = {
        ...hexMeta,
        renderMode(row: number, col: number) {
            if (row === 0 && col === 0) {
                // special case
                return RenderMode.Visible;
            }
            return hexMeta.renderMode(row, col);
        },
        truchetCode(row: number, col: number) {
            if (row === 0 && col === 0) {
                // special case
                return TruchetCode.TFull;
            }
            return hexMeta.truchetCode(row, col);
        },
        extra: (row: number, col: number) => { return findExtra(row, col); }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const eValue = event.target.value;
        console.log(`Next tile: ${eValue}`);
        setTileCode(eValue);
    }

    const handleNextStep = (): void => {
        const code = truchetCode(tileCode);
        if (code && code !== TruchetCode.TEmpty) {
            console.log(`Next step: ${code}`);
            onBoardChange(BoardAction.Step, code);
        }
    }

    return (
        <div>
            {preview && <HexTruchetGridComponent htSettings={htSettings} hexMeta={hexMeta} />}
            {!preview &&
                <div>
                    tiles on board: {Object.keys(board.tilesOnBoard).length}
                    {board.players.map((p, i) => ` |  Player ${i + 1}: ${p.position.row}:${p.position.col} ${p.position.orientation} `)}
                    <input type="text" maxLength={1} onChange={handleInputChange} className='ifDimensions mr-4 ml-4' />
                    <button onClick={handleNextStep}> Next step</button>
                    <button onClick={() => onBoardChange(BoardAction.Finish)}>Finish</button>
                    <HexTruchetGridComponent htSettings={htSettings} hexMeta={playMeta} />
                </div>}
        </div>
    );
};

class ExtraElement {
    constructor(public row: number, public col: number, public element: JSX.Element) { }
}

export default VojagoBoardComponent;