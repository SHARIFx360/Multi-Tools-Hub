// Component loader
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Load all components when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add header
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.appendChild(createHeader());
    }

    // Add search bar
    const searchContainer = document.getElementById('search-container');
    if (searchContainer) {
        searchContainer.appendChild(createSearchBar());
    }

    // Add footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.appendChild(createFooter());
    }
    
    // Initialize search functionality
    const searchInput = document.getElementById('searchTools');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            searchTools(searchTerm);
        });
    }

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize ads
    initializeAds();
});

// Improved search functionality
function searchTools(searchTerm) {
    const cards = document.querySelectorAll('.card');
    let hasVisibleCards = false;
    
    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();
        const cardContainer = card.closest('.col-md-4');
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            cardContainer.style.display = '';
            hasVisibleCards = true;
        } else {
            cardContainer.style.display = 'none';
        }
    });
    
    // Show/hide "no results" message
    const noResultsMessage = document.getElementById('no-results-message');
    if (noResultsMessage) {
        noResultsMessage.style.display = hasVisibleCards ? 'none' : 'block';
    }
}

// Ad management
function initializeAds() {
    // Placeholder for ad initialization
    const adSpaces = document.querySelectorAll('.ad-space-top, .ad-space-bottom');
    adSpaces.forEach(space => {
        // Here you would initialize your ad provider (e.g., AdSense)
        // For now, we'll just show a placeholder
        space.innerHTML = `
            <div class="ad-placeholder">
                <p class="mb-0">Advertisement Space</p>
                <small class="text-muted">AdSense or other ad code will be placed here</small>
            </div>
        `;
    });
}

// Export functions for use in other files
window.loadComponent = loadComponent;
window.searchTools = searchTools;
window.initializeAds = initializeAds;

// Header Component
function createHeader() {
    const header = document.createElement('header');
    header.className = 'navbar navbar-expand-lg navbar-dark sticky-top shadow-sm';
    header.innerHTML = `
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="/">
                <i class="fas fa-tools me-2"></i>
                <span>Multi-Tools Hub</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="/">
                            <i class="fas fa-home me-1"></i>Home
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="toolsDropdown" role="button" data-bs-toggle="dropdown">
                            <i class="fas fa-tools me-1"></i>Tools
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark">
                            <li><h6 class="dropdown-header text-primary">Social Media</h6></li>
                            <li><a class="dropdown-item" href="/tools/social-media-tools/facebook-downloader.html">
                                <i class="fab fa-facebook me-2"></i>Facebook Downloader
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/social-media-tools/tiktok-downloader.html">
                                <i class="fab fa-tiktok me-2"></i>TikTok Downloader
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/social-media-tools/instagram-downloader.html">
                                <i class="fab fa-instagram me-2"></i>Instagram Downloader
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/social-media-tools/twitter-downloader.html">
                                <i class="fab fa-twitter me-2"></i>Twitter Downloader
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/social-media-tools/youtube-downloader.html">
                                <i class="fab fa-youtube me-2"></i>YouTube Downloader
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/social-media-tools/youtube-tags-extractor.html">
                                <i class="fab fa-youtube me-2"></i>YouTube Tags Extractor
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/social-media-tools/youtube-thumbnail-downloader.html">
                                <i class="fab fa-youtube me-2"></i>YouTube Thumbnail Downloader
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/social-media-tools/social-post-generator.html">
                                <i class="fas fa-pen-fancy me-2"></i>Social Post Generator
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/social-media-tools/emoji-keyboard.html">
                                <i class="far fa-smile me-2"></i>Emoji Keyboard
                            </a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><h6 class="dropdown-header text-primary">Image Tools</h6></li>
                            <li><a class="dropdown-item" href="/tools/image-tools/image-to-png.html">
                                <i class="fas fa-image me-2"></i>Image to PNG Converter
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/image-tools/image-to-jpg.html">
                                <i class="fas fa-image me-2"></i>Image to JPG Converter
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/image-tools/image-resizer.html">
                                <i class="fas fa-expand-arrows-alt me-2"></i>Image Resizer
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/image-tools/image-compressor.html">
                                <i class="fas fa-compress-alt me-2"></i>Image Compressor
                            </a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><h6 class="dropdown-header text-primary">Text Tools</h6></li>
                            <li><a class="dropdown-item" href="/tools/text-tools/word-counter.html">
                                <i class="fas fa-font me-2"></i>Word Counter
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/text-tools/grammar-checker.html">
                                <i class="fas fa-check-circle me-2"></i>Grammar Checker
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/text-tools/text-to-speech.html">
                                <i class="fas fa-volume-up me-2"></i>Text to Speech
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/text-tools/random-text-generator.html">
                                <i class="fas fa-random me-2"></i>Random Text Generator
                            </a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><h6 class="dropdown-header text-primary">Math & Calculators</h6></li>
                            <li><a class="dropdown-item" href="/tools/math-tools/scientific-calculator.html">
                                <i class="fas fa-calculator me-2"></i>Scientific Calculator
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/math-tools/currency-converter.html">
                                <i class="fas fa-exchange-alt me-2"></i>Currency Converter
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/calculators/percentage-calculator.html">
                                <i class="fas fa-percentage me-2"></i>Percentage Calculator
                            </a></li>
                            <li><a class="dropdown-item" href="/tools/calculators/age-calculator.html">
                                <i class="fas fa-birthday-cake me-2"></i>Age Calculator
                            </a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about.html">
                            <i class="fas fa-info-circle me-1"></i>About
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact.html">
                            <i class="fas fa-envelope me-1"></i>Contact
                        </a>
                    </li>
                </ul>
                <div class="d-flex align-items-center">
                    <a href="https://github.com/yourusername/multi-tools-hub" class="btn btn-outline-light me-2" target="_blank">
                        <i class="fab fa-github me-1"></i>GitHub
                    </a>
                    <div class="btn-group">
                        <button class="btn btn-outline-light" id="lightTheme">
                            <i class="fas fa-sun me-1"></i>Light
                        </button>
                        <button class="btn btn-outline-light" id="darkTheme">
                            <i class="fas fa-moon me-1"></i>Dark
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add theme toggle functionality
    const lightThemeBtn = header.querySelector('#lightTheme');
    const darkThemeBtn = header.querySelector('#darkTheme');
    
    if (lightThemeBtn && darkThemeBtn) {
        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            darkThemeBtn.classList.add('active');
            lightThemeBtn.classList.remove('active');
        } else {
            document.body.classList.remove('dark-mode');
            lightThemeBtn.classList.add('active');
            darkThemeBtn.classList.remove('active');
        }

        lightThemeBtn.addEventListener('click', function() {
            document.body.classList.remove('dark-mode');
            lightThemeBtn.classList.add('active');
            darkThemeBtn.classList.remove('active');
            localStorage.setItem('theme', 'light');
        });

        darkThemeBtn.addEventListener('click', function() {
            document.body.classList.add('dark-mode');
            darkThemeBtn.classList.add('active');
            lightThemeBtn.classList.remove('active');
            localStorage.setItem('theme', 'dark');
        });
    }

    return header;
}

// Search Bar Component
function createSearchBar() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container py-5 mb-4';
    searchContainer.innerHTML = `
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 text-center">
                    <h2 class="display-4 mb-4">Find Your Perfect Tool</h2>
                    <p class="lead mb-4">Search through our collection of powerful online tools to help you get the job done.</p>
                    <div class="input-group input-group-lg shadow-sm">
                        <span class="input-group-text bg-white border-0">
                            <i class="fas fa-search text-primary"></i>
                        </span>
                        <input type="text" class="form-control border-0" id="searchTools" 
                               placeholder="Search for tools..." aria-label="Search tools">
                        <button class="btn btn-primary px-4" type="button">
                            Search
                        </button>
                    </div>
                    <div class="mt-3">
                        <small class="text-muted">
                            Popular searches: 
                            <a href="#" class="text-decoration-none me-2">Facebook Downloader</a>
                            <a href="#" class="text-decoration-none me-2">TikTok Downloader</a>
                            <a href="#" class="text-decoration-none me-2">Image Converter</a>
                            <a href="#" class="text-decoration-none">Word Counter</a>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add search functionality
    const searchInput = searchContainer.querySelector('#searchTools');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            searchTools(searchTerm);
        });
    }

    return searchContainer;
}

