const express = require('express');
const router = express.Router();
const Intervention = require('../models/Intervention');

// POST /interventions - Assign a new intervention
router.post('/', async (req, res) => {
  try {
    const intervention = new Intervention(req.body);
    await intervention.save();
    res.status(201).json(intervention);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /interventions/:patientId - Get interventions for a specific patient
router.get('/:patientId', async (req, res) => {
  try {
    const interventions = await Intervention.find({ patientId: req.params.patientId });
    if (!interventions) {
      return res.status(404).json({ message: 'No interventions found for this patient' });
    }
    res.json(interventions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
