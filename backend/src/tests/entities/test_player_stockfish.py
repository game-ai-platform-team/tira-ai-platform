import unittest
from unittest.mock import Mock

from entities.player_stockfish import PlayerStockfish


class TestPlayerStockfish(unittest.TestCase):
    def setUp(self):
        self.sf_player = PlayerStockfish(1)
        self.sf_player.engine = Mock()
        self.move1 = "e2e4"
        self.move2 = "f7f6"

    def test_updates_board(self):
        self.sf_player.play(self.move1)

        self.assertEqual(self.sf_player.boardstate[0], self.move1)

    def test_adds_new_move_to_boardstate(self):
        self.sf_player.engine.get_best_move.return_value = "f7f6"
        self.sf_player.play(self.move1)

        self.assertEqual(self.sf_player.boardstate, [self.move1, self.move2])

    def test_engine_set_position_called(self):
        self.sf_player.play(self.move1)

        self.sf_player.engine.set_position.assert_called_with(self.sf_player.boardstate)

    def test_set_skill_level(self):
        level = 5
        self.stockfish_player = PlayerStockfish(level)
        parameters = self.stockfish_player.engine.get_parameters()

        self.assertEqual(parameters["Skill Level"], level)
