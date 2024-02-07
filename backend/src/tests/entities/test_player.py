import unittest
from pathlib import Path

from entities.player import Player


class TestPlayer(unittest.TestCase):
    def setUp(self):
        self.temp_file = Path("test_script.py")
        with self.temp_file.open("w") as f:
            f.write("print(input())")

    def tearDown(self):
        self.temp_file.unlink()

    def test_play_returns_move(self):
        player = Player(self.temp_file)
        move = "move"
        out = player.play(move)
        player.terminate_self()

        self.assertEqual(move, out)

    def test_terminate_self_terminates_process(self):
        player = Player(self.temp_file)
        player.terminate_self()

        self.assertRaises(ProcessLookupError, player.play, "move")

    def test_raise_error_when_timeout(self):
        with self.temp_file.open("w") as f:
            f.truncate(0)
            f.write("import time\ntime.sleep(2)")

        player = Player(self.temp_file, 1)

        self.assertRaises(TimeoutError, player.play, "move")

    def test_dont_raise_error_when_no_timeout(self):
        with self.temp_file.open("w") as f:
            f.truncate(0)
            f.write("import time\ntime.sleep(1)\nprint(input())")
        
        player = Player(self.temp_file, 2)
        out = player.play("move")

        self.assertEqual(out, "move")
    
    def test_process_is_terminated_after_timeout(self):
        with self.temp_file.open("w") as f:
            f.truncate(0)
            f.write("import time\ntime.sleep(2)\nprint(input())")

        player = Player(self.temp_file, 1)

        self.assertRaises(TimeoutError, player.play, "move")
        self.assertRaises(ProcessLookupError, player.play, "move")
