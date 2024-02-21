from entities.judge import Judge
from game_state import GameState


class ConnectFourJudge(Judge):
    def __init__(
        self, board: list[list[int]] | None = None, moves: list[int] | None = None
    ) -> None:
        self.__board: list[list[int]] = board or [[0] * 6 for i in range(7)]
        self.__moves: list[int] = moves or []
        self.__turns = 0

    def validate(self, move: str) -> GameState:
        state = GameState.CONTINUE

        if not self.__check_valid_move(move):
            return GameState.INVALID

        if not self.__check_illegal_move(int(move)):
            return GameState.ILLEGAL

        return state

    def add_move(self, move: int) -> None:
        for row in self.__board[move]:
            if row == 0:
                self.__board[move][row] = self.__turns % 2 + 1
                self.__turns += 1
                break

    def get_debug_info(self) -> str:
        pass

    def get_all_moves(self) -> list[str]:
        pass

    def analyze(self) -> float:
        pass

    def __check_valid_move(self, move: str) -> bool:
        move_int = -1
        try:
            move_int = int(move)
        except ValueError:
            return False

        if not (0 <= move_int <= len(self.__board)):
            return False

        return True

    def __check_illegal_move(self, move: int) -> bool:
        if self.__board[move][5] != 0:
            return False

        return True

    def get_board(self) -> list[list[int]]:
        return self.__board