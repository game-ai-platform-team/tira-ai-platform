from stockfish_engine import get_stockfish_engine


class stockfish_ai:
    def __init__(self) -> None:
        self.engine = get_stockfish_engine()
        self.boardstate = []

    def configure_level(self):
        self.engine.set_skill_level(20)

    def play(self):
        while True:
            move = input()

            if move != "":
                self.boardstate.append(move)

            self.engine.set_position(self.boardstate)

            new_move = self.engine.get_best_move()
            self.boardstate.append(new_move)

            print(new_move)


if __name__ == "__main__":
    sf_ai = stockfish_ai()
    sf_ai.configure_level()
    sf_ai.play()
