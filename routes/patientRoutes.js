// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const { addPatient, updatePatient, getPatientDetails } = require('../controllers/patientController');
const  checkRole = require('../middleware/AuthMiddleware');

// POST /patients/add - Add a new patient (Admin , doctor only)
router.post('/add', checkRole(['Admin','Doctor']), addPatient);

// GET /patients/:id - Get patient details (Admin, Doctor, Nurse, Patient)
router.get('/:id', checkRole(['Admin', 'Doctor', 'Nurse', 'Patient']), getPatientDetails);

// PUT /patients/update/:id - Update patient details (Admin, Doctor)
router.put('/update/:id', checkRole(['Admin', 'Doctor']), updatePatient);

module.exports = router;
