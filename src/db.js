const fs = require('fs');
const path = require('path');

const quotesPath = path.resolve(__dirname, 'data/quotes-data.json');
const jsonString = fs.readFileSync(quotesPath);
const data = JSON.parse(jsonString);
const { quotes } = data; // object destructuring

// PUBLIC METHODS
const getAllQuotes = () => quotes;

const randomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

const recentQuote = () => quotes[quotes.length - 1];

const getQuoteById = (id) => quotes.find((q) => q.id === id);

module.exports = {
  getAllQuotes, randomQuote, recentQuote, getQuoteById,
};
