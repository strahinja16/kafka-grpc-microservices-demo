const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const { startGrpc } = require('./services/grpc/server');
const { socketInit } = require('./services/socketio');

const app = express();

const server = http.createServer(app);
const io = socketIo(server);
socketInit(io);

/**
 * Init middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    // eslint-disable-next-line no-console
    console.info(`${req.method}: ${req.url}`);
    next();
  });
}


app.use('/api', require('./routes'));

startGrpc(io);

module.exports = { app, server };
