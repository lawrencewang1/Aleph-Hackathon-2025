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
    
    if (response.redirected) {
        window.location.href = response.url;
    }
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


 let mouseX = 0;
        let mouseY = 0;
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        
        // Update mouse position
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            animateBlobs();
        });

        window.addEventListener('resize', function() {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        });
       
        function animateBlobs() {
            const blobs = document.querySelectorAll('.blob');
            
            blobs.forEach(blob => {
            
                const rect = blob.getBoundingClientRect();
                const blobCenterX = rect.left + rect.width / 2;
                const blobCenterY = rect.top + rect.height / 2;
                
        
                const distX = mouseX - blobCenterX;
                const distY = mouseY - blobCenterY;
                
            
                const speed = parseFloat(blob.getAttribute('data-speed')) || 0.05;
                const distance = parseFloat(blob.getAttribute('data-distance')) || 50;
                
               
                const moveX = distX * speed * (distance > 0 ? 1 : -1);
                const moveY = distY * speed * (distance > 0 ? 1 : -1);
                
            
                const distanceToMouse = Math.sqrt(distX * distX + distY * distY);
                const proximityScale = Math.max(0.9, Math.min(1.1, 1 + (300 - distanceToMouse) / 2000));
                
                blob.style.transform = `translate(${moveX}px, ${moveY}px) scale(${proximityScale})`;
            });
        }
        
        function createBlobs(count) {
            const container = document.querySelector('.blob-container');
            const colors = [
                'rgba(74, 111, 227, 0.6)',
                'rgba(138, 43, 226, 0.5)',
                'rgba(134, 228, 220, 0.5)',
                'rgba(233, 30, 99, 0.4)',
                'rgba(156, 39, 176, 0.4)',
                'rgba(76, 175, 80, 0.4)'
            ];
            
            for (let i = 0; i < count; i++) {
                const blob = document.createElement('div');
                blob.className = 'blob';
                
                const size = Math.random() * 150 + 150;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                
        
                const speed = Math.random() * 0.05 + 0.02;
                const distance = Math.random() > 0.5 ? Math.random() * 80 + 20 : -Math.random() * 80 - 20;
                
  
                blob.style.width = `${size}px`;
                blob.style.height = `${size}px`;
                blob.style.background = color;
                blob.style.left = `${left}%`;
                blob.style.top = `${top}%`;
 
                blob.setAttribute('data-speed', speed);
                blob.setAttribute('data-distance', distance);
                
                const animations = ['float1', 'float2', 'float3', 'float4'];
                const randomAnim = animations[Math.floor(Math.random() * animations.length)];
                blob.style.animation = `${randomAnim} ${20 + Math.random() * 10}s infinite ease-in-out`;
                
                container.appendChild(blob);
            }
        }
        
        window.addEventListener('load', function() {
            createBlobs(3);
            
            setTimeout(() => {
                const blobs = document.querySelectorAll('.blob');
                blobs.forEach(blob => {
                    const moveX = (Math.random() - 0.5) * 40;
                    const moveY = (Math.random() - 0.5) * 40;
                    blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
            }, 100);
        });