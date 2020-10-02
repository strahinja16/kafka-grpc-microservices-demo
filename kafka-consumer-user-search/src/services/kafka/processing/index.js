const { processTopicUserSearch } = require('./user');
const { kafkaConfig } = require('../../../config');

const { topicUserSearch } = kafkaConfig;

const processTopicData = (consumer, topics, io) => {
  if (topics.includes(topicUserSearch)) {
    processTopicUserSearch(consumer, io);
  }
};

module.exports = {
  processTopicData,
};
