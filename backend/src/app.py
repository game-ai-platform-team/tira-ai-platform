from flask import Flask, request, send_file, send_from_directory
from flask_cors import CORS
from flask_oidc import OpenIDConnect
from flask_socketio import SocketIO

from services.api import api
from services.socket_service import SocketService

app = Flask("game-ai-testing-platform")
app.config.update(
    {
        "SECRET_KEY": "secret!",
        "OIDC_CLIENT_SECRETS": "client_secrets.json",
        "OIDC_REDIRECT_URI": "https://localhost:5000",
    }
)
socketio = SocketIO(app, cors_allowed_origins="*")
oidc = OpenIDConnect(app)

CORS(app)


@app.route("/login")
@oidc.require_login
def login():
    return "Welcome %s" % oidc.user_getfield("email")


@socketio.on("startgame", namespace="/gameconnection")
def io_post_code(data):
    socket_service = SocketService(socketio, request.sid)

    api.start(socket_service, data["githubUrl"], data["elo"], active_game=data["game"])


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
    socketio.run(
        app,
        host="0.0.0.0",
        port=5000,
        allow_unsafe_werkzeug=True,
        ssl_context="adhoc",
    )
