from flask_socketio import SocketIO


class SocketIOService:
    def __init__(self, socketio: SocketIO, sid: str) -> None:
        self.socketio: SocketIO = socketio
        self.sid: str = sid

    def send(self, move: str) -> None:
        self.socketio.emit(
            "newmove", {"move": move}, namespace="/gameconnection", to=self.sid
        )
