import argparse

from stockfish_engine import get_stockfish_engine
from utils.engine_wrapper import EngineWrapper

parser = argparse.ArgumentParser()
parser.add_argument("-b", nargs=1, default="", type=str)

args = parser.parse_args()

moves = args.b[0].split(",")

sf = get_stockfish_engine()
engine = EngineWrapper(moves, 3, sf)

print(engine.engine.get_best_move())
