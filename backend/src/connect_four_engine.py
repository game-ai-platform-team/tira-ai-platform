import random

from entities.move import Move
from services.games.connect_four import ConnectFour


class ConnectFourEngine:
    def __init__(self, rows = 6, columns = 7):
        self.rows = rows
        self.columns = columns
        self.game = ConnectFour(rows, columns)

    def make_move(self, move: str):
        self.game.drop_piece(int(move))

    def get_best_move(self) -> str:
        valid_moves = self.game.get_valid_locations()

        for column in valid_moves:
            board = self.get_game_state()
            for row in range(len(board[0])):
                if board[row][column] == 0:
                    if self.game.check_win(row, column):
                        return str(column)
                    break

        return str(random.choice(valid_moves))

    def get_game_state(self) -> list[list[int]]:
        return self.game.get_board()


if __name__ == "__main__":
    engine = ConnectFourEngine()
