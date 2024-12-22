const express = require('express');
const router = express.Router();
const Event = require('../models/Events');

// POST /events - Log a new event
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /events/:patientId - Fetch event history for a patient
router.get('/:patientId', async (req, res) => {
  try {
    const events = await Event.find({ patientId: req.params.patientId });
    if (!events) {
      return res.status(404).json({ message: 'No events found for this patient' });
    }
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
