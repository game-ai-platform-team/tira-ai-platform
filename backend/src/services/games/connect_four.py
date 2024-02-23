import numpy as np


class ConnectFour:
    def __init__(self, rows=6, columns=7):
        self.rows = rows
        self.columns = columns
        self.board = np.zeros((rows, columns), dtype=int)
        self.player = 1
        self.game_over = False

    def drop_piece(self, column):
        if not self.game_over:
            if (
                self.board[self.rows - 1][column] == 0
            ):  # Check if the bottom row of the column is empty
                for r in range(self.rows):
                    if self.board[r][column] == 0:
                        self.board[r][column] = self.player
                        if self.check_win(r, column):
                            self.game_over = True
                        self.player = 3 - self.player  # Switch player
                        return True
            else:
                return False
        else:
            return False

    def check_win(self, row, column) -> bool:
        # Check horizontal
        for c in range(self.columns - 3):
            if (
                self.board[row][c] == self.player
                and self.board[row][c + 1] == self.player
                and self.board[row][c + 2] == self.player
                and self.board[row][c + 3] == self.player
            ):
                return True

        # Check vertical
        for r in range(self.rows - 3):
            if (
                self.board[r][column] == self.player
                and self.board[r + 1][column] == self.player
                and self.board[r + 2][column] == self.player
                and self.board[r + 3][column] == self.player
            ):
                return True

        # Check positively sloped diagonals
        for r in range(self.rows - 3):
            for c in range(self.columns - 3):
                if (
                    self.board[r][c] == self.player
                    and self.board[r + 1][c + 1] == self.player
                    and self.board[r + 2][c + 2] == self.player
                    and self.board[r + 3][c + 3] == self.player
                ):
                    return True

        # Check negatively sloped diagonals
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

    def print_board(self):
        for row in reversed(range(self.rows)):
            print("|", end="")
            for col in range(self.columns):
                if self.board[row][col] == 0:
                    print(" ", end="|")
                elif self.board[row][col] == 1:
                    print("X", end="|")
                else:
                    print("O", end="|")
            print()
        print("-" * (self.columns * 2 + 1))
        print(" " + " ".join(str(i) for i in range(self.columns)))

    def is_valid_location(self, column):
        return self.board[self.rows - 1][column] == 0

    def get_valid_locations(self) -> list[int]:
        valid_locations = []
        for col in range(self.columns):
            if self.is_valid_location(col):
                valid_locations.append(col)
        return valid_locations

    def is_board_full(self):
        return np.all(self.board != 0)


if __name__ == "__main__":
    game = ConnectFour()
    game.print_board()
    while not game.game_over:
        try:
            col = int(input("Player {} - Choose a column: ".format(game.player)))
            if not (0 <= col < game.columns):
                raise ValueError
            if game.is_valid_location(col):
                game.drop_piece(col)
                game.print_board()
                if game.check_win(game.rows - 1, col):
                    print("Player {} wins!".format(game.player))
                    break
                if game.is_board_full():
                    print("It's a draw!")
                    break
            else:
                print("Invalid move. Try again.")
        except ValueError:
            print("Invalid input. Please enter a valid column number.")
