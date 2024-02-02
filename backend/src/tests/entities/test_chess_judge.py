import unittest

from chess import Board

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

    def test_validate_returns_win_with_checkmates(self):
        situations = [
            (Board("8/1R3Q2/3k4/6R1/8/8/8/K7 w - - 40 1"), "f7f6"),
            (Board("8/8/3b4/3K1n2/r7/2q5/8/k7 b - - 24 1"), "c3c4"),
            (Board("7n/R2R4/4k3/8/8/1BB5/3Q4/8 w - - 30 1"), "d2d3"),
        ]

        for board, move in situations:
            judge = ChessJudge(board)

            self.assertEqual(judge.validate(move), GameState.WIN)

    def test_validate_returns_draw_with_stalemates(self):
        situations = [
            (Board("7k/8/R7/8/3K4/8/8/6R1 w - - 48 1"), "a6a7"),
            (Board("8/8/6k1/8/2n5/8/4r3/K7 b - - 29 1"), "c4a3"),
            (Board("k7/8/1B1Q4/8/8/8/8/8 w - - 10 1"), "d6c7"),
        ]

        for board, move in situations:
            judge = ChessJudge(board)

            self.assertEqual(judge.validate(move), GameState.DRAW)
    
    def test_validate_returns_draw_with_insufficient_material(self):
        situations = [
            (Board("4k3/8/8/8/8/8/8/4K3 w - - 0 1"), "e1e2"),
            (Board("4k3/8/8/8/8/5N2/8/4K3 w - - 0 1"), "f3d4"),
            (Board("4k3/8/8/8/8/7B/8/4K3 w - - 0 1"), "h3f5"),
            (Board("4k3/1b6/8/8/8/7B/8/4K3 w - - 0 1"), "h3c8")
        ]

        for board, move in situations:
            judge = ChessJudge(board)

            self.assertEqual(judge.validate(move), GameState.DRAW)

    def test_validate_returns_draw_with_fivefold_repetition(self):
        board = Board("1k6/ppp5/8/8/8/8/5PPP/6K1 w - - 0 1")
        judge = ChessJudge(board)

        moves = [
            "g1f1", "b8a8", "f1g1", "a8b8",
            "g1f1", "b8a8", "f1g1", "a8b8",
            "g1f1", "b8a8", "f1g1", "a8b8",
            "g1f1", "b8a8", "f1g1", "a8b8",
        ]

        for move in moves:
            judge.add_move(move)

        self.assertEqual(judge.validate("g1f1"), GameState.DRAW)

    def test_add_move_updates_internal_state(self):
        move = "e2e4"
        self.judge.add_move(move)
        moves = self.judge.get_all_moves()
        self.assertIn(move, moves)

    def test_validate_does_not_update_internal_state(self):
        move = "e2e4"
        self.judge.validate(move)
        moves = self.judge.get_all_moves()
        self.assertNotIn(move, moves)
    
    def test_get_all_moves_returns_added_moves(self):
        self.judge.add_move("e2e4")
        self.judge.add_move("e7e5")
        moves = self.judge.get_all_moves()
        self.assertEqual(moves, ["e2e4", "e7e5"])
