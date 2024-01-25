from pathlib import Path

from config import DEFAULT_CHESS_AI_PATH
from entities.player import Player
from services.games.chess_game import ChessGame
from services.games.game import Game
from services.socket_io_service import SocketIOService


class GameFactory:
    @staticmethod
    def get_game(game_type: str):
        """
        Get a game from this method by inserting a string

        Args:
            game_type (string): F.e. "chess" or "othello".

        Returns:
            game instance of specified class
        """

        game_class = {"chess": ChessGame, "othello": None}

        return game_class[game_type]

    @staticmethod
    def get_chess_game(
        socketio_service: SocketIOService,
        player1_file: Path = DEFAULT_CHESS_AI_PATH,
        player2_file: Path = DEFAULT_CHESS_AI_PATH,
    ) -> Game:
        return ChessGame(
            socketio_service,
            Player(player1_file),
            Player(player2_file),
        )
