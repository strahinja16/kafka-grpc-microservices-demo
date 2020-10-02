const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./config');
require('./models');
require('./services/db')();

const app = express();

/**
 * Init middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    // eslint-disable-next-line no-console
    console.info(`${req.method}: ${req.url}`);
    next();
  });

  // // eslint-disable-next-line global-require
  // require('mongoose').set('debug', true).set('useFindAndModify', false);
}

app.use('/api', require('./routes'));

/**
 * Exports express
 * @public
 */
module.exports = app;
