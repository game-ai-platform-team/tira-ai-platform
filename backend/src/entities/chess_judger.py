import re

import chess

from game_state import GameState


class ChessJudger:
    def __init__(self) -> None:
        self.board = chess.Board()

    def validate(self, move: str):
        if not self.is_valid_uci_move(move):
            return GameState.INVALID

        legal_moves = [move.uci() for move in list(self.board.legal_moves)]

        if move not in legal_moves:
            return GameState.ILLEGAL

        self.add_move(move)

        if self.board.is_checkmate():
            return GameState.WIN
        if self.board.is_stalemate():
            return GameState.DRAW
        if self.board.is_insufficient_material():
            return GameState.DRAW
        if self.board.is_fivefold_repetition():
            return GameState.DRAW

        return GameState.CONTINUE

    def is_valid_uci_move(self, uci_move):
        pattern = re.compile(r"^[a-h][1-8][a-h][1-8][qrbn]?$")
        return bool(pattern.match(uci_move))

    def add_move(self, move):
        self.board.push_uci(move)

    def get_board_visual(self):
        return str(self.board)

    def get_moves_as_uci(self):
        return [move.uci() for move in self.board.move_stack]
