import os
from dotenv import load_dotenv
load_dotenv()

import json

from scraper import scrape_opensea
from prompt import gpt_prompt
from find_conversion import conversion

from flask import Flask, request, redirect, url_for, render_template
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

from openai import OpenAI
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=OPENAI_API_KEY)

def basic(data, coin_type, conversion):
    link = data['Image URL']
    price = data['Current Price']
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": gpt_prompt},
            {"role": "user", "content": f"Link: {link}\nPrice: {price}\nConversion Rate: {conversion}"}
        ],
        temperature=0
    )
    rdict = json.loads(response.choices[0].message.content)
    print(rdict)
    data['Converted'] = rdict['New Price']
    data['Description'] = rdict['Description']
    print()
    print(data)
    return data

@app.route("/upload", methods=["POST"])
def upload_nft():
    data = request.get_json()

    nft_link = data.get('nft_link')
    coin = data.get('coin')

    scraped = scrape_opensea(nft_link)
    print(scraped)
    conversion_rate = conversion(scraped['Current Price'], coin)

    print(scraped)
    print(coin)
    print(conversion_rate)

    # Process the file and coin, send to chatgpt
    result = basic(scraped, coin, conversion_rate)
    print("Success!")

    #return result
    return redirect(url_for('display_nft', 
                           converted=result['Converted'], 
                           units=coin,
                           description=result['Description'], 
                           image_url=result['Image URL'],
                           author=result['Author'],
                           itemname=result['Item']))

@app.route("/display_nft")
def display_nft():
    converted = request.args.get('converted')
    units = units.args.get('units')
    description = request.args.get('description')
    image_url = request.args.get('image_url')
    author = request.args.get('author')
    itemname = request.args.get('itemname')

    return render_template('result.html', 
                          converted=converted, 
                          units=units,
                          description=description, 
                          image_url=image_url, 
                          author=author,
                          itemname=itemname)


if __name__ == "__main__":
    # UNCOMMENT WHEN NOT TESTING
    app.run(port=5000, debug=True)
    #pass