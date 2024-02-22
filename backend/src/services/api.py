import random
import subprocess
from pathlib import Path

from flask_socketio import SocketIO

from config import TEMP_DIR
from entities.cloned_repository import ClonedRepository
from services.game_factory import game_factory
from services.socket_io_service import SocketIOService


class Api:
    def __init__(self):
        self.temp_dir = TEMP_DIR

    def start(
        self,
        github_url: str,
        elo: int,
        socket_service: SocketIOService,
        active_game: str,
    ):
        repo = self.git_clone(github_url)

        game = game_factory.get_game(socket_service, active_game, repo, elo)
        game.play()

        repo.remove()

    def git_clone(self, github_url) -> ClonedRepository:
        self.temp_dir.mkdir(parents=True, exist_ok=True)
        repo_dir_name = "repo" + str(random.randint(1000000, 9999999))
        repo_dir = Path.joinpath(self.temp_dir, repo_dir_name)
        repository = ClonedRepository(repo_dir, github_url)
        subprocess.run(["git", "clone", github_url, repo_dir], check=True)
        return repository


api = Api()
