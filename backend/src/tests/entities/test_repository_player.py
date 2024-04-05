import unittest
from pathlib import Path
from unittest.mock import MagicMock

from entities.repository_player import RepositoryPlayer


class TestPlayer(unittest.TestCase):
    def setUp(self):
        self.my_file = Path(__file__)

    def test_play_returns_move(self):
        mock_repo = MagicMock()
        mock_repo.all_mocks_dir = self.my_file.parent.parent.joinpath("mockrepos")
        mock_repo.working_dir = mock_repo.all_mocks_dir.joinpath("mockrepo1")

        player = RepositoryPlayer(mock_repo)
        with player:
            move = "MOVE: e2e4"
            out = player.play(move)

        self.assertEqual("e2e4", out)

    def test_terminate_self_terminates_process(self):
        mock_repo = MagicMock()
        mock_repo.all_mocks_dir = self.my_file.parent.parent.joinpath("mockrepos")
        mock_repo.working_dir = mock_repo.all_mocks_dir.joinpath("mockrepo1")

        player = RepositoryPlayer(mock_repo)
        self.assertRaises(ProcessLookupError, player.play, "move")

    def test_raise_error_when_timeout(self):
        mock_repo = MagicMock()
        mock_repo.all_mocks_dir = self.my_file.parent.parent.joinpath("mockrepos")
        mock_repo.working_dir = mock_repo.all_mocks_dir.joinpath("mockrepo2")

        player = RepositoryPlayer(mock_repo, 1)
        with player:
            self.assertRaises(TimeoutError, player.play, "move")

    def test_dont_raise_error_when_no_timeout(self):
        mock_repo = MagicMock()
        mock_repo.all_mocks_dir = self.my_file.parent.parent.joinpath("mockrepos")
        mock_repo.working_dir = mock_repo.all_mocks_dir.joinpath("mockrepo3")

        player = RepositoryPlayer(mock_repo, 4)
        with player:
            out = player.play("MOVE: e2e4")

        self.assertEqual("e2e4", out)

    def test_process_is_terminated_after_timeout(self):
        mock_repo = MagicMock()
        mock_repo.all_mocks_dir = self.my_file.parent.parent.joinpath("mockrepos")
        mock_repo.working_dir = mock_repo.all_mocks_dir.joinpath("mockrepo3")

        player = RepositoryPlayer(mock_repo, 1)
        with player:
            self.assertRaises(TimeoutError, player.play, "move")
            self.assertRaises(ProcessLookupError, player.play, "move")
