export interface HexMeta {
    renderMode(row: number, col: number): RenderMode;
    truchetCode(row: number, col: number): TruchetCode;
}

export enum RenderMode {
    Visible = 'visible',
    Hidden = 'hidden',
};


export enum TruchetCode {
    TEmpty = " ",
    TSp1 = "_",
    TSp2 = "^",
    TStar = "*",
    TL = "\\",
    TR = "/",
    T0 = "0",
    T1 = "1",
    T2 = "2",
    T3 = "3",
    T4 = "4",
    T5 = "5",
    T6 = "6",
    T7 = "7",
    T8 = "8",
    T9 = "9",
    TFull = "#",
};

