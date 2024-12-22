const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// POST /patients - Add a new patient
router.post('/', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /patients/:id - Get patient details
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /patients/:id - Update patient details
router.put('/:id', async (req, res) => {
    try {
      const patientId = req.params.id;
  
      // Use `runValidators: true` to enforce validation when updating
      const updatedPatient = await Patient.findByIdAndUpdate(patientId, req.body, { new: true, runValidators: true });
  
      if (!updatedPatient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      res.json(updatedPatient);
    } catch (err) {
      // Check if it's a validation error
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid input', error: err.message });
      }
  
      res.status(500).json({ message: 'Server error', error: err });
    }
  });
  
  
  

module.exports = router;
