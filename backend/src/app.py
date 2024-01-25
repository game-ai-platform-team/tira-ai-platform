from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO

from services.api import api

app = Flask("game-ai-testing-platform")
app.config["SECRET_KEY"] = "secret!"
socketio = SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

CORS(app)


@socketio.on("connect", namespace="/gameconnection")
def test_connect():
    pass


@socketio.on("postcode", namespace="/gameconnection")
def io_post_code(data):
    api.start(data["content"], socketio, request.sid)


@app.route("/api/chess/submit", methods=["POST"])
def api_submit():
    code_file = request.data.decode("utf-8")

    result = api.start(code_file, socketio)

    return jsonify(result)


@app.route("/<path:path>")
def default(path):
    return send_from_directory("./../frontend/dist", path)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, allow_unsafe_werkzeug=True)
