from collections.abc import Callable

from entities.players.repository_player import RepositoryPlayer
from entities.players.player_connectfour import PlayerConnectFour
from entities.players.player_stockfish import PlayerStockfish


class PlayerFactory:
    def __init__(self, players: dict[str, Callable[[int], RepositoryPlayer]]) -> None:
        self.__games: dict[str, Callable[[int], RepositoryPlayer]] = players or {
            "chess": self.__get_chess_player,
            "connect_four": self.__get_connect_four_player,
        }

    def get_local_player(self, game: str, difficulty: int) -> RepositoryPlayer:
        return self.__games[game](difficulty)

    def __get_chess_player(self, difficulty: int) -> RepositoryPlayer:
        return PlayerStockfish(difficulty)

    def __get_connect_four_player(self, difficulty: int) -> RepositoryPlayer:
        return PlayerConnectFour(difficulty)
