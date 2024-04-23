import tarfile
from io import BytesIO
from pathlib import Path
from shutil import copy
from tempfile import TemporaryDirectory

from filelock import FileLock
from urllib3 import request

from config import STOCKFISH_PATH as DEFAULT_STOCKFISH_PATH


def install_stockfish(path: Path = DEFAULT_STOCKFISH_PATH) -> None:
    """
    Installs stockfish binary if missing.

    Args:
        path (Path): Path to install stockfish binary
    """

    with FileLock(path.with_suffix(".lock")):
        if path.exists():
            return

        # pylint: disable=line-too-long
        response = request(
            "GET",
            "https://github.com/official-stockfish/Stockfish/releases/latest/download/stockfish-ubuntu-x86-64-avx2.tar",
        )
        # pylint: enable=line-too-long

        with (
            TemporaryDirectory() as temp_dir,
            tarfile.open(fileobj=BytesIO(response.data)) as file,
        ):
            file.extract("stockfish/stockfish-ubuntu-x86-64-avx2", temp_dir)
            copy(temp_dir / Path("stockfish/stockfish-ubuntu-x86-64-avx2"), path)


if __name__ == "__main__":
    install_stockfish()
