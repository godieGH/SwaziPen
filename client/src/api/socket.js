import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("connected to server", socket.id);
});

export default socket