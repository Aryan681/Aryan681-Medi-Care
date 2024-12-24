const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import UUID package

const phoneRegex = /^[0-9]{10}$/;

const patientSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // Change type to String
      default: () => uuidv4() // Set default to generate UUID
    },
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
    medicalHistory: {
      type: [String],
      required: false
    },
    treatments: {
      type: [String],
      default: []
    },
    contact: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return phoneRegex.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    address: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique across patients
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
    }
  },
  { timestamps: true }
);

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
