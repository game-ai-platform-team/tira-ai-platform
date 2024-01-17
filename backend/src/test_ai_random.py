import argparse
import random

from stockfish_path import stockfish_path
from utils.engine_wrapper import EngineWrapper

parser = argparse.ArgumentParser()
parser.add_argument("-b", nargs=1, default="", type=str)

args = parser.parse_args()

moves = args.b[0].split(",")

sf_path = stockfish_path()
engine = EngineWrapper(moves, 3, sf_path)

try:
    move = random.choice(engine.engine.get_top_moves(30))["Move"]
except:
    move = None

print(move)
