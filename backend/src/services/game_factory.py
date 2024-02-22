from typing import Callable

from entities.chess_judge import ChessJudge
from entities.cloned_repository import ClonedRepository
from entities.player import Player
from entities.player_stockfish import PlayerStockfish
from services.game import Game
from services.socket_io_service import SocketIOService


class GameFactory:
    def __init__(self, games: dict[str, Callable[..., Game]] | None = None) -> None:
        self.__games: dict[
            str, Callable[[SocketIOService, ClonedRepository, int], Game]
        ] = games or {
            "chess": GameFactory.__get_chess_game,
            # "connectfour": Game()
        }

    def get_game(
        self,
        socketio_service: SocketIOService,
        game: str,
        repo: ClonedRepository,
        elo: int = 1350,
    ) -> Game:
        """
        Returns a game with given parameters applied.

        Args:
            socketio_service (SocketIOService): Service for handling websocket connection.
            game (str): Game type
            repo (ClonedRepository): Repository of AI.
            elo (int, optional): Elo of AI. Defaults to 1350.

        Raises:
            KeyError: Given game is invalid.

        Returns:
            Game: Game with parameters applied.
        """

        return self.__games[game](socketio_service, repo, elo)

    @staticmethod
    def __get_chess_game(
        socketio_service: SocketIOService, repo: ClonedRepository, elo: int
    ) -> Game:
        return Game(
            socketio_service,
            Player(repo),
            PlayerStockfish(elo),
            ChessJudge(),
        )


game_factory = GameFactory()
