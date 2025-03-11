// Tool data structure
const tools = {
    socialMedia: [
        {
            id: 'facebook-downloader',
            name: 'Facebook Video Downloader',
            description: 'Download videos from Facebook in various qualities',
            category: 'Social Media',
            url: 'tools/social-media-tools/facebook-downloader.html',
            icon: 'fab fa-facebook'
        },
        {
            id: 'tiktok-downloader',
            name: 'TikTok Video Downloader',
            description: 'Download TikTok videos without watermark',
            category: 'Social Media',
            url: 'tools/social-media-tools/tiktok-downloader.html',
            icon: 'fab fa-tiktok'
        },
        {
            id: 'instagram-downloader',
            name: 'Instagram Video Downloader',
            description: 'Download videos from Instagram posts, reels, and stories',
            category: 'Social Media',
            url: 'tools/social-media-tools/instagram-downloader.html',
            icon: 'fab fa-instagram'
        },
        {
            id: 'twitter-downloader',
            name: 'Twitter Video Downloader',
            description: 'Download videos from Twitter tweets and threads',
            category: 'Social Media',
            url: 'tools/social-media-tools/twitter-downloader.html',
            icon: 'fab fa-twitter'
        },
        {
            id: 'youtube-tags-extractor',
            name: 'YouTube Tags Extractor',
            description: 'Extract and analyze tags from YouTube videos',
            category: 'Social Media',
            url: 'tools/social-media-tools/youtube-tags-extractor.html',
            icon: 'fab fa-youtube'
        },
        {
            id: 'youtube-thumbnail-downloader',
            name: 'YouTube Thumbnail Downloader',
            description: 'Download YouTube video thumbnails in various resolutions',
            category: 'Social Media',
            url: 'tools/social-media-tools/youtube-thumbnail-downloader.html',
            icon: 'fab fa-youtube'
        },
        {
            id: 'social-post-generator',
            name: 'Social Media Post Generator',
            description: 'Generate engaging social media posts with templates and suggestions',
            category: 'Social Media',
            url: 'tools/social-media-tools/social-post-generator.html',
            icon: 'fas fa-pen-fancy'
        },
        {
            id: 'emoji-keyboard',
            name: 'Emoji Keyboard',
            description: 'Browse and copy emojis with categories and search',
            category: 'Social Media',
            url: 'tools/social-media-tools/emoji-keyboard.html',
            icon: 'far fa-smile'
        }
        // Add more social media tools here
    ],
    imageTools: [
        {
            id: 'image-to-png',
            name: 'Image to PNG Converter',
            description: 'Convert images to PNG format with quality settings',
            category: 'Image Tools',
            url: 'tools/image-tools/image-to-png.html',
            icon: 'fas fa-image'
        },
        {
            id: 'image-to-jpg',
            name: 'Image to JPG Converter',
            description: 'Convert images to JPG format instantly.',
            category: 'imageTools',
            url: 'tools/image-tools/image-to-jpg.html'
        },
        {
            id: 'image-resizer',
            name: 'Image Resizer',
            description: 'Resize images to any dimensions while maintaining aspect ratio',
            category: 'Image Tools',
            url: 'tools/image-tools/image-resizer.html',
            icon: 'fas fa-expand-arrows-alt'
        },
        {
            id: 'image-compressor',
            name: 'Image Compressor',
            description: 'Compress images to reduce file size while maintaining quality',
            category: 'Image Tools',
            url: 'tools/image-tools/image-compressor.html',
            icon: 'fas fa-compress-alt'
        }
        // Add more image tools here
    ],
    textTools: [
        {
            id: 'word-counter',
            name: 'Word Counter',
            description: 'Count words, characters, and sentences in text',
            category: 'Text Tools',
            url: 'tools/text-tools/word-counter.html',
            icon: 'fas fa-font'
        },
        {
            id: 'grammar-checker',
            name: 'Grammar Checker',
            description: 'Check your text for grammar errors.',
            category: 'textTools',
            url: 'tools/grammar-checker.html'
        },
        {
            id: 'text-to-speech',
            name: 'Text to Speech',
            description: 'Convert text to speech with multiple voices and languages',
            category: 'Text Tools',
            url: 'tools/text-tools/text-to-speech.html',
            icon: 'fas fa-volume-up'
        },
        {
            id: 'random-text-generator',
            name: 'Random Text Generator',
            description: 'Generate random text, lorem ipsum, or custom patterns',
            category: 'Text Tools',
            url: 'tools/text-tools/random-text-generator.html',
            icon: 'fas fa-random'
        }
        // Add more text tools here
    ],
    calculators: [
        {
            id: 'percentage-calculator',
            name: 'Percentage Calculator',
            description: 'Calculate percentages easily.',
            category: 'calculators',
            url: 'tools/calculators/percentage-calculator.html'
        },
        {
            id: 'age-calculator',
            name: 'Age Calculator',
            description: 'Calculate age and time differences.',
            category: 'calculators',
            url: 'tools/calculators/age-calculator.html'
        },
        {
            id: 'scientific-calculator',
            name: 'Scientific Calculator',
            description: 'Advanced calculator with scientific functions',
            category: 'Math & Calculators',
            url: 'tools/math-tools/scientific-calculator.html',
            icon: 'fas fa-calculator'
        },
        {
            id: 'currency-converter',
            name: 'Currency Converter',
            description: 'Convert between different currencies with real-time rates',
            category: 'Math & Calculators',
            url: 'tools/math-tools/currency-converter.html',
            icon: 'fas fa-exchange-alt'
        }
        // Add more calculators here
    ]
};

