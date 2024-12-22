import { VojagoSettings } from '@/components/vojago/VojagoSettings';
import React from 'react';
import { VojagoBoard } from "./VojagoCommon";

interface VojagoResultComponentProps {
    settings: VojagoSettings;
    board: VojagoBoard;
}

const VojagoResultComponent: React.FC<VojagoResultComponentProps> = ({ settings, board }) => {

    return (
        <div>
            game result: {settings.boardSize} <br /> player: {board.currentPlayer} 
        </div>
    );
};

export default VojagoResultComponent;