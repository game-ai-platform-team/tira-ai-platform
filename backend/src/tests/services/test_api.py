import os
from unittest import TestCase

from config import TEMP_DIR
from services.api import Api


class TestApi(TestCase):
    def setUp(self) -> None:
        if not os.path.exists(TEMP_DIR):
            os.mkdir(TEMP_DIR)
        self.api = Api()

    def test_save_file_succeeds(self):
        self.api.save("Hello world!")

        with open(TEMP_DIR / "ai.py", mode="r", encoding="utf-8") as file:
            content = file.read()

        self.assertEqual(content, "Hello world!")
