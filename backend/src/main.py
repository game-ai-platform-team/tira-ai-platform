"""
Wraps Stockfish
"""

import os
import time
from pathlib import Path

from config import ROOTDIR
from services.games.chess import Chess
from stockfish_engine import get_stockfish_engine
from utils.engine_wrapper import EngineWrapper

if __name__ == "__main__":
    if True:
        engine = get_stockfish_engine()
        ew = EngineWrapper([], 5, engine)
        c = Chess(
            Path(ROOTDIR / "src" / "ai.py"), Path(ROOTDIR / "src" / "ai_random.py"), ew
        )
        c.play(1000, 0.1)

    if False:
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
