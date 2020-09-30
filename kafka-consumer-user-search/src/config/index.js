require('dotenv').config();

const {
  PORT,
  KAFKA_HOST,
  KAFKA_TOPIC_USER_SEARCH,
  MONGO_HOST,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DATABASE,
} = process.env;

const port = PORT || 3000;


module.exports = {
  port,
  kafkaConfig: {
    host: KAFKA_HOST,
    topicUserSearch: KAFKA_TOPIC_USER_SEARCH,
  },
  mongoConfig: {
    host: MONGO_HOST,
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    database: MONGO_DATABASE,
  },
};
