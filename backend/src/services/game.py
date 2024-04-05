from collections.abc import Callable
from contextlib import AbstractContextManager
import time
from types import TracebackType
from typing import Any

from entities.judge import Judge
from entities.move import Move, MoveMetadata
from entities.player import Player
from game_state import GameState


class Game(AbstractContextManager):
    def __init__(
        self,
        logger: Callable[[str], None],
        player1: Player,
        player2: Player,
        judge: Judge,
    ) -> None:
        self.__logger: Callable[[Any], None] = logger
        self.__players: list[Player] = [player1, player2]
        self.__judge: Judge = judge

    def __enter__(self) -> Any:
        for player in self.__players:
            player.__enter__()

        return self

    def __exit__(
        self,
        exc_type: type[BaseException] | None,
        exc_value: BaseException | None,
        traceback: TracebackType | None,
    ) -> bool | None:
        for player in self.__players:
            player.__exit__(exc_type, exc_value, traceback)

    def play(self, turns: int = 250, debug: bool = False):
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
        move = None

        for i in range(turns):
            player = self.__players[i % 2]
            try:
                move, elapsed_time = self.__play_one_move(player, previous_move)
            except TimeoutError:
                self.__logger(Move("", GameState.TIMEOUT, MoveMetadata(0, 0, "")))
                break

            state = self.__update_state(self.__judge.validate(move))

            if state == GameState.CONTINUE:
                self.__judge.add_move(move)
                state = self.__update_state(self.__judge.is_game_over())
            evaluation = self.__judge.analyze()

            if i == turns - 1 and state == GameState.CONTINUE:
                state = GameState.MAX_TURNS

            logs = player.get_and_reset_current_logs()

            move_object = Move(
                move, state, MoveMetadata(elapsed_time, evaluation, logs)
            )
            self.__logger(move_object)

            previous_move = move
            if debug:
                self.__print_debug_info(move_object)
            if state != GameState.CONTINUE:
                break

        self.__logger(f"END: {state}")

    def __play_one_move(self, player: Player, prev_move: str) -> tuple[str, int]:
        start_time = time.perf_counter()

        move = player.play(prev_move)

        elapsed_time = int((time.perf_counter() - start_time) * 1000)

        return (move, elapsed_time)

    def __print_debug_info(self, move: Move) -> None:
        info = "\n".join(
            [
                self.__judge.get_debug_info(),
                str(move),
            ]
        )

        print(info)

    def __update_state(self, state):
        return GameState(state.name.upper())
