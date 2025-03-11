// Track tool usage
trackToolUsage('youtube-downloader');

// Form elements
const downloadForm = document.getElementById('downloadForm');
const videoUrlInput = document.getElementById('videoUrl');
const formatSelect = document.getElementById('format');
const resultSection = document.getElementById('resultSection');
const videoInfo = document.getElementById('videoInfo');
const downloadOptions = document.getElementById('downloadOptions');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');

// YouTube video URL regex pattern
const ytVideoPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

// Handle form submission
downloadForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Reset UI
    resetUI();
    
    // Get video URL and format
    const videoUrl = videoUrlInput.value.trim();
    const format = formatSelect.value;
    
    // Validate URL
    if (!ytVideoPattern.test(videoUrl)) {
        showError('Please enter a valid YouTube video URL');
        return;
    }
    
    // Show loading spinner
    loadingSpinner.classList.remove('d-none');
    
    try {
        // In a real implementation, you would:
        // 1. Send the URL and format to your backend service
        // 2. The backend would use YouTube's API or a third-party service
        // 3. Return the video information and download options
        
        // For demo purposes, we'll simulate an API call
        const videoData = await simulateApiCall(videoUrl, format);
        
        // Show video information
        showVideoInfo(videoData);
        
        // Show download options
        showDownloadOptions(videoData);
        
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
    videoInfo.classList.add('d-none');
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
async function simulateApiCall(videoUrl, format) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                title: 'Sample YouTube Video',
                description: 'This is a sample video description that would be fetched from YouTube.',
                thumbnail: 'https://via.placeholder.com/480x360',
                duration: '3:45',
                size: '128MB',
                formats: [
                    { quality: '1080p', size: '1920x1080', url: '#' },
                    { quality: '720p', size: '1280x720', url: '#' },
                    { quality: '480p', size: '854x480', url: '#' }
                ]
            });
        }, 2000);
    });
}

// Show video information
function showVideoInfo(videoData) {
    document.getElementById('thumbnail').src = videoData.thumbnail;
    document.getElementById('videoTitle').textContent = videoData.title;
    document.getElementById('videoDescription').textContent = videoData.description;
    document.getElementById('videoDuration').textContent = videoData.duration;
    document.getElementById('videoSize').textContent = videoData.size;
    
    videoInfo.classList.remove('d-none');
}

// Show download options
function showDownloadOptions(videoData) {
    downloadOptions.innerHTML = videoData.formats.map(format => `
        <a href="${format.url}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
                <h6 class="mb-1">${format.quality} Quality</h6>
                <small class="text-muted">${format.size}</small>
            </div>
            <i class="fas fa-download"></i>
        </a>
    `).join('');
    
    resultSection.classList.remove('d-none');
}

// Add URL validation on input
videoUrlInput.addEventListener('input', function() {
    if (ytVideoPattern.test(this.value.trim())) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
    } else {
        this.classList.remove('is-valid');
        this.classList.add('is-invalid');
    }
});

// Format change handler
formatSelect.addEventListener('change', function() {
    if (resultSection.classList.contains('d-none')) return;
    
    // Reset and show loading state
    resetUI();
    loadingSpinner.classList.remove('d-none');
    
    // Simulate format change processing
    setTimeout(() => {
        const videoUrl = videoUrlInput.value.trim();
        simulateApiCall(videoUrl, this.value)
            .then(videoData => {
                showVideoInfo(videoData);
                showDownloadOptions(videoData);
            })
            .catch(error => {
                showError('Failed to process video. Please try again later.');
                console.error('Error:', error);
            })
            .finally(() => {
                loadingSpinner.classList.add('d-none');
            });
    }, 1000);
}); 