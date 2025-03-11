// Track tool usage
trackToolUsage('grammar-checker');

// DOM Elements
const grammarForm = document.getElementById('grammarForm');
const textInput = document.getElementById('textInput');
const checkGrammar = document.getElementById('checkGrammar');
const checkSpelling = document.getElementById('checkSpelling');
const checkStyle = document.getElementById('checkStyle');
const clearBtn = document.getElementById('clearBtn');
const resultsSection = document.getElementById('resultsSection');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const issueCount = document.getElementById('issueCount');
const issuesList = document.getElementById('issuesList');
const correctedText = document.getElementById('correctedText');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');

// Common grammar rules and patterns
const grammarRules = {
    // Subject-verb agreement
    subjectVerbAgreement: {
        pattern: /\b(he|she|it)\s+(am|are)\b|\b(i)\s+(is|are|was|were)\b|\b(you)\s+(is|was)\b/gi,
        message: "Subject-verb agreement error. Check if the verb matches the subject.",
        category: "Grammar"
    },
    // Articles
    articles: {
        pattern: /\b(a|an)\s+[aeiou]\b/gi,
        message: "Incorrect article usage. Use 'an' before words beginning with a vowel sound.",
        category: "Grammar"
    },
    // Common spelling mistakes
    spelling: {
        pattern: /\b(recieve|occured|seperate|accomodate|committment|occurence|priviledge|occuring)\b/gi,
        message: "Common spelling mistake. Check the correct spelling.",
        category: "Spelling"
    },
    // Double negatives
    doubleNegatives: {
        pattern: /\b(no|not|never|none|nothing|nobody|nowhere)\s+(no|not|never|none|nothing|nobody|nowhere)\b/gi,
        message: "Double negative detected. Consider rephrasing.",
        category: "Style"
    },
    // Passive voice
    passiveVoice: {
        pattern: /\b(am|is|are|was|were|be|been|being)\s+[a-z]+ed\b/gi,
        message: "Possible passive voice. Consider using active voice for better clarity.",
        category: "Style"
    }
};

// Handle form submission
grammarForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Reset UI
    resetUI();
    
    // Validate input
    if (!textInput.value.trim()) {
        showError('Please enter some text to check.');
        return;
    }

    if (textInput.value.length > 5000) {
        showError('Text exceeds maximum length of 5000 characters.');
        return;
    }

    // Show loading spinner
    loadingSpinner.classList.remove('d-none');
    
    try {
        // Get text and options
        const text = textInput.value;
        const options = {
            grammar: checkGrammar.checked,
            spelling: checkSpelling.checked,
            style: checkStyle.checked
        };

        // Process text
        const results = await checkText(text, options);
        
        // Update statistics
        updateStatistics(results);
        
        // Display issues
        displayIssues(results.issues);
        
        // Display corrected text
        displayCorrectedText(results.correctedText);
        
        // Show results section
        resultsSection.classList.remove('d-none');
        
        // Hide loading spinner
        loadingSpinner.classList.add('d-none');
        
        // Show success message
        showSuccess('Text check completed successfully!');

    } catch (error) {
        console.error('Check error:', error);
        showError(error.message || 'An error occurred while checking the text.');
        loadingSpinner.classList.add('d-none');
    }
});

// Handle clear button click
clearBtn.addEventListener('click', function() {
    resetUI();
});

// Function to check text
async function checkText(text, options) {
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
            const issues = [];
            let correctedText = text;

            // Check each rule based on selected options
            Object.entries(grammarRules).forEach(([key, rule]) => {
                if (options[rule.category.toLowerCase()]) {
                    let match;
                    while ((match = rule.pattern.exec(text)) !== null) {
                        issues.push({
                            text: match[0],
                            message: rule.message,
                            category: rule.category,
                            position: match.index
                        });
                    }
                }
            });

            // Sort issues by position
            issues.sort((a, b) => a.position - b.position);

            // Apply corrections
            issues.forEach(issue => {
                // In a real implementation, this would use more sophisticated correction logic
                correctedText = correctedText.replace(issue.text, issue.text);
            });

            resolve({
                issues,
                correctedText,
                statistics: {
                    words: countWords(text),
                    characters: text.length,
                    issues: issues.length
                }
            });
        }, 1000);
    });
}

// Helper function to count words
function countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Helper function to update statistics
function updateStatistics(results) {
    wordCount.textContent = results.statistics.words;
    charCount.textContent = results.statistics.characters;
    issueCount.textContent = results.statistics.issues;
}

// Helper function to display issues
function displayIssues(issues) {
    issuesList.innerHTML = '';
    
    if (issues.length === 0) {
        issuesList.innerHTML = '<div class="list-group-item text-success">No issues found!</div>';
        return;
    }

    issues.forEach(issue => {
        const issueElement = document.createElement('div');
        issueElement.className = 'list-group-item';
        issueElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <strong>${issue.category}:</strong> ${issue.message}
                    <br>
                    <small class="text-muted">Found: "${issue.text}"</small>
                </div>
                <span class="badge bg-${getCategoryColor(issue.category)}">${issue.category}</span>
            </div>
        `;
        issuesList.appendChild(issueElement);
    });
}

// Helper function to display corrected text
function displayCorrectedText(text) {
    correctedText.textContent = text;
}

// Helper function to get category color
function getCategoryColor(category) {
    switch (category.toLowerCase()) {
        case 'grammar':
            return 'danger';
        case 'spelling':
            return 'warning';
        case 'style':
            return 'info';
        default:
            return 'secondary';
    }
}

// Helper function to reset UI
function resetUI() {
    // Reset form
    grammarForm.reset();
    
    // Hide results section
    resultsSection.classList.add('d-none');
    
    // Clear error message
    errorMessage.classList.add('d-none');
    errorMessage.textContent = '';
    
    // Reset statistics
    wordCount.textContent = '0';
    charCount.textContent = '0';
    issueCount.textContent = '0';
    
    // Clear issues list and corrected text
    issuesList.innerHTML = '';
    correctedText.textContent = '';
}

// Helper function to show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
}

// Add input validation
textInput.addEventListener('input', function() {
    const maxLength = 5000;
    if (this.value.length > maxLength) {
        this.value = this.value.substring(0, maxLength);
        showError(`Maximum ${maxLength} characters allowed.`);
    }
}); 