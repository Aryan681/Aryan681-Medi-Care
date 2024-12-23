const express = require('express');
const router = express.Router();
const { assignIntervention, updateInterventionStatus, getInterventionsByPatientId } = require('../controllers/interventionController');

// POST /interventions - Assign a new intervention
router.post('/assign', assignIntervention);

// PUT /interventions/update/:interventionId - Update intervention status
router.put('/update/:interventionId', updateInterventionStatus);

// GET /interventions/patient/:patientId - Get interventions for a specific patient
router.get('/patient/:patientId', getInterventionsByPatientId);

module.exports = router;
