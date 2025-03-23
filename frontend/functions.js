
function previewNFT() {
    const inputField = document.getElementById("nftLink");
    const previewImage = document.getElementById("nftPreview");
    
    const url = inputField.value.trim();

    if (url.includes("opensea.io/assets/")) {
        const urlParts = url.split("/");
        const contractAddress = urlParts[4];
        const tokenId = urlParts[5];

        fetch(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`)
            .then(response => response.json())
            .then(data => {
                if (data.image_url) {
                    previewImage.src = data.image_url;
                    previewImage.style.display = "block";
                } else {
                    previewImage.style.display = "none";
                }
            })
            .catch(error => console.error("Error fetching NFT data:", error));
    } else {
        previewImage.style.display = "none";
    }
}

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

// OLD CODE


// function uploadNFT() {
//     const fileInput = document.getElementById("fileUpload");
//     const coinSelect = document.getElementById("coinType");
//     const selectedCoin = coinSelect.value;

//     if (fileInput.files.length > 0) {
//         const file = fileInput.files[0];
//         console.log("Image selected:", file);
//         console.log("Coin selected:", selectedCoin);

//         // Create a FormData object to send the file and coin
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("coin", selectedCoin);

//         // Send the data to the Flask backend
//         fetch("http://127.0.0.1:5000/upload", {
//             method: "POST",
//             body: formData,
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log("Success:", data);
//             // Redirect to the results page
//             window.location.replace("result.html");
//         })
//         .catch(error => {
//             console.error("Error:", error);
//         });
//     } else {
//         alert("Please select an image to upload.");
//     }
// }

function uploadNFT() {
    const fileInput = document.getElementById("fileUpload");
    const coinSelect = document.getElementById("coinType");
    const selectedCoin = coinSelect.value;

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        console.log("Image selected:", file);
        console.log("Coin selected:", selectedCoin);

        // Create a FormData object to send the file and coin
        const formData = new FormData();
        formData.append("file", file);
        formData.append("coin", selectedCoin);

        // Send the data to the Flask backend
        fetch("http://127.0.0.1:5000/upload", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            // Redirect to the results page
            window.location.replace("result.html");
        })
        .catch(error => {
            console.error("Error:", error);
        });
    } else {
        alert("Please select an image to upload.");
    }
}