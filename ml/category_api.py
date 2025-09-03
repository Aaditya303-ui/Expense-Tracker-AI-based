# category_api.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Load trained model and vectorizer
model = joblib.load("category_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

@app.route("/predict-category", methods=["POST"])
def predict_category():
    if request.content_type != 'application/json':
        return jsonify({"error": "Invalid content type. Must be JSON"}), 415

    data = request.get_json()
    title = data.get("title", "").strip()

    if not title:
        return jsonify({"error": "Title is missing"}), 400

    X_input = vectorizer.transform([title])
    prediction = model.predict(X_input)[0]

    return jsonify({"category": prediction})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
