from collections.abc import Callable
from uuid import uuid1

from git import Repo

from config import TEMP_DIR
from entities.players.player import Player
from entities.players.player_connectfour import PlayerConnectFour
from entities.players.player_stockfish import PlayerStockfish
from entities.players.repository_player import RepositoryPlayer


class PlayerFactory:
    def __init__(
        self, players: dict[str, Callable[[int], Player]] | None = None
    ) -> None:
        self.__games: dict[str, Callable[[int], Player]] = players or {
            "chess": self.__get_chess_player,
            "connect_four": self.__get_connect_four_player,
        }

    def get_local_player(self, game: str, difficulty: int) -> Player:
        return self.__games[game](difficulty)

    def __get_chess_player(self, difficulty: int) -> Player:
        return PlayerStockfish(difficulty)

    def __get_connect_four_player(self, difficulty: int) -> Player:
        return PlayerConnectFour(difficulty)

    def get_remote_player(self, repository_url: str) -> Player:
        repository = Repo.clone_from(repository_url, TEMP_DIR / str(uuid1()), depth=1)

        return RepositoryPlayer(repository)


player_factory = PlayerFactory()
