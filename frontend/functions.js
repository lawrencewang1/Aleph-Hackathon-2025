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
    .then(response => {
        if (response.redirected) {
            // Redirect to the new page
            window.location.href = response.url;
        } else {
            console.error("No redirect received from the server.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}


 document.write('<select id="coinType" style="display:none;"></select>');
        
 const currencies = [
     {value: "Worldcoin-__WLD", text: "World (WLD)"},
     {value: "Stellar-XLM", text: "Stellar (XLM)"},
     {value: "Mantle-______MNT", text: "Mantle (MNT)"},
     {value: "Ethereum-ETH", text: "Ethereum (ETH)"},
     {value: "Bitcoin-BTC", text: "Bitcoin (BTC)"},
     {value: "USDC-USDC", text: "US Dollar (USDC)"}
 ];
 
 const selectElement = document.getElementById('coinType');
 currencies.forEach(currency => {
     const option = document.createElement('option');
     option.value = currency.value;
     option.textContent = currency.text;
     selectElement.appendChild(option);
 });
 
 function toggleDropdown() {
     const dropdownMenu = document.getElementById('dropdownMenu');
     const currencyTab = document.getElementById('currencyTab');
     
     dropdownMenu.classList.toggle('open');
     currencyTab.classList.toggle('open');
     
     if (dropdownMenu.classList.contains('open')) {
         document.addEventListener('click', closeDropdownOnClickOutside);
     } else {
         document.removeEventListener('click', closeDropdownOnClickOutside);
     }
 }
 
 function closeDropdownOnClickOutside(event) {
     const dropdownMenu = document.getElementById('dropdownMenu');
     const currencyTab = document.getElementById('currencyTab');
     console.log(event.target)

     if (!event.target.closest('.currency-selector')) {
         dropdownMenu.classList.remove('open');
         currencyTab.classList.remove('open');
         document.removeEventListener('click', closeDropdownOnClickOutside);
     }
 }
 
 document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('dropdownMenu');
    const tab = document.getElementById('currencyTab');
    
    if (!event.target.closest('.currency-selector') && dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
        tab.classList.remove('open');
    }
});

 function selectCurrency(element) {
     const value = element.getAttribute('data-value');
     const selectElement = document.getElementById('coinType');
     selectElement.value = value;
     
     document.getElementById('currentCurrency').textContent = element.textContent;
     
     const items = document.querySelectorAll('.dropdown-item');
     items.forEach(item => item.classList.remove('active'));
     element.classList.add('active');
     
     document.getElementById('dropdownMenu').classList.remove('open');
     document.getElementById('currencyTab').classList.remove('open');
 }


 