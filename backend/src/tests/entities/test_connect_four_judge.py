import unittest
from http.client import CONTINUE

from entities.connectfour.connect_four_judge import ConnectFourJudge
from game_state import GameState


class TestConnectFourJudge(unittest.TestCase):
    def setUp(self) -> None:
        self.judge = ConnectFourJudge()

        self.board_empty_six_by_seven_board = [[0] * 6 for i in range(7)]
        self.board_empty_four_by_four_board = [[0] * 4 for i in range(4)]

        self.board_one_column_full = [[1, 2, 1, 2, 1, 2]]
        self.board_one_column_full.extend([[0] * 6 for i in range(6)])

        self.board_one_column_one_move = [[1, 0, 0, 0, 0, 0]]
        self.board_one_column_one_move.extend([[0] * 6 for i in range(6)])
        self.board_full = [[1, 1, 0, 2], [2, 2, 1, 1], [1, 1, 2, 0], [2, 2, 1, 1]]

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
        judge = ConnectFourJudge()
        judge.set_board(self.board_one_column_full, 6)
        self.assertEqual(judge.validate("0"), GameState.ILLEGAL)

    def test_move_returns_continue_if_column_is_not_full(self):
        judge = ConnectFourJudge()
        judge.set_board(self.board_one_column_full, 6)
        self.assertEqual(judge.validate("1"), GameState.CONTINUE)
        self.assertEqual(judge.validate("6"), GameState.CONTINUE)

        judge = ConnectFourJudge()
        judge.set_board(self.board_one_column_one_move, 1)
        self.assertEqual(judge.validate("0"), GameState.CONTINUE)

    def test_getboard_gets_board(self):
        self.assertEqual(self.judge.get_board(), self.board_empty_six_by_seven_board)

    def test_add_move_adds_move(self):
        self.judge.add_move(0)
        self.assertNotEqual(self.judge.get_board()[0][0], 0)

    def test_add_move_adds_correct_move(self):
        self.judge.add_move(0)
        self.assertEqual(self.judge.get_board()[0][0], 1)
        self.judge.add_move(3)
        self.assertEqual(self.judge.get_board()[3][0], 2)

    def test_get_board_returns_correct_board_after_five_moves(self):
        judge = ConnectFourJudge(rows=4, columns=4)
        judge.add_move(0)
        judge.add_move(0)
        judge.add_move(1)
        judge.add_move(3)
        judge.add_move(0)
        self.assertEqual(
            judge.get_board(), [[1, 2, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0], [2, 0, 0, 0]]
        )

    def test_play_a_full_game_that_results_in_a_draw(self):
        judge = ConnectFourJudge(rows=4, columns=4)
        judge.add_move(0)
        judge.add_move(1)
        judge.add_move(0)
        judge.add_move(1)
        judge.add_move(1)
        judge.add_move(0)
        judge.add_move(1)
        judge.add_move(0)
        judge.add_move(2)
        judge.add_move(3)
        judge.add_move(2)
        judge.add_move(3)
        judge.add_move(3)
        judge.add_move(2)
        judge.add_move(3)
        judge.add_move(2)
        self.assertEqual(judge.is_game_over(), GameState.DRAW)

    def test_draw_happens(self):
        judge = ConnectFourJudge(rows=4, columns=4)
        judge.set_board(self.board_full, [1] * 16)
        self.assertEqual(judge.is_game_over(), GameState.DRAW)

    def test_horizontal_win_is_recognized(self):
        self.judge.set_board(
            [
                [1, 2, 0, 0, 0, 0],
                [1, 2, 0, 0, 0, 0],
                [1, 2, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
            ],
            [1] * 7,
        )
        self.assertEqual(self.judge.is_game_over(), GameState.WIN)

    def test_vertical_win_is_recognized(self):
        self.judge.set_board(
            [
                [2, 0, 0, 0, 0, 0],
                [2, 2, 0, 0, 0, 0],
                [1, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
            ],
            [1] * 7,
        )
        self.assertEqual(self.judge.is_game_over(), GameState.WIN)

    def test_upwards_diagonal_win_is_recognized(self):
        self.judge.set_board(
            [
                [2, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0],
                [2, 1, 0, 0, 0, 0],
                [1, 2, 1, 0, 0, 0],
                [2, 1, 2, 1, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
            ],
            [1] * 11,
        )
        self.assertEqual(self.judge.is_game_over(), GameState.WIN)

    def test_downwards_diagonal_win_is_recognized(self):
        self.judge.set_board(
            [
                [0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0],
                [2, 1, 2, 1, 0, 0],
                [1, 2, 1, 0, 0, 0],
                [2, 1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
            ],
            [1] * 11,
        )
        self.assertEqual(self.judge.is_game_over(), GameState.WIN)

    def test_move_list_is_empty_at_start(self):
        self.assertEqual(self.judge.get_all_moves(), [])

    def test_add_move_updates_moves(self):
        self.judge.add_move(0)

        self.assertEqual(self.judge.get_all_moves(), [0])
