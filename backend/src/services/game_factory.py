from typing import Callable

from connect_four_lib.connect_four_judge import ConnectFourJudge

from entities.chess_judge import ChessJudge
from entities.players.repository_player import RepositoryPlayer
from services.game import Game


class GameFactory:
    def __init__(
        self,
        games: dict[str, Callable[[RepositoryPlayer, RepositoryPlayer], Game]] | None = None,
        logger: Callable[[str], None] | None = None,
    ) -> None:
        self.__games: dict[str, Callable[[RepositoryPlayer, RepositoryPlayer], Game]] = games or {
            "chess": self.__get_chess_game,
            "connect_four": self.__get_connect_four_game,
        }
        self.__logger: Callable[[str], None] = logger or print

    def get_game(self, game: str, player1: RepositoryPlayer, player2: RepositoryPlayer) -> Game:
        """
        Returns a game with given parameters applied.

        Args:
            game (str): Game type
            player1 (Player): Player 1
            player2 (Player): Player 2

        Raises:
            KeyError: Given game is invalid.

        Returns:
            Game: Game with parameters applied.
        """

        return self.__games[game](player1, player2)

    def __get_chess_game(self, player1: RepositoryPlayer, player2: RepositoryPlayer) -> Game:
        return Game(
            self.__logger,
            player1,
            player2,
            ChessJudge(),
        )

    def __get_connect_four_game(self, player1: RepositoryPlayer, player2: RepositoryPlayer) -> Game:
        return Game(
            self.__logger,
            player1,
            player2,
            ConnectFourJudge(),
        )


game_factory = GameFactory()
