const mongoose = require('mongoose');

const interventionSchema = new mongoose.Schema({
  type: {
    type: String, // Medication, Surgery, Diagnostic Test, etc.
    required: true
  },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  description: { type: String, required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

const Intervention = mongoose.model('Intervention', interventionSchema);

module.exports = Intervention; 
