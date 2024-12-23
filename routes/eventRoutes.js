const express = require('express');
const router = express.Router();
const { logEvent, getEventHistory } = require('../controllers/eventController');

// POST /events - Log a new event
router.post('/', logEvent);

// GET /events/:patientId - Fetch event history for a patient
router.get('/:id', getEventHistory );

module.exports = router;
