// Track tool usage
trackToolUsage('instagram-downloader');

// Get DOM elements
const downloaderForm = document.getElementById('downloaderForm');
const videoUrl = document.getElementById('videoUrl');
const contentType = document.getElementById('contentType');
const quality = document.getElementById('quality');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const videoPreview = document.getElementById('videoPreview');
const previewPlayer = document.getElementById('previewPlayer');
const videoInfo = document.getElementById('videoInfo');
const downloadOptions = document.getElementById('downloadOptions');
const downloadBtn = document.getElementById('downloadBtn');
const downloadAudioBtn = document.getElementById('downloadAudioBtn');
const downloadThumbnailBtn = document.getElementById('downloadThumbnailBtn');

// Instagram URL patterns for different content types
const INSTAGRAM_PATTERNS = {
    post: /https:\/\/(www\.)?instagram\.com\/p\/[\w-]+\/?/,
    reel: /https:\/\/(www\.)?instagram\.com\/reel\/[\w-]+\/?/,
    story: /https:\/\/(www\.)?instagram\.com\/stories\/[\w-]+\/[\d-]+\/?/,
    igtv: /https:\/\/(www\.)?instagram\.com\/tv\/[\w-]+\/?/
};

// Handle form submission
downloaderForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Reset UI
    resetUI();
    
    // Validate URL
    if (!isValidInstagramUrl(videoUrl.value, contentType.value)) {
        showError('Please enter a valid Instagram URL for the selected content type');
        return;
    }
    
    // Show loading spinner
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
        
    } catch (error) {
        showError('Failed to process video. Please try again.');
        console.error('Error:', error);
    } finally {
        loadingSpinner.classList.add('d-none');
    }
});

// Validate Instagram URL based on content type
function isValidInstagramUrl(url, type) {
    return INSTAGRAM_PATTERNS[type].test(url);
}

// Reset UI elements
function resetUI() {
    videoPreview.classList.add('d-none');
    videoInfo.classList.add('d-none');
    downloadOptions.classList.add('d-none');
    errorMessage.classList.add('d-none');
    errorMessage.textContent = '';
    previewPlayer.src = '';
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
}

// Show video preview
function showVideoPreview(previewUrl) {
    previewPlayer.src = previewUrl;
    videoPreview.classList.remove('d-none');
}

// Show video information
function showVideoInfo(info) {
    document.getElementById('author').textContent = info.author;
    document.getElementById('duration').textContent = info.duration;
    document.getElementById('videoQuality').textContent = info.quality;
    document.getElementById('fileSize').textContent = info.size;
    document.getElementById('format').textContent = info.format;
    document.getElementById('likes').textContent = info.likes;
    
    videoInfo.classList.remove('d-none');
}

// Enable download buttons
function enableDownload(videoData) {
    // Video download handler
    downloadBtn.onclick = function() {
        // In a real implementation, this would trigger the actual download
        // For demo purposes, we'll show a success message
        alert('Download started! In a real implementation, this would download the video.');
    };
    
    // Audio download handler
    downloadAudioBtn.onclick = function() {
        // In a real implementation, this would trigger the audio-only download
        // For demo purposes, we'll show a success message
        alert('Audio download started! In a real implementation, this would download the audio.');
    };
    
    // Thumbnail download handler
    downloadThumbnailBtn.onclick = function() {
        // In a real implementation, this would trigger the thumbnail download
        // For demo purposes, we'll show a success message
        alert('Thumbnail download started! In a real implementation, this would download the thumbnail.');
    };
    
    downloadOptions.classList.remove('d-none');
}

// Simulate video processing (for demo purposes)
function simulateVideoProcessing() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                previewUrl: 'https://example.com/sample-video.mp4',
                author: '@username',
                duration: '0:30',
                quality: quality.value === 'hd' ? '1080p' : '720p',
                size: '15.2 MB',
                format: 'MP4',
                likes: '10.5K'
            });
        }, 2000);
    });
}

// URL input validation
videoUrl.addEventListener('input', function() {
    if (this.value && !isValidInstagramUrl(this.value, contentType.value)) {
        this.setCustomValidity('Please enter a valid Instagram URL for the selected content type');
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