import numpy as np


class ConnectFour:
    def __init__(self, rows=6, columns=7):
        self.rows = rows
        self.columns = columns
        self.board = np.zeros((rows, columns), dtype=int)
        self.player = 1
        self.game_over = False

    def drop_piece(self, column) -> None:
        for r in range(self.rows):
            if self.board[r][column] == 0:
                self.board[r][column] = self.player
                self.player = 3 - self.player  # Switch player

    def check_win(self, row, column) -> bool:
        if (self.check_horizontal_win(row)
        or self.check_vertical_win(column)
        or self.check_positively_sloped_diagonals()
        or self.check_negatively_sloped_diagonals()):
            return True

        return False

    def check_horizontal_win(self, row) -> bool:
        for c in range(self.columns - 3):
            if (
                self.board[row][c] == self.player
                and self.board[row][c + 1] == self.player
                and self.board[row][c + 2] == self.player
                and self.board[row][c + 3] == self.player
            ):
                return True

        return False

    def check_vertical_win(self, column) -> bool:
        for r in range(self.rows - 3):
            if (
                self.board[r][column] == self.player
                and self.board[r + 1][column] == self.player
                and self.board[r + 2][column] == self.player
                and self.board[r + 3][column] == self.player
            ):
                return True

        return False

    def check_positively_sloped_diagonals(self) -> bool:
        for r in range(self.rows - 3):
            for c in range(self.columns - 3):
                if (
                    self.board[r][c] == self.player
                    and self.board[r + 1][c + 1] == self.player
                    and self.board[r + 2][c + 2] == self.player
                    and self.board[r + 3][c + 3] == self.player
                ):
                    return True

        return False

    def check_negatively_sloped_diagonals(self) -> bool:
        for r in range(3, self.rows):
            for c in range(self.columns - 3):
                if (
                    self.board[r][c] == self.player
                    and self.board[r - 1][c + 1] == self.player
                    and self.board[r - 2][c + 2] == self.player
                    and self.board[r - 3][c + 3] == self.player
                ):
                    return True

        return False

    def get_board(self):
        return self.board

    def is_valid_location(self, column) -> bool:
        return self.board[self.rows - 1][column] == 0

    def get_valid_locations(self) -> list[int]:
        valid_locations = []
        for col in range(self.columns):
            if self.is_valid_location(col):
                valid_locations.append(col)
        return valid_locations

    def is_board_full(self) -> bool:
        return np.all(self.board != 0)
