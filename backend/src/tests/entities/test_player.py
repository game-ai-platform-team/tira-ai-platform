import unittest
from pathlib import Path

from entities.cloned_repository import ClonedRepository
from entities.player import Player


class TestPlayer(unittest.TestCase):
    def setUp(self):
        self.myFile = Path(__file__)
        self.all_mocks_dir = self.myFile.parent.parent.joinpath("mockrepos")

        self.repo1_dir = self.all_mocks_dir.joinpath("mockrepo1")
        self.repo1 = ClonedRepository(self.repo1_dir, "")

        self.repo2_dir = self.all_mocks_dir.joinpath("mockrepo2")
        self.repo2 = ClonedRepository(self.repo2_dir, "")

        self.repo3_dir = self.all_mocks_dir.joinpath("mockrepo3")
        self.repo3 = ClonedRepository(self.repo3_dir, "")

    def test_play_returns_move(self):
        player = Player(self.repo1)
        with player:
            move = "MOVE: e2e4"
            out = player.play(move)

        self.assertEqual("e2e4", out)

    def test_terminate_self_terminates_process(self):
        player = Player(self.repo1)
        self.assertRaises(ProcessLookupError, player.play, "move")

    def test_raise_error_when_timeout(self):
        player = Player(self.repo2, 1)
        with player:
            self.assertRaises(TimeoutError, player.play, "move")

    def test_dont_raise_error_when_no_timeout(self):
        player = Player(self.repo3, 4)
        with player:
            out = player.play("MOVE: e2e4")

        self.assertEqual("e2e4", out)

    def test_process_is_terminated_after_timeout(self):
        player = Player(self.repo3, 1)
        with player:
            self.assertRaises(TimeoutError, player.play, "move")
            self.assertRaises(ProcessLookupError, player.play, "move")
