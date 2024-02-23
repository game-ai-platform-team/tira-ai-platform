from typing import Callable

from entities.chess_judge import ChessJudge
from entities.player import Player
from entities.player_stockfish import PlayerStockfish
from services.game import Game
from services.socket_service import SocketService


class GameFactory:
    def __init__(self, games: dict[str, Callable[..., Game]] | None = None) -> None:
        self.__games: dict[
            str, Callable[[SocketService, int, Player], Game]
        ] = games or {
            "chess": GameFactory.__get_chess_game,
            # "connectfour": Game()
        }

    def get_game(
        self,
        socket_service: SocketService,
        game: str,
        player: Player,
        elo: int = 1350,
    ) -> Game:
        """
        Returns a game with given parameters applied.

        Args:
            socket_service (SocketIOService): Service for handling websocket connection.
            game (str): Game type
            elo (int, optional): Elo of AI. Defaults to 1350.

        Raises:
            KeyError: Given game is invalid.

        Returns:
            Game: Game with parameters applied.
        """

        return self.__games[game](socket_service, elo, player)

    @staticmethod
    def __get_chess_game(socket_service: SocketService, elo: int, player) -> Game:
        return Game(
            socket_service,
            player,
            PlayerStockfish(elo),
            ChessJudge(),
        )


game_factory = GameFactory()
