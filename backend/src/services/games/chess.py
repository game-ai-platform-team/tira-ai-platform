import time

from entities.player import Player
from stockfish_path import stockfish_path
from utils.engine_wrapper import EngineWrapper


class Chess:
    def __init__(self, player1_file, player2_file, engine_wrapper):
        self.engine_wrapper = engine_wrapper
        self.player1 = Player(player1_file)
        self.player2 = Player(player2_file)

    def play(self, turns, delay):
        self.print_board()
        time.sleep(delay)

        for _ in range(turns):
            white_move = self.player1.play(self.get_board())

            if not self.validate(white_move):
                print("White lost")
                break

            self.add_move(white_move)

            self.print_board()
            time.sleep(delay)

            black_move = self.player2.play(self.get_board())

            if not self.validate(black_move):
                print("Black lost")
                break

            self.add_move(black_move)

            self.print_board()
            time.sleep(delay)

        self.print_board()

    def validate(self, move: str) -> bool:
        """
        Validates the move.

        Args:
            move (str): Move of a player.

        Returns:
            bool: True if game continues, False if player of the move lost.
        """

        try:
            self.engine_wrapper.engine.make_moves_from_current_position([move])
        except ValueError:
            return False

        return True

    def add_move(self, move: str) -> None:
        """
        Adds move to the board.

        Args:
            move (str): Move to add.
        """

        self.engine_wrapper.boardstate.append(move)

    def get_board(self) -> list[str]:
        """
        Return current board.

        Returns:
            list[str]: Board as list of moves.
        """

        return self.engine_wrapper.boardstate

    def print_board(self):
        print(self.engine_wrapper.engine.get_board_visual())
        print(self.get_board())
