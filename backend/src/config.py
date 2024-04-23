from os import getenv
from pathlib import Path

from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent.parent.parent
BACKEND_DIR = ROOT_DIR / "backend"
FRONTEND_DIR = ROOT_DIR / "frontend" / "dist"
IMAGE_DIR = ROOT_DIR / "game-image"

try:
    load_dotenv(dotenv_path=BACKEND_DIR / ".env")
    load_dotenv(dotenv_path=BACKEND_DIR / ".env.secret")
except FileNotFoundError:
    pass

TEMP_DIR = BACKEND_DIR / "temp"
TEMP_DIR.mkdir(exist_ok=True)

DEFAULT_GAME_TIMEOUT = int(getenv("DEFAULT_GAME_TIMEOUT") or 20)

OIDC_CLIENT_ID = getenv("OIDC_CLIENT_ID")
OIDC_CLIENT_SECRET = getenv("OIDC_CLIENT_SECRET")
OIDC_REDIRECT_PATH = getenv("OIDC_REDIRECT_PATH") or "https://localhost:5000"

# if not (OIDC_CLIENT_ID and OIDC_CLIENT_SECRET):
# raise KeyError("OIDC client id or secret missing")

HPC_LOGIN_NODE = getenv("HPC_LOGIN_NODE")
HPC_USERNAME = getenv("HPC_USERNAME")
HPC_SSH_PRIVATE_KEY_PATH = (
    getenv("HPC_SSH_PRIVATE_KEY_LOCATION") or BACKEND_DIR / "hpc_private_key"
)

BATCH_CONFIG = {
    "cluster": "ukko",
    "memory": "4G",
    "partition": "short",
    "cpu": 1,
    "time": "00:10:00",
    "modules": [
        "Python/3.11.5-GCCcore-13.2.0",
        "Java/17.0.6",
        "Singularity_nosuid/4.1.1-GCC-13.2.0",
        "poetry/1.6.1-GCCcore-13.2.0",
        "OpenSSL/1.1",
        "git/2.42.0-GCCcore-13.2.0",
    ],
    "bind_paths": [
        "/wrk-vakka/appl/easybuild/",
        "/appl/easybuild/opt/",
        "/lib64/libssl.so.1.1",
        "/lib64/libcrypto.so.1.1",
        "/etc/pki/tls/certs/ca-bundle.crt",
    ],
}
