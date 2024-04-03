import os
import shutil
from unittest import TestCase
from unittest.mock import Mock, patch

from config import TEMP_DIR
from services.api import API


class TestAPI(TestCase):
    def setUp(self) -> None:
        if not os.path.exists(TEMP_DIR):
            os.mkdir(TEMP_DIR)
        self.api = API()
        self.socket_mock = Mock()
        self.valid_repo = "https://github.com/game-ai-platform-team/stupid-chess-ai"
        self.invalid_repo = "https://github.com/invalid_repo"

    def mock_player(self, player_mock):
        player_instance_mock = player_mock.return_value.__enter__.return_value
        player_instance_mock.__exit__.return_value = None

    @patch("services.api.random.randint", return_value=1)
    @patch("services.api.Player")
    @patch("services.api.game_factory.get_game")
    def test_successful_git_clone(self, get_game_mock, player_mock, _randint_mock):
        play_mock = Mock()
        get_game_mock.return_value.play = play_mock
        self.mock_player(player_mock)

        github_url = self.valid_repo
        self.api.start(self.socket_mock, github_url, 1000, "chess")

        play_mock.assert_called_once()

    @patch("services.api.random.randint", return_value=2)
    @patch("services.api.Player")
    @patch("services.api.game_factory.get_game")
    def test_failing_git_clone(self, _get_game_mock, player_mock, _randint_mock):
        github_url = self.invalid_repo
        self.api.start(self.socket_mock, github_url, 1000, "chess")
        self.mock_player(player_mock)

        self.socket_mock.send_error.assert_called_once()

    @patch("services.api.random.randint", return_value=3)
    def test_git_clone_temp_dir_creation(self, _randint_mock):
        github_url = self.valid_repo
        self.api.git_clone(github_url)
        self.assertTrue(os.path.exists(os.path.join(TEMP_DIR, "repo3")))
        shutil.rmtree(os.path.join(TEMP_DIR, "repo3"))

    @patch("services.api.random.randint", return_value=4)
    @patch("services.api.Player")
    @patch("services.api.game_factory.get_game")
    def test_git_clone_temp_dir_cleanup(
        self, _get_game_mock, player_mock, _randint_mock
    ):
        github_url = self.valid_repo
        self.api.start(self.socket_mock, github_url, 1000, "chess")
        self.mock_player(player_mock)

        self.assertFalse(os.path.exists(os.path.join(TEMP_DIR, "repo4")))

    @patch("services.api.random.randint", return_value=5)
    @patch("services.api.Player")
    @patch("services.api.game_factory.get_game")
    def test_invalid_game(self, _get_game_mock, player_mock, _randint_mock):
        github_url = self.valid_repo
        self.api.start(self.socket_mock, github_url, 1000, "fake game")
        self.mock_player(player_mock)

        player_mock.return_value.play.assert_not_called()
