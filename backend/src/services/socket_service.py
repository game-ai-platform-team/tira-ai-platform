from duo_game_lib.move import Move
from flask_socketio import SocketIO


class SocketService:
    def __init__(self, socketio: SocketIO, sid: str) -> None:
        self.socketio: SocketIO = socketio
        self.sid: str = sid

    def send(self, move: Move) -> None:
        self.socketio.emit(
            "newmove",
            move.as_json(),
            namespace="/gameconnection",
            to=self.sid,
        )

    def send_error(self, error: str):
        self.socketio.emit("error", error, namespace="/gameconnection", to=self.sid)
