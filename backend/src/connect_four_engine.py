from entities.connectfour.connect_four_judge import ConnectFourJudge
from game_state import GameState


class ConnectFourEngine:
    def __init__(self, rows=6, columns=7):
        self.rows = rows
        self.columns = columns

        self.judge = ConnectFourJudge(self.rows, self.columns)
        self.pruning_judge = ConnectFourJudge(self.rows, self.columns)
        self.depth = 4
        self.sorted_list = self.generate_sorted_list()

    def make_move(self, move: str) -> None:
        self.judge.add_move(move)
        self.pruning_judge.add_move(move)

    def get_best_move(self) -> str:
        if len(self.judge.get_all_moves()) <= 2:
            return int(self.columns / 2)

        value = 0
        best_value = -10000
        print(f"sorted list: {self.sorted_list}")
        for column in self.sorted_list:
            if self.pruning_judge.validate(str(column)) != GameState.CONTINUE:
                continue
            print(f"column {column}")
            value = self.min_value(-1000, 1000, self.depth)
            print(f"value: {value}")
            if value > best_value:
                best_move = column
                best_value = value
        print(f"best move: {best_move}")
        return best_move

    def generate_sorted_list(self) -> list:
        num_list = list(range(self.columns - 1, -1, -1))
        mid_index = len(num_list) // 2
        num_list.sort(key=lambda x: abs(x - mid_index))
        return num_list

    def max_value(self, alpha: int, beta: int, depth: int) -> str:
        if self.pruning_judge.is_game_over() or depth == 0:
            return self.pruning_judge.evaluate_board() * -1 * depth
        value = -1000
        for column in self.sorted_list:
            if self.pruning_judge.validate(str(column)) != GameState.CONTINUE:
                continue
            self.pruning_judge.add_move(str(column))
            value = max(value, self.min_value(alpha, beta, depth - 1) * depth)
            alpha = max(alpha, value)
            if alpha >= beta:
                break
            self.pruning_judge.remove_latest()
        return value

    def min_value(self, alpha: int, beta: int, depth: int) -> str:
        if self.pruning_judge.is_game_over() or depth == 0:
            return self.pruning_judge.evaluate_board() * depth
        value = 1000
        for column in self.sorted_list:
            if self.pruning_judge.validate(str(column)) != GameState.CONTINUE:
                continue
            self.pruning_judge.add_move(str(column))
            value = min(value, self.max_value(alpha, beta, depth - 1) * depth)
            beta = min(beta, value)
            if alpha >= beta:
                break
            self.pruning_judge.remove_latest()
        return value


if __name__ == "__main__":
    engine1 = ConnectFourEngine()
    engine2 = ConnectFourEngine()

    while True:
        test_move = input("move: ")
        engine1.make_move(test_move)
        print(f"board {engine1.judge.get_board()}")
        test_move = engine1.get_best_move()
        engine1.make_move(test_move)
        print(f"board {engine1.judge.get_board()}")

    ## DOESN'T COUNT VALUE CORRECTLY


   # engine1.make_move("3")

   # while True:
   #     move = engine1.get_best_move()
   #     engine1.make_move(move)
   #     print(f"board {engine1.judge.get_board()}")
   #     print(f"board {engine1.pruning_judge.get_board()}")
   #     print(engine1.judge.get_all_moves())
   #     if engine1.judge.is_game_over() != GameState.CONTINUE:
   #         print("game ended")
   #         break
