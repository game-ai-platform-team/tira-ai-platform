import select
import subprocess
from pathlib import Path

from git import Repo

from config import DEFAULT_CHESS_TIMEOUT
from entities.player_logger import PlayerLogger


class Player:
    def __init__(self, repo: Repo, timeout: float = DEFAULT_CHESS_TIMEOUT) -> None:
        self.repo = repo
        self.__timeout = timeout

        setup_script_path = Path(repo.working_dir) / "tiraconfig/setup.sh"
        runcommand_path = Path(repo.working_dir) / "tiraconfig/runcommand"

        subprocess.run(["bash", setup_script_path], cwd=repo.working_dir, check=True)

        with open(runcommand_path, "r", encoding="utf-8") as runcommand_file:
            self.runcommand = runcommand_file.readline()
        runcommand_array = self.runcommand.strip().split(" ")
        self.__process = subprocess.Popen(
            args=runcommand_array,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            cwd=self.repo.working_dir,
        )
        self.__turn_logger = PlayerLogger()
        self.__all_logger = PlayerLogger()

    def get_and_reset_current_logs(self) -> str:
        return self.__turn_logger.get_and_clear_logs()

    def play(self, move) -> str:
        if self.__process is None or self.__process.poll():
            raise ProcessLookupError("Process has terminated unexpectedly.")
        
        if move == "":
            input_string = "START: \n"
        else:
            input_string = f"MOVE: {move}\n"

        self.__process.stdin.write(input_string.encode("utf-8"))
        self.__process.stdin.flush()

        readable, _, _ = select.select([self.__process.stdout], [], [], self.__timeout)
        if not readable:
            self.terminate_self()
            raise TimeoutError(f"Operation timed out: {self.repo.working_dir}")

        while True:
            if not self.__process.stdout:
                break
            
            output = self.__process.stdout.readline().decode("utf-8")

            if output.strip(" ") != "":
                print(output)

            self.__all_logger.log(output[:-1])

            if output.startswith("MOVE: "):
                return output.replace("MOVE: ", "").strip()

            self.__turn_logger.log(output.strip() + "\n")

        return ""

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.terminate_self()

    def terminate_self(self):
        if self.__process is not None:
            self.__process.terminate()
            self.__process.wait()
        self.__process = None

    def get_and_reset_all_logs(self):
        return self.__all_logger.get_and_clear_logs()
