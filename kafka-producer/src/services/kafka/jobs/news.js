const faker = require('faker');
const { categories, newspapers, repeatJob } = require('./util');
const { producer } = require('..');
const { kafkaConfig } = require('../../../config');

const newsJob = () => {
  const { topicNews } = kafkaConfig;

  const newsMsg = {
    newspaper: faker.random.arrayElement(newspapers),
    date: faker.date.recent(),
    headline: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    tags: faker.lorem.words(5).split(' '),
    sentiment: faker.random.number({ min: 0, max: 100 }),
    category: faker.random.arrayElement(categories),
  };

  try {
    const payloads = [
      {
        topic: topicNews,
        messages: [JSON.stringify(newsMsg)],
      },
    ];

    producer.send(
      payloads,
      (error, data) => {
        if (error) console.log(`Kafka ${topicNews} kafka-producer callback error`, { error });
        if (data) console.log(`Kafka ${topicNews} kafka-producer callback data`, { data });
      },
    );
  } catch (error) {
    console.log(`Error in kafka ${topicNews} job`, { error });
  }

  repeatJob(newsJob);
};

module.exports = newsJob;
