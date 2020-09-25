/* eslint-disable class-methods-use-this */
const { GreetResponse, StreamResponse } = require('../../proto/greet_pb');

class GreetServiceImpl {
  constructor(io) {
    this.io = io;
    this.initIo();
  }

  initIo() {
    this.io.on('connection', (socket) => {
      this.socket = socket;
    });
  }

  greet(call, callback) {
    const greetResponse = new GreetResponse();
    greetResponse.setMessage(`Hello ${call.request.getMessage()}`);

    callback(null, greetResponse);
  }

  generateStream(call, callback) {
    call.on('data', (streamRequest) => {
      console.log(`Grpc stream message: ${streamRequest.getMessage()}`);
      if (this.socket) {
        this.socket.emit('number-reporting', streamRequest.getMessage());
      } else {
        this.initIo();
      }
    });

    call.on('end', () => {
      const streamResponse = new StreamResponse();
      streamResponse.setMessage('Processed');

      callback(null, streamResponse);
    });
  }
}

const greetService = io => new GreetServiceImpl(io);

module.exports = {
  greetService,
};
