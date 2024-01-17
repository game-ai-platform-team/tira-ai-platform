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
            bool: True if game continues, False if player of the move lost.
        """

        try:
            self.engine_wrapper.engine.make_moves_from_current_position([move])
        except ValueError:
            return False

        return True

    def add_move(self, move: str) -> None:
        """
        Adds move to the board.

        Args:
            move (str): Move to add.
        """

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
