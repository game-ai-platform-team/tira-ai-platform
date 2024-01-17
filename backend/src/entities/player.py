import subprocess
from pathlib import Path


class Player:
    def __init__(self, path: Path) -> None:
        self.__path: Path = path

    def play(
        self,
        boardstate,
    ) -> str:
        """
        Plays a turn.

        Args:
            move (str): Move of the other player.

        Returns:
            str: Move of player.
        """

        return subprocess.run(
            ["python", str(self.__path), f"-b {','.join(boardstate)}"],
            stdout=subprocess.PIPE,
        ).stdout.decode("utf-8")
