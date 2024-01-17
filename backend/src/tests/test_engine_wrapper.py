import unittest
from unittest.mock import Mock
from utils.engine_wrapper import EngineWrapper

class TestEngineWrapper(unittest.TestCase):
    def setUp(self):
        self.engine_mock = Mock()
        self.engine_wrapper = EngineWrapper([], 5, self.engine_mock)

    def test_set_board(self):
        moves = ["g4d7", "a8b8", "f1d1"]
        self.engine_wrapper.set_board(moves)

        self.assertEqual(self.engine_wrapper.boardstate, moves)
        self.engine_mock.set_position.assert_called_with(moves)
