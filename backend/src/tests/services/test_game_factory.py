import unittest

from services.game_factory import GameFactory


class TestGameFactory(unittest.TestCase):
    def setUp(self) -> None:
        self.factory = GameFactory()
