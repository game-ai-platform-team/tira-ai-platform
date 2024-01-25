import time
from pathlib import Path
from typing import Any

from config import DEFAULT_CHESS_AI_PATH
from entities.chess_judger import ChessJudger
from entities.player import Player
from game_state import GameState
from services.games.game import Game
from services.socket_io_service import SocketIOService


class ChessGame(Game):
    def __init__(
        self,
        socketio_service: SocketIOService,
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
        super().__init__(socketio_service, player1_file, player2_file)

        self.judger = ChessJudger()

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
            "moves": self.judger.get_moves_as_uci(),
            "player": self.last_player,
            "game_state": state.name,
        }

        self.player1.terminate_self()
        self.player2.terminate_self()

        return result

    def __play_one_turn(self, delay, debug) -> str:
        last_move = self._get_last_move()
        white_state, white_move, white_time = self.play_one_move(
            self.player1, last_move
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
            self.player2, white_move
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
        state = self.judger.validate(move)

        return state, move, end_time

    def _print_board(self) -> None:
        print("\n" + self.judger.get_board_visual() + "\n")

    def _print_debug_info(self, move, state, time):
        ms_time = int(time * 1000)
        print(
            f"[{self.turn_counter}] {move} : {state.name} : {str(ms_time).zfill(3)} ms"
        )

    def _get_last_move(self):
        try:
            move = self.judger.get_moves_as_uci()[-1]
        except:
            move = ""

        return move
