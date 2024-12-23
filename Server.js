const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require('cors');
const http = require('http');
const { initializeWebSocket } = require('./sockets/socketManager');

// Import routes
const patientRoutes = require('./routes/patientRoutes');
const eventRoutes = require('./routes/eventRoutes');
const interventionRoutes = require('./routes/interventionRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', authMiddleware, patientRoutes);
app.use('/api/events', authMiddleware, eventRoutes);
app.use('/api/interventions', authMiddleware, interventionRoutes);

// Create an HTTP server and integrate WebSocket
const server = http.createServer(app);
initializeWebSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
