import os
from stockfish.models import Stockfish as sf

def stockfish_path():
    path = os.path.join(
        os.path.dirname(__file__),
        "../engines/stockfish_ubuntu/stockfish-ubuntu-x86-64-avx2",
    )
    return path

def get_stockfish_engine():
    sf_path = stockfish_path()
    engine = sf(path=sf_path)
    return engine
