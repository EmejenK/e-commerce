// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
});

function initializeGallery() {
    const collection = document.getElementById('.Collection');
    const images = collection.getElementsByTagName('img');
    
    // Make images resizable
    makeImagesResizable(images);
    
    // Ensure images are in a row (handled by CSS flexbox)
    console.log('Gallery initialized with', images.length, 'images');
}

function makeImagesResizable(images) {
    Array.from(images).forEach((img, index) => {
        let isResizing = false;
        let startX, startY, startWidth, startHeight;
        
        // Add resize handle (visual indicator)
        const resizeHandle = document.createElement('div');
        resizeHandle.style.cssText = `
            position: absolute;
            bottom: 2px;
            right: 2px;
            width: 12px;
            height: 12px;
            background: #007bff;
            border-radius: 2px;
            cursor: nwse-resize;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        img.style.position = 'relative';
        img.appendChild(resizeHandle);
        
        // Show resize handle on hover
        img.addEventListener('mouseenter', () => {
            resizeHandle.style.opacity = '1';
        });
        
        img.addEventListener('mouseleave', () => {
            if (!isResizing) {
                resizeHandle.style.opacity = '0';
            }
        });
        
        // Start resizing
        resizeHandle.addEventListener('mousedown', startResize);
        img.addEventListener('mousedown', startResizeFromImage);
        
        function startResizeFromImage(e) {
            if (e.offsetX > img.offsetWidth - 20 && e.offsetY > img.offsetHeight - 20) {
                startResize(e);
            }
        }
        
        function startResize(e) {
            e.preventDefault();
            e.stopPropagation();
            
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(document.defaultView.getComputedStyle(img).width, 10);
            startHeight = parseInt(document.defaultView.getComputedStyle(img).height, 10);
            
            img.classList.add('resizing');
            resizeHandle.style.opacity = '1';
            
            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
        }
        
        function resize(e) {
            if (!isResizing) return;
            
            const width = startWidth + (e.clientX - startX);
            const height = startHeight + (e.clientY - startY);
            
            // Apply minimum and maximum size constraints
            const newWidth = Math.max(50, Math.min(500, width));
            const newHeight = Math.max(50, Math.min(500, height));
            
            img.style.width = newWidth + 'px';
            img.style.height = 'auto'; // Maintain aspect ratio
        }
        
        function stopResize() {
            isResizing = false;
            img.classList.remove('resizing');
            resizeHandle.style.opacity = '0';
            
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
        }
        
        // Touch support for mobile devices
        resizeHandle.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startResize(touch);
        });
        
        img.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const rect = img.getBoundingClientRect();
            
            if (touch.clientX > rect.right - 30 && touch.clientY > rect.bottom - 30) {
                startResize(touch);
            }
        });
    });
}

// Function to move images to the right
function moveRight() {
    const collection = document.getElementById('Collection');
    const images = collection.getElementsByTagName('img');
    
    if (images.length > 0) {
        // Move first image to the end
        const firstImage = images[0];
        collection.appendChild(firstImage);
        
        // Smooth scroll to show the change
        collection.scrollLeft += firstImage.offsetWidth + 15;
    }
}

// Function to reset gallery to original state
function resetGallery() {
    const collection = document.getElementById('Collection');
    const images = Array.from(collection.getElementsByTagName('img'));
    
    // Reset all image sizes
    images.forEach(img => {
        img.style.width = '';
        img.style.height = '';
    });
    
    // Reset scroll position
    collection.scrollLeft = 0;
    
    console.log('Gallery reset to original state');
}

// Additional feature: Auto-scroll (optional)
function startAutoScroll() {
    setInterval(moveRight, 2000); // Move right every 2 seconds
}

// Uncomment the line below if you want auto-scrolling
// startAutoScroll();