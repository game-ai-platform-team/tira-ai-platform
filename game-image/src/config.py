from os import getenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent.parent

STOCKFISH_PATH = "stockfish"
DEFAULT_CHESS_TIMEOUT = float(getenv("CHESS_TIMEOUT") or 5)
