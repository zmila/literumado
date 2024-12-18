import React from "react";
import { VojagoBoardType, VojagoSettings } from "./VojagoSettings";

interface VojagoSettingsProps {
    settings: VojagoSettings;
    onSettingsChange: (newSettings: VojagoSettings) => void;
}

const VojagoSettingsComponent: React.FC<VojagoSettingsProps> = ({
    settings,
    onSettingsChange,
}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;
        let controlValue;
        switch (type) {
            case 'number':
                controlValue = parseInt(value);
                break;
            case 'checkbox':
                controlValue = event.target.checked;
                break;
            case 'radio':
                controlValue = value;
                break;
            default:
                console.warn(`Unhandled input type: ${type}`);
                return;
        }
        onSettingsChange({ ...settings, [name as keyof VojagoSettings]: controlValue });
    };

    return (
        <div id="settings" className="flex items-center" style={{ border: "1px solid green" }}>
            {/* <label className="mr-4">
            Show Grid:
            <input type="checkbox" className="ifCheck" name="showGrid" checked={settings.showGrid} onChange={handleChange} />
            </label> */}
            <label className="mr-4">
                Board type:
                <input
                    type="radio" radioGroup='boardType' name='boardType' className="mr-4 ml-4" onChange={handleChange}
                    value="hexagon" checked={settings.boardType === VojagoBoardType.Hexagon} />
                Hexagon
            </label>
            <label className="mr-4">
                <input
                    type="radio" radioGroup='boardType' name='boardType' className="mr-4" onChange={handleChange}
                    value="square" checked={settings.boardType === VojagoBoardType.Square} />
                Square
            </label>
            <label className="mrl-4">
                Size:
                <input type="number" className="ifDimensions" name="boardSize" value={settings.boardSize} onChange={handleChange} />
            </label>
        </div>
    );
};

export default VojagoSettingsComponent;
