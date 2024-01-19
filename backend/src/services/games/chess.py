import time
from typing import Any
from stockfish_engine import get_stockfish_engine

from entities.chess_judger import ChessJudger
from entities.player import Player
from pathlib import Path
from utils.engine_wrapper import EngineWrapper
from config import DEFAULT_CHESS_AI_PATH


class Chess:
    def __init__(
        self,
        engine_wrapper: EngineWrapper | None = None,
        player1_file: Path = DEFAULT_CHESS_AI_PATH,
        player2_file: Path = DEFAULT_CHESS_AI_PATH,
    ) -> None:
        """
        Initializes a chess game.

        Args:
            engine_wrapper (EngineWrapper | None, optional):
                Engine wrapper for judging winner.
                Defaults to None.
            player1_file (Path, optional):
                Path to player1 AI file.
                Defaults to DEFAULT_CHESS_AI_PATH.
            player2_file (Path, optional):
                Path to player2 AI file.
                Defaults to DEFAULT_CHESS_AI_PATH.
        """

        if not engine_wrapper:
            engine = get_stockfish_engine()
            engine_wrapper = EngineWrapper([], 5, engine)

        self.judger = ChessJudger(engine_wrapper)
        self.player1 = Player(player1_file)
        self.player2 = Player(player2_file)

    def play(self, turns: int = 1000, delay: float = 0.1) -> dict[str, Any]:
        """
        Starts a game and return result as dict.

        Args:
            turns (int, optional): The maximum amount of turns to play. Defaults to 1000.
            delay (float, optional): The delay between turns. Defaults to 0.1.

        Returns:
            dict[str, Any]: The game result containing winner, moves, etc.
        """

        winner = None

        for _ in range(turns):
            winner = self.__play_one_turn()

            self.print_board()
            time.sleep(delay)

            if winner:
                break

        result = {
            "winner": winner,
            "moves": self.judger.get_board(),
        }

        return result

    def __play_one_turn(self) -> str:
        winner = ""
        white_move = self.player1.play(self.judger.get_board())

        if not self.judger.validate(white_move):
            winner = "player2"
            print("White lost")

            return winner

        self.judger.add_move(white_move)

        black_move = self.player2.play(self.judger.get_board())

        if not self.judger.validate(black_move):
            winner = "player1"
            print("Black lost")

            return winner

        self.judger.add_move(black_move)

        return winner

    def print_board(self) -> None:
        print(self.judger.get_visual_board())
        print(self.judger.get_board())
