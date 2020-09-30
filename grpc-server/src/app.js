const http = require('http');
const socketIo = require('socket.io');
const { startGrpc } = require('./services/grpc/server');
const { socketInit } = require('./services/socketio');
const { port } = require('./config');

const server = http.createServer();

const io = socketIo(server);
socketInit(io);

startGrpc(io);

server.listen(port);
