import { VojagoSettings } from '@/components/vojago/VojagoSettings';
import React from 'react';
import { HexMeta } from '../common/HexMeta';
import HexTruchetGridComponent from '../hextruchet/HexTruchetGridComponent';
import { HexagonBoardGenerator } from './HexagonBoardGenerator';
import { VojagoBoard } from './VojagoBoard';
import { BoardAction } from './VojagoCommon';

interface VojagoBoardComponentProps {
    preview: boolean;
    settings: VojagoSettings;
    board: VojagoBoard;
    onBoardAction: (action: BoardAction) => void;
}

const VojagoBoardComponent: React.FC<VojagoBoardComponentProps> = ({ preview, settings, board, onBoardAction: onBoardChange }) => {

    const hexMeta: HexMeta = new HexagonBoardGenerator().generateBoard(settings.boardSize);
    const rows = 2 * settings.boardSize - 1;
    const cols = 2 * settings.boardSize - 1;

    const htSettings = {
        size: settings.size,
        showGrid: true,
        height: rows,
        width: cols,
        language: ''
    };

    return (
        <div>
            {preview && <HexTruchetGridComponent htSettings={htSettings} hexMeta={hexMeta} />}
            {!preview &&
                <div>
                    {board.playerName} {board.currentStep}<br />
                    <button onClick={() => onBoardChange(BoardAction.Step)}>Next step</button>
                    <button onClick={() => onBoardChange(BoardAction.Finish)}>Finish</button>
                    <HexTruchetGridComponent htSettings={htSettings} hexMeta={hexMeta} />
                </div>}
        </div>
    );
};

export default VojagoBoardComponent;