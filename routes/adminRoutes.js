// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const  checkRole  = require('../middleware/AuthMiddleware');
const { getAllUsers, getAllPatients, assignRole } = require('../controllers/adminController');

// Admin can access these routes only
router.get('/users', checkRole(['Admin']), getAllUsers); // Get all users
router.get('/patients', checkRole(['Admin']), getAllPatients); // Get all patients
router.post('/assign-role', checkRole(['Admin']), assignRole); // Assign role to a user

module.exports = router;
