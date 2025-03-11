// Track tool usage
trackToolUsage('image-to-jpg');

// DOM Elements
const converterForm = document.getElementById('converterForm');
const imageInput = document.getElementById('imageInput');
const qualitySlider = document.getElementById('quality');
const fileNameInput = document.getElementById('fileName');
const previewSection = document.getElementById('previewSection');
const originalPreview = document.getElementById('originalPreview');
const convertedPreview = document.getElementById('convertedPreview');
const downloadSection = document.getElementById('downloadSection');
const downloadBtn = document.getElementById('downloadBtn');
const convertAnotherBtn = document.getElementById('convertAnotherBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');

// Variables to store image data
let originalImage = null;
let convertedImage = null;

// Handle form submission
converterForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Reset UI
    resetUI();
    
    // Validate input
    if (!imageInput.files || !imageInput.files[0]) {
        showError('Please select an image file.');
        return;
    }

    // Show loading spinner
    loadingSpinner.classList.remove('d-none');
    
    try {
        // Get the selected file
        const file = imageInput.files[0];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            throw new Error('Please select a valid image file.');
        }

        // Read the image file
        originalImage = await readImageFile(file);
        
        // Display original image preview
        originalPreview.src = originalImage.src;
        previewSection.classList.remove('d-none');

        // Convert to JPG
        const quality = qualitySlider.value / 100;
        convertedImage = await convertToJPG(originalImage, quality);

        // Display converted image preview
        convertedPreview.src = convertedImage.src;

        // Show download section
        downloadSection.classList.remove('d-none');

        // Set default filename if not provided
        if (!fileNameInput.value) {
            fileNameInput.value = file.name.replace(/\.[^/.]+$/, '');
        }

        // Hide loading spinner
        loadingSpinner.classList.add('d-none');

        // Show success message
        showSuccess('Image converted successfully!');

    } catch (error) {
        console.error('Conversion error:', error);
        showError(error.message || 'An error occurred while converting the image.');
        loadingSpinner.classList.add('d-none');
    }
});

// Handle download button click
downloadBtn.addEventListener('click', function() {
    if (!convertedImage) {
        showError('No converted image available for download.');
        return;
    }

    // Create download link
    const link = document.createElement('a');
    link.href = convertedImage.src;
    link.download = `${fileNameInput.value || 'converted'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Handle convert another button click
convertAnotherBtn.addEventListener('click', function() {
    resetUI();
});

// Helper function to read image file
function readImageFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                resolve(img);
            };
            img.onerror = function() {
                reject(new Error('Failed to load image.'));
            };
            img.src = e.target.result;
        };
        reader.onerror = function() {
            reject(new Error('Failed to read file.'));
        };
        reader.readAsDataURL(file);
    });
}

// Helper function to convert image to JPG
function convertToJPG(img, quality) {
    return new Promise((resolve, reject) => {
        try {
            // Create canvas
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw image on canvas
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Convert to JPG
            const jpgDataUrl = canvas.toDataURL('image/jpeg', quality);
            
            // Create new image from JPG data
            const jpgImage = new Image();
            jpgImage.onload = function() {
                resolve(jpgImage);
            };
            jpgImage.onerror = function() {
                reject(new Error('Failed to convert image to JPG.'));
            };
            jpgImage.src = jpgDataUrl;
        } catch (error) {
            reject(error);
        }
    });
}

// Helper function to reset UI
function resetUI() {
    // Reset form
    converterForm.reset();
    
    // Clear previews
    originalPreview.src = '';
    convertedPreview.src = '';
    
    // Hide sections
    previewSection.classList.add('d-none');
    downloadSection.classList.add('d-none');
    
    // Clear error message
    errorMessage.classList.add('d-none');
    errorMessage.textContent = '';
    
    // Reset variables
    originalImage = null;
    convertedImage = null;
}

// Helper function to show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
}

// Add input validation
imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            showError('Please select a valid image file.');
            this.value = '';
        } else {
            // Set default filename
            fileNameInput.value = file.name.replace(/\.[^/.]+$/, '');
        }
    }
}); 