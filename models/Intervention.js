const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import the UUID generator

const interventionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,  
  },
  type: {
    type: String, 
    required: true
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed'], 
    default: 'pending' 
  },
  patientId: {
    type: String, 
    ref: 'Patient',
    required: true
  },
  description: { type: String, required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

const Intervention = mongoose.model('Intervention', interventionSchema);

module.exports = Intervention;
