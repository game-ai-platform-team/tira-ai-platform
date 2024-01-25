import time

from entities.player import Player
from game_state import GameState
from services.socket_io_service import SocketIOService


class Game:
    def __init__(
        self, socketio_service: SocketIOService, player1: Player, player2: Player
    ):
        self.socketio_service: SocketIOService = socketio_service
        self.player1 = player1
        self.player2 = player2

        self.turn_counter = 0
        self.last_player = None

    def play(self):
        pass

    def play_one_move(self, player: Player, prev_move):
        start_time = time.perf_counter()
        move = player.play(prev_move)
        end_time = time.perf_counter() - start_time
        state = self.judge.validate(move)
        self.check_state(state, move)

        return state, move, end_time

    def check_state(self, state, move: str):
        if state == GameState.ILLEGAL:
            move = None
        if state == GameState.INVALID:
            move = None
        self.socketio_service.send(move)
