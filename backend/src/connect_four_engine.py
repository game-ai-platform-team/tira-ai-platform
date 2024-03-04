import time

from entities.connectfour.connect_four_judge import ConnectFourJudge
from game_state import GameState


class ConnectFourEngine:
    def __init__(
        self,
        rows: int = 6,
        columns: int = 7,
        difficulty: int = 1000,
        judge: ConnectFourJudge | None = None,
        pruning_judge: ConnectFourJudge | None = None,
        sorted_list: list[int] | None = None,
    ) -> None:
        self.rows = rows
        self.columns = columns

        self.judge: ConnectFourJudge = judge or ConnectFourJudge()
        self.pruning_judge: ConnectFourJudge = pruning_judge or ConnectFourJudge()
        self.sorted_list = sorted_list or [3, 4, 2, 5, 1, 6, 0]
        self.difficulty = difficulty

    def make_move(self, move: str) -> None:
        self.judge.add_move(move)
        self.pruning_judge.add_move(move)

    def get_best_move(self) -> str | None:
        if len(self.judge.get_all_moves()) <= 2:
            return str(self.columns // 2)

        best_move = self.iterative_deepening()

        if not best_move:
            return None

        return str(best_move)

    def iterative_deepening(self) -> tuple | None:
        depth = 1
        best_move = None
        start = time.perf_counter()

        while True:
            time_used = int((time.perf_counter() - start) * 1000)

            if time_used >= self.difficulty:
                break

            new_move = self.max_value(-1000, 1000, depth)[0]

            if not new_move:
                continue

            best_move = new_move

            depth += 1

        return best_move

    def max_value(self, alpha: int, beta: int, depth: int) -> tuple:
        best_move = None
        best_value = float("-inf")

        if self.pruning_judge.is_game_over() != GameState.CONTINUE or depth == 0:
            best_value = self.pruning_judge.evaluate_board() * -1 * (depth + 1)

            return best_move, best_value

        for column in self.sorted_list:
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
        best_value = float("inf")

        if self.pruning_judge.is_game_over() != GameState.CONTINUE or depth == 0:
            best_value = self.pruning_judge.evaluate_board() * (depth + 1)

            return best_move, best_value

        for column in self.sorted_list:
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
