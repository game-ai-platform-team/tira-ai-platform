import subprocess

class Player:
    def play(self, boardstate, ai_name) -> str:
        """
        Plays a turn.

        Args:
            move (str): Move of the other player.

        Returns:
            str: Move of player.
        """

        return subprocess.run(
            ["python", f"src/{ai_name}", f"-b {','.join(boardstate)}"],
            stdout=subprocess.PIPE,
        ).stdout.decode("utf-8")
