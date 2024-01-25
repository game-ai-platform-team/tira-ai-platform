import time
from typing import Any

from entities.chess_judge import ChessJudge
from entities.player import Player
from game_state import GameState
from services.games.game import Game
from services.socket_io_service import SocketIOService
from entities.judge import Judge


class ChessGame(Game):
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

        winner = None
        self.turn_counter = 0

        for _ in range(turns):
            state = self.__play_one_turn(delay, debug)

            if state != GameState.CONTINUE:
                break

        result = {
            "moves": self.judge.get_moves_as_uci(),
            "player": self.last_player,
            "game_state": state.name,
        }

        self.players[0].terminate_self()
        self.players[1].terminate_self()

        return result

    def __play_one_turn(self, delay, debug) -> str:
        last_move = self._get_last_move()
        white_state, white_move, white_time = self.play_one_move(
            self.players[0], last_move
        )

        time.sleep(delay)

        if debug:
            self._print_debug_info(white_move, white_state, white_time)
            self._print_board()
            if white_state == GameState.WIN:
                print("White won")
            if white_state == GameState.ILLEGAL:
                print(f"illegal white move: {white_move}")
            if white_state == GameState.INVALID:
                print(f"invalid white move: {white_move}")
            if white_state == GameState.DRAW:
                print("Draw")

        self.last_player = "white"

        if white_state != GameState.CONTINUE:
            return white_state

        black_state, black_move, black_time = self.play_one_move(
            self.players[1], white_move
        )
        time.sleep(delay)

        self.last_player = "black"

        if debug:
            self._print_debug_info(black_move, black_state, black_time)
            self._print_board()
            if black_state == GameState.WIN:
                print("Black won")
            if black_state == GameState.ILLEGAL:
                print(f"illegal black move: {black_move}")
            if black_state == GameState.INVALID:
                print(f"invalid black move: {black_move}")
            if black_state == GameState.DRAW:
                print("Draw")

        if black_state != GameState.CONTINUE:
            return black_state

        return GameState.CONTINUE

    def _play_one_move(self, player: Player, prev_move):
        self.turn_counter += 1
        start_time = time.perf_counter()
        move = player.play(prev_move)
        end_time = time.perf_counter() - start_time
        state = self.judge.validate(move)

        return state, move, end_time

    def _print_board(self) -> None:
        print("\n" + self.judge.get_debug_info() + "\n")

    def _print_debug_info(self, move, state, time):
        ms_time = int(time * 1000)
        print(
            f"[{self.turn_counter}] {move} : {state.name} : {str(ms_time).zfill(3)} ms"
        )

    def _get_last_move(self):
        try:
            move = self.judge.get_moves_as_uci()[-1]
        except:
            move = ""

        return move
