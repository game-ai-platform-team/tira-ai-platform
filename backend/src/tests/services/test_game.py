from unittest import TestCase
from unittest.mock import Mock

from entities.judge import Judge
from entities.player import Player
from game_state import GameState
from services.game import Game


class TestGame(TestCase):
    def test_play_one_move_returns_valid_dict(self):
        player1 = Mock(wraps=Player)
        player2 = Mock(wraps=Player)
        judge = Mock(wraps=Judge)
        socketio = Mock()

        judge.validate.return_value = GameState.WIN
        player1.play.return_value = "1"
        player2.play.return_value = "2"

        game = Game(socketio, player1, player2, judge)

        move = game.play_one_move(player1, "a move")

        self.assertIn("move", move)
        self.assertIn("state", move)
        self.assertIn("time", move)
