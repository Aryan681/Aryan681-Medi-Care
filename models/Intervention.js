const mongoose = require('mongoose');

const interventionSchema = new mongoose.Schema({
  type: {
    type: String, // Medication, Surgery, Diagnostic Test, etc.
    required: true
  },
  status: {
    type: String, // e.g., Pending, Completed
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  }
}, { timestamps: true });

const Intervention = mongoose.model('Intervention', interventionSchema);

module.exports = Intervention;
