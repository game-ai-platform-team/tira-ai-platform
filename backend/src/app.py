from flask import Flask, make_response, request
from flask_cors import CORS

app = Flask("game-ai-testing-platform")
CORS(app)


@app.route("/api/submit", methods=["POST"])
def api_submit():
    content = request.json

    if not content:
        return 400

    submitted_content = content["content"]
    print(submitted_content)
    return "", 200


@app.route("/")
def init():
    return "hello"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
