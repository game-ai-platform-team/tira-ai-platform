import random
import sys
import chess
import os

move_pipe = open('move_current', 'w')

def send_move(message):
    move_pipe.write(message + '\n')
    move_pipe.flush()

def main():

    board = chess.Board()

    while True:
        opponent_move = input()
        if opponent_move != "":
            board.push_uci(opponent_move)
        legal_moves = [move.uci() for move in list(board.legal_moves)]
        choice = random.choice(legal_moves)
        board.push_uci(choice)

        # example about logging
        print(f"{choice}\n")
        # example about posting a move
        print(f"MOVE: {choice}\n")

if __name__ == "__main__":
    main()
