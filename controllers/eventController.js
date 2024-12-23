const Event = require('../models/Events');
const Patient = require('../models/Patient')

const logEvent = async (req, res) => {
    const { eventType, patientId, eventDetails, eventDate } = req.body;
  
    // Input validation
    if (!eventType || !patientId || !eventDetails || !eventDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Verify patient exists
      const patientExists = await Patient.findById(patientId);
      if (!patientExists) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      // Create and save new event
      const newEvent = new Event({ eventType, patientId: patientId, eventDetails, eventDate });
      await newEvent.save();
  
      res.status(201).json(newEvent);
    } catch (error) {
      console.error('Error logging event:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };
  

  const getEventHistory = async (req, res) => {
    const { patientId } = req.params;
  
    try {
      const events = await Event.find({ patient: patientId });
      res.status(200).json(events);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching events', error });
    }
  };
  module.exports = { logEvent, getEventHistory };