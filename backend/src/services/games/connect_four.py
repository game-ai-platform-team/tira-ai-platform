import numpy as np

from entities.judge import Judge
from game_state import GameState


class ConnectFour:
    def __init__(self, columns=7, rows=6):
        self.columns = columns
        self.rows = rows
        self.board = np.zeros((columns, rows), dtype=int)
        self.player = 1
        self.game_over = False
        self.pruning_judge = Judge(self.columns, self.rows)

    def drop_piece(self, column) -> None:
        for r in range(self.rows):
            if self.board[column][r] == 0:
                self.board[column][r] = self.player
                self.player = 3 - self.player  # Switch player

    def check_win(self, column, row) -> bool:
        if self.pruning_judge.is_game_over() == GameState.Win:
            return True
        return False

    def check_draw(self, column, row) -> bool:
        if self.pruning_judge.is_game_over() == GameState.Draw:
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

    def prune() -> int:
        best_move = 3

        return best_move
