import React from "react";
import { VojagoSettings } from "./VojagoSettings";

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
        <div id="settings" className="flex items-center" >
            {/* <label className="mr-4">
            Show Grid:
            <input type="checkbox" className="ifCheck" name="showGrid" checked={settings.showGrid} onChange={handleChange} />
            </label> */}
            <label className="mrl-4">
                Size:
                <input type="number" className="ifDimensions" name="boardSize" value={settings.boardSize} onChange={handleChange} />
            </label>
        </div>
    );
};

export default VojagoSettingsComponent;
