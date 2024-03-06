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
        self.my_piece: 0

    def initialize_board(self, rows: int, columns: int) -> list[list[int]]:
        board = [([0] * rows) for i in range(columns)]
        return board

    def calculate_latest_move(self) -> tuple | None:
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
        if self.heuristic.my_piece == 0:
            self.heuristic.set_piece(len(self.__moves) % 2 + 1)

        int_move = int(move)
        for row in range(len(self.__board[int_move])):
            if self.__board[int_move][row] == 0:
                self.__board[int_move][row] = (len(self.__moves)) % 2 + 1
                self.__moves.append(int_move)
                self.heuristic.evaluate_relevant_windows(int_move, row, self.__board)
                return

    ##Removes a move to the judge and re-evaluates relevant windows to it
    def remove_latest(self):
        move = self.calculate_latest_move()
        self.__moves.pop()

        if move:
            self.__board[move[0]][move[1]] = 0
            self.heuristic.evaluate_relevant_windows(move[0], move[1], self.__board)

    def is_game_over(self) -> GameState:
        if self.__is_win():
            return GameState.WIN

        if self.__is_draw():
            return GameState.DRAW

        return GameState.CONTINUE

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

    def get_board(self) -> list[list[int]]:
        return self.__board

    def __is_draw(self) -> bool:
        if len(self.__moves) >= 6 * 7:
            return True
        return False

    ##Checks a win has been found in any window
    def __is_win(self) -> bool:
        return self.heuristic.is_win()

    def evaluate_board(self):
        if self.__is_win():
            return 100
        if self.__is_draw():
            return 0
        return self.heuristic.evaluate_entire_board()
