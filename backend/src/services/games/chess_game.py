import time
from pathlib import Path
from typing import Any

from config import DEFAULT_CHESS_AI_PATH
from entities.chess_judger import ChessJudger
from entities.player import Player
from game_state import GameState
from stockfish_engine import get_stockfish_engine


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

        self.engine = get_stockfish_engine()
        self.boardstate = []
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
            winner = self.__play_one_turn(debug)

            if winner:
                break

        result = {
            "winner": winner,
            "moves": self.boardstate,
        }

        return result

    def __play_one_turn(self, debug) -> str:
        white_state, white_move, white_time = self._play_one_move(self.player1)

        if debug:
            print(
                f"[{self.turn_counter}] {white_move} : {white_state.name} : {white_time:.3} s"
            )
            self._print_board()

        if white_state == GameState.WIN:
            print("White won")
            return "player1"
        if white_state == GameState.ILLEGAL:
            print(f"illegal white move: {black_move}")
            return "None"
        if white_state == GameState.INVALID:
            print(f"invalid white move: {white_move}")
            return "None"
        if white_state == GameState.DRAW:
            print("Draw")
            return "None"

        black_state, black_move, black_time = self._play_one_move(self.player2)

        if debug:
            print(
                f"[{self.turn_counter}] {black_move} : {black_state.name} : {black_time:.3} s"
            )
            self._print_board()

        if black_state == GameState.WIN:
            print("Black won")
            return "player2"
        if black_state == GameState.ILLEGAL:
            print(f"illegal black move: {black_move}")
            return "None"
        if black_state == GameState.INVALID:
            print(f"invalid black move: {black_move}")
            return "None"
        if black_state == GameState.DRAW:
            print("Draw")
            return "None"

        return ""

    def _play_one_move(self, player):
        self.turn_counter += 1
        start_time = time.perf_counter()
        move = player.play(self.boardstate)
        end_time = time.perf_counter() - start_time
        state = self.judger.validate(move, self._get_board_fen())

        if state != GameState.INVALID:
            self._add_move(move)

        return state, move, end_time

    def _print_board(self) -> None:
        print(self._get_board_visual())

    def _add_move(self, move):
        self.boardstate.append(move)
        self.engine.set_position(self.boardstate)

    def _get_board_visual(self):
        return self.engine.get_board_visual()

    def _get_board_fen(self):
        return self.engine.get_fen_position()
