import os
import shutil
from unittest import TestCase
from unittest.mock import Mock, patch

from config import TEMP_DIR
from services.api import Api


class TestApi(TestCase):
    def setUp(self) -> None:
        if not os.path.exists(TEMP_DIR):
            os.mkdir(TEMP_DIR)
        self.api = Api()
        self.socket_mock = Mock()
        self.valid_repo = "https://github.com/game-ai-platform-team/stupid-chess-ai"
        self.invalid_repo = "https://github.com/invalid_repo"

    def tearDown(self) -> None:
        shutil.rmtree(TEMP_DIR, ignore_errors=True)

    @patch("services.api.random.randint", return_value=1234567)
    @patch("services.api.game_factory.get_game")
    def test_successful_git_clone(self, get_game_mock, _randint_mock):
        play_mock = Mock()
        get_game_mock.return_value.play = play_mock

        github_url = self.valid_repo
        self.api.start(self.socket_mock, github_url, 1000, "chess")

        play_mock.assert_called_once()

    @patch("services.api.random.randint", return_value=1234567)
    @patch("services.api.game_factory.get_game")
    def test_failing_git_clone(self, _get_game_mock, _randint_mock):
        github_url = self.invalid_repo
        self.api.start(self.socket_mock, github_url, 1000, "chess")

        self.socket_mock.send_error.assert_called_once()

    @patch("services.api.random.randint", return_value=1234567)
    def test_git_clone_temp_dir_creation(self, _randint_mock):
        github_url = self.valid_repo
        self.api.git_clone(github_url)  # Call git_clone directly
        self.assertTrue(os.path.exists(os.path.join(TEMP_DIR, "repo1234567")))

    @patch("services.api.random.randint", return_value=1234567)
    @patch("services.api.game_factory.get_game")
    def test_git_clone_temp_dir_cleanup(self, _get_game_mock, _randint_mock):
        github_url = self.valid_repo
        self.api.start(self.socket_mock, github_url, 1000, "chess")
        self.assertFalse(os.path.exists(os.path.join(TEMP_DIR, "repo1234567")))
