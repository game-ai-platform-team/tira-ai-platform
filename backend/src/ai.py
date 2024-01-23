from stockfish_engine import get_stockfish_engine

moves = input().split(",")

engine = get_stockfish_engine()
engine.set_position(moves)
print("test")
print(engine.get_best_move())
