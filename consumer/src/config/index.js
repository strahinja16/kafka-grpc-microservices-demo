require('dotenv').config();

const { PORT, KAFKA_HOST, KAFKA_INITIAL_TOPICS } = process.env;

const port = PORT || 3000;

const kafkaInitialTopics = KAFKA_INITIAL_TOPICS
  ? KAFKA_INITIAL_TOPICS.split(',')
  : [];

module.exports = {
  port,
  kafkaConfig: {
    host: KAFKA_HOST,
    initialTopics: kafkaInitialTopics,
  },
};
