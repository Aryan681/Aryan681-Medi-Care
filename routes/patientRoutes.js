const express = require('express');
const router = express.Router();

const { addPatient, updatePatient, getPatientDetails } = require('../controllers/patientController');

// POST /patients/add - Add a new patient
router.post('/add', addPatient);

// GET /patients/:id - Get patient details
router.get('/:id', getPatientDetails);

// PUT /patients/update/:id - Update patient details
router.put('/update/:id', updatePatient);
  

module.exports = router;
