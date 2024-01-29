from flask_socketio import SocketIO
from entities.move import Move


class SocketIOService:
    def __init__(self, socketio: SocketIO, sid: str) -> None:
        self.socketio: SocketIO = socketio
        self.sid: str = sid

    def send(self, move: Move) -> None:
        self.socketio.emit(
            "newmove",
            str(move),
            namespace="/gameconnection",
            to=self.sid,
        )
