from http.client import CONTINUE
import unittest
from entities.judges.connect_four_judge import ConnectFourJudge

from game_state import GameState


class TestConnectFourJudge(unittest.TestCase):
    def setUp(self) -> None:
        self.judge = ConnectFourJudge()

    def test_move_not_convertable_to_int_is_invalid(self):
        self.assertEqual(self.judge.validate("aaa"), GameState.INVALID)
        self.assertEqual(self.judge.validate("7ä"), GameState.INVALID)
        self.assertEqual(self.judge.validate("-1ö"), GameState.INVALID)
        self.assertEqual(self.judge.validate("1.01"), GameState.INVALID)
        self.assertEqual(self.judge.validate("1.0"), GameState.INVALID)

    def test_move_outside_board_returns_false(self):
        self.assertEqual(self.judge.validate("-1"), GameState.INVALID)
        self.assertEqual(self.judge.validate("70"), GameState.INVALID)
        self.assertEqual(self.judge.validate("1000"), GameState.INVALID)
        self.assertEqual(self.judge.validate("-10000"), GameState.INVALID)

    def test_valid_move_returns_true(self):
        self.assertEqual(self.judge.validate("3"), GameState.CONTINUE)
        self.assertEqual(self.judge.validate("6"), GameState.CONTINUE)
        self.assertEqual(self.judge.validate("0"), GameState.CONTINUE)
