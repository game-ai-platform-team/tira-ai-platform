from enum import Enum


class GameState(Enum):
    CONTINUE = 0
    WIN = 1
    LOSE = 2
    DRAW = 3
    INVALID = 4
    ILLEGAL = 5
    MAX_TURNS = 6

    def __str__(self):
        values = {
            GameState.CONTINUE: "CONTINUE",
            GameState.WIN: "WIN",
            GameState.LOSE: "LOSE",
            GameState.DRAW: "DRAW",
            GameState.INVALID: "INVALID",
            GameState.ILLEGAL: "ILLEGAL",
            GameState.MAX_TURNS: "MAX_TURNS"
        }
        return values[self]
    
    def __bool__(self):
        values = {
            GameState.CONTINUE: True,
            GameState.WIN: True,
            GameState.LOSE: True,
            GameState.DRAW: True,
            GameState.INVALID: False,
            GameState.ILLEGAL: False,
            GameState.MAX_TURNS: False
        }
        return values[self]
