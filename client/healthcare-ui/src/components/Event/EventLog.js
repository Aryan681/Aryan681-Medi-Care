import React, { useState, useEffect } from 'react';
import Footer from "../beeds/Footer";
import { io } from 'socket.io-client';
const EventLog = () => {
  const [events, setEvents] = useState([]); // Initialize as an empty array
  const socket = io('http://localhost:5000');
  const [newEvent, setNewEvent] = useState({
    patientId: '', // patientId is initially empty and will be filled by the user
    eventType: '',
    eventDetails: '',
    eventDate: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch patient-specific events based on patientId
  useEffect(() => {
    if (!newEvent.patientId) return; // Skip fetching if patientId is empty

    const fetchEvents = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      try {
        const response = await fetch(`http://localhost:5000/api/events/${newEvent.patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data); // Ensure the response is an array
        } else {
          setEvents([]); // Set to an empty array if the response is not an array
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setEvents([]); // Handle errors gracefully
      }
    };
    fetchEvents();
    socket.on('eventLogged', (newEvent) => {
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    });
    return () => {
      socket.off('eventLogged');
    };
  }, [newEvent.patientId]); // Re-fetch when patientId changes

  // Add a new event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    try {
      const response = await fetch('http://localhost:5000/api/events/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(newEvent),
      });
      if (response.ok) {
        const addedEvent = await response.json();
        setEvents((prevEvents) => [...prevEvents, addedEvent]);
        setSuccess('Event added successfully!');
        setError('');
        setNewEvent({
          patientId: '', // Reset the patientId field after submission
          eventType: '',
          eventDetails: '',
          eventDate: '',
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add event');
        setSuccess('');
      }
    } catch (err) {
      setError('Server error. Please try again.');
      setSuccess('');
    }
  };

  return (
    <>
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Event Log</h1>

      {/* Event Form */}
      <form
        onSubmit={handleAddEvent}
        className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-md mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Event</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Patient ID</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={newEvent.patientId}
            onChange={(e) => setNewEvent({ ...newEvent, patientId: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Event Type</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={newEvent.eventType}
            onChange={(e) => setNewEvent({ ...newEvent, eventType: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Event Details</label>
          <textarea
            className="w-full p-2 border rounded"
            value={newEvent.eventDetails}
            onChange={(e) => setNewEvent({ ...newEvent, eventDetails: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Event Date</label>
          <input
            type="datetime-local"
            className="w-full p-2 border rounded"
            value={newEvent.eventDate}
            onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Event
        </button>
      </form>

      {/* Event List */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {events.map((event) => (
    <div
      key={event._id}
      className="bg-white shadow-lg rounded-lg p-6 overflow-hidden"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Event Type: {event.eventType}
      </h2>
      <p className="text-gray-600">
        <strong>Patient Name:</strong> {event.patientName}
      </p>
      <p className="text-gray-600">
        <strong>Details:</strong> {event.eventDetails}
      </p>
      <p className="text-gray-600">
        <strong>Date:</strong> {new Date(event.eventDate).toLocaleString()}
      </p>
    </div>
  ))}
</div>

      </div>
      <Footer/>
      </>
     
  );
};

export default EventLog;
