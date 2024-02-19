from flask_socketio import SocketIO

from entities.move import Move


class SocketIOService:
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

    def send_final_state(self, param):
        self.socketio.emit("final", param, namespace="/gameconnection", to=self.sid)
