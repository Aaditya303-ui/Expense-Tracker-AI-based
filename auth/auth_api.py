from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# ✅ Save users in a simple JSON file
USERS_FILE = "users.json"

# ✅ Load users
def load_users():
    if not os.path.exists(USERS_FILE):
        return {}
    with open(USERS_FILE, "r") as f:
        return json.load(f)

# ✅ Save users
def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=4)

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    users = load_users()
    if email in users:
        return jsonify({"error": "User already exists"}), 409

    users[email] = {"password": password}
    save_users(users)
    return jsonify({"message": "Registration successful"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    users = load_users()
    if email in users and users[email]["password"] == password:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

if __name__ == "__main__":
    app.run(port=5001, debug=True)
