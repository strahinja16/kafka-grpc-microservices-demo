/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const socketEndpoint = process.env.REACT_APP_SOCKET_ENDPOINT;

let socket = null;

function App() {
  const [response, setResponse] = useState("");
  useEffect(() => {
    socket = socketIOClient(socketEndpoint);

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("number-reporting", data => {
      console.log("CLIENT DATA", { data, response, mix: `${response} \n ${data}` });
      setResponse(`${response} \n ${data}`);
    });
  }, [response]);

  return (
    <div>{response}</div>
  );
}

export default App;