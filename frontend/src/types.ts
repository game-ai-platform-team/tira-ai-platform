export interface GameConfig {
    file: string;
    elo: number;
}

export enum GameState {
    CONTINUE = "CONTINUE",
    WIN = "WIN",
    LOSE = "LOSE",
    DRAW = "DRAW",
    INVALID = "INVALID",
    ILLEGAL = "ILLEGAL",
    MAX_TURNS = "MAX_TURNS",
    TIMEOUT = "TIMEOUT"
}

/*
function isStringArray(data: unknown): data is string[] {
    if (!Array.isArray(data)) return false;
    return data.every((value) => isString(value));
}

function isString(value: unknown): value is string {
    return typeof value === "string" || value instanceof String;
}
*/