from entities.judge import Judge
from game_state import GameState


class ConnectFourJudge(Judge):
    def __init__(
        self,
        rows=6,
        columns=7,
        moves: list[int] | None = None,
        board: list[list[int]] | None = None,
    ) -> None:
        self.__board: list[list[int]] = board or self.initialize_board(rows, columns)
        self.__moves: list[int] = moves or []
        self.max_turns = len(self.__board) * len(self.__board[0])
        self.__latest_move = self.calculate_latest_move()
        self.__state = GameState.CONTINUE

    def initialize_board(self, rows: int, columns: int) -> list[list[int]]:
        board = [([0] * rows) for i in range(columns)]
        return board

    def calculate_latest_move(self) -> tuple:
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
        int_move = int(move)
        for row in range(len(self.__board[int_move])):
            if self.__board[int_move][row] == 0:
                self.__board[int_move][row] = (len(self.__moves)) % 2 + 1
                self.__moves.append(int_move)
                self.__latest_move = (int_move, row)
                break

    def remove_latest(self):
        move = self.calculate_latest_move()
        self.__moves.pop()
        self.__board[move[0]][move[1]] = 0

    def is_game_over(self) -> GameState:
        print(self.__moves)
        if self.__is_win():
            self.__state = GameState.WIN
            return self.__state

        if self.__is_draw():
            self.__state = GameState.DRAW
            return self.__state

        return GameState.CONTINUE

    def get_debug_info(self) -> str:
        pass

    def analyze(self) -> float:
        pass

    def get_all_moves(self) -> list[int]:
        return self.__moves

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
        col = self.__latest_move[0]
        row = self.__latest_move[1]
        print(self.__latest_move)

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
        print(f"cols: {columns - col} rows: {rows - row}")
        space_below = min(3, col, row)
        print(f"sa =  {space_above} sb = {space_below}")

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

    def count_all_threes(self):
        piece = self.calculate_latest_move()
        return self.count_vertical(piece)+self.count_horizontal(piece)

    def count_vertical(self, piece):
        total = 0
        for column in range(len(self.__board)):
            for row in range(len(self.__board[0])-2):
                if (
                    piece
                == self.__board[column][row]
                == self.__board[column][row+1]
                == self.__board[column][row+2]):
                    total += 1
        return total

    def count_horizontal(self, piece):
        total = 0
        for row in range(len(self.__board[0])):
            for column in range(len(self.__board)-2):
                if (
                    piece
                ==  self.__board[column][row]
                == self.__board[column+1][row]
                == self.__board[column+2][row]):
                    total += 1
        return total

    def evaluate_board(self):
        if self.__is_win():
            return 1000
        if self.__state == GameState.DRAW:
            return 0
        return self.count_all_threes()
