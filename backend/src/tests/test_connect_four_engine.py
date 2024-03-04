from unittest import TestCase
from unittest.mock import ANY, Mock, call

from connect_four_engine import ConnectFourEngine


class TestGame(TestCase):
    def setUp(self) -> None:
        self.engine = ConnectFourEngine()
