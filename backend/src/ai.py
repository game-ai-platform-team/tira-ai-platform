from stockfish_engine import get_stockfish_engine

engine = get_stockfish_engine()
boardstate = []

while True:
    move = input()

    if move != "":
        boardstate.append(move)

    engine.set_position(boardstate)

    new_move = engine.get_best_move()
    boardstate.append(new_move)

    print(new_move)
