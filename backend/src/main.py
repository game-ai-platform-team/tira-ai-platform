"""
Wraps Stockfish
"""

import os
import time

from path import stockfish_path
from utils.engine_wrapper import EngineWrapper

if __name__ == "__main__":
    print(os.getcwd())
    print("Hello world!! Let's play chess :DDDDDDDDD")

    path = stockfish_path()
    engine_wrapper = EngineWrapper([], 5, path)

    for _ in range(999):
        best_move = engine_wrapper.calculate_move()
        engine_wrapper.add_moves([best_move])
        time.sleep(0.1)
        print(engine_wrapper.engine.get_board_visual())
        print(engine_wrapper.boardstate)
        print(engine_wrapper.engine.get_evaluation())
