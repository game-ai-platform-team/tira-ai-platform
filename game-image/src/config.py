from os import getenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent.parent
DEFAULT_CHESS_TIMEOUT = float(getenv("CHESS_TIMEOUT") or 5)
