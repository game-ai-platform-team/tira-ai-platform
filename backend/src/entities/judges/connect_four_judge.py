from entities.judge import Judge


class ConnectFourJudge(Judge):
    def __init__(
        self, board: list[list[int]] | None = None, moves: list[int] | None = None
    ) -> None:
        self.__board: list[list[int]] = board or [[0] * 6 for i in range(7)]
        self.__moves: list[int] = moves or []

    def validate(self, move: str) -> GameState:
        state = GameState.CONTINUE

        if not self.__check_valid_move(move):
            return GameState.INVALID

        return state

    def __check_valid_move(self, move: str) -> bool:
        move_int = -1
        try:
            move_int = int(move)
        except ValueError:
            return False

        if not (0 <= move_int <= len(self.__board)):
            return False

        return True
