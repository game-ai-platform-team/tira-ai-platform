import unittest

from entities.chess_judge import ChessJudge
from game_state import GameState


class TestChessJudge(unittest.TestCase):
    def setUp(self) -> None:
        self.judge = ChessJudge()
        self.board = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

    def test_game_state_should_be_continue_in_start(self):
        move = "e2e4"
        game_state = self.judge.validate(move)
        self.assertEqual(GameState.CONTINUE, game_state)

    def test_game_state_when_invalid_move(self):
        move = "e2ee"
        game_state = self.judge.validate(move)
        self.assertEqual(GameState.INVALID, game_state)

    def test_valid_uci_move(self):
        self.assertEqual(True, self.judge.is_valid_uci_move("e2e4"))

    def test_invalid_uci_move(self):
        self.assertEqual(False, self.judge.is_valid_uci_move("move"))

    def test_validate_illegal_moves_detected(self):
        self.assertEqual(self.judge.validate("a1f8"), GameState.ILLEGAL)
        self.assertEqual(self.judge.validate("g1c4"), GameState.ILLEGAL)
        self.assertEqual(self.judge.validate("d5g4"), GameState.ILLEGAL)
        self.assertEqual(self.judge.validate("g6c4"), GameState.ILLEGAL)
