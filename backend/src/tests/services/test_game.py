from unittest import TestCase
from unittest.mock import Mock, call

from entities.move import Move
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

    def test_send_state_calls_socketio_service(self):
        move = Move("e2e4", GameState.CONTINUE, 3, 1)

        self.game._Game__send_state(move)

        self.io_mock.send.assert_called_with(move)

    def test_send_state_when_state_invalid(self):
        move = Move("aaa", GameState.INVALID, 100, 1)
        self.game._Game__send_state(move)

        self.io_mock.send.assert_called_with(Move("", GameState.INVALID, 100, 1))

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

    def test_validate_called_with_correct_moves(self):
        self.player1_mock.play.side_effect = ["a", "b", "c"]
        self.player2_mock.play.side_effect = [1, 2]
        self.judge_mock.validate.return_value = GameState.CONTINUE

        self.game.play(5)

        self.judge_mock.validate.assert_has_calls(
            [call("a"), call(1), call("b"), call(2), call("c")]
        )

    def test_player_called_with_previous_moves(self):
        self.player1_mock.play.side_effect = ["a", "b", "c"]
        self.player2_mock.play.side_effect = [1, 2]
        self.judge_mock.validate.return_value = GameState.CONTINUE

        self.game.play(5)

        self.player1_mock.play.assert_has_calls([call(1), call(2)])
        self.player2_mock.play.assert_has_calls([call("a"), call("b")])

    def test_play_socketio_called_with_correct_moves(self):
        self.player1_mock.play.side_effect = ["a", "b", "c"]
        self.player2_mock.play.side_effect = [1, 2]
        self.judge_mock.validate.return_value = GameState.CONTINUE

        self.game.play(5)

        calls = self.io_mock.send.call_args_list
        move_args = list(map(lambda call: call.args[0].move, calls))

        self.assertEqual(
            move_args,
            ["a", 1, "b", 2, "c"],
        )

    def test_play_socketio_called_with_correct_states(self):
        states = [GameState.CONTINUE] * 4
        states.append(GameState.ILLEGAL)

        self.player1_mock.play.side_effect = ["a", "b", "c"]
        self.player2_mock.play.side_effect = [1, 2]
        self.judge_mock.validate.side_effect = states

        self.game.play(5)

        calls = self.io_mock.send.call_args_list
        state_args = list(map(lambda call: call.args[0].state, calls))

        self.assertEqual(state_args, states)
