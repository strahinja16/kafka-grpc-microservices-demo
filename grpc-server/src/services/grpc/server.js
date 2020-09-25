const grpc = require('grpc');
const { GreetService } = require('../../proto/greet_grpc_pb');
const { grpcPort } = require('../../config');
const { greetService } = require('./greet');

const startGrpc = (io) => {
  const server = new grpc.Server();
  server.addService(GreetService, greetService(io));
  server.bind(`0.0.0.0:${grpcPort}`, grpc.ServerCredentials.createInsecure());
  server.start();
};

module.exports = {
  startGrpc,
};
