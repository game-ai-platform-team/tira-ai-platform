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
