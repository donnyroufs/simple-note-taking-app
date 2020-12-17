import socketIOClient from "socket.io-client";

const socketIo = socketIOClient("http://localhost:3333/", {
  transports: ["websocket"],
});

function waitForConnection(): Promise<SocketIOClient.Socket> {
  return new Promise((res) => {
    if (socketIo.connected) {
      res(socketIo);
      return;
    }
    socketIo.on("connect", () => res(socketIo));
  });
}

export { waitForConnection };
export default socketIo;
