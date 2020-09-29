require('dotenv').config();

const {
  PORT,
  KAFKA_HOST,
  KAFKA_INITIAL_TOPICS,
  GRPC_SERVER,
  MONGO_HOST,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DATABASE,
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
  mongoConfig: {
    host: MONGO_HOST,
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    database: MONGO_DATABASE,
  },
  grpcServer: GRPC_SERVER,
};
