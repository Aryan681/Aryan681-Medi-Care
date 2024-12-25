const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import the UUID generator

const eventSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,  // Generate UUID as the default value for _id
  },
  eventType: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventDetails: {
    type: String,
    required: true
  },
  patientId: {
    type: String,  
    ref: 'Patient', 
    required: true
  }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
