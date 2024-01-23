from services.games.chess_game import ChessGame


class GameFactory:
    @staticmethod
    def get_game(game_type: str):
        """
        Get a game from this method by inserting a string

        Args:
            game_type (string): F.e. "chess" or "othello".

        Returns:
            game instance of specified class
        """

        game_class = {"chess": ChessGame, "othello": None}

        return game_class[game_type]
