import select
import subprocess
import time
from pathlib import Path

from config import DEFAULT_CHESS_TIMEOUT


class Player:
    def __init__(self, path: Path, timeout: float = DEFAULT_CHESS_TIMEOUT) -> None:
        # pylint: disable=consider-using-with
        self.__path: Path = path
        self.__timeout = timeout
        self.__process = subprocess.Popen(
            args=["python3", str(self.__path)],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )

    def play(self, move) -> str:
        if self.__process.poll() is not None:
            raise ProcessLookupError

        input_string = move + "\n"

        self.__process.stdin.write(input_string.encode("utf-8"))
        self.__process.stdin.flush()

        readable, _, _ = select.select([self.__process.stdout], [], [], self.__timeout)

        if not readable:
            self.terminate_self()
            raise TimeoutError(self.__path)

        out = self.__process.stdout.readline()

        return out.decode("utf-8").replace("\n", "")

    def terminate_self(self):
        self.__process.terminate()
        time.sleep(0.01)
