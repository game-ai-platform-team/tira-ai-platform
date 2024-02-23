from entities.judge import Judge
from game_state import GameState

class ConnectFourJudge(Judge):
    def __init__(self, rows=6, columns=7, moves: list[int] | None = None) -> None:
        self.__board: list[list[int]] = self.initialize_board(rows, columns)
        self.__moves: list[int] = moves or []
        self.max_turns = len(self.__board) * len(self.__board[0])

    def initialize_board(self, rows: int, columns: int) -> list[list[int]]:
        board = [([0] * rows) for i in range(columns)]
        return board

    def validate(self, move: str) -> GameState:
        state = GameState.CONTINUE

        if not self.__check_valid_move(move):
            return GameState.INVALID

        if not self.__check_illegal_move(int(move)):
            return GameState.ILLEGAL

        return state

    def add_move(self, move: int) -> None:
        for row in  range(len(self.__board[move])):
            if self.__board[move][row] == 0:
                self.__board[move][row] = (len(self.__moves))% 2 + 1
                self.__moves.append(move)
                break

        print(self.__board[move])

    def is_game_over(self) -> GameState:
        if self.__is_win():
            return GameState.WIN

        if self.__is_draw():
            return GameState.DRAW

        return GameState.CONTINUE

    def get_debug_info(self) -> str:
        pass

    def analyze(self) -> float:
        pass

    def get_all_moves(self) -> list[str]:
        pass

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
        if self.__board[move][len(self.__board[0]) - 1] != 0:
            return False

        return True

    def get_board(self) -> list[list[int]]:
        return self.__board

    def __is_draw(self) -> bool:
        print(self.__moves)
        if len(self.__moves) >= self.max_turns:
            return True
        return False

    def __is_win(self) -> bool:
        rows = len(self.__board)
        cols = len(self.__board[0])


        # ROWS
        for i in range(rows):
            for j in range(cols - 3):
                if self.__board[i][j] != 0 and self.__board[i][j] == self.__board[i][j + 1] == self.__board[i][j + 2] == self.__board[i][j + 3]:
                    return True

        # COLUMNS
        for i in range(rows - 3):
            for j in range(cols):
                if self.__board[i][j] != 0 and self.__board[i][j] == self.__board[i + 1][j] == self.__board[i + 2][j] == self.__board[i + 3][j]:
                    return True

        # DIAGONALS (UPWARDS)
        for i in range(rows - 3):
            for j in range(cols - 3):
                if self.__board[i][j] != 0 and \
                        self.__board[i][j] == self.__board[i + 1][j + 1] == self.__board[i + 2][j + 2] == self.__board[i + 3][j + 3]:
                    return True

        # DIAGONAL (DOWNWARDS)
        for i in range(3, rows):
            for j in range(cols - 3):
                if self.__board[i][j] != 0 and \
                        self.__board[i][j] == self.__board[i - 1][j + 1] == self.__board[i - 2][j + 2] == self.__board[i - 3][j + 3]:
                    return True

        # NO WIN.
        return False


    def set_board(self, board, moves) -> None:
        """Only for tests with given boards."""
        self.__board = board
        self.__moves = moves
