import json

from game_state import GameState


class Move:
    def __init__(
        self, move: str, state: GameState, time: int, evaluation: int, logs: str
    ) -> None:
        self.move: str = move
        self.state: GameState = state
        self.time: int = time
        self.evaluation: int = evaluation
        self.logs: str = logs

    def __str__(self) -> str:
        result = {
            "move": self.move,
            "state": self.state.name,
            "time": self.time,
            "evaluation": self.evaluation,
            "logs": self.logs,
        }

        return json.dumps(result)

    def as_json(self):
        return {
            "move": self.move,
            "state": str(self.state),
            "time": self.time,
            "evaluation": self.evaluation,
            "logging": self.logs,
        }

    def __eq__(self, other: "Move") -> bool:
        if not isinstance(other, Move):
            return False

        return (
            self.move == other.move
            and self.state == other.state
            and self.time == other.time
            and self.evaluation == other.evaluation
            and self.logs == other.logs
        )
