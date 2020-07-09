from flask import Flask, render_template, request, redirect, url_for, flash, session, make_response, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import data_manager
import json
import os


app = Flask(__name__)

@app.route('/')
def main_page():
    return render_template('home.html')


@app.route('/signup')
def register():
    return render_template('signup.html')


@app.route('/signup/submit', methods=["POST"])
def submit_register():
    req = request.get_json()
    email = req["email"]
    print(type(email))
    print(email)
    print(req)
    res = make_response(jsonify(req), 200)
    return res


if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    app.run(
        debug=True,
        port=5000
    )