// Track tool usage
trackToolUsage('image-to-png');

// Form elements
const converterForm = document.getElementById('converterForm');
const imageInput = document.getElementById('imageInput');
const qualitySlider = document.getElementById('quality');
const previewSection = document.getElementById('previewSection');
const originalPreview = document.getElementById('originalPreview');
const convertedPreview = document.getElementById('convertedPreview');
const downloadSection = document.getElementById('downloadSection');
const downloadBtn = document.getElementById('downloadBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');

// Handle form submission
converterForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Reset UI
    resetUI();
    
    // Get selected file
    const file = imageInput.files[0];
    if (!file) {
        showError('Please select an image file');
        return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showError('Please select a valid image file');
        return;
    }
    
    // Show loading spinner
    loadingSpinner.classList.remove('d-none');
    
    try {
        // Read the image file
        const reader = new FileReader();
        reader.onload = function(e) {
            // Create image object
            const img = new Image();
            img.onload = function() {
                // Create canvas
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                
                // Draw image
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                // Show previews
                showPreviews(e.target.result, canvas.toDataURL('image/png'));
                
                // Enable download
                enableDownload(canvas);
                
                // Hide loading spinner
                loadingSpinner.classList.add('d-none');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
        
    } catch (error) {
        showError('Failed to process image. Please try again.');
        console.error('Error:', error);
        loadingSpinner.classList.add('d-none');
    }
});

// Reset UI elements
function resetUI() {
    previewSection.classList.add('d-none');
    downloadSection.classList.add('d-none');
    errorMessage.classList.add('d-none');
    errorMessage.textContent = '';
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
}

// Show previews
function showPreviews(originalUrl, convertedUrl) {
    originalPreview.src = originalUrl;
    convertedPreview.src = convertedUrl;
    previewSection.classList.remove('d-none');
}

// Enable download
function enableDownload(canvas) {
    downloadBtn.onclick = function() {
        // Create download link
        const link = document.createElement('a');
        link.download = 'converted-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
    
    downloadSection.classList.remove('d-none');
}

// Quality slider change handler
qualitySlider.addEventListener('input', function() {
    if (previewSection.classList.contains('d-none')) return;
    
    // Show loading spinner
    loadingSpinner.classList.remove('d-none');
    
    // Recreate canvas with new quality
    const canvas = document.createElement('canvas');
    canvas.width = originalPreview.naturalWidth;
    canvas.height = originalPreview.naturalHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(originalPreview, 0, 0);
    
    // Update converted preview
    convertedPreview.src = canvas.toDataURL('image/png', this.value / 100);
    
    // Update download button
    enableDownload(canvas);
    
    // Hide loading spinner
    loadingSpinner.classList.add('d-none');
});

// File input change handler
imageInput.addEventListener('change', function() {
    if (this.files.length > 0) {
        // Validate file size (max 10MB)
        if (this.files[0].size > 10 * 1024 * 1024) {
            showError('File size must be less than 10MB');
            this.value = '';
            return;
        }
        
        // Validate file type
        if (!this.files[0].type.startsWith('image/')) {
            showError('Please select a valid image file');
            this.value = '';
            return;
        }
    }
}); 