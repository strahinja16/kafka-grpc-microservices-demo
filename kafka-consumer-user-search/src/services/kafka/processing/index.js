const { processTopicUserSearch } = require('./user');
const { kafkaConfig } = require('../../../config');

const { topicUserSearch } = kafkaConfig;

const processTopicData = (consumer, topics) => {
  if (topics.includes(topicUserSearch)) {
    processTopicUserSearch(consumer);
  }
};

module.exports = {
  processTopicData,
};
