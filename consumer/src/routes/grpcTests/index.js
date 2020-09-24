const { Router } = require('express');
const { client } = require('../../services/grpc/client');
const { GreetRequest } = require('../../proto/greet_pb');

const router = Router();

router.get('/greet', (req, res) => {
  try {
    const greetRequest = new GreetRequest();
    greetRequest.setMessage('tester');

    client.greet(greetRequest, (err, response) => {
      return res.send(response.getMessage());
    });
  } catch (error) {
    console.log('Error in /grpc-tests/greet', { error });
  }
});

module.exports = router;