// Tool usage tracking
function trackToolUsage(toolName) {
    // In a real application, this would send data to an analytics service
    console.log(`Tool used: ${toolName}`);
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const noResultsMessage = document.getElementById('no-results-message');
    const toolCards = document.querySelectorAll('.card');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            let hasVisibleCards = false;

            toolCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const description = card.querySelector('.card-text').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.closest('.col-md-4').style.display = '';
                    hasVisibleCards = true;
                } else {
                    card.closest('.col-md-4').style.display = 'none';
                }
            });

            if (noResultsMessage) {
                noResultsMessage.classList.toggle('d-none', hasVisibleCards);
            }
        });
    }
});

// Tool categories
const toolCategories = {
    'social-media': {
        name: 'Social Media Tools',
        icon: '🔥',
        tools: [
            {
                name: 'Facebook Video Downloader',
                description: 'Download videos from Facebook easily and quickly.',
                path: 'tools/social-media-tools/facebook-downloader.html'
            },
            {
                name: 'TikTok Video Downloader',
                description: 'Download TikTok videos without watermark.',
                path: 'tools/social-media-tools/tiktok-downloader.html'
            },
            {
                name: 'Instagram Video Downloader',
                description: 'Download videos from Instagram posts, reels, and stories.',
                path: 'tools/social-media-tools/instagram-downloader.html'
            },
            {
                name: 'Twitter Video Downloader',
                description: 'Download videos from Twitter tweets and threads.',
                path: 'tools/social-media-tools/twitter-downloader.html'
            },
            {
                name: 'YouTube Tags Extractor',
                description: 'Extract and analyze tags from YouTube videos.',
                path: 'tools/social-media-tools/youtube-tags-extractor.html'
            },
            {
                name: 'YouTube Thumbnail Downloader',
                description: 'Download YouTube video thumbnails in various resolutions.',
                path: 'tools/social-media-tools/youtube-thumbnail-downloader.html'
            },
            {
                name: 'Social Media Post Generator',
                description: 'Generate engaging social media posts with templates and suggestions',
                path: 'tools/social-media-tools/social-post-generator.html'
            },
            {
                name: 'Emoji Keyboard',
                description: 'Browse and copy emojis with categories and search',
                path: 'tools/social-media-tools/emoji-keyboard.html'
            }
        ]
    },
    'image-tools': {
        name: 'Image Tools',
        icon: '🖼️',
        tools: [
            {
                name: 'Image to PNG Converter',
                description: 'Convert images to PNG format with ease.',
                path: 'tools/image-tools/image-to-png.html'
            },
            {
                name: 'Image to JPG Converter',
                description: 'Convert images to JPG format instantly.',
                path: 'tools/image-tools/image-to-jpg.html'
            },
            {
                name: 'Image Resizer',
                description: 'Resize images to any dimensions while maintaining aspect ratio',
                path: 'tools/image-tools/image-resizer.html'
            },
            {
                name: 'Image Compressor',
                description: 'Compress images to reduce file size while maintaining quality',
                path: 'tools/image-tools/image-compressor.html'
            }
        ]
    },
    'text-tools': {
        name: 'Text Tools',
        icon: '📄',
        tools: [
            {
                name: 'Word Counter',
                description: 'Count words, characters, and paragraphs.',
                path: 'tools/text-tools/word-counter.html'
            },
            {
                name: 'Grammar Checker',
                description: 'Check your text for grammar errors.',
                path: 'tools/text-tools/grammar-checker.html'
            },
            {
                name: 'Text to Speech',
                description: 'Convert text to speech with multiple voices and languages',
                path: 'tools/text-tools/text-to-speech.html'
            },
            {
                name: 'Random Text Generator',
                description: 'Generate random text, lorem ipsum, or custom patterns',
                path: 'tools/text-tools/random-text-generator.html'
            }
        ]
    },
    'calculators': {
        name: 'Math & Calculators',
        icon: '🔢',
        tools: [
            {
                name: 'Percentage Calculator',
                description: 'Calculate percentages easily.',
                path: 'tools/calculators/percentage-calculator.html'
            },
            {
                name: 'Age Calculator',
                description: 'Calculate age and time differences.',
                path: 'tools/calculators/age-calculator.html'
            }
        ]
    }
};

// Export tool categories for use in other files
window.toolCategories = toolCategories;

// Add loading state to buttons
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<span class="loading"></span> Processing...';
    return originalText;
}

function removeLoadingState(button, originalText) {
    button.disabled = false;
    button.innerHTML = originalText;
}

// Error handling
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger alert-dismissible fade show';
    errorDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const container = document.querySelector('.container');
    container.insertBefore(errorDiv, container.firstChild);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success alert-dismissible fade show';
    successDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const container = document.querySelector('.container');
    container.insertBefore(successDiv, container.firstChild);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Export functions for use in individual tool pages
window.tools = tools;
window.trackToolUsage = trackToolUsage;
window.addLoadingState = addLoadingState;
window.removeLoadingState = removeLoadingState;
window.showError = showError;
window.showSuccess = showSuccess; 