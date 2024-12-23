const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

socket.on("eventUpdate", (data) => {
  console.log("Real-time update received:", data);
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
});
