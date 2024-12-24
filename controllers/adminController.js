   // controllers/adminController.js
const User = require('../models/User');
const Patient = require('../models/Patient');
const Event = require('../models/Events');
const Intervention = require('../models/Intervention');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin can assign a new role to a user
exports.assignRole = async (req, res) => {
  const { userId, role } = req.body;

  const validRoles = ['Admin', 'Doctor', 'Nurse', 'Patient'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();
    res.status(200).json({ message: 'Role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning role' });
  }
};
