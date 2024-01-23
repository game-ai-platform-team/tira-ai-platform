from stockfish_engine import get_stockfish_engine
from utils.engine_wrapper import EngineWrapper

moves = input().split(",")

engine = get_stockfish_engine()
engine.set_position(moves)
print(engine.get_best_move())
