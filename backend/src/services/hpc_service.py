from contextlib import AbstractContextManager
from pathlib import Path
from types import TracebackType
from uuid import uuid1

from config import BATCH_CONFIG, TEMP_DIR
from entities.ssh_connection import SSHConnection


class HPCService(AbstractContextManager):
    def __init__(
        self,
        remote_image_path: Path,
        connection: SSHConnection | None = None,
        id_: str | None = None,
    ) -> None:
        self.__connection: SSHConnection = connection or SSHConnection()
        self.__id: str = id_ or str(uuid1())
        self.__remote_image_path: Path = remote_image_path
        self.__current_output_line: int = 0

        self.__working_directory: Path = Path(self.__id)
        self.__output_path = self.__working_directory / f"result-{self.__id}.txt"
        self.__batch_path = TEMP_DIR / f"batch-{self.__id}.sh"

    def __enter__(self) -> "HPCService":
        self.__connection.__enter__()
        self.__connection.execute(f"mkdir {self.__working_directory}")
        self.__connection.execute(f"touch {self.__output_path}")

        return self

    def __exit__(
        self,
        exc_type: type[BaseException] | None,
        exc_value: BaseException | None,
        traceback: TracebackType | None,
    ) -> bool | None:
        self.__connection.remove(self.__working_directory)
        self.__batch_path.unlink(missing_ok=True)

        self.__connection.__exit__(exc_type, exc_value, traceback)

    def submit(self, game: str, difficulty: int, repository_url: str) -> None:
        """
        Submits a game job to the HPC.

        Args:
            game (str): Game type.
            difficulty (int): Reference AI difficulty.
            repository_url (str): URL of the repository containing the AI code.
        """

        remote_batch_path = self.__working_directory / self.__batch_path.name

        self.__create_script(game, difficulty, repository_url)
        self.__connection.send_file(self.__batch_path, remote_batch_path)

        self.__connection.execute(f"sbatch {remote_batch_path}")

    def read_output(self) -> list[str]:
        """
        Reads new lines in output file since previous read.

        Returns:
            list[str]: New lines of output file.
        """

        data = self.__connection.read_file(self.__output_path)
        new_lines = data[self.__current_output_line :]

        self.__current_output_line = len(data)

        return new_lines

    def __create_script(self, game: str, difficulty: int, repository_url: str) -> None:
        modules = " ".join(BATCH_CONFIG["modules"])
        bind_paths = ",".join(BATCH_CONFIG["bind_paths"])

        script = "\n".join(
            [
                "#!/bin/bash",
                f"#SBATCH -M {BATCH_CONFIG['cluster']}",
                f"#SBATCH -p {BATCH_CONFIG['partition']}",
                f"#SBATCH --mem {BATCH_CONFIG['memory']}",
                f"#SBATCH -t {BATCH_CONFIG['time']}",
                f"#SBATCH -t {BATCH_CONFIG['cpu']}",
                f"#SBATCH -o {self.__output_path}",
                "module purge",
                f"module load {modules}",
                "export SINGULARITYENV_PREPEND_PATH=$PATH",
                "export SINGULARITYENV_LD_LIBRARY_PATH=$LD_LIBRARY_PATH",
                f"export SINGULARITYENV_REPOSITORY_URL={repository_url}",
                f"export SINGULARITYENV_GAME={game}",
                f"export SINGULARITYENV_DIFFICULTY={difficulty}",
                f"export SINGULARITY_BIND={bind_paths}",
                f"singularity run --writable-tmpfs --no-home --pwd /app {self.__remote_image_path}",
            ]
        )

        with open(self.__batch_path, mode="w", encoding="utf-8") as file:
            file.write(script)
