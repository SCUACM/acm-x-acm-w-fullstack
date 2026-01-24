from flask import Flask, jsonify, request, send_from_directory
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred)
db = firebase_admin.firestore.client()

app = Flask(__name__, static_folder="../clicker/dist", static_url_path="/")

users = [
    {"id": 1, "name": "John Pork", "age": 67},
    {"id": 2, "name": "Cynthia Erivo", "age": 40},
]

# for serving front end
@app.route("/")
def home():
    return send_from_directory(app.static_folder, "index.html")

# get all users
@app.route("/users", methods=["GET"])
def get_users():
    return jsonify(users)

# get a specifc user
@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = next((u for u in users if u["id"] == user_id), None)
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404

# create a new user
@app.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()
    # specify new user parameters
    new_user = {
        "id": users[-1]["id"] + 1 if users else 1,
        "name": data.get("name"),
        "age": data.get("age")
    }
    # append to JSON array of data
    users.append(new_user)
    return jsonify(new_user), 201

# update user
@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.get_json()
    user = next((u for u in users if u["id"] == user_id), None)
    if user:
        user["name"] = data.get("name", user["name"])
        user["age"] = data.get("age", user["age"])
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404

# delete user
@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    global users
    # create a new list of users whome don't match the specified id
    users = [u for u in users if u["id"] != user_id]
    return jsonify({"message": "User deleted"}), 200


@app.route("/firebase/get", methods=["GET"])
def firebase_get():
    doc = db.collection("clicker").document("counter").get()
    if doc.exists:
        return jsonify(doc.to_dict())
    return jsonify({"error": "not found"}), 404


@app.route("/firebase/set", methods=["POST"])
def firebase_set():
    data = request.get_json()
    print(data)
    db.collection("clicker").document("counter").set(data)
    return jsonify({"message": "success"}), 201

if __name__ == "__main__":
    app.run(port=8080,debug=True)
