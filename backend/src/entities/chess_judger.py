import chess

from game_state import GameState


class ChessJudger:
    """
    Contains an internal represenation of the current game

    Boardstate must be in FEN format
    """

    def __init__(self) -> None:
        pass

    def validate(self, move: str, boardstate):
        """
        Validates the move. Pushes move into boardstate

        Args:
            move (str): Move of a player.

        Returns:
            bool: True if game continues, False if given move is invalid.
        """

        board = chess.Board(boardstate)
        moves = [move.uci() for move in list(board.legal_moves)]

        if move not in moves:
            return GameState.INVALID
        if board.is_stalemate():
            return GameState.DRAW
        if board.is_insufficient_material():
            return GameState.DRAW
        if board.is_checkmate():
            return GameState.WIN

        return GameState.CONTINUE
