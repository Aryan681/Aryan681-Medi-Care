const Intervention = require('../models/Intervention');
const mongoose = require('mongoose');

 const assignIntervention = async (req, res) => {
    const { patientId, type, description, date } = req.body;
  
    try {
      const newIntervention = new Intervention({ patientId: patientId, type, description, date });
      await newIntervention.save();
      res.status(201).json(newIntervention);
    } catch (error) {
      res.status(400).json({ message: 'Error assigning intervention', error });
    }
  };


// Update intervention status
const updateInterventionStatus = async (req, res) => {
    const { interventionId } = req.params;
    const { status } = req.body;
  
    try {
      const updatedIntervention = await Intervention.findByIdAndUpdate(
        interventionId,
        { status },
        { new: true }
      );
      if (!updatedIntervention) return res.status(404).json({ message: 'Intervention not found' });
      res.status(200).json(updatedIntervention);
    } catch (error) {
      res.status(400).json({ message: 'Error updating intervention', error });
    }
  };

  const getInterventionsByPatientId = async (req, res) => {
    const { patientId } = req.params;
  
    try {
      // Convert patientId to ObjectId using the correct syntax
      const interventions = await Intervention.find({ patientId: new mongoose.Types.ObjectId(patientId) });
  
      if (!interventions || interventions.length === 0) {
        return res.status(404).json({ message: 'No interventions found for this patient' });
      }
      res.status(200).json(interventions);
    } catch (error) {
      console.error("Error Fetching Interventions:", error);
      res.status(500).json({ message: 'Error fetching interventions', error });
    }
  };
  

  module.exports = { assignIntervention, updateInterventionStatus,getInterventionsByPatientId };