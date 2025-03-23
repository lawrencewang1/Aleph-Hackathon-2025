# prompt for gpt
gpt_prompt = """
Input:
You will be given a link to a nft: "LINK", a price of a crypto: "PRICE", and the conversion rate: "CONVERSION"
Output: must be a JSON file
Description: generate a short description for the nft using "LINK"
New Price: multiply the numeric value of "PRICE" and multiply it by "CONVERSION" -> must be a double

Example:
{"Description": "​Yumemono #2390 is a non-fungible token (NFT) from the Yumemono ☆ 夢物 collection, created by napmaxxing. The NFT's description indicates that its content will be revealed soon. It is currently owned by user E5DAC0.", "New Price" : 15.7}
"""