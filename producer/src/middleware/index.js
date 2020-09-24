const validate = require('./validate');

const mapping = {
  validate,
};

module.exports = (middleware) => {
  if (mapping[middleware]) {
    return mapping[middleware];
  }

  console.log(`Middleware ${middleware} not registered.`);
  return (req, res, next) => next();
};
