const { Router } = require('express');
const exampleRouter = require('./example');

const router = Router();

router.use('/example', exampleRouter);

module.exports = router;
