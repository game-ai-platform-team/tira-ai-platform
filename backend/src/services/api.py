import random
import shutil
from pathlib import Path

from git import GitCommandError, Repo

from config import TEMP_DIR
from entities.player import Player
from services.game_factory import game_factory
from services.socket_service import SocketService


class API:
    def __init__(self):
        self.temp_dir = TEMP_DIR

    class GitCloneResult:
        def __init__(self):
            self.success: bool = False
            self.error: str = "Unknown error"
            self.repository: None | Repo = None

        def remove(self):
            shutil.rmtree(self.repository.working_dir)

    def start(
        self, socket_service: SocketService, github_url: str, elo: int, active_game: str
    ):
        if active_game not in ["chess", "connect_four"]:
            return

        clone = self.git_clone(github_url)

        if not clone.success:
            socket_service.send_error(clone.error)
            return

        repo = clone.repository

        player = Player(repo)

        with player:
            game = game_factory.get_game(socket_service, active_game, player, elo)
            game.play()

        clone.remove()

    def git_clone(self, github_url):
        self.temp_dir.mkdir(parents=True, exist_ok=True)
        repo_dir_name = "repo" + str(random.randint(1000000, 9999999))
        repo_dir = Path.joinpath(self.temp_dir, repo_dir_name)
        result = self.GitCloneResult()
        try:
            repo = Repo.clone_from(github_url, repo_dir)
            result.success = True
            result.repository = repo
        except GitCommandError as e:
            result.error = f"Error cloning repository from {github_url}: {e}"
        return result


api = API()
