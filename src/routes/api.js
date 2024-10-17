const express = require('express');

const router = express.Router();

const generateNewId = () => crypto.randomUUID();

// const hoots = [{
//   id: generateNewId(),
//   content: "Let's Rock!",
//   createdAt: new Date(),
// }];

const hoots = [{
  id: '11111111-2222-3333-4444-555555555555',
  content: "Let's Rock!",
  createdAt: new Date(),
},
{
  id: '66666666-7777-8888-9999-000000000000',
  content: "Bird's aren't real!",
  createdAt: new Date(),
},
];

const hootToXML = (hoot) => {
  let xmlStr = `<hoot id="${hoot.id}" createdAt="${hoot.createdAt}"`;
  xmlStr += hoot.content;
  xmlStr += `</hoot>`;
  return xmlStr;
};

// secondary to GET, so call before GET
router.head('/hoots', (req, res) => {
  // console.log('HEAD called');
  const { length } = JSON.stringify(hoots);
  res.set({
    'Content-Type': 'application/json',
    'Content-Length': length,
    'X-Coder': 'CB',
  });
  res.end();
});

router.get('/hoots', (req, res) => {
  // XML
  // if (req.accepts('application/xml')) {
  // or
  if (req.get('Accept') === 'application/xml') {
    // res.header('Content-Type', 'application/xml');
    // or
    res.type('application/xml');
    const str = `<hoots>
    ${hoots.map((h) => hootToXML(h)).join('')}
    </hoots>`;
    res.send(str);
  } else {
    res.json(hoots);
  }
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

router.get('/helloJSON', (req, res) => {
  res.json({ message: 'Hello world!' });
});

router.get('/timeJSON', (req, res) => {
  const d = new Date();
  res.json({ message: d });
});

module.exports = router;
