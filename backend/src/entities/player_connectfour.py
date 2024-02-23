from connect_four_engine import ConnectFourEngine


class PlayerConnectFour:
    def __init__(self, elo) -> None:
        self.engine = ConnectFourEngine()

    def play(self, move):
        self.engine.make_move(move)
        new_move = self.engine.get_best_move()
        return new_move

    def get_and_reset_current_logs(self):
        return ""

    def get_and_reset_all_logs(self):
        return ""

    def terminate_self(self):
        pass
