from entities.connectfour.connect_four_judge import ConnectFourJudge
from game_state import GameState


class ConnectFourEngine:
    def __init__(self, rows=6, columns=7):
        self.rows = rows
        self.columns = columns

        self.judge = ConnectFourJudge(self.columns, self.rows)
        self.pruning_judge = ConnectFourJudge(self.columns, self.rows)
        self.depth = 5
        self.sorted_list = self.generate_sorted_list()

    def make_move(self, move: str) -> None:
        self.judge.add_move(move)

    def get_best_move(self) -> str:
        if len(self.judge.get_all_moves()) <= 2:
            return int(self.columns / 2)

        best_value = -10
        for column in self.sorted_list:
            value = self.max_value(-1, 1, self.depth)
            if value > best_value:
                best_move = column
                best_value = value
        return best_move

    def generate_sorted_list(self) -> list:
        num_list = list(range(self.columns - 1, -1, -1))
        mid_index = len(num_list) // 2
        num_list.sort(key=lambda x: abs(x - mid_index))
        return num_list

    def max_value(self, alpha: int, beta: int, depth: int) -> tuple:
        if self.pruning_judge.is_game_over() or depth == 0:
            return self.pruning_judge.evaluate_board() * -1
        value = -10
        for column in self.sorted_list:
            if self.pruning_judge.validate(str(column)) != GameState.CONTINUE:
                continue
            self.pruning_judge.add_move(str(column))
            value = max(value, self.min_value(alpha, beta, depth - 1))
            alpha = max(alpha, value)
            if alpha >= beta:
                break
        self.pruning_judge.remove_latest()
        return value

    def min_value(self, alpha: int, beta: int, depth: int) -> tuple:
        if self.pruning_judge.is_game_over() or depth - 1:
            return self.pruning_judge.evaluate_board()
        value = 10
        for column in self.sorted_list:
            if self.pruning_judge.validate(str(column)) != GameState.CONTINUE:
                continue
            self.pruning_judge.add_move(str(column))
            value = min(value, self.max_value(alpha, beta, depth - 1))
            beta = min(beta, value)
            if alpha >= beta:
                break
            self.pruning_judge.remove_latest()
        return value


if __name__ == "__main__":
    engine1 = ConnectFourEngine()
    engine2 = ConnectFourEngine()

    engine1.make_move("3")
    previous_move = 3
    while True:
        move = engine1.get_best_move()
        engine1.make_move(move)
        previous_move = move
        print(engine1.judge.get_board())
        # if engine1.judge.__is_win or engine1.judge.__is_draw:
        #   break
