from flask import Flask, make_response, request
from flask_cors import CORS

app = Flask("game-ai-testing-platform")
CORS(app)

submittedContent = ""


@app.route("/api/submit", methods = ["POST"])
def api_submit():
    global submittedContent
    json = request.json
    submittedContent = json["content"]
    print(submittedContent)
    return "", 200


@app.route("/api/code")
def api_code():
    return submittedContent
