from flask import Flask, make_response, request
from flask_cors import CORS
from services.api import api

app = Flask("game-ai-testing-platform")
CORS(app)


@app.route("/api/submit", methods=["POST"])
def api_submit():
    content = request.json

    if not content:
        return 400

    result = api.start(content)

    return result, 200


@app.route("/")
def init():
    return "hello"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
