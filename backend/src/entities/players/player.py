from abc import ABC, abstractmethod
from contextlib import AbstractContextManager


class Player(AbstractContextManager, ABC):
    """
    Class for wrapping different AIs.
    """

    def __init__(self, logs: list[str] | None = None) -> None:
        self._logs: list[str] = logs or []

    @abstractmethod
    def play(self, move: str) -> str:
        """
        Play a move.

        Args:
            move (str): Previous move

        Returns:
            str: New move
        """

    def pop_logs(self) -> str:
        """
        Return and clear all logs in memory

        Returns:
            str: Logs
        """

        logs = "\n".join(self._logs)
        self._logs = []

        return logs
