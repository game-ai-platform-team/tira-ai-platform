from entities.chess_judge import ChessJudge
from entities.cloned_repository import ClonedRepository
from entities.player import Player
from entities.player_stockfish import PlayerStockfish
from services.game import Game
from services.socket_io_service import SocketIOService


class GameFactory:
    def __init__(self, socketio: SocketIOService, repo: ClonedRepository, elo=1350):
        self.socketio_service = socketio
        self.repo = repo
        self.elo = elo
        self.games = {
            "chess": Game(
                self.socketio_service,
                Player(self.repo),
                PlayerStockfish(elo),
                ChessJudge(),
            ),
            # "connectfour": Game()
        }

    def get_game(self, active_game):
        if active_game in self.games:
            return self.games[active_game]
        return None
