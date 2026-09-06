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

    const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        onChanged(name as keyof HexTruchetSettings, value);
    };

    return (
        <div id="htSettings" className="flex flex-wrap items-center">
            <label className="mr-4">
                Show Grid:
                <input type="checkbox" className="ifCheck" name="showGrid" checked={htSettings.showGrid} onChange={handleChange} />
            </label>
            <label className="mr-4">
                Show Coords:
                <input type="checkbox" className="ifCheck" name="showCoord" checked={htSettings.showCoord} onChange={handleChange} />
            </label>
            {/* <label className="mr-4">
                Size:
                <input type="number" className="ifDimensions" name="size" value={htSettings.size} onChange={handleChange} />
            </label> */}
            <label className="mr-4">
                Color:
                <select name="gridColor" value={htSettings.gridColor} onChange={handleColorChange} className="mr-2 ml-2">
                    <option value="grey">Grey</option>
                    <option value="black">Black</option>
                    <option value="brown">Brown</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                </select>
            </label>
            <label className="mr-4">
                Fill:
                <select name="gridFill" value={htSettings.gridFill} onChange={handleColorChange} className="mr-2 ml-2">
                    <option value="none">None</option>
                    <option value="LemonChiffon">Lemon Chiffon</option>
                    <option value="AliceBlue">AliceBlue</option>
                    <option value="Honeydew">Honeydew</option>
                    <option value="LightYellow">LightYellow</option>
                    <option value="MintCream">MintCream</option>
                    <option value="lavender">lavender</option>
                </select>
            </label>
            <label className="mr-4">
                Tile color:
                <select name="tileColor" value={htSettings.tileColor} onChange={handleColorChange} className="mr-2 ml-2">
                    <option value="grey">Grey</option>
                    <option value="black">Black</option>
                    <option value="brown">Brown</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                </select>
            </label>
            <label className="mr-4">
                Tile fill:
                <select name="tileFill" value={htSettings.tileFill ?? ""} onChange={handleColorChange} className="mr-2 ml-2">
                    <option value="">Same as grid</option>
                    <option value="LemonChiffon">Lemon Chiffon</option>
                    <option value="AliceBlue">AliceBlue</option>
                    <option value="Honeydew">Honeydew</option>
                    <option value="LightYellow">LightYellow</option>
                    <option value="MintCream">MintCream</option>
                    <option value="lavender">lavender</option>
                    <option value="seashell">seashell</option>
                    <option value="cornsilk">cornsilk</option>
                    <option value="ivory">ivory</option>
                    <option value="beige">beige</option>
                </select>
            </label>
            <label className="mr-4">
                Height:
                <input type="number" className="ifDimensions" name="height" value={htSettings.height} onChange={handleChange} />
            </label>
            <label className="mr-4">
                Width:
                <input type="number" className="ifDimensions" name="width" value={htSettings.width} onChange={handleChange} />
            </label>
            <div className="basis-full flex items-center">
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
                <label className="mr-4">
                    <input
                        type="radio" radioGroup='language' name='language' className="mr-4" onChange={handleChange}
                        value="codes" checked={htSettings.language === 'codes'} />
                    Codes (0..9 \ / * _ ^)
                </label>
            </div>
        </div>
    );
};

export default HexTruchetSettingsComponent;