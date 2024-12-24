import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin,FaUsers, FaStethoscope, FaProcedures, FaClipboardList, FaHospitalSymbol } from "react-icons/fa";


const AdminDashboard = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    if (userRole !== "Admin") {
      navigate("/login");
    }
  }, [navigate]);

  if (role === null) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
  }

  const cards = [
    { title: "All Users", path: "/admin/all-users", icon: <FaUsers className="text-4xl text-blue-600" /> },
    { title: "All Patients", path: "/admin/all-patients", icon: <FaHospitalSymbol className="text-4xl text-green-600" /> },
    { title: "Patient Management", path: "/admin/patient-management", icon: <FaStethoscope className="text-4xl text-teal-600" /> },
    { title: "Event Logging", path: "/admin/event-logging", icon: <FaClipboardList className="text-4xl text-yellow-600" /> },
    { title: "Intervention Forms", path: "/admin/intervention-forms", icon: <FaProcedures className="text-4xl text-red-600" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6 px-8 shadow-md">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-lg mt-2">Welcome, Admin! Manage the hospital system efficiently.</p>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-8 text-gray-700">Admin Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => navigate(card.path)}
            >
              <div className="flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 text-center">{card.title}</h3>
              <p className="text-center text-gray-600 mt-2">
                Manage {card.title.toLowerCase()} efficiently through this section.
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
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

    </div>
  );
};

export default AdminDashboard;
