const { processTopicNews } = require('./news');
const { kafkaConfig } = require('../../../config');

const { topicNews } = kafkaConfig;

const processTopicData = (consumer, topics, io) => {
  if (topics.includes(topicNews)) {
    processTopicNews(consumer, io);
  }
};

module.exports = {
  processTopicData,
};
