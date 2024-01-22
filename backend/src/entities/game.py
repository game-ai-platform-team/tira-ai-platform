from config import GAMEDICT

class GameFactory:

    @staticmethod
    def get_game(game_type: str):
        """
        Get a game from this method by inserting a string

        Args:
            game_type (string): F.e. "chess" or "othello". Can be checked from GAMEDICT in config.

        Returns:
            game instance of specified class
        """

        game_class = GAMEDICT.get(game_type)

        return game_class(engine_wrapper = None
                        player1_file = DEFAULT_CHESS_AI_PATH,
                        player2_file = DEFAULT_CHESS_AI_PATH)'
