import unittest
from entities.chess_judger import ChessJudger
from game_state import GameState


class TestChessJudger(unittest.TestCase):
    def setUp(self) -> None:
        self.judger = ChessJudger()
        self.board = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

    def test_game_state_should_be_continue_in_start(self):
        move = "e2e4"
        game_state = self.judger.validate(move, self.board)
        self.assertEqual(GameState.CONTINUE, game_state)

    def test_game_state_when_invalid_move(self):
        move = "e2ee"
        game_state = self.judger.validate(move, self.board)
        self.assertEqual(GameState.INVALID, game_state)

    def test_valid_uci_move(self):
        self.assertEqual(True, self.judger.is_valid_uci_move("e2e4"))

    def test_invalid_uci_move(self):
        self.assertEqual(False, self.judger.is_valid_uci_move("move"))
