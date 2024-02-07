class PlayerLogger:
    def __init__(self):
        self.__logs = []

    def log(self, message: str):
        """
        Adds a message to the logs.
        """
        self.__logs.append(message)

    def get_and_clear_logs(self) -> str:
        """
        Returns the accumulated logs as a single string and clears the log buffer.
        """
        current_logs = '\n'.join(self.__logs)
        self.__logs = []
        return current_logs
