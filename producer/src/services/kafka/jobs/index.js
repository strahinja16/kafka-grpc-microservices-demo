const userJob = require('./user');

const initKafkaJobs = () => {
  userJob();
};

module.exports = initKafkaJobs;
