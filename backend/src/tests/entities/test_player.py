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