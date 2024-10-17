const express = require('express');
// import routes
const path = require('path');
const indexRouter = require('./routes/index.js');
const quotesRouter = require('./routes/quotes.js');
const complainRouter = require('./routes/complain.js');
const apiRouter = require('./routes/api.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();

// Pages
const filePath404Page = path.resolve(__dirname, '../client/404.html');

// Routes: hierarchy matters
app.use(express.static('client'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/quotes', quotesRouter);
app.use('/complain', complainRouter);
app.use('/api', apiRouter);
// last route, so it becomes the fallback
app.use((req, res) => {
  res.status(404).sendFile(filePath404Page);
});

/*
// Endpoints -----
addComment: handled later, post is different from get
app.post('/addComment', (req, res) => {
    res.send("You just called the post method at '/addComment'!");
});
*/

app.listen(port, () => {
  // console.log(`App running on http://localhost:${port}`);
});
