// Select DOM elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");


let apiQuotes = [];

function newQuote() {
    // Select a random quote from apiQuotes array
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    // Check author field for null and change to 'unknown'
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote['author'];
    };
    // Check quote length and apply long-quote class if needed
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    };
    quoteText.textContent = quote['text'];
};

// Get Quotes from API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        // convert response into json object
        // and store in global variable
        apiQuotes = await response.json();
    } catch (error) {
        alert(error);
        // Catch the error here if
        // not able to fetch data
        // and return a quote from quotes.js
        apiQuotes = localQuotes;
        console.log('Using localQuotes');
    };
    newQuote();
};

// Tweet a quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
};


// Event Listeners for Twitter & New Quote buttons
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);



// On load, fetch quotes from api
getQuotes();


