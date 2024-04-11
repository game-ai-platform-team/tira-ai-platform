from duo_game_lib.player import Player

from stockfish_engine import get_stockfish_engine


class PlayerStockfish(Player):
    def __init__(self, elo) -> None:
        super().__init__()

        self.engine = get_stockfish_engine()
        self.boardstate = []
        self.engine.set_elo_rating(elo)

    def play(self, move):
        self.boardstate.append(move)
        self.engine.set_position(self.boardstate)
        new_move = self.engine.get_best_move()
        self.boardstate.append(new_move)
        return new_move

    def get_and_reset_current_logs(self):
        return ""

    def get_and_reset_all_logs(self):
        return ""

    def terminate_self(self):
        pass
