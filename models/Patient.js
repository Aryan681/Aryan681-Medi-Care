const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const phoneRegex = /^[0-9]{10}$/;

// Encryption configuration
const ENCRYPTION_KEY = 'bde8b4057038d8bd7925f4a8a33468ac'; // Replace with a secure key
const IV_LENGTH = 16; // Initialization vector length

// Helper functions for encryption and decryption
function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

function decrypt(text) {
  if (!text.includes(':')) {
    // Return plaintext if it's not encrypted
    return text;
  }
  const [iv, encryptedText] = text.split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const patientSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4()
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
          const plaintextValue = decrypt(v); // Decrypt only if encrypted
          return phoneRegex.test(plaintextValue);
        },
        message: props => `${decrypt(props.value)} is not a valid phone number!`
      }
    },
    address: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
    }
  },
  { timestamps: true }
);

// Pre-save hook for encrypting sensitive data
patientSchema.pre('save', function (next) {
  if (this.isModified('contact')) {
    this.contact = encrypt(this.contact);
  }
  if (this.isModified('address')) {
    this.address = encrypt(this.address);
  }
  if (this.isModified('email')) {
    this.email = encrypt(this.email);
  }
  next();
});

// Post-find hook for decrypting sensitive data
patientSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.contact = decrypt(obj.contact);
  obj.address = decrypt(obj.address);
  obj.email = decrypt(obj.email);
  return obj;
};

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
