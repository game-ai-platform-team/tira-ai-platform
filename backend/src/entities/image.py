from pathlib import Path
from uuid import uuid1

from config import TEMP_DIR


class Image:
    """
    Class representing a runnable game image without network.
    """

    def __init__(self, id_: str | None = None, path: Path | None = None) -> None:
        self.__id: str = id_ or str(uuid1())
        self.__path: Path = path or TEMP_DIR / "images" / self.__id
