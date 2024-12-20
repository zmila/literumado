import { VojagoBoard } from '@/components/vojago/VojagoBoard';
import VojagoBoardComponent from '@/components/vojago/VojagoBoardComponent';
import { BoardAction } from '@/components/vojago/VojagoCommon';
import VojagoResultComponent from '@/components/vojago/VojagoResultComponent';
import { VojagoSettings } from '@/components/vojago/VojagoSettings';
import VojagoSettingsComponent from '@/components/vojago/VojagoSettingsComponent';
import React, { useState } from 'react';


enum GameState {
    Settings = "settings",
    Playing = "playing",
    Finished = "finished"
}

const VojagoComponent: React.FC = () => {

    const [gameState, setGameState] = useState<GameState>(GameState.Settings);

    const [vojagoSettings, setVojagoSettings] = useState<VojagoSettings>({
        size: 30,
        boardSize: 5,
    } as VojagoSettings);

    const [board, setBoard] = useState<VojagoBoard>({
        onePlayer: true,
        currentStep: 0,
        playerName: "Player 1",
    });

    const handleSettingsChanged = (newSettings: VojagoSettings) => {
        if (newSettings.boardSize <= 1) {
            newSettings.boardSize = 2;
        }
        setVojagoSettings(newSettings);
    }

    const handleBoardAction = (action: BoardAction /* TODO add step data */) => {

        switch (action) {
            case BoardAction.Step:
                // TODO add step data instead of just incrementing
                setBoard((prevBoard) => { return { ...prevBoard, currentStep: prevBoard.currentStep + 1 }; });
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
        setBoard((prevBoard) => { return { ...prevBoard, currentStep: 0 }; });
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

export default VojagoComponent;
