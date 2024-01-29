import time
from typing import Any

from entities.judge import Judge
from entities.player import Player
from game_state import GameState
from services.socket_io_service import SocketIOService
from stockfish_engine import get_stockfish_engine
from math import exp


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

        self.__previous_player = None
        self.__engine = get_stockfish_engine()

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

        previous_move = ""
        state = None

        for i in range(turns):
            player = self.__players[i % 2]

            move, elapsed_time = self.__play_one_move(player, previous_move)
            state = self.__judge.validate(move)
            self.__judge.add_move(move)

            self.__engine.set_fen_position(self.__judge.board.fen())
            cp = self.__centipawn_eval()
            eval = self.__white_win_probability(cp)

            self.__send_state(state, move, elapsed_time, eval)

            self.__previous_player = player
            previous_move = move

            if debug:
                self.__print_debug_info(
                    {"move": move, "state": state, "time": elapsed_time, "eval": eval, "cp": cp}
                )

            if state != GameState.CONTINUE:
                break

        result = {
            "moves": self.__judge.get_all_moves(),
            "player": self.__previous_player,
            "game_state": state,
        }

        self.__cleanup()

        return result

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

    def __send_state(self, state: GameState, move: str, time: int, eval: float) -> None:
        if state in (GameState.ILLEGAL, GameState.INVALID):
            self.__socketio_service.send("", state.name, time)
            return

        self.__socketio_service.send(move, state.name, time, eval)

    def __print_debug_info(self, move: dict[str, Any]) -> None:
        info = "\n".join(
            [
                self.__judge.get_debug_info(),
                str(move),
            ]
        )

        print(info)

    def __centipawn_eval(self):
        score = self.__engine.get_evaluation()
        if score["type"] == "cp":
            return score["value"]
        return 100*(21-min(10,score["value"]))
    
    def __white_win_probability(self, cp):
        return 1/(1+exp(-0.004*cp))*2-1
