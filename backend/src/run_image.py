from os import getenv

from git import Repo

from services.game_factory import game_factory
from services.player_factory import player_factory

if __name__ == "__main__":
    game_type = getenv("GAME")
    difficulty = getenv("DIFFICULTY")
    repository = Repo(getenv("REPOSITORY_PATH"))

    if not (game_type and difficulty):
        raise ValueError("GAME and DIFFICULTY must be set.")

    player1 = player_factory.get_local_player(game_type, int(difficulty))
    player2 = player_factory.get_remote_player(repository)

    game = game_factory.get_game(game_type, player1, player2)

    with game:
        game.play()
