const grpc = require('grpc');
const { GreetService } = require('../../proto/greet_grpc_pb');
const { GreetResponse } = require('../../proto/greet_pb');

function greet(call, callback) {
  const greetResponse = new GreetResponse();
  greetResponse.setMessage(`Hello ${call.request.getMessage()}`);

  callback(null, greetResponse);
}

const startGrpc = () => {
  const server = new grpc.Server();
  server.addService(GreetService,
    { greet });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
};

module.exports = {
  startGrpc,
};
