import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../beeds/Footer";



const PatientCard = ({ patient }) => {
  return (
    <>
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6 mb-6 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{patient.name}</h2>

      <div className="space-y-4">
        {/* Basic Information */}
        <div>
          <p className="text-gray-600"><strong>PatientId :</strong> {patient._id}</p>
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
      </div>
    </div>

    
    </>
  );
};


  

const PatientList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the JWT token from localStorage

    // Send GET request with Authorization header
    axios
      .get("http://localhost:5000/api/admin/patients", {
        headers: {
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
      })
      .then((response) => {
        setUsers(response.data); // Set users data from API response
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        setError("Error fetching users or insufficient role.");
        setLoading(false); // Stop loading
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500 text-xl">
        Loading users, please wait...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <>
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        All Patient
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((patient) => (
          <PatientCard key={patient._id} patient={patient} />
        ))}
      </div>
    </div>
   

       <Footer/>
    </>
  );
};

export default PatientList;
