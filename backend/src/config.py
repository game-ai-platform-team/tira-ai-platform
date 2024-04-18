from os import getenv
from pathlib import Path

from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent.parent

try:
    load_dotenv(dotenv_path=ROOT_DIR / ".env")
    load_dotenv(dotenv_path=ROOT_DIR / ".env.secret")
except FileNotFoundError:
    pass

TEMP_DIR = ROOT_DIR / "temp"
TEMP_DIR.mkdir(exist_ok=True)

IMAGE_DIR = ROOT_DIR.parent / "game-image"

DEFAULT_CHESS_TIMEOUT = float(getenv("CHESS_TIMEOUT") or 5)

OIDC_CLIENT_ID = getenv("OIDC_CLIENT_ID")
OIDC_CLIENT_SECRET = getenv("OIDC_CLIENT_SECRET")
OIDC_REDIRECT_PATH = getenv("OIDC_REDIRECT_PATH") or "https://localhost:5000"

# if not (OIDC_CLIENT_ID and OIDC_CLIENT_SECRET):
# raise KeyError("OIDC client id or secret missing")

HPC_LOGIN_NODE = getenv("HPC_LOGIN_NODE")
HPC_USERNAME = getenv("HPC_USERNAME")
HPC_SSH_PRIVATE_KEY_PATH = (
    getenv("HPC_SSH_PRIVATE_KEY_LOCATION") or ROOT_DIR / "hpc_private_key"
)
HPC_GAME_IMAGE_PATH = getenv("HPC_GAME_IMAGE_PATH")
