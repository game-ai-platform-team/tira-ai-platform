from os import getenv
from pathlib import Path

from dotenv import load_dotenv

from services.games.chess import Chess

ROOTDIR = Path(__file__).parent.parent

try:
    load_dotenv(dotenv_path=ROOTDIR / ".env")
except FileNotFoundError:
    pass

TEMP_DIRNAME = getenv("TEMP_DIRNAME") or "temp"
TEMP_DIR = ROOTDIR / TEMP_DIRNAME

DEFAULT_CHESS_AI_FILENAME = getenv("DEFAULT_CHESS_AI_FILENAME") or "ai.py"
DEFAULT_CHESS_AI_PATH = ROOTDIR / "src" / DEFAULT_CHESS_AI_FILENAME
