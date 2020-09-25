/* eslint-disable class-methods-use-this */
const { GreetResponse, StreamResponse } = require('../../proto/greet_pb');

class GreetServiceImpl {
  greet(call, callback) {
    const greetResponse = new GreetResponse();
    greetResponse.setMessage(`Hello ${call.request.getMessage()}`);

    callback(null, greetResponse);
  }

  generateStream(call, callback) {
    const processedMessages = [];

    call.on('data', (streamRequest) => {
      console.log(`Grpc stream message: ${streamRequest.getMessage()}`);
      processedMessages.push(streamRequest.getMessage());
    });

    call.on('end', () => {
      const streamResponse = new StreamResponse();
      streamResponse.setMessage(`Processed messages: ${processedMessages.join(', ')}`);

      callback(null, streamResponse);
    });
  }
}

module.exports = {
  greetService: new GreetServiceImpl(),
};
