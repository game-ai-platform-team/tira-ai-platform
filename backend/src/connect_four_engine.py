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

        best_move = self.max_value(-1000, 1000, self.depth)
        print(best_move)

        return str(best_move[0])

    def generate_sorted_list(self) -> list:
        num_list = list(range(self.columns - 1, -1, -1))
        mid_index = len(num_list) // 2
        num_list.sort(key=lambda x: abs(x - mid_index))
        return num_list

    def max_value(self, alpha: int, beta: int, depth: int) -> tuple:
        print("we got here")
        best_move = None
        if self.pruning_judge.is_game_over() != GameState.CONTINUE or depth == 0:
            print("we also got here")
            return None, self.pruning_judge.evaluate_board() * -1 * (depth + 1)
        best_value = -1000
        for column in self.sorted_list:
            print("maximizing player loop")
            if self.pruning_judge.validate(str(column)) != GameState.CONTINUE:
                continue
            self.pruning_judge.add_move(str(column))
            new_value = self.min_value(alpha, beta, depth - 1)[1]
            if new_value > best_value:
                best_move = column
                best_value = new_value
            alpha = max(alpha, new_value)
            if alpha >= beta:
                self.pruning_judge.remove_latest()
                break
            self.pruning_judge.remove_latest()
        return best_move, best_value

    def min_value(self, alpha: int, beta: int, depth: int) -> tuple:
        best_move = None
        if self.pruning_judge.is_game_over() != GameState.CONTINUE or depth == 0:
            return None, self.pruning_judge.evaluate_board() * (depth + 1)
        best_value = 1000
        for column in self.sorted_list:
            print("minimizing player loop")
            if self.pruning_judge.validate(str(column)) != GameState.CONTINUE:
                continue
            self.pruning_judge.add_move(str(column))
            new_value = self.max_value(alpha, beta, depth - 1)[1]
            if new_value < best_value:
                best_move = column
                best_value = new_value
            beta = min(beta, new_value)
            if alpha >= beta:
                self.pruning_judge.remove_latest()
                break
            self.pruning_judge.remove_latest()
        return best_move, best_value


if __name__ == "__main__":
    engine1 = ConnectFourEngine()
    engine2 = ConnectFourEngine()

    while True:
        test_move = input("move: ")
        engine1.make_move(test_move)
        print(f"board {engine1.judge.get_board()}")
        print(f"board {engine1.pruning_judge.get_board()}")
        test_move = engine1.get_best_move()
        print(f"this move{test_move}")
        if test_move:
            print(f"{test_move}")
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
