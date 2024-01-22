from stockfish_engine import get_stockfish_engine
from utils.engine_wrapper import EngineWrapper

moves = input().split(",")

sf = get_stockfish_engine()
engine = EngineWrapper(moves, 4, sf)

print(engine.engine.get_best_move())
