from os import getenv
from tempfile import TemporaryDirectory

from git import Repo

from services.game_factory import game_factory
from services.player_factory import player_factory

if __name__ == "__main__":
    game_type = getenv("GAME")
    difficulty = getenv("DIFFICULTY")
    repository_url = getenv("REPOSITORY_URL")

    if not (game_type and difficulty and repository_url):
        raise ValueError(
            "Environment variable GAME, DIFFICULTY or REPOSITORY_URL missing."
        )

    with TemporaryDirectory() as repository_path:
        player1 = player_factory.get_local_player(game_type, int(difficulty))
        player2 = player_factory.get_remote_player(
            Repo.clone_from(repository_url, repository_path)
        )

        game = game_factory.get_game(game_type, player1, player2)

        with game:
            game.play()
