import random
import time

from entities.connectfour.connect_four_judge import ConnectFourJudge
from game_state import GameState

INFINITY = 1000000
COLUMNS = 7


class ConnectFourEngine:
    def __init__(
        self,
        difficulty: int = 1000,
        judge: ConnectFourJudge | None = None,
        pruning_judge: ConnectFourJudge | None = None,
        sorted_list: list[int] | None = None,
    ) -> None:
        self.judge: ConnectFourJudge = judge or ConnectFourJudge()
        self.pruning_judge: ConnectFourJudge = pruning_judge or ConnectFourJudge()
        self.__choices: list[int] = sorted_list or [3, 4, 2, 5, 1, 6, 0]
        self.difficulty: int = difficulty
        self.start_time: float = 0

    def __is_timeout(self) -> bool:
        time_used = int((time.perf_counter() - self.start_time) * 1000)
        return time_used >= self.difficulty

    def make_move(self, move: str) -> None:
        self.judge.add_move(move)
        self.pruning_judge.add_move(move)

    def get_best_move(self) -> str | None:
        if len(self.judge.get_all_moves()) <= 2:
            return str(COLUMNS // 2)

        best_move = self.iterative_deepening()

        if best_move is None:
            return None

        return str(best_move)

    def iterative_deepening(self) -> int | None:
        depth = 1
        best_move = None
        self.start_time = time.perf_counter()

        while not self.__is_timeout():
            new_move = self.max_value(-INFINITY, INFINITY, depth)[0]

            if new_move is None:
                continue

            best_move = new_move
            depth += 1

        return best_move

    def max_value(self, alpha: int, beta: int, depth: int) -> tuple[int | None, int]:
        best_move = None
        best_value = -INFINITY

        if (
            self.pruning_judge.is_game_over() != GameState.CONTINUE
            or depth == 0
            or self.__is_timeout()
        ):
            best_value = self.pruning_judge.evaluate_board() * -1 * (depth + 1)

            return best_move, best_value

        for column in self.__choices:
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

    def min_value(self, alpha: int, beta: int, depth: int) -> tuple[int | None, int]:
        best_move = None
        best_value = INFINITY

        if (
            self.pruning_judge.is_game_over() != GameState.CONTINUE
            or depth == 0
            or self.__is_timeout()
        ):
            best_value = self.pruning_judge.evaluate_board() * (depth + 1)

            return best_move, best_value

        for column in self.__choices:
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

    def random_valid_move(self) -> str:
        move = str(random.choice(self.judge.get_valid_locations()))
        return move


if __name__ == "__main__":
    engine1 = ConnectFourEngine()

    while True:
        while True:
            test_move = input("move: ")
            if engine1.judge.validate(test_move):
                break
        engine1.make_move(test_move)
        test_move = engine1.get_best_move()
        if test_move:
            engine1.make_move(test_move)
        board = engine1.judge.get_board()
        for i in board:
            print(i)
