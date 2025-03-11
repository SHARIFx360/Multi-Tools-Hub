// Track tool usage
trackToolUsage('tiktok-downloader');

// DOM Elements
const downloadForm = document.getElementById('downloadForm');
const videoUrl = document.getElementById('videoUrl');
const quality = document.getElementById('quality');
const removeWatermark = document.getElementById('removeWatermark');
const pasteBtn = document.getElementById('pasteBtn');
const videoPreview = document.getElementById('videoPreview');
const previewPlayer = document.getElementById('previewPlayer');
const videoInfo = document.getElementById('videoInfo');
const author = document.getElementById('author');
const duration = document.getElementById('duration');
const likes = document.getElementById('likes');
const qualityInfo = document.getElementById('qualityInfo');
const size = document.getElementById('size');
const comments = document.getElementById('comments');
const downloadOptions = document.getElementById('downloadOptions');
const downloadBtn = document.getElementById('downloadBtn');
const downloadAudioBtn = document.getElementById('downloadAudioBtn');
const downloadGifBtn = document.getElementById('downloadGifBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');

// TikTok URL patterns
const tiktokPatterns = {
    video: /https?:\/\/(www\.)?tiktok\.com\/@[^\/]+\/video\/\d+/i,
    share: /https?:\/\/(vm|vt)\.tiktok\.com\/[A-Za-z0-9]+/i
};

// Handle form submission
downloadForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Reset UI
    resetUI();
    
    // Validate URL
    if (!isValidTikTokUrl(videoUrl.value)) {
        showError('Please enter a valid TikTok video URL.');
        return;
    }

    // Show loading spinner
    loadingSpinner.classList.remove('d-none');
    
    try {
        // Process video
        const videoData = await processVideo(videoUrl.value, quality.value, removeWatermark.checked);
        
        // Display video preview
        showVideoPreview(videoData.previewUrl);
        
        // Display video information
        showVideoInfo(videoData);
        
        // Enable download options
        enableDownload(videoData);
        
        // Hide loading spinner
        loadingSpinner.classList.add('d-none');
        
        // Show success message
        showSuccess('Video processed successfully!');

    } catch (error) {
        console.error('Processing error:', error);
        showError(error.message || 'An error occurred while processing the video.');
        loadingSpinner.classList.add('d-none');
    }
});

// Handle paste button click
pasteBtn.addEventListener('click', async function() {
    try {
        const text = await navigator.clipboard.readText();
        videoUrl.value = text;
        videoUrl.dispatchEvent(new Event('input'));
    } catch (error) {
        showError('Failed to read from clipboard.');
    }
});

// Handle download button clicks
downloadBtn.addEventListener('click', function() {
    // Implement video download
    showError('Video download functionality requires server-side implementation.');
});

downloadAudioBtn.addEventListener('click', function() {
    // Implement audio download
    showError('Audio download functionality requires server-side implementation.');
});

downloadGifBtn.addEventListener('click', function() {
    // Implement GIF download
    showError('GIF download functionality requires server-side implementation.');
});

// Helper function to validate TikTok URL
function isValidTikTokUrl(url) {
    return Object.values(tiktokPatterns).some(pattern => pattern.test(url));
}

// Helper function to reset UI
function resetUI() {
    // Reset form
    downloadForm.reset();
    
    // Hide sections
    videoPreview.classList.add('d-none');
    videoInfo.classList.add('d-none');
    downloadOptions.classList.add('d-none');
    
    // Clear video player
    previewPlayer.src = '';
    
    // Clear error message
    errorMessage.classList.add('d-none');
    errorMessage.textContent = '';
}

// Helper function to show video preview
function showVideoPreview(url) {
    previewPlayer.src = url;
    videoPreview.classList.remove('d-none');
}

// Helper function to show video information
function showVideoInfo(data) {
    author.textContent = data.author;
    duration.textContent = data.duration;
    likes.textContent = data.likes;
    qualityInfo.textContent = data.quality;
    size.textContent = data.size;
    comments.textContent = data.comments;
    videoInfo.classList.remove('d-none');
}

// Helper function to enable download options
function enableDownload(data) {
    downloadOptions.classList.remove('d-none');
}

// Helper function to show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
}

// Helper function to show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success alert-dismissible fade show';
    successDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const container = document.querySelector('.card-body');
    container.insertBefore(successDiv, container.firstChild);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Simulate video processing
async function processVideo(url, quality, removeWatermark) {
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
            resolve({
                previewUrl: 'https://example.com/video-preview.mp4',
                author: '@username',
                duration: '0:30',
                likes: '1.2M',
                quality: quality === 'auto' ? 'HD (1080p)' : quality === 'hd' ? 'HD (720p)' : 'SD (480p)',
                size: '8.5 MB',
                comments: '10.5K',
                downloadUrl: 'https://example.com/video-download.mp4',
                audioUrl: 'https://example.com/audio.mp3',
                gifUrl: 'https://example.com/video.gif'
            });
        }, 2000);
    });
}

// Add input validation
videoUrl.addEventListener('input', function() {
    if (this.value && !isValidTikTokUrl(this.value)) {
        this.setCustomValidity('Please enter a valid TikTok video URL.');
    } else {
        this.setCustomValidity('');
    }
}); 