const faker = require('faker');
const { categories, countries, repeatJob } = require('./util');
const { producer } = require('..');
const { kafkaConfig } = require('../../../config');

const userJob = () => {
  const { topicUserSearch } = kafkaConfig;

  const userSearchMsg = {
    tags: faker.lorem.words(5).split(' '),
    category: faker.random.arrayElement(categories),
    date: faker.date.recent(),
    user: {
      age: faker.random.number({ min: 12, max: 65 }),
      country: faker.random.arrayElement(countries),
    },
  };

  try {
    const payloads = [
    	{
			  topic: topicUserSearch,
			  messages: [JSON.stringify(userSearchMsg)],
    	},
    ];

    producer.send(
      payloads,
      (error, data) => {
        if (error) console.log(`Kafka ${topicUserSearch} producer callback error`, { error });
        if (data) console.log(`Kafka ${topicUserSearch} producer callback data`, { data });
      },
    );
  } catch (error) {
    console.log(`Error in kafka ${topicUserSearch} job`, { error });
  }

  repeatJob(userJob, 50000);
};

module.exports = userJob;
