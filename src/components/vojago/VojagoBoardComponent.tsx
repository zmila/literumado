import {VojagoSettings} from '@/components/vojago/VojagoSettings';
import React, {JSX} from 'react';
import {HexMeta, Point, RenderMode, TruchetCode} from "../common/HexTypes";
import GrafUtils from '../hextruchet/GrafUtils';
import {HexData} from '../hextruchet/HexData';
import HexTruchetGridComponent from '../hextruchet/HexTruchetGridComponent';
import {BoardAction, GameState, PlayerOrientation, VojagoBoard} from "./VojagoCommon";
import {VojagoGameUtils} from './VojagoGameUtils';
import {log, playerName, tileName} from './VojagoLog';

interface VojagoBoardComponentProps {
    gameState: GameState;
    settings: VojagoSettings;
    board: VojagoBoard;
    hexMeta: HexMeta;
    onBoardAction: (action: BoardAction, tile?: TruchetCode | string) => void;
}

const VojagoBoardComponent: React.FC<VojagoBoardComponentProps> = ({gameState, settings, board, hexMeta, onBoardAction: onBoardChange}) => {

    const [nextTile, setNextTile] = React.useState<TruchetCode | null>(null);

    const handleControlTileClick = (): void => {
        if (nextTile === null) {
            // First click: generate and preview a random tile
            const selectedTile = VojagoGameUtils.getRandomTile();
            setNextTile(selectedTile);
            log.info(`${playerName(board.players[board.currentPlayer])} player selected tile ${tileName(selectedTile)}.`);
        } else {
            // Second click: commit the rotated tile and reset
            onBoardChange(BoardAction.Step, nextTile);
            setNextTile(null);
        }
    }

    const handleRotateCCW = (): void => {
        const rotatedTile = VojagoGameUtils.rotateTileCounterClockwise(nextTile!);
        setNextTile(rotatedTile);
        log.info(`${playerName(board.players[board.currentPlayer])} player rotated CCW: ${tileName(nextTile!)} --> ${tileName(rotatedTile)}`);
    };

    const handleRotateCW = (): void => {
        const rotatedTile = VojagoGameUtils.rotateTileClockwise(nextTile!);
        setNextTile(rotatedTile);
        log.info(`${playerName(board.players[board.currentPlayer])} player rotated CW: ${tileName(nextTile!)} --> ${tileName(rotatedTile)}`);
    };

    const buildPlayerMove = (playerColor: string, column: number, row: number, from: PlayerOrientation, to: PlayerOrientation) => {
        const hex = new HexData(column, row, gu);
        const formula = `${from}${to}`;
        return hex.showTruchetTile(formula, getArcBuilder(playerColor), getLineBuilder(playerColor));
    }

    const getArcBuilder = (strokeColor: string) => {
        return function buildSvgArc(id: string, m1: Point, center: Point, m2: Point): JSX.Element {
            return <path key={id} stroke={strokeColor} strokeWidth="5" fill="none"
                         d={`M${m1.x} ${m1.y} Q${center.x} ${center.y} ${m2.x} ${m2.y}`}/>;
        }
    }

    const getLineBuilder = (strokeColor: string) => {
        return function buildSvgLine(id: string, m1: Point, m2: Point): JSX.Element {
            return <line key={id} stroke={strokeColor} strokeWidth="5"
                         x1={m1.x} y1={m1.y} x2={m2.x} y2={m2.y}/>;
        }
    }

    const arrowButton = (handleRotateCW: () => void, arrowX: number, arrowY: number, gu: GrafUtils, color: string, body: string): JSX.Element => {
        return <g key={`rotate${body}`} onClick={handleRotateCW} style={{ cursor: 'pointer' }}>
            <circle cx={arrowX} cy={arrowY} r={gu.size * 0.8} fill="transparent" />
            <text
                x={arrowX}
                y={arrowY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="24"
                fill={color}
                fontWeight="bold"
                pointerEvents="none"
            >
                {body}
            </text>
        </g>;
    }

    const findExtra = (row: number, col: number): JSX.Element[] => {
        return extra.filter(e => e.row === row && e.col === col).map(e => e.element);
    }

    const htSettings = {
        size: settings.size,
        showGrid: true,
        showCoord: false,
        gridColor: 'grey',
        gridFill: 'lightyellow',
        tileColor: 'blue',
        tileFill: 'cornsilk', // 'ivory', 'beige'
        height: 2 * settings.boardSize - 1,
        width: 2 * settings.boardSize - 1,
        language: ''
    };

    // const center = settings.boardSize - 1;
    const gu = new GrafUtils(settings.size);

    const extra: ExtraElement[] = [];

    if (gameState === GameState.Playing) {
        const controlHex = new HexData(0, 0, gu);
        const currentPlayerColor = board.players[board.currentPlayer].color;

        if (nextTile === null) {
            const coloredFullTile = controlHex.showTruchetTile(
                GrafUtils.getFormula(TruchetCode.TFull),
                getArcBuilder(currentPlayerColor),
                getLineBuilder(currentPlayerColor)
            );
            coloredFullTile.forEach(element => extra.push(new ExtraElement(0, 0, element)));
        }

        const corners = controlHex.corners();
        const controlTileOverlay = (
            <polygon
                key="controlTileOverlay"
                points={corners.map(c => `${c.x},${c.y}`).join(' ')}
                fill="transparent"
                onClick={handleControlTileClick}
                style={{ cursor: 'pointer' }}
            />
        );
        extra.push(new ExtraElement(0, 0, controlTileOverlay));

        // Render rotation control buttons when preview is active
        if (nextTile !== null) {
            const controlCenter = controlHex.center();
            const hexHeight = gu.hexH;
            
            // Position left arrow (↻) below and to the left of control tile
            const leftArrowX = controlCenter.x - gu.hexW / 3;
            const leftArrowY = controlCenter.y + hexHeight * 0.75;
            const rotateCWButton = arrowButton(handleRotateCW, leftArrowX, leftArrowY, gu, currentPlayerColor, '↻');
            extra.push(new ExtraElement(0, 0, rotateCWButton));

            // Position right arrow (↺) below and to the right of control tile
            const rightArrowX = controlCenter.x + gu.hexW / 3;
            const rightArrowY = controlCenter.y + hexHeight * 0.75;
            const rotateCCWButton = arrowButton(handleRotateCCW, rightArrowX, rightArrowY, gu, currentPlayerColor, '↺');
            extra.push(new ExtraElement(0, 0, rotateCCWButton));
        }
    }

    board.players.forEach((player) => {
        const p = player.position;
        const hex = new HexData(p.col, p.row, gu);
        const pMiddle = hex.middles()[p.orientation];
        extra.push(new ExtraElement(p.row, p.col, <circle key={`player${player.color}`} cx={pMiddle.x} cy={pMiddle.y} r={5} fill={player.color}/>));
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
                // Apply rotation to preview tile
                if (nextTile !== null) {
                    return nextTile;
                }
                return TruchetCode.TFull;
            }
            return hexMeta.truchetCode(row, col);
        },
        extra: (row: number, col: number) => {
            return findExtra(row, col);
        }
    };

    return (
        <div>
            {gameState === GameState.Settings && <HexTruchetGridComponent htSettings={htSettings} hexMeta={hexMeta}/>}

            {gameState === GameState.Playing &&
                <div>
                    <div style={{color: board.players[board.currentPlayer].color}}>
                        <div>Player {board.currentPlayer + 1} ({board.players[board.currentPlayer].color})</div>
                        <div>Click the colored Full tile to draw a random tile. Use arrows to rotate, then click again to play.</div>
                    </div>
                    {/* {board.players.map((p, i) => ` Player ${i + 1} = (${p.position.row}:${p.position.col} ${p.position.orientation}) `)} */}
                    <HexTruchetGridComponent htSettings={htSettings} hexMeta={playMeta}/>
                </div>}

            {gameState === GameState.Finished &&
                <div>
                    <HexTruchetGridComponent htSettings={htSettings} hexMeta={playMeta}/>
                </div>}
        </div>
    );
};

class ExtraElement {
    constructor(public row: number, public col: number, public element: JSX.Element) {
    }
}

export default VojagoBoardComponent;

