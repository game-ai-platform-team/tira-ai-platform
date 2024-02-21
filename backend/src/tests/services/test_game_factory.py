import unittest
from unittest.mock import Mock

from entities.cloned_repository import ClonedRepository
from services.game_factory import GameFactory
from services.socket_io_service import SocketIOService


class TestGameFactory(unittest.TestCase):
    def setUp(self) -> None:
        class TestGameFactory(GameFactory):
            def __init__(
                self, socketio: SocketIOService, repo: ClonedRepository, elo=1350
            ):
                self.socketio_service = socketio
                self.repo = repo
                self.elo = elo
                self.chess = Mock()
                self.cfour = Mock()
                self.games = {"chess": self.chess, "connect_four": self.cfour}

        self.socketio = Mock()
        self.repo = Mock()
        self.factory = TestGameFactory(self.socketio, self.repo, 500)

    def test_get_game_returns_correct_game(self):
        game = self.factory.get_game("chess")

        self.assertEqual(game, self.factory.chess)

    def test_get_game_returns_correct_game_2(self):
        game = self.factory.get_game("connect_four")

        self.assertEqual(game, self.factory.cfour)

    def test_get_game_returns_none_if_game_not_in_games(self):
        game = self.factory.get_game("chess_game")

        self.assertEqual(game, None)
