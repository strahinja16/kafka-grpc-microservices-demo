const { Producer, KafkaClient } = require('kafka-node');
const { kafkaConfig } = require('../../config');

try {
  const { host, initialTopics } = kafkaConfig;
  const client = new KafkaClient({ kafkaHost: host });
  const producer = new Producer(client);

  producer.on('ready', () => {
    console.log('Kafka producer ready');
    
    if (initialTopics.length) {
      producer.createTopics(
        initialTopics,
        (error, data) => {
          if (error) console.log('Kafka producer create topics error', { error });
          if (data) console.log('Kafka producer create topics data', { data });
        },
      );
    }
  });

  producer.on('error', err => console.log(`Producer on error: ${err}`));

  module.exports = { producer };
} catch (err) {
  console.log(`Kafka producer service error: ${err}`);
}
