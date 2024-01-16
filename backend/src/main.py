<<<<<<< HEAD
from app import app

if __name__ == '__main__':
    app.run(port = 5001, debug = True)
=======
"""
Wraps Stockfish
"""

import time
import os
from engine_wrapper import EngineWrapper


if __name__ == "__main__":
    print(os.getcwd())
    print("Hello world!! Let's play chess :DDDDDDDDD")

    engine_wrapper = EngineWrapper([], 5)

    for _ in range(999):
        best_move = engine_wrapper.calculate_move()
        engine_wrapper.add_moves([best_move])
        time.sleep(0.1)
        print(engine_wrapper.engine.get_board_visual())
        print(engine_wrapper.boardstate)
        print(engine_wrapper.engine.get_evaluation())
>>>>>>> 6c020539c9151e1c2c04760fe340b12fade929b6
