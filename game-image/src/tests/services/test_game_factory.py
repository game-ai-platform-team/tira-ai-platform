import unittest
from unittest.mock import Mock
from venv import logger

from services.game_factory import GameFactory


class TestGameFactory(unittest.TestCase):
    def setUp(self) -> None:
        self.chess_constructor_mock = Mock()
        self.cfour_constructor_mock = Mock()

        games = {
            "chess": self.chess_constructor_mock,
            "connect_four": self.cfour_constructor_mock,
        }

        self.game_factory = GameFactory(games, logger=Mock())
        self.player1 = Mock()
        self.player2 = Mock()

    def test_get_game_returns_correct_game(self):
        self.game_factory.get_game("chess", self.player1, self.player2)
        self.game_factory.get_game("connect_four", self.player1, self.player2)

        self.chess_constructor_mock.assert_called_once_with(
            self.player1,
            self.player2,
        )

        self.cfour_constructor_mock.assert_called_once_with(self.player1, self.player2)

    def test_get_game_raises_error_if_game_not_exist(self):
        with self.assertRaises(KeyError):
            self.game_factory.get_game("non-existent game", self.player1, self.player2)
