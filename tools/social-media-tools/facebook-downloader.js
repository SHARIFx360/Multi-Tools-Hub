// Track tool usage
trackToolUsage('facebook-downloader');

// Form elements
const downloadForm = document.getElementById('downloadForm');
const videoUrlInput = document.getElementById('videoUrl');
const resultSection = document.getElementById('resultSection');
const downloadOptions = document.getElementById('downloadOptions');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');

// Facebook video URL regex pattern
const fbVideoPattern = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9.]+\/videos\/[0-9]+/;

// Handle form submission
downloadForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Reset UI
    resetUI();
    
    // Get video URL
    const videoUrl = videoUrlInput.value.trim();
    
    // Validate URL
    if (!fbVideoPattern.test(videoUrl)) {
        showError('Please enter a valid Facebook video URL');
        return;
    }
    
    // Show loading spinner
    loadingSpinner.classList.remove('d-none');
    
    try {
        // In a real implementation, you would:
        // 1. Send the URL to your backend service
        // 2. The backend would use Facebook's API or a third-party service
        // 3. Return the available download options
        
        // For demo purposes, we'll simulate an API call
        await simulateApiCall();
        
        // Show download options
        showDownloadOptions();
        
    } catch (error) {
        showError('Failed to process video. Please try again later.');
        console.error('Error:', error);
    } finally {
        loadingSpinner.classList.add('d-none');
    }
});

// Reset UI elements
function resetUI() {
    resultSection.classList.add('d-none');
    downloadOptions.innerHTML = '';
    errorMessage.classList.add('d-none');
    errorMessage.textContent = '';
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
}

// Simulate API call (replace with actual API call)
async function simulateApiCall() {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
}

// Show download options (replace with actual API response)
function showDownloadOptions() {
    const options = [
        { quality: 'HD', size: '1920x1080', url: '#' },
        { quality: 'SD', size: '1280x720', url: '#' },
        { quality: 'Mobile', size: '720x1280', url: '#' }
    ];
    
    downloadOptions.innerHTML = options.map(option => `
        <a href="${option.url}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
                <h6 class="mb-1">${option.quality} Quality</h6>
                <small class="text-muted">${option.size}</small>
            </div>
            <i class="fas fa-download"></i>
        </a>
    `).join('');
    
    resultSection.classList.remove('d-none');
}

// Add URL validation on input
videoUrlInput.addEventListener('input', function() {
    if (fbVideoPattern.test(this.value.trim())) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
    } else {
        this.classList.remove('is-valid');
        this.classList.add('is-invalid');
    }
}); 