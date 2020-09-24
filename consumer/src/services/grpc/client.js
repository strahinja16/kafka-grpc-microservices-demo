const grpc = require('grpc');
const { GreetClient } = require('../../proto/greet_grpc_pb');

const client = new GreetClient('grpc-server:50051', grpc.credentials.createInsecure());

module.exports = {
  client,
}
