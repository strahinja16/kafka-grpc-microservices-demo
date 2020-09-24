const { Router } = require('express');
const kafkaTestsRouter = require('./kafkaTests');
const grpcTestsRouter = require('./grpcTests');

const router = Router();

router.use('/kafka-tests', kafkaTestsRouter);
router.use('/grpc-tests', grpcTestsRouter);

module.exports = router;
