from authlib.integrations.flask_client import OAuth
from flask import Flask, request, send_file, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO

from config import OIDC_CLIENT_ID, OIDC_CLIENT_SECRET, ROOTDIR
from services.api import api
from services.socket_service import SocketService

app = Flask("game-ai-testing-platform")
app.config.update(
    {
        "SECRET_KEY": "secret!",
    }
)
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
)
oauth = OAuth(app)
CORS(app)

oauth.register(
    "helsinki",
    client_id=OIDC_CLIENT_ID,
    client_secret=OIDC_CLIENT_SECRET,
    server_metadata_url="https://login-test.it.helsinki.fi/.well-known/openid-configuration",
    client_kwargs={
        "scope": "openid email profile",
    },
)


@app.route("/login")
def login():
    return oauth.helsinki.authorize_redirect("https://localhost:5000")


@socketio.on("startgame", namespace="/gameconnection")
def io_startgame(data):
    socket_service = SocketService(socketio, request.sid)

    api.start(socket_service, data["githubUrl"], data["elo"], active_game=data["game"])


@app.route("/ping")
@app.route("/ai-platform/ping")
def ping():
    return "pong"


@app.route("/")
@app.route("/ai-platform")
def index():
    return send_file(ROOTDIR.parent / "frontend" / "dist" / "index.html")


@app.route("/<path:path>")
@app.route("/ai-platform/<path:path>")
def default(path):
    return send_from_directory(ROOTDIR.parent / "frontend" / "dist", path)


if __name__ == "__main__":
    socketio.run(
        app,
        host="0.0.0.0",
        port=5000,
        allow_unsafe_werkzeug=True,
    )
