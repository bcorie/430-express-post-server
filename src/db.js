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

const getQuoteById = (id) => {
  // if id parameter doesn't exist, return all quotes
  if (id === undefined) {
    return quotes;
  }

  for (let i = 0; i < quotes.length; i++) {
    if (id === quotes[i].id) {
      return quotes[i];
    }
  }

  // if no matching id, id is empty
  return {};
};

module.exports = {
  getAllQuotes, randomQuote, recentQuote, getQuoteById,
};
