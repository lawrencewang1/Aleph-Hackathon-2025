from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

def scrape_opensea(nft_url):
    options = Options()
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("start-maximized")
    options.add_argument("disable-infobars")
    options.add_argument("--disable-extensions")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    
    driver.get(nft_url)
    time.sleep(10)

    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # Extract NFT image
    image_tag = soup.find('img', class_='Image--image')
    image_url = image_tag['src'] if image_tag else 'Not found'
    
    # Extract current price
    price_tag = soup.find('div', class_='Price--amount')
    price = price_tag.text if price_tag else 'Not listed'
    
    # Extract author
    author_tag = soup.find('span', class_='text-md leading-md font-semibold sc-b6bd9c33-0 hjUKXf')
    author = author_tag.text if author_tag else 'Unknown'
    
    # Extract NFT type
    nft_type_tag = soup.find('div', class_='sc-48082a-0 gJsHpn')
    nft_type = nft_type_tag.text if nft_type_tag else 'Unknown'

    # Extract NFT item
    nft_item_tag = soup.find('h1', class_='sc-beff130f-0 kZpcNQ item--title')
    nft_item = nft_item_tag.text if nft_item_tag else 'Unknown'
    
    driver.quit()

    return {
        'Image URL': image_url,
        'Current Price': price,
        'Author': author,
        'Type': nft_type,
        'Item' : nft_item
    }

# Example usage:
# nft_url = "https://opensea.io/assets/ethereum/0x7011ee079f579eb313012bddb92fd6f06fa43335/3288"
# data = scrape_opensea(nft_url)
# print(data)