import os
from dotenv import load_dotenv
load_dotenv()

import json

from scraper import scrape_opensea
from prompt import gpt_prompt
from find_conversion import conversion

from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

from openai import OpenAI
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=OPENAI_API_KEY)

def basic(data, coin_type):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": gpt_prompt},
            {"role": "user", "content": f"JSON: {data}\nDesired Coin: {coin_type}"}
        ],
        temperature=0
    )
    rdict = json.loads(response.choices[0].message.content)
    return rdict

@app.route("/upload", methods=["POST"])
def upload_nft():
    data = request.get_json()

    nft_link = data.get('nft_link')
    coin = data.get('coin')

    scraped = scrape_opensea(nft_link)
    conversion_rate = conversion(scraped['Current Price'], coin)

    # Process the file and coin, send to chatgpt
    result = basic(scraped, coin)
    print("Success!")

    return result

if __name__ == "__main__":
    # UNCOMMENT WHEN NOT TESTING
    app.run(port=5000, debug=True)
    # pass

#print(basic("https://opensea.io/assets/ethereum/0x7011ee079f579eb313012bddb92fd6f06fa43335/3288", "Worldcoin (WLD)"))