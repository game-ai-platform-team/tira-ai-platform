import subprocess
from pathlib import Path


class Player:
    def __init__(self, path: Path) -> None:
        self.__path: Path = path
        self.__process = subprocess.Popen(
            args=["python", str(self.__path)],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )

    def play(self, move) -> str:
        input_string = move + "\n"

        self.__process.stdin.write(input_string.encode("utf-8"))

        self.__process.stdin.flush()

        out = self.__process.stdout.readline()

        return out.decode("utf-8").replace("\n", "")

    def terminate_process(self):
        self.__process.terminate()
