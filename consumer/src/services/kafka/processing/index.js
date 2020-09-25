const { processNumberTopic } = require('./numberProcessing');

const processTopicData = (consumer, topics) => {
  const numberTopic = 'number';

  if (topics.includes(numberTopic)) {
    processNumberTopic(consumer);
  }
};

module.exports = {
  processTopicData,
};
