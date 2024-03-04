from unittest import TestCase
from unittest.mock import ANY, Mock, call

from connect_four_engine import ConnectFourEngine


class TestGame(TestCase):
    def setUp(self) -> None:
        self.judge_mock = Mock()
        self.pruning_judge_mock = Mock()
        self.engine = ConnectFourEngine(
            judge=self.judge_mock, pruning_judge=self.pruning_judge_mock
        )

    def test_make_move_adds_move_to_judges(self):
        self.engine.make_move("1")
        self.engine.make_move("5")
        self.engine.make_move("2")

        self.judge_mock.add_move.assert_has_calls([call("1"), call("5"), call("2")])
        self.pruning_judge_mock.add_move.assert_has_calls(
            [call("1"), call("5"), call("2")]
        )
