import unittest
from unittest.mock import Mock

from entities.players.chess_player import ChessPlayer
from utils.install_stockfish import install_stockfish


class TestPlayerStockfish(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        install_stockfish()

    def setUp(self):
        self.sf_player = ChessPlayer(1)
        self.engine = Mock()
        self.sf_player.engine = self.engine
        self.move1 = "e2e4"
        self.move2 = "f7f6"

    def test_updates_board(self):
        self.sf_player.play(self.move1)

        self.assertEqual(self.sf_player.boardstate[0], self.move1)

    def test_adds_new_move_to_boardstate(self):
        self.engine.get_best_move.return_value = "f7f6"
        self.sf_player.play(self.move1)

        self.assertEqual(self.sf_player.boardstate, [self.move1, self.move2])

    def test_engine_set_position_called(self):
        self.sf_player.play(self.move1)

        self.engine.set_position.assert_called_with(self.sf_player.boardstate)

    def test_set_skill_elo(self):
        elo = 1350
        self.stockfish_player = ChessPlayer(elo)
        parameters = self.stockfish_player.engine.get_parameters()

        self.assertEqual(parameters["UCI_Elo"], elo)
