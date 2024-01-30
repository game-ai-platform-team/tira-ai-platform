from math import exp

import chess
from chess import InvalidMoveError

from entities.judge import Judge
from game_state import GameState
from stockfish_engine import get_stockfish_engine


class ChessJudge(Judge):
    def __init__(self) -> None:
        super().__init__()
        self.board = chess.Board()
        self.__engine = get_stockfish_engine()

    def validate(self, move: str) -> GameState:
        state = GameState.CONTINUE
        move_object = None

        try:
            move_object = chess.Move.from_uci(move)
        except InvalidMoveError:
            return GameState.INVALID

        if move_object not in self.board.legal_moves:
            return GameState.ILLEGAL

        newboard = self.board.copy()
        newboard.push(move_object)

        if newboard.is_checkmate():
            state = GameState.WIN
        elif (
            newboard.is_stalemate()
            or newboard.is_insufficient_material()
            or newboard.is_fivefold_repetition()
        ):
            state = GameState.DRAW

        return state

    def add_move(self, move):
        self.board.push_uci(move)

    def get_debug_info(self):
        return str(self.board)

    def get_all_moves(self) -> list[str]:
        """
        Returns all moves in UCI format.

        Returns:
            list[str]: List of moves.
        """

        return [move.uci() for move in self.board.move_stack]

    def analyze(self):
        cp = self.__centipawn_eval()
        evaluation = self.__white_win_probability(cp)

        return evaluation

    def __centipawn_eval(self):
        self.__engine.set_fen_position(self.board.fen())
        score = self.__engine.get_evaluation()
        if score["type"] == "cp" or score["value"] == 0:
            return score["value"]
        mate_value = 100 * (21 - min(10, abs(score["value"])))
        if score["value"] < 0:
            return mate_value * -1
        return mate_value

    def __white_win_probability(self, cp):
        if cp == 0:
            outcome = self.board.outcome()
            if outcome is None or outcome.winner is None:
                return 0

            return 1 if outcome.winner else -1

        return 1 / (1 + exp(-0.004 * cp)) * 2 - 1
