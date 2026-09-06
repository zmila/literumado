import {TruchetCode} from "../common/HexTypes";
import {PlayerPosition} from "./VojagoCommon";

export const log = {
    messages: [] as string[],

    info: (...messages: unknown[]): void => {
        const message = `[${timeString()}] ${messages.map(String).join(" ")}`;
        log.messages.push(message);
        console.info(message);
    },

    clear: (): void => {
        log.messages.length = 0;
    },

    dump: (): string => {
        const dump = log.messages.join("\n");
        console.info(dump);
        return dump;
    },
};

export const playerName = (player: {color: string}): string => {
    return player.color.charAt(0).toUpperCase() + player.color.slice(1);
};

export const tileName = (tile: TruchetCode): string => {
    switch (tile) {
        case TruchetCode.TUp: return "TUp";
        case TruchetCode.TDn: return "TDn";
        case TruchetCode.TStar: return "TStar";
        case TruchetCode.TL: return "TL";
        case TruchetCode.TR: return "TR";
        case TruchetCode.TFull: return "TFull";
        case TruchetCode.TEmpty: return "TEmpty";
        default: return `T${tile}`;
    }
};

export const formatPosition = (position: PlayerPosition): string => {
    return `(${position.row}:${position.col} ${position.orientation})`;
};

export const timeString = (): string => {
    return new Date().toLocaleTimeString("en-GB", {hour12: false});
};
