import services.games.chess
from game_state import GameState

class ChessJudger:
    """
    Contains an internal represenation of the current game
    """

    def __init__(self, engine) -> None:
        self.engine = engine
        self.boardstate = []

    def is_stalemate(self) -> bool:
        return False
    
    def is_checkmate(self) -> bool:
        return False

    def is_insufficient_material(self) -> bool:
        return False

    def check_move_is_valid(self, move: str) -> bool:
        """
        Copies current boardstate and tests move with the copy
        """
        fake_board = self.boardstate.copy()
        fake_board.append(move)
        self.engine.set_position(fake_board)
        fen = self.engine.get_fen_position()
        is_valid = self.engine.is_fen_valid(fen)

        if is_valid:
            return True
        else: 
            return False

    def validate(self, move: str):
        """
        Validates the move. Pushes move into boardstate

        Args:
            move (str): Move of a player.

        Returns:
            bool: True if game continues, False if given move is invalid.
        """

        is_valid = self.check_move_is_valid(move)

        if not is_valid:
            return GameState.INVALID
        if self.is_stalemate():
            return GameState.DRAW
        if self.is_insufficient_material():
            return GameState.DRAW
        if self.is_checkmate():
            return GameState.WIN

        return GameState.CONTINUE

    def add_move(self, move: str) -> None:
        """
        Adds move to the board.

        Args:
            move (str): Move to add.
        """
        self.boardstate.append(move)
        self.engine.set_position(self.boardstate)

    def get_board(self) -> list[str]:
        """
        Return current board.

        Returns:
            list[str]: Board as list of moves.
        """

        return self.boardstate

    def get_visual_board(self) -> str:
        """
        Returns current board as string.

        Returns:
            str: Board as string.
        """

        return self.engine.get_board_visual()
