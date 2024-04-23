from json import loads
from time import sleep, time

from duo_game_lib.game_state import GameState
from duo_game_lib.move import Move, MoveMetadata

from config import DEFAULT_GAME_TIMEOUT
from entities.image import Image
from services.hpc_service import HPCService
from services.socket_service import SocketService


class API:
    def construct_move_object_from_json(self, content: str):
        """
        Logic to construct requisite objects

        Args:
            content (str): json string

        Returns:
            Move: Move with parameters extracted from content.

        """
        json_object = loads(content)
        time = json_object["time"]
        evaluation = json_object["evaluation"]
        logs = json_object["logs"]
        move_metadata = MoveMetadata(time, evaluation, logs)
        state = GameState(json_object["state"])

        return Move(json_object["move"], state, move_metadata)

    def start(
        self,
        socket_service: SocketService,
        repository_url: str,
        difficulty: int,
        game: str,
    ) -> None:
        if game not in ["chess", "connect_four"]:
            return

        with (
            Image(game, repository_url, difficulty) as image,
            HPCService(id_=image.id) as hpc,
        ):
            hpc.submit(image.path)

            output = []


            timeout_start = time()

            while time() < timeout_start + DEFAULT_GAME_TIMEOUT:
                output = hpc.read_output()

                for line in output:
                    content = line.split(":", 1)

                    tag = content[0]

                    match tag:
                        case "END":
                            return
                        case "MOVE":
                            json_string = content[1]
                            move_object = self.construct_move_object_from_json(
                                json_string
                            )
                            socket_service.send(move_object)
                sleep(1)


api = API()
