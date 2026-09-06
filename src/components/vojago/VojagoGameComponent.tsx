import VojagoBoardComponent from '@/components/vojago/VojagoBoardComponent';
import { BoardAction, PlayerMove, PlayerOrientation, PlayerPosition } from '@/components/vojago/VojagoCommon';
import { VojagoSettings } from '@/components/vojago/VojagoSettings';
import VojagoSettingsComponent from '@/components/vojago/VojagoSettingsComponent';
import React, { useState } from 'react';
import { HexMeta, TruchetCode } from "../common/HexTypes";
import { HexagonBoardGenerator } from "./HexagonBoardGenerator";
import { GameState, PlayerInfo, VojagoBoard } from "./VojagoCommon";
import { VojagoGameUtils as utils } from './VojagoGameUtils';
import {formatPosition, log, playerName, tileName} from './VojagoLog';

const VojagoGameComponent: React.FC = () => {

    const handleSettingsChanged = (newSettings: VojagoSettings) => {
        if (newSettings.boardSize <= 1) {
            newSettings.boardSize = 2;
        }
        setVojagoSettings(newSettings);
    }

    const moveOverTile = (currPlayer: PlayerInfo, tile: TruchetCode, movePath: PlayerPosition[]): string | null => {
        const currPos = currPlayer.position;
        const nextOr = utils.calculateNextOrientation(currPlayer, tile);
        currPlayer.moves.push(new PlayerMove(currPos.row, currPos.col, currPos.orientation, nextOr));
        currPlayer.position = utils.calculateNextPosition(currPos, nextOr)!;

        const nextPos = currPlayer.position;
        movePath.push(new PlayerPosition(nextPos.row, nextPos.col, nextPos.orientation));
        const collided = utils.playersCollided(board, currPos, nextOr);
        if (collided) {
            // collided with other player --> finish game, lost.
            return `${playerName(currPlayer)} player lost due to a collision with ${playerName(collided)} player`;
            // TODO check if players > 2, then these two lost, other may continue
        }

        if (utils.isOutOfBoard(nextPos, maxColumns, hexMeta)) {
            // go out of board --> finish game
            return `${playerName(currPlayer)} player lost due to moving off the board`;
        }

        const nextTile = utils.getTileAtPos(nextPos, board.tilesOnBoard);
        if (nextTile) {
            // enter an existing tile --> repeat the move thru the next tile
            return moveOverTile(currPlayer, nextTile, movePath);
        }

        // enter an empty tile, it's safe to continue
        return null;
    }

    const handleBoardStep = (tile: TruchetCode) => {
        const currPlayer = board.players[board.currentPlayer];
        const currPos = currPlayer.position;
        const newTilesOnBoard = { ...board.tilesOnBoard, [utils.key(currPos.row, currPos.col)]: tile };
        const movePath = [new PlayerPosition(currPos.row, currPos.col, currPos.orientation)];

        const moveResult = moveOverTile(currPlayer, tile, movePath);
        log.info(`${playerName(currPlayer)} player put tile ${tileName(tile)} and moves to ${movePath.slice(1).map(formatPosition).join(" to ")}`);
        if (moveResult) {
            setGameResult(moveResult);
            log.info(moveResult);
            log.info("Game ended.");
            log.dump();
            // TODO deactivate players that lost
            // set finished when active player is only one or none
            setGameState(GameState.Finished);
        } else {
            // other players on this tile
            const otherPlayers = utils.getOtherPlayers(board).filter(p => p.position.row === currPos.row && p.position.col === currPos.col);
            otherPlayers.forEach(op => {
                const moveResult = moveOverTile(op, tile, [new PlayerPosition(op.position.row, op.position.col, op.position.orientation)]);
                if (moveResult) {
                    setGameResult(moveResult);
                    setGameState(GameState.Finished);
                    log.info(moveResult);
                    log.info("Game ended.");
                    log.dump();
                }
            });
        }

        // "Player {name} won because the other players collided with each other."

        setBoard({
            ...board,
            currentPlayer: (board.currentPlayer + 1) % board.playersCount,
            players: board.players,
            tilesOnBoard: newTilesOnBoard,
        });
    }

    const handleBoardAction = (action: BoardAction, stepData?: TruchetCode | string) => {
        switch (action) {
            case BoardAction.Step:
                if (stepData) {
                    handleBoardStep(stepData as TruchetCode);
                }
                break;
            case BoardAction.Finish:
                setGameResult(stepData as string);
                setGameState(GameState.Finished);
                break;
            case BoardAction.Cancel:
                resetBoard();
                setGameState(GameState.Settings);
                break;
        }
    }

    const startGame = () => {
        if (gameState === GameState.Settings) {
            log.clear();
            resetBoard();
            setGameState(GameState.Playing);
            log.info(`Game started. Board size: ${vojagoSettings.boardSize}. ${playerName(emptyBoard.players[1])} player position ${formatPosition(emptyBoard.players[1].position)}. ${playerName(emptyBoard.players[0])} player position ${formatPosition(emptyBoard.players[0].position)}.`);
        }
    }

    const cancelGame = () => {
        if (gameState === GameState.Playing) {
            resetBoard();
            setGameState(GameState.Settings);
        }
    }

    const newGame = () => {
        if (gameState === GameState.Finished) {
            log.info("Game cancelled");
            log.dump();
            resetBoard();
            setGameState(GameState.Settings);
        }
    }

    const resetBoard = () => {
        setBoard(emptyBoard);
    }

    const [gameState, setGameState] = useState<GameState>(GameState.Settings);
    const [gameResult, setGameResult] = useState<string>("");

    const [vojagoSettings, setVojagoSettings] = useState<VojagoSettings>({
        size: 30,
        boardSize: 5,
        playersCount: 2,
    } as VojagoSettings);

    const center = vojagoSettings.boardSize - 1;
    const maxColumns = 2 * vojagoSettings.boardSize - 1;

    const emptyBoard = {
        playersCount: vojagoSettings.playersCount,
        currentPlayer: 0,
        tilesOnBoard: {},
        players: [
            new PlayerInfo("green", new PlayerPosition(center, 0, PlayerOrientation.P3), []),
            new PlayerInfo("red", new PlayerPosition(center, maxColumns - 1, PlayerOrientation.P0), []),
        ],
    };

    const [board, setBoard] = useState<VojagoBoard>(emptyBoard);
    const hexMeta: HexMeta = HexagonBoardGenerator.generateBoard(vojagoSettings.boardSize, board.tilesOnBoard);

    return (
        <>
            <div className="text-lg">Vojago - game. <a href="vojago/rules.html">View rules</a>. </div>

            {gameState === GameState.Settings &&
                <div>
                    <VojagoSettingsComponent settings={vojagoSettings} onSettingsChange={handleSettingsChanged} />
                    <button onClick={startGame}>Start game</button>
                    <VojagoBoardComponent gameState={gameState} settings={vojagoSettings} board={board} hexMeta={hexMeta} onBoardAction={handleBoardAction} />
                </div>}

            {gameState === GameState.Playing &&
                <div>
                    <button onClick={cancelGame}>Cancel</button>
                    <VojagoBoardComponent gameState={gameState} settings={vojagoSettings} board={board} hexMeta={hexMeta} onBoardAction={handleBoardAction} />
                </div>}

            {gameState === GameState.Finished &&
                <div>
                    <button onClick={newGame}>New Game</button> <br />
                    <h2 style={{ padding: '.3em .5em' }}>game result: {gameResult}</h2>
                    <VojagoBoardComponent gameState={gameState} settings={vojagoSettings} board={board} hexMeta={hexMeta} onBoardAction={handleBoardAction} />
                </div>}
        </>
    );
};


export default VojagoGameComponent;
