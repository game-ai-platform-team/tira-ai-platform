from stockfish_engine import get_stockfish_engine


class PlayerStockfish:
    def __init__(self, level) -> None:
        self.engine = get_stockfish_engine()
        self.boardstate = []
        self.engine.set_skill_level(level)

    def play(self, move):
        self.boardstate.append(move)
        self.engine.set_position(self.boardstate)
        new_move = self.engine.get_best_move()
        self.boardstate.append(new_move)
        return new_move

    def terminate_self(self):
        pass
