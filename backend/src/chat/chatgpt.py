import os
from dotenv import load_dotenv
import openai
import json

from prompt import basic_prompt, premium_prompt

load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

def basic(user_prompt : str):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": basic_prompt},
                {"role": "user", "content": user_prompt}],
        temperature=0
    )
    rdict = json.loads(response["choices"][0]["message"]["content"])
    return rdict

def premium(user_prompt : str):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": premium_prompt},
                {"role": "user", "content": user_prompt}],
        temperature=0
    )
    rdict = json.loads(response["choices"][0]["message"]["content"])
    return rdict