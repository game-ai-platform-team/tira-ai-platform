from pathlib import Path
from os import getenv
from dotenv import load_dotenv

rootdir = Path(__file__).parent.parent

try:
    load_dotenv(dotenv_path=rootdir / ".env")
except FileNotFoundError:
    pass

TEMP_DIRNAME = getenv("TEMP_DIRNAME") or "temp"

TEMP_DIR = rootdir / TEMP_DIRNAME
