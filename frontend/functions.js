import fs from 'fs';
import utils from 'utils';

function uploadNFT() {
    const fileInput = document.getElementById("fileUpload");
    const coinSelect = document.getElementById("coinType");
    const selectedCoin = coinSelect.value;

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        console.log("Image selected:", file);
        console.log("Coin selected:", selectedCoin);
        
        // send the file and selected coin type to an API or process the data

        // Example: Sending data (This is just a placeholder, you'll need to implement actual functionality)
        // const formData = new FormData();
        // formData.append('file', file);
        // formData.append('coin', selectedCoin);
        // sendToAPI(formData);

        window.location.href = "result.html";
        
    } else {
        alert("Please select an image to upload.");
    }
}