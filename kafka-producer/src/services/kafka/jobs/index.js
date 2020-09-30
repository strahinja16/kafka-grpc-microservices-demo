const userJob = require('./user');
const newsJob = require('./news');

const initKafkaJobs = () => {
  userJob();
  newsJob();
};

module.exports = initKafkaJobs;
