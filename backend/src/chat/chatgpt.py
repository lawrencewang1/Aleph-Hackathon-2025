import os
from dotenv import load_dotenv
import openai
import json

import base64

from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

from prompt import basic_prompt, premium_prompt
load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

def basic(image_data, coin_type):
    # response = openai.ChatCompletion.create(
    #     model="gpt-4o-mini",
    #     response_format='json',
    #     messages=[{"role": "system", "content": basic_prompt},
    #             {"role": "user", "content": f"image: {image_data}\n" + f"coin type: {coin_type}"}],
    #     temperature=0
    # )
    # rdict = json.loads(response["choices"][0]["message"]["content"])
    # return rdict
    return {image_data: coin_type}

def premium(user_prompt : str):
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        response_format='json',
        messages=[{"role": "system", "content": premium_prompt},
                {"role": "user", "content": user_prompt}],
        temperature=0
    )
    rdict = json.loads(response["choices"][0]["message"]["content"])
    return rdict

@app.route("/upload", methods=["POST"])
def upload_nft():
    # Get the uploaded file
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    # Get the selected coin
    selected_coin = request.form.get("coin")
    if not selected_coin:
        return jsonify({"error": "No coin selected"}), 400

    # Save the file (optional)
    filename = os.path.join("uploads", file.filename)
    file.save(filename)

    # Process the file and coin (e.g., call another Python function)
    result = basic(filename, selected_coin)
    print("Success!")

    return result

if __name__ == "__main__":
    # Create an "uploads" directory if it doesn't exist
    os.makedirs("uploads", exist_ok=True)
    app.run(port=5000, debug=True)

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")