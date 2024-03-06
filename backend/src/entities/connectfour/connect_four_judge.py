from entities.judge import Judge
from game_state import GameState


class ConnectFourJudge(Judge):
    def __init__(
        self,
        moves: list[int] | None = None,
        board: list[list[int]] | None = None,
    ) -> None:
        rows = 6
        columns = 7
        self.__board: list[list[int]] = board or self.initialize_board(rows, columns)
        self.__moves: list[int] = moves or []
        self.__latest_move = self.calculate_latest_move()
        ## 4 tables for storing the evaluation of 4 space windows starting from each space
        self.horizontal_windows: list[list[int]] = [
            ([0] * rows) for i in range(4)
        ]
        self.vertical_windows: list[list[int]] = [
            ([0] * (3)) for i in range(7)
        ]
        self.ddown_windows: list[list[int]] = [
            ([0] * (6)) for i in range(4)
        ]
        self.dup_windows: list[list[int]] = [
            ([0] * (3)) for i in range(4)
        ]

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
        int_move = int(move)
        for row in range(len(self.__board[int_move])):
            if self.__board[int_move][row] == 0:
                self.__board[int_move][row] = (len(self.__moves)) % 2 + 1
                self.__moves.append(int_move)
                self.__latest_move = (int_move, row)
                self.evaluate_relevant_windows(int_move, row)
                return

    ##Removes a move to the judge and re-evaluates relevant windows to it
    def remove_latest(self):
        move = self.calculate_latest_move()
        self.__moves.pop()

        if move:
            self.__board[move[0]][move[1]] = 0
            self.evaluate_relevant_windows(move[0], move[1])

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
        for i in self.horizontal_windows:
            for j in i:
                if j == 1000 or j == -1000:
                    return True
        for i in self.vertical_windows:
            for j in i:
                if j == 1000 or j == -1000:
                    return True
        for i in self.dup_windows:
            for j in i:
                if j == 1000 or j == -1000:
                    return True
        for i in self.ddown_windows:
            for j in i:
                if j == 1000 or j == -1000:
                    return True
        return False

    ## Recognize 4 space windows that the given coordinates are in and re-evaluates them
    def evaluate_relevant_windows(self, col, row):
        self.__evaluate_horizontal(col, row)
        self.__evaluate_vertical(col, row)
        self.__evaluate_ddown(col, row)
        self.__evaluate_dup(col, row)

    def __evaluate_horizontal(self, col, row):
        window = [0, 0, 0, 0]
        low_cap = max(col - 3, 0)
        top_cap = min(col + 1, 4)
        for i in range(low_cap, top_cap):
            for x in range(4):
                window[x] = self.__board[i + x][row]
            self.horizontal_windows[i][row] = self.evaluate_single_window(window)

    def __evaluate_vertical(self, col, row):
        window = [0, 0, 0, 0]
        low_cap = max(0, row - 3)
        top_cap = min(row + 1, 3)
        for i in range(low_cap, top_cap):
            for x in range(4):
                window[x] = self.__board[col][i + x]
            self.vertical_windows[col][i] = self.evaluate_single_window(window)

    def __evaluate_ddown(self, col, row):
        window = [0, 0, 0, 0]
        low_space = min(3, col, 5 - row)
        low_cap = -1 * low_space
        top_space = min(3, 6 - col, row)
        top_cap = low_cap + low_space + top_space - 2
        for i in range(low_cap, top_cap):
            for x in range(4):
                window[x] = self.__board[col + i + x][row - i - x]
            self.ddown_windows[col + i][row - i] = self.evaluate_single_window(window)

    def __evaluate_dup(self, col, row):
        window = [0, 0, 0, 0]
        low_space = min(3, col, row)
        low_cap = -1 * low_space
        top_space = min(6 - col, 5 - row)
        top_cap = low_cap + low_space + top_space - 2
        for i in range(low_cap, top_cap):
            for x in range(4):
                window[x] = self.__board[col + i + x][row + i + x]
            self.dup_windows[col + i][row + i] = self.evaluate_single_window(window)

    def evaluate_single_window(self, window: list[int]) -> int:
        my_piece = 2
        opponent_piece = 1
        my_pieces = window.count(my_piece)
        opponent_pieces = window.count(opponent_piece)
        if my_pieces == 4:
            return 1000
        if opponent_pieces == 4:
            return -1000
        if my_pieces > 0 and opponent_pieces > 0:
            return 0
        if my_pieces > 0:
            return 2**my_pieces
        if opponent_pieces > 0:
            return -1 * 2**opponent_pieces
        return 0

    ##Calculates the sum of the evaluations of all 4-space windows on the board and returns it
    def evaluate_entire_board(self) -> int:
        evaluation = 0
        for i in self.horizontal_windows:
            for j in i:
                evaluation += j
        for i in self.vertical_windows:
            for j in i:
                evaluation += j
        for i in self.dup_windows:
            for j in i:
                evaluation += j
        for i in self.ddown_windows:
            for j in i:
                evaluation += j
        return evaluation

    def evaluate_board(self):
        if self.__is_win():
            return 100
        if self.__is_draw():
            return 0
        return self.evaluate_entire_board()
