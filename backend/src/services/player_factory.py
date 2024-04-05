from collections.abc import Callable

from entities.players.player import Player
from entities.players.player_connectfour import PlayerConnectFour
from entities.players.player_stockfish import PlayerStockfish


class PlayerFactory:
    def __init__(self, players: dict[str, Callable[[int], Player]]) -> None:
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
