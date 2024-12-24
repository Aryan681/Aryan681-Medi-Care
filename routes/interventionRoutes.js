// routes/interventionRoutes.js
const express = require('express');
const router = express.Router();
const { assignIntervention, updateInterventionStatus, getInterventionsByPatientId } = require('../controllers/interventionController');
const  checkRole = require('../middleware/AuthMiddleware');

// POST /interventions/assign - Assign a new intervention (Doctor only)
router.post('/assign', checkRole(['Doctor']), assignIntervention);

// PUT /interventions/update/:interventionId - Update intervention status (Doctor, Nurse)
router.put('/update/:interventionId', checkRole(['Doctor', 'Nurse']), updateInterventionStatus);

// GET /interventions/patient/:patientId - Get interventions for a specific patient (Admin, Doctor, Nurse)
router.get('/patient/:id', checkRole(['Admin', 'Doctor', 'Nurse']), getInterventionsByPatientId);

module.exports = router;
