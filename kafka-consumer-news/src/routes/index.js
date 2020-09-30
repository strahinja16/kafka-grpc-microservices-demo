const { Router } = require('express');
const kafkaReportingRouter = require('./kafkaReporting');

const router = Router();

router.use('/kafka-reporting', kafkaReportingRouter);

module.exports = router;
