const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
  
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials: No user found' });
    };
    const passwordMatch = await user.matchPassword(password);
    
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({ token, userId: user._id, role: user.role });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Signup User (Replaces registerUser)
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      email,
      password,
      role:"admin@example.com" === email ? 'Admin' : 'Patient', // Promote first admin
    });

    await user.save();
      const token = generateToken(user._id);
    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        email: user.email,
        role: user.role,
        userId: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = { loginUser, signupUser };
