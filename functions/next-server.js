const functions = require('firebase-functions');
const { default: next } = require('next');
const nextConfig = require('../src/next.config.js');

const nextjsServer = next({
  dev: true,
  conf: {
    ...nextConfig,
    distDir: '.next'
  }
});

const nextjsHandle = nextjsServer.getRequestHandler();

const nextServer = functions.https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});

module.exports = nextServer;
