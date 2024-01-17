from os import getenv
from pathlib import Path

from dotenv import load_dotenv

ROOTDIR = Path(__file__).parent.parent

try:
    load_dotenv(dotenv_path=ROOTDIR / ".env")
except FileNotFoundError:
    pass

TEMP_DIRNAME = getenv("TEMP_DIRNAME") or "temp"

TEMP_DIR = ROOTDIR / TEMP_DIRNAME