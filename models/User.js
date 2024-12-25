// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4, // Use UUID as the default for _id
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Admin', 'Doctor', 'Nurse',  'Guest'], // Only these roles can be assigned
    default: 'Nurse' // Default role is 'Patient'
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {  
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password with hashed password
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Compares plain password with the hashed password in DB
};

module.exports = mongoose.model('User', userSchema);
