import unittest
from pathlib import Path
from unittest.mock import MagicMock

from entities.players.repository_player import RepositoryPlayer


class TestRepositoryPlayer(unittest.TestCase):
    def setUp(self):
        self.mock_repo = MagicMock()
        self.all_mocks_dir = Path(__file__).parent.parent.parent / "mockrepos"

    def test_play_returns_move(self):
        self.mock_repo.working_dir = self.all_mocks_dir / "mockrepo1"

        player = RepositoryPlayer(self.mock_repo)
        with player:
            move = "MOVE: e2e4"
            out = player.play(move)

        self.assertEqual("e2e4", out)

    def test_terminate_self_terminates_process(self):
        self.mock_repo.working_dir = self.all_mocks_dir / "mockrepo1"

        player = RepositoryPlayer(self.mock_repo)
        self.assertRaises(ProcessLookupError, player.play, "move")

    def test_raise_error_when_timeout(self):
        self.mock_repo.working_dir = self.all_mocks_dir / "mockrepo2"

        player = RepositoryPlayer(self.mock_repo, 1)
        with player:
            self.assertRaises(TimeoutError, player.play, "move")

    def test_dont_raise_error_when_no_timeout(self):
        self.mock_repo.working_dir = self.all_mocks_dir / "mockrepo3"

        player = RepositoryPlayer(self.mock_repo, 4)
        with player:
            out = player.play("MOVE: e2e4")

        self.assertEqual("e2e4", out)

    def test_process_is_terminated_after_timeout(self):
        self.mock_repo.working_dir = self.all_mocks_dir.joinpath("mockrepo3")

        player = RepositoryPlayer(self.mock_repo, 1)
        with player:
            self.assertRaises(TimeoutError, player.play, "move")
            self.assertRaises(ProcessLookupError, player.play, "move")
