import time

from entities.judge import Judge
from entities.move import Move, MoveMetadata
from entities.repository_player import RepositoryPlayer
from game_state import GameState


class Game:
    def __init__(
        self,
        player1: RepositoryPlayer,
        player2: RepositoryPlayer,
        judge: Judge,
    ) -> None:
        self.__players: list[RepositoryPlayer] = [player1, player2]
        self.__judge: Judge = judge

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

        for i in range(turns):
            player = self.__players[i % 2]
            try:
                move, elapsed_time = self.__play_one_move(player, previous_move)
            except TimeoutError:
                print(Move("", GameState.TIMEOUT, MoveMetadata(0, 0, "")), "timeout :D")

            state = self.__judge.validate(move)
            self.__judge.add_move(move)
            if state == GameState.CONTINUE:
                state = self.__judge.is_game_over()
            evaluation = self.__judge.analyze()

            if i == turns - 1 and state == GameState.CONTINUE:
                state = GameState.MAX_TURNS

            logs = player.get_and_reset_current_logs()

            move_object = Move(
                f"MOVE: {move}", state, MoveMetadata(elapsed_time, evaluation, logs)
            )

            previous_move = move

            if debug:
                self.__print_debug_info(move_object)

            if state != GameState.CONTINUE:
                break

        print(state)
        self.__cleanup()

    def __cleanup(self) -> None:
        """
        Terminates all subprocesses.
        """

        for player in self.__players:
            player.terminate_self()

    def __play_one_move(self, player: RepositoryPlayer, prev_move: str) -> tuple[str, int]:
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
