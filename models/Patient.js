const mongoose = require('mongoose');

const phoneRegex = /^[0-9]{10}$/;
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  medicalHistory: { type: [String], required: false },
  treatments: {
    type: [String]
  },
  treatments: {
    type: [String], 
    default: []
  },
  contact: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return phoneRegex.test(v); 
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  address: {
    type: String, 
    required: true
  },
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
