from pathlib import Path

from config import DEFAULT_CHESS_AI_PATH
from entities.chess_judge import ChessJudge
from entities.cloned_repository import ClonedRepository
from entities.player import Player
from entities.player_stockfish import PlayerStockfish
from services.game import Game
from services.socket_io_service import SocketIOService


class GameFactory:
    @staticmethod
    def get_github_chess_game(
        socketio_service: SocketIOService, repo: ClonedRepository, elo=1350
    ):
        return Game(socketio_service, Player(repo), PlayerStockfish(elo), ChessJudge())
