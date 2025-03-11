// Track tool usage
trackToolUsage('word-counter');

// Get DOM elements
const textInput = document.getElementById('textInput');
const countSpaces = document.getElementById('countSpaces');
const countPunctuation = document.getElementById('countPunctuation');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const paragraphCount = document.getElementById('paragraphCount');
const sentenceCount = document.getElementById('sentenceCount');
const readingTime = document.getElementById('readingTime');
const speakingTime = document.getElementById('speakingTime');
const avgWordLength = document.getElementById('avgWordLength');

// Constants for calculations
const WORDS_PER_MINUTE_READING = 200;
const WORDS_PER_MINUTE_SPEAKING = 130;

// Add event listeners
textInput.addEventListener('input', updateCounts);
countSpaces.addEventListener('change', updateCounts);
countPunctuation.addEventListener('change', updateCounts);

// Function to update all counts
function updateCounts() {
    const text = textInput.value;
    
    // Update basic counts
    updateWordCount(text);
    updateCharCount(text);
    updateParagraphCount(text);
    updateSentenceCount(text);
    
    // Update additional statistics
    updateAdditionalStats(text);
}

// Function to count words
function updateWordCount(text) {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = words.length;
}

// Function to count characters
function updateCharCount(text) {
    let chars = text;
    
    if (!countSpaces.checked) {
        chars = chars.replace(/\s/g, '');
    }
    
    if (!countPunctuation.checked) {
        chars = chars.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    }
    
    charCount.textContent = chars.length;
}

// Function to count paragraphs
function updateParagraphCount(text) {
    const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
    paragraphCount.textContent = paragraphs.length;
}

// Function to count sentences
function updateSentenceCount(text) {
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    sentenceCount.textContent = sentences.length;
}

// Function to update additional statistics
function updateAdditionalStats(text) {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    // Calculate reading time
    const readingMinutes = Math.ceil(wordCount / WORDS_PER_MINUTE_READING);
    readingTime.textContent = `${readingMinutes} minute${readingMinutes !== 1 ? 's' : ''}`;
    
    // Calculate speaking time
    const speakingMinutes = Math.ceil(wordCount / WORDS_PER_MINUTE_SPEAKING);
    speakingTime.textContent = `${speakingMinutes} minute${speakingMinutes !== 1 ? 's' : ''}`;
    
    // Calculate average word length
    if (wordCount > 0) {
        const totalChars = words.join('').length;
        const avgLength = (totalChars / wordCount).toFixed(1);
        avgWordLength.textContent = `${avgLength} characters`;
    } else {
        avgWordLength.textContent = '0 characters';
    }
}

// Initialize counts
updateCounts(); 