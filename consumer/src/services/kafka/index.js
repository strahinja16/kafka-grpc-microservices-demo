const { Consumer, KafkaClient, Offset } = require('kafka-node');
const { processTopicData } = require('./processing');
const { kafkaConfig } = require('../../config');

const { initialTopics, host } = kafkaConfig;
const consumerOptions = {};
let initialTopicsInitialized = [];

const setTopicOffsets = (offset, consumer, topics) => {
  offset.fetchLatestOffsets(topics, (error, offsets) => {
    if (error) console.log('Consumer setTopicOffsets err: ', { error });

    topics.forEach((topic) => {
      const latestOffset = offsets[topic][0];
      const partition = 0;
      consumer.setOffset(topic, partition, latestOffset);

      console.log(`Consumer set offset for topic ${topic} to ${latestOffset}`);
    });
  });
};

const addInitialTopics = (offset, consumer) => {
  const addTopicsInterval = setInterval(() => {
    consumer.addTopics(initialTopics, (err, added) => {
      if (err) console.log('Consumer addInitialTopics err: ', { err: err.topics });
      if (added) {
        console.log('Consumer addInitialTopics added: ', { added });

        setTopicOffsets(offset, consumer, added);
        processTopicData(consumer, added);

        initialTopicsInitialized = initialTopicsInitialized.concat(added);

        if (initialTopics.length === initialTopicsInitialized.length) {
          clearInterval(addTopicsInterval);
        }
      }
    });
  }, 1000);
};

try {
  const client = new KafkaClient({ kafkaHost: host });
  const consumer = new Consumer(client, [], consumerOptions);
  const offset = new Offset(client);

  addInitialTopics(offset, consumer);

  consumer.on('offsetOutOfRange', (err) => {
    console.log('Consumer on offsetOutOfRange:', { err: err.topic });
    setTopicOffsets(offset, consumer, [err.topic]);
  });

  module.exports = { consumer };
} catch (err) {
  console.log(`Kafka consumer service error: ${err}`);
}
