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
        self.horizontal_windows: list[list[int]] = [
            ([0] * rows) for i in range(columns - 3)
        ]
        self.vertical_windows: list[list[int]] = [
            ([0] * (rows - 3)) for i in range(columns)
        ]
        self.ddown_windows: list[list[int]] = [
            ([0] * (rows)) for i in range(columns - 3)
        ]
        self.dup_windows: list[list[int]] = [
            ([0] * (rows - 3)) for i in range(columns - 3)
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

    def add_move(self, move: str) -> None:
        int_move = int(move)
        for row in range(len(self.__board[int_move])):
            if self.__board[int_move][row] == 0:
                self.__board[int_move][row] = (len(self.__moves)) % 2 + 1
                self.__moves.append(int_move)
                self.__latest_move = (int_move, row)
                self.evaluate_relevant_windows(int_move, row)
                return

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

    def __is_win(self) -> bool:
        latest = self.__latest_move
        if latest:
            col = latest[0]
            row = latest[1]

            if (
                self.vertical_win(col, row)
                or self.horizontal_win(col, row)
                or self.diagonal_upwards_win(col, row)
                or self.diagonal_downwards_win(col, row)
            ):
                return True

        return False

    def vertical_win(self, col, row) -> bool:
        if row >= 3:
            return (
                self.__board[col][row]
                == self.__board[col][row - 1]
                == self.__board[col][row - 2]
                == self.__board[col][row - 3]
            )
        return False

    def horizontal_win(self, col, row) -> bool:
        combo = 0
        combo_color = self.__board[col][row]
        for column in range(len(self.__board) - 1):
            if self.__board[column][row] == combo_color:
                combo += 1
                if combo == 4:
                    return True
            else:
                combo = 0
        return False

    def diagonal_upwards_win(self, col, row) -> bool:
        columns = len(self.__board) - 1
        rows = len(self.__board[0]) - 1
        combo = 1
        combo_color = self.__board[col][row]

        low_cap = min(3, columns - col, rows - row)
        top_cap = min(3, col, row)

        if low_cap + top_cap < 3:
            return False

        for i in range(1, low_cap + 1):
            if self.__board[col + i][row + i] != combo_color:
                break
            combo += 1
            if combo >= 4:
                return True

        for i in range(1, top_cap + 1):
            if self.__board[col - i][row - i] != combo_color:
                break
            combo += 1
            if combo >= 4:
                return True
        return False

    def diagonal_downwards_win(self, col, row) -> bool:
        columns = len(self.__board) - 1
        rows = len(self.__board[0]) - 1
        combo = 1
        combo_color = self.__board[col][row]

        low_cap = min(3, col, rows - row)
        top_cap = min(3, columns - col, row)

        if low_cap + top_cap < 3:
            return False

        for i in range(1, low_cap + 1):
            if self.__board[col - i][row + i] != combo_color:
                break
            combo += 1
            if combo >= 4:
                return True

        for i in range(1, top_cap + 1):
            if self.__board[col + i][row - i] != combo_color:
                break
            combo += 1
            if combo >= 4:
                return True

        return False

    ## Should this return True if there is a win?
    def evaluate_relevant_windows(self, col, row):
        self.__evaluate_horizontal(col, row)
        self.__evaluate_vertical(col, row)
        self.__evaluate_ddown(col, row)
        self.__evaluate_dup(col, row)

    def __evaluate_horizontal(self, col, row):
        ##print("evaluating horizontal" + str(col) + "/" + str(row))
        window = [0, 0, 0, 0]
        low_cap = max(col - 3, 0)
        top_cap = min(col + 1, 4)
        for i in range(low_cap, top_cap):
            # print("   " + str(i) + "/" + str(row))
            for x in range(4):
                window[x] = self.__board[i + x][row]
            self.horizontal_windows[i][row] = self.evaluate_single_window(window)

    def __evaluate_vertical(self, col, row):
        ##print("evaluating vertical" + str(col) + "/" + str(row))
        window = [0, 0, 0, 0]
        low_cap = max(0, row - 3)
        top_cap = min(row + 1, 3)
        for i in range(low_cap, top_cap):
            # print("   " + str(col) + "/" + str(row - 3 - i))
            for x in range(4):
                window[x] = self.__board[col][i + x]
            self.vertical_windows[col][i] = self.evaluate_single_window(window)

    def __evaluate_ddown(self, col, row):
        ##print("evaluating ddown" + str(col) + "/" + str(row))
        window = [0, 0, 0, 0]
        low_cap = -1 * min(3, col, 5 - row)
        top_space = min(3, 6 - col, row)
        top_cap = low_cap + top_space - 2
        for i in range(low_cap, top_cap):
            # print("   " + str(col) + "/" + str(row - 3 - i))
            for x in range(4):
                window[x] = self.__board[col + i + x][row - i - x]
            self.ddown_windows[col + i][row - i] = self.evaluate_single_window(window)

    def __evaluate_dup(self, col, row):
        ##print("evaluating dup" + str(col) + "/" + str(row))
        window = [0, 0, 0, 0]
        low_cap = -1 * min(3, col, row)
        top_space = min(6 - col, 5 - row)
        top_cap = low_cap + top_space - 2

        for i in range(low_cap, top_cap):
            # print("   " + str(col + i) + "/" + str(row + i))
            for x in range(4):
                window[x] = self.__board[col + i][row + 1]
            self.dup_windows[col + i][row + i] = self.evaluate_single_window(window)

    def evaluate_single_window(self, window: list[int]) -> int:
        my_piece = 1
        opponent_piece = 2
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

    def count_all_threes(self):
        piece = self.calculate_latest_move()
        return self.count_vertical(piece) + self.count_horizontal(piece)

    def count_vertical(self, piece):
        total = 0
        for column, column_values in enumerate(self.__board):
            for row, _ in enumerate(column_values[:-2]):
                if (
                    piece
                    == self.__board[column][row]
                    == self.__board[column][row + 1]
                    == self.__board[column][row + 2]
                ):
                    total += 1
        return total

    def count_horizontal(self, piece):
        total = 0
        for row in range(len(self.__board[0])):
            for column in range(len(self.__board) - 2):
                if (
                    piece
                    == self.__board[column][row]
                    == self.__board[column + 1][row]
                    == self.__board[column + 2][row]
                ):
                    total += 1
        return total

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
