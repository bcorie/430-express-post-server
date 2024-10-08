const express = require('express');

const db = require('../db.js');

const router = express.Router();

// just 3 quotes for now
const data = db.getAllQuotes();

router.get('/', (req, res) => {
  const { id } = req.query;
  res.json(db.getQuoteById(id));
});

router.get('/', (req, res) => {
  res.json(data);
});

router.get('/random', (req, res) => {
  res.json(db.randomQuote());
});

router.get('/recent', (req, res) => {
  res.json(db.recentQuote());
});

router.get('/:id', (req, res) => { // Note the colon, which matches anything after '/' and assigns it to the `id` variable
  const { id } = req.params; // NEW!

  // class solution
  if (!id) {
    res.json(data);
    return;
  }

  const quote = db.getQuoteById(id);
  if (quote) {
    res.json(quote);
  } else {
    res.json({});
  }

  /* // my solution:
  // if id parameter doesn't exist, return all quotes
  if (id === undefined) {
    res.send(data);
  }

  for (let i = 0; i < data.length; i++) {
    if (id === data[i].id) {
      res.send(data[i]);
    }
  }

  // if no matching id, id is empty
  res.send({});
  */
});

module.exports = router;
