from flask import Flask, request, send_file, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO
from services.socket_io_service import SocketIOService

from services.api import api

app = Flask("game-ai-testing-platform")
app.config["SECRET_KEY"] = "secret!"
socketio = SocketIO(app, cors_allowed_origins="*")

CORS(app)


@socketio.on("startgame", namespace="/gameconnection")
def io_post_code(data):
    socket_service = SocketIOService(socketio, request.sid)

    api.start(data["githubUrl"], data["elo"], socket_service, active_game="chess")


@app.route("/ping")
@app.route("/ai-platform/ping")
def ping():
    return "pong"


@app.route("/")
@app.route("/ai-platform")
def index():
    return send_file("./../frontend/dist/index.html")


@app.route("/<path:path>")
@app.route("/ai-platform/<path:path>")
def default(path):
    return send_from_directory("./../frontend/dist", path)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, allow_unsafe_werkzeug=True)
