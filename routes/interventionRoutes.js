// routes/interventionRoutes.js
const express = require('express');
const router = express.Router();
const { assignIntervention, updateInterventionStatus, getInterventionsByPatientId } = require('../controllers/interventionController');
const  checkRole = require('../middleware/AuthMiddleware');

// POST /interventions/assign - Assign a new intervention (Doctor only)
router.post('/assign', checkRole(['Doctor','Admin']), assignIntervention);

// PUT /interventions/update/:interventionId - Update intervention status (Doctor, Nurse)
router.patch('/update/:interventionId', checkRole(['Doctor', 'Nurse','Admin']), updateInterventionStatus);

// GET /interventions/patient/:patientId - Get interventions for a specific patient (Admin, Doctor, Nurse)
router.get('/patient/:patientId', checkRole(['Admin', 'Doctor', 'Nurse']), getInterventionsByPatientId);

module.exports = router;
