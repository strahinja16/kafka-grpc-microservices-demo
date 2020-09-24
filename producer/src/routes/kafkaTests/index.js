const { Router } = require('express');
const crypto = require('crypto');
const { producer } = require('../../services/kafka');

const router = Router();

router.get('/numeric', (req, res) => {
  try {
    const number = Math.floor((Math.random() * 100) + 50);

    producer.send(
      [{ topic: 'number', messages: [number, number + 1] }],
      (error, data) => {
        if (error) console.log('Kafka producer callback error', { error });
        if (data) console.log('Kafka producer callback data', { data });

        return res.send({ data });
      },
    );
  } catch (error) {
    console.log('Error in /kafka-tests/number', { error });
  }
});

router.get('/alphanumeric', (req, res) => {
  try {
    const hexCode = crypto.randomBytes(1).toString('hex');

    producer.send(
      [{ topic: 'alphanumeric', messages: hexCode }],
      (error, data) => {
        if (error) console.log('Kafka producer callback error', { error });
        if (data) console.log('Kafka producer callback data', { data });

        return res.send({ data });
      },
    );
  } catch (error) {
    console.log('Error in /kafka-tests/alphanumeric', { error });
  }
});


module.exports = router;
