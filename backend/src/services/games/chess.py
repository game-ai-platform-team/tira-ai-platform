import json
import time

from entities.chess_judger import ChessJudger
from entities.player import Player


class Chess:
    def __init__(self, player1_file, player2_file, engine_wrapper):
        self.judger = ChessJudger(engine_wrapper)
        self.player1 = Player(player1_file)
        self.player2 = Player(player2_file)

    def play(self, turns, delay):
        self.print_board()
        time.sleep(delay)

        for _ in range(turns):
            white_move = self.player1.play(self.judger.get_board())

            if not self.judger.validate(white_move):
                print("White lost")
                break

            self.judger.add_move(white_move)

            self.print_board()
            time.sleep(delay)

            black_move = self.player2.play(self.judger.get_board())

            if not self.judger.validate(black_move):
                print("Black lost")
                break

            self.judger.add_move(black_move)

            self.print_board()
            time.sleep(delay)

        self.print_board()

        moves = "".join(self.judger.get_board())
        result = json.dumps({"moves": moves})

        return result

    def print_board(self):
        print(self.judger.get_visual_board())
        print(self.judger.get_board())
