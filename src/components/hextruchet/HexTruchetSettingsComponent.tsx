import { HexTruchetSettings } from '@/components/hextruchet/HexTruchetSettings';
import React from 'react';

interface HexTruchetSettingsComponentProps {
    htSettings: HexTruchetSettings;
    onChanged: (controlName: keyof HexTruchetSettings, controlValue: boolean | number | string) => void;
}

const HexTruchetSettingsComponent: React.FC<HexTruchetSettingsComponentProps> = ({ htSettings, onChanged }) => {

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
        onChanged(name as keyof HexTruchetSettings, controlValue);
    };

    return (
        <div id="htSettings" className="flex items-center">
            <label className="mr-4">
                Show Grid:
                <input type="checkbox" className="ifCheck" name="showGrid" checked={htSettings.showGrid} onChange={handleChange} />
            </label>
            {/* <label className="mr-4">
                Size:
                <input type="number" className="ifDimensions" name="size" value={htSettings.size} onChange={handleChange} />
            </label> */}
            <label className="mr-4">
                Height:
                <input type="number" className="ifDimensions" name="height" value={htSettings.height} onChange={handleChange} />
            </label>
            <label className="mr-4">
                Width:
                <input type="number" className="ifDimensions" name="width" value={htSettings.width} onChange={handleChange} />
            </label>
            <label className="mr-4">
                Language:
                <input
                    type="radio" radioGroup='language' name='language' className="mr-4 ml-4" onChange={handleChange}
                    value="english" checked={htSettings.language === 'english'} />
                English
            </label>
            <label className="mr-4">
                <input
                    type="radio" radioGroup='language' name='language' className="mr-4" onChange={handleChange}
                    value="esperanto" checked={htSettings.language === 'esperanto'} />
                Esperanto
            </label>
        </div>
    );
};

export default HexTruchetSettingsComponent;