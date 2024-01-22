from enum import Enum

class GameState(Enum):
    CONTINUE = 0
    WIN = 1
    DRAW = 2
    INVALID = 4