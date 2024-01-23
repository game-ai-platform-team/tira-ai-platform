"""
Wraps Stockfish
"""

from pathlib import Path

from config import ROOTDIR
from entities.game_factory import GameFactory
from stockfish_engine import get_stockfish_engine

if __name__ == "__main__":
    engine = get_stockfish_engine()

    Chess = GameFactory.get_game("chess")
    c = Chess(
        Path(ROOTDIR / "src" / "ai.py"),
        Path(ROOTDIR / "src" / "ai.py"),
    )
    c.play(1000, 0.1, debug=True)
