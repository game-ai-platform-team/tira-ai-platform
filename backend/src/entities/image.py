from contextlib import AbstractContextManager
from pathlib import Path
from types import TracebackType
from uuid import uuid1

from spython.main import Client as client

from config import ROOTDIR, TEMP_DIR


class Image(AbstractContextManager):
    """
    Class representing a runnable game image without network.
    """

    def __init__(self, id_: str | None = None, path: Path | None = None) -> None:
        self.__id: str = id_ or str(uuid1())
        self.__path: Path = path or TEMP_DIR / f"{self.__id}.sif"
        self.__client = client

    def __enter__(self) -> "Image":
        self.__client.build(
            recipe=str(ROOTDIR / "Singularity"), build_folder=str(self.__path.parent)
        )

        return self

    def __exit__(
        self,
        exc_type: type[BaseException] | None,
        exc_value: BaseException | None,
        traceback: TracebackType | None,
    ) -> bool | None:
        pass
