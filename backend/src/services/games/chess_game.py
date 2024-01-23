import time
from pathlib import Path
from typing import Any

from config import DEFAULT_CHESS_AI_PATH
from entities.chess_judger import ChessJudger
from entities.player import Player
from game_state import GameState


class ChessGame:
    def __init__(
        self,
        player1_file: Path = DEFAULT_CHESS_AI_PATH,
        player2_file: Path = DEFAULT_CHESS_AI_PATH,
    ) -> None:
        """
        Initializes a chess game.

        Args:
            player1_file (Path, optional):
                Path to player1 AI file.
                Defaults to DEFAULT_CHESS_AI_PATH.
            player2_file (Path, optional):
                Path to player2 AI file.
                Defaults to DEFAULT_CHESS_AI_PATH.
        """

        self.judger = ChessJudger()

        self.player1 = Player(player1_file)
        self.player2 = Player(player2_file)

        self.turn_counter = 0

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
            winner = self.__play_one_turn(delay, debug)

            if winner:
                break

        result = {
            "winner": winner,
            "moves": self.boardstate,
        }

        return result

    def __play_one_turn(self, delay, debug) -> str:
        white_state, white_move, white_time = self._play_one_move(self.player1)
        time.sleep(delay)

        if debug:
            self._print_debug_info(white_move, white_state, white_time)
            self._print_board()

        if white_state == GameState.WIN:
            if debug:
                print("White won")
            return "white"
        if white_state == GameState.ILLEGAL:
            if debug:
                print(f"illegal white move: {white_move}")
            return "draw"
        if white_state == GameState.INVALID:
            if debug:
                print(f"invalid white move: {white_move}")
            return "draw"
        if white_state == GameState.DRAW:
            if debug:
                print("Draw")
            return "draw"

        black_state, black_move, black_time = self._play_one_move(self.player2)
        time.sleep(delay)

        if debug:
            self._print_debug_info(black_move, black_state, black_time)
            self._print_board()

        if black_state == GameState.WIN:
            if debug:
                print("Black won")
            return "black"
        if black_state == GameState.ILLEGAL:
            if debug:
                print(f"illegal black move: {black_move}")
            return "draw"
        if black_state == GameState.INVALID:
            if debug:
                print(f"invalid black move: {black_move}")
            return "draw"
        if black_state == GameState.DRAW:
            if debug:
                print("Draw")
            return "draw"

        return ""

    def _play_one_move(self, player : Player):
        self.turn_counter += 1
        start_time = time.perf_counter()
        # move = player.play() -- use this when player is fixed
        move = player.play(self.judger.get_moves_as_uci())
        end_time = time.perf_counter() - start_time
        state = self.judger.validate(move)

        return state, move, end_time

    def _print_board(self) -> None:
        print("\n" + self.judger.get_board_visual() + "\n")
    
    def _print_debug_info(self, move, state, time):
        print(f"[{self.turn_counter}] {move} : {state.name} : {time:.3} s")
