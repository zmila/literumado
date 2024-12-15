import { HexTruchetSettings } from '@/types/HexTruchetSettings';
import React from 'react';

interface HexTruchetSettingsComponentProps {
    htSettings: HexTruchetSettings;
    onChanged: (controlName: keyof HexTruchetSettings, controlValue: any) => void;
}

const HexTruchetSettingsComponent: React.FC<HexTruchetSettingsComponentProps> = ({ htSettings, onChanged }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;
        const controlValue = type === 'checkbox' ? event.target.checked : Number(value);
        onChanged(name as keyof HexTruchetSettings, controlValue);
    };

    return (
        <div id="htSettings" className="flex items-center">
            <label className="mr-4">
                Show Grid:
                <input type="checkbox" className="ifCheck" name="showGrid" checked={htSettings.showGrid} onChange={handleChange} />
            </label>
            <label className="mr-4">
                Height:
                <input type="number" className="ifDimensions" name="height" value={htSettings.height} onChange={handleChange} />
            </label>
            <label className="mr-4">
                Width:
                <input type="number" className="ifDimensions" name="width" value={htSettings.width} onChange={handleChange} />
            </label>
            <label className="mr-4">
                Size:
                <input type="number" className="ifDimensions" name="size" value={htSettings.size} onChange={handleChange} />
            </label>
        </div>
    );
};

export default HexTruchetSettingsComponent;