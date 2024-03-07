from entities.connectfour.connect_four_heuristic import ConnectFourHeuristic
from entities.judge import Judge
from game_state import GameState


class ConnectFourJudge(Judge):
    def __init__(
        self,
        moves: list[int] | None = None,
        board: list[list[int]] | None = None,
        heuristic: ConnectFourHeuristic | None = None,
    ) -> None:
        rows = 6
        columns = 7
        self.__board: list[list[int]] = board or self.initialize_board(rows, columns)
        self.__moves: list[int] = moves or []
        self.heuristic: ConnectFourHeuristic = heuristic or ConnectFourHeuristic()

    @property
    def board(self) -> list[list[int]]:
        return self.__board

    def initialize_board(self, rows: int, columns: int) -> list[list[int]]:
        board = [([0] * rows) for i in range(columns)]
        return board

    def get_last_move(self) -> tuple | None:
        if len(self.__moves) == 0:
            return None

        column = self.__moves[-1]

        for row in range(len(self.__board[column]) - 1, -1, -1):
            if self.__board[column][row] != 0:
                return (column, row)

        return None

    def validate(self, move: str) -> GameState:
        state = GameState.CONTINUE
        if not self.__check_valid_move(move):
            return GameState.INVALID

        if not self.__check_illegal_move(int(move)):
            return GameState.ILLEGAL

        return state

    ##Adds a move to the judge and re-evaluates relevant windows to it
    def add_move(self, move: str) -> None:
        column = int(move)
        for row in range(len(self.__board[column])):
            if self.__board[column][row] == 0:
                self.__board[column][row] = (len(self.__moves)) % 2 + 1
                self.__moves.append(column)
                self.heuristic.evaluate_relevant_windows(column, row, self.__board)
                return

    ##Removes a move to the judge and re-evaluates relevant windows to it
    def remove_last_move(self):
        move = self.get_last_move()
        self.__moves.pop()

        if move:
            self.__board[move[0]][move[1]] = 0
            self.heuristic.evaluate_relevant_windows(move[0], move[1], self.__board)

    def get_debug_info(self):
        pass

    def analyze(self) -> float:
        pass

    def get_all_moves(self) -> list[str]:
        return [str(move) for move in self.__moves]

    def __check_valid_move(self, move: str) -> bool:
        move_int = -1
        try:
            move_int = int(move)
        except ValueError:
            return False

        if not 0 <= move_int <= len(self.__board):
            return False

        return True

    def __check_illegal_move(self, move: int) -> bool:
        if self.__board[move][-1] != 0:
            return False

        return True

    def __is_draw(self) -> bool:
        if len(self.__moves) >= 6 * 7:
            return True
        return False

    def __is_win(self) -> bool:
        pass

    def evaluate_board(self):
        if self.__is_draw():
            return 0
        return self.heuristic.evaluate_entire_board()

    def is_valid_location(self, column):
        return self.__board[column][-1] == 0

    def get_valid_locations(self) -> list[int]:
        valid_locations = [col for col in range(7) if self.is_valid_location(col)]

        return valid_locations
