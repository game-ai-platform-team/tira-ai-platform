import random

from stockfish_engine import get_stockfish_engine
from utils.engine_wrapper import EngineWrapper

moves = input().split(",")

sf = get_stockfish_engine()
engine = EngineWrapper(moves, 3, sf)

try:
    move = random.choice(engine.engine.get_top_moves(30))["Move"]
except:
    move = None

print(move)
