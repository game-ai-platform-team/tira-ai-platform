from flask import Flask, make_response, request
from flask_cors import CORS

app = Flask("game-ai-testing-platform")
CORS(app)


@app.route("/api/submit", methods = ["POST"])
def api_submit():
    json = request.json
    print(json["content"])
    return "", 200
