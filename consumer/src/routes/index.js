const { Router } = require('express');
const grpcTestsRouter = require('./grpcTests');

const router = Router();

router.use('/grpc-tests', grpcTestsRouter);

module.exports = router;
