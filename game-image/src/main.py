from services.game import Game
from entities.chess_judge import ChessJudge
from entities.player_stockfish import PlayerStockfish
from entities.player import Player

import random
import shutil
from pathlib import Path

from git import GitCommandError, Repo

from config import TEMP_DIR
from entities.player import Player

print("Starting image")

class GitCloneResult:
    def __init__(self):
        self.success: bool = False
        self.error: str = "Unknown error"
        self.repository: None | Repo = None

    def remove(self):
        shutil.rmtree(self.repository.working_dir)

def git_clone(github_url):
    TEMP_DIR.mkdir(parents=True, exist_ok=True)
    repo_dir_name = "repo" + str(random.randint(1000000, 9999999))
    repo_dir = Path.joinpath(TEMP_DIR, repo_dir_name)
    result = GitCloneResult()
    try:
        repo = Repo.clone_from(github_url, repo_dir)
        result.success = True
        result.repository = repo
    except GitCommandError as e:
        result.error = f"Error cloning repository from {github_url}: {e}"
    return result


elo = 1350
github_url = "https://github.com/game-ai-platform-team/stupid-chess-ai"
clone = git_clone(github_url)
repo = clone.repository

game = Game(
                Player(repo),
                PlayerStockfish(elo),
                ChessJudge(),
            )


result = game.play()

print(result)