import { VojagoSettings } from '@/components/vojago/VojagoSettings';
import React, { ChangeEvent } from 'react';
import { HexMeta, Point, RenderMode, truchetCode, TruchetCode } from "../common/HexTypes";
import GrafUtils from '../hextruchet/GrafUtils';
import { HexData } from '../hextruchet/HexData';
import HexTruchetGridComponent from '../hextruchet/HexTruchetGridComponent';
import { BoardAction, GameState, PlayerOrientation, VojagoBoard } from "./VojagoCommon";

interface VojagoBoardComponentProps {
    gameState: GameState;
    settings: VojagoSettings;
    board: VojagoBoard;
    hexMeta: HexMeta;
    onBoardAction: (action: BoardAction, tile?: TruchetCode | string) => void;
}

const VojagoBoardComponent: React.FC<VojagoBoardComponentProps> = ({ gameState, settings, board, hexMeta, onBoardAction: onBoardChange }) => {

    const [tileCode, setTileCode] = React.useState<string>('');

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

    const htSettings = {
        size: settings.size,
        showGrid: true,
        showCoord: true,
        gridColor: 'grey',
        gridFill: 'lightyellow',
        height: 2 * settings.boardSize - 1,
        width: 2 * settings.boardSize - 1,
        language: ''
    };

    // const center = settings.boardSize - 1;
    const gu = new GrafUtils(settings.size);

    const extra: ExtraElement[] = [];
    board.players.forEach((player) => {
        const p = player.position;
        const hex = new HexData(p.col, p.row, gu);
        const pMiddle = hex.middles()[p.orientation];
        extra.push(new ExtraElement(p.row, p.col, <circle key="player" cx={pMiddle.x} cy={pMiddle.y} r={5} fill={player.color} />));
    })

    board.players.forEach((player) => {
        player.moves.forEach((m) => {
            const svgElements = buildPlayerMove(player.color, m.col, m.row, m.from, m.to);
            svgElements.forEach(s => extra.push(new ExtraElement(m.row, m.col, s)));
        });
    });

    const playMeta = {
        ...hexMeta,
        renderMode(row: number, col: number) {
            if (row === 0 && col === 0) {
                return RenderMode.Visible;
            }
            return hexMeta.renderMode(row, col);
        },
        truchetCode(row: number, col: number) {
            if (row === 0 && col === 0) {
                return TruchetCode.TFull;
            }
            return hexMeta.truchetCode(row, col);
        },
        extra: (row: number, col: number) => { return findExtra(row, col); }
    };

    return (
        <div>
            {gameState === GameState.Settings && <HexTruchetGridComponent htSettings={htSettings} hexMeta={hexMeta} />}

            {gameState === GameState.Playing &&
                <div>
                    <span style={{ color: board.players[board.currentPlayer].color }}>currentPlayer: {board.currentPlayer + 1}</span>
                    {board.players.map((p, i) => ` Player ${i + 1} = (${p.position.row}:${p.position.col} ${p.position.orientation}) `)}
                    <input type="text" maxLength={1} onChange={handleInputChange} className='ifDimensions mr-4 ml-4' />
                    <button onClick={handleNextStep}> Next step</button>
                    <HexTruchetGridComponent htSettings={htSettings} hexMeta={playMeta} />
                </div>}

            {gameState === GameState.Finished &&
                <div>
                    <HexTruchetGridComponent htSettings={htSettings} hexMeta={playMeta} />
                </div>}
        </div>
    );
};

class ExtraElement {
    constructor(public row: number, public col: number, public element: JSX.Element) { }
}

export default VojagoBoardComponent;