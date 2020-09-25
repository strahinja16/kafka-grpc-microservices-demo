const { client } = require('../../../services/grpc/client');
const { StreamRequest } = require('../../../proto/greet_pb');

let call = null;
const numberTopic = 'number';

const processNumberTopic = (consumer) => {
  if (call) {
    return;
  }

  console.log('Kafka Number topic processing initialization');

  try {
    call = client.generateStream((error, streamResponse) => {
      if (error) throw Error(`Stream error: ${error.message}`);

      if (streamResponse) {
        console.log(`Stream response: ${streamResponse.getMessage()}`);
      }
    });

    consumer.on('message', ({ topic, value }) => {
      if (topic !== numberTopic) return;

      const squareRootValue = Math.floor(Math.sqrt(parseInt(value, 10)));
      console.log('Processing number topic: ', { value, squareRootValue });

      const streamRequest = new StreamRequest();
      streamRequest.setMessage(squareRootValue.toString());

      call.write(streamRequest);
    });

    consumer.on('error', err => console.log(`Kafka Number topic processing on error: ${err.message}`));
  } catch (err) {
    console.log(`Number topic processing on error: ${err.message}`);

    call.end();
  }
};

module.exports = {
  processNumberTopic,
};
