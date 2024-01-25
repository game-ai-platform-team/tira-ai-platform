"""
Wraps Stockfish
"""

from pathlib import Path
from unittest.mock import Mock

from config import ROOTDIR
from entities.game_factory import GameFactory
from stockfish_engine import get_stockfish_engine

if __name__ == "__main__":
    engine = get_stockfish_engine()

    chess_game = GameFactory.get_chess_game(
        Path(ROOTDIR / "src" / "ai.py"),
        Path(ROOTDIR / "src" / "ai.py"),
        Mock(),
    )

    chess_game.play(1000, 0.1, debug=True)
