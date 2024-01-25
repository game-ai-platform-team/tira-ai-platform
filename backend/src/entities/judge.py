from abc import ABC, abstractmethod

from game_state import GameState


class Judge(ABC):
    """
    An abstract class for validating moves and generating debug infos of a game.
    """

    def __init__(self, moves: list[str] | None = None) -> None:
        self.__moves: list[str] = moves or []

    @abstractmethod
    def validate(self, move: str) -> GameState:
        """
        Validates a move, does not change internal states.

        Args:
            move (str): Move to be validated.

        Returns:
            GameState: An integer describing game state.
        """

    @abstractmethod
    def add_move(self, move: str) -> None:
        """
        Adds a move and updates internal data structures based on game.

        Args:
            move (str): The move to be added.
        """

    @abstractmethod
    def get_debug_info(self) -> str:
        """
        Returns debug info such as visual board state, player advantages, etc.

        Returns:
            str: Debug info.
        """

    def get_all_moves(self) -> list[str]:
        return self.__moves
