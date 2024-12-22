import { TruchetCode } from "../common/HexTypes";
import { PlayerInfo, VojagoBoard } from "./VojagoCommon";
import VojagoBoardComponent from '@/components/vojago/VojagoBoardComponent';
import { BoardAction, PlayerMove, PlayerOrientation, PlayerPosition } from '@/components/vojago/VojagoCommon';
import VojagoResultComponent from '@/components/vojago/VojagoResultComponent';
import { VojagoSettings } from '@/components/vojago/VojagoSettings';
import VojagoSettingsComponent from '@/components/vojago/VojagoSettingsComponent';
import React, { useState } from 'react';
import GrafUtils from '../hextruchet/GrafUtils';


enum GameState {
    Settings = "settings",
    Playing = "playing",
    Finished = "finished"
}

const VojagoGameComponent: React.FC = () => {

    const [gameState, setGameState] = useState<GameState>(GameState.Settings);

    const [vojagoSettings, setVojagoSettings] = useState<VojagoSettings>({
        size: 30,
        boardSize: 5,
    } as VojagoSettings);

    const key = (row: number, col: number) => {
        return `${row}:${col}`;
    }
    const center = vojagoSettings.boardSize - 1;
    const cols = 2 * vojagoSettings.boardSize - 1;

    const emptyBoard = {
        playersCount: 2,
        currentPlayer: 0,
        tilesOnBoard: {},
        players: [
            new PlayerInfo("Player1", "green", new PlayerPosition(center, 0, PlayerOrientation.P3), []),
            new PlayerInfo("Player2", "red", new PlayerPosition(center, cols - 1, PlayerOrientation.P0), []),
        ],
    };

    const [board, setBoard] = useState<VojagoBoard>(emptyBoard);

    const handleSettingsChanged = (newSettings: VojagoSettings) => {
        if (newSettings.boardSize <= 1) {
            newSettings.boardSize = 2;
        }
        setVojagoSettings(newSettings);
    }

    const calculateNextOrientation = (player: PlayerInfo, tile: TruchetCode) => {
        const currPos = player.position;
        const formula = GrafUtils.getFormula(tile);
        const f = currPos.orientation.valueOf().toString();
        const pair = formula.split(" ").find((p) => p.startsWith(f) || p.endsWith(f))!;
        return parseInt(pair.startsWith(f) ? pair[1] : pair[0]);
    }

    const calculateNextPosition = (position: PlayerPosition, to: number) => {
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

    const handleBoardStep = (tile: TruchetCode) => {

        console.log("handleBoardStep", tile);

        const currPlayer = board.players[board.currentPlayer];
        const currPos = currPlayer.position;
        const nextOr = calculateNextOrientation(currPlayer, tile);
        currPlayer.moves.push(new PlayerMove(currPos.row, currPos.col, currPos.orientation, nextOr));
        currPlayer.position = calculateNextPosition(currPos, nextOr)!;

        setBoard({
            ...board,
            currentPlayer: (board.currentPlayer + 1) % board.playersCount,
            players: board.players,
            tilesOnBoard: { ...board.tilesOnBoard, [key(currPos.row, currPos.col)]: tile },
        });
    }

    const handleBoardAction = (action: BoardAction, tile?: TruchetCode) => {
        switch (action) {
            case BoardAction.Step:
                if (tile) {
                    handleBoardStep(tile);
                }
                break;
            case BoardAction.Finish:
                // TODO show results
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
            resetBoard();
            setGameState(GameState.Playing);
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
            resetBoard();
            setGameState(GameState.Settings);
        }
    }

    const resetBoard = () => {
        setBoard(emptyBoard);
    }

    return (
        <>
            <div className="text-lg">Vojago - game. <a href="vojago/rules.html">View rules</a>. </div>

            {gameState === GameState.Settings &&
                <div>
                    <VojagoSettingsComponent settings={vojagoSettings} onSettingsChange={handleSettingsChanged} />
                    <button onClick={startGame}>Start game</button>
                    <VojagoBoardComponent preview={true} settings={vojagoSettings} board={board} onBoardAction={handleBoardAction} />
                </div>}

            {gameState === GameState.Playing &&
                <div>
                    <button onClick={cancelGame}>Cancel</button>
                    <VojagoBoardComponent preview={false} settings={vojagoSettings} board={board} onBoardAction={handleBoardAction} />
                </div>}

            {gameState === GameState.Finished &&
                <div>
                    <button onClick={newGame}>New Game</button>
                    <VojagoResultComponent settings={vojagoSettings} board={board} />
                </div>}
        </>
    );
};


export default VojagoGameComponent;

/*
[x] 0. show hexagon board 
[x] 1. show initial positions of two players
[x]    a. show player trace
2. select tile for player1 - show 5 options
3. rotate tile for player1 - left or right
4. put the tile on board
5. check player move:
    a. go out of board --> finish game (but check move of other player, it may go out of board too, then both loose)
    b. crash into other player --> finish game, both loose.
    c. safe move
6. check other player auto-move
    a. go out of board --> second player loose
    b. crash into third player --> both loose
    c. safe move
7. update board state
8. repeat from 2 for other player

    Rotate Clockwise: ↻ (U+21BB)
    Rotate Counter Clockwise: ↺ (U+21BA)
*/