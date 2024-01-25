from pathlib import Path

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
        players1_file: Path,
        players2_file: Path,
        socketio_service: SocketIOService,
    ) -> Game:
        return ChessGame(socketio_service, players1_file, players2_file)
