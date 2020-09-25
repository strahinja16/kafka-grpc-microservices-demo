require('dotenv').config();

const {
  PORT, KAFKA_HOST, KAFKA_INITIAL_TOPICS, GRPC_SERVER,
} = process.env;

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
  grpcServer: GRPC_SERVER,
};
