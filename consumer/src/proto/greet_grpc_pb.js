// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var greet_pb = require('./greet_pb.js');

function serialize_GreetRequest(arg) {
  if (!(arg instanceof greet_pb.GreetRequest)) {
    throw new Error('Expected argument of type GreetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GreetRequest(buffer_arg) {
  return greet_pb.GreetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GreetResponse(arg) {
  if (!(arg instanceof greet_pb.GreetResponse)) {
    throw new Error('Expected argument of type GreetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GreetResponse(buffer_arg) {
  return greet_pb.GreetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var GreetService = exports.GreetService = {
  greet: {
    path: '/Greet/greet',
    requestStream: false,
    responseStream: false,
    requestType: greet_pb.GreetRequest,
    responseType: greet_pb.GreetResponse,
    requestSerialize: serialize_GreetRequest,
    requestDeserialize: deserialize_GreetRequest,
    responseSerialize: serialize_GreetResponse,
    responseDeserialize: deserialize_GreetResponse,
  },
};

exports.GreetClient = grpc.makeGenericClientConstructor(GreetService);
