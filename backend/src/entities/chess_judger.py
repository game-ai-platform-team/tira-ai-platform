import re

import chess

from game_state import GameState


class ChessJudger:
    def __init__(self) -> None:
        pass

    def validate(self, move: str, boardstate):
        if not self.is_valid_uci_move(move):
            return GameState.INVALID

        board = chess.Board(boardstate)
        legal_moves = [move.uci() for move in list(board.legal_moves)]

        if move not in legal_moves:
            return GameState.ILLEGAL

        board.push(chess.Move.from_uci(move))

        if board.is_checkmate():
            return GameState.WIN
        if board.is_stalemate():
            return GameState.DRAW
        if board.is_insufficient_material():
            return GameState.DRAW
        if board.is_fivefold_repetition():
            return GameState.DRAW

        return GameState.CONTINUE

    def is_valid_uci_move(self, uci_move):
        pattern = re.compile(r"^[a-h][1-8][a-h][1-8][qrbn]?$")
        return bool(pattern.match(uci_move))
