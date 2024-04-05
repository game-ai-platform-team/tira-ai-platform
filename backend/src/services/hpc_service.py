from contextlib import AbstractContextManager
from functools import cached_property
from pathlib import Path
from types import TracebackType
from uuid import uuid1

from config import TEMP_DIR
from entities.ssh_connection import SSHConnection

BATCH_CONFIG = {
    "cluster": "ukko",
    "memory": "4G",
    "partition": "short",
    "cpu": 1,
    "time": "00:10:00",
}


class HPCService(AbstractContextManager):
    def __init__(
        self, connection: SSHConnection | None = None, id_: str | None = None
    ) -> None:
        self.__connection: SSHConnection = connection or SSHConnection()
        self.__id: str = id_ or str(uuid1())
        self.__current_output_line = 0

    def __enter__(self) -> "HPCService":
        self.__connection.__enter__()
        self.__connection.execute(f"touch {self.output_path}")

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

    @cached_property
    def batch_path(self) -> Path:
        return TEMP_DIR / f"batch-{self.__id}.sh"

    def submit(self, game: str, repository_url: str, difficulty: int) -> None:
        """
        Submits new game image to HPC.

        Args:
            game (str): Game type.
            repository_url (str): URL of AI repository.
            difficulty (int): Difficulty for reference AI.
        """

        batch = self.__create_script(game, repository_url, difficulty)
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

    def __create_script(self, game: str, repository_url: str, difficulty: int) -> Path:
        environment_variables = {
            "GAME": game,
            "REPOSITORY_URL": repository_url,
            "DIFFICULTY": difficulty,
        }
        environment_variable_pairs = ",".join(
            f"{key}={value}" for key, value in environment_variables.items()
        )

        script = "\n".join(
            [
                "#!/bin/bash",
                f"#SBATCH -M {BATCH_CONFIG['cluster']}",
                f"#SBATCH -p {BATCH_CONFIG['partition']}",
                f"#SBATCH --mem {BATCH_CONFIG['memory']}",
                f"#SBATCH -t {BATCH_CONFIG['time']}",
                f"#SBATCH -t {BATCH_CONFIG['cpu']}",
                f"#SBATCH -o result-{self.__id}.txt",
                f"#SBATCH --export={environment_variable_pairs}",
                "echo 'Hello world!'",
            ]
        )

        with open(self.batch_path, mode="w", encoding="utf-8") as file:
            file.write(script)

        return self.batch_path
