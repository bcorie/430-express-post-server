const express = require('express');

const router = express.Router();

const generateNewId = () => crypto.randomUUID();

const hoots = [{
  id: generateNewId(),
  content: "Let's Rock!",
  createdAt: new Date(),
}];

router.get('/helloJSON', (req, res) => {
  res.json({ message: 'Hello world!' });
});

router.get('/timeJSON', (req, res) => {
  const d = new Date();
  res.json({ message: d });
});

router.get('/hoots', (req, res) => {
  res.json(hoots);
});

router.post('/addHoot', (req, res) => {
  // verify we got POST data
  const content = req.body && req.body.content
    ? req.body.content
    : 'No req.body or req.body.content found!';

  // create a `hoot` object literal
  const hoot = {
    id: generateNewId(),
    content,
    createdAt: new Date(),
  };

  // add hoot to array
  hoots.push(hoot);

  // send new hoot back to caller
  res.status(201).json(hoot);
});

/* DELETE hoot */
const getHootById = (id) => {
  const hoot = hoots.find((h) => h.id === id);
  return hoot;
};

const deleteHootById = (id) => {
  const hoot = getHootById(id);
  if (!hoot) { /* console.log('No hoot, returning null.'); */ return null; }
  const index = hoots.indexOf(hoot);
  hoots.splice(index, 1);
  // console.log('Hoot found. Returning hoot with id', hoot.id);
  return hoot;
};

// only if id is 36 character long with allowed characterss
router.delete('/deleteHoot/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  const hoot = deleteHootById(req.params.id);
  if (!hoot) {
    const error = `id: '${req.params.id}' not found`;
    // console.log(`Error: ${error}`);
    res.status(404).send({ error });
  } else {
    // console.log(`Delete successful: ${hoot.id}`);
    res.json(hoot);
  }
});

router.put('/updateHoot/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  // console.log(`id=${req.params.id}`);
  const hoot = getHootById(req.params.id);
  if (!hoot) {
    const error = `id: '${req.params.id}' not found`;
    res.status(404).send({ error });
  } else {
    const content = req.body && req.body.content
      ? req.body.content
      : 'No req.body or req.body.content found!';
    hoot.content = content;
    hoot.updatedAt = new Date();
    res.json(hoot);
  }
});

router.get('/hoots/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  const hoot = getHootById(req.params.id);
  if (!hoot) {
    const error = `id: '${req.params.id}' not found`;
    // console.log(`Error: ${error}`);
    res.status(404).send({ error });
  } else {
    // console.log(`Get successful: ${hoot.id}`);
    res.json(hoot);
  }
});

module.exports = router;
