import re

import chess

from entities.judge import Judge
from game_state import GameState


class ChessJudge(Judge):
    def __init__(self) -> None:
        super().__init__()
        self.board = chess.Board()

    def validate(self, move: str) -> GameState:
        if not self.is_valid_uci_move(move):
            return GameState.INVALID

        legal_moves = [move.uci() for move in list(self.board.legal_moves)]

        if move not in legal_moves:
            return GameState.ILLEGAL

        newboard = self.board.copy()
        newboard.push_uci(move)

        if newboard.is_checkmate():
            return GameState.WIN
        if newboard.is_stalemate():
            return GameState.DRAW
        if newboard.is_insufficient_material():
            return GameState.DRAW
        if newboard.is_fivefold_repetition():
            return GameState.DRAW

        return GameState.CONTINUE

    def is_valid_uci_move(self, uci_move):
        pattern = re.compile(r"^[a-h][1-8][a-h][1-8][qrbn]?$")
        return bool(pattern.match(uci_move))

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
