import os
import random
import time

import chess
from stockfish.models import Stockfish as sf


def stockfish_path():
    path = os.path.join(
        os.path.dirname(__file__),
        "../../../backend/engines/stockfish_ubuntu/stockfish-ubuntu-x86-64-avx2",
    )
    return path


def get_stockfish_engine():
    sf_path = stockfish_path()
    engine = sf(path=sf_path)
    return engine


def set_board(board: chess.Board, board_position:str):
    print(f"Set board to {board_position}!")
    board.set_fen(board_position)

def make_move(board: chess.Board):
    legal_moves = [move.uci() for move in list(board.legal_moves)]
    print(f"I found {len(legal_moves)} legal moves: {', '.join(legal_moves)}")

    engine = get_stockfish_engine()
    engine.set_position([i.uci() for i in board.move_stack])
    choice = engine.get_best_move()

    board.push_uci(choice)

    return choice

def main():

    board = chess.Board()

    while True:
        opponent_move = input()
        time.sleep(random.randrange(1,10)/100)
        if opponent_move.startswith("BOARD:"):
            set_board(board, opponent_move.removeprefix("BOARD:"))
        elif opponent_move.startswith("RESET:"):
            board.reset()
            print("Board reset!")
        elif opponent_move.startswith("PLAY:"):
            choice = make_move(board)
            # example about logs
            print(f"I chose {choice}!")
            # example about posting a move
            print(f"MOVE: {choice}")
        elif opponent_move.startswith("MOVE:"):
            move = opponent_move.removeprefix("MOVE:")
            board.push_uci(move)
            print(f"Recieved move: {move}")
        else:
            print(f"Unknown tag: {opponent_move}")
            break

if __name__ == "__main__":
    main()
