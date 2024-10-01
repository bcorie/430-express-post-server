const express = require('express');

const router = express.Router();

// Index
router.get('/', (req, res) => {
  res.send('Hello world!');
});

// bye
router.get('/bye', (req, res) => {
  res.send('Goodbye!');
});

module.exports = router;
