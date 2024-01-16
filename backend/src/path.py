import os


def stockfish_path():
    path = os.path.join(
        os.path.dirname(__file__),
        "../engines/stockfish_ubuntu/stockfish-ubuntu-x86-64-avx2",
    )
    return path
