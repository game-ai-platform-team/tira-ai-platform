import os
from contextlib import AbstractContextManager
from pathlib import Path
from types import TracebackType
from uuid import uuid1

from config import IMAGE_DIR, TEMP_DIR


class Image:
    """
    Class representing a runnable game image without network.
    """

    def __init__(self, id_: str | None = None, ) -> None:
        self.__id: str = id_ or str(uuid1())
        os.system(f"docker build {IMAGE_DIR} -t game-image")
        os.system(f"singularity build {self.path} docker-daemon://game-image")

    @property
    def path(self) -> Path:
        return TEMP_DIR / f"{self.__id}.sif"

    @property
    def id(self) -> str:
        return self.__id

    def remove(self):
        os.system(f"docker rmi $(docker images | grep {self.__id})")
        self.path.unlink(missing_ok = True)
