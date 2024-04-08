from os import getenv

from services.game_factory import game_factory
from services.player_factory import player_factory

if __name__ == "__main__":
    game_type = getenv("GAME")
    repository_url = getenv("REPOSITORY_URL")
    difficulty = getenv("DIFFICULTY")

    if not (game_type and repository_url and difficulty):
        raise ValueError("GAME, REPOSITORY_URL, and DIFFICULTY must be set.")

    player1 = player_factory.get_local_player(game_type, int(difficulty))
    player2 = player_factory.get_remote_player(repository_url)

    game = game_factory.get_game(game_type, player1, player2)

    with game:
        game.play()
