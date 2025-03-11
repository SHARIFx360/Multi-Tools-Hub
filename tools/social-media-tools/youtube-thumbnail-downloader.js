// Track tool usage
trackToolUsage('youtube-thumbnail-downloader');

// Get DOM elements
const downloaderForm = document.getElementById('downloaderForm');
const videoUrl = document.getElementById('videoUrl');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const videoInfo = document.getElementById('videoInfo');
const thumbnailsPreview = document.getElementById('thumbnailsPreview');
const thumbnailsGrid = document.getElementById('thumbnailsGrid');
const downloadOptions = document.getElementById('downloadOptions');
const downloadAllBtn = document.getElementById('downloadAllBtn');
const downloadZipBtn = document.getElementById('downloadZipBtn');
const pasteButton = document.getElementById('pasteButton');
const submitButton = document.getElementById('submitButton');
const urlError = document.getElementById('urlError');

// YouTube URL pattern
const YOUTUBE_PATTERN = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

// Thumbnail resolutions and their dimensions
const THUMBNAIL_RESOLUTIONS = {
    maxres: { width: 1920, height: 1080, label: 'Max Resolution' },
    hq: { width: 1280, height: 720, label: 'High Quality' },
    mq: { width: 640, height: 480, label: 'Medium Quality' },
    default: { width: 480, height: 360, label: 'Default' }
};

// Handle form submission
downloaderForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Reset UI
    resetUI();
    
    // Validate URL
    if (!isValidYouTubeUrl(videoUrl.value)) {
        showError('Please enter a valid YouTube URL');
        return;
    }
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Fetching...';
    loadingSpinner.classList.remove('d-none');
    
    try {
        // In a real implementation, this would make an API call to a backend service
        // For demo purposes, we'll simulate the API call
        const videoData = await simulateThumbnailFetch();
        
        // Show video information
        showVideoInfo(videoData);
        
        // Show thumbnails preview
        showThumbnailsPreview(videoData.thumbnails);
        
        // Show download options
        downloadOptions.classList.remove('d-none');
        
        // Show success message
        showSuccess('Thumbnails fetched successfully!');
        
    } catch (error) {
        showError('Failed to fetch thumbnails. Please try again.');
        console.error('Error:', error);
    } finally {
        // Reset submit button and hide loading spinner
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-search me-2"></i>Get Thumbnails';
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

// Validate YouTube URL
function isValidYouTubeUrl(url) {
    if (!url) {
        urlError.textContent = 'Please enter a URL';
        videoUrl.classList.add('is-invalid');
        return false;
    }
    
    if (!YOUTUBE_PATTERN.test(url)) {
        urlError.textContent = 'Please enter a valid YouTube URL';
        videoUrl.classList.add('is-invalid');
        return false;
    }
    
    videoUrl.classList.remove('is-invalid');
    urlError.textContent = '';
    return true;
}

// Reset UI elements
function resetUI() {
    videoInfo.classList.add('d-none');
    thumbnailsPreview.classList.add('d-none');
    downloadOptions.classList.add('d-none');
    errorMessage.classList.add('d-none');
    successMessage.classList.add('d-none');
    errorMessage.textContent = '';
    successMessage.textContent = '';
    thumbnailsGrid.innerHTML = '';
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

// Show video information
function showVideoInfo(info) {
    document.getElementById('videoTitle').textContent = info.title;
    document.getElementById('channelName').textContent = info.channel;
    document.getElementById('viewCount').textContent = info.views;
    document.getElementById('publishDate').textContent = info.published;
    document.getElementById('duration').textContent = info.duration;
    document.getElementById('category').textContent = info.category;
    
    videoInfo.classList.remove('d-none');
    videoInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Show thumbnails preview
function showThumbnailsPreview(thumbnails) {
    // Clear previous content
    thumbnailsGrid.innerHTML = '';
    
    // Add thumbnails to the grid
    Object.entries(thumbnails).forEach(([resolution, data]) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-3';
        
        const card = document.createElement('div');
        card.className = 'card h-100';
        
        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = data.url;
        img.alt = `${data.label} thumbnail`;
        img.loading = 'lazy';
        
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        
        const title = document.createElement('h6');
        title.className = 'card-title';
        title.textContent = data.label;
        
        const dimensions = document.createElement('p');
        dimensions.className = 'card-text small text-muted';
        dimensions.textContent = `${data.width}x${data.height}`;
        
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'btn btn-primary btn-sm w-100';
        downloadBtn.innerHTML = '<i class="fas fa-download me-2"></i>Download';
        downloadBtn.onclick = () => downloadThumbnail(data.url, resolution);
        
        cardBody.appendChild(title);
        cardBody.appendChild(dimensions);
        cardBody.appendChild(downloadBtn);
        
        card.appendChild(img);
        card.appendChild(cardBody);
        
        col.appendChild(card);
        thumbnailsGrid.appendChild(col);
    });
    
    thumbnailsPreview.classList.remove('d-none');
    thumbnailsPreview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Download single thumbnail
function downloadThumbnail(url, resolution) {
    const link = document.createElement('a');
    link.href = url;
    link.download = `thumbnail-${resolution}.jpg`;
    link.click();
    showSuccess(`Downloading ${resolution} thumbnail...`);
}

// Handle download all button click
downloadAllBtn.addEventListener('click', function() {
    const thumbnails = Array.from(thumbnailsGrid.querySelectorAll('img'));
    thumbnails.forEach((img, index) => {
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = img.src;
            link.download = `thumbnail-${index + 1}.jpg`;
            link.click();
        }, index * 500); // Stagger downloads to prevent browser blocking
    });
    showSuccess('Downloading all thumbnails...');
});

// Handle download ZIP button click
downloadZipBtn.addEventListener('click', async function() {
    try {
        // In a real implementation, this would create a ZIP file on the server
        // and provide a download link. For demo purposes, we'll show a message.
        showSuccess('ZIP download feature requires server-side implementation.');
    } catch (error) {
        showError('Failed to create ZIP file. Please try downloading individual thumbnails.');
        console.error('ZIP creation error:', error);
    }
});

// Simulate thumbnail fetch (for demo purposes)
function simulateThumbnailFetch() {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate random success/failure
            if (Math.random() > 0.1) { // 90% success rate
                resolve({
                    title: 'Sample YouTube Video',
                    channel: 'Sample Channel',
                    views: '1.2M',
                    published: '2024-02-20',
                    duration: '10:30',
                    category: 'Education',
                    thumbnails: {
                        maxres: {
                            url: 'https://example.com/thumbnails/maxres.jpg',
                            ...THUMBNAIL_RESOLUTIONS.maxres
                        },
                        hq: {
                            url: 'https://example.com/thumbnails/hq.jpg',
                            ...THUMBNAIL_RESOLUTIONS.hq
                        },
                        mq: {
                            url: 'https://example.com/thumbnails/mq.jpg',
                            ...THUMBNAIL_RESOLUTIONS.mq
                        },
                        default: {
                            url: 'https://example.com/thumbnails/default.jpg',
                            ...THUMBNAIL_RESOLUTIONS.default
                        }
                    }
                });
            } else {
                reject(new Error('Simulated fetch error'));
            }
        }, 2000);
    });
}

// URL input validation
videoUrl.addEventListener('input', function() {
    if (this.value && !isValidYouTubeUrl(this.value)) {
        this.setCustomValidity('Please enter a valid YouTube URL');
    } else {
        this.setCustomValidity('');
    }
});

// Handle form validation
downloaderForm.addEventListener('invalid', function(e) {
    e.preventDefault();
}, true); 