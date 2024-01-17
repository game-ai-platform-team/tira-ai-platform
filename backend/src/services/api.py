from config import TEMP_DIR


class Api:
    def start(self, file: str) -> str:
        """
        Starts new chess game with the input AI.

        Args:
            file (str): Code of the AI.

        Returns:
            str: All moves of the game in JSON.
        """

        self.save(file)

        return ""

    def save(self, content: str) -> None:
        """
        Saves given content as a file to temporary directory.

        Args:
            content (str): Content to save.
        """

        with open(TEMP_DIR / "ai.py", mode="w", encoding="utf-8") as file:
            file.write(content)


api = Api()
