// Track tool usage
trackToolUsage('facebook-video-downloader');

// Get DOM elements
const downloaderForm = document.getElementById('downloaderForm');
const videoUrl = document.getElementById('videoUrl');
const quality = document.getElementById('quality');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const videoInfo = document.getElementById('videoInfo');
const downloadOptions = document.getElementById('downloadOptions');
const downloadBtn = document.getElementById('downloadBtn');

// Facebook video URL patterns
const FB_VIDEO_PATTERNS = [
    /https:\/\/(www\.)?facebook\.com\/.*\/videos\/\d+/,
    /https:\/\/(www\.)?facebook\.com\/watch\/\?v=\d+/,
    /https:\/\/(www\.)?fb\.watch\/\w+/
];

// Handle form submission
downloaderForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Reset UI
    resetUI();
    
    // Validate URL
    if (!isValidFacebookUrl(videoUrl.value)) {
        showError('Please enter a valid Facebook video URL');
        return;
    }
    
    // Show loading spinner
    loadingSpinner.classList.remove('d-none');
    
    try {
        // In a real implementation, this would make an API call to a backend service
        // For demo purposes, we'll simulate the API call
        await simulateVideoProcessing();
        
        // Show video information
        showVideoInfo({
            duration: '2:30',
            quality: quality.value === 'hd' ? '1080p' : '720p',
            size: '15.2 MB',
            format: 'MP4'
        });
        
        // Enable download
        enableDownload();
        
    } catch (error) {
        showError('Failed to process video. Please try again.');
        console.error('Error:', error);
    } finally {
        loadingSpinner.classList.add('d-none');
    }
});

// Validate Facebook URL
function isValidFacebookUrl(url) {
    return FB_VIDEO_PATTERNS.some(pattern => pattern.test(url));
}

// Reset UI elements
function resetUI() {
    videoInfo.classList.add('d-none');
    downloadOptions.classList.add('d-none');
    errorMessage.classList.add('d-none');
    errorMessage.textContent = '';
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
}

// Show video information
function showVideoInfo(info) {
    document.getElementById('duration').textContent = info.duration;
    document.getElementById('videoQuality').textContent = info.quality;
    document.getElementById('fileSize').textContent = info.size;
    document.getElementById('format').textContent = info.format;
    
    videoInfo.classList.remove('d-none');
}

// Enable download button
function enableDownload() {
    downloadBtn.onclick = function() {
        // In a real implementation, this would trigger the actual download
        // For demo purposes, we'll show a success message
        alert('Download started! In a real implementation, this would download the video.');
    };
    
    downloadOptions.classList.remove('d-none');
}

// Simulate video processing (for demo purposes)
function simulateVideoProcessing() {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
}

// URL input validation
videoUrl.addEventListener('input', function() {
    if (this.value && !isValidFacebookUrl(this.value)) {
        this.setCustomValidity('Please enter a valid Facebook video URL');
    } else {
        this.setCustomValidity('');
    }
}); 