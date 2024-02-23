import select
import subprocess

from config import DEFAULT_CHESS_TIMEOUT
from entities.cloned_repository import ClonedRepository
from entities.player_logger import PlayerLogger


class Player:
    def __init__(
            self, repo: ClonedRepository, timeout: float = DEFAULT_CHESS_TIMEOUT
    ) -> None:
        self.repo = repo
        self.__timeout = timeout
        self.__process = None

        setup_script_path = repo.path / "tiraconfig/setup.sh"
        runcommand_path = repo.path / "tiraconfig/runcommand"

        subprocess.run(["bash", setup_script_path], cwd = repo.path, check = True)

        with open(runcommand_path, "r", encoding = "utf-8") as runcommand_file:
            self.runcommand = runcommand_file.readline()

        self.__turn_logger = PlayerLogger()
        self.__all_logger = PlayerLogger()

    def get_and_reset_current_logs(self) -> str:
        return self.__turn_logger.get_and_clear_logs()

    def play(self, move) -> str:
        if self.__process.poll():
            raise ProcessLookupError("Process has terminated unexpectedly.")

        input_string = move + "\n"
        self.__process.stdin.write(input_string.encode("utf-8"))
        self.__process.stdin.flush()

        readable, _, _ = select.select([self.__process.stdout], [], [], self.__timeout)
        if not readable:
            self.terminate_self()
            raise TimeoutError(f"Operation timed out: {self.repo.path}")

        while True:
            if not self.__process.stdout:
                break

            output = self.__process.stdout.readline().decode("utf-8")

            self.__all_logger.log(output[:-1])

            if output.startswith("MOVE: "):
                return output.replace("MOVE: ", "").strip()

            self.__turn_logger.log(output.strip() + "\n")

        return ""

    def __enter__(self):
        print(self.runcommand)
        runcommand_array = self.runcommand.strip().split(" ")
        self.__process = subprocess.Popen(
            args = runcommand_array,
            stdin = subprocess.PIPE,
            stdout = subprocess.PIPE,
            stderr = subprocess.PIPE,
            cwd = self.repo.path,
        )

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.terminate_self()

    def terminate_self(self):
        if self.__process is not None:
            self.__process.terminate()
            self.__process.wait()
        self.__process = None

    def get_and_reset_all_logs(self):
        return self.__all_logger.get_and_clear_logs()
