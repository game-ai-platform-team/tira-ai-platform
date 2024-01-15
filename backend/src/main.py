from engine_wrapper import EngineWrapper
import time

print("Hello world!! Let's play chess :DDDDDDDDD")

engine_wrapper = EngineWrapper([], 5)

for _ in range(999):
    best_move = engine_wrapper.calculate_move()
    engine_wrapper.add_moves([best_move])
    time.sleep(0.1)
    print(engine_wrapper.engine.get_board_visual())
    print(engine_wrapper.boardstate)
    print(engine_wrapper.engine.get_evaluation())
