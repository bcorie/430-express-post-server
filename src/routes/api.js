const express = require('express');

const router = express.Router();

router.get('/helloJSON', (req, res) => {
  res.json({ message: 'Hello world!' });
});

router.get('/timeJSON', (req, res) => {
  const d = new Date();
  res.json({ message: d });
});

module.exports = router;
