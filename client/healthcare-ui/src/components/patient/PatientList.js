import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../beeds/Footer";

const PatientCard = ({ patient }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6 mb-6 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{patient.name}</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600"><strong>PatientId :</strong> {patient._id}</p>
          <p className="text-gray-600"><strong>Age:</strong> {patient.age}</p>
          <p className="text-gray-600"><strong>Gender:</strong> {patient.gender}</p>
        </div>
        <div>
          <p className="text-gray-600"><strong>Medical History:</strong></p>
          <ul className="list-disc pl-5 text-gray-600">
            {patient.medicalHistory.map((history, index) => (
              <li key={index}>{history}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-gray-600"><strong>Treatments:</strong></p>
          <ul className="list-disc pl-5 text-gray-600">
            {patient.treatments.map((treatment, index) => (
              <li key={index}>{treatment}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-gray-600"><strong>Contact:</strong> {patient.contact}</p>
          <p className="text-gray-600"><strong>Address:</strong> {patient.address}</p>
        </div>
        <div>
          <p className="text-gray-600"><strong>Email:</strong> {patient.email}</p>
        </div>
        <div>
          <p className="text-gray-600"><strong>Created At:</strong> {new Date(patient.createdAt).toLocaleString()}</p>
          <p className="text-gray-600"><strong>Updated At:</strong> {new Date(patient.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

const PatientList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/admin/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching users or insufficient role.");
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = users.filter((user) =>
      user._id.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500 text-xl">
        Loading users, please wait...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500 text-xl">{error}</div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          All Patients
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by Patient ID"
            value={search}
            onChange={handleSearch}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Patient Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((patient) => (
            <PatientCard key={patient._id} patient={patient} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PatientList;
