import React, { useState, useEffect } from 'react';
import Footer from "../beeds/Footer";
import { io } from 'socket.io-client';
import { FaSearch } from 'react-icons/fa'; // Importing search icon
const socket = io('http://localhost:5000');
const Intervention = () => {
  const [patientId, setPatientId] = useState('');
  const [interventions, setInterventions] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);
  const [newIntervention, setNewIntervention] = useState({
    name: '',  // New name field
    patientId: '',  // New patientId field
    type: '',
    description: '',
    date: ''
  });

  // Fetch interventions based on patientId
  useEffect(() => {
    
    if (!patientId) {
      setInterventions([]);
      return;
      
    }

    const fetchInterventions = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setStatusMessage('Unauthorized: Please log in');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/interventions/patient/${patientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setInterventions(data);
        } else {
          setStatusMessage('Error fetching interventions');
        }
      } catch (error) {
        setStatusMessage('Error fetching interventions');
        console.error(error);
      }
    };

    fetchInterventions();
    socket.on('interventionAssigned', (newIntervention) => {
      setInterventions((prevInterventions) => [
        ...prevInterventions,
        newIntervention,
      ]);
    });

    // Listen for the 'interventionStatusUpdated' event
    socket.on('interventionStatusUpdated', (updatedIntervention) => {
      setInterventions((prevInterventions) =>
        prevInterventions.map((intervention) =>
          intervention._id === updatedIntervention._id
            ? updatedIntervention
            : intervention
        )
      );
    });
    return () => {
      socket.off('interventionAssigned');
      socket.off('interventionStatusUpdated');
    };  
  }, [patientId]);

  // Handle form input changes for new intervention
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIntervention({ ...newIntervention, [name]: value });
  };

  // Add a new intervention
  const handleAddIntervention = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/interventions/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newIntervention }),
      });

      if (response.ok) {
        const addedIntervention = await response.json();
        setInterventions((prevInterventions) => [...prevInterventions, addedIntervention]);
        setStatusMessage('Intervention added successfully!');
        setNewIntervention({ name: '', patientId: '', type: '', description: '', date: '' });
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.message || 'Failed to add intervention');
      }
    } catch (err) {
      setStatusMessage('Server error. Please try again.');
      console.error(err);
    }
  };

  // Update intervention status
  const handleUpdateStatus = async (interventionId, currentStatus) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setStatusMessage('Unauthorized: Please log in');
      return;
    }

    try {
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed'; 
      const response = await fetch(`http://localhost:5000/api/interventions/update/${interventionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();
      if (response.ok) {
        setStatusMessage(`Intervention status updated to ${newStatus}!`);
        setInterventions(interventions.map((intervention) =>
          intervention._id === interventionId
            ? { ...intervention, status: newStatus }
            : intervention
        ));
      } else {
        setStatusMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setStatusMessage('Error updating status');
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (patientId) {
      setStatusMessage(`Searching for patient: ${patientId}`);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg mt-6 mb-6">
      {/* Status Message */}
      {statusMessage && <div className="text-center mb-4 text-red-600">{statusMessage}</div>}

      {/* Add New Intervention Form */}
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Add New Intervention</h2>
      <form onSubmit={handleAddIntervention} className="space-y-6 max-w-xl mx-auto">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newIntervention.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="patientId" className="block text-lg font-medium text-gray-700">Patient ID</label>
          <input
            type="text"
            id="patientId"
            name="patientId"
            value={newIntervention.patientId}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-lg font-medium text-gray-700">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={newIntervention.type}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={newIntervention.description}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-lg font-medium text-gray-700">Date</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={newIntervention.date}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">Add Intervention</button>
        </div>
      </form>
      
      <hr className="my-8" />
      
      {/* Search by Patient ID */}
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Search Interventions</h1>
      <div className="flex justify-center items-center mb-6">
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Enter Patient ID"
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
          >
            <FaSearch />
          </button>
        </div>
      
      {/* Interventions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {interventions.length > 0 ? (
          interventions.map((intervention) => (
            <div key={intervention._id} className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Intervention: {intervention.type}</h2>
              <p className="text-gray-600"><strong>Name:</strong> {intervention.name}</p>
              <p className="text-gray-600"><strong>Description:</strong> {intervention.description}</p>
              <p className="text-gray-600"><strong>PatientId:</strong> {intervention.patientId}</p>
              <p className="text-gray-600"><strong>Date:</strong> {new Date(intervention.date).toLocaleString()}</p>
              <p className="text-gray-600"><strong>Status:</strong> {intervention.status}</p>

              {/* Toggle between "Mark as Pending" and "Mark as Completed" */}
              {intervention.status !== 'completed' ? (
                <button
                  onClick={() => handleUpdateStatus(intervention._id, intervention.status)}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                >
                  Mark as Completed
                </button>
              ) : (
                <button
                  onClick={() => handleUpdateStatus(intervention._id, intervention.status)}
                  className="mt-4 px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200"
                >
                  Mark as Pending
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No interventions found for the given Patient ID</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Intervention;
