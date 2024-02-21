from entities.judge import Judge


class ConnectFourJudge(Judge):
    def __init__(
        self, board: list[list[int]] | None = None, moves: list[int] | None = None
    ) -> None:
        self.__board: list[list[int]] = board or [[0] * 6 for i in range(7)]
        self.__moves: list[int] = moves or []
