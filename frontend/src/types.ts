export interface ChessGameResult {
    moves: string[];
    winner: string;
}

export function isChessGameResult(data: unknown): data is ChessGameResult {
    if (!data || typeof data !== "object") return false;
    if (!("moves" in data) || !isStringArray(data.moves)) return false;
    if (!("winner" in data) || !isString(data.winner)) return false;
    return true;
}

export function parseChessGameResult(
    data: unknown,
): ChessGameResult | undefined {
    if (isChessGameResult(data)) return data;
    return undefined;
}

function isStringArray(data: unknown): data is string[] {
    if (!Array.isArray(data)) return false;
    return data.every((value) => isString(value));
}

function isString(value: unknown): value is string {
    return typeof value === "string" || value instanceof String;
}
