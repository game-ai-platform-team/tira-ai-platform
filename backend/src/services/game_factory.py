from pathlib import Path

from config import DEFAULT_CHESS_AI_PATH
from entities.chess_judge import ChessJudge
from entities.player import Player
from services.game import Game
from services.socket_io_service import SocketIOService


class GameFactory:
    @staticmethod
    def get_chess_game(
        socketio_service: SocketIOService,
        player1_file: Path = DEFAULT_CHESS_AI_PATH,
        player2_file: Path = DEFAULT_CHESS_AI_PATH,
    ) -> Game:
        return Game(
            socketio_service,
            Player(player1_file),
            Player(player2_file),
            ChessJudge(),
        )
