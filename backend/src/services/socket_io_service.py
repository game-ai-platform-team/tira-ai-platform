from flask_socketio import SocketIO


class SocketIOService:
    def __init__(self, socketio: SocketIO, sid: str) -> None:
        self.socketio: SocketIO = socketio
        self.sid: str = sid

    def send(self, move: str, state: str, time: int) -> None:
        self.socketio.emit(
            "newmove", {"move": move, "state": state, "time": time}, namespace="/gameconnection", to=self.sid
        )
