from pathlib import Path
from time import sleep
from uuid import uuid1

from entities.ssh_connection import SSHConnection
from services.batch_builder import BatchBuilder
from services.socket_service import SocketService


class API:
    def start(
        self,
        socket_service: SocketService,
        repository_url: str,
        difficulty: int,
        game: str,
    ):
        if game not in ["chess", "connect_four"]:
            return

        id = str(uuid1())

        with SSHConnection() as connection:
            script = BatchBuilder.create_script(game,repository_url,  id)

            remote_path = connection.send_file(script)

            connection.execute(f"sbatch {str(remote_path)}")

            sleep(1)

            print(connection.read_file(Path(f"result-{id}.txt")))


api = API()
