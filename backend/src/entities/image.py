import os
import re
from contextlib import AbstractContextManager
from pathlib import Path
from types import TracebackType
from uuid import uuid1

from config import IMAGE_DIR, TEMP_DIR


class Image(AbstractContextManager):
    """
    Class representing a runnable game image without network.
    """

    def __init__(
        self,
        game: str,
        repository_url: str,
        difficulty: int,
        id_: str | None = None,
        path: Path | None = None,
    ) -> None:
        self.__id: str = id_ or str(uuid1())
        self.__path: Path = path or TEMP_DIR / f"{self.__id}.sif"

        build_args = {
            "GAME": game,
            "GAME_ID": self.__id,
            "REPOSITORY_URL": repository_url,
            "DIFFICULTY": difficulty,
        }

        self.__build_args = " ".join(
            [f"--build-arg {key}={value}" for key, value in build_args.items()]
        )

    @property
    def path(self) -> Path:
        return self.__path

    @property
    def id(self) -> str:
        return self.__id

    def __enter__(self) -> "Image":
        os.system(f"docker build {IMAGE_DIR} -t {self.__id} {self.__build_args}")
        os.system(f"singularity build {self.path} docker-daemon://{self.__id}")

        return self

    def __exit__(
        self,
        exc_type: type[BaseException] | None,
        exc_value: BaseException | None,
        traceback: TracebackType | None,
    ) -> bool | None:
        os.system(f"docker rmi $(docker images | grep {self.__id})")
        self.__path.unlink(missing_ok=True)
