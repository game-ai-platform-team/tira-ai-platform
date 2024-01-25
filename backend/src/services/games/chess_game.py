import time
from typing import Any

from game_state import GameState
from services.game import Game


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

        self._cleanup()

        return result

    def __play_one_turn(self, delay, debug) -> str:
        last_move = self._get_last_move()

        white_result = self.play_one_move(self.players[0], last_move)
        print(white_result)
        white_state = white_result["state"]
        white_move = white_result["move"]
        white_time = white_result["time"]

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

        black_result = self.play_one_move(self.players[1], white_move)
        print(black_result)
        black_state = black_result["state"]
        black_move = black_result["move"]
        black_time = black_result["time"]

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
