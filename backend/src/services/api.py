from time import sleep

from entities.image import Image
from services.hpc_service import HPCService
from services.socket_service import SocketService


class API:
    def start(
        self,
        socket_service: SocketService,
        repository_url: str,
        difficulty: int,
        game: str,
    ) -> None:
        if game not in ["chess", "connect_four"]:
            return

        with Image(game, repository_url, difficulty) as image:
            with HPCService(id_=image.id) as hpc:
                hpc.submit(image.path)

                output = []

                while True:
                    output = hpc.read_output()

                    for line in output:
                        parts = line.split(":")
                        tag = parts[0]

                        if tag == "END":
                            return

                    print(output)
                    sleep(1)


api = API()
