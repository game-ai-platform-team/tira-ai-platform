from engine_wrapper import EngineWrapper

print("Hello world!! Let's play chess :DDDDDDDDD")

engine_wrapper = EngineWrapper([], 5)

for _ in range(4):
    best_move = engine_wrapper.calculate_move()
    engine_wrapper.add_moves([best_move])

print(engine_wrapper.boardstate)