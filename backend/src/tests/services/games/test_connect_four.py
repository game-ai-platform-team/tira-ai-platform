from unittest import TestCase
from unittest.mock import ANY, Mock, call

from services.games.connect_four import ConnectFour


class TestGame(TestCase):
    def setUp(self) -> None:
        self.game = ConnectFour()

    def test_drop_piece_drops_a_move(self):
        self.game.drop_piece(0)
        self.assertEqual(self.game.get_board()[0][0], 1)

    def test_drop_piece_drops_no_move_if_column_is_full(self):
        for i in [0, 0, 0, 0, 0, 0, 0, 1]:
            self.game.drop_piece(i)

        self.assertEqual(self.game.get_board()[0][0], 1)
        self.assertEqual(self.game.get_board()[1][0], 2)
        self.assertEqual(self.game.get_board()[2][0], 1)
        self.assertEqual(self.game.get_board()[3][0], 2)
        self.assertEqual(self.game.get_board()[4][0], 1)
        self.assertEqual(self.game.get_board()[5][0], 2)
        self.assertEqual(self.game.get_board()[0][1], 1)

    def test_check_horizontal_win(self):
        self.game.board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0, 0],
        ]
        self.assertTrue(self.game.check_horizontal_win(5))

    def test_check_vertical_win(self):
        self.game.board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 2, 0, 0, 0, 0, 0],
            [1, 2, 0, 0, 0, 0, 0],
            [1, 2, 0, 0, 0, 0, 0],
        ]
        self.assertTrue(self.game.check_vertical_win(0))

    def test_check_positively_sloped_diagonals(self):
        self.game.board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 2, 1, 0, 0, 0, 0],
            [0, 1, 2, 1, 0, 0, 0],
            [0, 2, 2, 2, 1, 0, 0],
        ]
        self.assertTrue(self.game.check_positively_sloped_diagonals())

    def test_check_negatively_sloped_diagonals(self):
        self.game.board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 1, 2, 0, 0, 0],
            [0, 1, 2, 1, 0, 0, 0],
            [1, 2, 2, 2, 0, 0, 0],
        ]
        for i in [0, 1, 1, 2, 2, 3, 3, 4]:
            self.game.drop_piece(i)
        self.assertTrue(self.game.check_negatively_sloped_diagonals())

    def test_play_a_full_game_and_recognize__horizontal_win_for_player_two(self):
        for i in [0, 1, 1, 2, 2, 3, 3, 4]:
            self.game.drop_piece(i)
        self.assertTrue(self.game.check_horizontal_win(0))

    def test_play_a_full_game_and_recognize_vertical_win_for_player_two(self):
        print(self.game.board)
        for i in [0, 1, 0, 1, 0, 1, 0, 1]:
            self.game.drop_piece(i)
            print("dropping " + str(i))
            print(self.game.board)
        self.assertTrue(self.game.check_vertical_win(0))

    def test_is_valid_location(self):
        for i in range(5):
            self.assertTrue(self.game.is_valid_location(i))

    def test_full_column_is_not_a_valid_location(self):
        for i in [0, 0, 0, 0, 0, 0]:
            self.game.drop_piece(i)
        self.assertFalse(self.game.is_valid_location(0))

    def test_get_valid_locations(self):
        self.assertEqual(self.game.get_valid_locations(), list(range(7)))

    def test_is_board_full(self):
        self.game.board = [
            [1, 2, 1, 2, 1, 2, 1],
            [2, 1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2, 1],
            [2, 1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2, 1],
            [2, 1, 2, 1, 2, 1, 2],
        ]
        self.assertTrue(self.game.is_board_full())
