import { VojagoSettings } from '@/components/vojago/VojagoSettings';
import React from 'react';
import { VojagoBoard } from './VojagoBoard';
import { BoardAction } from './VojagoCommon';

interface VojagoBoardComponentProps {
    preview: boolean;
    settings: VojagoSettings;
    board: VojagoBoard;
    onBoardAction: (action: BoardAction) => void;
}

const VojagoBoardComponent: React.FC<VojagoBoardComponentProps> = ({ preview, settings, board, onBoardAction: onBoardChange }) => {

    return (
        <div style={{ border: "1px solid yellow" }}>
            game board: {settings.boardSize} {settings.boardType};
            {!preview &&
                <div>
                    {board.playerName} {board.currentStep}<br />

                    <button onClick={() => onBoardChange(BoardAction.Step)}>Next step</button>
                    <button onClick={() => onBoardChange(BoardAction.Finish)}>Finish</button>
                </div>}
        </div>
    );
};

export default VojagoBoardComponent;