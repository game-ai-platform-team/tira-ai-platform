from os import getenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent.parent

BINARY_DIR = ROOT_DIR / "bin"
BINARY_DIR.mkdir(exist_ok=True)

STOCKFISH_PATH = BINARY_DIR / "stockfish"

DEFAULT_CHESS_TIMEOUT = float(getenv("CHESS_TIMEOUT") or 5)
