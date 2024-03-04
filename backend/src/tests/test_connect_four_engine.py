from unittest import TestCase
from unittest.mock import ANY, Mock, call

from connect_four_engine import ConnectFourEngine


class TestGame(TestCase):
    def setUp(self) -> None:
        self.judge_mock = Mock()
        self.pruning_judge_mock = Mock()
        self.engine = ConnectFourEngine(
            rows=6,
            columns=7,
            judge=self.judge_mock,
            pruning_judge=self.pruning_judge_mock,
        )

    def test_make_move_adds_move_to_judges(self):
        self.engine.make_move("1")
        self.engine.make_move("5")
        self.engine.make_move("2")

        self.judge_mock.add_move.assert_has_calls([call("1"), call("5"), call("2")])
        self.pruning_judge_mock.add_move.assert_has_calls(
            [call("1"), call("5"), call("2")]
        )

    def test_get_best_move_return_value_up_to_two_moves(self):
        self.judge_mock.get_all_moves.return_value = []
        self.assertEqual(self.engine.get_best_move(), str(3))

        self.judge_mock.get_all_moves.return_value = [1]
        self.assertEqual(self.engine.get_best_move(), str(3))

        self.judge_mock.get_all_moves.return_value = [2, 3]
        self.assertEqual(self.engine.get_best_move(), str(3))
