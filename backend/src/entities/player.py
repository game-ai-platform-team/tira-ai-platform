import subprocess
from pathlib import Path
import time


class Player:
    def __init__(self, path: Path) -> None:
        # pylint: disable=consider-using-with
        self.__path: Path = path
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

        out = self.__process.stdout.readline()

        return out.decode("utf-8").replace("\n", "")

    def terminate_self(self):
        self.__process.terminate()
        time.sleep(0.01)
