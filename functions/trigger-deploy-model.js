const functions = require('firebase-functions');
const { PubSub } = require('@google-cloud/pubsub');

const TOPIC_NAME = 'update-predictions';
const PRODUCTS_PREDICTIONS_FILE_NAME = 'predictionsv1';
const CATEGORIES_PREDICITIONS_FILE_NAME = 'categoriesv1';
const BRANDS_PREDICTIONS_FILE_NAME = 'brandsv1';

const wasSomePredictionFileUpdated = objectName => {
  return [PRODUCTS_PREDICTIONS_FILE_NAME, CATEGORIES_PREDICITIONS_FILE_NAME, BRANDS_PREDICTIONS_FILE_NAME].some(
    value => value === objectName
  );
};

const detectPredictionsUpdate = functions.storage.object().onFinalize(async object => {
  console.log('Bucket updated');
  console.log('FILE: ', object.name);
  if (wasSomePredictionFileUpdated(object.name)) {
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
