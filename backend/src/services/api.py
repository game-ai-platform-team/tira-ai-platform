from typing import Any

from config import TEMP_DIR
from services.games.chess_game import ChessGame


class Api:
    def start(self, file: str, socketio, sid) -> dict[str, Any]:
        """
        Starts new chess game with the input AI.

        Args:
            file (str): Code of the AI.

        Returns:
            dict[str, Any]: The game result containing winner, moves, etc.
        """

        self.save(file)

        game = ChessGame(socketio, sid)
        result = game.play()

        return result

    def save(self, content: str) -> None:
        """
        Saves given content as a file to temporary directory.

        Args:
            content (str): Content to save.
        """

        with open(TEMP_DIR / "ai.py", mode = "w", encoding = "utf-8") as file:
            file.write(content)


api = Api()
