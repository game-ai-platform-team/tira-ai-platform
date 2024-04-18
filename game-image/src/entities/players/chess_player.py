from duo_game_lib.player import Player
from stockfish.models import Stockfish

from config import STOCKFISH_PATH


class ChessPlayer(Player):
    def __init__(self, elo: int, engine: Stockfish | None = None) -> None:
        super().__init__()

        self.engine: Stockfish = engine or Stockfish(path=str(STOCKFISH_PATH))
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
