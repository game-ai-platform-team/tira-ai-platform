import argparse

from engine_wrapper import EngineWrapper

parser = argparse.ArgumentParser()
parser.add_argument("-b", nargs="+", default=[])

args = parser.parse_args()

moves = args.b[0].split(",")

engine = EngineWrapper(moves, 3)

print(engine.engine.get_best_move())
