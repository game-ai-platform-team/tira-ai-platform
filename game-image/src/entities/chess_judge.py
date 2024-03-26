from math import exp

from chess import Board, InvalidMoveError, Move
from stockfish import Stockfish

from entities.judge import Judge
from game_state import GameState
from stockfish_engine import get_stockfish_engine


class ChessJudge(Judge):
    def __init__(
        self, board: Board | None = None, engine: Stockfish | None = None
    ) -> None:
        self.__board: Board = board or Board()
        self.__engine: Stockfish = engine or get_stockfish_engine()

    def validate(self, move: str) -> GameState:
        state = GameState.CONTINUE
        move_object = self.__get_move_object(move)

        if not move_object:
            return GameState.INVALID

        if move_object not in self.__board.legal_moves:
            return GameState.ILLEGAL

        return state

    def add_move(self, move):
        self.__board.push_uci(move)

    def is_game_over(self):
        state = GameState.CONTINUE
        if self.__board.is_checkmate():
            state = GameState.WIN
        elif self.__is_draw(self.__board):
            state = GameState.DRAW

        return state

    def get_debug_info(self):
        return str(self.__board)

    def get_all_moves(self) -> list[str]:
        """
        Returns all moves in UCI format.

        Returns:
            list[str]: List of moves.
        """

        return [move.uci() for move in self.__board.move_stack]

    def analyze(self):
        cp = self.__centipawn_eval()
        evaluation = self.__white_win_probability(cp)

        return evaluation

    def __get_move_object(self, move: str) -> Move | None:
        """
        Converts UCI move to chess.Move object.

        Args:
            move (str): Move as UCI string.

        Returns:
            Move | None: Move object if move is valid, otherwise None.
        """

        try:
            return Move.from_uci(move)
        except InvalidMoveError:
            return None

    def __is_draw(self, board: Board) -> bool:
        return (
            board.is_stalemate()
            or board.is_insufficient_material()
            or board.is_fivefold_repetition()
        )

    def __centipawn_eval(self):
        self.__engine.set_fen_position(self.__board.fen())
        score = self.__engine.get_evaluation()
        if score["type"] == "cp" or score["value"] == 0:
            return score["value"]
        mate_value = 100 * (21 - min(10, abs(score["value"])))
        if score["value"] < 0:
            return mate_value * -1
        return mate_value

    def __white_win_probability(self, cp):
        if cp == 0:
            outcome = self.__board.outcome()
            if outcome is None or outcome.winner is None:
                return 0

            return 1 if outcome.winner else -1

        return round(1 / (1 + exp(-0.004 * cp)) * 2 - 1, 3)
