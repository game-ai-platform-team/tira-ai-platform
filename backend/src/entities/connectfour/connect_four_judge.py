from entities.judge import Judge
from game_state import GameState


class ConnectFourJudge(Judge):
    def __init__(
        self, rows=6, columns=7, moves: list[int] | None = None
    ) -> None:
        self.__board: list[list[int]] = self.initialize_board(rows, columns)
        self.__moves: list[int] = moves or []
        self.__turns = 1
        self.max_turns = len(self.__board)*len(self.__board[0])

    def initialize_board(self, rows: int, columns: int) -> list[list[int]]:
        board = [([0] * rows) for i in range(columns)]
        return board

    def validate(self, move: str) -> GameState:
        state = GameState.CONTINUE

        if not self.__check_valid_move(move):
            return GameState.INVALID

        if not self.__check_illegal_move(int(move)):
            return GameState.ILLEGAL

        ## This is stupid
        self.add_move(int(move))

        if self.__is_win():
           state = GameState.WIN
    
        if self.__is_draw():
            print("DRAW")
            state = GameState.DRAW
        
        ## If Game.py was a superclass, we wouldn't need to add and remove a move here
        self.remove_move(int(move))

        return state

    def add_move(self, move: int) -> None:
        for row in self.__board[move]:
            if row == 0:
                self.__board[move][row] = (self.__turns + 1) % 2 + 1
                self.__turns += 1
                break

    def remove_move(self, move: int) -> None:
        for row in range(len(self.__board[move])-1, -1, -1):
            if row != 0:
                self.__board[move][row] = 0
                self.__turns -= 1
                break

    def get_debug_info(self) -> str:
        pass

    def analyze(self) -> float:
        pass

    def get_all_moves(self) -> list[str]:
        pass

    def __check_valid_move(self, move: str) -> bool:
        move_int = -1
        try:
            move_int = int(move)
        except ValueError:
            return False

        if not (0 <= move_int <= len(self.__board)):
            return False

        return True

    def __check_illegal_move(self, move: int) -> bool:
        if self.__board[move][5] != 0:
            return False

        return True

    def get_board(self) -> list[list[int]]:
        return self.__board

    def __is_draw(self) -> bool:
        if self.__turns >= self.max_turns:
            return True
        return False

    def __is_win(self) -> bool:
        return False

    def set_board(self, board, turns) -> None:
        '''Only for tests with given boards.
        '''
        self.__board = board
        self.__turns = turns

