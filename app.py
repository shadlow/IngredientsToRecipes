from flask import Flask, request
from flask import render_template

app = Flask(__name__,static_folder="./client/build/static", template_folder="./client/build")

@app.route("/")
def hello():
    return render_template('index.html')
