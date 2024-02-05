from flask import Flask, request, send_file, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO

from services.api import api

app = Flask("game-ai-testing-platform")
app.config["SECRET_KEY"] = "secret!"
socketio = SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

CORS(app)


@socketio.on("postcode", namespace="/gameconnection")
def io_post_code(data):
    level = 20
    api.start(data["content"], socketio, request.sid, level)


@app.route("/")
def index():
    return send_file("./../frontend/dist/index.html")


@app.route("/<path:path>")
def default(path):
    return send_from_directory("./../frontend/dist", path)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, allow_unsafe_werkzeug=True)
