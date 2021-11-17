const functions = require('firebase-functions');
const { PubSub } = require('@google-cloud/pubsub');

const TOPIC_NAME = 'update-predictions';
const PREDICTIONS_FILE_NAME = 'predictionsv1';

const detectPredictionsUpdate = functions.storage.object().onFinalize(async object => {
  console.log('Bucket updated');
  if (object.name === PREDICTIONS_FILE_NAME) {
    const pubSubClient = new PubSub();

    const dataBuffer = Buffer.from(JSON.stringify({ deploy: true }));

    try {
      const messageId = await pubSubClient.topic(TOPIC_NAME).publish(dataBuffer);
      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
    }
  } else console.log('another file');
});

module.exports = detectPredictionsUpdate;
