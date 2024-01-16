import os
from stockfish.models import Stockfish as sf


class EngineWrapper:

    def __init__(self, boardstate: list, depth: int) -> None:
        self.path = os.path.join(os.path.dirname(
            __file__), '../engines/stockfish_ubuntu/stockfish-ubuntu-x86-64-avx2')
        self.engine = sf(path=self.path)

        self.depth = depth
        self.engine.set_depth(depth)

        self.boardstate = boardstate
        self.engine.set_position(boardstate)

    def set_depth(self, depth: int):
        self.depth = depth

    def set_board(self, boardstate: list):
        self.boardstate = boardstate
        self.engine.set_position(boardstate)

    def add_moves(self, moves: list):
        for move in moves:
            self.boardstate.append(move)
            self.engine.set_position(self.boardstate)

    def calculate_move(self):
        return self.engine.get_best_move()
