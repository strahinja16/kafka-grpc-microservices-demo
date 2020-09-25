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

function serialize_StreamRequest(arg) {
  if (!(arg instanceof greet_pb.StreamRequest)) {
    throw new Error('Expected argument of type StreamRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_StreamRequest(buffer_arg) {
  return greet_pb.StreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_StreamResponse(arg) {
  if (!(arg instanceof greet_pb.StreamResponse)) {
    throw new Error('Expected argument of type StreamResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_StreamResponse(buffer_arg) {
  return greet_pb.StreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
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
  generateStream: {
    path: '/Greet/generateStream',
    requestStream: true,
    responseStream: false,
    requestType: greet_pb.StreamRequest,
    responseType: greet_pb.StreamResponse,
    requestSerialize: serialize_StreamRequest,
    requestDeserialize: deserialize_StreamRequest,
    responseSerialize: serialize_StreamResponse,
    responseDeserialize: deserialize_StreamResponse,
  },
};

exports.GreetClient = grpc.makeGenericClientConstructor(GreetService);
