const { processTopicNews } = require('./news');
const { kafkaConfig } = require('../../../config');

const { topicNews } = kafkaConfig;

const processTopicData = (consumer, topics) => {
  if (topics.includes(topicNews)) {
    processTopicNews(consumer);
  }
};

module.exports = {
  processTopicData,
};
