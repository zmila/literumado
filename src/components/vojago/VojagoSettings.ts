export enum VojagoBoardType {
    Hexagon = "hexagon",
    Square = "square"
}

export interface VojagoSettings {
    size: number, // size of a hexagon edge. not editable
    boardSize: number, // number of hexagons 
    boardType: VojagoBoardType,
};

