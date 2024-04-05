from re import match
from time import sleep

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
            output = []

            while not filter(lambda line: match("^END:[\\s\\S]*", line), output):
                output = hpc.read_output()

                print(output)
                sleep(1)


api = API()
