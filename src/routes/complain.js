// Extra!

const express = require('express');

const router = express.Router();

router.get('/whine', (req, res) => {
  res.send('I want ice cream now!');
});

router.get('/cry', (req, res) => {
  res.send('Waaaaaaah! :(');
});

module.exports = router;
