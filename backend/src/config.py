import os
from os import getenv
from pathlib import Path

from dotenv import load_dotenv

ROOTDIR = Path(__file__).parent.parent

try:
    load_dotenv(dotenv_path=ROOTDIR / ".env")
except FileNotFoundError:
    pass

TEMP_DIR = Path(os.getenv("HOME")) / "temp"

DEFAULT_CHESS_AI_FILENAME = getenv("DEFAULT_CHESS_AI_FILENAME") or "ai.py"
DEFAULT_CHESS_AI_PATH = ROOTDIR / "src" / DEFAULT_CHESS_AI_FILENAME
