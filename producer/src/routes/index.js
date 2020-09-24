const { Router } = require('express');
const kafkaTestsRouter = require('./kafkaTests');

const router = Router();

router.use('/kafka-tests', kafkaTestsRouter);

module.exports = router;
