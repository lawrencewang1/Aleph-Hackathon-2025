import requests
from bs4 import BeautifulSoup
import time

def conversion(current, desired):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    current_type = current.split()[-1].lower()
    mapped = {'eth':"Ethereum-ETH", 'weth':"WETH-WETH"}

    #CURRENT
    url = f"https://www.livecoinwatch.com/price/{mapped[current_type]}"

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print("oop")
        return

    soup = BeautifulSoup(response.content, 'html.parser')

    # Extract conversion 1
    c1_tag = soup.find('span', class_='price')
    c1_value = c1_tag.text if c1_tag else 'Not found'

    time.sleep(2)

    #DESIRED
    url = f"https://www.livecoinwatch.com/price/{desired}"

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print("oop")
        return

    soup = BeautifulSoup(response.content, 'html.parser')

    # Extract conversion 2
    c2_tag = soup.find('span', class_='price')
    c2_value = c2_tag.text if c2_tag else 'Not found'

    c1 = float(c1_value[1:].replace(",", ""))
    c2 = float(c2_value[1:].replace(",", ""))

    return c1 / c2

# Example usage
# rate = conversion('0.0739 ETH', "Worldcoin-__WLD")
# print(f"Conversion rate: {rate}")