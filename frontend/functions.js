import fs from 'fs';
import utils from 'utils';


function uploadNFT() {
    event.preventDefault(); // prevent form from submitting

    const fileInput = document.getElementById("fileUpload");
    const descriptionInput = document.getElementById("nftDescription");

    if (fileInput.files.length > 0 && descriptionInput.value.trim() !== "") {
        const description = descriptionInput.value;
        
        console.log("File selected:", file);

        // redirect to result page after selecting an image
        window.location.href = "result.html";
    } else {
        alert("Please select an NFT image before uploading.");
    }
}
