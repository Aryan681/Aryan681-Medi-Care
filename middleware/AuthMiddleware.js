// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

// Middleware to check if the user has the correct role
const checkRole = (roles) => {
  return async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the user's role is allowed for this route
      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied, insufficient permissions' });
      }

      req.user = user; // Attach the user object to the request
      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = checkRole ;
