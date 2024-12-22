const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require('cors');
//routes
  const patientRoutes = require('./routes/patientRoutes');
  const eventRoutes = require('./routes/eventRoutes');
  const interventionRoutes = require('./routes/interventionRoutes');

dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//connect mongoose

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));


  
  // Using the routes
  app.use('/api/patients', patientRoutes);
  app.use('/api/events', eventRoutes);
  app.use('/api/interventions', interventionRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


