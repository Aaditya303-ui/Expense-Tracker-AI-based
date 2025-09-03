from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import requests
from dotenv import load_dotenv
import json

# =========================
# App setup
# =========================
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
load_dotenv()

# =========================
# ML model setup
# =========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "..", "ml", "category_model.pkl")
vectorizer_path = os.path.join(BASE_DIR, "..", "ml", "vectorizer.pkl")

def load_artifacts():
    """Load ML artifacts for category prediction."""
    try:
        if not os.path.exists(model_path) or not os.path.exists(vectorizer_path):
            print("⚠️ Model/vectorizer files not found.")
            return None, None
        return joblib.load(model_path), joblib.load(vectorizer_path)
    except Exception as e:
        print(f"❌ Error loading artifacts: {e}")
        return None, None

model, vectorizer = load_artifacts()

# =========================
# Grok LLaMA-7B API setup
# =========================
GROK_API_KEY = os.getenv("GROK_API_KEY")
GROK_API_URL = "https://api.grok.com/v1/chat/completions"  # Example endpoint

def analyze_expenses(expenses, incomes):
    """Use Grok LLaMA-7B to analyze financial data."""
    prompt = f"""
    You are an AI that analyzes financial data.
    Given:
    Expenses: {expenses}
    Incomes: {incomes}

    Return a VALID JSON object with:
    - total_expense
    - total_income
    - balance
    - expenses_by_category (dictionary)
    - suggestions (array of strings)
    Only return JSON, no extra text.
    """

    headers = {
        "Authorization": f"Bearer {GROK_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "llama-7b",
        "messages": [
            {"role": "system", "content": "You are a financial assistant."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.3
    }

    response = requests.post(GROK_API_URL, headers=headers, json=payload)

    if response.status_code != 200:
        raise Exception(f"Grok API error: {response.text}")

    return response.json()["choices"][0]["message"]["content"]

# =========================
# Routes
# =========================
@app.route("/predict-category", methods=["POST"])
def predict_category():
    """Predict expense category using ML model."""
    if not request.is_json:
        return jsonify({"error": "Invalid JSON format"}), 400

    title = request.json.get("title", "").strip()
    if not title:
        return jsonify({"error": "Title is required"}), 400

    if model is None or vectorizer is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        input_vector = vectorizer.transform([title])
        prediction = model.predict(input_vector)[0]
        return jsonify({"category": prediction})
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {e}"}), 500


@app.route("/api/analyze", methods=["POST"])
def api_analyze():
    """Analyze expenses & incomes with Grok LLaMA-7B."""
    if not request.is_json:
        return jsonify({"error": "Invalid JSON format"}), 400

    data = request.json
    expenses = data.get("expenses", [])
    incomes = data.get("incomes", [])

    try:
        llama_result = analyze_expenses(expenses, incomes)
        parsed = json.loads(llama_result)  # Validate JSON output
        return jsonify(parsed)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# Main entry
# =========================
if __name__ == "__main__":
    app.run(debug=True)
