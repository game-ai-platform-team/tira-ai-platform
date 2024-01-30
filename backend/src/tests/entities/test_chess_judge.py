import unittest

from entities.chess_judge import ChessJudge
from game_state import GameState


class TestChessJudge(unittest.TestCase):
    def setUp(self) -> None:
        self.judge = ChessJudge()

    def test_validate_returns_continue_initially(self):
        move = "e2e4"
        game_state = self.judge.validate(move)
        self.assertEqual(GameState.CONTINUE, game_state)

    def test_validate_returns_invalid_with_invalid_moves(self):
        self.assertEqual(self.judge.validate("e2ee"), GameState.INVALID)
        self.assertEqual(self.judge.validate("move"), GameState.INVALID)

    def test_validate_returns_continue_with_valid_uci_moves(self):
        self.assertEqual(self.judge.validate("e2e4"), GameState.CONTINUE)

    def test_validate_returns_illegal_with_illegal_moves(self):
        self.assertEqual(self.judge.validate("a1f8"), GameState.ILLEGAL)
        self.assertEqual(self.judge.validate("g1c4"), GameState.ILLEGAL)
        self.assertEqual(self.judge.validate("d5g4"), GameState.ILLEGAL)
        self.assertEqual(self.judge.validate("g6c4"), GameState.ILLEGAL)
