from connect_four_lib.connect_four_engine import ConnectFourEngine
from duo_game_lib.player import Player


class PlayerConnectFour(Player):
    def __init__(self, elo) -> None:
        super().__init__()

        self.engine = ConnectFourEngine()
        self.elo = elo

    def play(self, move):
        self.engine.add_move(move)
        new_move = self.engine.get_best_move()
        if new_move is None:
            new_move = self.engine.get_random_move()
            print("random move")
        self.engine.add_move(new_move)
        return new_move

    def get_and_reset_current_logs(self):
        return ""

    def get_and_reset_all_logs(self):
        return ""

    def terminate_self(self):
        pass
