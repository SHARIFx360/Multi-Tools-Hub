// Track tool usage
trackToolUsage('youtube-tags-extractor');

// Get DOM elements
const extractorForm = document.getElementById('extractorForm');
const videoUrl = document.getElementById('videoUrl');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const videoInfo = document.getElementById('videoInfo');
const tagsAnalysis = document.getElementById('tagsAnalysis');
const tagsList = document.getElementById('tagsList');
const tagStatsBody = document.getElementById('tagStatsBody');
const exportOptions = document.getElementById('exportOptions');
const copyTagsBtn = document.getElementById('copyTagsBtn');
const downloadCsvBtn = document.getElementById('downloadCsvBtn');
const pasteButton = document.getElementById('pasteButton');
const submitButton = document.getElementById('submitButton');
const urlError = document.getElementById('urlError');

// YouTube URL pattern
const YOUTUBE_PATTERN = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

// Handle form submission
extractorForm.addEventListener('submit', async function(e) {
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
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Extracting...';
    loadingSpinner.classList.remove('d-none');
    
    try {
        // In a real implementation, this would make an API call to a backend service
        // For demo purposes, we'll simulate the API call
        const videoData = await simulateTagExtraction();
        
        // Show video information
        showVideoInfo(videoData);
        
        // Show tags analysis
        showTagsAnalysis(videoData.tags);
        
        // Show export options
        exportOptions.classList.remove('d-none');
        
        // Show success message
        showSuccess('Tags extracted successfully!');
        
    } catch (error) {
        showError('Failed to extract tags. Please try again.');
        console.error('Error:', error);
    } finally {
        // Reset submit button and hide loading spinner
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-search me-2"></i>Extract Tags';
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
    tagsAnalysis.classList.add('d-none');
    exportOptions.classList.add('d-none');
    errorMessage.classList.add('d-none');
    successMessage.classList.add('d-none');
    errorMessage.textContent = '';
    successMessage.textContent = '';
    tagsList.innerHTML = '';
    tagStatsBody.innerHTML = '';
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

// Show tags analysis
function showTagsAnalysis(tags) {
    // Clear previous content
    tagsList.innerHTML = '';
    tagStatsBody.innerHTML = '';
    
    // Add tags to the list
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'badge bg-primary me-2 mb-2';
        tagElement.textContent = tag.name;
        tagsList.appendChild(tagElement);
        
        // Add tag to statistics table
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tag.name}</td>
            <td>${tag.searchVolume}</td>
            <td>${tag.competition}</td>
        `;
        tagStatsBody.appendChild(row);
    });
    
    tagsAnalysis.classList.remove('d-none');
    tagsAnalysis.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Handle copy tags button click
copyTagsBtn.addEventListener('click', function() {
    const tags = Array.from(tagsList.children).map(tag => tag.textContent);
    const tagsText = tags.join(', ');
    
    navigator.clipboard.writeText(tagsText)
        .then(() => showSuccess('Tags copied to clipboard!'))
        .catch(error => {
            showError('Failed to copy tags to clipboard.');
            console.error('Clipboard error:', error);
        });
});

// Handle download CSV button click
downloadCsvBtn.addEventListener('click', function() {
    const tags = Array.from(tagStatsBody.children).map(row => {
        const cells = row.cells;
        return {
            tag: cells[0].textContent,
            searchVolume: cells[1].textContent,
            competition: cells[2].textContent
        };
    });
    
    // Create CSV content
    const csvContent = [
        ['Tag', 'Search Volume', 'Competition'],
        ...tags.map(tag => [tag.tag, tag.searchVolume, tag.competition])
    ].map(row => row.join(',')).join('\n');
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'youtube-tags.csv';
    link.click();
    URL.revokeObjectURL(link.href);
    
    showSuccess('Tags downloaded as CSV!');
});

// Simulate tag extraction (for demo purposes)
function simulateTagExtraction() {
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
                    tags: [
                        { name: 'youtube', searchVolume: '1.2B', competition: 'High' },
                        { name: 'tutorial', searchVolume: '500M', competition: 'Medium' },
                        { name: 'howto', searchVolume: '300M', competition: 'Medium' },
                        { name: 'education', searchVolume: '200M', competition: 'Low' },
                        { name: 'learning', searchVolume: '150M', competition: 'Low' }
                    ]
                });
            } else {
                reject(new Error('Simulated extraction error'));
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
extractorForm.addEventListener('invalid', function(e) {
    e.preventDefault();
}, true); 