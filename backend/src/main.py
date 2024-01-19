"""
Wraps Stockfish
"""

from pathlib import Path

from config import ROOTDIR
from services.games.chess import Chess
from stockfish_engine import get_stockfish_engine
from utils.engine_wrapper import EngineWrapper

if __name__ == "__main__":
    engine = get_stockfish_engine()
    ew = EngineWrapper([], 5, engine)
    c = Chess(
        ew,
        Path(ROOTDIR / "src" / "ai.py"),
        Path(ROOTDIR / "src" / "ai_random.py"),
    )
    c.play(1000, 0.1, debug=True)
