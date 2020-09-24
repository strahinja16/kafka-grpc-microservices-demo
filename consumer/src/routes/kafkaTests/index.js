const { Router } = require('express');
const { consumer } = require('../../services/kafka');

const router = Router();

router.get('/alphanumeric-sub', (req, res) => {
  try {
    consumer.addTopics(['alphanumeric'], (err, added) => {
      if (err) console.log('Consumer add alphanumeric topic err: ', { err });
      if (added) console.log('Consumer alphanumeric topic added: ', { added });

      return res.send('');
    });
  } catch (error) {
    console.log('Error in /kafka-tests/alphanumeric-sub', { error });
  }
});

router.get('/alphanumeric-unsub', (req, res) => {
  try {
    consumer.removeTopics(['alphanumeric'], (err, removed) => {
      if (err) console.log('Consumer remove alphanumeric topic err: ', { err });
      if (removed) console.log('Consumer alphanumeric topic removed: ', { removed });

      return res.send('');
    });
  } catch (error) {
    console.log('Error in /kafka-tests/alphanumeric-unsub', { error });
  }
});

module.exports = router;
