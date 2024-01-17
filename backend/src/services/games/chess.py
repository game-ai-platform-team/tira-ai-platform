import subprocess
import time

from stockfish_path import stockfish_path
from utils.engine_wrapper import EngineWrapper

from entities.player import Player


class Chess:
    def __init__(self, ai_name_white, ai_name_black, engine_wrapper):
        self.ai_name_white = ai_name_white
        self.ai_name_black = ai_name_black
        self.engine_wrapper = engine_wrapper
        self.player = Player(ai_name_white)
        self.judger = Player(ai_name_black)

    def play(self, turns, delay):
        self.print_board()
        time.sleep(delay)

        for _ in range(turns):
            white_move = self.player.play(self.engine_wrapper.boardstate)

            try:
                self.engine_wrapper.engine.make_moves_from_current_position(
                    [white_move]
                )
            except BaseException:
                if white_move == "None\n":
                    print("\nBlack won!")
                else:
                    print(f"invalid white move: {white_move}")
                break

            self.engine_wrapper.boardstate.append(white_move)

            self.print_board()
            time.sleep(delay)

            black_move = self.judger.play(self.engine_wrapper.boardstate)

            try:
                self.engine_wrapper.engine.make_moves_from_current_position(
                    [black_move]
                )
            except BaseException:
                if black_move == "None\n":
                    print("\nWhite won!")
                else:
                    print(f"invalid black move: {black_move}")
                break

            self.engine_wrapper.boardstate.append(black_move)

            self.print_board()
            time.sleep(delay)

        self.print_board()

    def print_board(self):
        print(self.engine_wrapper.engine.get_board_visual())
        print(self.engine_wrapper.boardstate)
