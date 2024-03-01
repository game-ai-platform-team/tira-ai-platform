from entities.judge import Judge
from game_state import GameState


class ConnectFourJudge(Judge):
    def __init__(
        self,
        rows=6,
        columns=7,
        moves: list[int] | None = None,
        board: list[list[int]] | None = None,
        pruning=False 
    ) -> None:
        self.__board: list[list[int]] = board or self.initialize_board(rows, columns)
        self.__moves: list[int] = moves or []
        self.max_turns = len(self.__board) * len(self.__board[0])
        self.__latest_move = self.calculate_latest_move()
        self.__state = GameState.CONTINUE
        self.horizontal_windows: list[list[int]] = [
            ([0] * rows) for i in range(columns - 3)
        ]
        self.vertical_windows: list[list[int]] = [
            ([0] * (rows - 3)) for i in range(columns)
        ]
        self.diagonal_downwards_windows: list[list[int]] = [
            ([0] * (rows - 3)) for i in range(columns - 3)
        ]
        self.diagonal_upwards_windws: list[list[int]] = [
            ([0] * (rows)) for i in range(columns - 3)
        ]

    def initialize_board(self, rows: int, columns: int) -> list[list[int]]:
        board = [([0] * rows) for i in range(columns)]
        return board

    ## testing only method
    def print_windows(self):
        print(self.horizontal_windows)
        print(self.vertical_windows)
        print(self.diagonal_downwards_windows)
        print(self.diagonal_upwards_windws)

    def print_vertical_windows(self):
        print(self.vertical_windows)

    def calculate_latest_move(self) -> tuple | None:
        if len(self.__moves) == 0:
            return None

        column = self.__moves[-1]

        for row in range(len(self.__board[column]) - 1, -1, -1):
            if self.__board[column][row] != 0:
                return (column, row)

        return None

    def validate(self, move: str) -> GameState:
        self.__state = GameState.CONTINUE
        state = GameState.CONTINUE

        if not self.__check_valid_move(move):
            return GameState.INVALID

        if not self.__check_illegal_move(int(move)):
            return GameState.ILLEGAL

        return state

    def add_move(self, move: str) -> None:
        print("ADDING MOVE")
        int_move = int(move)
        for row in range(len(self.__board[int_move])):
            if self.__board[int_move][row] == 0:
                self.__board[int_move][row] = (len(self.__moves)) % 2 + 1
                self.__moves.append(int_move)
                self.__latest_move = (int_move, row)
                self.evaluate_relevant_windows(int_move, row)

    def remove_latest(self):
        print("REMOVING MOVE)")
        move = self.calculate_latest_move()
        self.__moves.pop()

        if move:
            self.__board[move[0]][move[1]] = 0
            self.evaluate_relevant_windows(move[0], move[1])

    def is_game_over(self) -> GameState:
        print(self.__moves)
        if self.__is_win():
            self.__state = GameState.WIN
            return self.__state

        if self.__is_draw():
            self.__state = GameState.DRAW
            return self.__state

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
        print(self.__moves)
        if len(self.__moves) >= self.max_turns:
            return True
        return False

    def __is_win(self) -> bool:
        latest = self.__latest_move
        if latest:
            col = latest[0]
            row = latest[1]
            print(latest)

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

        space_above = min(3, columns - col, rows - row)
        space_below = min(3, col, row)

        if space_above + space_below < 3:
            return False

        for i in range(1, space_above + 1):
            if self.__board[col + i][row + i] != combo_color:
                break
            combo += 1
            if combo >= 4:
                return True

        for i in range(1, space_below + 1):
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

        space_above = min(3, col, rows - row)
        space_below = min(3, columns - col, row)

        if space_above + space_below < 3:
            return False

        for i in range(1, space_above + 1):
            if self.__board[col - i][row + i] != combo_color:
                break
            combo += 1
            if combo >= 4:
                return True

        for i in range(1, space_below + 1):
            if self.__board[col + i][row - i] != combo_color:
                break
            combo += 1
            if combo >= 4:
                return True

        return False

    ## Returns True if there is a win
    def evaluate_relevant_windows(self, col, row) -> bool:
        space_diagonal_downwards = min(3, col, len(self.__board[0]) - row)
        space_diagonal_upwards = min(3, col, row)
        self.evaluate_horizontal(col, row)
        self.evaluate_vertical(col, row)
        ##self.evaluate_diagonal_downwards(col, row, space_diagonal_downwards)
        ##self.evaluate_diagonal_upwards(col, row, space_diagonal_upwards)

    def evaluate_horizontal(self, col, row):
        print("evaluating horizontal" + str(col) + "/" + str(row))
        list = [0, 0, 0, 0]
        for i in range(4):
            print("   " + str(i) +"/" + str(row))
            if col - i > 3: continue
            for x in range(4):
                list[x] = self.__board[i + x][row]
            self.horizontal_windows[i][row] = self.evaluate_single_window(list)

    def evaluate_vertical(self, col, row):
        print("evaluating vertical" + str(col) + "/" + str(row))
        list = [0, 0, 0, 0]
        for i in range(0, row-2):
            print("   " + str(col) +"/" + str(row -3 - i))
            for x in range(4):
                list[x] = self.__board[col][row - 3 - i + x]
            self.vertical_windows[col][row - 3 - i] = self.evaluate_single_window(list)

    def evaluate_diagonal_downwards(self, col, row, space):
        print("evaluating ddown" + str(col) + "/" + str(row) + "/" + str(space))
        list = [0, 0, 0, 0]
        for i in range(space):
            for x in range(4):
                list[x] = self.__board[col - i + x][row + i - x]
            self.horizontal_windows[col - i][row + i] = self.evaluate_single_window(list)

    def evaluate_diagonal_upwards(self, col, row, space):
        print("evaluating dup" + str(col) + "/" + str(row) + "/" + str(space))
        list = [0, 0, 0, 0]
        for i in range(space):
            for x in range(4):
                list[x] = self.__board[col - i + x][row - i + x]
            self.horizontal_windows[col - i][row - i] = self.evaluate_single_window(list)

    def evaluate_single_window(self, window: list[int]) -> int:
        my_pieces = 0
        opponent_pieces = 0
        my_piece = 1
        opponent_piece = 2
        for i in window:
            if i == opponent_piece:
                opponent_pieces += 1
            if i == my_piece:
                my_pieces += 1

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

    def evaluate_board(self):
        if self.__is_win():
            return 100
        if self.__state == GameState.DRAW:
            return 0
        return self.count_all_threes()
