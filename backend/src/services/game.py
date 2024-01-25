import time
from typing import Any

from entities.judge import Judge
from entities.player import Player
from game_state import GameState
from services.socket_io_service import SocketIOService


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

    def play(
        self, turns: int = 100, delay: float = 0.01, debug: bool = False
    ) -> dict[str, Any]:
        """
        Starts a game and return result as dict.

        Args:
            turns (int, optional): The maximum amount of turns to play. Defaults to 100.
            delay (float, optional): The delay between turns. Defaults to 0.01.
            debug(bool, optional): If True, prints debug info to console. Defaults to False.

        Returns:
            dict[str, Any]: The game result containing winner, moves, etc.
        """

        print(delay, debug)

        prev_move = ""
        state = None

        for i in range(turns):
            turn_result = self.play_one_move(self.players[i % 2], prev_move)

            state = turn_result["state"]

            if state != GameState.CONTINUE:
                break

        turn_result = {
            "moves": self.judge.get_all_moves(),
            "player": self.last_player,
            "game_state": state,
        }

        self._cleanup()

        return turn_result

    def _cleanup(self) -> None:
        """
        Terminates all subprocesses.
        """

        for player in self.players:
            player.terminate_self()

    def play_one_move(self, player: Player, prev_move: str) -> dict[str, Any]:
        start_time = time.perf_counter()

        move = player.play(prev_move)

        end_time = int((time.perf_counter() - start_time) * 1000)

        state = self.judge.validate(move)

        self.check_state(state, move)

        return {"move": move, "time": end_time, "state": state}

    def check_state(self, state: GameState, move: str) -> None:
        if state in (GameState.ILLEGAL, GameState.INVALID):
            self.socketio_service.send("")
            return

        self.socketio_service.send(move)
