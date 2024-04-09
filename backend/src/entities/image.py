import os
from contextlib import AbstractContextManager
from pathlib import Path
from types import TracebackType
from uuid import uuid1

from config import ROOTDIR, TEMP_DIR


class Image(AbstractContextManager):
    """
    Class representing a runnable game image without network.
    """

    def __init__(self, id_: str | None = None, path: Path | None = None) -> None:
        self.__id: str = id_ or str(uuid1())
        self.__path: Path = path or TEMP_DIR / f"{self.__id}.sif"

    @property
    def path(self) -> Path:
        return self.__path

    @property
    def id(self) -> str:
        return self.__id

    def __enter__(self) -> "Image":
        os.system(f"docker build {ROOTDIR} -t {self.__id}")
        os.system(f"singularity build {self.path} docker-daemon://{self.__id}")

        return self

    def __exit__(
        self,
        exc_type: type[BaseException] | None,
        exc_value: BaseException | None,
        traceback: TracebackType | None,
    ) -> bool | None:
        pass
