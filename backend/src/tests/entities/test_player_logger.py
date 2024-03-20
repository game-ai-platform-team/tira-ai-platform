import unittest
from pathlib import Path

from entities.player_logger import PlayerLogger


class TestPlayer(unittest.TestCase):
    def setUp(self):
        self.logger = PlayerLogger()

    def test_logs(self):
        self.logger.log("test log")
        logs = self.logger.get_and_clear_logs()
        self.assertEqual(logs, "test log")

    def test_empty(self):
        self.logger.log("test log")
        logs = self.logger.get_and_clear_logs()
        logs = self.logger.get_and_clear_logs()
        self.assertEqual(logs, "")
