import os
from dotenv import load_dotenv
load_dotenv()

import json

from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

from openai import OpenAI
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=OPENAI_API_KEY)

from prompt import gpt_prompt

def basic(image_data, coin_type):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[{"role": "system", "content": gpt_prompt},
                {"role": "user", "content": { "type": "text", "text": coin_type}}],
        temperature=0
    )
    rdict = json.loads(response.choices[0].message.content)
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

    # Process the file and coin, send to chatgpt
    result = basic()
    print("Success!")
    print(result)

    return result

if __name__ == "__main__":
    # UNCOMMENT WHEN NOT TESTING
    app.run(port=5000, debug=True)
