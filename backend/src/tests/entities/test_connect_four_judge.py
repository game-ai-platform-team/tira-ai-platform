import unittest
from http.client import CONTINUE

from entities.connectfour.connect_four_judge import ConnectFourJudge
from game_state import GameState


class TestConnectFourJudge(unittest.TestCase):
    def setUp(self) -> None:
        self.judge = ConnectFourJudge()
        self.board_one_column_full = [[1, 2, 1, 2, 1, 2]]
        self.board_one_column_full.extend([[0] * 6 for i in range(6)])

        self.board_one_column_one_move = [[0, 0, 0, 0, 0, 1]]
        self.board_one_column_one_move.extend([[0] * 6 for i in range(6)])

    def test_move_not_convertable_to_int_is_invalid(self):
        self.assertEqual(self.judge.validate("aaa"), GameState.INVALID)
        self.assertEqual(self.judge.validate("7ä"), GameState.INVALID)
        self.assertEqual(self.judge.validate("-1ö"), GameState.INVALID)
        self.assertEqual(self.judge.validate("1.01"), GameState.INVALID)
        self.assertEqual(self.judge.validate("1.0"), GameState.INVALID)

    def test_move_outside_board_return_invalid_state(self):
        self.assertEqual(self.judge.validate("-1"), GameState.INVALID)
        self.assertEqual(self.judge.validate("70"), GameState.INVALID)
        self.assertEqual(self.judge.validate("1000"), GameState.INVALID)
        self.assertEqual(self.judge.validate("-10000"), GameState.INVALID)

    def test_valid_move_returns_continue(self):
        self.assertEqual(self.judge.validate("3"), GameState.CONTINUE)
        self.assertEqual(self.judge.validate("6"), GameState.CONTINUE)
        self.assertEqual(self.judge.validate("0"), GameState.CONTINUE)

    def test_move_returns_illegal_if_column_is_full(self):
        judge = ConnectFourJudge(self.board_one_column_full)
        self.assertEqual(judge.validate("0"), GameState.ILLEGAL)

    def test_move_returns_continue_if_column_is_not_full(self):
        judge = ConnectFourJudge(self.board_one_column_full)
        self.assertEqual(judge.validate("1"), GameState.CONTINUE)
        self.assertEqual(judge.validate("6"), GameState.CONTINUE)

        judge = ConnectFourJudge(self.board_one_column_one_move)
        self.assertEqual(judge.validate("0"), GameState.CONTINUE)
