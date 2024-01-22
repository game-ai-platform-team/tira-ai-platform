from services.games.chess import Chess


class GameFactory:
    @staticmethod
    def get_game(game_type: str):
        """Static method to get a specific game object"""

        games = {"chess": Chess, "othello": None}

        return games.get(game_type)
