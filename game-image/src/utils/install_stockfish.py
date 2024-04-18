import tarfile
from io import BytesIO
from pathlib import Path
from shutil import copy
from tempfile import TemporaryDirectory
from urllib3 import request


def install_stockfish(path: Path) -> None:
    """
    Installs stockfish binary if missing.

    Args:
        path (Path): Path to install stockfish binary
    """

    if path.exists():
        return

    response = request(
        "GET",
        "https://github.com/official-stockfish/Stockfish/releases/latest/download/stockfish-ubuntu-x86-64-avx2.tar",
    )

    with (
        TemporaryDirectory() as temp_dir,
        tarfile.open(fileobj=BytesIO(response.data)) as file,
    ):
        file.extract("stockfish/stockfish-ubuntu-x86-64-avx2", temp_dir)
        copy(temp_dir / Path("stockfish/stockfish-ubuntu-x86-64-avx2"), path)
