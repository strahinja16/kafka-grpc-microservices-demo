const grpc = require('grpc');
const { GreetClient } = require('../../proto/greet_grpc_pb');
const { grpcServer } = require('../../config');

const client = new GreetClient(grpcServer, grpc.credentials.createInsecure());

module.exports = {
  client,
};
