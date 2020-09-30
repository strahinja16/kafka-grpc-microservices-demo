require('dotenv').config();

const {
  PORT, KAFKA_HOST, KAFKA_TOPIC_USER_SEARCH, KAFKA_TOPIC_NEWS,
} = process.env;

const port = PORT || 3000;

module.exports = {
  port,
  kafkaConfig: {
    host: KAFKA_HOST,
    topicUserSearch: KAFKA_TOPIC_USER_SEARCH,
    topicNews: KAFKA_TOPIC_NEWS,
  },
};
