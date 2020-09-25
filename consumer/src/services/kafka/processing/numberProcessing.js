const { client } = require('../../../services/grpc/client');
const { StreamRequest } = require('../../../proto/greet_pb');

let call = null;
const numberTopic = 'number';

const initializeCall = () => {
  console.log('Kafka Number topic grpc call initialization');

  call = client.generateStream((error, streamResponse) => {
    if (error) {
      console.log(`Stream server error: ${error.message}`);
      call = null;
    }

    if (streamResponse) {
      console.log(`Stream response: ${streamResponse.getMessage()}`);
    }
  });
};

const processNumberTopic = (consumer) => {
  if (call) {
    return;
  }

  try {
    initializeCall();

    consumer.on('message', ({ topic, value }) => {
      if (topic !== numberTopic) return;

      const squareRootValue = Math.floor(Math.sqrt(parseInt(value, 10)));
      console.log('Processing number topic: ', { value, squareRootValue });

      const streamRequest = new StreamRequest();
      streamRequest.setMessage(squareRootValue.toString());

      if (!call) {
        initializeCall();
      }

      call.write(streamRequest);
    });

    consumer.on('error', err => console.log(`Kafka Number topic processing on error: ${err.message}`));
  } catch (err) {
    console.log(`Number topic processing on error: ${err.message}`);

    call.end();
    call = null;
  }
};

module.exports = {
  processNumberTopic,
};
