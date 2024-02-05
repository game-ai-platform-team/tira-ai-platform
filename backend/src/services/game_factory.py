from pathlib import Path

from config import DEFAULT_CHESS_AI_PATH
from entities.chess_judge import ChessJudge
from entities.player import Player
from entities.player_stockfish import PlayerStockfish
from services.game import Game
from services.socket_io_service import SocketIOService


class GameFactory:
    @staticmethod
    def get_chess_game(
        socketio_service: SocketIOService,
        player1_file=None,
        player2_file=None,
        level=0,
    ) -> Game:
        if player1_file is None:
            player1 = PlayerStockfish(level)
        else:
            player1 = Player(player1_file)

        if player2_file is None:
            player2 = PlayerStockfish(level)
        else:
            player2 = Player(player2_file)

        return Game(
            socketio_service,
            player1,
            player2,
            ChessJudge(),
        )
