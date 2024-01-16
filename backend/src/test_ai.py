import argparse
from engine_wrapper import EngineWrapper
from path import stockfish_path

parser = argparse.ArgumentParser()
parser.add_argument("-b", nargs="+", default=[])

args = parser.parse_args()

moves = args.b[0].split(",")

sf_path = stockfish_path()
engine = EngineWrapper(moves, 3, sf_path)

print(engine.engine.get_best_move())
