from typing import Callable

from connect_four_lib.connect_four_judge import ConnectFourJudge

from entities.chess_judge import ChessJudge
from entities.player import Player
from entities.player_connectfour import PlayerConnectFour
from entities.player_stockfish import PlayerStockfish
from services.game import Game
from services.socket_service import SocketService


class GameFactory:
    def __init__(self, games: dict[str, Callable[..., Game]] | None = None) -> None:
        self.__games: dict[
            str, Callable[[SocketService, int, Player], Game]
        ] = games or {
            "chess": GameFactory.__get_chess_game,
            "connect_four": GameFactory.__get_connect_four_game,
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

    @staticmethod
    def __get_connect_four_game(
        socket_service: SocketService, elo: int, player
    ) -> Game:
        return Game(
            socket_service,
            player,
            PlayerConnectFour(elo),
            ConnectFourJudge(),
        )


game_factory = GameFactory()
