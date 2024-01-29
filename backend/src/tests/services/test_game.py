from unittest import TestCase
from unittest.mock import Mock, call

from game_state import GameState
from services.game import Game


class TestGame(TestCase):
    def setUp(self) -> None:
        self.io_mock = Mock()
        self.player1_mock = Mock()
        self.player2_mock = Mock()
        self.judge_mock = Mock()
        self.game = Game(
            self.io_mock, self.player1_mock, self.player2_mock, self.judge_mock
        )

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
        time = 3
        self.game.send_state(state, move, time)

        self.io_mock.send.assert_called_with(move, "CONTINUE", time)

    def test_send_state_when_state_invalid(self):
        state = GameState.INVALID
        move = "move"
        time = 5
        self.game.send_state(state, move, time)

        self.io_mock.send.assert_called_with("", "INVALID", time)

    def test_play_continue_continues_game(self):
        self.player1_mock.play.side_effect = ["a", "b", "c"]
        self.player2_mock.play.side_effect = [1, 2, 3]
        self.judge_mock.validate.return_value = GameState.CONTINUE

        self.game.play(6)

        self.assertEqual(self.player1_mock.play.call_count, 3)
        self.assertEqual(self.player2_mock.play.call_count, 3)
        self.assertEqual(self.judge_mock.validate.call_count, 6)

    def test_play_lose_ends_game(self):
        self.player1_mock.play.side_effect = ["a", "b", "c"]
        self.player2_mock.play.side_effect = [1, 2, 3]
        self.judge_mock.validate.side_effect = [GameState.CONTINUE, GameState.LOSE]

        self.game.play(6)

        self.assertEqual(self.player1_mock.play.call_count, 1)
        self.assertEqual(self.player2_mock.play.call_count, 1)
        self.assertEqual(self.judge_mock.validate.call_count, 2)

    def test_play_draw_ends_game(self):
        self.player1_mock.play.side_effect = ["a", "b", "c"]
        self.player2_mock.play.side_effect = [1, 2, 3]
        self.judge_mock.validate.side_effect = [GameState.CONTINUE, GameState.DRAW]

        self.game.play(6)

        self.assertEqual(self.player1_mock.play.call_count, 1)
        self.assertEqual(self.player2_mock.play.call_count, 1)
        self.assertEqual(self.judge_mock.validate.call_count, 2)

    def test_play_illegal_ends_game(self):
        self.player1_mock.play.side_effect = ["a", "b", "c"]
        self.player2_mock.play.side_effect = [1, 2, 3]
        self.judge_mock.validate.side_effect = [GameState.CONTINUE, GameState.ILLEGAL]

        self.game.play(6)

        self.assertEqual(self.player1_mock.play.call_count, 1)
        self.assertEqual(self.player2_mock.play.call_count, 1)
        self.assertEqual(self.judge_mock.validate.call_count, 2)

    def test_play_invalid_ends_game(self):
        self.player1_mock.play.side_effect = ["a", "b", "c"]
        self.player2_mock.play.side_effect = [1, 2, 3]
        self.judge_mock.validate.side_effect = [GameState.CONTINUE, GameState.INVALID]

        self.game.play(6)

        self.assertEqual(self.player1_mock.play.call_count, 1)
        self.assertEqual(self.player2_mock.play.call_count, 1)
        self.assertEqual(self.judge_mock.validate.call_count, 2)

    def test_move_added_after_validation(self):
        self.player1_mock.play.side_effect = ["a", "b", "c"]
        self.player2_mock.play.side_effect = [1, 2]
        self.judge_mock.validate.return_value = GameState.CONTINUE

        self.game.play(5)

        self.judge_mock.add_move.assert_has_calls(
            [call("a"), call(1), call("b"), call(2), call("c")]
        )

    def test_validate_called_with_correct_moves(self):
        self.player1_mock.play.side_effect = ["a", "b", "c"]
        self.player2_mock.play.side_effect = [1, 2]
        self.judge_mock.validate.return_value = GameState.CONTINUE

        self.game.play(5)

        self.judge_mock.validate.assert_has_calls(
            [call("a"), call(1), call("b"), call(2), call("c")]
        )
