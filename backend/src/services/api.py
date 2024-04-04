from time import sleep

from entities.ssh_connection import SSHConnection
from services.hpc_service import HPCService
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

        with HPCService() as hpc:
            hpc.submit(game, repository_url, difficulty)

            sleep(1)

            print(hpc.read_output())


api = API()
