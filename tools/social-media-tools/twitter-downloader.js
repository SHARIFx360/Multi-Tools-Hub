// Track tool usage
trackToolUsage('twitter-downloader');

// Get DOM elements
const downloaderForm = document.getElementById('downloaderForm');
const videoUrl = document.getElementById('videoUrl');
const contentType = document.getElementById('contentType');
const quality = document.getElementById('quality');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const videoPreview = document.getElementById('videoPreview');
const previewPlayer = document.getElementById('previewPlayer');
const videoInfo = document.getElementById('videoInfo');
const downloadOptions = document.getElementById('downloadOptions');
const downloadBtn = document.getElementById('downloadBtn');
const downloadAudioBtn = document.getElementById('downloadAudioBtn');
const downloadGifBtn = document.getElementById('downloadGifBtn');
const pasteButton = document.getElementById('pasteButton');
const submitButton = document.getElementById('submitButton');
const urlError = document.getElementById('urlError');

// Twitter URL patterns for different content types
const TWITTER_PATTERNS = {
    tweet: /https:\/\/(www\.)?twitter\.com\/\w+\/status\/\d+/,
    thread: /https:\/\/(www\.)?twitter\.com\/\w+\/status\/\d+\?s=\d+/,
    space: /https:\/\/(www\.)?twitter\.com\/i\/spaces\/\w+/
};

// Handle form submission
downloaderForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Reset UI
    resetUI();
    
    // Validate URL
    if (!isValidTwitterUrl(videoUrl.value, contentType.value)) {
        showError('Please enter a valid Twitter URL for the selected content type');
        return;
    }
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
    loadingSpinner.classList.remove('d-none');
    
    try {
        // In a real implementation, this would make an API call to a backend service
        // For demo purposes, we'll simulate the API call
        const videoData = await simulateVideoProcessing();
        
        // Show video preview
        showVideoPreview(videoData.previewUrl);
        
        // Show video information
        showVideoInfo(videoData);
        
        // Enable download options
        enableDownload(videoData);
        
        // Show success message
        showSuccess('Video processed successfully!');
        
    } catch (error) {
        showError('Failed to process video. Please try again.');
        console.error('Error:', error);
    } finally {
        // Reset submit button and hide loading spinner
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-download me-2"></i>Download Video';
        loadingSpinner.classList.add('d-none');
    }
});

// Handle paste button click
pasteButton.addEventListener('click', async function() {
    try {
        const text = await navigator.clipboard.readText();
        videoUrl.value = text;
        videoUrl.dispatchEvent(new Event('input'));
    } catch (error) {
        showError('Failed to read from clipboard. Please paste manually.');
        console.error('Clipboard error:', error);
    }
});

// Validate Twitter URL based on content type
function isValidTwitterUrl(url, type) {
    if (!url) {
        urlError.textContent = 'Please enter a URL';
        videoUrl.classList.add('is-invalid');
        return false;
    }
    
    if (!TWITTER_PATTERNS[type].test(url)) {
        urlError.textContent = `Please enter a valid Twitter ${type} URL`;
        videoUrl.classList.add('is-invalid');
        return false;
    }
    
    videoUrl.classList.remove('is-invalid');
    urlError.textContent = '';
    return true;
}

// Reset UI elements
function resetUI() {
    videoPreview.classList.add('d-none');
    videoInfo.classList.add('d-none');
    downloadOptions.classList.add('d-none');
    errorMessage.classList.add('d-none');
    successMessage.classList.add('d-none');
    errorMessage.textContent = '';
    successMessage.textContent = '';
    previewPlayer.src = '';
    videoUrl.classList.remove('is-invalid');
    urlError.textContent = '';
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Show success message
function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.classList.remove('d-none');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Show video preview
function showVideoPreview(previewUrl) {
    previewPlayer.src = previewUrl;
    videoPreview.classList.remove('d-none');
    videoPreview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Show video information
function showVideoInfo(info) {
    document.getElementById('author').textContent = info.author;
    document.getElementById('duration').textContent = info.duration;
    document.getElementById('videoQuality').textContent = info.quality;
    document.getElementById('fileSize').textContent = info.size;
    document.getElementById('format').textContent = info.format;
    document.getElementById('retweets').textContent = info.retweets;
    
    videoInfo.classList.remove('d-none');
    videoInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Enable download buttons
function enableDownload(videoData) {
    // Video download handler
    downloadBtn.onclick = function() {
        // In a real implementation, this would trigger the actual download
        // For demo purposes, we'll show a success message
        showSuccess('Video download started! In a real implementation, this would download the video.');
    };
    
    // Audio download handler
    downloadAudioBtn.onclick = function() {
        // In a real implementation, this would trigger the audio-only download
        // For demo purposes, we'll show a success message
        showSuccess('Audio download started! In a real implementation, this would download the audio.');
    };
    
    // GIF download handler
    downloadGifBtn.onclick = function() {
        // In a real implementation, this would trigger the GIF download
        // For demo purposes, we'll show a success message
        showSuccess('GIF download started! In a real implementation, this would download the GIF.');
    };
    
    downloadOptions.classList.remove('d-none');
    downloadOptions.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Simulate video processing (for demo purposes)
function simulateVideoProcessing() {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate random success/failure
            if (Math.random() > 0.1) { // 90% success rate
                resolve({
                    previewUrl: 'https://example.com/sample-video.mp4',
                    author: '@username',
                    duration: '0:30',
                    quality: quality.value === 'hd' ? '1080p' : '720p',
                    size: '12.5 MB',
                    format: 'MP4',
                    retweets: '1.2K'
                });
            } else {
                reject(new Error('Simulated processing error'));
            }
        }, 2000);
    });
}

// URL input validation
videoUrl.addEventListener('input', function() {
    if (this.value && !isValidTwitterUrl(this.value, contentType.value)) {
        this.setCustomValidity('Please enter a valid Twitter URL for the selected content type');
    } else {
        this.setCustomValidity('');
    }
});

// Content type change handler
contentType.addEventListener('change', function() {
    if (videoUrl.value) {
        videoUrl.dispatchEvent(new Event('input'));
    }
});

// Handle video preview errors
previewPlayer.addEventListener('error', function() {
    showError('Failed to load video preview. Please try again.');
});

// Handle form validation
downloaderForm.addEventListener('invalid', function(e) {
    e.preventDefault();
}, true); 