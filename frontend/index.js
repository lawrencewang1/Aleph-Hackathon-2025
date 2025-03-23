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