import os
from unittest import TestCase

from config import TEMP_DIR
from services.api import Api


class TestApi(TestCase):
    def setUp(self) -> None:
        if not os.path.exists(TEMP_DIR):
            os.mkdir(TEMP_DIR)
        self.api = Api()
