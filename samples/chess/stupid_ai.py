import random

import chess


def main():
    board = chess.Board()

    while True:
        opponent_move = input()
        if opponent_move != "":
            board.push_uci(opponent_move)
        legal_moves = [move.uci() for move in list(board.legal_moves)]
        choice = random.choice(legal_moves)
        board.push_uci(choice)
        print(choice)


if __name__ == "__main__":
    main()
