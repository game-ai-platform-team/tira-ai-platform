import subprocess
import time
from engine_wrapper import EngineWrapper
from path import stockfish_path

class Chess:
    def __init__(self, ai_name_white, ai_name_black, engine_wrapper):
        self.ai_name_white = ai_name_white
        self.ai_name_black = ai_name_black
        self.engine_wrapper = engine_wrapper

    def get_move_from_ai(self, boardstate, ai_name):
        return subprocess.run(
            ["python", f"src/{ai_name}", f"-b {','.join(boardstate)}"],
            stdout=subprocess.PIPE).stdout.decode('utf-8')

    def get_move_from_self(self):
        return self.engine_wrapper.calculate_move()

    def play(self, turns, delay):
        self.print_board()
        time.sleep(delay)

        for _ in range(turns):
            white_move = self.get_move_from_ai(self.engine_wrapper.boardstate, self.ai_name_white)

            try:
                self.engine_wrapper.engine.make_moves_from_current_position([
                                                                            white_move])
            except BaseException:
                if black_move == "None\n":
                    print("\nBlack won!")
                else:
                    print(f"invalid white move: {black_move}")
                break

            self.engine_wrapper.boardstate.append(white_move)

            self.print_board()
            time.sleep(delay)

            black_move = self.get_move_from_ai(self.engine_wrapper.boardstate, self.ai_name_black)

            try:
                self.engine_wrapper.engine.make_moves_from_current_position([
                                                                            black_move])
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


if __name__ == "__main__":
    sf_path = stockfish_path()
    ew = EngineWrapper([], 5, sf_path)
    c = Chess("test_ai.py", "test_ai_random.py")
    c.play(1000, 0.1)
