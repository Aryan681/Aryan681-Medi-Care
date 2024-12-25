const Event = require('../models/Events');
const Patient = require('../models/Patient');
const { emitEventUpdate } = require('../sockets/socketManager'); // Import WebSocket utility

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

    // Emit real-time update
    emitEventUpdate({
      message: `New event logged for patient: ${patientExists.name}`,
      eventType,
      patientId,
      eventDetails,
      eventDate,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error logging event:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};




const getEventHistory = async (req, res) => {
  const { patientId } = req.params;

  console.log('Querying events for patientId:', patientId);

  try {
    // Fetch events and populate the patientId field with patient's name
    const events = await Event.find({ patientId })
      .populate('patientId', 'name') // Populate only the name field from Patient
      .exec();

    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found for this patient.' });
    }

    // Format the response to include patient name and event details
    const formattedEvents = events.map((event) => ({
      patientName: event.patientId.name, // The populated patient name
      patientId: event.patientId._id, // The patient ID
      eventType: event.eventType,
      eventDetails: event.eventDetails,
      eventDate: event.eventDate,
    }));

    // Send the formatted events as a response
    res.status(200).json(formattedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(400).json({ message: 'Error fetching events', error });
  }
};




module.exports = { logEvent, getEventHistory };
