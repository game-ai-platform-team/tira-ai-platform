import time
from typing import Any

from entities.judge import Judge
from entities.move import Move
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
        self.__socketio_service: SocketIOService = socketio_service
        self.__players: list[Player] = [player1, player2]
        self.__judge: Judge = judge

    def play(self, turns: int = 250, debug: bool = False) -> dict[str, Any]:
        """
        Starts a game and return result as dict.

        Args:
            turns (int, optional): The maximum amount of turns to play. Defaults to 250.
            debug(bool, optional): If True, prints debug info to console. Defaults to False.

        Returns:
            dict[str, Any]: The game result containing winner, moves, etc.
        """
        previous_move = ""
        state = None
        previous_player = None

        for i in range(turns):
            player = self.__players[i % 2]
            try:
                move, elapsed_time = self.__play_one_move(player, previous_move)
            except Exception as ex:
                if type(ex) == TimeoutError:
                    self.__send_state(Move("", GameState.TIMEOUT, 0, 0))
                    break
                else:
                    raise ex

            state = self.__judge.validate(move)
            self.__judge.add_move(move)
            evaluation = self.__judge.analyze()

            if i == turns - 1 and state == GameState.CONTINUE:
                state = GameState.MAX_TURNS

            logs = player.get_and_reset_current_logs()

            move_object = Move(move, state, elapsed_time, evaluation, logs)

            self.__send_state(move_object)

            previous_player = player
            previous_move = move

            if debug:
                self.__print_debug_info(move_object)

            if state != GameState.CONTINUE:
                break

        self.__sendGameEnd(state)
        self.__cleanup()

    def __cleanup(self) -> None:
        """
        Terminates all subprocesses.
        """

        for player in self.__players:
            player.terminate_self()

    def __play_one_move(self, player: Player, prev_move: str) -> tuple[str, int]:
        start_time = time.perf_counter()

        move = player.play(prev_move)

        elapsed_time = int((time.perf_counter() - start_time) * 1000)

        return (move, elapsed_time)

    def __send_state(self, move: Move) -> None:
        if move.state in (GameState.ILLEGAL, GameState.INVALID):
            move = Move("", move.state, move.time, move.evaluation, move.logs)

        self.__socketio_service.send(move)

    def __sendGameEnd(self, state):
        if state != GameState.CONTINUE:
            self.__socketio_service.send_final_state(
                {"state": str(state), "allLogs": self.__players[0].get_and_reset_all_logs()})

    def __print_debug_info(self, move: Move) -> None:
        info = "\n".join(
            [
                self.__judge.get_debug_info(),
                str(move),
            ]
        )

        print(info)
