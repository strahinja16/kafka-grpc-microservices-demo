require('dotenv').config();

const { PORT, GRPC_PORT } = process.env;

const port = PORT || 3000;
const grpcPort = GRPC_PORT || 50051;

module.exports = {
  port,
  grpcPort,
};
