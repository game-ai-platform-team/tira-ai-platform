from enum import Enum


class GameState(Enum):
    CONTINUE = 0
    WIN = 1
    LOSE = 2
    DRAW = 3
    INVALID = 4
    ILLEGAL = 5
