import random
import subprocess
from pathlib import Path

from config import TEMP_DIR
from entities.cloned_repository import ClonedRepository
from entities.player import Player
from services.game_factory import game_factory
from services.socket_service import SocketService


class Api:
    def __init__(self):
        self.temp_dir = TEMP_DIR

    class GitCloneResult:
        def __init__(self):
            self.success: bool = False
            self.error: str = "Unknown error"
            self.repository: None | ClonedRepository = None

    def start(
        self, socket_service: SocketService, github_url: str, elo: int, active_game: str
    ):
        if active_game not in ["chess", "connect_four"]:
            return

        possible_clone = self.git_clone(github_url)
        if possible_clone.success:
            repo = possible_clone.repository

            player = Player(repo)
            with player:
                game = game_factory.get_game(socket_service, active_game, player, elo)
                game.play()

            repo.remove()
        else:
            socket_service.send_error(possible_clone.error)

    def git_clone(self, github_url) -> GitCloneResult:
        self.temp_dir.mkdir(parents=True, exist_ok=True)
        repo_dir_name = "repo" + str(random.randint(1000000, 9999999))
        repo_dir = Path.joinpath(self.temp_dir, repo_dir_name)
        repository = ClonedRepository(repo_dir, github_url)
        process = subprocess.run(["git", "clone", github_url, repo_dir], check=False)

        result = self.GitCloneResult()

        if process.returncode != 0:
            result.error = "Error cloning the repository " + github_url
        else:
            result.success = True
            result.repository = repository

        return result


api = Api()
