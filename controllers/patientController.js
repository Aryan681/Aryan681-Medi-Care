const Patient = require('../models/Patient');

const addPatient = async (req, res) => {
    const { name, age, gender,medicalHistory, treatments ,address,contact} = req.body;
    
    try {
      const newPatient = new Patient({ name, age, gender ,medicalHistory, treatments,address,contact });
      await newPatient.save();
      res.status(201).json(newPatient);
    } catch (error) {
      res.status(400).json({ message: 'Error adding patient', error });
    }
  };

  // Update patient details
  const updatePatient = async (req, res) => {
    try {
      const patientId = req.params.id;

  
     
      const updatedPatient = await Patient.findByIdAndUpdate(
        patientId,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!updatedPatient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      res.json(updatedPatient);
    } catch (err) {
      // Check if it's a validation error
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid input', error: err.message });
      }
  
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  // get  patient details
  const getPatientDetails = async (req, res) => {
    const {id } = req.params;
    try {
      const patient = await Patient.findById(id);
      if (!patient) return res.status(404).json({ message: 'Patient not found' });
      res.status(200).json(patient);
    } catch (error) {
      res.status(400).json({ message: 'Error retrieving patient details', error });
    }
  };

  module.exports = { addPatient,updatePatient,getPatientDetails };