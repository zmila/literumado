import { VojagoSettings } from '@/components/vojago/VojagoSettings';
import React from 'react';
import { VojagoBoard } from './VojagoBoard';

interface VojagoResultComponentProps {
    settings: VojagoSettings;
    board: VojagoBoard;
}

const VojagoResultComponent: React.FC<VojagoResultComponentProps> = ({ settings, board }) => {

    return (
        <div style={{ border: "1px solid blue" }}>
            game result: {settings.boardSize} {settings.boardType}; <br /> {board.playerName} {board.currentStep}<br />
        </div>
    );
};

export default VojagoResultComponent;