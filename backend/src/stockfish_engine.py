from stockfish.models import Stockfish as sf

from stockfish_path import stockfish_path


def get_stockfish_engine():
    sf_path = stockfish_path()
    engine = sf(path=sf_path)
    return engine
