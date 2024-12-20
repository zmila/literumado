import { VojagoSettings } from '@/components/vojago/VojagoSettings';
import React from 'react';
import { VojagoBoard } from './VojagoBoard';

interface VojagoResultComponentProps {
    settings: VojagoSettings;
    board: VojagoBoard;
}

const VojagoResultComponent: React.FC<VojagoResultComponentProps> = ({ settings, board }) => {

    return (
        <div>
            game result: {settings.boardSize} <br /> {board.playerName} {board.currentStep}<br />
        </div>
    );
};

export default VojagoResultComponent;