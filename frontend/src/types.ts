/**
 * Enum representing possible states of a game.
 *
 * This enum defines various states that a game can be in during its execution.
 */
export enum GameState {
    CONTINUE = "CONTINUE",
    WIN = "WIN",
    LOSE = "LOSE",
    DRAW = "DRAW",
    INVALID = "INVALID",
    ILLEGAL = "ILLEGAL",
    MAX_TURNS = "MAX_TURNS",
    TIMEOUT = "TIMEOUT",
}
