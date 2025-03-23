// function uploadNFT() {
//     const fileInput = document.getElementById("fileUpload");
//     const coinSelect = document.getElementById("coinType");
//     const selectedCoin = coinSelect.value;

//     if (fileInput.files.length > 0) {
//         const file = fileInput.files[0];
//         console.log("Image selected:", file);
//         console.log("Coin selected:", selectedCoin);
    
//         // Redirect to the results page
//         window.location.replace("result.html");
        
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
            // window.location.replace("result.html");
        })
        .catch(error => {
            console.error("Error:", error);
        });
    } else {
        alert("Please select an image to upload.");
    }
}



function previewFile() {
    const preview = document.querySelector("img");
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            // convert image file to base64 string
            preview.src = reader.result;
        },
        false
    );
    
    if (file) {
        reader.readAsDataURL(file);
    }
}