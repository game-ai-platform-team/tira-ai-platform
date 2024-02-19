import select
import subprocess
import time
from pathlib import Path

from config import DEFAULT_CHESS_TIMEOUT
from entities.player_logger import PlayerLogger


class Player:
    def __init__(self, path: Path, timeout: float = DEFAULT_CHESS_TIMEOUT) -> None:
        self.__path = path
        self.__timeout = timeout
        self.__process = subprocess.Popen(
            args=["python3", str(self.__path)],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        self.__turn_logger = PlayerLogger()
        self.__all_logger = PlayerLogger()

    def get_and_reset_current_logs(self) -> str:
        return self.__turn_logger.get_and_clear_logs()

    def play(self, move) -> str:
        if self.__process.poll() is not None:
            raise ProcessLookupError("Process has terminated unexpectedly.")

        input_string = move + "\n"
        self.__process.stdin.write(input_string.encode("utf-8"))
        self.__process.stdin.flush()

        readable, _, _ = select.select([self.__process.stdout], [], [], self.__timeout)
        if not readable:
            self.terminate_self()
            raise TimeoutError(f"Operation timed out: {self.__path}")

        while True:
            out = self.__process.stdout.readline().decode("utf-8")
            if out:
                self.__all_logger.log(out[:-1])
            if not out:
                break
            elif out.startswith("MOVE: "):
                return out[5:].strip()
            else:
                self.__turn_logger.log(out.strip() + "\n")

        return ""

    def terminate_self(self):
        self.__process.terminate()
        self.__process.wait()

    def get_and_reset_all_logs(self):
        return self.__all_logger.get_and_clear_logs()
