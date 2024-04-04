from uuid import uuid1
from entities.ssh_connection import SSHConnection
from services.batch_builder import BatchBuilder


class HPCService:
    def __init__(self, connection: SSHConnection, id_: str | None = None) -> None:
        self.__connection: SSHConnection = connection
        self.__id: str = id_ or str(uuid1())
        self.__current_output_line = 0

    def submit(self, game: str, repository_url: str, difficulty: int) -> None:
        batch = BatchBuilder.create_script(game, repository_url, difficulty, self.__id)

        remote_path = self.__connection.send_file(batch)

        self.__connection.execute(f"sbatch {remote_path}")
