#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd "${BASEDIR}"/../

for f in ./src/proto*; do

  npx grpc_tools_node_protoc \
      --js_out=import_style=commonjs,binary:"${f}" \
      --grpc_out="${f}" \
      -I "${f}" \
      "${f}"/*.proto

done