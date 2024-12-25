import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

const PatientCard = ({ patient, handleUpdate }) => {
  return (
    <div className="max-w-lg rounded-lg overflow-hidden shadow-xl bg-white p-6 mb-6 mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-3xl font-semibold text-blue-700 mb-4">{patient.name}</h2>

      <div className="space-y-4">
        {/* Basic Information */}
        <div>
          <p className="text-gray-600"><strong>Patient ID:</strong> {patient._id}</p>
          <p className="text-gray-600"><strong>Age:</strong> {patient.age}</p>
          <p className="text-gray-600"><strong>Gender:</strong> {patient.gender}</p>
        </div>

        {/* Medical History */}
        <div>
          <p className="text-gray-600"><strong>Medical History:</strong></p>
          <ul className="list-disc pl-5 text-gray-600">
            {patient.medicalHistory.map((history, index) => (
              <li key={index}>{history}</li>
            ))}
          </ul>
        </div>

        {/* Treatments */}
        <div>
          <p className="text-gray-600"><strong>Treatments:</strong></p>
          <ul className="list-disc pl-5 text-gray-600">
            {patient.treatments.map((treatment, index) => (
              <li key={index}>{treatment}</li>
            ))}
          </ul>
        </div>

        {/* Contact and Address */}
        <div>
          <p className="text-gray-600"><strong>Contact:</strong> {patient.contact}</p>
          <p className="text-gray-600"><strong>Address:</strong> {patient.address}</p>
        </div>

        {/* Email */}
        <div>
          <p className="text-gray-600"><strong>Email:</strong> {patient.email}</p>
        </div>

        {/* Created & Updated Time */}
        <div>
          <p className="text-gray-600"><strong>Created At:</strong> {new Date(patient.createdAt).toLocaleString()}</p>
          <p className="text-gray-600"><strong>Updated At:</strong> {new Date(patient.updatedAt).toLocaleString()}</p>
        </div>

        {/* Update Info Section */}
        <button
          className="text-white bg-blue-600 hover:bg-blue-700 mt-4 px-4 py-2 rounded transition-all duration-300"
          onClick={() => handleUpdate(patient._id)}
        >
          Update Info
        </button>
      </div>
    </div>
  );
};

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    medicalHistory: "",
    treatments: "",
    address: "",
    contact: "",
    email: "",
  });
  const [searchId, setSearchId] = useState("");
  const [currentPatient, setCurrentPatient] = useState(null);

  // Fetch all patients when the component mounts
  useEffect(() => {
    if (!token) return;

    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }

      socket.on("patientUpdated", (updatedPatient) => {
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient._id === updatedPatient._id ? updatedPatient : patient
          )
        );
      });
  
      return () => {
        socket.off("patientUpdated");  // Clean up on unmount
      };
    };

    fetchPatients();
  }, [token]);

  // Handle adding a patient
  const handleAddPatient = async (e) => {
    e.preventDefault();

    const newPatient = {
      ...formData,
      medicalHistory: formData.medicalHistory.split(","),
      treatments: formData.treatments.split(","),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/patients/add",
        newPatient,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPatients((prevPatients) => [...prevPatients, response.data]);
      setFormData({
        name: "",
        age: "",
        gender: "",
        medicalHistory: "",
        treatments: "",
        address: "",
        contact: "",
        email: "",
      });
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  // Handle searching a patient by ID
  const handleSearchPatient = async () => {
    if (!searchId) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/patients/${searchId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCurrentPatient(response.data);
    } catch (error) {
      console.error("Error fetching patient:", error);
      setCurrentPatient(null);
    }
  };

  // Handle updating patient info
  const handleUpdatePatient = async (patientId, updateData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/patients/update/${patientId}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient._id === patientId ? response.data : patient
        )
      );
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* Add Patient Form */}
      <form onSubmit={handleAddPatient} className="mb-10 bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-blue-600">Add New Patient</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Patient Name"
            className="p-3 border border-gray-300 rounded-lg shadow-sm"
            required
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            placeholder="Age"
            className="p-3 border border-gray-300 rounded-lg shadow-sm"
            required
          />
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            placeholder="Gender"
            className="p-3 border border-gray-300 rounded-lg shadow-sm"
            required
          />
          <input
            type="text"
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
            placeholder="Medical History (comma separated)"
            className="p-3 border border-gray-300 rounded-lg shadow-sm"
          />
          <input
            type="text"
            name="treatments"
            value={formData.treatments}
            onChange={(e) => setFormData({ ...formData, treatments: e.target.value })}
            placeholder="Treatments (comma separated)"
            className="p-3 border border-gray-300 rounded-lg shadow-sm"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Address"
            className="p-3 border border-gray-300 rounded-lg shadow-sm"
          />
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            placeholder="Contact"
            className="p-3 border border-gray-300 rounded-lg shadow-sm"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          Add Patient
        </button>
      </form>

      {/* Search Patient */}
      <div className="mb-10">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Search Patient by ID"
          className="p-3 border border-gray-300 rounded-lg shadow-sm w-full md:w-1/2"
        />
        <button
          onClick={handleSearchPatient}
          className="ml-4 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          Search
        </button>
      </div>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(currentPatient ? [currentPatient] : patients).map((patient) => (
          <PatientCard
            key={patient._id}
            patient={patient}
            handleUpdate={handleUpdatePatient}
          />
        ))}
      </div>
    </div>
  );
};

export default PatientManagement;
