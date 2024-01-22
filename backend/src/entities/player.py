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
        Get a new move from this player.

        Args:
            boardstate (list): Moves taken.

        Returns:
            str: Move from this player.
        """

        input_string = ",".join(boardstate) + "\n"

        output = subprocess.run(
            args=["python", str(self.__path)],
            input=input_string.encode("utf-8"),
            stdout=subprocess.PIPE,
        )

        return output.stdout.decode("utf-8").replace("\n", "")
