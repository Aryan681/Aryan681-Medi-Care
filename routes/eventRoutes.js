// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const { logEvent, getEventHistory } = require('../controllers/eventController');
const  checkRole  = require('../middleware/AuthMiddleware');

// POST /events - Log a new event (Doctor, Nurse only)
router.post('/', checkRole(['Doctor', 'Nurse','Admin']), logEvent);

// GET /events/:id - Fetch event history for a patient (Admin, Doctor, Nurse)
router.get('/:patientId', checkRole(['Admin', 'Doctor', 'Nurse']), getEventHistory);

module.exports = router;
