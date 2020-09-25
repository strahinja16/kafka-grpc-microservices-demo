/* eslint-disable consistent-return */
const { Router } = require('express');
const { client } = require('../../services/grpc/client');
const { GreetRequest, StreamRequest } = require('../../proto/greet_pb');

const router = Router();

router.get('/greet', (req, res) => {
  try {
    const greetRequest = new GreetRequest();
    greetRequest.setMessage('tester');

    client.greet(greetRequest, (err, response) => res.send(response.getMessage()));
  } catch (error) {
    console.log('Error in /grpc-tests/greet', { error });
  }
});

router.get('/greet-stream', (req, res) => {
  try {
    const call = client.generateStream((error, streamResponse) => {
      if (error) throw Error(`Stream error: ${error.message}`);

      if (streamResponse) {
        console.log(`Stream response: ${streamResponse.getMessage()}`);
        return res.send(streamResponse.getMessage());
      }
    });

    const messages = ['Hello', 'World', '!!'];
    messages.forEach((message) => {
      const streamRequest = new StreamRequest();
      streamRequest.setMessage(message);
      
      call.write(streamRequest);
    });
    
    call.end();
  } catch (error) {
    console.log('Error in /grpc-tests/greet-stream', { error });
  }
});

module.exports = router;
