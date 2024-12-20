import { VojagoSettings } from '@/components/vojago/VojagoSettings';
import React from 'react';
import { HexMeta, RenderMode, TruchetCode } from '../common/HexMeta';
import HexTruchetGridComponent from '../hextruchet/HexTruchetGridComponent';
import { VojagoBoard } from './VojagoBoard';
import { BoardAction } from './VojagoCommon';

interface VojagoBoardComponentProps {
    preview: boolean;
    settings: VojagoSettings;
    board: VojagoBoard;
    onBoardAction: (action: BoardAction) => void;
}

const VojagoBoardComponent: React.FC<VojagoBoardComponentProps> = ({ preview, settings, board, onBoardAction: onBoardChange }) => {

    const htSettings = {
        size: 30,
        showGrid: true,
        height: settings.boardSize,
        width: settings.boardSize,
        language: 'english'
    };

    const hexMeta: HexMeta = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderMode(row: number, col: number) {
            return RenderMode.Visible;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        truchetCode(row: number, col: number) {
            return TruchetCode.TEmpty;
        }
    };

    return (
        <div style={{ border: "1px solid yellow" }}>
            game board: {settings.boardSize} {settings.boardType};
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