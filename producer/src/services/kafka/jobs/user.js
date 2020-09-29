const { KeyedMessage } = require('kafka-node');
const faker = require('faker');
const { producer } = require('..');

const repeatJob = (job) => {
  const randomInterval = 500 * ((Math.random() * 10) + 1);
  setTimeout(job, randomInterval);
};

const USER_EVENTS = ['READ_ARTICLE', 'SHARE_ARTICLE', 'SEARCH'];

const userJob = () => {
  const key = USER_EVENTS[Math.floor(Math.random() * USER_EVENTS.length)];
  const user = {
  	id: faker.random.uuid(),
  	firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };

  const keyedMsg = new KeyedMessage(key, JSON.stringify(user));

  try {
    const payloads = [
    	{
			  topic: 'user-actions',
			  messages: [keyedMsg],
    	},
    ];

    producer.send(
      payloads,
      (error, data) => {
        if (error) console.log('Kafka user-actions producer callback error', { error });
        if (data) console.log('Kafka user-actions producer callback data', { data });
      },
    );
  } catch (error) {
    console.log('Error in kafka user-actions job', { error });
  }

  repeatJob(userJob);
};

module.exports = userJob;
