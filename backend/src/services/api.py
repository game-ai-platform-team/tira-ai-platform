from typing import Any

from flask_socketio import SocketIO

from config import TEMP_DIR
from services.game_factory import GameFactory
from services.socket_io_service import SocketIOService


class Api:
    def __init__(self):
        self.ai_file = TEMP_DIR / "ai.py"

    def start(
        self, file_contents: str, socketio: SocketIO, sid: str, level: int
    ) -> dict[str, Any]:
        """
        Starts new chess game with the input AI.

        Args:
            fileContents (str): Code of the AI.

        Returns:
            dict[str, Any]: The game result containing winner, moves, etc.
        """

        self.save(file_contents)

        socketio_service = SocketIOService(socketio, sid)
        game = GameFactory.get_chess_game(
            socketio_service, player1_file=self.ai_file, level=level
        )
        result = game.play()

        return result

    def save(self, content: str) -> None:
        """
        Saves given content as a file to temporary directory.

        Args:
            content (str): Content to save.
        """
        self.ai_file.parent.mkdir(parents=True, exist_ok=True)
        self.ai_file.touch(exist_ok=True)
        with open(self.ai_file, mode="w", encoding="utf-8") as file:
            file.write(content)


api = Api()
