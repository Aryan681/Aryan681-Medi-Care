const { Server } = require("socket.io");

let io;

const initializeWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

// Emit a real-time update
const emitEventUpdate = (eventData) => {
  if (io) {
    io.emit("eventUpdate", eventData); // Broadcast to all clients
  }
};

module.exports = {
  initializeWebSocket,
  emitEventUpdate
};
