from collections.abc import Callable

from connect_four_lib.connect_four_player import ConnectFourPlayer
from duo_game_lib.player import Player
from git import Repo

from config import STOCKFISH_PATH
from entities.players.chess_player import ChessPlayer
from entities.players.repository_player import RepositoryPlayer
from utils.install_stockfish import install_stockfish


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
        install_stockfish(STOCKFISH_PATH)

        return ChessPlayer(difficulty)

    def __get_connect_four_player(self, difficulty: int) -> Player:
        return ConnectFourPlayer(difficulty)

    def get_remote_player(self, repository: Repo) -> Player:
        return RepositoryPlayer(repository)


player_factory = PlayerFactory()
