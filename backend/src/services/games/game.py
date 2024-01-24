import time

from entities.player import Player
from game_state import GameState


class Game:
    def __init__(self, socketio, sid, player1_file, player2_file):
        self.socketio = socketio
        self.sid = sid
        self.player1 = Player(player1_file)
        self.player2 = Player(player2_file)

        self.turn_counter = 0
        self.last_player = None

    def play(self):
        pass

    def play_one_move(self, player: Player, prev_move):
        start_time = time.perf_counter()
        move = player.play(prev_move)
        end_time = time.perf_counter() - start_time
        state = self.judger.validate(move)
        self.check_state(state, move)

        return state, move, end_time

    def socket(self, move):
        self.socketio.emit("newmove", {"move": move}, namespace = "/gameconnection", to = self.sid)

    def check_state(self, state, move):
        if state == GameState.ILLEGAL:
            move = None
        if state == GameState.INVALID:
            move = None
        self.socket(move)
