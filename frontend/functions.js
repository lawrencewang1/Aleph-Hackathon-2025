function uploadNFT() {
    const nftLink = document.getElementById("nftLink").value.trim();
    const coinSelect = document.getElementById("coinType");
    const selectedCoin = coinSelect.value;

    if (nftLink === "" || !nftLink.includes("opensea.io/assets/")) {
        alert("Please enter a valid OpenSea NFT link.");
        return;
    }

    console.log("NFT Link:", nftLink);
    console.log("Coin selected:", selectedCoin);

    fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nft_link: nftLink,
            coin: selectedCoin
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        window.location.replace("result.html");
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
