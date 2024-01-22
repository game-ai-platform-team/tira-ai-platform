from services.games.chess import Chess

class GameFactory:

    @staticmethod
    def get_animal(game_type:str):
        """Static method to get a specific game object"""
        
        animals = {
            'chess': Chess,
            'othello': None
        }
        
        return animals.get(game_type)
