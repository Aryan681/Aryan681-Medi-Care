const Patient = require('../models/Patient');
const { emitEventUpdate } = require('../sockets/socketManager');

const addPatient = async (req, res) => {
  const { name, age, gender, medicalHistory, treatments, address, contact, email } = req.body;

  try {
    const newPatient = new Patient({ name, age, gender, medicalHistory, treatments, address, contact, email });
    await newPatient.save();

    // Emit real-time update
    emitEventUpdate({ type: "patientAdded", patient: newPatient });

    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ message: 'Error adding patient', error });
  }
};

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

    // Emit real-time update
    emitEventUpdate({ type: "patientUpdated", patient: updatedPatient });

    res.json(updatedPatient);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid input', error: err.message });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getPatientDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findById(id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving patient details', error });
  }
};

module.exports = { addPatient, updatePatient, getPatientDetails };
