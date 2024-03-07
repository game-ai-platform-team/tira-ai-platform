from entities.connectfour.connect_four_engine import ConnectFourEngine


class PlayerConnectFour:
    def __init__(self, elo) -> None:
        self.engine = ConnectFourEngine()
        self.elo = elo

    def play(self, move):
        self.engine.make_move(move)
        new_move = self.engine.get_best_move()
        if new_move is None:
            new_move = self.engine.random_valid_move()
            print("random move")
        self.engine.make_move(new_move)
        return new_move

    def get_and_reset_current_logs(self):
        return ""

    def get_and_reset_all_logs(self):
        return ""

    def terminate_self(self):
        pass
