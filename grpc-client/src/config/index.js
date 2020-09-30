require('dotenv').config();

const {
  PORT,
  KAFKA_HOST,
  KAFKA_TOPIC_USER_SEARCH,
  GRPC_SERVER,
} = process.env;

const port = PORT || 3000;


module.exports = {
  port,
  kafkaConfig: {
    host: KAFKA_HOST,
    topicUserSearch: KAFKA_TOPIC_USER_SEARCH,
  },
  grpcServer: GRPC_SERVER,
};
