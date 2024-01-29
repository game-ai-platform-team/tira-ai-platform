from enum import Enum


class GameState(Enum):
    CONTINUE = 0
    WIN = 1
    LOSE = 2
    DRAW = 3
    INVALID = 4
    ILLEGAL = 5

    def __str__(self):
        values = {
            GameState.CONTINUE: "CONTINUE",
            GameState.WIN: "WIN",
            GameState.LOSE: "LOSE",
            GameState.DRAW: "DRAW",
            GameState.INVALID: "INVALID",
            GameState.ILLEGAL: "ILLEGAL",
        }
        return values[self]
