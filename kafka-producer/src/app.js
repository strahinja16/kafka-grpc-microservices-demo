const http = require('http');
const initKafkaJobs = require('./services/kafka/jobs');
require('./services/kafka');
const { port } = require('./config');

http
  .createServer()
  .listen(port);

initKafkaJobs();
