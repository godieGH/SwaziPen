import { io } from "socket.io-client";

const socket = io("/", {
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("connected to server", socket.id);
});

export default socket