const express = require('express');
const router = express.Router();
const { assignIntervention, updateInterventionStatus,getInterventionsByPatientId } = require('../controllers/interventionController');

// POST /interventions - Assign a new intervention 
router.post('/assign',  assignIntervention);

// update interventions for a specific patient
router.put('/update/:interventionId',updateInterventionStatus);
// retrieve the  interventions for a specific patient
router.get('/patient/:patientId',  getInterventionsByPatientId);

module.exports = router;
