import argparse
import random
from engine_wrapper import EngineWrapper

parser = argparse.ArgumentParser()
parser.add_argument("-b", nargs="+", default=[])

args = parser.parse_args()

moves = args.b[0].split(",")

engine = EngineWrapper(moves, 3)

try:
    move = random.choice(engine.engine.get_top_moves(99))["Move"]
except:
    move = None

print(move)