// Tool Card Component
function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'card h-100 tool-card';
    card.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-center mb-3">
                <i class="${tool.icon} fa-2x me-3 text-primary"></i>
                <h5 class="card-title mb-0">${tool.name}</h5>
            </div>
            <p class="card-text">${tool.description}</p>
            <a href="${tool.url}" class="btn btn-primary stretched-link">
                Use Tool
            </a>
        </div>
    `;
    return card;
}

// Category Section Component
function createCategorySection(category, tools) {
    const section = document.createElement('section');
    section.className = 'mb-5';
    section.innerHTML = `
        <div class="container">
            <h2 class="mb-4">${category}</h2>
            <div class="row g-4">
                ${tools.map(tool => `
                    <div class="col-md-6 col-lg-4">
                        ${createToolCard(tool).outerHTML}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    return section;
}

// Footer Component
function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'footer py-5 mt-5';
    footer.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4 mb-lg-0">
                    <h5 class="mb-3">Multi-Tools Hub</h5>
                    <p class="mb-4">A comprehensive collection of online tools for various tasks. Make your work easier with our powerful and user-friendly tools.</p>
                    <div class="social-links">
                        <a href="#" class="me-3"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="me-3"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="me-3"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="me-3"><i class="fab fa-github"></i></a>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
                    <h6 class="mb-3">Quick Links</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="/">Home</a></li>
                        <li class="mb-2"><a href="/about.html">About Us</a></li>
                        <li class="mb-2"><a href="/contact.html">Contact</a></li>
                        <li class="mb-2"><a href="/privacy.html">Privacy Policy</a></li>
                        <li class="mb-2"><a href="/terms.html">Terms of Service</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
                    <h6 class="mb-3">Popular Tools</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="/tools/social-media-tools/facebook-downloader.html">Facebook Downloader</a></li>
                        <li class="mb-2"><a href="/tools/social-media-tools/tiktok-downloader.html">TikTok Downloader</a></li>
                        <li class="mb-2"><a href="/tools/image-tools/image-to-png.html">Image to PNG Converter</a></li>
                        <li class="mb-2"><a href="/tools/text-tools/word-counter.html">Word Counter</a></li>
                    </ul>
                </div>
                <div class="col-lg-3">
                    <h6 class="mb-3">Newsletter</h6>
                    <p class="mb-3">Subscribe to our newsletter for updates and new tools.</p>
                    <form class="newsletter-form">
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Enter your email">
                            <button class="btn btn-primary" type="submit">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
            <hr class="my-4">
            <div class="row align-items-center">
                <div class="col-md-6 text-center text-md-start">
                    <p class="mb-0">© ${new Date().getFullYear()} Multi-Tools Hub. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <div class="footer-badges">
                        <span class="badge bg-primary me-2">Free Tools</span>
                        <span class="badge bg-success me-2">No Registration</span>
                        <span class="badge bg-info">Secure</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add newsletter form submission handler
    const newsletterForm = footer.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                showSuccess('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
    }

    return footer;
} 