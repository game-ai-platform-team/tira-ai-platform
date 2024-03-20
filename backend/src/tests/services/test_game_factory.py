import unittest
from unittest.mock import Mock

from services.game_factory import GameFactory


class TestGameFactory(unittest.TestCase):
    def setUp(self) -> None:
        self.chess_constructor_mock = Mock()
        self.cfour_constructor_mock = Mock()

        games = {
            "chess": self.chess_constructor_mock,
            "connect_four": self.cfour_constructor_mock,
        }

        self.game_factory = GameFactory(games)

        self.socket = Mock()
        self.playerMock = Mock()

    def test_get_game_returns_correct_game(self):
        self.game_factory.get_game(self.socket, "chess", self.playerMock, 1234)
        self.game_factory.get_game(self.socket, "connect_four", self.playerMock, 5678)

        self.chess_constructor_mock.assert_called_once_with(
            self.socket, 1234, self.playerMock
        )

        self.cfour_constructor_mock.assert_called_once_with(
            self.socket, 5678, self.playerMock
        )

    def test_get_game_raises_error_if_game_not_exist(self):
        with self.assertRaises(KeyError):
            self.game_factory.get_game(
                self.socket, "non-existent game", self.playerMock
            )
