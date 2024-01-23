import chess

from game_state import GameState
from utils.engine_wrapper import EngineWrapper


class ChessJudger:
    def __init__(self, engine_wrapper: EngineWrapper) -> None:
        self.engine_wrapper = engine_wrapper

    def validate(self, move: str) -> bool:
        """
        Validates the move.

        Args:
            move (str): Move of a player.

        Returns:
            bool: True if game continues, False if given move is invalid.
        """
        board = chess.Board(self.engine_wrapper.engine.get_fen_position())
        moves = [move.uci() for move in list(board.pseudo_legal_moves)]

        if move not in moves:
            return GameState.INVALID

        board.push(chess.Move.from_uci(move))

        if board.is_stalemate():
            return GameState.DRAW
        if board.is_insufficient_material():
            return GameState.DRAW
        if board.is_checkmate():
            return GameState.WIN

        return GameState.CONTINUE

    def add_move(self, move: str) -> None:
        """
        Adds move to the board.

        Args:
            move (str): Move to add.
        """
        self.engine_wrapper.engine.make_moves_from_current_position([move])
        self.engine_wrapper.boardstate.append(move)

    def get_board(self) -> list[str]:
        """
        Return current board.

        Returns:
            list[str]: Board as list of moves.
        """

        return self.engine_wrapper.boardstate

    def get_visual_board(self) -> str:
        """
        Returns current board as string.

        Returns:
            str: Board as string.
        """

        return self.engine_wrapper.engine.get_board_visual()
