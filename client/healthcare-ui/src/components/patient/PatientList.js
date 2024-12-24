import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin,FaUsers, FaStethoscope, FaProcedures, FaClipboardList, FaHospitalSymbol } from "react-icons/fa";



const PatientCard = ({ patient }) => {
  return (
    <>
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6 mb-6 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{patient.name}</h2>

      <div className="space-y-4">
        {/* Basic Information */}
        <div>
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
    <footer id="footer" className="bg-gray-800 text-white py-12">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      {/* About Section */}
      <div className="footer-about flex flex-col space-y-4">
        <a href="/" className="logo flex items-center space-x-2">
          <span className="sitename text-2xl font-bold text-white">Hospital Management System</span>
        </a>
        <div className="footer-contact">
          <p className="text-gray-400">A108 Adam Street, New York, NY 535022</p>
          <p className="mt-2 text-gray-400"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
          <p className="text-gray-400"><strong>Email:</strong> <span>info@hospital.com</span></p>
        </div>
        <div className="social-links flex space-x-6 mt-4">
          <a href="https://twitter.com" className="text-2xl text-blue-500 hover:text-white"><FaTwitter /></a>
          <a href="https://facebook.com" className="text-2xl text-blue-600 hover:text-white"><FaFacebook /></a>
          <a href="https://instagram.com" className="text-2xl text-pink-500 hover:text-white"><FaInstagram /></a>
          <a href="https://linkedin.com" className="text-2xl text-blue-700 hover:text-white"><FaLinkedin /></a>
        </div>
      </div>

      {/* Useful Links Section */}
      <div className="footer-links flex flex-col space-y-4">
        <h4 className="text-lg font-semibold text-white">Useful Links</h4>
        <ul className="space-y-2">
          <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
          <li><a href="/" className="text-gray-400 hover:text-white">About Us</a></li>
          <li><a href="/" className="text-gray-400 hover:text-white">Services</a></li>
          <li><a href="/" className="text-gray-400 hover:text-white">Terms of Service</a></li>
          <li><a href="/" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
        </ul>
      </div>

      {/* Empty Column for Alignment (flexible space) */}
      <div className="hidden lg:block"></div>
    </div>
  </div>

  {/* Copyright Section */}
  <div className="container mx-auto text-center mt-8 border-t border-gray-600 pt-6">
    <p className="text-gray-400">© <span>Copyright</span> <strong className="px-1 text-white">Hospital Management System</strong> <span>All Rights Reserved</span></p>
    <div className="credits mt-2 text-gray-400">
      Designed by <a href="https://bootstrapmade.com/" className="hover:text-white">BootstrapMade</a> | Distributed by <a href="https://themewagon.com" className="hover:text-white">ThemeWagon</a>
    </div>
  </div>
</footer>
    </>
  );
};

export default PatientList;
