from os import getenv
from pathlib import Path

from dotenv import load_dotenv

ROOTDIR = Path(__file__).parent.parent

try:
    load_dotenv(dotenv_path = ROOTDIR / ".env")
    load_dotenv(dotenv_path = ROOTDIR / ".env.secret")
except FileNotFoundError:
    pass

TEMP_DIR = Path(getenv("HOME") or "~") / "temp"

DEFAULT_CHESS_AI_FILENAME = getenv("DEFAULT_CHESS_AI_FILENAME") or "chess_ai.py"
DEFAULT_CHESS_AI_PATH = ROOTDIR / "src" / DEFAULT_CHESS_AI_FILENAME
DEFAULT_CHESS_TIMEOUT = float(getenv("CHESS_TIMEOUT") or 5)

OIDC_CLIENT_ID = getenv("OIDC_CLIENT_ID")
OIDC_CLIENT_SECRET = getenv("OIDC_CLIENT_SECRET")
OIDC_REDIRECT_PATH = getenv("OIDC_REDIRECT_PATH") or "https://localhost:5000"

# if not (OIDC_CLIENT_ID and OIDC_CLIENT_SECRET):
# raise KeyError("OIDC client id or secret missing")
