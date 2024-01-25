import time

from entities.player import Player
from game_state import GameState
from services.socket_io_service import SocketIOService
from entities.judge import Judge


class Game:
    def __init__(
        self,
        socketio_service: SocketIOService,
        player1: Player,
        player2: Player,
        judge: Judge,
    ) -> None:
        self.socketio_service: SocketIOService = socketio_service
        self.players: list[Player] = [player1, player2]
        self.judge: Judge = judge

        self.turn_counter = 0
        self.last_player = None

    def play(self):
        pass

    def _cleanup(self) -> None:
        """
        Terminates all subprocesses.
        """

        for player in self.players:
            player.terminate_self()

    def play_one_move(self, player: Player, prev_move: str):
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
