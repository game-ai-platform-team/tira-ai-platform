from contextlib import AbstractContextManager
from functools import cached_property
from pathlib import Path
from types import TracebackType
from uuid import uuid1

from entities.ssh_connection import SSHConnection
from services.batch_builder import BatchBuilder


class HPCService(AbstractContextManager):
    def __init__(
        self, connection: SSHConnection | None = None, id_: str | None = None
    ) -> None:
        self.__connection: SSHConnection = connection or SSHConnection()
        self.__id: str = id_ or str(uuid1())
        self.__current_output_line = 0

    def __enter__(self) -> "HPCService":
        self.__connection.__enter__()
        return self

    def __exit__(
        self,
        exc_type: type[BaseException] | None,
        exc_value: BaseException | None,
        traceback: TracebackType | None,
    ) -> bool | None:
        self.__connection.__exit__(exc_type, exc_value, traceback)

    @cached_property
    def output_path(self) -> Path:
        return Path(f"result-{self.__id}.txt")

    def submit(self, game: str, repository_url: str, difficulty: int) -> None:
        """
        Submits new game image to HPC.

        Args:
            game (str): Game type.
            repository_url (str): URL of AI repository.
            difficulty (int): Difficulty for reference AI.
        """

        batch = BatchBuilder.create_script(game, repository_url, difficulty, self.__id)

        remote_path = self.__connection.send_file(batch)

        self.__connection.execute(f"sbatch {remote_path}")

    def read_output(self) -> list[str]:
        """
        Reads new lines in output file since previous read.

        Returns:
            list[str]: New lines of output file.
        """

        data = self.__connection.read_file(self.output_path)
        new_lines = data[self.__current_output_line :]

        self.__current_output_line = len(data)

        return new_lines
