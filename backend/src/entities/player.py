import subprocess


class Player:
    def __init__(self, name: str) -> None:
        self.__name = name

    def play(self, boardstate,) -> str:
        """
        Plays a turn.

        Args:
            move (str): Move of the other player.

        Returns:
            str: Move of player.
        """

        return subprocess.run(
            ["python", f"src/{self.__name}", f"-b {','.join(boardstate)}"],
            stdout=subprocess.PIPE,
        ).stdout.decode("utf-8")
