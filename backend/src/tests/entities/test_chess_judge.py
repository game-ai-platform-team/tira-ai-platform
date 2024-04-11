import unittest

from chess import Board
from game_state import GameState

from entities.chess_judge import ChessJudge


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

    def test_is_game_over_returns_win_with_checkmates(self):
        situations = [
            (Board("8/1R3Q2/3k4/6R1/8/8/8/K7 w - - 40 1"), "f7f6"),
            (Board("8/8/3b4/3K1n2/r7/2q5/8/k7 b - - 24 1"), "c3c4"),
            (Board("7n/R2R4/4k3/8/8/1BB5/3Q4/8 w - - 30 1"), "d2d3"),
        ]

        for board, move in situations:
            judge = ChessJudge(board)
            judge.add_move(move)

            self.assertEqual(judge.is_game_over(), GameState.WIN)

    def test_is_game_over_returns_draw_with_stalemates(self):
        situations = [
            (Board("7k/8/R7/8/3K4/8/8/6R1 w - - 48 1"), "a6a7"),
            (Board("8/8/6k1/8/2n5/8/4r3/K7 b - - 29 1"), "c4a3"),
            (Board("k7/8/1B1Q4/8/8/8/8/8 w - - 10 1"), "d6c7"),
        ]

        for board, move in situations:
            judge = ChessJudge(board)
            judge.add_move(move)

            self.assertEqual(judge.is_game_over(), GameState.DRAW)

    def test_is_game_over_returns_draw_with_insufficient_material(self):
        situations = [
            (Board("4k3/8/8/8/8/8/8/4K3 w - - 0 1"), "e1e2"),
            (Board("4k3/8/8/8/8/5N2/8/4K3 w - - 0 1"), "f3d4"),
            (Board("4k3/8/8/8/8/7B/8/4K3 w - - 0 1"), "h3f5"),
            (Board("4k3/1b6/8/8/8/7B/8/4K3 w - - 0 1"), "h3c8"),
        ]

        for board, move in situations:
            judge = ChessJudge(board)
            judge.add_move(move)

            self.assertEqual(judge.is_game_over(), GameState.DRAW)

    def test_is_game_over_returns_draw_with_fivefold_repetition(self):
        board = Board("1k6/ppp5/8/8/8/8/5PPP/6K1 w - - 0 1")
        judge = ChessJudge(board)

        moves = [
            "g1f1",
            "b8a8",
            "f1g1",
            "a8b8",
            "g1f1",
            "b8a8",
            "f1g1",
            "a8b8",
            "g1f1",
            "b8a8",
            "f1g1",
            "a8b8",
            "g1f1",
            "b8a8",
            "f1g1",
            "a8b8",
            "g1f1",
        ]

        for move in moves:
            judge.add_move(move)

        self.assertEqual(judge.is_game_over(), GameState.DRAW)

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

    def test_analyze_white_win(self):
        board = Board(
            "r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 1"
        )

        self.assertEqual(ChessJudge(board).analyze(), 1)

    def test_analyze_black_win(self):
        board = Board("rnb1k1nr/pppp1Npp/8/2b1p3/6P1/8/PPPPPq1P/RNBQKB1R w KQkq - 0 1")

        self.assertEqual(ChessJudge(board).analyze(), -1)

    def test_analyze_draw(self):
        board = Board("7k/R7/8/8/3K4/8/8/6R1 b - - 48 1")

        self.assertEqual(ChessJudge(board).analyze(), 0)

    def test_analyze_white_advantage(self):
        boards = [
            Board("7k/8/R7/8/3K4/8/8/6R1 w - - 48 1"),
            Board("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"),
            Board("2k5/3n4/8/4Q3/1Q6/8/3K4/8 b - - 0 1"),
        ]

        for board in boards:
            self.assertGreater(ChessJudge(board).analyze(), 0)

    def test_analyze_black_advantage(self):
        boards = [
            Board("4k3/8/8/8/8/8/3K4/q7 b - - 0 1"),
            Board("rnbqkbnr/pppppp2/6p1/6p1/4P3/7N/PPPP1PPP/RNB1KB1R b KQkq - 0 1"),
            Board("2k5/8/8/4q3/q7/3N4/3K4/8 b - - 0 1"),
        ]

        for board in boards:
            self.assertLess(ChessJudge(board).analyze(), 0)
