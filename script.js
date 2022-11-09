const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.querySelector(".loader")

// Get quotes from API
let apiQuotes = []

// Show loader
const loading = () => {
	loader.hidden = false
	quoteContainer.hidden = true
}

// Hide loader
const complete = () => {
	loader.hidden = true
	quoteContainer.hidden = false
}

// Generate random quote
const getRandomQuote = () => {
	loading()
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

	if (!quote.author) {
		authorText.textContent = "Unknown"
	} else {
		authorText.textContent = quote.author
	}

	quoteText.textContent = quote.text

	quote.text.length > 120
		? quoteText.classList.add("long-quote")
		: quoteText.classList.remove("long-quote")

	complete()
}

const getQuotes = async () => {
	const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json"
	try {
		loading()
		const response = await fetch(apiURL)
		apiQuotes = await response.json()
		getRandomQuote()
	} catch (error) {
		// err here
	}
}

//Tweet the quote
const tweetQuote = () => {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
	window.open(twitterUrl, "_blank")
}

twitterBtn.addEventListener("click", tweetQuote)
newQuoteBtn.addEventListener("click", getRandomQuote)

getQuotes()
