const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes');

const app = express();

app.set('views', './source/template');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: 'SECRET_KEY',
  saveUninitialized: false,
  resave: true
}));

app.use('/', routes);

app.use(express.static(path.join(process.cwd(), 'public')));

app.use((req, res, next) => {
  if (req.url !== '/favicon.ico') {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('pages/error', {message: err.message, error: err});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;