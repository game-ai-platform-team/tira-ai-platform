from flask import Flask, jsonify, make_response, request, send_from_directory
from flask_cors import CORS

from services.api import Api, api

app = Flask("game-ai-testing-platform")
CORS(app)


@app.route("/api/chess/submit", methods=["POST"])
def api_submit():
    code_file = request.data.decode("utf-8")

    result = api.start(code_file)

    return jsonify(result)


@app.route("/<path:path>")
def default(path):
    return send_from_directory("./../frontend/dist", path)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
