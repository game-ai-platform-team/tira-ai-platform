# Monkey import and patch must be before other imports!!!

import gevent.monkey

gevent.monkey.patch_all()
# pylint: disable=wrong-import-position
from authlib.integrations.flask_client import OAuth
from flask import (
    Flask,
    redirect,
    request,
    send_file,
    send_from_directory,
    session,
    url_for,
)
from flask_cors import CORS
from flask_socketio import SocketIO

from config import FRONTEND_DIR, OIDC_CLIENT_ID, OIDC_CLIENT_SECRET
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
    redirect_uri = url_for("authorize", _external=True)
    return oauth.helsinki.authorize_redirect(redirect_uri)


@app.route("/authorize")
def authorize():
    token = oauth.helsinki.authorize_access_token()
    print(token)
    session["id_token"] = token["id_token"]
    session["nonce"] = token["userinfo"]["nonce"]

    return redirect("/")


@app.route("/me")
def me():
    id_token_obj = {"id_token": session["id_token"]}
    nonce = session["nonce"]
    id_token = oauth.helsinki.parse_id_token(id_token_obj, nonce=nonce)
    return id_token


@socketio.on("startgame", namespace="/gameconnection")
def io_startgame(data):
    socket_service = SocketService(socketio, request.sid)

    api.start(socket_service, data["githubUrl"], data["elo"], game=data["game"])


@app.route("/ping")
def ping():
    return "pong"


@app.route("/check-login")
def check_login():
    user = session.get("user")
    return user


@app.route("/")
def index():
    return send_file(FRONTEND_DIR / "dist" / "index.html")


@app.route("/<path:path>")
def default(path):
    return send_from_directory(FRONTEND_DIR / "dist", path)


if __name__ == "__main__":
    socketio.run(
        app,
        host="0.0.0.0",
        port=5000,
        # debug = True,
        certfile="dev.cert",
        keyfile="dev.key",
    )
