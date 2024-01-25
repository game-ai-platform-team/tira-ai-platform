from typing import Any

from flask_socketio import SocketIO

from config import TEMP_DIR
from services.game_factory import GameFactory
from services.socket_io_service import SocketIOService


class Api:
    def start(self, file: str, socketio: SocketIO, sid: str) -> dict[str, Any]:
        """
        Starts new chess game with the input AI.

        Args:
            file (str): Code of the AI.

        Returns:
            dict[str, Any]: The game result containing winner, moves, etc.
        """

        self.save(file)

        socketio_service = SocketIOService(socketio, sid)
        game = GameFactory.get_chess_game(socketio_service)
        result = game.play()

        return result

    def save(self, content: str) -> None:
        """
        Saves given content as a file to temporary directory.

        Args:
            content (str): Content to save.
        """

        with open(TEMP_DIR / "ai.py", mode="w", encoding="utf-8") as file:
            file.write(content)


api = Api()
