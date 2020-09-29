const mongoose = require('mongoose');
const { mongoConfig } = require('../../config');

module.exports = () => {
  const {
    host, database, user, password,
  } = mongoConfig;
  
  mongoose.connect(`mongodb://${user}:${password}@${host}/${database}`, { useNewUrlParser: true })
    .catch(mongoEx => console.log({ mongoEx }));
};
