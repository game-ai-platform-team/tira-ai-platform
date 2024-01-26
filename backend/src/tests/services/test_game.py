from unittest import TestCase
from unittest.mock import Mock

from entities.judge import Judge
from entities.player import Player
from game_state import GameState
from services.game import Game


class TestGame(TestCase):
    def setUp(self) -> None:
        self.io_mock = Mock()
        self.player1_mock = Mock(wraps=Player)
        self.player2_mock = Mock(wraps=Player)
        self.judge_mock = Mock(wraps=Judge)
        self.game = Game(
            self.io_mock,
            self.player1_mock,
            self.player2_mock,
            self.judge_mock)

    def test_play_one_move_returns_valid_dict(self):
        self.judge_mock.validate.return_value = GameState.WIN
        self.player1_mock.play.return_value = "1"
        self.player2_mock.play.return_value = "2"

        move = self.game.play_one_move(self.player1_mock, "a move")

        self.assertIn("move", move)
        self.assertIn("state", move)
        self.assertIn("time", move)

    def test_play_one_move_returns_dict_with_valid_values(self):
        self.judge_mock.validate.return_value = GameState.WIN
        self.player1_mock.play.return_value = "1"
        self.player2_mock.play.return_value = "2"

        move = self.game.play_one_move(self.player1_mock, "a move")

        self.assertIsInstance(move["move"], str)
        self.assertIn(move["state"], GameState)
        self.assertIsInstance(move["time"], int)

    def test_send_state_calls_socketio_service(self):
        state = GameState.CONTINUE
        move = "e2e4"
        self.game.send_state(state, move)

        self.io_mock.send.assert_called_with(move)

    def test_send_state_when_state_invalid(self):
        state = GameState.INVALID
        move = "move"
        self.game.send_state(state, move)

        self.io_mock.send.assert_called_with("")
