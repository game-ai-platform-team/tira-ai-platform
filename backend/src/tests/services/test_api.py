import os
from unittest import TestCase
from unittest.mock import Mock

from config import TEMP_DIR
from services.api import Api


class TestApi(TestCase):
    def setUp(self) -> None:
        if not os.path.exists(TEMP_DIR):
            os.mkdir(TEMP_DIR)
        self.api = Api()

    def test_failing_git_clone(self):
        socket_mock = Mock()
        self.api.start(socket_mock, "https://github.com/aaaa", 1000, "chess")
        socket_mock.send_error.assert_called_once()
