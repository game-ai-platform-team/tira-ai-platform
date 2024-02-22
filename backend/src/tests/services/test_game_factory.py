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

        self.socketio = Mock()
        self.repo = Mock()

    def test_get_game_returns_correct_game(self):
        self.game_factory.get_game(self.socketio, "chess", self.repo, 1234)
        self.game_factory.get_game(self.socketio, "connect_four", self.repo, 5678)

        self.chess_constructor_mock.assert_called_once_with(
            self.socketio, self.repo, 1234
        )

        self.cfour_constructor_mock.assert_called_once_with(
            self.socketio, self.repo, 5678
        )

    def test_get_game_raises_error_if_game_not_exist(self):
        with self.assertRaises(KeyError):
            self.game_factory.get_game(self.socketio, "non-existent game", self.repo)
