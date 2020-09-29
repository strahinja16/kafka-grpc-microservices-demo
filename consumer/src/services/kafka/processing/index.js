const { processUserActionsTopic } = require('./user');

const processTopicData = (consumer, topics) => {
  const userActionsTopic = 'user-actions';

  if (topics.includes(userActionsTopic)) {
    processUserActionsTopic(consumer);
  }
};

module.exports = {
  processTopicData,
};
