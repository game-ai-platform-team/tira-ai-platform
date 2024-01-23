import unittest

from src.entities.game_factory import GameFactory
from src.services.games.chess_game import ChessGame

class TestGameFactory(unittest.TestCase):
    def setUp(self) -> None:
        self.factory = GameFactory()

    def test_factory_return_chess(self):
        self.assertEqual(ChessGame, self.factory.get_game("chess"))
